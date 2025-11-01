import * as React from 'react';
import { EmailLayout, EmailHeader, EmailFooter, InfoBox, EmailButton } from './components/EmailLayout';

interface ContactFormNotificationProps {
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
}

/**
 * Contact form notification email template
 * Sent to freelancer (internal) when new inquiry is received
 */
export const ContactFormNotification = ({
  companyName,
  contactName,
  email,
  phone,
  location,
  inquiryType,
  projectGoals,
  budgetRange,
  desiredTimeline,
  message,
}: ContactFormNotificationProps) => {
  return (
    <EmailLayout previewText={`[新規問い合わせ] ${companyName} 様`}>
      <EmailHeader title="新規お問い合わせ通知" />

      <tr>
        <td style={{ padding: '40px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333333',
              margin: '0 0 20px 0',
            }}
          >
            顧客情報
          </h2>
        </td>
      </tr>

      <InfoBox backgroundColor="#f5f5f5">
        <table width="100%" border={0} cellSpacing="0" cellPadding="0">
          <tr>
            <td>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 0 12px 0',
                }}
              >
                <strong>会社名:</strong> {companyName}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 0 12px 0',
                }}
              >
                <strong>担当者名:</strong> {contactName}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 0 12px 0',
                }}
              >
                <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 0 12px 0',
                }}
              >
                <strong>電話:</strong> <a href={`tel:${phone}`}>{phone}</a>
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: 0,
                }}
              >
                <strong>所在地:</strong> {location}
              </p>
            </td>
          </tr>
        </table>
      </InfoBox>

      <tr>
        <td style={{ padding: '0 40px 20px 40px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333333',
              margin: '0 0 20px 0',
            }}
          >
            案件詳細
          </h2>
        </td>
      </tr>

      <InfoBox backgroundColor="#f0f8ff">
        <table width="100%" border={0} cellSpacing="0" cellPadding="0">
          <tr>
            <td>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 0 12px 0',
                }}
              >
                <strong>お問い合わせ種別:</strong> {inquiryType}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 0 12px 0',
                }}
              >
                <strong>プロジェクトの目的:</strong> {projectGoals.join(', ')}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 0 12px 0',
                }}
              >
                <strong>ご予算:</strong> {budgetRange}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: message ? '0 0 12px 0' : 0,
                }}
              >
                <strong>希望納期:</strong> {desiredTimeline}
              </p>
              {message && (
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#333333',
                    margin: 0,
                  }}
                >
                  <strong>メッセージ:</strong>
                  <br />
                  {message}
                </p>
              )}
            </td>
          </tr>
        </table>
      </InfoBox>

      <tr>
        <td style={{ padding: '20px 40px 40px 40px' }}>
          <EmailButton href={`mailto:${email}`} text="返信する" />
        </td>
      </tr>

      <EmailFooter />
    </EmailLayout>
  );
};

export default ContactFormNotification;
