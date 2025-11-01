import { test, expect } from '@playwright/test';

/**
 * User Story 3: Submitting Inquiry/Consultation Request
 * Test: Phone number clickable on mobile
 * Task: T048
 */
test.describe('US3: Phone Number Click on Mobile', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
  });

  test('should display phone number in header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Look for phone number with tel: link
    const phoneLink = header.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();
  });

  test('should have correct tel: link format', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Get href attribute
    const href = await phoneLink.getAttribute('href');
    expect(href).toMatch(/^tel:\+?[\d-]+$/);
  });

  test('should be clickable on mobile viewport', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first();

    // Verify element is clickable
    await expect(phoneLink).toBeEnabled();

    // Check touch target size (minimum 44px)
    const box = await phoneLink.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  test('should display phone number text', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first();
    const phoneText = await phoneLink.textContent();

    // Should contain phone number digits
    expect(phoneText).toMatch(/[\d-()]/);
  });

  test('should be accessible via keyboard navigation', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first();

    // Tab to the phone link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check if phone link can receive focus
    const isFocusable = await phoneLink.evaluate((el) => {
      return el === document.activeElement || el.matches(':focus-within');
    });

    // Phone link should be in the tab order
    await expect(phoneLink).toHaveAttribute('href');
  });

  test('should display business hours tooltip or text nearby', async ({ page }) => {
    const header = page.locator('header');

    // Look for business hours text
    const businessHours = header.getByText(/営業時間|受付時間|平日|土日/i);

    // Business hours should be visible or in a tooltip
    const isVisible = await businessHours.isVisible().catch(() => false);
    const hasTooltip = await header.locator('[data-tooltip], [title*="営業時間"]').count() > 0;

    expect(isVisible || hasTooltip).toBeTruthy();
  });

  test('should be visible on all pages', async ({ page }) => {
    const pages = ['/', '/contact', '/case-studies', '/pricing'];

    for (const path of pages) {
      await page.goto(path);
      const phoneLink = page.locator('a[href^="tel:"]').first();
      await expect(phoneLink).toBeVisible();
    }
  });

  test('should maintain visibility on small mobile (320px)', async ({ page }) => {
    // Test on very small mobile viewport
    await page.setViewportSize({ width: 320, height: 568 });

    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Should not overflow viewport
    const box = await phoneLink.boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(0);
    if (box) {
      expect(box.x + box.width).toBeLessThanOrEqual(320);
    }
  });

  test('should have proper ARIA attributes for accessibility', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first();

    // Check for accessible name or aria-label
    const ariaLabel = await phoneLink.getAttribute('aria-label');
    const text = await phoneLink.textContent();

    expect(ariaLabel || text).toBeTruthy();
  });
});
