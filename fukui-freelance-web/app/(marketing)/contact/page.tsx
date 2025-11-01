/**
 * Contact Page
 * User Story 1: Contact Form for Free Consultation
 * Force static generation
 */
export const dynamic = 'force-static';

export const metadata = {
  title: '無料相談予約 | 福井フリーランスWeb制作',
  description: 'Web制作、システム開発のご相談を無料で承ります。福井県内であれば現地訪問も可能です。',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              無料相談予約
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-100">
              お気軽にご相談ください。福井県内であれば現地訪問も可能です。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              お問い合わせフォーム
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              以下のフォームからお問い合わせください。担当者より2営業日以内にご連絡いたします。
            </p>
          </div>

          {/* Placeholder for contact form */}
          <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-12 text-center">
            <p className="text-gray-600">
              お問い合わせフォームは準備中です。
            </p>
            <p className="mt-4 text-sm text-gray-500">
              お急ぎの方は、お電話でお問い合わせください。
              <br />
              <a href="tel:0776123456" className="font-semibold text-brand-600 hover:text-brand-700">
                0776-12-3456
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
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
                <a href="tel:0776123456" className="hover:text-brand-600">
                  0776-12-3456
                </a>
              </p>
              <p className="text-sm text-gray-500">営業時間: 平日 9:00-18:00</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
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
                <a href="mailto:info@example.com" className="hover:text-brand-600">
                  info@example.com
                </a>
              </p>
              <p className="text-sm text-gray-500">24時間受付</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
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
