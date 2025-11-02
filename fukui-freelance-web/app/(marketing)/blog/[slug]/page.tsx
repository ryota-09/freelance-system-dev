import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BlogPostCard from '@/components/features/BlogPostCard';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  author?: string;
  content: React.ReactElement;
}

const allBlogPosts = [
  {
    slug: 'fukui-web-subsidy-guide',
    title: '福井県のWeb制作補助金完全ガイド【2025年版】',
    excerpt:
      '福井県の中小企業・個人事業主が利用できるWeb制作・IT導入に関する補助金制度を徹底解説。申請方法から注意点まで、実務経験をもとにご紹介します。',
    date: '2025-01-15',
    category: '補助金・助成金',
    tags: ['補助金', '助成金', 'IT導入', '小規模事業者'],
  },
  {
    slug: 'local-seo-tips',
    title: '福井の事業者向け地域SEO完全ガイド｜Googleマップ上位表示の秘訣',
    excerpt:
      '福井県でビジネスを展開する事業者のための地域SEO(ローカルSEO)対策を解説。Googleマップでの上位表示を実現し、地元顧客を効果的に集客する方法をご紹介します。',
    date: '2025-01-10',
    category: 'SEO・集客',
    tags: ['SEO', 'Googleマップ', '地域集客', 'Googleビジネスプロフィール'],
  },
  {
    slug: 'reservation-system-benefits',
    title: '予約システム導入で売上40%アップ｜福井の美容室・サロンの成功事例',
    excerpt:
      '電話予約からオンライン予約システムへ。福井県内の美容室・サロンが予約システムを導入して実現した業務効率化と売上アップの実例をご紹介します。',
    date: '2025-01-05',
    category: 'システム開発',
    tags: ['予約システム', '業務効率化', 'DX', '美容室', 'サロン'],
  },
];

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
    const source = await fs.readFile(filePath, 'utf8');

    const { content, frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });

    return {
      slug,
      title: (frontmatter as { title: string }).title,
      excerpt: (frontmatter as { excerpt: string }).excerpt,
      date: (frontmatter as { date: string }).date,
      category: (frontmatter as { category: string }).category,
      tags: (frontmatter as { tags: string[] }).tags || [],
      featured: (frontmatter as { featured?: boolean }).featured,
      author: (frontmatter as { author?: string }).author,
      content,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

function getRelatedPosts(currentSlug: string, currentCategory: string) {
  return allBlogPosts
    .filter((post) => post.slug !== currentSlug && post.category === currentCategory)
    .slice(0, 2);
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'ブログ記事が見つかりませんでした',
    };
  }

  return {
    title: `${post.title} | 福井フリーランスWeb制作`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || '福井フリーランス'],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.category);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            ブログ一覧に戻る
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" data-testid="post-category">
              {post.category}
            </Badge>
            <time
              dateTime={post.date}
              className="text-sm text-gray-200 flex items-center gap-1"
              data-testid="post-date"
            >
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>

          {post.author && (
            <p className="mt-4 text-gray-200">著者: {post.author}</p>
          )}
        </div>
      </section>

      {/* Blog Content */}
      <article
        className="bg-white py-12"
        data-testid="post-content"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-amber max-w-none">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            専門家にサポートを依頼する
          </h2>
          <p className="text-gray-600 mb-6">
            Web制作・システム開発に関するご相談は、お気軽にお問い合わせください。
          </p>
          <Button asChild size="lg">
            <Link href="/contact">無料相談を予約する</Link>
          </Button>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-12" data-testid="related-posts">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">関連記事</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard
                  key={relatedPost.slug}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  date={relatedPost.date}
                  category={relatedPost.category}
                  slug={relatedPost.slug}
                  tags={relatedPost.tags}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
