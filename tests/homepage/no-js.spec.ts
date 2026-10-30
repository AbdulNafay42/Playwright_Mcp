import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Edge Cases and Accessibility', () => {
  test.use({ javaScriptEnabled: false });

  test('Core content is server rendered without JavaScript', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeAttached();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Abdul Nafay');
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'About' })).toBeAttached();
    await expect(nav.getByRole('link', { name: 'Projects' })).toBeAttached();
  });
});
