import { Link } from '@/components/ui/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface CaseStudyCardProps {
  title: string;
  clientType: string;
  industry: string;
  resultsPreview: string;
  slug: string;
  excerpt?: string;
}

export function CaseStudyCard({
  title,
  clientType,
  industry,
  resultsPreview,
  slug,
  excerpt,
}: CaseStudyCardProps) {
  return (
    <Card
      data-testid="case-study-card"
      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <Link href={`/case-studies/${slug}`} className="block">
        <CardHeader className="space-y-3">
          {/* Title */}
          <h3
            data-testid="case-study-title"
            className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2"
          >
            {title}
          </h3>

          {/* Client Type and Industry Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              data-testid="case-study-client-type"
              className="text-sm"
            >
              {clientType}
            </Badge>
            <Badge
              variant="outline"
              data-testid="case-study-industry"
              className="text-sm"
            >
              {industry}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {excerpt}
            </p>
          )}

          {/* KPI Preview - Highlighted Results */}
          <div
            data-testid="case-study-kpi"
            className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg"
          >
            <TrendingUp className="w-5 h-5 text-primary shrink-0" />
            <span className="font-semibold text-primary text-sm md:text-base">
              {resultsPreview}
            </span>
          </div>

          {/* Read More Link */}
          <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
            詳しく見る
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
