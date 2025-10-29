# Data Model: Fukui Freelance Web Development Site

**Project**: Fukui-based Freelance Web Development Marketing Website
**Date**: October 2025
**Status**: Phase 1 Design

---

## Entity Relationship Overview

```
┌──────────────────┐
│   ServiceArea    │
└──────────────────┘
         │
         │
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ ServiceOffering  │────▶│   CaseStudy      │────▶│    Inquiry       │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │                        │
         │                        │
         ▼                        ▼
┌──────────────────┐     ┌──────────────────┐
│   HeroCopyOption │     │   BlogPost       │
└──────────────────┘     └──────────────────┘
         │
         │
         ▼
┌──────────────────┐
│     FAQEntry     │
└──────────────────┘

┌──────────────────┐
│ ConsultationBook │
└──────────────────┘
```

---

## 1. ServiceOffering

**Purpose**: Represents a specific service category offered to clients (Web Production, System Development, Maintenance).

### Attributes

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | Yes | UUID | Unique identifier |
| `name` | string | Yes | 1-100 chars | Service name (e.g., "Web制作", "システム開発") |
| `slug` | string | Yes | URL-safe | URL slug (e.g., "web-seisaku") |
| `description` | string | Yes | 1-500 chars | Brief description for service overview |
| `fullDescription` | string | Yes | Rich text/MDX | Detailed service description |
| `targetPersonas` | string[] | Yes | 1-10 items | Target customer types (e.g., ["restaurants", "salons", "photographers"]) |
| `typicalDeliverables` | string[] | Yes | 1-20 items | What's included (e.g., ["レスポンシブデザイン", "SEO対策"]) |
| `pricingTierInfo` | PricingTier | Yes | Object | Pricing range information |
| `relatedCaseStudyIds` | string[] | No | UUID array | References to related case studies |
| `iconName` | string | No | Icon identifier | Icon for UI display |
| `displayOrder` | number | Yes | Integer | Order on homepage (1-based) |
| `featured` | boolean | Yes | Boolean | Show on homepage |
| `createdAt` | Date | Yes | ISO 8601 | Creation timestamp |
| `updatedAt` | Date | Yes | ISO 8601 | Last update timestamp |

### Nested Types

**PricingTier**:
```typescript
{
  tierName: string;          // e.g., "スタンダード", "プレミアム"
  priceRangeMin: number;     // e.g., 300000 (¥300,000)
  priceRangeMax: number;     // e.g., 500000 (¥500,000)
  included: string[];        // What's included in this tier
  optional: string[];        // Optional add-ons
}
```

### Validation Rules
- `name` must be unique across all services
- `slug` must be URL-safe (lowercase, hyphens only)
- `pricingTierInfo.priceRangeMin` must be less than `priceRangeMax`
- `targetPersonas` must contain at least one persona

### State Transitions
- **Draft** → **Published** (when service page content complete)
- **Published** → **Archived** (when service no longer offered)

---

## 2. CaseStudy

**Purpose**: Represents a past client project showcased to build trust and demonstrate results.

### Attributes

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | Yes | UUID | Unique identifier |
| `title` | string | Yes | 1-200 chars | Case study title (e.g., "美容室予約システムで予約40%増加") |
| `slug` | string | Yes | URL-safe | URL slug for detail page |
| `clientType` | string | Yes | 1-100 chars | Anonymized client type (e.g., "福井市内の美容室") |
| `industry` | string | Yes | Enum | Industry category (restaurant, salon, photographer, etc.) |
| `projectGoals` | string[] | Yes | 1-10 items | Client objectives |
| `beforeSituation` | string | Yes | Rich text/MDX | Situation before project |
| `afterSituation` | string | Yes | Rich text/MDX | Situation after project |
| `measurableResults` | KPI[] | Yes | 1-10 items | Specific KPIs achieved |
| `projectDuration` | Duration | Yes | Object | Timeline information |
| `budgetRange` | BudgetRange | Yes | Object | Cost information |
| `servicesUsed` | string[] | Yes | Service IDs | Related ServiceOffering IDs |
| `screenshots` | Image[] | No | 0-10 items | Project images (with permission) |
| `testimonial` | Testimonial | No | Object | Client quote (if permitted) |
| `confidential` | boolean | Yes | Boolean | Whether client name is hidden |
| `featured` | boolean | Yes | Boolean | Show on homepage |
| `publishedAt` | Date | Yes | ISO 8601 | Publication date |
| `createdAt` | Date | Yes | ISO 8601 | Creation timestamp |
| `updatedAt` | Date | Yes | ISO 8601 | Last update timestamp |

### Nested Types

**KPI**:
```typescript
{
  metric: string;           // e.g., "予約数", "売上", "問い合わせ数"
  beforeValue: string;      // e.g., "月10件"
  afterValue: string;       // e.g., "月14件"
  percentageChange: number; // e.g., 40 (for 40% increase)
  timeframe: string;        // e.g., "3ヶ月後"
}
```

**Duration**:
```typescript
{
  weeks: number;            // Total project weeks
  phases: {
    phaseName: string;
    weeks: number;
  }[];
}
```

**BudgetRange**:
```typescript
{
  min: number;              // Minimum budget (¥)
  max: number;              // Maximum budget (¥)
  displayText: string;      // e.g., "30万円〜50万円"
}
```

**Image**:
```typescript
{
  url: string;              // Image URL
  alt: string;              // Accessibility alt text
  caption: string;          // Optional caption
  width: number;
  height: number;
}
```

**Testimonial**:
```typescript
{
  quote: string;            // Client quote
  authorName: string;       // Client name (or anonymous)
  authorTitle: string;      // e.g., "オーナー"
}
```

### Validation Rules
- `title` must be unique across all case studies
- `slug` must be URL-safe (lowercase, hyphens only)
- `measurableResults` must contain at least one KPI
- `budgetRange.min` must be less than `max`
- `projectDuration.weeks` must match sum of phase weeks
- `screenshots` require explicit permission flag

### State Transitions
- **Draft** → **Review** (when content complete)
- **Review** → **Published** (when client approval received)
- **Published** → **Archived** (when outdated or client requests removal)

---

## 3. Inquiry

**Purpose**: Represents a potential client who has submitted the inquiry form.

### Attributes

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | Yes | UUID | Unique identifier |
| `companyName` | string | Yes | 1-200 chars | Company/business name |
| `contactName` | string | Yes | 1-100 chars | Contact person name |
| `email` | string | Yes | Valid email | Email address |
| `phone` | string | Yes | Valid JP phone | Phone number |
| `location` | string | Yes | 1-100 chars | City/municipality (e.g., "福井市") |
| `inquiryType` | string | Yes | Enum | Service type (web, system, maintenance) |
| `projectGoals` | string[] | Yes | 1-10 items | Project objectives (lead generation, efficiency, etc.) |
| `budgetRange` | string | Yes | Enum | Budget range selection |
| `desiredTimeline` | string | Yes | 1-500 chars | Timeline expectations |
| `referenceSiteUrls` | string[] | No | 0-5 URLs | Reference website URLs |
| `subsidyConsultation` | boolean | Yes | Boolean | Interested in subsidy consultation |
| `preferredContactMethod` | string | Yes | Enum | Preferred contact (email, phone, LINE) |
| `message` | string | No | 0-2000 chars | Additional message |
| `source` | string | Yes | String | Traffic source (organic, referral, etc.) |
| `responseStatus` | string | Yes | Enum | Response status (pending, contacted, qualified, closed) |
| `responseNotes` | string | No | 0-5000 chars | Internal notes from freelancer |
| `submittedAt` | Date | Yes | ISO 8601 | Submission timestamp |
| `respondedAt` | Date | No | ISO 8601 | First response timestamp |
| `createdAt` | Date | Yes | ISO 8601 | Creation timestamp |
| `updatedAt` | Date | Yes | ISO 8601 | Last update timestamp |

### Enums

**InquiryType**: `"web" | "system" | "maintenance" | "multiple"`

**BudgetRange**:
```typescript
"under-300k"      // 〜30万円
"300k-500k"       // 30万円〜50万円
"500k-1m"         // 50万円〜100万円
"1m-3m"           // 100万円〜300万円
"over-3m"         // 300万円以上
"undecided"       // 未定
```

**PreferredContactMethod**: `"email" | "phone" | "line"`

**ResponseStatus**: `"pending" | "contacted" | "qualified" | "proposal_sent" | "closed_won" | "closed_lost"`

### Validation Rules
- `email` must be valid email format
- `phone` must match Japanese phone number regex: `/^[0-9-]+$/`
- `referenceSiteUrls` must be valid URLs if provided
- `desiredTimeline` maximum 500 characters
- `message` maximum 2000 characters
- Auto-reply email must be sent within 1 minute of submission

### State Transitions
1. **Pending** (initial state after submission)
2. **Contacted** (freelancer has reached out)
3. **Qualified** (serious prospect, project scope discussed)
4. **Proposal Sent** (formal proposal delivered)
5. **Closed Won** (converted to paying client)
6. **Closed Lost** (prospect declined or unresponsive)

---

## 4. ConsultationBooking

**Purpose**: Represents a scheduled free consultation request.

### Attributes

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | Yes | UUID | Unique identifier |
| `companyName` | string | Yes | 1-200 chars | Company/business name |
| `contactName` | string | Yes | 1-100 chars | Contact person name |
| `email` | string | Yes | Valid email | Email address |
| `phone` | string | Yes | Valid JP phone | Phone number |
| `preferredFormat` | string | Yes | Enum | Online or in-person |
| `preferredDateRanges` | DateRange[] | Yes | 1-5 items | Preferred date/time options |
| `needsDescription` | string | Yes | 1-1000 chars | Brief project description |
| `location` | string | Conditional | 1-100 chars | Required if in-person format |
| `confirmedDateTime` | Date | No | ISO 8601 | Confirmed booking time |
| `meetingLink` | string | No | URL | Online meeting link (if online format) |
| `bookingStatus` | string | Yes | Enum | Booking status |
| `cancellationReason` | string | No | 0-500 chars | Reason if cancelled |
| `submittedAt` | Date | Yes | ISO 8601 | Submission timestamp |
| `confirmedAt` | Date | No | ISO 8601 | Confirmation timestamp |
| `createdAt` | Date | Yes | ISO 8601 | Creation timestamp |
| `updatedAt` | Date | Yes | ISO 8601 | Last update timestamp |

### Nested Types

**DateRange**:
```typescript
{
  startDate: Date;          // Start of availability window
  endDate: Date;            // End of availability window
  timeOfDay: string;        // "morning" | "afternoon" | "evening" | "anytime"
}
```

### Enums

**PreferredFormat**: `"online" | "in-person"`

**BookingStatus**: `"pending" | "confirmed" | "completed" | "cancelled" | "no_show"`

### Validation Rules
- `location` is required when `preferredFormat` is "in-person"
- `location` must be within Fukui Prefecture service area
- `preferredDateRanges` must have at least 1 option, maximum 5
- `needsDescription` maximum 1000 characters
- Confirmation email must be sent within 1 minute of submission

### State Transitions
1. **Pending** (awaiting freelancer confirmation)
2. **Confirmed** (booking confirmed with specific date/time)
3. **Completed** (consultation took place)
4. **Cancelled** (cancelled by either party)
5. **No Show** (client didn't attend confirmed booking)

---

## 5. FAQEntry

**Purpose**: Represents a frequently asked question and its answer.

### Attributes

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | Yes | UUID | Unique identifier |
| `question` | string | Yes | 1-300 chars | Question text |
| `answer` | string | Yes | Rich text/MDX | Answer text |
| `category` | string | Yes | Enum | Topic category |
| `displayOrder` | number | Yes | Integer | Order on FAQ page (1-based) |
| `relatedFAQIds` | string[] | No | UUID array | Related FAQ entries |
| `published` | boolean | Yes | Boolean | Visibility status |
| `viewCount` | number | Yes | Integer | Track popularity |
| `createdAt` | Date | Yes | ISO 8601 | Creation timestamp |
| `updatedAt` | Date | Yes | ISO 8601 | Last update timestamp |

### Enums

**Category**:
```typescript
"pricing"          // 価格・費用
"timeline"         // 制作期間
"content"          // コンテンツ・素材
"subsidies"        // 補助金
"maintenance"      // 保守・運用
"technical"        // 技術仕様
"process"          // 制作フロー
"other"            // その他
```

### Validation Rules
- `question` must end with "?" or "?" (Japanese question mark)
- `category` must be valid enum value
- `displayOrder` must be unique within same category
- Minimum 10 FAQ entries required for launch (FR-023)

---

## 6. BlogPost

**Purpose**: Represents content published in the blog/column section.

### Attributes

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | Yes | UUID | Unique identifier |
| `title` | string | Yes | 1-200 chars | Blog post title |
| `slug` | string | Yes | URL-safe | URL slug |
| `excerpt` | string | Yes | 1-300 chars | Summary for listing page |
| `content` | string | Yes | Rich text/MDX | Full post content |
| `featuredImage` | Image | No | Object | Hero image |
| `category` | string | Yes | Enum | Content category |
| `tags` | string[] | No | 0-10 items | Search tags |
| `author` | string | Yes | 1-100 chars | Author name (freelancer) |
| `relatedCaseStudyIds` | string[] | No | UUID array | Related case studies |
| `relatedServiceIds` | string[] | No | UUID array | Related services |
| `ctaText` | string | No | 1-100 chars | Call-to-action text |
| `ctaLink` | string | No | URL | Call-to-action link |
| `seoMetaDescription` | string | Yes | 1-160 chars | Meta description for SEO |
| `published` | boolean | Yes | Boolean | Publication status |
| `publishedAt` | Date | Conditional | ISO 8601 | Publication date (required if published) |
| `viewCount` | number | Yes | Integer | Track popularity |
| `createdAt` | Date | Yes | ISO 8601 | Creation timestamp |
| `updatedAt` | Date | Yes | ISO 8601 | Last update timestamp |

### Enums

**Category**:
```typescript
"marketing-tips"          // マーケティング・集客
"subsidy-info"           // 補助金情報
"case-study-deep-dive"   // 制作事例詳細
"technical-insights"     // 技術解説
"local-business"         // 福井・地域ビジネス
"industry-news"          // 業界ニュース
```

### Validation Rules
- `title` must be unique across all blog posts
- `slug` must be URL-safe (lowercase, hyphens only)
- `seoMetaDescription` must be 120-160 characters for optimal SEO
- `publishedAt` is required when `published` is true
- `tags` maximum 10 items

---

## 7. ServiceArea

**Purpose**: Represents geographic coverage for in-person visits and service delivery.

### Attributes

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | Yes | UUID | Unique identifier |
| `cityName` | string | Yes | 1-100 chars | City/municipality name (e.g., "福井市") |
| `prefecture` | string | Yes | 1-50 chars | Prefecture (default: "福井県") |
| `inPersonAvailable` | boolean | Yes | Boolean | In-person visit availability |
| `featured` | boolean | Yes | Boolean | Show prominently on site |
| `population` | number | No | Integer | City population (for SEO) |
| `coordinates` | GeoCoordinates | No | Object | Lat/long for maps |
| `displayOrder` | number | Yes | Integer | Order on service area list |
| `createdAt` | Date | Yes | ISO 8601 | Creation timestamp |
| `updatedAt` | Date | Yes | ISO 8601 | Last update timestamp |

### Nested Types

**GeoCoordinates**:
```typescript
{
  latitude: number;         // e.g., 36.0652
  longitude: number;        // e.g., 136.2217
}
```

### Validation Rules
- `cityName` must be unique within same prefecture
- All Fukui Prefecture cities must be included (FR-043): 福井市, 鯖江市, 越前市, 敦賀市, 坂井市, 小浜市, あわら市, 勝山市, 大野市
- `coordinates` required for featured cities (for LocalBusiness schema)

---

## 8. HeroCopyOption

**Purpose**: Represents one of the approved hero section headline variations for A/B testing.

### Attributes

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | string | Yes | UUID | Unique identifier |
| `headline` | string | Yes | 1-100 chars | Main headline text |
| `subheading` | string | No | 1-200 chars | Supporting subheading |
| `ctaButtonText` | string | Yes | 1-50 chars | Call-to-action button text |
| `ctaButtonLink` | string | Yes | URL/path | CTA destination |
| `backgroundImage` | Image | No | Object | Hero background image |
| `usagePriority` | number | Yes | Integer | Priority order (1 = primary) |
| `active` | boolean | Yes | Boolean | Currently in use |
| `testingStatus` | string | Yes | Enum | A/B testing status |
| `conversionRate` | number | No | Float | Tracked conversion rate |
| `impressions` | number | Yes | Integer | Number of views |
| `createdAt` | Date | Yes | ISO 8601 | Creation timestamp |
| `updatedAt` | Date | Yes | ISO 8601 | Last update timestamp |

### Enums

**TestingStatus**: `"draft" | "testing" | "winner" | "archived"`

### Validation Rules
- Only one hero copy can have `active: true` at a time
- `usagePriority` must be unique across all hero copies
- `headline` maximum 100 characters for optimal mobile display

---

## Data Storage Strategy

### MDX Files (Content Layer)
Store in `content/` directory for version control and easy editing:

```
content/
├── case-studies/
│   ├── beauty-salon-reservation-system.mdx
│   ├── cafe-takeout-ordering.mdx
│   └── photographer-portfolio-gallery.mdx
├── blog/
│   ├── fukui-web-subsidy-guide-2025.mdx
│   ├── local-seo-tips-small-business.mdx
│   └── reservation-system-benefits.mdx
├── faq/
│   ├── pricing.json
│   ├── timeline.json
│   └── maintenance.json
└── services/
    ├── web-seisaku.mdx
    ├── system-kaihatsu.mdx
    └── maintenance.mdx
```

**Frontmatter Format** (Case Study Example):
```yaml
---
id: "550e8400-e29b-41d4-a716-446655440000"
title: "美容室予約システムで予約40%増加"
slug: "beauty-salon-reservation-system"
clientType: "福井市内の美容室"
industry: "salon"
projectGoals: ["予約管理の効率化", "無断キャンセル削減", "顧客データ分析"]
measurableResults:
  - metric: "予約数"
    beforeValue: "月10件"
    afterValue: "月14件"
    percentageChange: 40
    timeframe: "3ヶ月後"
projectDuration:
  weeks: 3
  phases:
    - phaseName: "要件定義・設計"
      weeks: 1
    - phaseName: "実装・テスト"
      weeks: 1
    - phaseName: "リリース・運用開始"
      weeks: 1
budgetRange:
  min: 300000
  max: 500000
  displayText: "30万円〜50万円"
servicesUsed: ["system-kaihatsu"]
confidential: true
featured: true
publishedAt: "2025-10-15"
---
```

### Database (Transactional Data)
Store in Vercel Postgres or Vercel KV for form submissions:

**Inquiry Table**:
```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  inquiry_type VARCHAR(50) NOT NULL,
  project_goals JSONB NOT NULL,
  budget_range VARCHAR(50) NOT NULL,
  desired_timeline TEXT NOT NULL,
  reference_site_urls JSONB,
  subsidy_consultation BOOLEAN NOT NULL,
  preferred_contact_method VARCHAR(50) NOT NULL,
  message TEXT,
  source VARCHAR(100) NOT NULL,
  response_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  response_notes TEXT,
  submitted_at TIMESTAMP NOT NULL,
  responded_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status ON inquiries(response_status);
CREATE INDEX idx_inquiries_submitted ON inquiries(submitted_at DESC);
```

**ConsultationBookings Table**:
```sql
CREATE TABLE consultation_bookings (
  id UUID PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  preferred_format VARCHAR(50) NOT NULL,
  preferred_date_ranges JSONB NOT NULL,
  needs_description TEXT NOT NULL,
  location VARCHAR(100),
  confirmed_date_time TIMESTAMP,
  meeting_link TEXT,
  booking_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  cancellation_reason TEXT,
  submitted_at TIMESTAMP NOT NULL,
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_status ON consultation_bookings(booking_status);
CREATE INDEX idx_bookings_submitted ON consultation_bookings(submitted_at DESC);
```

---

## API Contracts Reference

See `contracts/` directory for:
- `inquiry-api.yaml` - Inquiry form submission endpoint spec
- `booking-api.yaml` - Consultation booking endpoint spec
- `email-api.yaml` - Email sending integration spec

---

## Migration Notes

**MVP Phase (Phase 1)**:
- Use MDX files for all content entities (CaseStudy, BlogPost, FAQEntry, ServiceOffering)
- Use Vercel Postgres for transactional entities (Inquiry, ConsultationBooking)
- ServiceArea and HeroCopyOption can be hardcoded in configuration initially

**Future Migration Path (Post-MVP)**:
- Consider microCMS if non-technical editor needed for content management
- Migration strategy: Export MDX frontmatter to CMS API format
- Minimal code changes required (same data structure)
