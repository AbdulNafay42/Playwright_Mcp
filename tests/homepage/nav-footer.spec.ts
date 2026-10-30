import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

test.describe('Navigation', () => {
  for (const { name, path } of links) {
    test(`Footer navigation link: ${name}`, async ({ page }) => {
      await page.goto(`${BASE}/`);
      await page
        .getByRole('navigation', { name: 'Footer' })
        .getByRole('link', { name, exact: true })
        .click();
      await expect(page).toHaveURL(`${BASE}${path}`);
    });
  }
});
