import { Link } from 'next-view-transitions';
import { Handshake, Lightbulb, BadgeDollarSign, CheckCircle } from 'lucide-react';
import { HeroSection } from '@/components/features/HeroSection';
import { ServiceCard } from '@/components/features/ServiceCard';
import { CaseStudyCard } from '@/components/features/CaseStudyCard';
import { Button } from '@/components/ui/button';
import { getServices } from '@/lib/mdx';

/**
 * Homepage - Marketing Landing Page
 * User Story 1: Initial Site Visit & Understanding Services
 * Design reference: designs/ホーム_-_特化型デザイン_2/
 * Force static generation
 */
export const dynamic = 'force-static';

// Featured case studies data (will be replaced with MDX import)
const featuredCaseStudies = [
  {
    title: '美容室予約システム導入で予約数40%増加',
    clientType: '美容室',
    industry: '美容・サロン',
    slug: 'beauty-salon-reservation',
    excerpt: '福井市内の美容室様に予約システムを導入し、24時間オンライン予約を実現。予約数40%増加、電話対応時間75%削減を達成しました。',
    resultsPreview: '予約数40%増加',
  },
  {
    title: 'カフェテイクアウト注文システムで売上30%向上',
    clientType: 'カフェ',
    industry: '飲食店',
    slug: 'cafe-takeout-ordering',
    excerpt: '福井県内のカフェ様に事前注文システムを導入。テイクアウト売上30%増加、待ち時間67%削減、注文ミスゼロを実現しました。',
    resultsPreview: '売上30%増加',
  },
];

export default async function HomePage() {
  const services = await getServices();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              提供サービス
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              福井の事業者様のニーズに合わせた、3つの主要サービスをご提供します。
            </p>
          </div>

          {/* Services Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                slug={service.slug}
                description={service.description}
                icon={service.icon}
                features={service.features}
                pricingTier={service.pricingTier}
              />
            ))}
          </div>

          {/* View All Services CTA */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link href="/services">
                すべてのサービスを見る
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Case Studies Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              導入事例
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              福井県内の企業様の課題解決と成果をご紹介します
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {featuredCaseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.slug}
                title={caseStudy.title}
                clientType={caseStudy.clientType}
                industry={caseStudy.industry}
                resultsPreview={caseStudy.resultsPreview}
                slug={caseStudy.slug}
                excerpt={caseStudy.excerpt}
              />
            ))}
          </div>

          {/* View All Case Studies CTA */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link href="/case-studies">
                すべての事例を見る
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-amber-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              選ばれる理由
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              福井の事業者様に寄り添う、地域密着型のサービス
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {/* Reason 1 */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                地域密着の丁寧な対応
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                福井県内であれば現地訪問も可能。対面での打ち合わせで、細かなニーズまでしっかりヒアリングします。
              </p>
            </div>

            {/* Reason 2 */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                東京の最新技術を福井で
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                大手企業での開発経験を活かし、最新のWeb技術とシステム開発手法を福井の事業者様にお届けします。
              </p>
            </div>

            {/* Reason 3 */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                <BadgeDollarSign className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                補助金活用のサポート
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                IT導入補助金など、各種補助金の申請サポートも実施。コストを抑えた導入をお手伝いします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              まずは無料相談から
            </h2>
            <p className="mt-4 text-lg leading-8 text-brand-100">
              お気軽にご相談ください。福井県内であれば現地訪問も可能です。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-white px-8 py-6 text-base font-semibold text-brand-600 hover:bg-gray-100 sm:w-auto"
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
                <Link href="/pricing">
                  料金プランを確認
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-brand-500" />
              <span className="text-sm font-medium">福井県全域対応</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-brand-500" />
              <span className="text-sm font-medium">現地訪問可能</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-brand-500" />
              <span className="text-sm font-medium">補助金相談対応</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-brand-500" />
              <span className="text-sm font-medium">無料相談実施中</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
