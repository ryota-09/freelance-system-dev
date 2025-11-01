import { test, expect } from '@playwright/test';

/**
 * User Story 2: Viewing Case Studies & Building Trust
 * T035 [P] [US2] E2E test: Case studies listing page shows minimum 2 studies
 *
 * Test Goal: Verify visitors can see at least 2 detailed case studies with KPIs
 */

test.describe('Case Studies Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to case studies page from homepage', async ({ page }) => {
    // Navigate to case studies from homepage
    const caseStudiesLink = page.locator('a[href*="/case-studies"]').first();
    await expect(caseStudiesLink).toBeVisible();
    await caseStudiesLink.click();

    // Verify URL changed to case studies page
    await expect(page).toHaveURL(/\/case-studies/);
  });

  test('should display minimum 2 case study cards', async ({ page }) => {
    await page.goto('/case-studies');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check for case study cards
    const caseStudyCards = page.locator('[data-testid="case-study-card"]');
    const cardCount = await caseStudyCards.count();

    // Verify at least 2 case studies are displayed
    expect(cardCount).toBeGreaterThanOrEqual(2);
  });

  test('should show title, client type, industry, and KPI preview on each card', async ({ page }) => {
    await page.goto('/case-studies');
    await page.waitForLoadState('networkidle');

    // Get first case study card
    const firstCard = page.locator('[data-testid="case-study-card"]').first();
    await expect(firstCard).toBeVisible();

    // Verify card has title
    const title = firstCard.locator('[data-testid="case-study-title"]');
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText('');

    // Verify card has client type
    const clientType = firstCard.locator('[data-testid="case-study-client-type"]');
    await expect(clientType).toBeVisible();

    // Verify card has industry
    const industry = firstCard.locator('[data-testid="case-study-industry"]');
    await expect(industry).toBeVisible();

    // Verify card has KPI preview (measurable results)
    const kpiPreview = firstCard.locator('[data-testid="case-study-kpi"]');
    await expect(kpiPreview).toBeVisible();

    // KPI should contain percentage or numeric value
    const kpiText = await kpiPreview.textContent();
    expect(kpiText).toMatch(/\d+%|↑|増加|削減/);
  });

  test('should navigate to detail page when clicking a case study card', async ({ page }) => {
    await page.goto('/case-studies');
    await page.waitForLoadState('networkidle');

    // Click first case study card
    const firstCard = page.locator('[data-testid="case-study-card"]').first();
    const cardLink = firstCard.locator('a').first();

    await expect(cardLink).toBeVisible();
    await cardLink.click();

    // Verify navigated to detail page
    await expect(page).toHaveURL(/\/case-studies\/.+/);

    // Verify detail page loaded
    await page.waitForLoadState('networkidle');
  });

  test('should display case studies in grid layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/case-studies');
    await page.waitForLoadState('networkidle');

    // Check grid layout exists
    const grid = page.locator('[data-testid="case-studies-grid"]');
    await expect(grid).toBeVisible();

    // Verify cards are arranged in grid (multiple columns)
    const cards = page.locator('[data-testid="case-study-card"]');
    const firstCard = cards.first();
    const secondCard = cards.nth(1);

    const firstCardBox = await firstCard.boundingBox();
    const secondCardBox = await secondCard.boundingBox();

    // On desktop, cards should be side by side (same row)
    if (firstCardBox && secondCardBox) {
      const yDifference = Math.abs(firstCardBox.y - secondCardBox.y);
      expect(yDifference).toBeLessThan(50); // Cards should be roughly at same height
    }
  });

  test('should display case studies in single column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/case-studies');
    await page.waitForLoadState('networkidle');

    const cards = page.locator('[data-testid="case-study-card"]');
    const count = await cards.count();

    if (count >= 2) {
      const firstCard = cards.first();
      const secondCard = cards.nth(1);

      const firstCardBox = await firstCard.boundingBox();
      const secondCardBox = await secondCard.boundingBox();

      // On mobile, cards should stack vertically
      if (firstCardBox && secondCardBox) {
        expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y + 50);
      }
    }
  });

  test('should have page title and description', async ({ page }) => {
    await page.goto('/case-studies');

    // Check for main heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/実績|事例|ケーススタディ/);

    // Check for page description
    const description = page.locator('p').first();
    await expect(description).toBeVisible();
  });
});
