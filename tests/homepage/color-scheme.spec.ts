import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Edge Cases and Accessibility', () => {
  for (const scheme of ['dark', 'light'] as const) {
    test(`Content stays visible in ${scheme} scheme`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(`${BASE}/`);

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();

      // text colour must differ from the page background
      const same = await page.getByRole('heading', { level: 1 }).evaluate((el) => {
        const color = getComputedStyle(el).color;
        let node: Element | null = el;
        let bg = 'rgba(0, 0, 0, 0)';
        while (node) {
          bg = getComputedStyle(node).backgroundColor;
          if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') break;
          node = node.parentElement;
        }
        return color === bg;
      });
      expect(same).toBe(false);
    });
  }
});
