import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('External Links and Hero CTAs', () => {
  test('Primary projects CTA navigates to /projects', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.locator('main a[href="/projects"]').first().click();
    await expect(page).toHaveURL(/\/projects\/?$/);
  });

  test('Get in touch navigates to /contact', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.getByRole('link', { name: /Get in touch/i }).first().click();
    await expect(page).toHaveURL(/\/contact\/?$/);
  });
});
