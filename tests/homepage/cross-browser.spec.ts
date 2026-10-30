import { test, expect, chromium, firefox, webkit } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

for (const [name, type] of [
  ['chromium', chromium],
  ['firefox', firefox],
  ['webkit', webkit],
] as const) {
  test(`Cross-browser smoke: ${name}`, async () => {
    const browser = await type.launch();
    try {
      const page = await browser.newPage();
      await page.goto(`${BASE}/`);
      await expect(page).toHaveTitle('Abdul Nafay | Software Engineer & React Developer');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      for (const id of ['about', 'skills', 'experience', 'projects']) {
        await expect(page.locator(`#${id}`)).toBeAttached();
      }
      await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Projects' }).click();
      await expect(page).toHaveURL(/\/projects\/?$/);
    } finally {
      await browser.close();
    }
  });
}
