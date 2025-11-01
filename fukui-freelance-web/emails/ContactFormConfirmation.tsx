import * as React from 'react';
import { EmailLayout, EmailHeader, EmailFooter, InfoBox } from './components/EmailLayout';

interface ContactFormConfirmationProps {
  companyName: string;
  contactName: string;
  inquiryType: string;
  message?: string;
}

const inquiryTypeLabels: Record<string, string> = {
  web: 'Web制作',
  system: 'システム開発',
  maintenance: '保守運用',
  multiple: '複数のサービス',
};

/**
 * Contact form confirmation email template
 * Sent to client as auto-reply after inquiry submission
 */
export const ContactFormConfirmation = ({
  companyName,
  contactName,
  inquiryType,
  message,
}: ContactFormConfirmationProps) => {
  return (
    <EmailLayout previewText="お問い合わせありがとうございます">
      <EmailHeader title="お問い合わせありがとうございます" />

      <tr>
        <td style={{ padding: '40px' }}>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333333',
              margin: '0 0 20px 0',
            }}
          >
            {contactName} 様
          </p>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333333',
              margin: '0 0 20px 0',
            }}
          >
            この度は、福井フリーランスWeb制作へお問い合わせいただき、誠にありがとうございます。
          </p>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333333',
              margin: '0 0 20px 0',
            }}
          >
            以下の内容でお問い合わせを承りました。
          </p>
        </td>
      </tr>

      <InfoBox>
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
                <strong>お名前:</strong> {contactName}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0 0 12px 0',
                }}
              >
                <strong>お問い合わせ種別:</strong>{' '}
                {inquiryTypeLabels[inquiryType] || inquiryType}
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
        <td style={{ padding: '0 40px 40px 40px' }}>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333333',
              margin: '0 0 12px 0',
            }}
          >
            1営業日以内に担当者よりご連絡させていただきます。
          </p>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333333',
              margin: 0,
            }}
          >
            今しばらくお待ちくださいますよう、お願い申し上げます。
          </p>
        </td>
      </tr>

      <EmailFooter />
    </EmailLayout>
  );
};

export default ContactFormConfirmation;
