import { Link } from 'next-view-transitions';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/features/ServiceCard';
import { getServices } from '@/lib/mdx';

/**
 * Services Index Page
 * Lists all available services
 * Force static generation
 */
export const dynamic = 'force-static';

export const metadata = {
  title: 'サービス一覧 | 福井フリーランスWeb制作',
  description: 'Web制作、システム開発、保守運用など、福井の事業者様向けの各種サービスをご紹介します。',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              提供サービス
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-100">
              福井の事業者様のニーズに合わせた、多様なITサービスをご提供します。
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              どのサービスが最適か<br />お気軽にご相談ください
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              お客様の課題やご予算に合わせて、最適なプランをご提案いたします。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-brand-500 px-8 py-6 text-base font-semibold text-white hover:bg-brand-600 sm:w-auto"
              >
                <Link href="/contact">
                  今すぐ無料で相談する
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-2 px-8 py-6 text-base font-semibold sm:w-auto"
              >
                <Link href="/pricing">
                  料金プランを確認
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
