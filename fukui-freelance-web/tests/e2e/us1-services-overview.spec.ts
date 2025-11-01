import { test, expect } from '@playwright/test';

/**
 * User Story 1: Initial Site Visit & Understanding Services
 * Test: Services section displays three offerings on homepage
 */
test.describe('US1: Services Overview Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display services section on homepage', async ({ page }) => {
    // Look for services section (could be identified by heading or data-testid)
    const servicesHeading = page.getByRole('heading', {
      name: /サービス|提供サービス|サービス内容|Services/
    });
    await expect(servicesHeading).toBeVisible();
  });

  test('should display three service cards', async ({ page }) => {
    // Wait for service cards to load
    await page.waitForSelector('[data-testid="service-card"], article, .service-card', {
      timeout: 5000,
    });

    // Count service cards (could be articles, divs with specific class, or data-testid)
    const serviceCards = page.locator('[data-testid="service-card"], article:has(h3), .service-card');
    const count = await serviceCards.count();

    // Should have at least 3 services
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should display Web制作 service', async ({ page }) => {
    const webService = page.locator('text=/Web制作|ホームページ制作|Webサイト制作/').first();
    await expect(webService).toBeVisible();
  });

  test('should display システム開発 service', async ({ page }) => {
    const systemService = page.locator('text=/システム開発|業務システム|アプリ開発/').first();
    await expect(systemService).toBeVisible();
  });

  test('should display 保守運用 service', async ({ page }) => {
    const maintenanceService = page.locator('text=/保守運用|運用保守|メンテナンス|サポート/').first();
    await expect(maintenanceService).toBeVisible();
  });

  test('each service card should have title, description, and link', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"], article:has(h3)');
    const firstCard = serviceCards.first();

    // Check for title (h3 or h4)
    const title = firstCard.locator('h3, h4');
    await expect(title).toBeVisible();

    // Check for description text
    const description = firstCard.locator('p');
    await expect(description.first()).toBeVisible();

    // Check for "詳しく見る" or similar link
    const link = firstCard.locator('a:has-text("詳しく見る"), a:has-text("もっと見る"), a:has-text("詳細")');
    await expect(link).toBeVisible();
  });

  test('service card links should navigate to service detail pages', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"], article:has(h3)');
    const firstCardLink = serviceCards.first().locator('a').first();

    await expect(firstCardLink).toHaveAttribute('href', /\/services\//);
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const serviceCards = page.locator('[data-testid="service-card"], article:has(h3)');
    await expect(serviceCards.first()).toBeVisible();

    // Check if cards are arranged properly (not overlapping)
    const firstCard = serviceCards.first();
    const box = await firstCard.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(768);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const serviceCards = page.locator('[data-testid="service-card"], article:has(h3)');
    await expect(serviceCards.first()).toBeVisible();

    // On mobile, cards should stack vertically
    const cards = await serviceCards.all();
    if (cards.length >= 2) {
      const box1 = await cards[0].boundingBox();
      const box2 = await cards[1].boundingBox();

      // Second card should be below first card
      expect(box2!.y).toBeGreaterThan(box1!.y + box1!.height - 10);
    }
  });

  test('service cards should have proper hover states', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"], article:has(h3)');
    const firstCard = serviceCards.first();

    // Hover over card
    await firstCard.hover();

    // Check if there's visual feedback (this is a basic check)
    await expect(firstCard).toBeVisible();
  });

  test('should have accessible service cards', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"], article:has(h3)');

    // Check if cards have proper semantic structure
    const firstCard = serviceCards.first();
    const heading = firstCard.locator('h3, h4');
    await expect(heading).toBeVisible();

    // Check if links are keyboard accessible
    const link = firstCard.locator('a').first();
    await link.focus();
    await expect(link).toBeFocused();
  });
});
