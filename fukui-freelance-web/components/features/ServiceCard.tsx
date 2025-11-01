import { Link } from 'next-view-transitions';
import { Globe, Code2, Shield, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  features?: string[];
  pricingTier?: string;
}

/**
 * ServiceCard Component
 * Displays individual service offering with icon, description, and CTA
 * Design reference: designs/ホーム_-_特化型デザイン_2/
 */
export function ServiceCard({
  title,
  slug,
  description,
  icon,
  features,
  pricingTier,
}: ServiceCardProps) {
  // Icon mapping for service types
  const iconMap: Record<string, typeof Globe> = {
    globe: Globe,
    code: Code2,
    shield: Shield,
  };
  const IconComponent = icon ? iconMap[icon] || Package : Package;

  // Pricing tier badges
  const tierLabel = {
    standard: '標準',
    premium: 'プレミアム',
    enterprise: 'エンタープライズ',
  }[pricingTier || 'standard'];

  return (
    <Card data-testid="service-card" className="flex h-full flex-col border-2 border-gray-200 transition-all hover:border-brand-500 hover:shadow-lg">
      <CardHeader>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
            <IconComponent className="h-6 w-6" />
          </div>
          {pricingTier && (
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
              {tierLabel}
            </span>
          )}
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
        <CardDescription className="mt-2 text-base text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.slice(0, 5).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1 text-brand-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
            <Link href={`/services/${slug}`}>
              詳しく見る
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
