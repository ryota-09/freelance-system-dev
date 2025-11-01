import { test, expect } from '@playwright/test';

/**
 * User Story 3: Submitting Inquiry/Consultation Request
 * Test: Consultation booking flow
 * Task: T047
 */
test.describe('US3: Consultation Booking Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display booking section on contact page', async ({ page }) => {
    // Look for booking section or tab
    const bookingSection = page.getByText(/無料相談予約|相談予約|Consultation Booking/i);
    await expect(bookingSection).toBeVisible();
  });

  test('should display consultation format selection (online/in-person)', async ({ page }) => {
    // Look for format selection radio buttons or select
    const formatSelection = page.locator('[name="preferredFormat"]');
    await expect(formatSelection.first()).toBeVisible();

    // Check for online option
    const onlineOption = page.getByText(/オンライン|Online/i).first();
    await expect(onlineOption).toBeVisible();

    // Check for in-person option
    const inPersonOption = page.getByText(/対面|In-person|訪問/i).first();
    await expect(inPersonOption).toBeVisible();
  });

  test('should fill and submit booking form successfully', async ({ page }) => {
    // Navigate to booking section/tab if needed
    const bookingTab = page.getByRole('button', { name: /無料相談予約|相談予約/i });
    if (await bookingTab.isVisible()) {
      await bookingTab.click();
    }

    // Fill in basic info
    await page.fill('input[name="companyName"]', '予約テスト株式会社');
    await page.fill('input[name="contactName"]', '田中一郎');
    await page.fill('input[name="email"]', 'tanaka@example.com');
    await page.fill('input[name="phone"]', '090-1111-2222');

    // Select consultation format (online)
    const onlineRadio = page.locator('[name="preferredFormat"][value="online"]');
    if (await onlineRadio.isVisible()) {
      await onlineRadio.check();
    } else {
      const formatSelect = page.locator('[name="preferredFormat"]');
      await formatSelect.click();
      await page.getByRole('option', { name: /オンライン/i }).click();
    }

    // Fill needs description
    await page.fill('textarea[name="needsDescription"]', 'ホームページのリニューアルについて相談したいです。');

    // Submit booking form
    const submitButton = page.getByRole('button', { name: /予約|予約する|Submit/i });
    await submitButton.click();

    // Wait for confirmation message
    const confirmationMessage = page.getByText(/予約を承りました|確認メール|ご予約ありがとう/i);
    await expect(confirmationMessage).toBeVisible({ timeout: 10000 });
  });

  test('should show location field for in-person consultation', async ({ page }) => {
    // Navigate to booking form
    const bookingTab = page.getByRole('button', { name: /無料相談予約|相談予約/i });
    if (await bookingTab.isVisible()) {
      await bookingTab.click();
    }

    // Select in-person format
    const inPersonRadio = page.locator('[name="preferredFormat"][value="in-person"]');
    if (await inPersonRadio.isVisible()) {
      await inPersonRadio.check();
    } else {
      const formatSelect = page.locator('[name="preferredFormat"]');
      await formatSelect.click();
      await page.getByRole('option', { name: /対面|訪問/i }).click();
    }

    // Wait for location field to appear
    await page.waitForTimeout(500);

    // Check if location field is now visible
    const locationField = page.locator('input[name="location"]');
    await expect(locationField).toBeVisible();
  });

  test('should validate required fields before submission', async ({ page }) => {
    // Navigate to booking form
    const bookingTab = page.getByRole('button', { name: /無料相談予約|相談予約/i });
    if (await bookingTab.isVisible()) {
      await bookingTab.click();
    }

    // Try to submit without filling required fields
    const submitButton = page.getByRole('button', { name: /予約|予約する|Submit/i });
    await submitButton.click();

    // Check for validation errors
    const errorMessages = page.locator('text=/必須|required|入力してください/i');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should display success confirmation after booking', async ({ page }) => {
    // Navigate to booking form
    const bookingTab = page.getByRole('button', { name: /無料相談予約|相談予約/i });
    if (await bookingTab.isVisible()) {
      await bookingTab.click();
    }

    // Fill minimal required fields
    await page.fill('input[name="companyName"]', '相談テスト社');
    await page.fill('input[name="contactName"]', '鈴木花子');
    await page.fill('input[name="email"]', 'suzuki@example.com');
    await page.fill('input[name="phone"]', '080-3333-4444');

    // Select online format
    const onlineRadio = page.locator('[name="preferredFormat"][value="online"]');
    if (await onlineRadio.isVisible()) {
      await onlineRadio.check();
    }

    await page.fill('textarea[name="needsDescription"]', '簡単な相談です');

    // Submit
    const submitButton = page.getByRole('button', { name: /予約|予約する|Submit/i });
    await submitButton.click();

    // Verify confirmation elements
    const confirmation = page.getByText(/確認メール|予約を承りました|次のステップ/i);
    await expect(confirmation).toBeVisible({ timeout: 10000 });
  });

  test('should have accessible form controls', async ({ page }) => {
    // Navigate to booking form
    const bookingTab = page.getByRole('button', { name: /無料相談予約|相談予約/i });
    if (await bookingTab.isVisible()) {
      await bookingTab.click();
    }

    // Check radio buttons have proper labels
    const formatRadios = await page.locator('[name="preferredFormat"]').all();
    for (const radio of formatRadios) {
      const hasLabel = (await radio.getAttribute('aria-label')) !== null ||
                       (await page.locator(`label[for="${await radio.getAttribute('id')}"]`).count()) > 0;
      expect(hasLabel).toBeTruthy();
    }
  });
});
