'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'next-view-transitions';
import { Menu, X, Phone } from 'lucide-react';

/**
 * Marketing Layout
 * Provides header and footer for all marketing pages
 */
export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold text-brand-600">
                福井フリーランス
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex lg:gap-x-8">
            <Link
              href="/services"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-600"
            >
              サービス
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-600"
            >
              料金
            </Link>
            <Link
              href="/case-studies"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-600"
            >
              事例
            </Link>
            <Link
              href="/process"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-600"
            >
              制作の流れ
            </Link>
            <Link
              href="/faq"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-600"
            >
              よくある質問
            </Link>
            <Link
              href="/blog"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-600"
            >
              ブログ
            </Link>
          </div>

          {/* CTA Button & Phone */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-4">
            <a
              href="tel:0776123456"
              className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-brand-600"
              aria-label="電話をかける: 0776-12-3456"
            >
              <Phone className="h-4 w-4" />
              0776-12-3456
            </a>
            <Link
              href="/contact"
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              無料相談予約
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="tel:0776123456"
              className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-brand-600"
              aria-label="電話をかける: 0776-12-3456"
            >
              <Phone className="h-5 w-5" />
              <span className="text-xs sm:text-sm">0776-12-3456</span>
            </a>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">メニューを開く</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div
              className="fixed inset-0 z-40 animate-in fade-in duration-200 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 z-50 h-screen w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-xl font-bold text-brand-600">
                    福井フリーランス
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">メニューを閉じる</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link
                      href="/services"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      サービス
                    </Link>
                    <Link
                      href="/pricing"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      料金
                    </Link>
                    <Link
                      href="/case-studies"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      事例
                    </Link>
                    <Link
                      href="/process"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      制作の流れ
                    </Link>
                    <Link
                      href="/faq"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      よくある質問
                    </Link>
                    <Link
                      href="/blog"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ブログ
                    </Link>
                  </div>
                  <div className="py-6">
                    <Link
                      href="/contact"
                      className="-mx-3 block rounded-lg bg-brand-600 px-3 py-2.5 text-center text-base font-semibold leading-7 text-white hover:bg-brand-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      無料相談予約
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">福井フリーランスWeb制作</h3>
              <p className="text-sm text-gray-400">
                福井県全域対応のWeb制作・システム開発サービス。小規模事業者様の成長をITで支援します。
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:info@example.com" className="hover:text-white">
                  info@example.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href="tel:0776123456" className="hover:text-white">
                  0776-12-3456
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold text-white">サービス</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/services/web-seisaku"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      Web制作
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/system-kaihatsu"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      システム開発
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/maintenance"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      保守運用
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">情報</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/case-studies"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      制作事例
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      料金プラン
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/process"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      制作の流れ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      よくある質問
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      ブログ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} 福井フリーランスWeb制作. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
