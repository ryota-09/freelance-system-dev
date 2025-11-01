/**
 * Case Studies Page
 * Placeholder page for case studies
 */
export const dynamic = 'force-static';

export const metadata = {
  title: '制作事例 | 福井フリーランスWeb制作',
  description: 'Web制作、システム開発の制作事例をご紹介します。',
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              制作事例
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-100">
              これまでの制作実績をご紹介します。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">制作事例は準備中です。</p>
          </div>
        </div>
      </section>
    </>
  );
}
