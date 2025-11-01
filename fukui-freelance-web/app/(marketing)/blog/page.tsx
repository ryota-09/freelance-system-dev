'use client';

import { useState, useEffect } from 'react';
import BlogPostCard from '@/components/features/BlogPostCard';
import { Button } from '@/components/ui/button';

/**
 * Blog Page
 * Lists all blog posts with category filtering
 */

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
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

const categories = [
  'すべて',
  '補助金・助成金',
  'SEO・集客',
  'システム開発',
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    if (selectedCategory === 'すべて') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(
        blogPosts.filter((post) => post.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

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
          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                data-testid="category-filter"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                slug={post.slug}
                tags={post.tags}
              />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                該当するブログ記事が見つかりませんでした。
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
