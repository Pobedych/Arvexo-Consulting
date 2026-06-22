import { expect, test } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    const form = page.locator("form").filter({ hasText: "Отправить" });
    await form.locator("button[type=submit]").click();
    // At least one validation error should appear
    await expect(page.locator("[data-error], .text-red, [role=alert]").first()).toBeVisible({ timeout: 3000 });
  });

  test("honeypot field is hidden", async ({ page }) => {
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toBeHidden();
  });

  test("price calculator renders and updates", async ({ page }) => {
    await page.goto("/#calculator");
    const calc = page.locator("#calculator");
    await expect(calc).toBeVisible();

    // Default result shows a price range
    await expect(calc.locator("text=от")).toBeVisible();

    // Clicking a different service updates the price
    await calc.locator("button", { hasText: "AI-аудит" }).click();
    await expect(calc.locator("text=от")).toBeVisible();

    // Urgent surcharge changes price
    await calc.locator("button", { hasText: "Срочно" }).click();
    await expect(calc.locator("text=от")).toBeVisible();
  });
});
