/**
 * User Story 4 E2E Test: Process Page
 * Tests that the process page displays all project phases with details
 */

import { test, expect } from '@playwright/test';

test.describe('US4: Process Page - Project Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the process page
    await page.goto('/process');
  });

  test('should display the process page with title and description', async ({ page }) => {
    // Check page title - main hero title
    await expect(page.locator('h1')).toContainText('プロジェクト進行');

    // Check that there's a description - this is part of the hero section
    await expect(page.locator('text=お問い合わせから運用までの流れ')).toBeVisible();

    // Check that main content section exists
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('should display all 7 project phases', async ({ page }) => {
    // Define the expected phases
    const expectedPhases = [
      { name: 'お問い合わせ・無料相談', keyword: 'お問い合わせ' },
      { name: '要件定義・お見積もり', keyword: '要件定義' },
      { name: 'ご契約・設計', keyword: '設計' },
      { name: '実装・開発', keyword: '実装' },
      { name: 'テスト・検収', keyword: 'テスト' },
      { name: '公開（納品）', keyword: '公開' },
      { name: '運用・保守', keyword: '保守' }
    ];

    // Check that each phase is visible
    for (const phase of expectedPhases) {
      const phaseElement = page.locator(`text=${phase.keyword}`).first();
      await expect(phaseElement).toBeVisible();
    }
  });

  test('should display duration information for each phase', async ({ page }) => {
    // Check for duration keywords
    const durationKeywords = ['週間', '日', 'ヶ月', '期間'];

    let hasDuration = false;
    for (const keyword of durationKeywords) {
      const durationElements = page.locator(`text=${keyword}`);
      const count = await durationElements.count();
      if (count > 0) {
        hasDuration = true;
        break;
      }
    }

    expect(hasDuration).toBe(true);
  });

  test('should display phase descriptions', async ({ page }) => {
    // Check that there's descriptive text (paragraphs with substantial content)
    const paragraphs = page.locator('p').filter({ hasText: /\S{20,}/ });
    const count = await paragraphs.count();

    // Should have at least 7 paragraphs (one for each phase)
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test('should display CTA to contact', async ({ page }) => {
    // Check for consultation CTA
    const ctaKeywords = ['相談', 'お問い合わせ', 'プロジェクト'];

    let hasContactCTA = false;
    for (const keyword of ctaKeywords) {
      const ctaButton = page.locator(`a:has-text("${keyword}")`);
      const count = await ctaButton.count();
      if (count > 0) {
        hasContactCTA = true;
        // Verify it links to contact page
        const href = await ctaButton.first().getAttribute('href');
        expect(href).toContain('/contact');
        break;
      }
    }

    expect(hasContactCTA).toBe(true);
  });

  test('should have proper SEO metadata', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/制作の流れ/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that main heading is still visible
    await expect(page.locator('h1')).toBeVisible();

    // Check that content is not overflowing
    const body = page.locator('body');
    const bodyWidth = await body.evaluate((el) => el.scrollWidth);
    const viewportWidth = 375;

    // Allow small overflow for scrollbars
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
  });

  test('should display client responsibilities per phase', async ({ page }) => {
    // Check for responsibility-related keywords
    const responsibilityKeywords = ['お客様', 'ご用意', 'ご確認', '確認', 'ご協力'];

    let hasResponsibilities = false;
    for (const keyword of responsibilityKeywords) {
      const elements = page.locator(`text=${keyword}`);
      const count = await elements.count();
      if (count > 0) {
        hasResponsibilities = true;
        break;
      }
    }

    expect(hasResponsibilities).toBe(true);
  });

  test('should allow navigation back to home', async ({ page }) => {
    // Check that header/nav exists with home link
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });
});
