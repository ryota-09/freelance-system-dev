import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email sending configuration
const FROM_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@yourdomain.com';
const TO_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@yourdomain.com';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
}

/**
 * Send email using Resend API
 */
export async function sendEmail(options: SendEmailOptions) {
  // In development/test with invalid API key, log instead of sending
  const isDevelopment = process.env.NODE_ENV === 'development';
  const hasValidApiKey = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here';

  if (isDevelopment && !hasValidApiKey) {
    console.log('[DEV MODE] Email would be sent:', {
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
    });
    return { success: true, data: { id: 'dev-mock-id' } };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      tags: options.tags,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in sendEmail:', error);
    throw error;
  }
}

/**
 * Send contact form confirmation email to client
 */
export async function sendContactConfirmation(data: {
  companyName: string;
  contactName: string;
  email: string;
  inquiryType: string;
  message?: string;
}) {
  const inquiryTypeLabels: Record<string, string> = {
    web: 'Web制作',
    system: 'システム開発',
    maintenance: '保守運用',
    multiple: '複数のサービス',
  };

  const subject = 'お問い合わせありがとうございます【福井Web制作】';
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; font-size: 24px;">お問い合わせありがとうございます</h1>
      <p>${data.contactName} 様</p>
      <p>この度は、福井フリーランスWeb制作へお問い合わせいただき、誠にありがとうございます。</p>
      <p>以下の内容でお問い合わせを承りました。</p>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>会社名:</strong> ${data.companyName}</p>
        <p><strong>お名前:</strong> ${data.contactName}</p>
        <p><strong>お問い合わせ種別:</strong> ${inquiryTypeLabels[data.inquiryType] || data.inquiryType}</p>
        ${data.message ? `<p><strong>メッセージ:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
      </div>

      <p>1営業日以内に担当者よりご連絡させていただきます。</p>
      <p>今しばらくお待ちくださいますよう、お願い申し上げます。</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">
        福井フリーランスWeb制作<br>
        Email: ${FROM_EMAIL}<br>
        Tel: ${process.env.NEXT_PUBLIC_PHONE || '0776-12-3456'}
      </p>
    </div>
  `;

  return sendEmail({
    to: data.email,
    subject,
    html,
    replyTo: FROM_EMAIL,
    tags: [{ name: 'category', value: 'inquiry-confirmation' }],
  });
}

/**
 * Send contact form notification to freelancer (internal)
 */
export async function sendContactNotification(data: {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  inquiryType: string;
  projectGoals: string[];
  budgetRange: string;
  desiredTimeline: string;
  message?: string;
}) {
  const subject = `[新規問い合わせ] ${data.companyName} 様`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; font-size: 24px;">新規お問い合わせ通知</h1>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="font-size: 18px; margin-top: 0;">顧客情報</h2>
        <p><strong>会社名:</strong> ${data.companyName}</p>
        <p><strong>担当者名:</strong> ${data.contactName}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>電話:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        <p><strong>所在地:</strong> ${data.location}</p>
      </div>

      <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="font-size: 18px; margin-top: 0;">案件詳細</h2>
        <p><strong>お問い合わせ種別:</strong> ${data.inquiryType}</p>
        <p><strong>プロジェクトの目的:</strong> ${data.projectGoals.join(', ')}</p>
        <p><strong>ご予算:</strong> ${data.budgetRange}</p>
        <p><strong>希望納期:</strong> ${data.desiredTimeline}</p>
        ${data.message ? `<p><strong>メッセージ:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
      </div>

      <p style="margin-top: 30px;">
        <a href="mailto:${data.email}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">返信する</a>
      </p>
    </div>
  `;

  return sendEmail({
    to: TO_EMAIL,
    subject,
    html,
    replyTo: data.email,
    tags: [{ name: 'category', value: 'inquiry-notification' }],
  });
}

/**
 * Send booking confirmation email to client
 */
export async function sendBookingConfirmation(data: {
  companyName: string;
  contactName: string;
  email: string;
  preferredFormat: string;
  needsDescription: string;
}) {
  const formatLabels: Record<string, string> = {
    online: 'オンライン',
    'in-person': '対面',
  };

  const subject = '無料相談のご予約を承りました【福井Web制作】';
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; font-size: 24px;">無料相談のご予約ありがとうございます</h1>
      <p>${data.contactName} 様</p>
      <p>この度は、福井フリーランスWeb制作の無料相談をご予約いただき、誠にありがとうございます。</p>
      <p>以下の内容でご予約を承りました。</p>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>会社名:</strong> ${data.companyName}</p>
        <p><strong>お名前:</strong> ${data.contactName}</p>
        <p><strong>相談形式:</strong> ${formatLabels[data.preferredFormat] || data.preferredFormat}</p>
        <p><strong>相談内容:</strong><br>${data.needsDescription.replace(/\n/g, '<br>')}</p>
      </div>

      <h2 style="font-size: 18px;">次のステップ</h2>
      <ol>
        <li>担当者よりご希望日時の中から調整のご連絡を差し上げます（1営業日以内）</li>
        <li>日時確定後、相談形式に応じて詳細をご案内いたします</li>
        <li>相談当日は、お気軽にご質問ください</li>
      </ol>

      <p style="background-color: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107;">
        <strong>キャンセル・変更について:</strong><br>
        ご都合が悪くなった場合は、お早めにご連絡ください。
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">
        福井フリーランスWeb制作<br>
        Email: ${FROM_EMAIL}<br>
        Tel: ${process.env.NEXT_PUBLIC_PHONE || '0776-12-3456'}
      </p>
    </div>
  `;

  return sendEmail({
    to: data.email,
    subject,
    html,
    replyTo: FROM_EMAIL,
    tags: [{ name: 'category', value: 'booking-confirmation' }],
  });
}

/**
 * Send booking notification to freelancer (internal)
 */
export async function sendBookingNotification(data: {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  preferredFormat: string;
  preferredDateRanges: Array<{
    startDate: string;
    endDate: string;
    timeOfDay: string;
  }>;
  needsDescription: string;
  location?: string;
}) {
  const subject = `[新規予約] ${data.companyName} 様 - 無料相談`;
  const dateRangesHtml = data.preferredDateRanges
    .map(
      (range, index) => `
      <p><strong>希望日時 ${index + 1}:</strong><br>
      ${new Date(range.startDate).toLocaleString('ja-JP')} ～ ${new Date(range.endDate).toLocaleString('ja-JP')}<br>
      時間帯: ${range.timeOfDay}</p>
    `
    )
    .join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; font-size: 24px;">新規相談予約通知</h1>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="font-size: 18px; margin-top: 0;">顧客情報</h2>
        <p><strong>会社名:</strong> ${data.companyName}</p>
        <p><strong>担当者名:</strong> ${data.contactName}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>電話:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
      </div>

      <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="font-size: 18px; margin-top: 0;">相談詳細</h2>
        <p><strong>相談形式:</strong> ${data.preferredFormat}</p>
        ${data.location ? `<p><strong>場所:</strong> ${data.location}</p>` : ''}
        ${dateRangesHtml}
        <p><strong>相談内容:</strong><br>${data.needsDescription.replace(/\n/g, '<br>')}</p>
      </div>

      <p style="margin-top: 30px;">
        <a href="mailto:${data.email}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">日程調整メールを送る</a>
      </p>
    </div>
  `;

  return sendEmail({
    to: TO_EMAIL,
    subject,
    html,
    replyTo: data.email,
    tags: [{ name: 'category', value: 'booking-notification' }],
  });
}
