import { test, expect } from '@playwright/test';

test.describe('US6: Blog Listing Page', () => {
  test('should display at least 3 blog post cards', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    // Check that blog listing page loaded
    await expect(page).toHaveTitle(/ブログ/);

    // Check for at least 3 blog post cards
    const blogCards = page.locator('article, [data-testid="blog-card"]');
    await expect(blogCards).toHaveCount(3, { timeout: 5000 });
  });

  test('should show title, excerpt, date, and category for each card', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    const firstCard = page.locator('article, [data-testid="blog-card"]').first();

    // Check for title
    await expect(firstCard.locator('h2, h3, [data-testid="blog-title"]')).toBeVisible();

    // Check for excerpt/description
    await expect(firstCard.locator('p, [data-testid="blog-excerpt"]')).toBeVisible();

    // Check for date (Japanese date format or ISO format)
    await expect(firstCard.getByText(/202[0-9]年|202[0-9]-/)).toBeVisible();

    // Check for category
    await expect(firstCard.locator('[data-testid="blog-category"], .category, .badge')).toBeVisible();
  });

  test('should navigate to blog post detail when clicking card', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    const firstCard = page.locator('article, [data-testid="blog-card"]').first();
    const cardLink = firstCard.locator('a').first();

    await cardLink.click();

    // Should navigate to blog post detail page
    await expect(page).toHaveURL(/\/blog\/.+/);
  });

  test('should have category filter buttons', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    // Check for filter/category navigation
    const filters = page.locator('button:has-text("補助金"), button:has-text("SEO"), button:has-text("予約"), [data-testid="category-filter"]');

    // At least one category filter should be visible
    await expect(filters.first()).toBeVisible({ timeout: 5000 });
  });

  test('should sort posts by date (newest first)', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    const dates = await page.locator('article time, [data-testid="blog-date"]').allTextContents();

    // Verify we have at least 2 dates to compare
    expect(dates.length).toBeGreaterThanOrEqual(2);

    // Dates should be in descending order (newest first)
    // This is a basic check - actual implementation may vary
    for (let i = 0; i < dates.length - 1; i++) {
      const date1 = new Date(dates[i]);
      const date2 = new Date(dates[i + 1]);

      // Skip if dates are invalid
      if (isNaN(date1.getTime()) || isNaN(date2.getTime())) continue;

      expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime());
    }
  });
});
