import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Globe, Code2, Shield, Package, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMDXContent, getServices, type ServiceFrontmatter } from '@/lib/mdx';

/**
 * Individual Service Page
 * User Story 1: Understanding Services in Detail
 * Design reference: designs/サービス_-_業種特化型_2/
 * Static generation with dynamic routes
 */
export const dynamic = 'force-static';

// Generate static params for all services
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getMDXContent<ServiceFrontmatter>('services', slug);

  if (!result) {
    return {
      title: 'サービスが見つかりません',
    };
  }

  return {
    title: `${result.frontmatter.title} | 福井フリーランスWeb制作`,
    description: result.frontmatter.description,
    openGraph: {
      title: result.frontmatter.title,
      description: result.frontmatter.description,
      type: 'article',
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getMDXContent<ServiceFrontmatter>('services', slug);

  if (!result) {
    notFound();
  }

  const { frontmatter, content } = result;

  // Icon mapping
  const IconComponent = {
    globe: Globe,
    code: Code2,
    shield: Shield,
  }[frontmatter.icon] || Package;

  // Pricing tier labels
  const tierLabel = {
    standard: '標準プラン',
    premium: 'プレミアムプラン',
    enterprise: 'エンタープライズプラン',
  }[frontmatter.pricingTier || 'standard'];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm">
              <IconComponent className="h-10 w-10" />
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {frontmatter.title}
            </h1>

            {/* Description */}
            <p className="mt-6 text-xl leading-8 text-gray-100">
              {frontmatter.description}
            </p>

            {/* Pricing Tier Badge */}
            {frontmatter.pricingTier && (
              <div className="mt-6">
                <span className="inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white">
                  {tierLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {frontmatter.features && frontmatter.features.length > 0 && (
        <section className="border-b border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              主な機能・特徴
            </h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {frontmatter.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  <span className="text-sm font-medium text-gray-900">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MDX Content Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-orange mx-auto">
            <MDXRemote source={content} />
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {frontmatter.title}について<br />お気軽にご相談ください
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              無料相談で詳しくご説明いたします。福井県内であれば現地訪問も可能です。
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

      {/* Related Services Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              その他のサービス
            </h2>
            <div className="mt-8">
              <Button asChild variant="outline" size="lg" className="border-2">
                <Link href="/services">
                  すべてのサービスを見る
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
