import { expect, test } from "./_shared/app-fixtures";

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
