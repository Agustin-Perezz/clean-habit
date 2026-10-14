import { expect, test } from "./_shared/app-fixtures";
import { supabaseTestClient } from "./_shared/fixtures/supabase-test-client";

const RUN_ID = crypto.randomUUID();
const TEST_PREFIX = `E2E-${RUN_ID}`;
const quickIngestTargetTitle = `${TEST_PREFIX}-quick-ingest-target`;

test.beforeAll(async () => {
  const { error } = await supabaseTestClient.from("objectives").insert({
    title: quickIngestTargetTitle,
    category: `${TEST_PREFIX} Category`,
    accent_color: "#d98218",
    segments: [],
    habits: [],
  });

  if (error) {
    throw new Error(`Failed to seed quick-ingest target: ${error.message}`);
  }
});

test.afterAll(async () => {
  const { error } = await supabaseTestClient
    .from("objectives")
    .delete()
    .like("title", `${TEST_PREFIX}%`);

  if (error) {
    throw new Error(`Failed to clean up quick-ingest target: ${error.message}`);
  }
});

test("user can quick-ingest a ritual into the selected objective", async ({
  page,
}) => {
  const habitTitle = `E2E-Ritual-${Date.now()}`;

  await page.goto("/");

  await page.getByRole("combobox").click();
  await expect(page.getByRole("option").first()).toContainText(
    "Add to Deep Work & Focus",
  );
  await page.getByRole("option").first().click();
  await expect(page.getByRole("combobox")).toContainText(
    "Add to Deep Work & Focus",
  );

  await page.getByPlaceholder("Draft new daily ritual...").fill(habitTitle);
  await page.getByPlaceholder("Draft new daily ritual...").press("Enter");

  await expect(page.getByText(habitTitle)).toBeVisible();
});
