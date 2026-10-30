import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Edge Cases and Accessibility', () => {
  // 200% and 400% zoom at 1280px wide are equivalent to CSS viewports of 640 and 320px
  for (const { zoom, width } of [
    { zoom: 200, width: 640 },
    { zoom: 400, width: 320 },
  ]) {
    test(`Content reflows at ${zoom}% zoom`, async ({ page }) => {
      await page.setViewportSize({ width, height: 256 * (100 / zoom) * 4 });
      await page.goto(`${BASE}/`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow).toBe(false);
    });
  }
});
