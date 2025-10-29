# Next.js 16 Best Practices Review

**Review Date**: 2025-10-29
**Project**: Fukui Freelance Web Development Site
**Reviewer**: next-devtools MCP

## ✅ Architecture Compliance

### Static Generation Strategy
- **Configuration**: `output: 'export'` ✅
- **Rationale**: Marketing site with no dynamic content, perfect for static generation
- **Implementation**: Tasks T005, T028, T029, T030, T091
- **Note**: We are NOT using Cache Components mode, so `export const dynamic = 'force-static'` is correct

### Validation Library: Valibot
- **Choice**: Valibot instead of Zod ✅
- **Benefits**:
  - Smaller bundle size (tree-shakeable)
  - Better TypeScript inference
  - Modern composable API
- **Implementation**: Tasks T002, T012, T051, T052, T053, T054

### Component Library: shadcn/ui
- **Choice**: shadcn/ui + TailwindCSS ✅
- **Benefits**:
  - Full ownership of components
  - Built on Radix UI (accessible)
  - Customizable via Tailwind
- **Implementation**: Tasks T004, T010, T053, T054

## ✅ Next.js 16 Best Practices

### 1. App Router Structure
```
app/
  (marketing)/          ✅ Route groups for layout
    page.tsx           ✅ Server Components by default
    services/
      page.tsx
    case-studies/
      [slug]/
        page.tsx       ✅ Dynamic routes with generateStaticParams
  layout.tsx           ✅ Root layout
```

### 2. Async Route Parameters (Next.js 15+)
```typescript
// ✅ CORRECT: Await params and searchParams
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ q: string }>
}) {
  const { slug } = await params
  const { q } = await searchParams
  return <div>{slug} - {q}</div>
}
```

### 3. Static Generation with generateStaticParams
```typescript
// ✅ CORRECT: Static generation for dynamic routes
export async function generateStaticParams() {
  const studies = await getCaseStudies()
  return studies.map((study) => ({
    slug: study.slug,
  }))
}

export const dynamic = 'force-static'  // ✅ Valid (no Cache Components)
```

### 4. Metadata API
```typescript
// ✅ CORRECT: Async generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudy(slug)

  return {
    title: study.title,
    description: study.excerpt,
    openGraph: {
      title: study.title,
      description: study.excerpt,
      locale: 'ja_JP',  // ✅ Japanese locale
    },
  }
}
```

### 5. Server Components vs Client Components
```typescript
// ✅ Server Component (default) - data fetching
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// ✅ Client Component - interactivity
'use client'
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  return <form>...</form>
}
```

### 6. Form Handling with Server Actions
```typescript
// ✅ Server Action in separate file
'use server'

import * as v from 'valibot'

export async function submitContact(formData: FormData) {
  const data = Object.fromEntries(formData)
  const result = v.safeParse(contactSchema, data)

  if (!result.success) {
    return { success: false, errors: result.issues }
  }

  // Send email via Resend
  await sendEmail(result.output)
  return { success: true }
}
```

### 7. Image Optimization (Static Export)
```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,  // ✅ Required for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  trailingSlash: true,  // ✅ Static hosting compatibility
}
```

### 8. Japanese SEO & Accessibility
```typescript
// ✅ Root layout with Japanese metadata
export const metadata: Metadata = {
  title: '福井のフリーランスWeb制作',
  description: '...',
  openGraph: {
    locale: 'ja_JP',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        {children}
      </body>
    </html>
  )
}
```

## 🚨 Common Pitfalls to Avoid

### ❌ Cache Components Mistakes (NOT applicable to this project)
We are NOT using `experimental.cacheComponents: true`, so these restrictions don't apply:
- `export const dynamic = 'force-static'` ✅ OK for us
- `export const revalidate = 60` ✅ OK for us (if needed)
- `loading.tsx` files ✅ OK for us

### ❌ Static Export Limitations
Be aware of these when using `output: 'export'`:
- No Server Actions in production (use API routes instead)
- No dynamic API routes
- No ISR (Incremental Static Regeneration)
- No image optimization at runtime

### ✅ Solution for This Project
Since this is a marketing site with forms:
1. Forms submit to external services (Resend API directly)
2. All pages are fully static
3. No database or server-side logic needed at runtime

## 📋 Implementation Checklist

### Configuration
- [x] Next.js 16 with App Router
- [x] TypeScript strict mode
- [x] Static export (`output: 'export'`)
- [x] Valibot validation
- [x] shadcn/ui components
- [x] Japanese fonts (Noto Sans JP, Hiragino Sans)
- [x] llms.txt for AI context

### Architecture
- [x] Server Components by default
- [x] Client Components only where needed
- [x] Static generation with generateStaticParams
- [x] Async params/searchParams handling
- [x] Proper metadata API usage

### Testing
- [x] Playwright E2E tests
- [x] Chrome DevTools MCP for execution
- [x] TDD workflow (tests before implementation)

### Accessibility
- [x] WCAG AA compliance
- [x] Touch targets ≥44px
- [x] Keyboard navigation
- [x] Screen reader support

### Performance
- [x] Static generation for fast loads
- [x] Image optimization config
- [x] Mobile-first responsive design
- [x] Minimal client-side JavaScript

## 🎯 Deployment Strategy

### Build Output
```bash
npm run build
# Generates: out/ directory with static HTML/CSS/JS
```

### Hosting Options
1. **Vercel** (recommended)
   - Automatic deployment from Git
   - CDN distribution
   - Zero configuration

2. **Netlify**
   - Drag & drop out/ folder
   - CDN distribution

3. **GitHub Pages**
   - Push out/ to gh-pages branch
   - Free hosting

### Post-Build Verification
- [ ] All routes accessible (no 404s)
- [ ] Forms work correctly
- [ ] Images load properly
- [ ] SEO meta tags present
- [ ] Japanese fonts render correctly

## 📝 Recommendations

### Immediate
1. ✅ All tech stack updates applied
2. ✅ Static generation configured
3. ✅ Valibot validation ready
4. ✅ shadcn/ui components ready
5. ✅ llms.txt created

### During Implementation
1. Follow TDD workflow strictly (E2E tests first)
2. Test forms with Resend API in development
3. Verify static export works after each major feature
4. Test on real mobile devices
5. Japanese commit messages after each task

### Before Launch
1. Performance audit (Lighthouse)
2. Accessibility audit (axe DevTools)
3. Cross-browser testing
4. Mobile device testing
5. SEO verification

## ✅ Conclusion

The implementation plan follows Next.js 16 best practices:

1. **Static Generation**: Correct configuration for marketing site
2. **Modern Validation**: Valibot for smaller bundles
3. **Component Library**: shadcn/ui for customizable, accessible components
4. **Async APIs**: Proper handling of params/searchParams
5. **Japanese Support**: Fonts, locale, SEO configured
6. **Testing Strategy**: TDD with Playwright + Chrome DevTools MCP
7. **Accessibility**: WCAG AA compliance built-in

**Status**: ✅ Ready for implementation

**Next Step**: Begin Phase 1 (Setup) tasks T001-T008a
