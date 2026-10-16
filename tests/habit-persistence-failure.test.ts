import type { Page } from "@playwright/test";
import { expect, test } from "./_shared/app-fixtures";
import {
  deleteObjectivesByPrefix,
  seedObjectives,
} from "./_shared/fixtures/objective-fixtures";

const RUN_ID = crypto.randomUUID();
const TEST_PREFIX = `E2E-${RUN_ID}`;
const objectiveTitle = `${TEST_PREFIX}-failure-target`;
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

function cardOf(page: Page) {
  return page.locator("article", { hasText: objectiveTitle });
}

// Next renders its own shadow-DOM role="alert", so the assertion must be
// scoped to the form that owns the message.
function writeError(page: Page) {
  return page.locator('form p[role="alert"]');
}

test("a subtask whose write never lands is not shown as saved", async ({
  page,
}) => {
  const habitTitle = `E2E-Offline-${Date.now()}`;

  await page.goto("/");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: objectiveOptionLabel }).click();

  // Every write fails at the transport layer, as it would offline.
  await page.route("**/*", async (route) => {
    if (route.request().method() === "POST") {
      await route.abort("failed");
      return;
    }
    await route.continue();
  });

  const draft = page.getByPlaceholder("Draft new daily ritual...");
  await draft.fill(habitTitle);
  await draft.press("Enter");

  // The board must not claim a subtask that was never stored.
  await expect(writeError(page)).toBeVisible();
  await expect(cardOf(page).getByText(habitTitle)).toBeHidden();

  await page.reload();

  // Positive control: the card rendered, so the hidden subtask above is a real
  // statement about stored state and not a card that failed to render.
  await expect(cardOf(page)).toBeVisible();
  await expect(cardOf(page).getByText(habitTitle)).toBeHidden();
});
