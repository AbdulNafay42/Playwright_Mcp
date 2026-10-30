import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Sections and Content', () => {
  test('Skills section lists all categories', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const categories = [
      'Languages',
      'Frameworks',
      'Backend',
      'Testing & quality',
      'Styling & motion',
      'UI craft',
      'CMS',
      'Workflow',
    ];
    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();

    for (const c of categories) {
      await expect(skills.getByRole('heading', { name: c, exact: true })).toBeVisible();
      await expect(skills.getByRole('list', { name: `${c} skills` })).toBeVisible();
    }

    const langs = skills.getByRole('list', { name: 'Languages skills' });
    for (const s of ['HTML5', 'CSS3', 'SCSS / Sass', 'JavaScript', 'TypeScript']) {
      await expect(langs).toContainText(s);
    }
    await expect(skills.getByRole('list', { name: 'Workflow skills' }).getByRole('listitem')).toHaveCount(9);
  });
});
