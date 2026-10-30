import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Responsiveness', () => {
  for (const size of [
    { width: 1920, height: 1080 },
    { width: 1280, height: 720 },
  ]) {
    test(`Desktop layout ${size.width}x${size.height}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto(`${BASE}/`);

      const nav = page.getByRole('navigation', { name: 'Main' });
      await expect(nav).toBeVisible();
      for (const n of ['About', 'Experience', 'Projects', 'Blog']) {
        await expect(nav.getByRole('link', { name: n })).toBeVisible();
      }
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('main').getByText('profile.ts').first()).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow).toBe(false);
    });
  }
});
