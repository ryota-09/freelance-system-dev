# Quickstart Guide: Fukui Freelance Web Development Site

**Project**: Next.js 16 Marketing Website for Fukui-based Freelance Web Development Service
**Target Completion**: 10 weeks (Phase 1 MVP)
**For**: Developers implementing the feature specification

---

## Prerequisites

- Node.js 18+ installed
- npm/pnpm/yarn package manager
- Git for version control
- Vercel account (free tier sufficient for MVP)
- Resend account ($20/month for production emails)
- Basic understanding of Next.js App Router, TypeScript, React

---

## Quick Start (< 5 minutes)

### 1. Initialize Next.js Project

```bash
# Create Next.js 16 project with TypeScript
npx create-next-app@latest fukui-freelance-web --typescript --tailwind --app --src-dir --import-alias "@/*"

cd fukui-freelance-web

# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial Next.js 16 project setup"
```

### 2. Install Core Dependencies

```bash
# Form validation
npm install zod react-hook-form @hookform/resolvers

# Email sending
npm install resend react-email

# MDX for content
npm install next-mdx-remote gray-matter

# Utilities
npm install clsx tailwind-merge date-fns

# Dev dependencies
npm install --save-dev @types/node @types/react @types/react-dom
```

### 3. Configure Environment Variables

Create `.env.local`:

```env
# Resend API Key (get from https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Database (Vercel Postgres - add after Vercel project setup)
# POSTGRES_URL=postgres://...
# POSTGRES_PRISMA_URL=postgres://...

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (add after setup)
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see the default Next.js page.

---

## Project Structure Setup (Week 1)

### Create Directory Structure

```bash
mkdir -p app/{,\(marketing\)/{services,case-studies,pricing,process,faq,blog,about,contact},api/{contact,booking}}
mkdir -p components/{ui,forms,layout,features}
mkdir -p lib
mkdir -p content/{case-studies,blog,faq}
mkdir -p emails
mkdir -p public/images
```

### Configure Tailwind with Japanese Fonts

Edit `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Hiragino Sans",
          "Hiragino Kaku Gothic ProN",
          "Yu Gothic",
          "Meiryo",
          "sans-serif",
        ],
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          dark: "#1e40af",
        },
        secondary: {
          DEFAULT: "#7c3aed",
          dark: "#6d28d9",
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

### Configure Next.js

Edit `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  // MDX support
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

module.exports = nextConfig;
```

---

## Core Implementation (Week 2-4)

### 1. Root Layout with Japanese SEO

Create `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["japanese"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "福井のWeb制作・システム開発 | フリーランス受託サイト",
    template: "%s | 福井のWeb制作・システム開発",
  },
  description:
    "福井県で小規模飲食店・美容室・写真家向けのホームページ制作・予約システム開発。現地訪問可、首都圏品質を福井で。",
  keywords: ["福井", "ホームページ制作", "Web制作", "システム開発", "鯖江", "越前"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yourdomain.com",
    siteName: "福井のWeb制作・システム開発",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Create Zod Validation Schemas

Create `lib/validations.ts`:

```typescript
import { z } from "zod";

export const contactFormSchema = z.object({
  companyName: z.string().min(1, "会社名・屋号は必須です").max(200),
  contactName: z.string().min(1, "お名前は必須です").max(100),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z
    .string()
    .regex(/^[0-9-]+$/, "有効な電話番号を入力してください")
    .max(50),
  location: z.string().min(1, "所在地は必須です").max(100),
  inquiryType: z.enum(["web", "system", "maintenance", "multiple"]),
  projectGoals: z.array(z.string()).min(1, "プロジェクト目的を選択してください"),
  budgetRange: z.enum([
    "under-300k",
    "300k-500k",
    "500k-1m",
    "1m-3m",
    "over-3m",
    "undecided",
  ]),
  desiredTimeline: z.string().min(1, "希望納期を入力してください").max(500),
  referenceSiteUrls: z.array(z.string().url()).max(5).optional(),
  subsidyConsultation: z.boolean(),
  preferredContactMethod: z.enum(["email", "phone", "line"]),
  message: z.string().max(2000).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### 3. Create Email Templates with React Email

Create `emails/ContactFormConfirmation.tsx`:

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactFormConfirmationProps {
  contactName: string;
  companyName: string;
}

export default function ContactFormConfirmation({
  contactName,
  companyName,
}: ContactFormConfirmationProps) {
  return (
    <Html lang="ja">
      <Head />
      <Preview>お問い合わせありがとうございます</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>お問い合わせありがとうございます</Heading>
          <Text style={text}>
            {companyName} {contactName} 様
          </Text>
          <Text style={text}>
            この度は、福井Web制作・システム開発にお問い合わせいただき、誠にありがとうございます。
          </Text>
          <Section style={section}>
            <Text style={text}>
              お問い合わせ内容を確認いたしました。
              <br />
              1営業日以内にご連絡させていただきます。
            </Text>
          </Section>
          <Text style={footer}>
            お急ぎの場合は、お電話でもお気軽にお問い合わせください。
            <br />
            TEL: 0776-XX-XXXX（平日 9:00-18:00）
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "20px 0 48px" };
const h1 = { color: "#333", fontSize: "24px", fontWeight: "bold" };
const text = { color: "#333", fontSize: "16px", lineHeight: "26px" };
const section = { padding: "24px", backgroundColor: "#fff" };
const footer = { color: "#8898aa", fontSize: "14px" };
```

### 4. Implement Contact Form Server Action

Create `app/api/contact/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";
import ContactFormConfirmation from "@/emails/ContactFormConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Send confirmation email to client
    await resend.emails.send({
      from: "contact@yourdomain.com",
      to: [data.email],
      subject: "お問い合わせありがとうございます【福井Web制作】",
      react: ContactFormConfirmation({
        contactName: data.contactName,
        companyName: data.companyName,
      }),
    });

    // TODO: Store inquiry in database
    // TODO: Send notification email to freelancer

    return NextResponse.json({
      success: true,
      inquiryId: crypto.randomUUID(),
      message: "お問い合わせありがとうございます。確認メールをお送りしました。",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "送信中にエラーが発生しました。お手数ですが、お電話でお問い合わせください。",
      },
      { status: 500 }
    );
  }
}
```

### 5. Create Contact Form Component

Create `components/forms/ContactForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult({
          success: true,
          message: result.message,
        });
        reset();
      } else {
        setSubmitResult({
          success: false,
          message: result.message || "送信に失敗しました。",
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "送信中にエラーが発生しました。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium mb-2">
          会社名・屋号 <span className="text-red-600">*</span>
        </label>
        <input
          id="companyName"
          type="text"
          {...register("companyName")}
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.companyName && (
          <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>
        )}
      </div>

      {/* Contact Name */}
      <div>
        <label htmlFor="contactName" className="block text-sm font-medium mb-2">
          お名前 <span className="text-red-600">*</span>
        </label>
        <input
          id="contactName"
          type="text"
          {...register("contactName")}
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.contactName && (
          <p className="text-red-600 text-sm mt-1">{errors.contactName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          メールアドレス <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Add more fields following same pattern... */}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark disabled:opacity-50"
      >
        {isSubmitting ? "送信中..." : "送信する"}
      </button>

      {/* Result Message */}
      {submitResult && (
        <div
          className={`p-4 rounded-md ${
            submitResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {submitResult.message}
        </div>
      )}
    </form>
  );
}
```

---

## Content Management (Week 5-6)

### Create MDX Content Files

Create `content/case-studies/beauty-salon-reservation.mdx`:

```mdx
---
id: "550e8400-e29b-41d4-a716-446655440000"
title: "美容室予約システムで予約40%増加"
slug: "beauty-salon-reservation-system"
clientType: "福井市内の美容室"
industry: "salon"
projectGoals:
  - "予約管理の効率化"
  - "無断キャンセル削減"
  - "顧客データ分析"
measurableResults:
  - metric: "予約数"
    beforeValue: "月10件"
    afterValue: "月14件"
    percentageChange: 40
    timeframe: "3ヶ月後"
  - metric: "無断キャンセル率"
    beforeValue: "15%"
    afterValue: "5%"
    percentageChange: -67
    timeframe: "導入後"
projectDuration:
  weeks: 3
budgetRange:
  min: 300000
  max: 500000
  displayText: "30万円〜50万円"
servicesUsed: ["system-kaihatsu"]
featured: true
publishedAt: "2025-10-15"
---

## 課題

福井市内で人気の美容室。電話予約のみで対応していたが、営業時間外の予約希望や無断キャンセルが課題だった。

## 解決策

24時間予約可能なオンライン予約システムを導入。SMS自動リマインダー機能で無断キャンセルを削減。

## 結果

導入3ヶ月で予約数が40%増加。無断キャンセルは15%から5%に大幅減少。スタッフの電話対応時間も50%削減され、接客に集中できるように。
```

### Create MDX Utility Functions

Create `lib/mdx.ts`:

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const contentDirectory = path.join(process.cwd(), "content");

export async function getCaseStudies() {
  const caseStudiesPath = path.join(contentDirectory, "case-studies");
  const files = fs.readdirSync(caseStudiesPath);

  const caseStudies = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(caseStudiesPath, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        return {
          ...data,
          content,
          slug: data.slug || file.replace(".mdx", ""),
        };
      })
  );

  return caseStudies.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getCaseStudyBySlug(slug: string) {
  const filePath = path.join(contentDirectory, "case-studies", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const mdxSource = await serialize(content);

  return {
    ...data,
    content: mdxSource,
  };
}
```

---

## SEO Optimization (Week 7)

### Add Structured Data

Create `components/JsonLd.tsx`:

```tsx
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "福井Web制作・システム開発",
    description: "福井県のフリーランスWeb制作・システム開発サービス",
    address: {
      "@type": "PostalAddress",
      addressRegion: "福井県",
      addressLocality: "福井市",
      postalCode: "910-XXXX",
    },
    areaServed: [
      { "@type": "City", name: "福井市" },
      { "@type": "City", name: "鯖江市" },
      { "@type": "City", name: "越前市" },
      { "@type": "City", name: "敦賀市" },
      { "@type": "City", name: "坂井市" },
      { "@type": "City", name": "小浜市" },
      { "@type": "City", name: "あわら市" },
      { "@type": "City", name": "勝山市" },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.0652",
      longitude: "136.2217",
    },
    telephone: "+81-XXX-XXXX",
    url: "https://yourdomain.com",
    priceRange: "¥¥",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Generate Sitemap

Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getCaseStudies();

  const caseStudyUrls = caseStudies.map((study) => ({
    url: `https://yourdomain.com/case-studies/${study.slug}`,
    lastModified: new Date(study.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://yourdomain.com/services",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...caseStudyUrls,
  ];
}
```

---

## Deployment (Week 8)

### 1. Connect to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel --prod
```

### 2. Configure Vercel Environment Variables

In Vercel dashboard:
- Add `RESEND_API_KEY`
- Add `POSTGRES_URL` (if using Vercel Postgres)
- Add `NEXT_PUBLIC_SITE_URL`

### 3. Set Up Custom Domain

1. Go to Vercel project settings
2. Add custom domain
3. Update DNS records as instructed
4. SSL automatically provisioned

---

## Testing & Analytics (Week 9-10)

### Add Plausible Analytics

Edit `app/layout.tsx`:

```tsx
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <Script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Run Lighthouse Audit

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=http://localhost:3000
```

Target scores:
- Performance: >90
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## Common Issues & Solutions

### Issue: Resend emails not sending
**Solution**: Verify domain in Resend dashboard, check API key in `.env.local`

### Issue: MDX files not found
**Solution**: Ensure `content/` directory exists, check file paths in `lib/mdx.ts`

### Issue: Images not optimizing
**Solution**: Install `sharp` package: `npm install sharp`

### Issue: Tailwind styles not applying
**Solution**: Check `content` paths in `tailwind.config.ts` include all component directories

### Issue: Form validation errors not showing
**Solution**: Verify Zod schema matches form fields, check error message rendering logic

---

## Next Steps

1. **Week 1-2**: Complete foundation setup (structure, dependencies, configuration)
2. **Week 3-4**: Implement core features (homepage, contact form, booking)
3. **Week 5-6**: Add content (case studies, blog, FAQ)
4. **Week 7-8**: Optimize (SEO, performance, accessibility)
5. **Week 9-10**: Test, deploy, integrate analytics

**Phase 2**: See `tasks.md` for detailed task breakdown (generated by `/speckit.tasks` command)

---

## Resources

- **Next.js 16 Docs**: https://nextjs.org/docs
- **Resend Docs**: https://resend.com/docs
- **React Email**: https://react.email
- **Zod Docs**: https://zod.dev
- **TailwindCSS**: https://tailwindcss.com/docs
- **Project Spec**: `/specs/001-web/spec.md`
- **Data Model**: `/specs/001-web/data-model.md`
- **API Contracts**: `/specs/001-web/contracts/`
