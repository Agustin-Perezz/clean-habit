import type { Page } from "@playwright/test";
import { expect, test } from "./_shared/app-fixtures";
import {
  deleteObjectivesByPrefix,
  seedObjectives,
} from "./_shared/fixtures/objective-fixtures";

const RUN_ID = crypto.randomUUID();
const TEST_PREFIX = `E2E-${RUN_ID}`;
const objectiveTitle = `${TEST_PREFIX}-persistence-target`;
const objectiveOptionLabel = `Add to ${objectiveTitle}`;

test.beforeAll(async () => {
  await seedObjectives({
    titles: [objectiveTitle],
    category: `${TEST_PREFIX} Category`,
  });
});

test.afterAll(async () => {
  await deleteObjectivesByPrefix(TEST_PREFIX);
});

async function addSubtask(page: Page, habitTitle: string): Promise<void> {
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: objectiveOptionLabel }).click();
  const draft = page.getByPlaceholder("Draft new daily ritual...");
  await draft.fill(habitTitle);
  await draft.press("Enter");
}

function cardOf(page: Page) {
  return page.locator("article", { hasText: objectiveTitle });
}

// Subtask writes are async: wait for the request to reach the server before
// reloading, otherwise a reload can cancel the in-flight write.
function habitWrite(page: Page) {
  return page.waitForResponse(
    (response) => response.request().method() === "POST",
  );
}

test("a quick-ingested subtask is still there after a reload", async ({
  page,
}) => {
  const habitTitle = `E2E-Subtask-${Date.now()}`;

  await page.goto("/");
  const write = habitWrite(page);
  await addSubtask(page, habitTitle);
  await expect(cardOf(page).getByText(habitTitle)).toBeVisible();
  await write;

  await page.reload();

  await expect(cardOf(page).getByText(habitTitle)).toBeVisible();
});

test("a completed subtask is still completed after a reload", async ({
  page,
}) => {
  const habitTitle = `E2E-Completed-${Date.now()}`;

  await page.goto("/");
  const add = habitWrite(page);
  await addSubtask(page, habitTitle);
  await add;

  const toggle = habitWrite(page);
  await cardOf(page).getByText(habitTitle).click();
  await expect(cardOf(page).getByRole("checkbox")).toBeChecked();
  await toggle;

  await page.reload();

  await expect(cardOf(page).getByRole("checkbox")).toBeChecked();
});

test("a deleted subtask stays deleted after a reload", async ({ page }) => {
  const habitTitle = `E2E-Deleted-${Date.now()}`;

  await page.goto("/");
  const add = habitWrite(page);
  await addSubtask(page, habitTitle);
  await expect(cardOf(page).getByText(habitTitle)).toBeVisible();
  await add;

  const remove = habitWrite(page);
  await cardOf(page).getByText(habitTitle).hover();
  await cardOf(page)
    .getByRole("button", { name: `Delete ${habitTitle}` })
    .click();
  await expect(cardOf(page).getByText(habitTitle)).toBeHidden();
  await remove;

  await page.reload();

  await expect(cardOf(page).getByText(habitTitle)).toBeHidden();
});
