import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Navigation', () => {
  test('In-page anchors: Scroll and Back to top', async ({ page }) => {
    await page.goto(`${BASE}/`);

    await page.getByRole('link', { name: /^Scroll/ }).first().click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.locator('#about')).toBeInViewport();

    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
    await page.getByRole('link', { name: /Back to top/i }).click();
    await expect(page).toHaveURL(/#top$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
  });
});
