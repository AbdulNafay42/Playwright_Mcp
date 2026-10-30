import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

const external = [
  { name: /Visit Hisabzo live site/i, href: 'https://www.hisabzo.online', host: 'hisabzo.online' },
  { name: /SellDesk source code on GitHub/i, href: 'https://github.com/AbdulNafay42/SellDesk', host: 'github.com' },
];

test.describe('External Links and Hero CTAs', () => {
  for (const e of external) {
    test(`External link ${e.host} opens securely in new tab`, async ({ page, context }) => {
      await page.goto(`${BASE}/`);
      const link = page.getByRole('link', { name: e.name }).first();
      await link.scrollIntoViewIfNeeded();
      await expect(link).toHaveAttribute('href', e.href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);

      const [popup] = await Promise.all([context.waitForEvent('page'), link.click()]);
      await expect(popup).toHaveURL(new RegExp(e.host.replace('.', '\.')), { timeout: 20_000 });
      await expect(page).toHaveURL(new RegExp(`^${BASE}/?$`));
    });
  }
});
