import * as React from 'react';

interface EmailLayoutProps {
  children: React.ReactNode;
  previewText?: string;
}

/**
 * Base email layout component
 * Provides consistent styling for all email templates
 */
export const EmailLayout = ({ children, previewText }: EmailLayoutProps) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {previewText && (
          <div
            style={{
              display: 'none',
              overflow: 'hidden',
              lineHeight: '1px',
              opacity: 0,
              maxHeight: 0,
              maxWidth: 0,
            }}
          >
            {previewText}
          </div>
        )}
      </head>
      <body
        style={{
          backgroundColor: '#f6f9fc',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <table
          width="100%"
          border={0}
          cellSpacing="0"
          cellPadding="0"
          style={{
            backgroundColor: '#f6f9fc',
            padding: '40px 0',
          }}
        >
          <tr>
            <td align="center">
              <table
                width="600"
                border={0}
                cellSpacing="0"
                cellPadding="0"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
              >
                {children}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

interface EmailHeaderProps {
  title: string;
}

export const EmailHeader = ({ title }: EmailHeaderProps) => {
  return (
    <tr>
      <td
        style={{
          backgroundColor: '#0070f3',
          padding: '32px 40px',
        }}
      >
        <h1
          style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: 0,
            lineHeight: '1.4',
          }}
        >
          {title}
        </h1>
      </td>
    </tr>
  );
};

interface EmailFooterProps {
  companyName?: string;
  email?: string;
  phone?: string;
}

export const EmailFooter = ({
  companyName = '福井フリーランスWeb制作',
  email = 'contact@yourdomain.com',
  phone = '0776-12-3456',
}: EmailFooterProps) => {
  return (
    <tr>
      <td
        style={{
          padding: '32px 40px',
          borderTop: '1px solid #e6e6e6',
        }}
      >
        <p
          style={{
            color: '#666666',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          {companyName}
          <br />
          Email: {email}
          <br />
          Tel: {phone}
        </p>
      </td>
    </tr>
  );
};

interface EmailButtonProps {
  href: string;
  text: string;
}

export const EmailButton = ({ href, text }: EmailButtonProps) => {
  return (
    <table width="100%" border={0} cellSpacing="0" cellPadding="0">
      <tr>
        <td align="center" style={{ padding: '20px 0' }}>
          <a
            href={href}
            style={{
              backgroundColor: '#0070f3',
              color: '#ffffff',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            {text}
          </a>
        </td>
      </tr>
    </table>
  );
};

interface InfoBoxProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export const InfoBox = ({ children, backgroundColor = '#f5f5f5' }: InfoBoxProps) => {
  return (
    <tr>
      <td
        style={{
          backgroundColor,
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        {children}
      </td>
    </tr>
  );
};
