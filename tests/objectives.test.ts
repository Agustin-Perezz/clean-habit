import { expect, test } from "./_shared/app-fixtures";
import { supabaseTestClient } from "./_shared/fixtures/supabase-test-client";

const RUN_ID = crypto.randomUUID();
const TEST_PREFIX = `E2E-${RUN_ID}`;
const seededTitles: string[] = [];

test.beforeAll(async () => {
  const titles = [`${TEST_PREFIX}-edit-card`, `${TEST_PREFIX}-delete-card`];

  const { error } = await supabaseTestClient.from("objectives").insert(
    titles.map((title) => ({
      title,
      category: `${TEST_PREFIX} Category`,
      accent_color: "#d98218",
      segments: [],
      habits: [],
    })),
  );

  if (error) {
    throw new Error(`Failed to seed test objectives: ${error.message}`);
  }

  seededTitles.push(...titles);
});

test.afterAll(async () => {
  if (seededTitles.length === 0) return;

  const { error } = await supabaseTestClient
    .from("objectives")
    .delete()
    .like("title", `${TEST_PREFIX}%`);

  if (error) {
    throw new Error(`Failed to clean up test objectives: ${error.message}`);
  }
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

  await expect(page.getByText(title)).toBeVisible();
  await expect(page.getByText(category)).toBeVisible();
});

test("user can edit an objective from the card header", async ({ page }) => {
  const originalTitle = `${TEST_PREFIX}-edit-card`;
  const updatedTitle = `${TEST_PREFIX}-edit-card-updated`;

  await page.goto("/");

  await page.getByRole("button", { name: `Edit ${originalTitle}` }).click();
  await page.getByPlaceholder("Deep Work & Focus").fill(updatedTitle);
  await page.getByRole("button", { name: "Save changes" }).click();

  await expect(page.getByText(updatedTitle)).toBeVisible();
});

test("user can delete an objective from the edit dialog", async ({ page }) => {
  const title = `${TEST_PREFIX}-delete-card`;

  await page.goto("/");

  await page.getByRole("button", { name: `Edit ${title}` }).click();
  await page.getByRole("button", { name: "Delete objective" }).click();

  await expect(page.getByText(title)).toBeHidden();
});
