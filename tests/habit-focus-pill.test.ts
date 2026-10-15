import { expect, test } from "./_shared/app-fixtures";
import {
  deleteObjectivesByPrefix,
  seedObjectives,
} from "./_shared/fixtures/objective-fixtures";

const RUN_ID = crypto.randomUUID();
const TEST_PREFIX = `E2E-${RUN_ID}`;
const objectiveTitle = `${TEST_PREFIX}-focus-pill-target`;
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

test("the sub-task pill marks work-in-progress without completing the task", async ({
  page,
}) => {
  const habitTitle = `E2E-Focus-${Date.now()}`;

  await page.goto("/");

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: objectiveOptionLabel }).click();
  await page.getByPlaceholder("Draft new daily ritual...").fill(habitTitle);
  await page.getByPlaceholder("Draft new daily ritual...").press("Enter");

  const card = page.locator("article", { hasText: objectiveTitle });
  const completion = card.getByRole("checkbox");
  const pill = card.getByRole("button", { name: "Work on this task" });

  await expect(completion).not.toBeChecked();

  await pill.click();
  await expect(pill).toHaveAttribute("aria-pressed", "true");
  await expect(completion).not.toBeChecked();

  await pill.click();
  await expect(pill).toHaveAttribute("aria-pressed", "false");

  await card.getByText(habitTitle).click();
  await expect(completion).toBeChecked();
});
