# Technical Research & Decisions: Fukui Freelance Web Development Site

**Project**: Fukui-based Freelance Web Development Marketing Website
**Target**: Small businesses in Fukui Prefecture (restaurants, salons, photographers)
**Research Date**: October 2025
**Framework**: Next.js 16 App Router

---

## 1. Next.js 16 App Router Best Practices

### Decision
Use **Next.js 16 App Router** with standard configuration (NOT enabling experimental `cacheComponents` mode).

### Rationale
- **Native App Router maturity**: Next.js 16 represents the stable evolution of App Router introduced in v13, with refined Server Components, streaming, and incremental rendering
- **SEO advantages**: Server-side rendering (SSR) and static site generation (SSG) provide excellent SEO performance critical for local search visibility in Fukui market
- **Performance optimization**: Automatic code splitting, route-based prefetching, and Image optimization built-in support Core Web Vitals requirements
- **Developer experience**: TypeScript-first, intuitive file-system routing, and colocation of components with routes
- **Production readiness**: Vercel's official framework with extensive documentation and enterprise adoption

### Alternatives Considered
- **Next.js 15 with Pages Router**: Rejected because App Router provides superior data fetching patterns, nested layouts, and streaming capabilities essential for modern UX
- **Remix**: Rejected due to smaller ecosystem, less mature Japanese documentation, and reduced Vercel optimization
- **Astro**: Rejected because while excellent for content-heavy sites, it lacks the Server Actions and form handling needed for lead generation features
- **Gatsby**: Rejected due to build-time complexity, slower rebuild times, and reduced focus on dynamic features

### Implementation Notes
- **DO NOT enable** `experimental.cacheComponents: true` - this is for advanced PPR scenarios and introduces significant complexity with segment config restrictions
- Use standard Next.js 16 features: Server Components by default, Client Components only when needed for interactivity
- **Async params/searchParams**: Next.js 15+ requires awaiting `params` and `searchParams` - ensure TypeScript types reflect this
- Leverage `generateMetadata()` for dynamic SEO without segment config conflicts
- Use Suspense boundaries strategically for streaming loading states
- Implement proper error boundaries with `error.tsx` files per route segment
- Use Server Actions for form submissions (more secure than API routes for this use case)

---

## 2. Email Service Selection

### Decision
**Resend** for transactional emails (contact form, consultation booking confirmations).

### Rationale
- **Developer experience**: Created by same team behind React Email, seamless Next.js integration with one API call
- **React Email integration**: Native support for React Email templates, enabling type-safe, component-based email design
- **Reliability**: Modern infrastructure with 99.9% uptime SLA
- **Pricing**: $20/month for 50,000 emails (more than sufficient for 5-10 inquiries/month target), free tier available for development
- **API simplicity**: Clean REST API, webhook support for delivery tracking, minimal configuration
- **Japanese market**: Works globally with UTF-8 support for Japanese content

### Alternatives Considered
- **SendGrid**: Rejected due to Microsoft email spam folder issues, slower support, and bloated UI for simple transactional needs
- **AWS SES**: Rejected despite $0.10/1000 emails pricing because it requires significant technical setup, lacks logging/UI, and provides minimal developer experience improvements
- **Mailgun**: Rejected due to similar complexity to AWS SES without the ecosystem benefits

### Implementation Notes
- Install `resend` npm package and `react-email` for template creation
- Create email templates in `emails/` directory using React components:
  - `ContactFormConfirmation.tsx` - auto-reply for contact form
  - `ContactFormNotification.tsx` - internal notification to freelancer
  - `BookingConfirmation.tsx` - consultation booking confirmation
- Store Resend API key in environment variables (`RESEND_API_KEY`)
- Implement Server Action in `app/api/contact/route.ts` to send emails
- Add error handling and fallback for email delivery failures
- Approval timeline: Resend domain verification takes 1-2 business days (plan accordingly)

---

## 3. Form Validation Approach

### Decision
**Zod schemas + Server Actions** for all form validation (contact form, consultation booking).

### Rationale
- **Type safety**: Zod provides runtime validation with automatic TypeScript type inference
- **Shared schemas**: Same Zod schema can validate on both client (progressive enhancement) and server (security enforcement)
- **Server Actions integration**: Next.js 16 Server Actions provide built-in CSRF protection and secure form handling without API routes
- **Error handling**: Zod's `safeParse()` returns structured errors perfect for field-level error messages
- **Bundle size**: Lightweight library (~14kb gzipped) compared to alternatives

### Alternatives Considered
- **React Hook Form alone**: Rejected because client-side validation is insufficient for security, requires separate server validation
- **Yup**: Rejected because Zod has better TypeScript integration and smaller bundle size
- **Joi**: Rejected because it's backend-focused with poor client-side bundle optimization
- **Manual validation**: Rejected due to error-prone implementation and maintenance burden

### Implementation Notes
- Create shared Zod schemas in `lib/validations.ts`
- Use `useActionState()` hook (formerly `useFormState`) to handle Server Action responses
- Return validation errors from Server Actions with structured format
- Display field-level errors in form components for granular user feedback
- Implement progressive enhancement: form works without JavaScript, enhanced with client-side feedback
- Validate on server using `safeParse()` before processing (never trust client validation)

---

## 4. Content Management

### Decision
**MDX files** for case studies and blog posts (not a Headless CMS for MVP).

### Rationale
- **Zero cost**: File-based content eliminates CMS subscription costs (~$0-300/month saved)
- **Version control**: Git-tracked content with full history, branching, and rollback capabilities
- **Developer workflow**: Freelancer can edit Markdown files directly, no CMS interface to learn
- **Performance**: No database queries or API calls, content bundled at build time for instant loading
- **Flexibility**: MDX allows embedding React components in content (interactive demos, custom layouts)
- **Simplicity**: No CMS account, API keys, webhooks, or database to manage for MVP

### Alternatives Considered
- **microCMS**: Rejected for MVP despite being Japanese-focused because it adds $0-99/month cost, requires API integration, and adds complexity unnecessary for 10-20 case studies. Consider for v2 if non-technical editor needed
- **Contentful**: Rejected due to $300/month cost for Team plan, overkill for simple case study/blog content
- **Sanity**: Rejected despite excellent Next.js integration because free tier limits wouldn't scale beyond MVP, and Studio setup adds development time
- **WordPress headless**: Rejected due to WordPress maintenance overhead and security concerns

### Implementation Notes
- Use `next-mdx-remote` or `@next/mdx` for MDX parsing
- Store content in `content/` directory with frontmatter metadata
- Create utility functions in `lib/mdx.ts` to read/parse MDX files at build time
- Use `generateStaticParams()` for case study and blog post routes to pre-render all content
- Implement search/filtering using client-side filtering of pre-fetched metadata

---

## 5. Styling Approach

### Decision
**TailwindCSS** with component-based utilities.

### Rationale
- **Performance**: Build-time CSS generation, no runtime JavaScript, ~50kb smaller bundle vs CSS Modules in Next.js
- **Development speed**: Utility-first approach enables rapid prototyping without context switching to separate CSS files
- **Consistency**: Design tokens (spacing, colors, typography) enforced through Tailwind config reduces design inconsistencies
- **Mobile-first**: Built-in responsive modifiers (`sm:`, `md:`, `lg:`) simplify mobile-first design required for target audience
- **Tree-shaking**: Purge unused CSS automatically, only ship styles actually used on pages
- **Community**: Extensive plugin ecosystem, Headless UI components for accessibility

### Alternatives Considered
- **CSS Modules**: Rejected because they create additional HTTP requests for client-side routing in Next.js, and require separate .module.css files that slow development
- **styled-components**: Rejected due to runtime CSS-in-JS overhead (increases TTI by ~300ms), larger JavaScript bundle, and reduced Core Web Vitals scores
- **Vanilla CSS**: Rejected due to lack of scoping, higher risk of naming collisions, and manual responsive design management

### Implementation Notes
- Install `tailwindcss`, `postcss`, `autoprefixer`
- Configure Tailwind with Japanese font stack and brand colors
- Use `@apply` directive sparingly, prefer inline utilities for better tree-shaking
- Create reusable component variants using `clsx` or `cva` for button states, card styles
- Implement design system with consistent spacing scale (4px base unit)

---

## 6. Deployment Platform

### Decision
**Vercel** (Hobby plan free tier initially, Pro plan $20/month when needed).

### Rationale
- **Next.js optimization**: Built by Vercel team, guaranteed compatibility with Next.js 16 features
- **Zero configuration**: Push to GitHub, automatic deployments, no DevOps setup
- **Performance**: Edge Network with 100+ global locations, optimized for Japanese users via Asia-Pacific edge nodes
- **Developer experience**: Preview deployments per PR, instant rollbacks, built-in analytics
- **Cost**: Free Hobby tier covers MVP (100GB bandwidth, 100 builds/month), Pro $20/month scales to 1TB bandwidth
- **Serverless functions**: Included for API routes (contact form, booking), no separate backend needed

### Alternatives Considered
- **Cloudflare Pages**: Rejected despite better pricing ($0 for unlimited bandwidth) because Node.js incompatibilities require Cloudflare Workers runtime, adding development complexity for Server Actions
- **Netlify**: Rejected due to 300 build minutes/month (vs Vercel's 6,000), limited form submissions (100/month), and slower build times for Next.js
- **AWS Amplify**: Rejected due to more complex setup, less optimized Next.js support, and higher operational overhead
- **Self-hosted VPS**: Rejected due to security maintenance burden, no automatic SSL, and manual scaling

### Implementation Notes
- Connect GitHub repository to Vercel project
- Configure environment variables in Vercel dashboard (`RESEND_API_KEY`, etc.)
- Set up custom domain with Vercel DNS (free SSL included)
- Use Vercel Analytics (free tier) for basic traffic monitoring
- Enable Automatic Preview Deployments for PR reviews

---

## 7. Analytics & Conversion Tracking

### Decision
**Plausible Analytics** ($9/month) for privacy-focused analytics + **Google Tag Manager** for Meta Pixel conversion tracking.

### Rationale
- **Privacy compliance**: Plausible is cookie-free, GDPR/CCPA compliant (important for Japanese market APPI compliance), no consent banner needed
- **Accuracy**: Google Analytics blocked by 40-60% of tech-savvy users; Plausible has 98%+ collection rate
- **Simplicity**: Single dashboard with key metrics (pageviews, traffic sources, goal conversions), no training required
- **Lead generation focus**: Track form submissions, consultation bookings, phone clicks as custom goals
- **Conversion tracking**: GTM manages Meta Pixel for Facebook ads (future marketing channel) without code changes
- **Lightweight**: Plausible script <1kb (vs GA4 45kb), minimal performance impact on Core Web Vitals

### Alternatives Considered
- **Google Analytics 4**: Rejected due to 55.6% accuracy with consent banners, complex interface overwhelming for freelancer, and cookie-based tracking requiring privacy notices
- **Vercel Analytics alone**: Rejected because it lacks marketing attribution (referral sources, campaigns) and conversion tracking
- **Matomo**: Rejected due to self-hosting overhead or €19/month cost higher than Plausible

### Implementation Notes
- Add Plausible script to root layout with custom goals configured
- Install GTM container in root layout for Meta Pixel tracking
- Track custom events (phone clicks, form submissions, booking completions)
- Monitor key metrics: conversion rate, traffic sources, form abandonment

---

## 8. SEO Optimization for Local Japanese Market

### Decision
Implement **comprehensive local SEO** with structured data, Japanese language optimization, and Fukui-specific keywords.

### Rationale
- **Local intent**: Target audience searches "福井 ホームページ制作" (Fukui web design), not generic national terms
- **Low competition**: Regional keywords have lower competition than Tokyo/Osaka, faster ranking potential
- **Structured data advantage**: LocalBusiness schema improves visibility in Google Maps, local pack results
- **Mobile-first indexing**: Google prioritizes mobile-optimized sites, essential for smartphone-dominant Japan market
- **Next.js SEO benefits**: Server-side rendering provides fully crawlable HTML, no client-side rendering SEO issues

### Alternatives Considered
- **National SEO strategy**: Rejected because competing with Tokyo agencies on "ホームページ制作" requires massive budget/backlinks
- **Paid ads only**: Rejected because organic SEO provides long-term ROI, paid ads stop when budget ends
- **Third-party SEO tools (Ahrefs, SEMrush)**: Deferred until post-launch; use free Google Search Console initially

### Implementation Notes
- Implement Metadata API for all pages with Fukui-specific keywords
- Add LocalBusiness JSON-LD structured data with service areas
- Use Japanese slugs for better local SEO
- Optimize content with location keywords, proper heading hierarchy
- Generate `sitemap.xml` and `robots.txt`
- Submit to Google Business Profile and local Japanese directories
- Target keywords: 福井 ホームページ制作, 鯖江 ホームページ制作, 福井 予約システム

---

## 9. Performance Optimization for Mobile-First Experience

### Decision
Implement **aggressive mobile-first optimization** targeting Core Web Vitals passing scores (LCP <2.5s, FID <100ms, CLS <0.1).

### Rationale
- **Mobile dominance**: 70%+ Japanese internet users browse on smartphones, mobile performance directly impacts conversions
- **Google ranking factor**: Core Web Vitals are confirmed ranking signals, poor scores reduce search visibility
- **User expectations**: Mobile users abandon sites loading >3 seconds (53% bounce rate at 3s)
- **Next.js advantages**: Built-in Image optimization, automatic code splitting, and streaming provide foundation for excellent scores
- **Competition differentiation**: Many regional agencies have poor mobile performance, this is a competitive advantage

### Alternatives Considered
- **Desktop-first approach**: Rejected because mobile traffic dominates, desktop optimization is secondary
- **Manual image optimization**: Rejected because Next.js Image component automates WebP/AVIF conversion and responsive sizing
- **CDN for static assets**: Rejected because Vercel Edge Network already provides global CDN

### Implementation Notes
- Use Next.js Image component with `priority` for LCP images
- Configure `sharp` for production image processing
- Optimize fonts with `next/font` and `font-display: swap`
- Implement code splitting with `dynamic()` for heavy components
- Minimize layout shift with proper image dimensions and aspect ratios
- Reduce JavaScript bundle size, analyze with `@next/bundle-analyzer`
- Load third-party scripts asynchronously with `strategy="afterInteractive"`
- Test with Lighthouse CI, WebPageTest, Chrome DevTools

---

## 10. Accessibility (WCAG AA) Implementation

### Decision
Implement **WCAG 2.1 Level AA compliance** throughout the site with automated testing and manual verification.

### Rationale
- **Legal requirement**: Japanese law increasingly requires digital accessibility (based on WCAG 2.1 AA)
- **SEO benefit**: Semantic HTML improves search engine crawlability, proper headings enhance content structure signals
- **Broader audience**: Accessible design benefits elderly users (growing demographic in Fukui), low-vision users, keyboard-only navigation
- **Next.js advantages**: Server-side rendering provides semantic HTML foundation, React's JSX enforces proper nesting
- **Conversion impact**: Accessible forms have higher completion rates (clearer labels, error messages)

### Alternatives Considered
- **No accessibility focus**: Rejected due to legal risk, SEO disadvantage, and ethical concerns
- **WCAG AAA level**: Rejected because AAA is aspirational, not legally required; AA provides excellent baseline
- **Manual testing only**: Rejected because automated tools catch 30-40% of issues efficiently

### Implementation Notes
- Use semantic HTML structure (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Ensure color contrast meets 4.5:1 minimum for normal text
- Implement keyboard navigation for all interactive elements
- Add proper form labels with `htmlFor`/`id` associations
- Use descriptive alt text for all images
- Implement ARIA attributes sparingly (only when semantic HTML insufficient)
- Ensure touch targets are minimum 44x44px on mobile
- Test with axe DevTools, Lighthouse accessibility audit, and screen readers
- Configure ESLint with `eslint-plugin-jsx-a11y`

---

## Summary Matrix: Technical Stack

| Area | Decision | Cost | Complexity | Phase 1 Priority |
|------|----------|------|------------|------------------|
| **Framework** | Next.js 16 App Router | Free | Medium | P0 (Foundation) |
| **Email** | Resend + React Email | $20/mo | Low | P1 (Core feature) |
| **Validation** | Zod + Server Actions | Free | Low | P1 (Security) |
| **Content** | MDX Files | Free | Low | P1 (MVP content) |
| **Styling** | TailwindCSS | Free | Low | P0 (Foundation) |
| **Deployment** | Vercel (Hobby→Pro) | $0-20/mo | Low | P0 (Infrastructure) |
| **Analytics** | Plausible + GTM | $9/mo | Low | P2 (Post-launch) |
| **SEO** | Next.js Metadata + Schema | Free | Medium | P1 (Discovery) |
| **Performance** | Next.js Image + Optimization | Free | Medium | P1 (UX/SEO) |
| **Accessibility** | WCAG AA + Testing Tools | Free | Medium | P1 (Legal/SEO) |

**Total Recurring Cost**: $29/month (Resend $20 + Plausible $9)
**One-time Development Cost**: Optimization primarily time investment, minimal tooling costs

---

## Risk Assessment

### High Risk (Mitigate in Phase 1)
- **Email deliverability**: Resend domain approval takes 1-2 days → Plan ahead, use development mode initially
- **SEO timeline**: 6+ months for ranking → Start SEO immediately, don't defer metadata
- **Mobile performance**: Easy to miss CLS issues → Test on real devices early and often

### Medium Risk (Monitor)
- **MDX scalability**: 20+ case studies may need CMS → Re-evaluate at 15 case studies, migration path exists
- **Vercel costs**: Free tier limits (100GB bandwidth) → Monitor usage, upgrade to Pro if needed ($20/mo)
- **Form spam**: Contact forms attract spam → Implement Turnstile/hCaptcha if needed (deferred to post-launch)

### Low Risk (Acceptable)
- **Third-party dependencies**: Stable ecosystem (Next.js, Tailwind, Resend) → Low churn risk
- **Browser compatibility**: Next.js supports modern browsers → Acceptable tradeoff (no IE11 support needed)

---

## Phase 1 Implementation Checklist

**Foundation (Week 1-2)**:
- [ ] Initialize Next.js 16 project with TypeScript
- [ ] Configure TailwindCSS with Japanese fonts
- [ ] Set up Vercel project and preview deployments
- [ ] Configure environment variables (RESEND_API_KEY)

**Core Features (Week 3-4)**:
- [ ] Implement homepage with hero section, services overview
- [ ] Build contact form with Zod validation + Server Actions
- [ ] Integrate Resend email sending with React Email templates
- [ ] Create consultation booking flow

**Content & SEO (Week 5-6)**:
- [ ] Set up MDX for case studies (minimum 2) and blog
- [ ] Implement metadata API for all pages
- [ ] Add LocalBusiness structured data
- [ ] Generate sitemap.xml and robots.txt

**Optimization (Week 7-8)**:
- [ ] Optimize images with Next.js Image component
- [ ] Implement font optimization with next/font
- [ ] Run Lighthouse audits, fix Core Web Vitals issues
- [ ] Accessibility audit with axe DevTools, fix violations

**Analytics & Launch (Week 9-10)**:
- [ ] Integrate Plausible Analytics
- [ ] Set up Google Tag Manager + Meta Pixel
- [ ] Configure custom goals (form submissions, bookings)
- [ ] Final testing, deploy to production
