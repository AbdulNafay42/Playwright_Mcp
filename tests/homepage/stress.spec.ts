import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Edge Cases and Accessibility', () => {
  test('Rapid interaction and repeated navigation', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    await page.goto(`${BASE}/`);
    const nav = page.getByRole('navigation', { name: 'Main' });

    for (let i = 0; i < 3; i++) {
      for (const n of ['About', 'Projects', 'Blog']) {
        await nav.getByRole('link', { name: n }).click();
        await expect(page).toHaveURL(new RegExp(`/${n.toLowerCase()}/?$`));
        await page.goBack();
        await expect(page).toHaveURL(new RegExp(`^${BASE}/?(#.*)?$`));
        await expect(nav).toBeVisible();
      }
      await page.mouse.wheel(0, 3000);
      await page.mouse.wheel(0, -3000);
    }

    await page.mouse.wheel(0, 1500);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(errors).toEqual([]);
  });
});
