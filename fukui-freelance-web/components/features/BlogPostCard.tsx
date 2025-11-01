import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  tags?: string[];
}

export default function BlogPostCard({
  title,
  excerpt,
  date,
  category,
  slug,
  tags = [],
}: BlogPostCardProps) {
  // Format date to Japanese format
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  return (
    <Card
      className="h-full transition-all hover:shadow-lg hover:-translate-y-1"
      data-testid="blog-card"
    >
      <Link href={`/blog/${slug}`} className="block h-full">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" data-testid="blog-category">
              {category}
            </Badge>
            <time
              dateTime={date}
              className="text-sm text-muted-foreground flex items-center gap-1"
              data-testid="blog-date"
            >
              <Calendar className="h-3 w-3" />
              {formatDate(date)}
            </time>
          </div>
          <h3
            className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors"
            data-testid="blog-title"
          >
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p
            className="text-muted-foreground line-clamp-3"
            data-testid="blog-excerpt"
          >
            {excerpt}
          </p>
        </CardContent>
        {tags.length > 0 && (
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs"
                  data-testid="blog-tag"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Link>
    </Card>
  );
}
