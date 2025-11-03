import { Metadata } from 'next';
import BlogListingClient from './BlogListingClient';

export const metadata: Metadata = {
  title: 'ブログ | 福井フリーランスWeb制作',
  description: 'Web制作やシステム開発に関する情報をお届けします。',
};

/**
 * Blog Page
 * Lists all blog posts with category filtering
 */

export default function BlogPage() {
  return <BlogListingClient />;
}
