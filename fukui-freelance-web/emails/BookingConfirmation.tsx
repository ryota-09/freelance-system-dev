import * as React from 'react';
import { EmailLayout, EmailHeader, EmailFooter, InfoBox } from './components/EmailLayout';

interface BookingConfirmationProps {
  companyName: string;
  contactName: string;
  preferredFormat: string;
  needsDescription: string;
}

const formatLabels: Record<string, string> = {
  online: 'オンライン',
  'in-person': '対面',
};

/**
 * Booking confirmation email template
 * Sent to client after consultation booking
 */
export const BookingConfirmation = ({
  companyName,
  contactName,
  preferredFormat,
  needsDescription,
}: BookingConfirmationProps) => {
  return (
    <EmailLayout previewText="無料相談のご予約ありがとうございます">
      <EmailHeader title="無料相談のご予約ありがとうございます" />

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
            この度は、福井フリーランスWeb制作の無料相談をご予約いただき、誠にありがとうございます。
          </p>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333333',
              margin: '0 0 20px 0',
            }}
          >
            以下の内容でご予約を承りました。
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
                <strong>相談形式:</strong> {formatLabels[preferredFormat] || preferredFormat}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: 0,
                }}
              >
                <strong>相談内容:</strong>
                <br />
                {needsDescription}
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
              margin: '0 0 16px 0',
            }}
          >
            次のステップ
          </h2>

          <ol
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333333',
              margin: 0,
              paddingLeft: '20px',
            }}
          >
            <li style={{ marginBottom: '8px' }}>
              担当者よりご希望日時の中から調整のご連絡を差し上げます（1営業日以内）
            </li>
            <li style={{ marginBottom: '8px' }}>
              日時確定後、相談形式に応じて詳細をご案内いたします
            </li>
            <li>相談当日は、お気軽にご質問ください</li>
          </ol>
        </td>
      </tr>

      <tr>
        <td style={{ padding: '0 40px 40px 40px' }}>
          <table
            width="100%"
            border={0}
            cellSpacing="0"
            cellPadding="0"
            style={{
              backgroundColor: '#fff3cd',
              borderLeft: '4px solid #ffc107',
              borderRadius: '6px',
            }}
          >
            <tr>
              <td style={{ padding: '15px' }}>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#856404',
                    margin: 0,
                  }}
                >
                  <strong>キャンセル・変更について:</strong>
                  <br />
                  ご都合が悪くなった場合は、お早めにご連絡ください。
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <EmailFooter />
    </EmailLayout>
  );
};

export default BookingConfirmation;
