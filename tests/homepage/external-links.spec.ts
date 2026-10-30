import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';
const GITHUB = 'https://github.com/AbdulNafay42';
const LINKEDIN = 'https://www.linkedin.com/in/abdul-nafay-2b1572241/';

test.describe('External Links and Hero CTAs', () => {
  test('Social links open in new tab securely', async ({ page }) => {
    await page.goto(`${BASE}/`);

    for (const href of [GITHUB, LINKEDIN]) {
      const links = page.locator(`a[href="${href}"]`);
      expect(await links.count()).toBeGreaterThanOrEqual(3); // hero, about, footer
      for (const link of await links.all()) {
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
        await expect(link).toHaveAccessibleName(/\(opens in a new tab\)/);
      }
    }
  });

  test('GitHub link opens a new tab and leaves homepage intact', async ({ page, context }) => {
    await page.goto(`${BASE}/`);
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.locator(`main a[href="${GITHUB}"]`).first().click(),
    ]);
    await expect(popup).toHaveURL(/github\.com\/AbdulNafay42/, { timeout: 20_000 });
    await expect(page).toHaveURL(new RegExp(`^${BASE}/?$`));
  });
});
