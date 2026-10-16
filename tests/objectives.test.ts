import { expect, test } from "./_shared/app-fixtures";
import {
  deleteObjectivesByPrefix,
  seedObjectives,
} from "./_shared/fixtures/objective-fixtures";

const RUN_ID = crypto.randomUUID();
const TEST_PREFIX = `E2E-${RUN_ID}`;

test.beforeAll(async () => {
  await seedObjectives({
    titles: [
      `${TEST_PREFIX}-edit-card`,
      `${TEST_PREFIX}-delete-card`,
      `${TEST_PREFIX}-header-delete-card`,
    ],
    category: `${TEST_PREFIX} Category`,
  });
});

test.afterAll(async () => {
  await deleteObjectivesByPrefix(TEST_PREFIX);
});

test("home page loads and shows the objective workspace", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Focus & Habits" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "New Objective" }),
  ).toBeVisible();
});

test("user can create an objective via the New Objective modal", async ({
  page,
}) => {
  const title = `${TEST_PREFIX}-create-${Date.now()}`;
  const category = `${TEST_PREFIX} Created Category`;

  await page.goto("/");

  await page.getByRole("button", { name: "New Objective" }).click();
  await page.getByPlaceholder("Deep Work & Focus").fill(title);
  await page.getByPlaceholder("Cognitive Discipline").fill(category);
  await page.getByRole("button", { name: "Create objective" }).click();

  // The quick-ingest trigger renders "Add to <title>", so match the card
  // heading exactly instead of by substring.
  await expect(page.getByText(title, { exact: true })).toBeVisible();
  await expect(page.getByText(category, { exact: true })).toBeVisible();
});

test("user can edit an objective from the card header", async ({ page }) => {
  const originalTitle = `${TEST_PREFIX}-edit-card`;
  const updatedTitle = `${TEST_PREFIX}-edit-card-updated`;

  await page.goto("/");

  await page.getByRole("button", { name: `Edit ${originalTitle}` }).click();
  await page.getByPlaceholder("Deep Work & Focus").fill(updatedTitle);
  await page.getByRole("button", { name: "Save changes" }).click();

  await expect(page.getByText(updatedTitle, { exact: true })).toBeVisible();
});

test("user can delete an objective from the edit dialog", async ({ page }) => {
  const title = `${TEST_PREFIX}-delete-card`;

  await page.goto("/");

  await page.getByRole("button", { name: `Edit ${title}` }).click();
  await page.getByRole("button", { name: "Delete objective" }).click();

  await expect(page.getByText(title, { exact: true })).toBeHidden();
});

test("user can delete an objective straight from the card header", async ({
  page,
}) => {
  const title = `${TEST_PREFIX}-header-delete-card`;

  await page.goto("/");
  await expect(page.getByText(title, { exact: true })).toBeVisible();

  await page.getByRole("button", { name: `Delete ${title}` }).click();

  await expect(page.getByText(title, { exact: true })).toBeHidden();
});
