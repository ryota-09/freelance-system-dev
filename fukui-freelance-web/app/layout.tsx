import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: {
    default: '福井のフリーランスWeb制作・システム開発',
    template: '%s | 福井フリーランスWeb制作',
  },
  description: '福井県全域対応のフリーランスWeb制作・システム開発サービス。小規模事業者様向けの丁寧なサポートと、東京の技術を福井で。補助金相談も対応。',
  keywords: ['福井', 'Web制作', 'システム開発', 'フリーランス', 'ホームページ制作', '福井市', 'IT支援'],
  authors: [{ name: '福井フリーランスWeb制作' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '福井フリーランスWeb制作',
    title: '福井のフリーランスWeb制作・システム開発',
    description: '福井県全域対応のWeb制作・システム開発サービス。小規模事業者様向けの丁寧なサポート。',
  },
  twitter: {
    card: 'summary_large_image',
    title: '福井のフリーランスWeb制作・システム開発',
    description: '福井県全域対応のWeb制作・システム開発サービス',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="ja">
        <head>
          <script
            defer
            data-domain="yourdomain.com"
            src="https://plausible.io/js/script.js"
          />
        </head>
        <body className={`${notoSansJP.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
