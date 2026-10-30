import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Navigation', () => {
  test('Logo returns to home', async ({ page }) => {
    await page.goto(`${BASE}/about`);
    await page.getByRole('banner').getByRole('link', { name: 'Abdul Nafay — home' }).click();
    await expect(page).toHaveURL(`${BASE}/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Abdul Nafay, software engineer');
  });
});
