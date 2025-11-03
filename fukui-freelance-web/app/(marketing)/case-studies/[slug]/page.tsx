import { Link } from '@/components/ui/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, DollarSign, Clock, TrendingUp } from 'lucide-react';

// Mock case study data - will be replaced with MDX import
const caseStudiesData: Record<string, any> = {
  'beauty-salon-reservation': {
    title: '美容室予約システム導入で予約数40%増加',
    clientType: '美容室',
    industry: '美容・サロン',
    excerpt: '福井市内の美容室様に予約システムを導入し、24時間オンライン予約を実現。予約数40%増加、電話対応時間75%削減を達成しました。',
    projectDuration: '3ヶ月',
    budgetRange: '50万円〜100万円',
    publishedDate: '2024-09-15',
    goals: [
      '24時間365日予約受付できるシステムの構築',
      'スタッフの電話対応時間を50%以上削減',
      '予約の取りこぼしを防ぎ、予約数を20%以上増加',
      'スマートフォンから簡単に予約できるUI/UX',
    ],
    measurableResults: [
      {
        metric: '予約数',
        before: '月間150件',
        after: '月間210件',
        improvement: '40%増加',
      },
      {
        metric: '電話対応時間',
        before: '1日2時間',
        after: '1日30分',
        improvement: '75%削減',
      },
      {
        metric: '予約受付時間',
        before: '営業時間内のみ',
        after: '24時間365日',
        improvement: '受付時間拡大',
      },
    ],
    content: `
## 導入前の課題

福井市内で営業されている美容室A様は、以下の課題を抱えていました:

- **予約の取りこぼし**: 営業時間外の電話は取れず、機会損失が発生
- **スタッフの負担**: 施術中の電話対応で集中力が途切れる
- **予約管理の煩雑さ**: 紙の予約台帳で二重予約のリスク
- **顧客の不便**: 電話でしか予約できず、若い世代の顧客獲得が困難

## 導入後の改善

### オンライン予約システムの実装

- **リアルタイム空き状況表示**: スタッフの予定と連動し、常に最新の空き状況を表示
- **メニュー選択機能**: 施術内容と所要時間から自動で予約枠を計算
- **自動リマインダー**: 予約前日にSMSで通知し、無断キャンセルを削減
- **顧客管理機能**: 施術履歴や好みを記録し、リピーター対応を強化

### スマートフォン最適化

- **タップしやすいUI**: 福井県内の40代〜60代女性でも使いやすい設計
- **3ステップ予約**: メニュー選択→日時選択→情報入力の3画面で完結
- **LINE連携**: LINE公式アカウントから直接予約ページへアクセス可能
    `,
  },
  'cafe-takeout-ordering': {
    title: 'カフェテイクアウト注文システムで売上30%向上',
    clientType: 'カフェ',
    industry: '飲食店',
    excerpt: '福井県内のカフェ様に事前注文システムを導入。テイクアウト売上30%増加、待ち時間67%削減、注文ミスゼロを実現しました。',
    projectDuration: '2ヶ月',
    budgetRange: '30万円〜50万円',
    publishedDate: '2024-08-20',
    goals: [
      '事前注文で店頭混雑を解消',
      '待ち時間を50%以上削減',
      '注文ミスをゼロに',
      'テイクアウト売上を20%以上増加',
    ],
    measurableResults: [
      {
        metric: 'テイクアウト売上',
        before: '月間80万円',
        after: '月間104万円',
        improvement: '30%増加',
      },
      {
        metric: '待ち時間',
        before: '平均15分',
        after: '平均5分',
        improvement: '67%削減',
      },
      {
        metric: '注文ミス',
        before: '週5件',
        after: '週0件',
        improvement: '100%削減',
      },
    ],
    content: `
## 導入前の課題

福井市内で営業されているカフェB様は、コロナ禍でテイクアウト需要が急増した一方で、以下の課題に直面していました:

- **店頭混雑**: ランチタイムの注文受付で長蛇の列
- **待ち時間の長さ**: 注文から受け取りまで平均15分、顧客の不満
- **注文ミス**: 電話や店頭での聞き取りミスが週5件発生
- **機会損失**: 混雑を避けて来店を諦める顧客の増加

## 導入後の改善

### オンライン事前注文システムの実装

- **メニュー表示**: 写真付きで分かりやすいメニュー一覧
- **カスタマイズ機能**: トッピング、サイズ、氷の量などを選択可能
- **受取時間指定**: 15分刻みで希望時間を指定、混雑を分散
- **決済連携**: クレジットカード事前決済で店頭での会計不要
    `,
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all case studies
export async function generateStaticParams() {
  return [
    { slug: 'beauty-salon-reservation' },
    { slug: 'cafe-takeout-ordering' },
  ];
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = caseStudiesData[slug];

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      {/* Back Link */}
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        事例一覧に戻る
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {caseStudy.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" data-testid="client-type" className="text-sm">
            {caseStudy.clientType}
          </Badge>
          <Badge variant="outline" data-testid="industry" className="text-sm">
            {caseStudy.industry}
          </Badge>
        </div>

        <p className="text-lg text-muted-foreground">{caseStudy.excerpt}</p>
      </div>

      {/* Project Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Card data-testid="project-timeline">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">制作期間</p>
              <p className="font-semibold" data-testid="project-duration">
                {caseStudy.projectDuration}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="budget-range">
          <CardContent className="p-4 flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">予算</p>
              <p className="font-semibold">{caseStudy.budgetRange}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">公開日</p>
              <p className="font-semibold">{caseStudy.publishedDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Goals */}
      <section className="mb-12" data-testid="project-goals">
        <h2 className="text-2xl font-bold mb-4">プロジェクトの目的</h2>
        <ul className="space-y-2 list-disc list-inside">
          {caseStudy.goals.map((goal: string, index: number) => (
            <li key={index} className="text-muted-foreground">
              {goal}
            </li>
          ))}
        </ul>
      </section>

      {/* Before/After Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div>
            <h2 className="text-2xl font-bold mb-4">導入前の課題</h2>
            <Card className="bg-red-50">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  電話予約のみの対応で、営業時間外の予約機会を逃していました。
                  スタッフの負担も大きく、業務効率化が課題でした。
                </p>
              </CardContent>
            </Card>
          </div>

          {/* After */}
          <div>
            <h2 className="text-2xl font-bold mb-4">導入後の改善</h2>
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  24時間オンライン予約を実現し、予約数が大幅に増加。
                  スタッフの業務効率も向上し、顧客満足度が高まりました。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Measurable Results - KPI Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">成果・実績</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudy.measurableResults.map((result: any, index: number) => (
            <Card key={index} data-testid="kpi-card" className="bg-primary/5">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <p
                  className="text-sm text-muted-foreground mb-2"
                  data-testid="kpi-label"
                >
                  {result.metric}
                </p>
                <p
                  className="text-2xl font-bold text-primary mb-1"
                  data-testid="kpi-value"
                >
                  {result.improvement}
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.before} → {result.after}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div
        data-testid="case-study-content"
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: caseStudy.content }}
      />

      {/* CTA Section */}
      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">同じような成果を得る</h2>
        <p className="text-muted-foreground mb-6">
          この事例のような成果を、あなたのビジネスでも実現できます。
          まずは無料相談で、課題や目標をお聞かせください。
        </p>
        <Button asChild size="lg">
          <Link href="/contact">無料相談を予約する</Link>
        </Button>
      </div>
    </div>
  );
}
