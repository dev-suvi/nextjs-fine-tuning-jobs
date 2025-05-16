import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and displays job list", async ({ page }) => {
    // Wait for the title or stable element
    const heading = page.getByRole("heading", { name: /jobs/i });

    await expect(heading).toBeVisible();

    // Check button exists
    await expect(
      page.getByRole("button", { name: /New Fine tuning Job/i })
    ).toBeVisible();
  });

  test("navigates to job creation page", async ({ page }) => {
    await page.getByTestId("new-job-btn").click();

    // Wait for page navigation
    await expect(page).toHaveURL(/\/jobs\/create/);
  });
});
