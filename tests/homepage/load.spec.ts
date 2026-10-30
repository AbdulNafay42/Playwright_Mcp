import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Page Load and Metadata', () => {
  test('Homepage loads with correct title and main landmarks', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    const response = await page.goto(`${BASE}/`);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle('Abdul Nafay | Software Engineer & React Developer');
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();

    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(
      'Abdul Nafay, software engineer. I build modern web applications with pixel-perfect precision.'
    );

    expect(errors).toEqual([]);
  });
});
