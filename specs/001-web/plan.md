# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Fukui Freelance Web Design & System Development business site - a marketing and lead generation website for a freelance web/system development service targeting small businesses in Fukui Prefecture. The site must showcase services, case studies, and facilitate inquiry conversions through multiple touchpoints (contact form, consultation booking, phone). Built with Next.js 16 following App Router best practices with focus on SEO, mobile-first design, and conversion optimization.

## Technical Context

**Language/Version**: TypeScript 5.x + Next.js 16.x (latest stable with App Router)
**Primary Dependencies**: Next.js 16, React 19, TailwindCSS (or CSS Modules), Resend (email delivery), Zod (form validation)
**Storage**: File-based CMS (MDX for blog/case studies), Vercel KV or PostgreSQL for form submissions
**Testing**: Vitest (unit), Playwright (E2E), React Testing Library
**Target Platform**: Vercel (deployment), modern browsers (Chrome, Safari, Firefox), mobile-first responsive
**Project Type**: web (frontend-focused with API routes for forms)
**Performance Goals**: Core Web Vitals passing (LCP <2.5s, FID <100ms, CLS <0.1), Lighthouse score >90
**Constraints**: <3s page load on 4G, <4s on 3G, mobile touch targets ≥44px, WCAG AA compliance
**Scale/Scope**: 10-15 pages, 10-20 case studies over time, <1000 visitors/month initially, 5-10 inquiries/month target

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS - Constitution template is empty/unconfigured for this project. No organizational constraints to validate. Proceeding with industry best practices for Next.js 16 App Router development.

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
app/                          # Next.js 16 App Router
├── (marketing)/             # Route group for main site
│   ├── page.tsx            # Homepage
│   ├── services/           # Service pages
│   ├── case-studies/       # Case study listing & detail
│   ├── pricing/            # Pricing/plans
│   ├── process/            # Project flow
│   ├── faq/                # FAQ
│   ├── blog/               # Blog listing & posts
│   ├── about/              # Company profile
│   └── contact/            # Contact form & booking
├── api/                     # API routes
│   ├── contact/            # Form submission endpoint
│   ├── booking/            # Consultation booking endpoint
│   └── resend/             # Email sending webhook
├── layout.tsx              # Root layout
├── not-found.tsx           # 404 page
└── globals.css             # Global styles

components/
├── ui/                      # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── ...
├── forms/                   # Form components
│   ├── ContactForm.tsx
│   ├── BookingForm.tsx
│   └── validation.ts
├── layout/                  # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
└── features/               # Feature-specific components
    ├── CaseStudyCard.tsx
    ├── ServiceCard.tsx
    └── HeroSection.tsx

content/                     # MDX content
├── case-studies/           # Case study markdown files
├── blog/                   # Blog post markdown files
└── faq/                    # FAQ entries

lib/
├── email.ts                # Email sending utilities
├── validations.ts          # Zod schemas
└── utils.ts                # Helper functions

public/
├── images/                 # Static images
└── fonts/                  # Custom fonts (if any)

tests/
├── e2e/                    # Playwright E2E tests
├── unit/                   # Vitest unit tests
└── integration/            # API route integration tests
```

**Structure Decision**: Selected Next.js 16 App Router structure with route groups for clean URL organization. Marketing pages in `(marketing)` group to exclude group name from URLs. API routes handle form submissions and email delivery. File-based MDX content for blog and case studies enables easy updates without database. Component structure follows atomic design principles (ui → forms → layout → features).

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
