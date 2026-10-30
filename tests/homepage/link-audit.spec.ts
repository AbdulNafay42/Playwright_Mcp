import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('External Links and Hero CTAs', () => {
  test('Hash-free link audit', async ({ page, request }) => {
    await page.goto(`${BASE}/`);

    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')!));
    expect(hrefs.filter((h) => h === '' || h === '#')).toEqual([]);

    const internal = [
      ...new Set(
        hrefs
          .filter((h) => h.startsWith('/') || h.startsWith(BASE))
          .map((h) => new URL(h, BASE))
          .filter((u) => !u.hash || u.pathname !== '/')
          .map((u) => u.origin + u.pathname)
      ),
    ];
    for (const url of internal) {
      const res = await request.get(url);
      expect.soft(res.status(), url).toBe(200);
    }
  });

  test('Links have an accessible name', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const unnamed = await page.$$eval('a[href]', (as) =>
      as
        .filter((a) => {
          const name = (a.getAttribute('aria-label') || a.textContent || '').trim();
          const labelledBy = a.getAttribute('aria-labelledby');
          const imgAlt = a.querySelector('img[alt]:not([alt=""])');
          const title = a.getAttribute('title');
          return !name && !labelledBy && !imgAlt && !title;
        })
        .map((a) => a.outerHTML.slice(0, 120))
    );
    expect(unnamed, 'links without accessible names (a11y defect)').toEqual([]);
  });
});
