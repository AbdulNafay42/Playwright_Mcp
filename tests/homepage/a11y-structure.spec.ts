import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Edge Cases and Accessibility', () => {
  test('Heading hierarchy and landmarks', async ({ page }) => {
    await page.goto(`${BASE}/`);

    const levels = await page.$$eval('h1,h2,h3,h4,h5,h6', (hs) => hs.map((h) => Number(h.tagName[1])));
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    expect(levels.filter((l) => l === 2).length).toBeGreaterThan(0);
    expect(levels.filter((l) => l === 3).length).toBeGreaterThan(0);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1], `heading jump at index ${i}`).toBeLessThanOrEqual(1);
    }

    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Footer' })).toBeAttached();

    const missingAlt = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.hasAttribute('alt')).length);
    expect(missingAlt).toBe(0);
  });
});
