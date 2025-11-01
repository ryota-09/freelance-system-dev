import { Link } from 'next-view-transitions';
import { Button } from '@/components/ui/button';

/**
 * HeroSection Component
 * Homepage hero section with value proposition and CTAs
 * Design reference: designs/ホーム_-_特化型デザイン_2/
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/home.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Headline */}
          <h1 className="text-2xl font-bold text-white sm:text-5xl lg:text-6xl">
            福井のWeb制作・システム開発<br />
            成果に直結するホームページを。
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg leading-8 text-gray-100 sm:text-xl">
            地域密着の丁寧な対応、東京の最新技術を福井で。小規模事業者様のためのカスタムWeb制作と予約システム開発を提供します。
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-brand-500 px-8 py-6 text-base font-semibold text-white hover:bg-brand-600 sm:w-auto"
            >
              <Link href="/contact">
                無料相談予約
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-2 border-white bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              <Link href="/services/web-seisaku">
                料金プランをみてみる
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-brand-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">福井県全域対応</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-brand-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">現地訪問可能</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-brand-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">補助金相談対応</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-400 to-transparent" />
    </section>
  );
}
