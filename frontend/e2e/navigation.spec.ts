import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads and has key sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Arvexo/);
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("thank-you page is accessible", async ({ page }) => {
    await page.goto("/thank-you");
    await expect(page.locator("h1")).toContainText("Заявка принята");
    await expect(page.locator("text=Следить за статусом")).toBeVisible();
  });

  test("cases page loads", async ({ page }) => {
    await page.goto("/cases");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("account page shows login for unauthenticated user", async ({ page }) => {
    await page.goto("/account");
    await expect(page.locator("text=Войдите в аккаунт")).toBeVisible();
  });
});
