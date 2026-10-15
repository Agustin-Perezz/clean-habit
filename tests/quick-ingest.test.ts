import { expect, test } from "./_shared/app-fixtures";
import {
  deleteObjectivesByPrefix,
  seedObjectives,
} from "./_shared/fixtures/objective-fixtures";

const RUN_ID = crypto.randomUUID();
const TEST_PREFIX = `E2E-${RUN_ID}`;
const quickIngestTargetTitle = `${TEST_PREFIX}-quick-ingest-target`;
const quickIngestTargetOptionLabel = `Add to ${quickIngestTargetTitle}`;

test.beforeAll(async () => {
  await seedObjectives({
    titles: [quickIngestTargetTitle],
    category: `${TEST_PREFIX} Category`,
  });
});

test.afterAll(async () => {
  await deleteObjectivesByPrefix(TEST_PREFIX);
});

test("user can quick-ingest a ritual into the selected objective", async ({
  page,
}) => {
  const habitTitle = `E2E-Ritual-${Date.now()}`;

  await page.goto("/");

  await page.getByRole("combobox").click();
  await expect(
    page.getByRole("option", { name: quickIngestTargetOptionLabel }),
  ).toBeVisible();
  await page
    .getByRole("option", { name: quickIngestTargetOptionLabel })
    .click();
  await expect(page.getByRole("combobox")).toContainText(
    quickIngestTargetOptionLabel,
  );

  await page.getByPlaceholder("Draft new daily ritual...").fill(habitTitle);
  await page.getByPlaceholder("Draft new daily ritual...").press("Enter");

  await expect(page.getByText(habitTitle)).toBeVisible();
});
