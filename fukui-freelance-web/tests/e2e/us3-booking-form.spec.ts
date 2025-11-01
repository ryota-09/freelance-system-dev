import { test, expect } from '@playwright/test';

/**
 * User Story 3: Submitting Inquiry/Consultation Request
 * Test: Consultation booking flow
 * Task: T047
 */
test.describe('US3: Consultation Booking Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    // Switch to booking tab
    const bookingTab = page.getByRole('button', { name: /無料相談予約/i });
    await bookingTab.click();
    await page.waitForTimeout(300);
  });

  test('should display booking section on contact page', async ({ page }) => {
    // Booking form should be visible after clicking tab
    const bookingForm = page.getByText(/無料相談予約フォーム|予約フォーム/i);
    await expect(bookingForm).toBeVisible();
  });

  test('should display consultation format selection (online/in-person)', async ({ page }) => {
    // Look for format selection select button
    const formatSelection = page.locator('button#preferredFormat');
    await expect(formatSelection).toBeVisible();

    // Click to open dropdown
    await formatSelection.click();

    // Check for online option
    const onlineOption = page.getByRole('option', { name: /オンライン|Online/i });
    await expect(onlineOption).toBeVisible();

    // Check for in-person option
    const inPersonOption = page.getByRole('option', { name: /対面|In-person/i });
    await expect(inPersonOption).toBeVisible();
  });

  test('should fill and submit booking form successfully', async ({ page }) => {
    // Fill in basic info
    await page.fill('input[name="companyName"]', '予約テスト株式会社');
    await page.fill('input[name="contactName"]', '田中一郎');
    await page.fill('input[name="email"]', 'tanaka@example.com');
    await page.fill('input[name="phone"]', '090-1111-2222');

    // Select consultation format (online) - format is already "online" by default
    // Just verify it's selected
    await expect(page.locator('button#preferredFormat')).toContainText(/オンライン/i);

    // Add at least one date range
    const addDateButton = page.getByRole('button', { name: /日時を追加/i });
    await addDateButton.click();
    await page.waitForTimeout(300);

    // Fill needs description
    await page.fill('textarea[name="needsDescription"]', 'ホームページのリニューアルについて相談したいです。');

    // Submit booking form
    const submitButton = page.getByRole('button', { name: /無料相談を予約する|予約する|Submit/i }).filter({ hasNotText: /無料相談予約$/ });
    await submitButton.click();

    // Wait for confirmation message
    const confirmationMessage = page.getByText(/予約を承りました|確認メール|ご予約ありがとう/i);
    await expect(confirmationMessage).toBeVisible({ timeout: 10000 });
  });

  test('should show location field for in-person consultation', async ({ page }) => {
    // Initially location field should not be visible
    const locationField = page.locator('input[name="location"]');
    await expect(locationField).not.toBeVisible();

    // Select in-person format
    await page.locator('button#preferredFormat').click();
    await page.getByRole('option', { name: /対面/i }).click();

    // Wait for location field to appear
    await page.waitForTimeout(500);

    // Check if location field is now visible
    await expect(locationField).toBeVisible();
  });

  test('should validate required fields before submission', async ({ page }) => {
    // Try to submit without filling required fields
    const submitButton = page.getByRole('button', { name: /無料相談を予約する|予約する|Submit/i }).filter({ hasNotText: /無料相談予約$/ });
    await submitButton.click();

    // Check for validation errors
    const errorMessages = page.locator('p[role="alert"]');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should display success confirmation after booking', async ({ page }) => {
    // Fill minimal required fields
    await page.fill('input[name="companyName"]', '相談テスト社');
    await page.fill('input[name="contactName"]', '鈴木花子');
    await page.fill('input[name="email"]', 'suzuki@example.com');
    await page.fill('input[name="phone"]', '080-3333-4444');

    // Add at least one date range (required)
    const addDateButton = page.getByRole('button', { name: /日時を追加/i });
    await addDateButton.click();
    await page.waitForTimeout(300);

    await page.fill('textarea[name="needsDescription"]', '簡単な相談です');

    // Submit
    const submitButton = page.getByRole('button', { name: /無料相談を予約する|予約する|Submit/i }).filter({ hasNotText: /無料相談予約$/ });
    await submitButton.click();

    // Verify confirmation elements
    const confirmation = page.getByText(/確認メール|予約を承りました|次のステップ/i);
    await expect(confirmation).toBeVisible({ timeout: 10000 });
  });

  test('should have accessible form controls', async ({ page }) => {
    // Check Select component has proper accessibility
    const formatSelect = page.locator('button#preferredFormat');
    await expect(formatSelect).toBeVisible();
    
    // Check it has aria-label or associated label
    const hasAriaLabel = (await formatSelect.getAttribute('aria-label')) !== null;
    const hasAssociatedLabel = (await page.locator('label[for="preferredFormat"]').count()) > 0;
    expect(hasAriaLabel || hasAssociatedLabel).toBeTruthy();
    
    // Check all text inputs have labels
    const companyNameInput = page.locator('input[name="companyName"]');
    const contactNameInput = page.locator('input[name="contactName"]');
    const emailInput = page.locator('input[name="email"]');
    const phoneInput = page.locator('input[name="phone"]');
    
    for (const input of [companyNameInput, contactNameInput, emailInput, phoneInput]) {
      const id = await input.getAttribute('id');
      if (id) {
        const labelCount = await page.locator(`label[for="${id}"]`).count();
        expect(labelCount).toBeGreaterThan(0);
      }
    }
  });
});
