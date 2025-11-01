import { Link } from 'next-view-transitions';
import { BadgeDollarSign, FileText, CreditCard, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Pricing Page
 * User Story 1: Understanding Service Pricing
 * Force static generation
 */
export const dynamic = 'force-static';

export const metadata = {
  title: '料金プラン | 福井フリーランスWeb制作',
  description: 'Web制作、システム開発、保守運用の料金プランをご紹介。小規模事業者様向けの明確で分かりやすい価格設定です。',
};

const pricingPlans = [
  {
    id: 'web-standard',
    category: 'Web制作',
    name: 'スタンダードプラン',
    price: '30万円〜50万円',
    description: '小規模事業者様向けの基本的なホームページ制作',
    features: [
      '5〜10ページ程度',
      'レスポンシブデザイン（スマホ・タブレット対応）',
      '基本的なSEO対策',
      'お問い合わせフォーム設置',
      'CMS導入（WordPress等）',
      '1ヶ月の無料サポート',
      'SSL対応（セキュア通信）',
    ],
    recommended: false,
  },
  {
    id: 'web-premium',
    category: 'Web制作',
    name: 'プレミアムプラン',
    price: '50万円〜100万円',
    description: '本格的なビジネスサイトやECサイトに最適',
    features: [
      '10〜20ページ程度',
      'レスポンシブデザイン',
      '高度なSEO対策',
      'ブログ機能',
      'アクセス解析設定',
      '3ヶ月の無料サポート',
      'オリジナルデザイン',
      '多言語対応（オプション）',
    ],
    recommended: true,
  },
  {
    id: 'system-small',
    category: 'システム開発',
    name: '小規模システム',
    price: '50万円〜100万円',
    description: '基本的な業務システムの開発',
    features: [
      '基本的なCRUD機能',
      'データベース設計・構築',
      'レスポンシブWebアプリ',
      '1〜2ヶ月の開発期間',
      '3ヶ月の保守サポート',
      '操作マニュアル作成',
    ],
    recommended: false,
  },
  {
    id: 'system-medium',
    category: 'システム開発',
    name: '中規模システム',
    price: '100万円〜300万円',
    description: '複雑な業務ロジックや外部連携が必要なシステム',
    features: [
      '複雑な業務ロジック実装',
      '外部システム連携（API開発）',
      'セキュリティ強化',
      '3〜6ヶ月の開発期間',
      '6ヶ月の保守サポート',
      '段階的リリース対応',
      'データ移行支援',
    ],
    recommended: false,
  },
  {
    id: 'maintenance-light',
    category: '保守運用',
    name: 'ライトプラン',
    price: '月額2万円〜',
    description: '小規模サイト向けの基本メンテナンス',
    features: [
      'CMSアップデート（月1回）',
      'セキュリティチェック',
      '週1回の自動バックアップ',
      'メールサポート（営業日48時間以内）',
      'テキスト・画像更新（月2回まで）',
      '月次レポート',
    ],
    recommended: false,
  },
  {
    id: 'maintenance-standard',
    category: '保守運用',
    name: 'スタンダードプラン',
    price: '月額5万円〜',
    description: '中規模サイト向けの手厚いサポート',
    features: [
      '毎日の自動バックアップ',
      'サーバー稼働監視',
      '電話サポート（営業時間内）',
      'メールサポート（営業日24時間以内）',
      'テキスト・画像更新（月8回まで）',
      '新規ページ追加（月1ページまで）',
      '詳細な月次レポート',
      'SEO基本チェック',
    ],
    recommended: true,
  },
];

const categories = ['すべて', 'Web制作', 'システム開発', '保守運用'];

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              料金プラン
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-100">
              明確で分かりやすい価格設定。小規模事業者様でも安心してご利用いただけます。
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Sections */}
          {categories.slice(1).map((category) => (
            <div key={category} className="mb-20">
              <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                {category}
              </h2>
              <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 items-stretch">
                {pricingPlans
                  .filter((plan) => plan.category === category)
                  .map((plan) => (
                    <Card
                      key={plan.id}
                      data-testid="pricing-tier"
                      className={`flex h-full flex-col ${
                        plan.recommended
                          ? 'border-2 border-brand-500 shadow-xl ring-2 ring-brand-500 ring-offset-2'
                          : 'border-2 border-gray-200'
                      }`}
                    >
                      <CardHeader>
                        {plan.recommended && (
                          <div className="mb-4">
                            <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                              おすすめ
                            </span>
                          </div>
                        )}
                        <CardTitle className="text-2xl">
                          {plan.name}
                        </CardTitle>
                        <div className="mt-4">
                          <span className="text-4xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                        </div>
                        <CardDescription className="mt-4 text-base">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-1">
                        <ul className="space-y-3" data-testid="feature-list">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="mt-1 text-brand-500">✓</span>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter className="mt-auto">
                        <Button
                          asChild
                          className={`w-full ${
                            plan.recommended
                              ? 'bg-brand-500 hover:bg-brand-600'
                              : 'bg-gray-900 hover:bg-gray-800'
                          }`}
                        >
                          <Link href="/contact">
                            無料相談を予約
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              料金についての補足
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <BadgeDollarSign className="h-5 w-5 text-brand-600" />
                  補助金のご活用について
                </h3>
                <p className="text-sm">
                  IT導入補助金やものづくり補助金など、各種補助金の活用が可能です。申請サポートも行っておりますので、お気軽にご相談ください。
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <FileText className="h-5 w-5 text-brand-600" />
                  お見積もりについて
                </h3>
                <p className="text-sm">
                  上記は目安の料金です。お客様の具体的なご要望に応じて、詳細なお見積もりを作成いたします。まずは無料相談でお話をお聞かせください。
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <CreditCard className="h-5 w-5 text-brand-600" />
                  お支払い方法
                </h3>
                <p className="text-sm">
                  銀行振込に対応しております。分割払いについてもご相談に応じますので、お気軽にお問い合わせください。
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <RefreshCcw className="h-5 w-5 text-brand-600" />
                  キャンセルポリシー
                </h3>
                <p className="text-sm">
                  プロジェクト開始前であれば、着手金を除き全額返金いたします。開始後のキャンセルについては、進捗状況に応じた精算となります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ご予算やご要望に合わせたプランをご提案
            </h2>
            <p className="mt-4 text-lg leading-8 text-brand-100">
              まずは無料相談で、お客様のご状況をお聞かせください。最適なプランをご提案いたします。
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="w-full bg-white px-8 py-6 text-base font-semibold text-brand-600 hover:bg-gray-100 sm:w-auto"
              >
                <Link href="/contact">
                  今すぐ無料で相談する
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
