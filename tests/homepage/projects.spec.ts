import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

const projects = [
  { title: 'Tourism Platform', slug: 'tourism-platform' },
  { title: 'E-Learning Platform', slug: 'e-learning-platform' },
  { title: 'Hisabzo', slug: 'hisabzo' },
  { title: 'SellDesk', slug: 'selldesk' },
];

test.describe('Sections and Content', () => {
  test('Featured projects cards', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const section = page.locator('#projects');
    await section.scrollIntoViewIfNeeded();

    for (const p of projects) {
      await expect(section.getByRole('heading', { name: p.title })).toBeVisible();
    }
    await expect(section.getByText(/Under NDA/i).first()).toBeVisible();
    await expect(section.getByText(/Client work/i).first()).toBeVisible();
    await expect(section.getByText('Live', { exact: true }).first()).toBeVisible();
    await expect(section.getByText(/In development/i).first()).toBeVisible();
    await expect(section.getByText('+1').first()).toBeVisible();
    await expect(section.getByText(/illustration/i)).toHaveCount(4);
  });

  for (const p of projects) {
    test(`Project title link routes to ${p.slug}`, async ({ page }) => {
      await page.goto(`${BASE}/`);
      await page.locator('#projects').getByRole('link', { name: p.title }).first().click();
      await expect(page).toHaveURL(new RegExp(`/projects/${p.slug}/?$`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  }

  test('Projects section arrow link', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.locator('#projects a[href="/projects"]').first().click();
    await expect(page).toHaveURL(/\/projects\/?$/);
  });
});
