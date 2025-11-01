import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

// Base directory for content
const contentDirectory = path.join(process.cwd(), 'content');

// Generic function to get all MDX files from a directory
export async function getMDXFiles(directory: string) {
  const fullPath = path.join(contentDirectory, directory);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  return files.filter((file) => file.endsWith('.mdx'));
}

// Generic function to get MDX content with frontmatter
export async function getMDXContent<T = Record<string, unknown>>(
  directory: string,
  slug: string
): Promise<{ frontmatter: T; content: MDXRemoteSerializeResult } | null> {
  try {
    const fullPath = path.join(contentDirectory, directory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const mdxSource = await serialize(content);

    return {
      frontmatter: data as T,
      content: mdxSource,
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${directory}/${slug}.mdx`, error);
    return null;
  }
}

// Service-specific types and functions
export interface ServiceFrontmatter {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  pricingTier: 'standard' | 'premium' | 'enterprise';
  features: string[];
  order?: number;
}

export async function getServices(): Promise<ServiceFrontmatter[]> {
  const files = await getMDXFiles('services');
  const services: ServiceFrontmatter[] = [];

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const result = await getMDXContent<ServiceFrontmatter>('services', slug);

    if (result) {
      services.push({ ...result.frontmatter, slug });
    }
  }

  return services.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getServiceBySlug(slug: string) {
  return getMDXContent<ServiceFrontmatter>('services', slug);
}

// Case Study types and functions
export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  client: string;
  industry: string;
  projectDate: string;
  featured?: boolean;
  excerpt: string;
  servicesUsed: string[];
  results: {
    metric: string;
    value: string;
  }[];
  image?: string;
}

export async function getCaseStudies(): Promise<CaseStudyFrontmatter[]> {
  const files = await getMDXFiles('case-studies');
  const caseStudies: CaseStudyFrontmatter[] = [];

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const result = await getMDXContent<CaseStudyFrontmatter>('case-studies', slug);

    if (result) {
      caseStudies.push({ ...result.frontmatter, slug });
    }
  }

  // Sort by project date, newest first
  return caseStudies.sort((a, b) =>
    new Date(b.projectDate).getTime() - new Date(a.projectDate).getTime()
  );
}

export async function getCaseStudyBySlug(slug: string) {
  return getMDXContent<CaseStudyFrontmatter>('case-studies', slug);
}

export async function getFeaturedCaseStudies(limit = 2): Promise<CaseStudyFrontmatter[]> {
  const allCaseStudies = await getCaseStudies();
  return allCaseStudies.filter((cs) => cs.featured).slice(0, limit);
}

// Blog Post types and functions
export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author?: string;
  image?: string;
}

export async function getBlogPosts(): Promise<BlogPostFrontmatter[]> {
  const files = await getMDXFiles('blog');
  const posts: BlogPostFrontmatter[] = [];

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const result = await getMDXContent<BlogPostFrontmatter>('blog', slug);

    if (result) {
      posts.push({ ...result.frontmatter, slug });
    }
  }

  // Sort by date, newest first
  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPostBySlug(slug: string) {
  return getMDXContent<BlogPostFrontmatter>('blog', slug);
}

// FAQ types and functions
export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  faqs: FAQ[];
}

export interface FAQFrontmatter {
  question: string;
  category: string;
  order?: number;
}

// Load FAQ entries from JSON files
export function getFAQEntries(): FAQCategory[] {
  const faqDirectory = path.join(contentDirectory, 'faq');

  if (!fs.existsSync(faqDirectory)) {
    return [];
  }

  const files = fs.readdirSync(faqDirectory).filter(file => file.endsWith('.json'));
  const faqCategories: FAQCategory[] = [];

  for (const file of files) {
    const filePath = path.join(faqDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents) as FAQCategory;
    faqCategories.push(data);
  }

  // Sort by category name
  return faqCategories.sort((a, b) => a.category.localeCompare(b.category));
}

// For MDX-based FAQs (if needed in the future)
export async function getFAQEntriesMDX(): Promise<Array<FAQFrontmatter & { answer: MDXRemoteSerializeResult; id: string }>> {
  const files = await getMDXFiles('faq');
  const faqs: Array<FAQFrontmatter & { answer: MDXRemoteSerializeResult; id: string }> = [];

  for (const file of files) {
    const id = file.replace('.mdx', '');
    const result = await getMDXContent<FAQFrontmatter>('faq', id);

    if (result) {
      faqs.push({
        ...result.frontmatter,
        answer: result.content,
        id,
      });
    }
  }

  // Sort by category and order
  return faqs.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return (a.order || 0) - (b.order || 0);
  });
}
