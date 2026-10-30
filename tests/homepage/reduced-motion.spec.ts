import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Edge Cases and Accessibility', () => {
  test('Reduced motion shows all content immediately', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${BASE}/`);

    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    const hidden = await h1.evaluate((el) =>
      Array.from(el.querySelectorAll('*')).filter((n) => parseFloat(getComputedStyle(n).opacity) < 0.99).length
    );
    expect(hidden).toBe(0);
    await expect(page.locator('main').first()).toContainText(/Software Engineer\s*·\s*Technyx Systems/);
  });
});
