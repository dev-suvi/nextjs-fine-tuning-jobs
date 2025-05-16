import { test, expect } from "@playwright/test";

test("loads dashboard with mocked jobs", async ({ page }) => {
  await page.route("**/api/jobs", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        jobs: [
          {
            id: "1",
            name: "Mock Job",
            status: "Completed",
            createdAt: Date.now(),
          },
        ],
      }),
    })
  );

  await page.goto("/");
  await expect(page.getByText("Mock Job")).toBeVisible();
});
