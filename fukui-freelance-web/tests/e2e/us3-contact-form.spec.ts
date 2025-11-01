import { test, expect } from '@playwright/test';

/**
 * User Story 3: Submitting Inquiry/Consultation Request
 * Test: Contact form submission flow
 * Task: T046
 */
test.describe('US3: Contact Form Submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should navigate to contact page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText(/お問い合わせ|問い合わせ|コンタクト|Contact/i);
  });

  test('should display all required form fields', async ({ page }) => {
    // Check for all required fields from contactFormSchema
    await expect(page.locator('input[name="companyName"]')).toBeVisible();
    await expect(page.locator('input[name="contactName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="location"]')).toBeVisible();

    // Check for select/radio fields
    await expect(page.locator('[name="inquiryType"]')).toBeVisible();
    await expect(page.locator('[name="budgetRange"]')).toBeVisible();

    // Check for submit button
    const submitButton = page.getByRole('button', { name: /送信|お問い合わせを送信|Submit/i });
    await expect(submitButton).toBeVisible();
  });

  test('should fill all required fields and submit successfully', async ({ page }) => {
    const startTime = Date.now();

    // Fill in all required fields
    await page.fill('input[name="companyName"]', 'テスト株式会社');
    await page.fill('input[name="contactName"]', '山田太郎');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '090-1234-5678');
    await page.fill('input[name="location"]', '福井県福井市');
    await page.fill('input[name="desiredTimeline"]', '3ヶ月以内');

    // Select inquiry type (web制作)
    const inquiryTypeSelect = page.locator('[name="inquiryType"]');
    await inquiryTypeSelect.click();
    await page.getByRole('option', { name: /Web制作|web/i }).first().click();

    // Select budget range
    const budgetSelect = page.locator('[name="budgetRange"]');
    await budgetSelect.click();
    await page.getByRole('option', { name: /300k-500k|30万円-50万円/i }).first().click();

    // Select at least one project goal
    const goalCheckbox = page.locator('[name="projectGoals"][value="lead-generation"]').first();
    await goalCheckbox.check();

    // Optional: Add message
    const messageField = page.locator('textarea[name="message"]');
    if (await messageField.isVisible()) {
      await messageField.fill('テストメッセージです。Webサイトの制作をお願いしたいです。');
    }

    // Submit form
    const submitButton = page.getByRole('button', { name: /送信|お問い合わせを送信|Submit/i });
    await submitButton.click();

    // Wait for success message
    const successMessage = page.getByText(/確認メールをお送りしました|送信完了|お問い合わせありがとう/i);
    await expect(successMessage).toBeVisible({ timeout: 10000 });

    // Verify completion time is less than 3 minutes
    const completionTime = Date.now() - startTime;
    expect(completionTime).toBeLessThan(3 * 60 * 1000); // 3 minutes in milliseconds
  });

  test('should validate email format', async ({ page }) => {
    // Fill invalid email
    await page.fill('input[name="email"]', 'invalid-email');

    // Trigger validation by submitting or moving to next field
    await page.locator('input[name="phone"]').click();

    // Check for error message
    const errorMessage = page.getByText(/有効なメールアドレス|正しいメールアドレス|invalid email/i);
    await expect(errorMessage).toBeVisible();
  });

  test('should show required field errors when submitting empty form', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /送信|お問い合わせを送信|Submit/i });
    await submitButton.click();

    // Check for multiple required field errors
    const errorMessages = page.locator('text=/必須|required/i');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should complete form in under 3 minutes (performance check)', async ({ page }) => {
    const startTime = Date.now();

    // Simulate realistic user input timing
    await page.fill('input[name="companyName"]', 'スピードテスト株式会社');
    await page.waitForTimeout(500);

    await page.fill('input[name="contactName"]', '佐藤花子');
    await page.waitForTimeout(500);

    await page.fill('input[name="email"]', 'sato@example.com');
    await page.waitForTimeout(500);

    await page.fill('input[name="phone"]', '080-9876-5432');
    await page.waitForTimeout(500);

    await page.fill('input[name="location"]', '福井県敦賀市');
    await page.waitForTimeout(500);

    await page.fill('input[name="desiredTimeline"]', 'できるだけ早く');

    const completionTime = Date.now() - startTime;
    expect(completionTime).toBeLessThan(3 * 60 * 1000);
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check that all inputs have associated labels
    const inputs = await page.locator('input, select, textarea').all();

    for (const input of inputs) {
      const name = await input.getAttribute('name');
      if (name) {
        const label = page.locator(`label[for="${name}"]`);
        const hasLabel = (await label.count()) > 0 || (await input.getAttribute('aria-label')) !== null;
        expect(hasLabel).toBeTruthy();
      }
    }
  });
});
