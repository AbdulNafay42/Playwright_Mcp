import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Navigation', () => {
  test('Browser back/forward', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(`${BASE}/projects`);

    await page.goBack();
    await expect(page).toHaveURL(`${BASE}/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Abdul Nafay, software engineer');

    await page.goForward();
    await expect(page).toHaveURL(`${BASE}/projects`);
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('Unknown route shows a 404 page with a way home', async ({ page }) => {
    const response = await page.goto(`${BASE}/does-not-exist`);
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/404|not found/i).first()).toBeVisible();
    await page.getByRole('link', { name: /home/i }).first().click();
    await expect(page).toHaveURL(`${BASE}/`);
  });
});
