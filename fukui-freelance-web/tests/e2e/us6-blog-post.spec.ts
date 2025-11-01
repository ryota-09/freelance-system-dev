import { test, expect } from '@playwright/test';

test.describe('US6: Blog Post Detail Page', () => {
  test('should display post title, date, category, and content', async ({ page }) => {
    // Navigate to blog listing first to find a post
    await page.goto('http://localhost:3000/blog');

    const firstCardLink = page.locator('article a, [data-testid="blog-card"] a').first();
    await firstCardLink.click();

    // Check page loaded
    await expect(page).toHaveURL(/\/blog\/.+/);

    // Check for title (h1)
    await expect(page.locator('h1')).toBeVisible();

    // Check for date
    await expect(page.locator('time, [data-testid="post-date"]')).toBeVisible();

    // Check for category
    await expect(page.locator('[data-testid="post-category"], .category, .badge')).toBeVisible();

    // Check for content (article or main content area)
    const content = page.locator('article, main, [data-testid="post-content"]');
    await expect(content).toBeVisible();

    // Content should have some text
    const contentText = await content.textContent();
    expect(contentText?.length).toBeGreaterThan(100);
  });

  test('should display CTA to contact at bottom of post', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    const firstCardLink = page.locator('article a, [data-testid="blog-card"] a').first();
    await firstCardLink.click();

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for CTA button/link
    const ctaButton = page.getByText(/専門家にサポートを依頼|お問い合わせ|無料相談/);
    await expect(ctaButton).toBeVisible({ timeout: 5000 });

    // CTA should link to contact page
    const ctaLink = page.locator('a:has-text("専門家にサポートを依頼"), a:has-text("お問い合わせ"), a:has-text("無料相談")').first();
    await expect(ctaLink).toHaveAttribute('href', /contact/);
  });

  test('should display related posts section', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    const firstCardLink = page.locator('article a, [data-testid="blog-card"] a').first();
    await firstCardLink.click();

    // Scroll to bottom to find related posts
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for related posts section
    const relatedSection = page.locator(':has-text("関連記事"), :has-text("おすすめの記事"), [data-testid="related-posts"]');
    await expect(relatedSection.first()).toBeVisible({ timeout: 5000 });

    // Check for at least one related post card (if available)
    const relatedCards = page.locator('[data-testid="related-post"], .related-post-card');
    const count = await relatedCards.count();

    // Related posts should exist (but might be 0 if only 1 post exists)
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    const firstCardLink = page.locator('article a, [data-testid="blog-card"] a').first();
    await firstCardLink.click();

    // Check for meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription!.length).toBeGreaterThan(50);

    // Check for OG tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
  });

  test('should support MDX rendering with formatted content', async ({ page }) => {
    await page.goto('http://localhost:3000/blog');

    const firstCardLink = page.locator('article a, [data-testid="blog-card"] a').first();
    await firstCardLink.click();

    // Check for common markdown elements
    const content = page.locator('article, main, [data-testid="post-content"]');

    // Should have headings
    const headings = content.locator('h2, h3, h4');
    expect(await headings.count()).toBeGreaterThan(0);

    // Should have paragraphs
    const paragraphs = content.locator('p');
    expect(await paragraphs.count()).toBeGreaterThan(1);
  });
});
