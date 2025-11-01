/**
 * Process Page
 * Display the complete project flow from inquiry to maintenance
 */
import Link from 'next/link';
import { MessageCircle, ClipboardList, PenTool, Settings, CheckCircle, Rocket, Wrench, Phone, Clock, Lock } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata = {
  title: '制作の流れ | 福井フリーランスWeb制作',
  description: 'お客様が開発の全体像を理解し、不安なくご依頼いただけるよう、お問い合わせから運用までの流れを詳しくご説明します。Web制作、システム開発の制作フローをご紹介します。',
};

const processSteps = [
  {
    number: '01',
    title: 'お問い合わせ・無料相談',
    description: 'お客様の課題やご要望をヒアリングします。まずはお気軽にご相談ください。オンライン・対面どちらでも対応可能です。',
    duration: '1~2日',
    clientResponsibility: 'ご要望や課題をお聞かせください',
    Icon: MessageCircle,
  },
  {
    number: '02',
    title: '要件定義・お見積もり',
    description: 'ヒアリング内容を元に、機能やスコープを定義し、お見積もりを提示します。開発に必要な要件を明確にし、プロジェクトの方向性を決定します。',
    duration: '3~7日',
    clientResponsibility: '要件定義書・お見積もり内容のご確認',
    Icon: ClipboardList,
  },
  {
    number: '03',
    title: 'ご契約・設計',
    description: 'デザイン（UI/UX）とシステム構成の設計を行います。お客様のブランドイメージや使いやすさを考慮した設計を作成します。',
    duration: '1~2週間',
    clientResponsibility: '設計書・デザイン案のご確認',
    Icon: PenTool,
  },
  {
    number: '04',
    title: '実装・開発',
    description: '設計に基づき、コーディングと開発を実施します。定期的に進捗をご報告し、お客様のフィードバックを反映しながら開発を進めます。',
    duration: '2~8週間',
    clientResponsibility: '進捗確認・必要素材のご提供',
    Icon: Settings,
  },
  {
    number: '05',
    title: 'テスト・検収',
    description: 'お客様に動作確認を行っていただき、修正点を洗い出します。実際の環境でのテストを実施し、品質を確保します。',
    duration: '1~2週間',
    clientResponsibility: '動作確認・修正依頼のご提出',
    Icon: CheckCircle,
  },
  {
    number: '06',
    title: '公開（納品）',
    description: 'サーバーへのアップロードなど、Webサイト/システムを公開します。ドメイン設定やSSL証明書の設定も行います。',
    duration: '1~3日',
    clientResponsibility: '最終確認・公開承認',
    Icon: Rocket,
  },
  {
    number: '07',
    title: '運用・保守',
    description: '公開後の更新作業やサーバー管理、改善提案を行います。継続的にサイトの健全性を保ち、必要に応じて機能追加や改善を実施します。',
    duration: '継続的',
    clientResponsibility: '更新内容のご指示・定期レビュー',
    Icon: Wrench,
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              安心のプロジェクト進行プロセス
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100 sm:text-xl">
              お客様が開発の全体像を理解し、不安なくご依頼いただけるよう、<br />
              お問い合わせから運用までの流れを詳しくご説明します。
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-amber-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                無料相談・お問い合わせはこちら
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Web制作・システム開発の流れ
          </h2>

          {/* Timeline */}
          <div className="relative">
            {processSteps.map((step, index) => (
              <div key={step.number} className="relative pb-16 last:pb-0">
                {/* Timeline line */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-300" aria-hidden="true"></div>
                )}

                <div className="flex gap-6">
                  {/* Icon Circle */}
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                      <step.Icon className="h-6 w-6 text-amber-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.number}. {step.title}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                        期間: {step.duration}
                      </span>
                    </div>
                    <p className="mb-3 text-gray-600">{step.description}</p>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">お客様にご協力いただくこと: </span>
                        {step.clientResponsibility}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Points Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            プロジェクト進行のポイント
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Phone className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">密なコミュニケーション</h3>
              <p className="text-gray-600">
                定期的な進捗報告とレビューを通じて、お客様のご要望を正確に反映します。
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">柔軟なスケジュール</h3>
              <p className="text-gray-600">
                お客様のご都合に合わせて、スケジュールを調整いたします。急ぎの案件もご相談ください。
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Lock className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">情報の守秘</h3>
              <p className="text-gray-600">
                お客様の情報は厳重に管理し、機密保持契約にも対応いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            よくあるご質問
          </h2>

          <div className="space-y-4">
            <details className="group rounded-lg border border-gray-200 p-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                <span>途中で仕様変更は可能ですか？</span>
                <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                はい、可能です。ただし、仕様変更は納期や費用に影響する場合がございますので、その都度ご相談させていただき、ご納得いただいた上で進行いたします。
              </p>
            </details>

            <details className="group rounded-lg border border-gray-200 p-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                <span>お見積もりは無料ですか？</span>
                <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                はい、お見積もりは無料で承っております。まずはお客様のご要望をお聞かせください。最適なプランをご提案させていただきます。
              </p>
            </details>

            <details className="group rounded-lg border border-gray-200 p-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                <span>開発の知識がなくても大丈夫ですか？</span>
                <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                もちろんです。専門的な知識がないお客様にも分かりやすくご説明し、二人三脚でプロジェクトを進めてまいりますので、ご安心ください。
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            まずは無料でご相談ください。<br />
            あなたのビジネスの課題を一緒に解決します。
          </h2>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-lg bg-amber-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-colors"
            >
              プロジェクトについて相談する
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-600">
            お電話でのお問い合わせ: <a href="tel:0776-XX-XXXX" className="font-semibold text-amber-600 hover:text-amber-500">0776-XX-XXXX</a>
          </p>
        </div>
      </section>
    </>
  );
}
