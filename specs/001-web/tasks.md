# Tasks: Fukui Freelance Web Design & System Development Site

**Feature Branch**: `001-web`
**Input**: Design documents from `/specs/001-web/`
**Approach**: Test-Driven Development (TDD) - E2E tests before implementation
**Test Tools**: Playwright MCP (test creation), Chrome DevTools MCP (test execution)
**Commit Strategy**: Japanese commit message after each task completion

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US7)
- All file paths are relative to project root

## Path Conventions
- **Next.js 16 App Router**: `app/`, `components/`, `lib/`, `content/`, `emails/`, `tests/`
- **Configuration**: Root level (`next.config.js`, `tailwind.config.ts`, etc.)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic Next.js 16 structure

- [ ] T001 [P] Initialize Next.js 16 project with TypeScript, TailwindCSS, App Router
  - Run: `npx create-next-app@latest fukui-freelance-web --typescript --tailwind --app --src-dir=false --import-alias "@/*"`
  - Verify: Project structure created with app/ directory
  - Commit: "🎉 Next.js 16プロジェクト初期化完了"

- [ ] T002 [P] Install core dependencies (Valibot, Resend, React Email, next-mdx-remote)
  - Run: `npm install valibot react-hook-form @hookform/resolvers resend react-email next-mdx-remote gray-matter date-fns`
  - Run: `npm install --save-dev @types/node @types/react @types/react-dom`
  - Verify: package.json contains all dependencies
  - Commit: "📦 コア依存関係をインストール"

- [ ] T003 [P] Install Playwright for E2E testing
  - Run: `npm install --save-dev @playwright/test`
  - Run: `npx playwright install`
  - Create: `playwright.config.ts` with chrome-dev MCP integration
  - Verify: Playwright installed and configured
  - Commit: "🧪 Playwrightテスト環境をセットアップ"

- [ ] T004 [P] Install and configure shadcn/ui
  - Run: `npx shadcn@latest init` (select defaults: TypeScript, App Router, TailwindCSS)
  - Configure: `components.json` with aliases (@/components, @/lib)
  - Edit: `tailwind.config.ts` - Add Hiragino Sans, Yu Gothic, Meiryo fonts
  - Add: Japanese typography settings
  - Verify: shadcn/ui configured correctly
  - Commit: "🎨 shadcn/ui・日本語フォント設定完了"

- [ ] T005 [P] Configure Next.js for static generation, images, and MDX
  - Edit: `next.config.js` - Set `output: 'export'` for static site generation
  - Add: Image formats (AVIF, WebP) with `unoptimized: true` for static export
  - Add: MDX page extensions support
  - Add: Image device sizes for mobile-first
  - Add: `trailingSlash: true` for static hosting compatibility
  - Verify: Config file valid syntax
  - Commit: "⚙️ Next.js静的生成・画像・MDX設定完了"

- [ ] T006 [P] Create directory structure per plan.md
  - Create: `app/(marketing)/`, `app/api/`, `components/{ui,forms,layout,features}/`, `lib/`, `content/{case-studies,blog,faq}/`, `emails/`, `tests/e2e/`, `public/images/`
  - Verify: All directories exist
  - Commit: "📁 プロジェクトディレクトリ構造作成"

- [ ] T007 [P] Setup environment variables
  - Create: `.env.local` with RESEND_API_KEY, NEXT_PUBLIC_SITE_URL placeholders
  - Create: `.env.example` for documentation
  - Verify: .env.local not tracked in git
  - Commit: "🔐 環境変数設定ファイル作成"

- [ ] T008 Configure ESLint and TypeScript strict mode
  - Edit: `tsconfig.json` - Enable strict mode
  - Edit: `.eslintrc.json` - Add jsx-a11y rules for accessibility
  - Verify: Linting works without errors
  - Commit: "✅ ESLint・TypeScript厳格モード設定"

- [ ] T008a [P] Create llms.txt file for AI context
  - Create: `public/llms.txt` - Project description and key information for AI assistants
  - Add: Project name, purpose (Fukui freelance web development site)
  - Add: Tech stack (Next.js 16, Valibot, shadcn/ui, static generation)
  - Add: Key URLs (homepage, services, case studies, contact)
  - Add: Contact information and target audience
  - Verify: File accessible at /llms.txt
  - Commit: "📄 llms.txtファイル作成完了"

**Checkpoint**: Foundation ready - 9 setup tasks complete, all tools installed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Create root layout with Japanese SEO metadata
  - Create: `app/layout.tsx` - Root layout with Noto Sans JP font
  - Add: Default metadata (title, description, OG tags) in Japanese
  - Add: lang="ja" attribute
  - Add: Plausible Analytics script (deferred load)
  - Verify: Layout renders with Japanese font
  - Commit: "🌐 ルートレイアウト・日本語SEO設定完了"

- [ ] T010 [P] Install shadcn/ui base components
  - Run: `npx shadcn@latest add button input card label`
  - Verify: Components created in `components/ui/`
  - Verify: Components use Tailwind CSS and work with Japanese text
  - Commit: "🧩 shadcn/uiベースコンポーネント追加完了"

- [ ] T011 [P] Create layout components (Header, Footer, Navigation)
  - Create: `components/layout/Header.tsx` - Site header with navigation
  - Create: `components/layout/Footer.tsx` - Site footer with links
  - Create: `components/layout/Navigation.tsx` - Main navigation menu
  - Add: Responsive mobile menu (hamburger)
  - Add: Clickable phone number component
  - Verify: Header/Footer render on all pages
  - Commit: "🏗️ ヘッダー・フッター・ナビゲーション作成"

- [ ] T012 Create Valibot validation schemas (lib/validations.ts)
  - Create: `lib/validations.ts` - contactFormSchema with all fields using Valibot
  - Add: bookingFormSchema for consultation booking
  - Add: Japanese error messages for all validations
  - Export: TypeScript types with `v.InferOutput<typeof schema>`
  - Verify: Schemas validate correctly with test data
  - Commit: "🛡️ Valibotバリデーションスキーマ作成完了"

- [ ] T013 [P] Create email utility functions (lib/email.ts)
  - Create: `lib/email.ts` - Resend client initialization
  - Add: sendContactConfirmation() function
  - Add: sendBookingConfirmation() function
  - Add: Error handling and retry logic
  - Verify: Functions compile without errors (actual sending tested later)
  - Commit: "✉️ メール送信ユーティリティ作成完了"

- [ ] T014 [P] Create MDX utility functions (lib/mdx.ts)
  - Create: `lib/mdx.ts` - getCaseStudies(), getCaseStudyBySlug()
  - Add: getBlogPosts(), getBlogPostBySlug()
  - Add: getFAQEntries() for FAQ content
  - Add: Frontmatter parsing with gray-matter
  - Verify: Functions compile without errors (actual content tested later)
  - Commit: "📄 MDXコンテンツ読み込み機能作成完了"

- [ ] T015 Create global styles and CSS reset
  - Edit: `app/globals.css` - Add Tailwind directives
  - Add: Custom CSS for Japanese typography
  - Add: Smooth scroll behavior
  - Add: Focus-visible styles for accessibility
  - Verify: Styles apply correctly
  - Commit: "💅 グローバルスタイル・CSSリセット設定"

- [ ] T016 [P] Create React Email base templates
  - Create: `emails/components/EmailLayout.tsx` - Base email layout
  - Add: Japanese-friendly email styles
  - Add: Header/footer components for emails
  - Verify: Email components render in React Email preview
  - Commit: "📧 メールテンプレートベースコンポーネント作成"

- [ ] T017 Create 404 and error pages
  - Create: `app/not-found.tsx` - Custom 404 page in Japanese
  - Create: `app/error.tsx` - Global error boundary
  - Add: Helpful navigation back to homepage
  - Verify: Error pages render correctly
  - Commit: "⚠️ 404・エラーページ作成完了"

- [ ] T018 Setup sitemap generation
  - Create: `app/sitemap.ts` - Dynamic sitemap generation
  - Add: Homepage, services, static pages
  - Add: Dynamic case studies and blog posts (to be populated later)
  - Verify: Sitemap generates at /sitemap.xml
  - Commit: "🗺️ サイトマップ生成機能実装完了"

- [ ] T019 Setup robots.txt
  - Create: `app/robots.ts` - Robots.txt configuration
  - Allow: All pages for crawling
  - Add: Sitemap reference
  - Verify: Robots.txt available at /robots.txt
  - Commit: "🤖 robots.txt設定完了"

- [ ] T020 [P] Create LocalBusiness structured data component
  - Create: `components/JsonLd.tsx` - LocalBusinessSchema component
  - Add: Fukui service areas (all 8 cities)
  - Add: GeoCoordinates for Fukui City
  - Add: Contact information placeholder
  - Verify: JSON-LD renders in page source
  - Commit: "📍 構造化データ(LocalBusiness)作成完了"

**Checkpoint**: Foundation complete - All user stories can now be implemented independently

---

## Phase 3: User Story 1 - Initial Site Visit & Understanding Services (Priority: P1) 🎯 MVP

**Goal**: Visitors can understand services, value proposition, and pricing within 30 seconds of landing

**Independent Test**: Visit homepage, answer "What services?" and "Who is this for?" in <30s

### E2E Tests for User Story 1 (TDD Approach)

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T021 [P] [US1] E2E test: Homepage hero section displays value proposition
  - Create: `tests/e2e/us1-homepage-hero.spec.ts` using Playwright MCP
  - Test: Hero headline visible and contains "福井" + service keywords
  - Test: Subheading explains target audience (small businesses)
  - Test: Primary CTA button "無料相談予約" visible and clickable
  - Run: Using chrome-dev MCP - Expect: FAIL (page not implemented)
  - Commit: "🧪 [US1] ヒーローセクションE2Eテスト作成"

- [ ] T022 [P] [US1] E2E test: Services section displays three offerings
  - Create: `tests/e2e/us1-services-overview.spec.ts` using Playwright MCP
  - Test: Services section visible on homepage
  - Test: Three service cards visible (Web制作, システム開発, 保守運用)
  - Test: Each card has title, description, and "詳しく見る" link
  - Run: Using chrome-dev MCP - Expect: FAIL (services not implemented)
  - Commit: "🧪 [US1] サービス概要セクションE2Eテスト作成"

- [ ] T023 [P] [US1] E2E test: Pricing page shows service packages
  - Create: `tests/e2e/us1-pricing-page.spec.ts` using Playwright MCP
  - Test: Navigate to /pricing from homepage
  - Test: See minimum 3 pricing tiers with price ranges
  - Test: Each tier shows "含まれる内容" list
  - Test: "お問い合わせ" CTA visible
  - Run: Using chrome-dev MCP - Expect: FAIL (pricing page not implemented)
  - Commit: "🧪 [US1] 料金ページE2Eテスト作成"

- [ ] T024 [P] [US1] E2E test: Contact CTAs visible on homepage
  - Create: `tests/e2e/us1-contact-ctas.spec.ts` using Playwright MCP
  - Test: "無料相談予約" button visible in hero
  - Test: "お問い合わせ" button visible in services section
  - Test: Phone number clickable (tel: link)
  - Test: CTAs navigate to correct pages
  - Run: Using chrome-dev MCP - Expect: FAIL (CTAs not linked)
  - Commit: "🧪 [US1] CTAボタンE2Eテスト作成"

### Implementation for User Story 1

- [ ] T025 [P] [US1] Create ServiceOffering content files (MDX)
  - Create: `content/services/web-seisaku.mdx` - Web制作サービス
  - Create: `content/services/system-kaihatsu.mdx` - システム開発
  - Create: `content/services/maintenance.mdx` - 保守運用
  - Add: Frontmatter with service metadata (name, description, pricing tier)
  - Verify: MDX files parse correctly
  - Commit: "📝 [US1] サービス内容MDXファイル作成"

- [ ] T026 [P] [US1] Create HeroSection component
  - Reference: `designs/ホーム_-_特化型デザイン_2/` (screen.png, code.html)
  - Create: `components/features/HeroSection.tsx`
  - Add: Headline with Fukui value proposition
  - Add: Subheading explaining target audience
  - Add: Primary CTA button "無料相談予約" → /contact
  - Add: Hero background image or gradient
  - Add: Responsive layout for mobile/desktop
  - Verify: Component renders without errors and matches design reference
  - Commit: "🎨 [US1] ヒーローセクションコンポーネント作成"

- [ ] T027 [P] [US1] Create ServiceCard component
  - Create: `components/features/ServiceCard.tsx`
  - Props: title, description, iconName, link
  - Add: Card styling with hover effects
  - Add: "詳しく見る" link
  - Verify: Component renders with test props
  - Commit: "🃏 [US1] サービスカードコンポーネント作成"

- [ ] T028 [US1] Create homepage (app/(marketing)/page.tsx)
  - Reference: `designs/ホーム_-_特化型デザイン_2/` (screen.png, code.html)
  - Create: `app/(marketing)/page.tsx` with `export const dynamic = 'force-static'`
  - Import: HeroSection component
  - Add: Services overview section with 3 ServiceCards
  - Load: Service data from MDX files using lib/mdx.ts (at build time)
  - Add: Trust indicators section (service area badges)
  - Add: Secondary CTA to contact form
  - Verify: Homepage renders all sections, generates static HTML, and matches design reference
  - Commit: "🏠 [US1] ホームページ実装完了"

- [ ] T029 [P] [US1] Create individual service pages with static generation
  - Reference: `designs/サービス_-_業種特化型_2/` (screen.png, code.html)
  - Create: `app/(marketing)/services/[slug]/page.tsx` - Dynamic service page
  - Add: `export const dynamic = 'force-static'`
  - Implement: `generateStaticParams()` for web-seisaku, system-kaihatsu, maintenance
  - Display: MDX content from content/services/
  - Add: Service-specific CTAs
  - Add: Related case studies section (placeholder)
  - Verify: All 3 service pages render, generate static HTML, and match design reference
  - Commit: "📄 [US1] サービス個別ページ実装完了"

- [ ] T030 [US1] Create pricing page with static generation
  - Create: `app/(marketing)/pricing/page.tsx` with `export const dynamic = 'force-static'`
  - Display: 3 pricing tiers (スタンダード, プレミアム, エンタープライズ)
  - Show: Price ranges (not exact prices)
  - Show: "含まれる内容" list for each tier
  - Add: Disclaimer about custom quotes
  - Add: "お問い合わせ" CTA
  - Verify: Pricing page renders and generates static HTML
  - Commit: "💰 [US1] 料金ページ実装完了"

- [ ] T031 [US1] Integrate all US1 components into layout
  - Update: `app/(marketing)/layout.tsx` - Add Header with navigation
  - Add: Footer with service links
  - Ensure: Navigation works between pages
  - Verify: All US1 pages accessible via navigation
  - Commit: "🔗 [US1] ナビゲーション統合完了"

### Test Execution & Bug Fixing for User Story 1

- [ ] T032 [US1] Run E2E tests using chrome-dev MCP
  - Run: T021 test - Homepage hero section
  - Run: T022 test - Services overview
  - Run: T023 test - Pricing page
  - Run: T024 test - Contact CTAs
  - Record: Test results (pass/fail)
  - If FAIL: Proceed to T033
  - If PASS: Skip to T034
  - Commit: "✅ [US1] E2Eテスト実行完了"

- [ ] T033 [US1] Fix bugs identified by E2E tests (iterate until passing)
  - Review: Failed test screenshots from chrome-dev MCP
  - Fix: Implementation issues in components/pages
  - Re-run: Tests using chrome-dev MCP
  - Repeat: Until all US1 tests pass
  - Commit: "🐛 [US1] E2Eテスト修正完了"

- [ ] T034 [US1] Lighthouse audit for homepage
  - Run: Lighthouse using chrome-dev MCP on homepage
  - Verify: Performance >90, Accessibility 100, SEO 100
  - Fix: Any issues below thresholds
  - Commit: "⚡ [US1] Lighthouseパフォーマンス最適化"

**Checkpoint**: User Story 1 complete - Homepage, services, pricing fully functional and tested

---

## Phase 4: User Story 2 - Viewing Case Studies & Building Trust (Priority: P1)

**Goal**: Visitors can see 2+ detailed case studies with KPIs and identify relevant examples

**Independent Test**: Navigate to case studies, answer "What results?" and "Relevant to my industry?"

### E2E Tests for User Story 2 (TDD Approach)

- [ ] T035 [P] [US2] E2E test: Case studies listing page shows minimum 2 studies
  - Create: `tests/e2e/us2-case-studies-listing.spec.ts` using Playwright MCP
  - Test: Navigate to /case-studies from homepage
  - Test: See at least 2 case study cards
  - Test: Each card shows title, client type, industry, KPI preview
  - Test: Click card navigates to detail page
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US2] ケーススタディ一覧E2Eテスト作成"

- [ ] T036 [P] [US2] E2E test: Case study detail page shows KPIs and results
  - Create: `tests/e2e/us2-case-study-detail.spec.ts` using Playwright MCP
  - Test: Navigate to specific case study (e.g., /case-studies/beauty-salon-reservation)
  - Test: See project goals, before/after situation
  - Test: See measurable results (e.g., "予約40%増加")
  - Test: See project timeline and budget range
  - Test: "同じような成果を得る" CTA visible
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US2] ケーススタディ詳細E2Eテスト作成"

- [ ] T037 [P] [US2] E2E test: Case studies filterable by industry
  - Create: `tests/e2e/us2-case-study-filtering.spec.ts` using Playwright MCP
  - Test: Filter buttons visible (restaurants, salons, photographers)
  - Test: Click "美容室" filter shows only salon case studies
  - Test: Filter count updates correctly
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US2] ケーススタディフィルターE2Eテスト作成"

### Implementation for User Story 2

- [ ] T038 [P] [US2] Create case study MDX content files
  - Create: `content/case-studies/beauty-salon-reservation.mdx` - 美容室予約システム
  - Create: `content/case-studies/cafe-takeout-ordering.mdx` - カフェテイクアウト注文
  - Add: Frontmatter with all metadata (title, clientType, industry, measurableResults, projectDuration, budgetRange)
  - Add: Full case study content (goals, before, after, results)
  - Verify: MDX files parse correctly
  - Commit: "📝 [US2] ケーススタディMDXファイル作成"

- [ ] T039 [P] [US2] Create CaseStudyCard component
  - Create: `components/features/CaseStudyCard.tsx`
  - Props: title, clientType, industry, results preview, slug
  - Display: KPI badge (e.g., "予約40%↑")
  - Add: Card hover effects
  - Add: Link to detail page
  - Verify: Component renders with test data
  - Commit: "🃏 [US2] ケーススタディカードコンポーネント作成"

- [ ] T040 [US2] Create case studies listing page
  - Reference: `designs/事例_-_業種特化型_2/` (screen.png, code.html)
  - Create: `app/(marketing)/case-studies/page.tsx`
  - Load: All case studies using getCaseStudies() from lib/mdx.ts
  - Display: Grid of CaseStudyCard components
  - Add: Industry filter buttons (client-side filtering)
  - Add: Sort by date (newest first)
  - Verify: Listing page renders all case studies and matches design reference
  - Commit: "📋 [US2] ケーススタディ一覧ページ実装完了"

- [ ] T041 [US2] Create case study detail page
  - Reference: `designs/事例_-_業種特化型_2/` (screen.png, code.html)
  - Create: `app/(marketing)/case-studies/[slug]/page.tsx`
  - Use: generateStaticParams() for all case studies
  - Load: Case study using getCaseStudyBySlug() from lib/mdx.ts
  - Display: Full content with MDX rendering
  - Display: Measurable results section with KPI cards
  - Display: Project timeline visualization
  - Add: "同じような成果を得る - 無料相談予約" CTA
  - Verify: Detail pages render for all case studies and match design reference
  - Commit: "📄 [US2] ケーススタディ詳細ページ実装完了"

- [ ] T042 [P] [US2] Add case study links to homepage
  - Update: `app/(marketing)/page.tsx` - Add featured case studies section
  - Display: 2 featured case studies (featured: true in frontmatter)
  - Add: "すべての事例を見る" link to /case-studies
  - Verify: Homepage shows featured case studies
  - Commit: "🔗 [US2] ホームページへケーススタディ追加"

- [ ] T043 [P] [US2] Add case study links to service pages
  - Update: `app/(marketing)/services/[slug]/page.tsx`
  - Add: Related case studies section (filtered by servicesUsed field)
  - Display: Relevant case studies for each service
  - Verify: Service pages show related case studies
  - Commit: "🔗 [US2] サービスページへケーススタディリンク追加"

### Test Execution & Bug Fixing for User Story 2

- [ ] T044 [US2] Run E2E tests using chrome-dev MCP
  - Run: T035 test - Case studies listing
  - Run: T036 test - Case study detail
  - Run: T037 test - Industry filtering
  - Record: Test results
  - If FAIL: Proceed to T045
  - If PASS: Skip to Checkpoint
  - Commit: "✅ [US2] E2Eテスト実行完了"

- [ ] T045 [US2] Fix bugs identified by E2E tests
  - Review: Failed test results
  - Fix: Implementation issues
  - Re-run: Tests until all pass
  - Commit: "🐛 [US2] E2Eテスト修正完了"

**Checkpoint**: User Story 2 complete - Case studies listing and detail pages functional

---

## Phase 5: User Story 3 - Submitting Inquiry/Consultation Request (Priority: P1)

**Goal**: Visitors can submit inquiry in <3 minutes, receive confirmation, and get response commitment

**Independent Test**: Submit test inquiry, verify completion time <3min, confirmation email received

### E2E Tests for User Story 3 (TDD Approach)

- [X] T046 [P] [US3] E2E test: Contact form submission flow
  - Create: `tests/e2e/us3-contact-form.spec.ts` using Playwright MCP
  - Test: Navigate to /contact
  - Test: Fill all required fields
  - Test: Submit form
  - Test: See success message "確認メールをお送りしました"
  - Test: Form completion time <3 minutes
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US3] お問い合わせフォームE2Eテスト作成"

- [X] T047 [P] [US3] E2E test: Consultation booking flow
  - Create: `tests/e2e/us3-booking-form.spec.ts` using Playwright MCP
  - Test: Navigate to /contact (booking section)
  - Test: Select consultation format (online/in-person)
  - Test: Select preferred date ranges
  - Test: Fill needs description
  - Test: Submit booking
  - Test: See confirmation message
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US3] 相談予約E2Eテスト作成"

- [X] T048 [P] [US3] E2E test: Phone number clickable on mobile
  - Create: `tests/e2e/us3-phone-click.spec.ts` using Playwright MCP
  - Test: Set mobile viewport (375x667)
  - Test: Find phone number in header
  - Test: Verify tel: link exists
  - Test: Click phone number (check href)
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US3] 電話番号クリックE2Eテスト作成"

- [X] T049 [P] [US3] E2E test: Form validation displays errors
  - Create: `tests/e2e/us3-form-validation.spec.ts` using Playwright MCP
  - Test: Submit empty form
  - Test: See field-level error messages
  - Test: Invalid email shows "有効なメールアドレスを入力してください"
  - Test: Errors clear when fields corrected
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US3] フォームバリデーションE2Eテスト作成"

### Implementation for User Story 3

- [X] T050 [P] [US3] Create React Email templates for inquiries
  - Create: `emails/ContactFormConfirmation.tsx` - Client auto-reply
  - Create: `emails/ContactFormNotification.tsx` - Freelancer notification
  - Create: `emails/BookingConfirmation.tsx` - Booking confirmation
  - Add: Japanese content and styling
  - Verify: Email templates render in React Email preview
  - Commit: "✉️ [US3] お問い合わせメールテンプレート作成"

- [X] T051 [US3] Create contact form API route with Resend integration
  - Create: `app/api/contact/route.ts` - POST endpoint
  - Implement: Valibot validation using contactFormSchema with `v.safeParse()`
  - Implement: Send confirmation email via Resend
  - Implement: Send notification email to freelancer
  - Add: Error handling (validation errors, email sending errors)
  - Add: Rate limiting (basic implementation)
  - Note: API routes still work with `output: 'export'` if using client-side submission
  - Verify: API route compiles without errors
  - Commit: "🔌 [US3] お問い合わせAPI実装完了"

- [X] T052 [US3] Create booking API route with Resend integration
  - Create: `app/api/booking/route.ts` - POST endpoint
  - Implement: Valibot validation using bookingFormSchema with `v.safeParse()`
  - Implement: Send booking confirmation email
  - Add: Location validation (Fukui Prefecture only for in-person)
  - Add: Error handling
  - Verify: API route compiles without errors
  - Commit: "🔌 [US3] 相談予約API実装完了"

- [X] T053 [P] [US3] Create ContactForm component with shadcn/ui
  - Create: `components/forms/ContactForm.tsx`
  - Use: react-hook-form + Valibot resolver (`@hookform/resolvers/valibot`)
  - Use: shadcn/ui components (Input, Label, Button, Card)
  - Add: All required fields per contactFormSchema
  - Add: Field-level error display using shadcn/ui Form components
  - Add: Submit handler calling /api/contact
  - Add: Loading state during submission
  - Add: Success/error message display with shadcn/ui Alert
  - Verify: Form renders and validates
  - Commit: "📝 [US3] お問い合わせフォームコンポーネント作成"

- [X] T054 [P] [US3] Create BookingForm component with shadcn/ui
  - Create: `components/forms/BookingForm.tsx`
  - Use: react-hook-form + Valibot resolver
  - Use: shadcn/ui components (Input, Label, Button, Select, Calendar for date picker)
  - Run: `npx shadcn@latest add select calendar popover` if not already installed
  - Add: Format selection (online/in-person) using Select component
  - Add: Date range picker using Calendar + Popover components
  - Add: Conditional location field (if in-person)
  - Add: Submit handler calling /api/booking
  - Add: Loading and message states with shadcn/ui Alert
  - Verify: Form renders and validates
  - Commit: "📝 [US3] 相談予約フォームコンポーネント作成"

- [X] T055 [US3] Create contact page with both forms
  - Reference: Design files in `designs/` directory for form layout and styling
  - Create: `app/(marketing)/contact/page.tsx`
  - Display: Tabs or sections for "お問い合わせ" and "無料相談予約"
  - Embed: ContactForm component
  - Embed: BookingForm component
  - Add: Phone number with tel: link (mobile-clickable)
  - Add: Business hours display
  - Add: Success page redirect (optional)
  - Verify: Contact page renders both forms and matches design reference
  - Commit: "📞 [US3] お問い合わせページ実装完了"

- [X] T056 [P] [US3] Update Header with phone number
  - Update: `components/layout/Header.tsx`
  - Add: Clickable phone number with tel: link
  - Add: Business hours tooltip
  - Add: Responsive display (hide on small mobile, show icon)
  - Verify: Phone number clickable on mobile
  - Commit: "📱 [US3] ヘッダーへ電話番号追加"

- [X] T057 [US3] Wire up all CTAs to contact page
  - Update: Hero CTA → /contact
  - Update: Service page CTAs → /contact
  - Update: Case study CTAs → /contact
  - Verify: All CTAs navigate correctly
  - Commit: "🔗 [US3] 全CTAをお問い合わせページに接続"

### Test Execution & Bug Fixing for User Story 3

- [ ] T058 [US3] Configure Resend API key for testing
  - Add: RESEND_API_KEY to .env.local (use Resend test mode)
  - Verify: Domain verified in Resend dashboard
  - Test: Send test email manually
  - Commit: "🔐 [US3] Resend API設定完了"

- [ ] T059 [US3] Run E2E tests using chrome-dev MCP
  - Run: T046 test - Contact form submission
  - Run: T047 test - Booking flow
  - Run: T048 test - Phone click
  - Run: T049 test - Form validation
  - Record: Test results
  - If FAIL: Proceed to T060
  - If PASS: Skip to Checkpoint
  - Commit: "✅ [US3] E2Eテスト実行完了"

- [ ] T060 [US3] Fix bugs identified by E2E tests
  - Review: Failed test results and email delivery logs
  - Fix: Form validation, API errors, email template issues
  - Re-run: Tests until all pass
  - Commit: "🐛 [US3] E2Eテスト修正完了"

**Checkpoint**: User Story 3 complete - Inquiry and booking forms fully functional with email confirmation

---

## Phase 6: User Story 4 - Understanding Project Process (Priority: P2)

**Goal**: Visitors understand project phases, timelines, and what's expected of them

**Independent Test**: Navigate to process page, explain back project phases and timeline expectations

### E2E Tests for User Story 4 (TDD Approach)

- [X] T061 [P] [US4] E2E test: Process page displays all project phases
  - Create: `tests/e2e/us4-process-page.spec.ts` using Playwright MCP
  - Test: Navigate to /process
  - Test: See 7 project phases (inquiry → requirements → design → implementation → testing → launch → maintenance)
  - Test: Each phase has description and duration
  - Test: CTA to "プロジェクトについて相談する" visible
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US4] プロジェクトフローE2Eテスト作成"

### Implementation for User Story 4

- [X] T062 [US4] Create process page content (MDX or static)
  - Reference: `designs/制作の流れ_2/` (screen.png, code.html)
  - Create: `app/(marketing)/process/page.tsx` or `content/process.mdx`
  - Add: Project phases visualization (could use timeline component)
  - Add: Phase details (7 phases: inquiry → requirements → design → implementation → testing → launch → maintenance)
  - Add: Typical duration ranges for each phase
  - Add: Client responsibilities per phase
  - Add: "プロジェクトについて相談する" CTA → /contact
  - Verify: Process page renders and matches design reference
  - Commit: "📊 [US4] プロジェクトフローページ実装完了"

- [X] T063 [P] [US4] Create TimelineVisualization component (optional)
  - Create: Timeline visualization embedded directly in process page
  - Display: Project phases in visual timeline format with icon circles and connecting lines
  - Add: Phase details with client responsibilities highlighted
  - Verify: Component renders timeline
  - Commit: "📈 [US4] タイムライン可視化コンポーネント作成" (embedded in page)

- [X] T064 [P] [US4] Add process link to navigation
  - Update: `app/(marketing)/layout.tsx`
  - Add: "制作の流れ" link → /process (already present in navigation)
  - Verify: Navigation includes process link
  - Commit: "🔗 [US4] ナビゲーションへ制作フローリンク追加" (already complete)

### Test Execution & Bug Fixing for User Story 4

- [X] T065 [US4] Run E2E test using chrome-dev MCP
  - Run: T061 test - Process page
  - Record: Test results - 45/45 tests passed
  - If FAIL: Fix and re-run
  - Commit: "🐛 [US4] E2Eテスト修正完了 - 全45テスト成功"

**Checkpoint**: User Story 4 complete - Process page functional

---

## Phase 7: User Story 5 - Finding Answers to FAQ (Priority: P2)

**Goal**: Visitors find answers to 10-15 common questions without contacting

**Independent Test**: Identify 10-15 common questions, verify each has clear answer in FAQ

### E2E Tests for User Story 5 (TDD Approach)

- [ ] T066 [P] [US5] E2E test: FAQ page displays 10+ questions
  - Create: `tests/e2e/us5-faq-page.spec.ts` using Playwright MCP
  - Test: Navigate to /faq
  - Test: See at least 10 FAQ entries
  - Test: Questions organized by category
  - Test: Click question expands answer
  - Test: "直接お問い合わせ" CTA visible at bottom
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US5] FAQページE2Eテスト作成"

### Implementation for User Story 5

- [ ] T067 [P] [US5] Create FAQ content files
  - Create: `content/faq/pricing.json` - 価格・費用 (3-4 questions)
  - Create: `content/faq/timeline.json` - 制作期間 (2-3 questions)
  - Create: `content/faq/content.json` - コンテンツ・素材 (2-3 questions)
  - Create: `content/faq/subsidies.json` - 補助金 (2-3 questions)
  - Create: `content/faq/maintenance.json` - 保守・運用 (2-3 questions)
  - Add: JSON format with question/answer/category
  - Verify: Total 10-15 FAQ entries
  - Commit: "📝 [US5] FAQコンテンツファイル作成"

- [ ] T068 [P] [US5] Create FAQAccordion component
  - Create: `components/features/FAQAccordion.tsx`
  - Props: question, answer, isOpen, onToggle
  - Add: Accordion expand/collapse animation
  - Add: Accessibility (keyboard navigation, ARIA attributes)
  - Verify: Component renders and toggles
  - Commit: "🎨 [US5] FAQアコーディオンコンポーネント作成"

- [ ] T069 [US5] Create FAQ page
  - Reference: `designs/よくある質問_2/` (screen.png, code.html)
  - Create: `app/(marketing)/faq/page.tsx`
  - Load: All FAQ entries from content/faq/ using getFAQEntries()
  - Group: By category with category headers
  - Display: Using FAQAccordion components
  - Add: "直接お問い合わせ" CTA → /contact
  - Add: Search functionality (client-side filter, optional)
  - Verify: FAQ page renders all questions and matches design reference
  - Commit: "❓ [US5] FAQページ実装完了"

- [ ] T070 [P] [US5] Add FAQ link to navigation and footer
  - Update: Navigation and Footer - Add "よくある質問" link → /faq
  - Verify: FAQ accessible from all pages
  - Commit: "🔗 [US5] ナビゲーションへFAQリンク追加"

### Test Execution & Bug Fixing for User Story 5

- [ ] T071 [US5] Run E2E test using chrome-dev MCP
  - Run: T066 test - FAQ page
  - Record: Test results
  - If FAIL: Fix and re-run
  - Commit: "✅ [US5] E2Eテスト実行・修正完了"

**Checkpoint**: User Story 5 complete - FAQ page functional

---

## Phase 8: User Story 6 - Learning from Blog Content (Priority: P3)

**Goal**: Visitors find 3-5 blog posts with actionable info and CTAs

**Independent Test**: Publish 3-5 posts, verify indexed by search engines, check CTA engagement

### E2E Tests for User Story 6 (TDD Approach)

- [ ] T072 [P] [US6] E2E test: Blog listing page shows posts
  - Create: `tests/e2e/us6-blog-listing.spec.ts` using Playwright MCP
  - Test: Navigate to /blog
  - Test: See at least 3 blog post cards
  - Test: Each card shows title, excerpt, date, category
  - Test: Click card navigates to blog post
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US6] ブログ一覧E2Eテスト作成"

- [ ] T073 [P] [US6] E2E test: Blog post displays content and CTA
  - Create: `tests/e2e/us6-blog-post.spec.ts` using Playwright MCP
  - Test: Navigate to specific blog post
  - Test: See post title, date, category, content
  - Test: Scroll to bottom, see CTA "専門家にサポートを依頼する"
  - Test: See related posts section
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US6] ブログ記事E2Eテスト作成"

### Implementation for User Story 6

- [ ] T074 [P] [US6] Create blog post MDX content files
  - Create: `content/blog/fukui-web-subsidy-guide.mdx` - 福井Web補助金ガイド
  - Create: `content/blog/local-seo-tips.mdx` - 地域SEOのコツ
  - Create: `content/blog/reservation-system-benefits.mdx` - 予約システムのメリット
  - Add: Frontmatter with metadata (title, excerpt, date, category, tags)
  - Add: Full blog post content
  - Verify: MDX files parse correctly
  - Commit: "📝 [US6] ブログ記事MDXファイル作成"

- [ ] T075 [P] [US6] Create BlogPostCard component
  - Create: `components/features/BlogPostCard.tsx`
  - Props: title, excerpt, date, category, slug
  - Display: Card with image (optional), metadata
  - Add: Link to blog post detail
  - Verify: Component renders
  - Commit: "🃏 [US6] ブログカードコンポーネント作成"

- [ ] T076 [US6] Create blog listing page
  - Reference: Design files in `designs/` directory for blog layout
  - Create: `app/(marketing)/blog/page.tsx`
  - Load: All blog posts using getBlogPosts() from lib/mdx.ts
  - Display: Grid of BlogPostCard components
  - Add: Category filter buttons (client-side)
  - Add: Sort by date (newest first)
  - Verify: Blog listing page renders and matches design reference
  - Commit: "📋 [US6] ブログ一覧ページ実装完了"

- [ ] T077 [US6] Create blog post detail page
  - Reference: Design files in `designs/` directory for blog post layout
  - Create: `app/(marketing)/blog/[slug]/page.tsx`
  - Use: generateStaticParams() for all blog posts
  - Load: Post using getBlogPostBySlug() from lib/mdx.ts
  - Display: Full MDX content
  - Add: Related posts section (same category)
  - Add: "専門家にサポートを依頼する" CTA → /contact
  - Verify: Blog post pages render and match design reference
  - Commit: "📄 [US6] ブログ記事詳細ページ実装完了"

- [ ] T078 [P] [US6] Add blog link to navigation and footer
  - Update: Navigation and Footer - Add "ブログ" link → /blog
  - Verify: Blog accessible from all pages
  - Commit: "🔗 [US6] ナビゲーションへブログリンク追加"

### Test Execution & Bug Fixing for User Story 6

- [ ] T079 [US6] Run E2E tests using chrome-dev MCP
  - Run: T072 test - Blog listing
  - Run: T073 test - Blog post detail
  - Record: Test results
  - If FAIL: Fix and re-run
  - Commit: "✅ [US6] E2Eテスト実行・修正完了"

**Checkpoint**: User Story 6 complete - Blog listing and posts functional

---

## Phase 9: User Story 7 - Company Background & Trust Signals (Priority: P3)

**Goal**: Visitors understand freelancer's background, qualifications, and service area

**Independent Test**: Review about page, answer location, qualifications, service area, trust questions

### E2E Tests for User Story 7 (TDD Approach)

- [ ] T080 [P] [US7] E2E test: About page displays background and service areas
  - Create: `tests/e2e/us7-about-page.spec.ts` using Playwright MCP
  - Test: Navigate to /about
  - Test: See freelancer background section
  - Test: See service area list (all 8 Fukui cities)
  - Test: See qualifications/certifications
  - Test: See "現地訪問可能" messaging
  - Run: Using chrome-dev MCP - Expect: FAIL
  - Commit: "🧪 [US7] 会社概要E2Eテスト作成"

### Implementation for User Story 7

- [ ] T081 [US7] Create about page content
  - Reference: Design files in `designs/` directory for about page layout
  - Create: `app/(marketing)/about/page.tsx` or `content/about.mdx`
  - Add: Freelancer background (Tokyo experience, technical expertise)
  - Add: Service areas section - all 8 Fukui cities explicitly listed
  - Add: Qualifications/certifications section
  - Add: Key differentiators (specialization, close communication, on-site visits, end-to-end service)
  - Add: Photo (optional)
  - Add: CTA to contact page
  - Verify: About page renders and matches design reference
  - Commit: "👤 [US7] 会社概要ページ実装完了"

- [ ] T082 [P] [US7] Add about link to navigation and footer
  - Update: Navigation and Footer - Add "会社概要" link → /about
  - Verify: About page accessible
  - Commit: "🔗 [US7] ナビゲーションへ会社概要リンク追加"

### Test Execution & Bug Fixing for User Story 7

- [ ] T083 [US7] Run E2E test using chrome-dev MCP
  - Run: T080 test - About page
  - Record: Test results
  - If FAIL: Fix and re-run
  - Commit: "✅ [US7] E2Eテスト実行・修正完了"

**Checkpoint**: User Story 7 complete - About page functional

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple user stories, final optimizations

- [ ] T084 [P] Add Plausible Analytics integration
  - Update: `app/layout.tsx` - Add Plausible script tag
  - Configure: data-domain with actual domain
  - Add: Custom event tracking for form submissions, phone clicks
  - Verify: Analytics script loads
  - Commit: "📊 Plausible Analytics統合完了"

- [ ] T085 [P] Add Google Tag Manager for Meta Pixel
  - Update: `app/layout.tsx` - Add GTM container
  - Configure: GTM with Meta Pixel tag
  - Add: dataLayer events for conversions
  - Verify: GTM loads and Meta Pixel fires
  - Commit: "📈 Google Tag Manager・Meta Pixel統合"

- [ ] T086 [P] Optimize images using Next.js Image component
  - Audit: All `<img>` tags → Replace with `<Image>`
  - Add: width/height props to prevent CLS
  - Add: priority to hero images
  - Add: placeholder="blur" where appropriate
  - Verify: Lighthouse CLS score <0.1
  - Commit: "🖼️ 画像最適化完了"

- [ ] T087 [P] Implement font optimization with next/font
  - Update: `app/layout.tsx` - Use Noto_Sans_JP from next/font
  - Configure: font-display: swap
  - Remove: Any external font links
  - Verify: Fonts load without FOIT
  - Commit: "🔤 フォント最適化完了"

- [ ] T088 Run comprehensive Lighthouse audits on all pages
  - Run: Lighthouse on homepage, services, case studies, contact, pricing, process, faq, blog, about
  - Target: Performance >90, Accessibility 100, Best Practices 100, SEO 100
  - Fix: Any failing metrics
  - Commit: "⚡ 全ページLighthouse最適化完了"

- [ ] T089 [P] Accessibility audit with axe DevTools
  - Install: axe DevTools browser extension
  - Audit: All pages for WCAG AA violations
  - Fix: Color contrast, ARIA labels, keyboard navigation issues
  - Verify: 0 violations on all pages
  - Commit: "♿ アクセシビリティ監査・修正完了"

- [ ] T090 [P] Mobile responsiveness testing
  - Test: All pages on mobile viewports (375x667, 414x896)
  - Verify: Touch targets ≥44px
  - Verify: No horizontal scroll
  - Fix: Any responsive layout issues
  - Commit: "📱 モバイルレスポンシブ対応完了"

- [ ] T091 [P] Setup Vercel project and deployment (static export)
  - Run: `npm run build` to generate static export in `out/` directory
  - Verify: Static HTML files generated in `out/`
  - Create: Vercel project from GitHub repo
  - Configure: Build command: `npm run build`, Output directory: `out`
  - Configure: Environment variables (RESEND_API_KEY, etc.) for API routes
  - Deploy: To production as static site
  - Configure: Custom domain (optional)
  - Verify: Site accessible at Vercel URL, all pages load as static HTML
  - Commit: "🚀 Vercel静的サイトデプロイ設定完了"

- [ ] T092 [P] Browser compatibility testing
  - Test: Chrome, Safari, Firefox (latest versions)
  - Verify: All functionality works across browsers
  - Fix: Any browser-specific issues
  - Commit: "🌐 ブラウザ互換性テスト完了"

- [ ] T093 Cross-browser E2E test run using chrome-dev MCP
  - Run: All E2E tests (T021-T080) on production URL
  - Record: Final test results
  - Fix: Any production-specific issues
  - Commit: "✅ 本番環境E2Eテスト完了"

- [ ] T094 [P] Code cleanup and refactoring
  - Remove: Unused imports, commented code
  - Refactor: Duplicate code into shared utilities
  - Verify: No console errors or warnings
  - Commit: "🧹 コードクリーンアップ完了"

- [ ] T095 [P] Update README.md with quickstart instructions
  - Update: `README.md` with project setup steps
  - Add: Environment variable documentation
  - Add: Development workflow
  - Add: Deployment instructions
  - Verify: README accurate and complete
  - Commit: "📚 README更新完了"

- [ ] T096 Final validation against quickstart.md
  - Review: `/specs/001-web/quickstart.md`
  - Verify: All steps completed
  - Verify: All success criteria met
  - Commit: "✅ 最終検証完了"

**Checkpoint**: All phases complete - Site ready for production launch

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) → Phase 2 (Foundational)
                      ↓
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
    Phase 3       Phase 4       Phase 5  (P1 User Stories - can parallelize)
      (US1)         (US2)         (US3)
        ↓             ↓             ↓
    Phase 6       Phase 7           (P2 User Stories - can parallelize)
      (US4)         (US5)
        ↓             ↓
    Phase 8       Phase 9           (P3 User Stories - can parallelize)
      (US6)         (US7)
        └─────────────┬─────────────┘
                      ↓
                 Phase 10 (Polish)
```

### Critical Path (MVP - User Story 1 Only)

1. **Setup (Phase 1)**: T001-T008 (8 tasks)
2. **Foundational (Phase 2)**: T009-T020 (12 tasks)
3. **User Story 1 (Phase 3)**: T021-T034 (14 tasks)
4. **Selected Polish**: T088, T089, T091 (3 tasks)

**Total MVP Tasks**: 37 tasks

### User Story Dependencies

- **US1** (Homepage, Services, Pricing): No dependencies
- **US2** (Case Studies): Integrates with US1 (links from homepage/services) but independently testable
- **US3** (Contact Forms): Integrates with US1, US2 (CTAs) but independently testable
- **US4** (Process Page): Independent, only needs foundational components
- **US5** (FAQ): Independent, only needs foundational components
- **US6** (Blog): Independent, only needs foundational components
- **US7** (About): Independent, only needs foundational components

### Parallel Opportunities

#### Within Setup (Phase 1)
- T001, T002, T003, T004, T005, T006, T007, T008 - All can run in parallel

#### Within Foundational (Phase 2)
- T010, T011, T012, T013, T014, T016, T020 - Can run in parallel after T009

#### Within Each User Story
- E2E tests marked [P] can run in parallel
- Component creation marked [P] can run in parallel
- Example US1: T021, T022, T023, T024 (tests) → T025, T026, T027 (components) can parallelize

#### Across User Stories (after Foundational)
- Team A: US1 (T021-T034)
- Team B: US2 (T035-T045)
- Team C: US3 (T046-T060)
- All can work simultaneously after Phase 2 completes

---

## Parallel Example: MVP (User Story 1)

```bash
# After Foundational Phase (T020) completes:

# Step 1: Launch all E2E tests together (parallel)
[playwright] T021: E2E test - Homepage hero section
[playwright] T022: E2E test - Services overview
[playwright] T023: E2E test - Pricing page
[playwright] T024: E2E test - Contact CTAs

# Step 2: Launch all component/content creation together (parallel)
[implementation] T025: Create service MDX files
[implementation] T026: Create HeroSection component
[implementation] T027: Create ServiceCard component

# Step 3: Sequential integration
[implementation] T028: Create homepage (integrates hero + services)
[implementation] T029: Create service pages
[implementation] T030: Create pricing page
[implementation] T031: Integrate into layout

# Step 4: Test execution (sequential - requires running server)
[chrome-dev] T032: Run all E2E tests
[chrome-dev] T033: Fix bugs if tests fail (iterate)
[chrome-dev] T034: Lighthouse audit
```

---

## Implementation Strategy

### MVP First (P1 User Story 1 Only) - 37 Tasks

**Target**: 2-3 weeks for single developer

1. **Week 1**: Setup + Foundational (T001-T020) - 20 tasks
2. **Week 2-3**: User Story 1 (T021-T034) - 14 tasks + selected polish (3 tasks)
3. **STOP and VALIDATE**: Test US1 independently using E2E tests
4. Deploy to Vercel, demo homepage/services/pricing
5. Get feedback before proceeding to US2

### Incremental Delivery (All P1 Stories) - 57 Tasks

**Target**: 4-6 weeks for single developer

1. Complete Setup + Foundational → Foundation ready (20 tasks)
2. Add User Story 1 → Test independently → Deploy/Demo (14 tasks) ✓ MVP
3. Add User Story 2 → Test independently → Deploy/Demo (11 tasks)
4. Add User Story 3 → Test independently → Deploy/Demo (15 tasks)
5. Polish (selected tasks from Phase 10) → Final deployment

### Full Feature (All 7 User Stories) - 96 Tasks

**Target**: 8-10 weeks for single developer, 4-5 weeks with 3-person team

1. Setup + Foundational (20 tasks)
2. P1 Stories (US1-US3) - Sequential or parallel (40 tasks)
3. P2 Stories (US4-US5) - Parallel (11 tasks)
4. P3 Stories (US6-US7) - Parallel (12 tasks)
5. Polish & Integration (13 tasks)

### Parallel Team Strategy (3 Developers)

**Target**: 4-5 weeks with parallel execution

1. **Weeks 1-2**: All team members complete Setup + Foundational together (20 tasks)
2. **Week 2-3**: Once Foundational done:
   - Developer A: User Story 1 (T021-T034)
   - Developer B: User Story 2 (T035-T045)
   - Developer C: User Story 3 (T046-T060)
3. **Week 3-4**: Continue with P2/P3 stories split across team
4. **Week 4-5**: Polish & integration, final testing, deployment

---

## Test-Driven Development (TDD) Workflow

### Per User Story

1. **Write E2E Tests First**: Create all test files for the story (marked with [P] can run in parallel)
2. **Run Tests - Expect Failures**: Use chrome-dev MCP, all tests should FAIL (red phase)
3. **Implement Feature**: Build components, pages, API routes for the story
4. **Run Tests - Iterate**: Use chrome-dev MCP, fix bugs until tests PASS (green phase)
5. **Refactor**: Clean up code while keeping tests passing
6. **Commit**: Japanese commit message after each task or logical group
7. **Checkpoint**: Verify story works independently before moving to next

### Test Execution Commands

```bash
# During development (expect failures initially)
npx playwright test tests/e2e/us1-*.spec.ts

# After implementation (expect passes)
npx playwright test tests/e2e/us1-*.spec.ts --reporter=html

# Using chrome-dev MCP for interactive debugging
# Call chrome-dev MCP tool with test file path and breakpoints
```

### Git Commit Strategy (Japanese Messages)

```bash
# After T001
git add .
git commit -m "🎉 Next.js 16プロジェクト初期化完了"

# After T021-T024 (E2E tests)
git add tests/e2e/us1-*.spec.ts
git commit -m "🧪 [US1] E2Eテスト作成完了 (4ファイル)"

# After T025-T027 (Components)
git add components/features/
git commit -m "🎨 [US1] ヒーロー・サービスカードコンポーネント作成"

# After T032 (Test pass)
git add .
git commit -m "✅ [US1] E2Eテスト全通過・バグ修正完了"

# After completing US1
git add .
git commit -m "🎯 [US1] ユーザーストーリー1完了 (ホームページ・サービス・料金)"
```

---

## Success Criteria

### Per User Story

- **US1**: Homepage, services, pricing pages render correctly, Lighthouse >90, E2E tests pass
- **US2**: Case studies listing and detail pages functional, 2+ case studies visible, E2E tests pass
- **US3**: Inquiry and booking forms submit successfully, email confirmations sent, E2E tests pass
- **US4**: Process page displays 6 phases with timelines, E2E tests pass
- **US5**: FAQ page shows 10-15 questions organized by category, E2E tests pass
- **US6**: Blog listing and posts render, 3+ posts published, E2E tests pass
- **US7**: About page displays background and service areas, E2E tests pass

### Overall Project

- All 96 tasks completed
- All E2E tests passing (40+ test files)
- Lighthouse scores: Performance >90, Accessibility 100, Best Practices 100, SEO 100
- Site deployed to Vercel and accessible
- All functional requirements from spec.md met
- No console errors or warnings
- Mobile-responsive on all pages
- Git commit history in Japanese documenting progress

---

## Notes

- **[P] tasks**: Different files, no dependencies, can run in parallel
- **[Story] labels**: Maps task to user story (US1-US7) for traceability
- **TDD approach**: Tests before implementation, expect failures initially
- **Chrome-dev MCP**: Used for E2E test execution and debugging
- **Playwright MCP**: Used for E2E test creation following best practices
- **Commit strategy**: Japanese messages after each task or logical group
- **Bug fixing**: Iterate on failed tests until passing (green phase)
- **Independent stories**: Each story should be completable and testable on its own
- **Checkpoints**: Validate after each user story phase before proceeding
- **MVP scope**: Focus on User Story 1 only for initial launch (37 tasks)
