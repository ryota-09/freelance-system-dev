import { test, expect } from '@playwright/test';

/**
 * User Story 2: Viewing Case Studies & Building Trust
 * T036 [P] [US2] E2E test: Case study detail page shows KPIs and results
 *
 * Test Goal: Verify detail page displays project goals, before/after, measurable results, timeline, budget
 */

test.describe('Case Study Detail Page', () => {
  // Test with a known case study slug
  const testSlug = 'beauty-salon-reservation';

  test('should display case study title and client information', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Verify title exists and is visible
    const title = page.locator('h1');
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText('');

    // Verify client type badge
    const clientType = page.locator('[data-testid="client-type"]');
    await expect(clientType).toBeVisible();

    // Verify industry badge
    const industry = page.locator('[data-testid="industry"]');
    await expect(industry).toBeVisible();
  });

  test('should display project goals section', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Check for goals section
    const goalsHeading = page.getByRole('heading', { name: /目的|ゴール|課題/ });
    await expect(goalsHeading).toBeVisible();

    // Verify goals content exists
    const goalsContent = page.locator('[data-testid="project-goals"]');
    await expect(goalsContent).toBeVisible();
  });

  test('should display before/after situation', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Check for before section
    const beforeSection = page.getByRole('heading', { name: /導入前|Before|以前の状況/ });
    await expect(beforeSection).toBeVisible();

    // Check for after section
    const afterSection = page.getByRole('heading', { name: /導入後|After|改善後/ });
    await expect(afterSection).toBeVisible();
  });

  test('should display measurable results with KPIs', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Check for results section
    const resultsHeading = page.getByRole('heading', { name: /成果|結果|実績/ });
    await expect(resultsHeading).toBeVisible();

    // Verify KPI cards exist
    const kpiCards = page.locator('[data-testid="kpi-card"]');
    const kpiCount = await kpiCards.count();

    // Should have at least 1 measurable result
    expect(kpiCount).toBeGreaterThanOrEqual(1);

    // Verify first KPI has numeric value
    const firstKpi = kpiCards.first();
    const kpiValue = firstKpi.locator('[data-testid="kpi-value"]');
    await expect(kpiValue).toBeVisible();

    const valueText = await kpiValue.textContent();
    // Should contain percentage or number (e.g., "40%増加", "予約40%↑")
    expect(valueText).toMatch(/\d+%|増加|削減|改善/);

    // Verify KPI has label/description
    const kpiLabel = firstKpi.locator('[data-testid="kpi-label"]');
    await expect(kpiLabel).toBeVisible();
  });

  test('should display project timeline', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Check for timeline/duration information
    const timelineSection = page.locator('[data-testid="project-timeline"]');
    await expect(timelineSection).toBeVisible();

    // Verify duration is displayed
    const duration = timelineSection.locator('[data-testid="project-duration"]');
    await expect(duration).toBeVisible();

    const durationText = await duration.textContent();
    // Should contain time period (e.g., "3ヶ月", "2週間")
    expect(durationText).toMatch(/週間|ヶ月|月|日/);
  });

  test('should display budget range', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Check for budget information
    const budgetSection = page.locator('[data-testid="budget-range"]');
    await expect(budgetSection).toBeVisible();

    const budgetText = await budgetSection.textContent();
    // Should contain price range or amount
    expect(budgetText).toMatch(/円|万円|~|￥/);
  });

  test('should have CTA button to contact', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Check for CTA button with specific text
    const ctaButton = page.getByRole('link', { name: /同じような成果|お問い合わせ|無料相談/ });
    await expect(ctaButton).toBeVisible();

    // Verify CTA links to contact page
    await expect(ctaButton).toHaveAttribute('href', /\/contact/);
  });

  test('should display full case study content from MDX', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Verify main content area exists
    const content = page.locator('[data-testid="case-study-content"]');
    await expect(content).toBeVisible();

    // Content should have substantial text (not empty)
    const contentText = await content.textContent();
    expect(contentText?.length || 0).toBeGreaterThan(100);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Verify key elements are visible on mobile
    const title = page.locator('h1');
    await expect(title).toBeVisible();

    const kpiCards = page.locator('[data-testid="kpi-card"]');
    const firstKpi = kpiCards.first();
    await expect(firstKpi).toBeVisible();

    const cta = page.getByRole('link', { name: /同じような成果|お問い合わせ/ });
    await expect(cta).toBeVisible();
  });

  test('should handle navigation back to listing', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Check for back link or breadcrumb
    const backLink = page.locator('a[href="/case-studies"]').first();
    await expect(backLink).toBeVisible();

    // Click back link
    await backLink.click();

    // Verify returned to listing page
    await expect(page).toHaveURL('/case-studies');
  });

  test('should have proper SEO metadata', async ({ page }) => {
    await page.goto(`/case-studies/${testSlug}`);
    await page.waitForLoadState('networkidle');

    // Verify page title is set
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).not.toBe('');

    // Verify meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });
});
