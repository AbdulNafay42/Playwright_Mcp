import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Sections and Content', () => {
  test('Experience timeline', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const exp = page.locator('#experience');
    await exp.scrollIntoViewIfNeeded();

    const senior = exp.getByRole('heading', { name: 'Software Engineer', exact: true });
    const junior = exp.getByRole('heading', { name: 'Junior Front-End Developer' });
    await expect(senior).toBeVisible();
    await expect(junior).toBeVisible();
    await expect(exp).toContainText('Technyx Systems');
    await expect(exp).toContainText(/Jun 2024/);
    await expect(exp).toContainText('Bhabha Technologies');
    await expect(exp).toContainText(/Sep 2023/);
    await expect(exp).toContainText(/Apr 2024/);

    const a = await senior.boundingBox();
    const b = await junior.boundingBox();
    expect(a!.y).toBeLessThan(b!.y);

    await exp.locator('a[href="/experience"]').first().click();
    await expect(page).toHaveURL(/\/experience\/?$/);
  });
});
