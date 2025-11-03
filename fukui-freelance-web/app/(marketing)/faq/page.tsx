import { Link } from '@/components/ui/link';
import { getFAQEntries } from '@/lib/mdx';
import { FAQAccordion } from '@/components/features/FAQAccordion';
import { Button } from '@/components/ui/button';

/**
 * FAQ Page
 * Display frequently asked questions organized by category
 */
export const dynamic = 'force-static';

export const metadata = {
  title: 'よくある質問 | 福井フリーランスWeb制作',
  description: 'Web制作、システム開発、料金、制作期間、補助金など、お客様からよくいただくご質問にお答えします。',
};

export default function FAQPage() {
  const faqCategories = getFAQEntries();

  // Count total FAQs
  const totalFAQs = faqCategories.reduce((sum, category) => sum + category.faqs.length, 0);

  return (
    <>
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              よくある質問
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-100">
              Web制作・システム開発に関する{totalFAQs}個の質問にお答えします
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {faqCategories.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">FAQは準備中です。</p>
            </div>
          ) : (
            <div className="space-y-16">
              {faqCategories.map((category, index) => (
                <div key={index}>
                  <h2
                    className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-brand-500"
                    data-testid="faq-category"
                  >
                    {category.category}
                  </h2>
                  <FAQAccordion faqs={category.faqs} />
                </div>
              ))}
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 rounded-lg bg-gradient-to-r from-brand-50 to-brand-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              その他のご質問はお気軽にお問い合わせください
            </h3>
            <p className="text-gray-700 mb-6">
              お客様のプロジェクトに合わせた詳しいご説明をいたします
            </p>
            <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600">
              <Link href="/contact">直接お問い合わせ</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
