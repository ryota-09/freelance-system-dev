import { test, expect } from '@playwright/test';

/**
 * User Story 1: Initial Site Visit & Understanding Services
 * Test: Homepage hero section displays value proposition
 */
test.describe('US1: Homepage Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero headline with Fukui and service keywords', async ({ page }) => {
    // Check for hero section
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    // Check headline contains "福井" and service-related keywords
    const headline = hero.locator('h1');
    await expect(headline).toBeVisible();

    const headlineText = await headline.textContent();
    expect(headlineText).toMatch(/福井/);
    expect(headlineText).toMatch(/Web制作|システム開発|ホームページ/);
  });

  test('should display subheading explaining target audience', async ({ page }) => {
    const hero = page.locator('section').first();

    // Check for subheading or description
    const subheading = hero.locator('p, h2').first();
    await expect(subheading).toBeVisible();

    const subheadingText = await subheading.textContent();
    expect(subheadingText).toMatch(/小規模|事業者|中小企業|地域|福井/);
  });

  test('should display primary CTA button for free consultation', async ({ page }) => {
    // Check for "無料相談予約" button in hero section
    const hero = page.locator('section').first();
    const ctaButton = hero.getByRole('link', { name: /無料相談予約|相談予約|無料相談/ }).first();
    await expect(ctaButton).toBeVisible();

    // Verify it's clickable and has correct href
    await expect(ctaButton).toHaveAttribute('href', /\/contact/);
  });

  test('should have hero background or visual element', async ({ page }) => {
    const hero = page.locator('section').first();

    // Check for background image or gradient
    const bgStyle = await hero.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundImage: styles.backgroundImage,
        backgroundColor: styles.backgroundColor,
      };
    });

    // Should have either background image or non-white background color
    const hasBackground =
      bgStyle.backgroundImage !== 'none' ||
      bgStyle.backgroundColor !== 'rgba(0, 0, 0, 0)';

    expect(hasBackground).toBeTruthy();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const hero = page.locator('section').first();
    const headline = hero.locator('h1');

    await expect(headline).toBeVisible();

    // Check if text is readable (not overflowing)
    const box = await headline.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const hero = page.locator('section').first();
    const ctaButton = hero.getByRole('link', { name: /無料相談予約|相談予約|無料相談/ }).first();

    // Check button is accessible
    await expect(ctaButton).toHaveAttribute('href');

    // Check images have alt text (if any)
    const images = await hero.locator('img').all();
    for (const img of images) {
      await expect(img).toHaveAttribute('alt');
    }
  });
});
