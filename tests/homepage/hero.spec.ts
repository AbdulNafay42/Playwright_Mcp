import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Page Load and Metadata', () => {
  test('Hero content and animation settle', async ({ page }) => {
    await page.goto(`${BASE}/`);

    await expect(page.locator('main').first()).toContainText(/Software Engineer\s*·\s*Technyx Systems/);
    await expect(page.getByText(/Hi, I.m Abdul Nafay/).first()).toBeVisible();

    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    // animated words settle: every child span reaches full opacity
    await expect
      .poll(async () =>
        h1.evaluate((el) => {
          const nodes = Array.from(el.querySelectorAll('*'));
          return nodes.every((n) => parseFloat(getComputedStyle(n).opacity) >= 0.99);
        })
      )
      .toBe(true);

    // profile.ts code card
    const card = page.locator('main').getByText('profile.ts').first();
    await expect(card).toBeVisible();
    const main = page.locator('main').first();
    for (const t of ['Abdul Nafay', 'Karachi, Pakistan', 'Technyx Systems']) {
      await expect(main).toContainText(t);
    }
  });
});
