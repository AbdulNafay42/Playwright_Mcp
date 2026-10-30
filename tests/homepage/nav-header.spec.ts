import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Navigation', () => {
  test('Header nav links route to correct pages', async ({ page }) => {
    for (const name of ['About', 'Experience', 'Projects', 'Blog']) {
      await page.goto(`${BASE}/`);
      await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name, exact: true }).click();
      await expect(page).toHaveURL(`${BASE}/${name.toLowerCase()}`);
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }

    await page.goto(`${BASE}/`);
    await page.getByRole('banner').locator('a[href="/contact"]').first().click();
    await expect(page).toHaveURL(`${BASE}/contact`);
  });
});
