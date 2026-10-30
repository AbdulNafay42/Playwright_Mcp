import { test, expect } from '@playwright/test';

const BASE = 'https://abdulnafay.vercel.app';

test.describe('Navigation', () => {
  test('Skip to content link and keyboard navigation', async ({ page }) => {
    await page.goto(`${BASE}/`);

    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator('#main')).toBeInViewport();

    // Tab through header/hero: focus always lands on a visible element, no trap.
    await page.goto(`${BASE}/`);
    const seen: string[] = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          key: `${el.tagName}:${el.getAttribute('href') ?? el.textContent?.trim().slice(0, 20)}`,
          visible: r.width > 0 && r.height > 0,
          indicator: cs.outlineStyle !== 'none' || cs.boxShadow !== 'none',
        };
      });
      expect(info, `focus lost at tab ${i + 1}`).not.toBeNull();
      expect(info!.visible).toBe(true);
      expect(info!.indicator, `no focus indicator on ${info!.key}`).toBe(true);
      seen.push(info!.key);
    }
    expect(new Set(seen).size, 'focus should advance through distinct elements').toBeGreaterThan(5);
  });
});
