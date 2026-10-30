import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Responsiveness', () => {
  test('Viewport resize and orientation change', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}/`);

    for (const size of [
      { width: 390, height: 844 },
      { width: 667, height: 375 },
    ]) {
      await page.setViewportSize(size);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.getByRole('banner')).toHaveCount(1);
      await expect(page.getByRole('contentinfo')).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow).toBe(false);
    }
  });
});
