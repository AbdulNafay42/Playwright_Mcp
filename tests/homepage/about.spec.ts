import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Sections and Content', () => {
  test('About section content', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();

    await expect(
      about.getByRole('heading', { name: 'Software engineer building production-ready web applications.' })
    ).toBeVisible();
    for (const t of ['Abdul Nafay', 'Technyx Systems', 'Karachi', 'Open to full-time & freelance']) {
      await expect(about.getByText(t).first()).toBeVisible();
    }
    for (const t of ['2+ years', 'Experience', 'Currently', 'Based in', 'Studying', 'Iqra University']) {
      await expect(about).toContainText(t);
    }

    await about.getByRole('link', { name: /about/i }).last().click();
    await expect(page).toHaveURL(/\/about\/?$/);
  });
});
