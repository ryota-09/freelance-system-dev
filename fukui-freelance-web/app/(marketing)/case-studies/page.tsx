'use client';

import { useState, useMemo } from 'react';
import { CaseStudyCard } from '@/components/features/CaseStudyCard';
import { Button } from '@/components/ui/button';

// Type definition for case study
interface CaseStudy {
  title: string;
  clientType: string;
  industry: string;
  slug: string;
  excerpt: string;
  measurableResults: Array<{
    metric: string;
    improvement: string;
  }>;
}

// Mock data - will be replaced with MDX import
const caseStudies: CaseStudy[] = [
  {
    title: '美容室予約システム導入で予約数40%増加',
    clientType: '美容室',
    industry: '美容・サロン',
    slug: 'beauty-salon-reservation',
    excerpt: '福井市内の美容室様に予約システムを導入し、24時間オンライン予約を実現。予約数40%増加、電話対応時間75%削減を達成しました。',
    measurableResults: [
      {
        metric: '予約数',
        improvement: '40%増加',
      },
    ],
  },
  {
    title: 'カフェテイクアウト注文システムで売上30%向上',
    clientType: 'カフェ',
    industry: '飲食店',
    slug: 'cafe-takeout-ordering',
    excerpt: '福井県内のカフェ様に事前注文システムを導入。テイクアウト売上30%増加、待ち時間67%削減、注文ミスゼロを実現しました。',
    measurableResults: [
      {
        metric: 'テイクアウト売上',
        improvement: '30%増加',
      },
    ],
  },
];

// Extract unique industries for filter buttons
const industries = Array.from(new Set(caseStudies.map((cs) => cs.industry)));

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('すべて');

  // Filter case studies based on selected industry
  const filteredCaseStudies = useMemo(() => {
    if (selectedIndustry === 'すべて') {
      return caseStudies;
    }
    return caseStudies.filter((cs) => cs.industry === selectedIndustry);
  }, [selectedIndustry]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          実績・事例紹介
        </h1>
        <p className="text-lg text-muted-foreground">
          福井県内の企業様・事業者様の課題を解決し、成果を上げた事例をご紹介します。
          具体的な数値とともに、導入前の課題から導入後の成果まで詳しくご覧いただけます。
        </p>
      </div>

      {/* Industry Filters */}
      <div
        data-testid="industry-filters"
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        <Button
          variant={selectedIndustry === 'すべて' ? 'default' : 'outline'}
          onClick={() => setSelectedIndustry('すべて')}
          aria-pressed={selectedIndustry === 'すべて'}
          className="min-w-[100px]"
        >
          すべて
        </Button>
        {industries.map((industry) => (
          <Button
            key={industry}
            variant={selectedIndustry === industry ? 'default' : 'outline'}
            onClick={() => setSelectedIndustry(industry)}
            data-testid={`filter-${industry.toLowerCase().replace(/[・\s]/g, '-')}`}
            aria-pressed={selectedIndustry === industry}
            className="min-w-[100px]"
          >
            {industry}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <div data-testid="results-count" className="text-center text-sm text-muted-foreground mb-6">
        {filteredCaseStudies.length}件の事例が見つかりました
      </div>

      {/* Case Studies Grid */}
      {filteredCaseStudies.length > 0 ? (
        <div
          data-testid="case-studies-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {filteredCaseStudies.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy.slug}
              title={caseStudy.title}
              clientType={caseStudy.clientType}
              industry={caseStudy.industry}
              resultsPreview={caseStudy.measurableResults[0].improvement}
              slug={caseStudy.slug}
              excerpt={caseStudy.excerpt}
            />
          ))}
        </div>
      ) : (
        <div
          data-testid="no-results"
          className="text-center py-12 text-muted-foreground"
        >
          該当する事例が見つかりませんでした
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center max-w-2xl mx-auto bg-primary/5 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          あなたのビジネスにも成果を
        </h2>
        <p className="text-muted-foreground mb-6">
          ご紹介した事例のような成果を、あなたのビジネスでも実現できます。
          まずは無料相談で、課題や目標をお聞かせください。
        </p>
        <Button asChild size="lg">
          <a href="/contact">無料相談を予約する</a>
        </Button>
      </div>
    </div>
  );
}
