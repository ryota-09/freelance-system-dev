import { test, expect } from '@playwright/test';

/**
 * User Story 3: Submitting Inquiry/Consultation Request
 * Test: Form validation displays errors
 * Task: T049
 */
test.describe('US3: Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display error when submitting empty form', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitButton.click();

    // Check for error messages
    const errorMessages = page.locator('text=/必須|required|入力してください/i');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should validate email field with proper error message', async ({ page }) => {
    // Fill invalid email
    await page.fill('input[name="email"]', 'invalid-email');

    // Trigger validation
    await page.locator('input[name="phone"]').click();

    // Check for specific email error message
    const emailError = page.getByText(/有効なメールアドレス|正しいメール|valid email/i);
    await expect(emailError).toBeVisible();
  });

  test('should validate phone number format', async ({ page }) => {
    // Fill invalid phone number (contains letters)
    await page.fill('input[name="phone"]', 'abc-defg-hijk');

    // Trigger validation
    await page.locator('input[name="email"]').click();

    // Check for phone validation error
    const phoneError = page.getByText(/電話番号|数字|phone/i);
    await expect(phoneError).toBeVisible();
  });

  test('should clear error when field is corrected', async ({ page }) => {
    // Fill invalid email
    await page.fill('input[name="email"]', 'invalid');
    await page.locator('input[name="phone"]').click();

    // Verify error appears
    const emailError = page.getByText(/有効なメールアドレス|valid email/i);
    await expect(emailError).toBeVisible();

    // Correct the email
    await page.fill('input[name="email"]', 'valid@example.com');
    await page.locator('input[name="phone"]').click();

    // Error should disappear
    await expect(emailError).not.toBeVisible();
  });

  test('should validate required company name field', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitButton.click();

    // Look for company name required error
    const companyError = page.locator('text=/会社名.*必須|companyName.*required/i');
    await expect(companyError).toBeVisible();
  });

  test('should validate required contact name field', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitButton.click();

    // Look for contact name required error
    const nameError = page.locator('text=/お名前.*必須|contactName.*required/i');
    await expect(nameError).toBeVisible();
  });

  test('should validate character length limits', async ({ page }) => {
    // Try to input extremely long text
    const longText = 'あ'.repeat(300); // 300 characters
    await page.fill('input[name="companyName"]', longText);

    // Trigger validation
    await page.locator('input[name="contactName"]').click();

    // Check for length validation error
    const lengthError = page.getByText(/200文字以内|maximum.*200/i);
    const isVisible = await lengthError.isVisible().catch(() => false);

    // Either error is shown or input is truncated
    if (!isVisible) {
      const value = await page.locator('input[name="companyName"]').inputValue();
      expect(value.length).toBeLessThanOrEqual(200);
    }
  });

  test('should validate message field length (2000 characters)', async ({ page }) => {
    const messageField = page.locator('textarea[name="message"]');
    if (await messageField.isVisible()) {
      // Try to input very long message
      const longMessage = 'あ'.repeat(2500); // Exceeds 2000 limit
      await messageField.fill(longMessage);

      // Trigger validation
      await page.locator('input[name="email"]').click();

      // Check for length error or truncation
      const lengthError = page.getByText(/2000文字以内|maximum.*2000/i);
      const isVisible = await lengthError.isVisible().catch(() => false);

      if (!isVisible) {
        const value = await messageField.inputValue();
        expect(value.length).toBeLessThanOrEqual(2000);
      }
    }
  });

  test('should display field-level errors (not just global error)', async ({ page }) => {
    // Fill some fields but leave others empty
    await page.fill('input[name="companyName"]', 'テスト会社');
    await page.fill('input[name="email"]', 'invalid-email');

    const submitButton = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitButton.click();

    // Should show multiple specific field errors
    const errorMessages = page.locator('[role="alert"], .error, [class*="error"]');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(1); // Multiple field-level errors
  });

  test('should validate inquiry type selection', async ({ page }) => {
    // Fill other required fields but skip inquiry type
    await page.fill('input[name="companyName"]', 'テスト株式会社');
    await page.fill('input[name="contactName"]', '山田太郎');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '090-1234-5678');

    const submitButton = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitButton.click();

    // Should show error for inquiry type
    const inquiryError = page.getByText(/お問い合わせ種別|inquiry.*type/i);
    const hasError = await inquiryError.isVisible().catch(() => false);

    expect(hasError).toBeTruthy();
  });

  test('should prevent submission with validation errors', async ({ page }) => {
    // Fill form with invalid data
    await page.fill('input[name="email"]', 'invalid-email');

    const submitButton = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitButton.click();

    // Wait a bit to see if any submission occurs
    await page.waitForTimeout(1000);

    // Success message should NOT appear
    const successMessage = page.getByText(/確認メール|送信完了|ありがとう/i);
    await expect(successMessage).not.toBeVisible();
  });

  test('should have accessible error messages with ARIA', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitButton.click();

    // Error messages should have proper ARIA attributes
    const errors = await page.locator('[role="alert"], [aria-live="polite"], [aria-live="assertive"]').all();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should maintain form data when validation fails', async ({ page }) => {
    // Fill some fields with valid data
    await page.fill('input[name="companyName"]', '保持テスト株式会社');
    await page.fill('input[name="contactName"]', '佐藤花子');

    // Fill one field with invalid data
    await page.fill('input[name="email"]', 'invalid');

    const submitButton = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitButton.click();

    // Previously filled valid data should still be there
    const companyName = await page.locator('input[name="companyName"]').inputValue();
    const contactName = await page.locator('input[name="contactName"]').inputValue();

    expect(companyName).toBe('保持テスト株式会社');
    expect(contactName).toBe('佐藤花子');
  });
});
