/**
 * Blog Page
 * Placeholder page for blog
 */
export const dynamic = 'force-static';

export const metadata = {
  title: 'ブログ | 福井フリーランスWeb制作',
  description: 'Web制作、システム開発に関する情報をお届けします。',
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              ブログ
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-100">
              Web制作やシステム開発に関する情報をお届けします。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">ブログ記事は準備中です。</p>
          </div>
        </div>
      </section>
    </>
  );
}
