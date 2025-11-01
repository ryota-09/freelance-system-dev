'use client';

import * as React from 'react';
import { ContactForm } from '@/components/forms/ContactForm';
import { BookingForm } from '@/components/forms/BookingForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Contact Page
 * User Story 3: Submitting Inquiry/Consultation Request
 * Displays both contact form and booking form in tabs
 */
export default function ContactPage() {
  const [activeTab, setActiveTab] = React.useState<'contact' | 'booking'>('contact');

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              お問い合わせ・無料相談予約
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-100">
              お気軽にご相談ください。福井県内であれば現地訪問も可能です。
            </p>
          </div>
        </div>
      </section>

      {/* Form Tabs Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="mb-8 flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-4 px-1 text-lg font-semibold border-b-2 transition-colors ${
                activeTab === 'contact'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              お問い合わせ
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`pb-4 px-1 text-lg font-semibold border-b-2 transition-colors ${
                activeTab === 'booking'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              無料相談予約
            </button>
          </div>

          {/* Tab Content */}
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'contact' ? 'お問い合わせフォーム' : '無料相談予約フォーム'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'contact'
                  ? '以下のフォームからお問い合わせください。1営業日以内にご連絡いたします。'
                  : '無料相談をご希望の方は、以下のフォームからご予約ください。1営業日以内に日程調整のご連絡をいたします。'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === 'contact' ? <ContactForm /> : <BookingForm />}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <svg
                  className="h-6 w-6"
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
              </div>
              <h3 className="text-lg font-semibold text-gray-900">お電話</h3>
              <p className="mt-2 text-gray-600">
                <a href="tel:0776123456" className="hover:text-amber-600">
                  0776-12-3456
                </a>
              </p>
              <p className="text-sm text-gray-500">営業時間: 平日 9:00-18:00</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <svg
                  className="h-6 w-6"
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
              </div>
              <h3 className="text-lg font-semibold text-gray-900">メール</h3>
              <p className="mt-2 text-gray-600">
                <a href="mailto:info@example.com" className="hover:text-amber-600">
                  info@example.com
                </a>
              </p>
              <p className="text-sm text-gray-500">24時間受付</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">対応エリア</h3>
              <p className="mt-2 text-gray-600">福井県全域</p>
              <p className="text-sm text-gray-500">現地訪問可能</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
