import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Page Load and Metadata', () => {
  test('Broken resources and SEO checks', async ({ page }) => {
    const bad: string[] = [];
    page.on('response', (r) => {
      if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`);
    });

    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    expect(bad).toEqual([]);

    const portrait = page.getByRole('img', { name: 'Portrait of Abdul Nafay' });
    await portrait.scrollIntoViewIfNeeded();
    await expect(portrait).toBeVisible();
    await expect
      .poll(() => portrait.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
  });
});
