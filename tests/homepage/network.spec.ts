import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Edge Cases and Accessibility', () => {
  test('Slow network still renders content', async ({ page, context }) => {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 400,
      downloadThroughput: (500 * 1024) / 8,
      uploadThroughput: (500 * 1024) / 8,
    });
    await page.goto(`${BASE}/`, { timeout: 90_000 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 60_000 });
  });

  test('Blocked images keep layout intact', async ({ page }) => {
    await page.route('**/*', (route) =>
      route.request().resourceType() === 'image' ? route.abort() : route.continue()
    );
    await page.goto(`${BASE}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('img[alt="Portrait of Abdul Nafay"]')).toBeAttached();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});
