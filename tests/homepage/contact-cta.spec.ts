import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Sections and Content', () => {
  test('Contact call to action', async ({ page }) => {
    await page.goto(`${BASE}/`);

    const heading = page.getByRole('heading', { name: /Have a project or a role in mind\? Let.s talk\./ });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

    const email = page.locator('main a[href^="mailto:"]').last();
    await expect(email).toHaveAttribute('href', 'mailto:abdulnafay2005@gmail.com');
    await expect(email).toContainText('abdulnafay2005@gmail.com');

    await page.locator('main a[href="/contact"]').last().click();
    await expect(page).toHaveURL(/\/contact\/?$/);
  });
});
