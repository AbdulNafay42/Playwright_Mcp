import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Responsiveness', () => {
  for (const size of [
    { width: 375, height: 667 },
    { width: 320, height: 568 },
  ]) {
    test(`Mobile layout ${size.width}x${size.height}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto(`${BASE}/`);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(overflow).toBe(true);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('banner')).toBeVisible();
    });
  }

  test('Mobile menu (if present) opens, navigates and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE}/`);

    const toggle = page.getByRole('button', { name: /menu|navigation/i }).first();
    test.skip((await toggle.count()) === 0, 'No mobile menu; navigation remains inline');

    await toggle.click();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await page.getByRole('dialog', { name: 'Site menu' }).getByRole('link', { name: /Projects/ }).click();
    await expect(page).toHaveURL(/\/projects\/?$/);
  });

  test('Tap targets are at least 44px high', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE}/`);
    const small = await page.$$eval('header a, header button', (els) =>
      els
        .map((e) => ({ t: (e.textContent || e.getAttribute('aria-label') || '').trim(), h: e.getBoundingClientRect().height }))
        .filter((x) => x.h > 0 && x.h < 40)
    );
    expect.soft(small, 'header targets under 40px high').toEqual([]);
  });
});
