import { test, expect } from '@playwright/test';

test.describe('US5: FAQ Page - Finding Answers to Common Questions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/faq');
  });

  test('should display at least 10 FAQ entries', async ({ page }) => {
    // Wait for FAQ page to load
    await expect(page.locator('h1')).toContainText('よくある質問');

    // Count FAQ entries (questions)
    const faqItems = page.locator('[data-testid="faq-item"]');
    const count = await faqItems.count();

    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('should organize questions by category', async ({ page }) => {
    // Check for category headers
    const categoryHeaders = page.locator('[data-testid="faq-category"]');
    const categoryCount = await categoryHeaders.count();

    // Expect at least 3 categories (pricing, timeline, content, subsidies, maintenance)
    expect(categoryCount).toBeGreaterThanOrEqual(3);
  });

  test('should expand answer when question is clicked', async ({ page }) => {
    // Find first FAQ question
    const firstQuestion = page.locator('[data-testid="faq-question"]').first();
    const firstAnswer = page.locator('[data-testid="faq-answer"]').first();

    // Initially, answer should be hidden (collapsed)
    await expect(firstAnswer).not.toBeVisible();

    // Click question to expand
    await firstQuestion.click();

    // Answer should now be visible
    await expect(firstAnswer).toBeVisible();
  });

  test('should collapse answer when clicked again', async ({ page }) => {
    const firstQuestion = page.locator('[data-testid="faq-question"]').first();
    const firstAnswer = page.locator('[data-testid="faq-answer"]').first();

    // Expand
    await firstQuestion.click();
    await expect(firstAnswer).toBeVisible();

    // Collapse
    await firstQuestion.click();
    await expect(firstAnswer).not.toBeVisible();
  });

  test('should display contact CTA at bottom of page', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for contact CTA button (more specific selector)
    const contactCTA = page.getByRole('link', { name: '直接お問い合わせ' });

    await expect(contactCTA).toBeVisible();

    // Verify it links to contact page
    await expect(contactCTA).toHaveAttribute('href', /\/contact/);
  });

  test('should have accessible keyboard navigation', async ({ page }) => {
    const firstQuestion = page.locator('[data-testid="faq-question"]').first();

    // Tab to first question
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // May need multiple tabs depending on header

    // Press Enter to expand
    await firstQuestion.focus();
    await page.keyboard.press('Enter');

    const firstAnswer = page.locator('[data-testid="faq-answer"]').first();
    await expect(firstAnswer).toBeVisible();
  });

  test('should display FAQ metadata (SEO)', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/よくある質問/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });
});
