import { test, expect } from '@playwright/test';

/**
 * User Story 1: Initial Site Visit & Understanding Services
 * Test: Contact CTAs visible on homepage and functional
 */
test.describe('US1: Contact CTAs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display "無料相談予約" button in hero section', async ({ page }) => {
    const heroSection = page.locator('section').first();
    const consultationButton = heroSection.getByRole('link', {
      name: /無料相談予約|無料相談|相談予約/
    });

    await expect(consultationButton).toBeVisible();
  });

  test('hero "無料相談予約" button should navigate to contact page', async ({ page }) => {
    const consultationButton = page.getByRole('link', {
      name: /無料相談予約|無料相談|相談予約/
    }).first();

    await expect(consultationButton).toHaveAttribute('href', /\/contact/);

    // Click and verify navigation
    await consultationButton.click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('should display "すべてのサービスを見る" button in services section', async ({ page }) => {
    // Scroll to services section
    const servicesHeading = page.getByRole('heading', {
      name: /サービス|提供サービス/
    });
    await servicesHeading.scrollIntoViewIfNeeded();

    // Look for "すべてのサービスを見る" button
    const servicesButton = page.getByRole('link', {
      name: /すべてのサービスを見る/
    });

    await expect(servicesButton).toBeVisible();
  });

  test('services section "すべてのサービスを見る" button should navigate to services page', async ({ page }) => {
    // The services section has "すべてのサービスを見る" button that navigates to /services
    const servicesButton = page.getByRole('link', {
      name: /すべてのサービスを見る/
    });

    await expect(servicesButton).toBeVisible();
    await expect(servicesButton).toHaveAttribute('href', /\/services/);

    // Verify navigation works
    await servicesButton.click();
    await expect(page).toHaveURL(/\/services/);
  });

  test('should display clickable phone number', async ({ page }) => {
    // Look for tel: link
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Should have tel: protocol
    const href = await phoneLink.getAttribute('href');
    expect(href).toMatch(/^tel:/);
  });

  test('phone number should be in header or contact section', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await phoneLink.scrollIntoViewIfNeeded();

    const phoneText = await phoneLink.textContent();
    // Should contain numbers
    expect(phoneText).toMatch(/\d/);
  });

  test('CTAs should be visually distinct', async ({ page }) => {
    const consultationButton = page.getByRole('link', {
      name: /無料相談予約|無料相談/
    }).first();

    // Check if button has visible styling
    const bgColor = await consultationButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Should not be transparent
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('CTAs should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Hero CTA should still be visible
    const heroButton = page.getByRole('link', {
      name: /無料相談予約|無料相談/
    }).first();
    await expect(heroButton).toBeVisible();

    // Phone link should be visible - on mobile it's in the header with lg:hidden class
    // Mobile has phone icon only, desktop has icon + text
    const allPhoneLinks = page.locator('a[href^="tel:"]');

    // Count visible phone links
    let visibleCount = 0;
    for (let i = 0; i < await allPhoneLinks.count(); i++) {
      if (await allPhoneLinks.nth(i).isVisible()) {
        visibleCount++;
      }
    }

    // Should have at least one visible phone link on mobile
    expect(visibleCount).toBeGreaterThan(0);
  });

  test('CTAs should have proper touch target size on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const heroButton = page.getByRole('link', {
      name: /無料相談予約|無料相談/
    }).first();

    const box = await heroButton.boundingBox();

    // Touch targets should be at least 44x44 pixels (WCAG guideline)
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test('all CTAs should be keyboard accessible', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab');

    // Find focused element
    const focusedElement = page.locator(':focus');

    // Should be able to focus on CTAs
    let foundCTA = false;
    for (let i = 0; i < 20; i++) {
      const text = await focusedElement.textContent();
      if (text && (text.includes('無料相談') || text.includes('お問い合わせ'))) {
        foundCTA = true;
        break;
      }
      await page.keyboard.press('Tab');
    }

    expect(foundCTA).toBeTruthy();
  });

  test('phone link should work on mobile device emulation', async ({ page }) => {
    // Set mobile user agent
    await page.setViewportSize({ width: 375, height: 667 });

    // Get all phone links and find visible one
    const allPhoneLinks = page.locator('a[href^="tel:"]');

    // Find first visible phone link
    let visiblePhoneLink;
    for (let i = 0; i < await allPhoneLinks.count(); i++) {
      const link = allPhoneLinks.nth(i);
      if (await link.isVisible()) {
        visiblePhoneLink = link;
        break;
      }
    }

    // On mobile, tel: links should be clickable
    await expect(visiblePhoneLink).toBeDefined();
    await expect(visiblePhoneLink!).toHaveAttribute('href', /^tel:\+?\d/);
  });

  test('multiple CTAs should not overwhelm the page', async ({ page }) => {
    // Count all primary CTAs (buttons/links to contact)
    const ctaButtons = page.getByRole('link', {
      name: /無料相談|お問い合わせ|Contact|相談予約/
    });

    const count = await ctaButtons.count();

    // Should have multiple CTAs but not too many (reasonable limit)
    expect(count).toBeGreaterThanOrEqual(2);
    expect(count).toBeLessThanOrEqual(10);
  });

  test('CTAs should have descriptive text', async ({ page }) => {
    const consultationButton = page.getByRole('link', {
      name: /無料相談予約/
    }).first();

    const buttonText = await consultationButton.textContent();

    // Should have meaningful text (not just "click here")
    expect(buttonText).not.toMatch(/^クリック$|^こちら$/);
    expect(buttonText!.length).toBeGreaterThan(3);
  });
});
