import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

const slugs = [
  'server-vs-client-components-nextjs',
  'reusable-react-components',
  'figma-to-responsive-ui-checklist',
];

test.describe('Sections and Content', () => {
  test('Latest blog posts', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const blog = page.locator('#writing');
    await blog.scrollIntoViewIfNeeded();

    const articles = blog.getByRole('article');
    await expect(articles).toHaveCount(3);
    await expect(blog.getByText(/Read article/i)).toHaveCount(3);

    const text = (await blog.innerText()).replace(/\s+/g, ' ');
    const i1 = text.search(/22 Oct(ober)? 2026/);
    const i2 = text.search(/5 Oct(ober)? 2026/);
    const i3 = text.search(/14 Sep(t|tember)? 2026/);
    expect(i1).toBeGreaterThanOrEqual(0);
    expect(i1).toBeLessThan(i2);
    expect(i2).toBeLessThan(i3);
  });

  for (const slug of slugs) {
    test(`Article link routes to ${slug}`, async ({ page }) => {
      await page.goto(`${BASE}/`);
      await page.locator(`a[href="/blog/${slug}"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`/blog/${slug}/?$`));
    });
  }

  test('Blog section arrow link', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.locator('main a[href="/blog"]').first().click();
    await expect(page).toHaveURL(/\/blog\/?$/);
  });
});
