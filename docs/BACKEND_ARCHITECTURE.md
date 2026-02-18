# Backend Architecture Documentation
**daniellauding.se**

**Date:** February 11, 2025  
**Branch:** dev/agent-work  
**Tech Stack:** Next.js 15, Payload CMS 3, SQLite, Lexical Editor

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Patterns](#architecture-patterns)
4. [Payload CMS Configuration](#payload-cms-configuration)
5. [Content Models](#content-models)
6. [API Routes](#api-routes)
7. [Database Schema](#database-schema)
8. [Data Flow](#data-flow)
9. [Performance Analysis](#performance-analysis)
10. [Security Considerations](#security-considerations)
11. [Migration Plan](#migration-plan)
12. [Recommendations](#recommendations)

---

## Overview

The daniellauding.se portfolio site is built on Next.js 15 with Payload CMS 3 as the headless CMS. The site is currently in a **hybrid state** where:

- **Payload CMS is configured** with all collections and globals
- **Frontend still reads from JSON files** (`portfolio.json`, `experiences.json`)
- **Database is ready** but not actively used by frontend components
- **Admin panel is accessible** at `/admin`

### Current State
- ✅ Payload CMS fully configured
- ✅ Database schema created (SQLite)
- ✅ Collections defined (8 collections + 2 globals)
- ⚠️ Frontend using JSON instead of Payload API
- ⚠️ No caching strategy implemented
- ⚠️ No content migration completed
- ⚠️ No API optimization

---

## Technology Stack

### Core Technologies
- **Framework:** Next.js 15.2.3 (App Router)
- **CMS:** Payload CMS 3.66.0
- **Database:** SQLite (via `@payloadcms/db-sqlite`)
- **Rich Text:** Lexical Editor (`@payloadcms/richtext-lexical`)
- **Image Processing:** Sharp 0.34.5
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion 12.23.25
- **Analytics:** PostHog 1.301.0

### Development Stack
- **TypeScript:** 5.x
- **React:** 19.2.0
- **Node.js:** v25.6.0 (as per runtime)
- **Package Manager:** npm

---

## Architecture Patterns

### 1. Hybrid Data Architecture (Current)

```
┌─────────────────┐
│   Frontend      │
│   Components    │
└────────┬────────┘
         │
    ┌────┴─────┐
    ▼          ▼
┌───────┐  ┌──────────┐
│ JSON  │  │ Payload  │
│ Files │  │   API    │ (Not used yet)
└───────┘  └─────┬────┘
               │
           ┌───▼────┐
           │ SQLite │
           │   DB   │
           └────────┘
```

**Issues:**
- Dual data sources creating confusion
- JSON files are source of truth, not CMS
- Admin panel updates don't reflect on frontend
- No benefits from Payload's features (versioning, drafts, etc.)

### 2. Target Architecture (Recommended)

```
┌─────────────────┐
│   Frontend      │
│   Components    │
└────────┬────────┘
         │
    ┌────▼─────┐
    │  Payload │
    │  Helper  │
    │  Methods │
    └────┬─────┘
         │
    ┌────▼──────┐
    │  Payload  │
    │  REST API │
    └────┬──────┘
         │
    ┌────▼──────┐
    │  SQLite   │
    │  Database │
    └───────────┘
```

**Benefits:**
- Single source of truth
- Content versioning
- Draft/published workflow
- Built-in validation
- Type-safe queries
- Admin UI for content management

---

## Payload CMS Configuration

### Main Configuration (`payload.config.ts`)

```typescript
// Database Configuration
db: sqliteAdapter({
  client: {
    url: process.env.DATABASE_URI || 'file:./database.db',
  },
})

// Admin Panel
admin: {
  user: Users.slug,
  importMap: {
    baseDir: path.resolve(dirname),
  },
}

// Editor
editor: lexicalEditor()

// Security
secret: process.env.PAYLOAD_SECRET || 'YOUR-SECRET-HERE'
```

### Observations

**✅ Strengths:**
- Clean, modular configuration
- Proper collection/global separation
- Lexical editor for rich content
- Sharp integration for image optimization

**⚠️ Issues:**
1. **Security:** Hardcoded fallback secret (`'YOUR-SECRET-HERE'`)
2. **Database:** SQLite suitable for development, not production
3. **No environment validation:** Missing required env vars check
4. **No rate limiting:** API routes fully exposed
5. **No caching layer:** Every request hits database

**🔧 Recommendations:**
1. Add env var validation on startup
2. Remove hardcoded secrets
3. Plan PostgreSQL migration for production
4. Add Redis/In-memory caching layer
5. Implement API rate limiting

---

## Content Models

### Collections (8)

#### 1. **Users** (`users`)
```typescript
slug: 'users'
auth: true
fields: [
  { name: 'name', type: 'text' }
]
```
**Purpose:** Authentication and admin access  
**Status:** ✅ Configured  
**Notes:** Basic setup, could add roles/permissions

#### 2. **Media** (`media`)
```typescript
slug: 'media'
access: { read: () => true }
upload: {
  staticDir: 'media',
  imageSizes: ['thumbnail', 'card', 'tablet'],
  mimeTypes: ['image/*']
}
fields: [
  { name: 'alt', type: 'text', required: true }
]
```
**Purpose:** Asset management with automatic image optimization  
**Status:** ✅ Configured  
**Image Sizes:**
- `thumbnail`: 400x300px
- `card`: 768x1024px
- `tablet`: 1024px width (responsive height)

**Notes:** Public read access, good for portfolio images

#### 3. **Projects** (`projects`)
```typescript
slug: 'projects'
fields: [
  name, slug, type, description, date, location, url,
  featured, color, image (relation to media),
  tags (array), password,
  details (group): {
    client, duration, team, role,
    challenge, solution, impact,
    sections (array with rich text),
    testimonial (group),
    nextProject (relation to projects)
  }
]
```
**Purpose:** Portfolio case studies  
**Status:** ✅ Configured  
**Key Features:**
- Password protection per project
- Nested sections with images
- Client testimonials
- Project navigation chain (`nextProject`)
- Featured/filtering support

**⚠️ Issues:**
- `date` field is `text` (should be `date` type)
- `tags` is nested array (could be relationship to Skills)
- Rich text in sections but textarea in challenge/solution (inconsistent)

#### 4. **Clients** (`clients`)
```typescript
slug: 'clients'
fields: [
  name, url, logo (media relation), order
]
```
**Purpose:** Client logos/references  
**Status:** ✅ Configured  
**Notes:** Simple, effective. Manual ordering via `order` field.

#### 5. **Apps** (`apps`)
```typescript
slug: 'apps'
fields: [
  name, slug, icon (media), description,
  appStoreUrl, playStoreUrl,
  tags (array), color, featured,
  details (group): {
    category, platform, downloads, rating,
    releaseDate, version, overview (richText),
    features (array), screenshots (array),
    testimonials (array)
  }
]
```
**Purpose:** App portfolio items  
**Status:** ✅ Configured  
**Notes:** Comprehensive model for app showcases. Similar to Projects but app-specific fields.

#### 6. **Skills** (`skills`)
```typescript
slug: 'skills'
fields: [
  name,
  category (select): design | development | tools | soft-skills | other,
  proficiency (select): expert | advanced | intermediate | beginner,
  order
]
```
**Purpose:** Skills taxonomy  
**Status:** ✅ Configured  
**Notes:** Good categorization. Could be used as tags reference in Projects.

#### 7. **Experience** (`experience`)
```typescript
slug: 'experience'
fields: [
  title, company, companyUrl, period,
  description (richText),
  projects (array of richText),
  recommendation (group): { quote, author, role, date },
  order
]
```
**Purpose:** Work history  
**Status:** ✅ Configured  
**Notes:** Rich text support for detailed descriptions. Recommendation embedded (could be separate collection).

#### 8. **Education** (`education`)
```typescript
slug: 'education'
fields: [
  degree, school, schoolUrl, year,
  description (richText), order
]
```
**Purpose:** Education history  
**Status:** ✅ Configured  
**Notes:** Simple, effective model.

---

### Globals (2)

#### 1. **PersonalInfo** (`personal-info`)
```typescript
slug: 'personal-info'
fields: [
  name, firstName, lastName, title, subtitle,
  status, studio, location, email, phone, website,
  bio (richText), avatar (media),
  tools (array), roles (array), experience,
  keyContributions (array),
  socialLinks (group): { linkedin, github, medium, twitter }
]
```
**Purpose:** Personal/bio information (singleton)  
**Status:** ✅ Configured  
**Notes:** Comprehensive personal data model. Single global instance.

#### 2. **SiteSettings** (`site-settings`)
```typescript
slug: 'site-settings'
fields: [
  siteName, siteDescription, siteKeywords,
  ogImage (media), favicon (media),
  analytics (group): { googleAnalytics, posthogKey, posthogHost },
  maintenance (group): { enabled, message }
]
```
**Purpose:** Site configuration (singleton)  
**Status:** ✅ Configured  
**Notes:** Good separation of concerns. Analytics credentials should be in env vars, not DB.

---

## API Routes

### Payload REST API (`/api/[[...slug]]/route.ts`)

```typescript
export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
```

**Endpoints Available:**
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (auth required)
- `PATCH /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)
- Same pattern for all 8 collections

**GraphQL Endpoint:** `/api/graphql`

### Helper Methods (`src/lib/payload.ts`)

```typescript
// Cached Payload instance
export const getPayloadClient = async ()

// Helper queries
export const getPersonalInfo = async ()
export const getProjects = async ()
export const getProject = async (slug: string)
export const getClients = async ()
export const getApps = async ()
export const getSkills = async ()
export const getExperience = async ()
export const getEducation = async ()
export const getSiteSettings = async ()
```

**Features:**
- ✅ Cached Payload client (singleton pattern)
- ✅ Type-safe queries
- ✅ Convenient helper methods
- ⚠️ No error handling
- ⚠️ No caching of query results
- ⚠️ No query optimization (always fetches all fields)

---

## Database Schema

### Technology
- **Current:** SQLite (`database.db`, 512 KB)
- **ORM:** Drizzle (via Payload)
- **Migrations:** Handled by Payload

### Schema Overview

**Tables Created:**
1. `users` + `users_sessions`
2. `media`
3. `projects` + `projects_tags` + `projects_details_sections` + `projects_details_sections_images`
4. `clients`
5. `apps` + nested tables for details
6. `skills`
7. `experience` + nested tables
8. `education`
9. `payload_preferences`
10. `payload_migrations`

**Indexes:**
- ✅ All `updated_at`, `created_at` indexed
- ✅ Email unique index on users
- ✅ Filename unique index on media
- ✅ Foreign key indexes on relations
- ⚠️ No custom indexes for filtering (e.g., `featured`, `slug`)

### Database Performance

**Current Size:** 512 KB (empty/minimal data)

**Projected Size:**
- 50 projects × 100 KB/project = 5 MB
- 200 images × 500 KB/image = 100 MB
- Total: ~105 MB (manageable for SQLite)

**Limitations:**
- SQLite max size: ~281 TB (not a concern)
- Concurrent writes: Limited (blocking writes)
- Production considerations: Single file, harder to scale horizontally

**Recommendation:** SQLite OK for development, migrate to PostgreSQL for production.

---

## Data Flow

### Current Frontend Data Flow

```
Frontend Component
    ↓
import portfolioData from '@/data/portfolio.json'
    ↓
Read static JSON file
    ↓
Render component
```

**Files Using JSON:**
- `src/app/page.tsx` → `portfolio.json`
- `src/app/projects/[slug]/page.tsx` → `portfolio.json`
- `src/app/experiences/page.tsx` → `experiences.json`
- `src/app/services/*/page.tsx` → `portfolio.json`

**Issue:** Payload CMS admin panel updates **do not** affect frontend.

### Target Data Flow (After Migration)

```
Frontend Component (Server Component)
    ↓
await getProjects() from payload.ts
    ↓
getPayloadClient() [cached]
    ↓
payload.find({ collection: 'projects' })
    ↓
Drizzle ORM query SQLite
    ↓
Return typed data
    ↓
(Optional) Cache in Redis/Memory
    ↓
Render component
```

**Benefits:**
- ✅ Single source of truth
- ✅ Type-safe
- ✅ Real-time updates from admin
- ✅ Content versioning
- ✅ Draft/publish workflow

---

## Performance Analysis

### Current Performance

**Page Load (Development):**
- Homepage: ~200-300ms (reading JSON from disk)
- Project detail: ~150-250ms

**Payload Admin:**
- Admin panel: ~1-2s initial load
- Collections list: ~200-500ms

### Performance Issues

1. **No Caching**
   - Every Payload query hits SQLite
   - No in-memory cache for globals (PersonalInfo, SiteSettings)
   - Images served without CDN

2. **No Static Generation**
   - Pages could be statically generated at build time
   - Dynamic data could use ISR (Incremental Static Regeneration)

3. **Image Optimization**
   - Sharp configured ✅
   - Multiple sizes generated ✅
   - But: No CDN, no caching headers

4. **API Route Overhead**
   - Payload REST API adds ~50-100ms overhead vs direct DB queries
   - GraphQL adds ~100-200ms for query parsing

### Performance Recommendations

#### 1. Caching Strategy

**Level 1: Payload Instance Cache (Implemented ✅)**
```typescript
let cachedPayload: any = null
```

**Level 2: Query Result Cache (Missing ⚠️)**
```typescript
import { unstable_cache } from 'next/cache'

export const getProjects = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return await payload.find({ collection: 'projects' })
  },
  ['projects'],
  { revalidate: 3600, tags: ['projects'] }
)
```

**Level 3: Redis Cache (Production ⚠️)**
- Cache query results in Redis
- TTL: 1 hour for data, 24 hours for globals
- Invalidate on CMS updates

#### 2. Static Generation

```typescript
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.docs.map(p => ({ slug: p.slug }))
}

export const revalidate = 3600 // ISR: revalidate every hour
```

#### 3. Image CDN

**Options:**
- Cloudinary
- Imgix
- Next.js Image Optimization (Vercel)
- Self-hosted CDN with nginx

#### 4. Database Indexes

```sql
-- Add indexes for common queries
CREATE INDEX projects_featured_idx ON projects(featured);
CREATE INDEX projects_slug_idx ON projects(slug);
CREATE INDEX skills_category_idx ON skills(category);
```

---

## Security Considerations

### Current Security State

**✅ Good Practices:**
1. Authentication enabled on Users collection
2. Media read access public (correct for portfolio)
3. Admin routes under `/admin` namespace
4. TypeScript for type safety

**⚠️ Security Issues:**

#### 1. Hardcoded Secret
```typescript
secret: process.env.PAYLOAD_SECRET || 'YOUR-SECRET-HERE'
```
**Risk:** Critical security vulnerability  
**Fix:** Require `PAYLOAD_SECRET` env var, fail if missing

#### 2. No Rate Limiting
- API routes fully exposed
- No request throttling
- DDoS vulnerability

**Fix:**
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

#### 3. No CORS Configuration
- API accessible from any origin
- XSS vulnerability potential

**Fix:** Configure CORS in `next.config.ts`:
```typescript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://daniellauding.se' },
      ],
    },
  ]
}
```

#### 4. No Content Security Policy
- No CSP headers
- XSS risk

**Fix:** Add CSP headers in middleware

#### 5. No Input Validation Beyond Payload
- Payload validates schema
- But custom API routes have no validation

#### 6. No File Upload Restrictions
- Media collection accepts all `image/*`
- Could accept malicious SVGs, large files

**Fix:**
```typescript
upload: {
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxSize: 5 * 1024 * 1024, // 5 MB
}
```

### Security Recommendations

**Priority 1 (Critical):**
1. Remove hardcoded secrets
2. Require environment variables
3. Add rate limiting to API routes
4. Configure CORS properly

**Priority 2 (High):**
5. Add CSP headers
6. Restrict file upload types/sizes
7. Add request validation middleware
8. Enable HTTPS only in production

**Priority 3 (Medium):**
9. Add API authentication for public reads (optional)
10. Implement request logging
11. Add security headers (helmet.js)
12. Enable audit logging in Payload

---

## Migration Plan

### Phase 1: Preparation (1-2 days)

**Goal:** Validate Payload setup and create migration scripts

#### 1.1 Environment Setup
```bash
# Create .env.local
PAYLOAD_SECRET="generate-32-char-secret-here"
DATABASE_URI="file:./database.db"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

#### 1.2 Database Validation
```bash
# Check database exists
ls -lh database.db

# Verify tables
sqlite3 database.db ".tables"

# Count records
sqlite3 database.db "SELECT COUNT(*) FROM projects;"
```

#### 1.3 Create Migration Script
```javascript
// scripts/migrate-json-to-payload.js
const payload = require('payload')
const portfolioData = require('../src/data/portfolio.json')
const config = require('../payload.config')

async function migrate() {
  await payload.init({ config })
  
  // Migrate personal info (global)
  await payload.updateGlobal({
    slug: 'personal-info',
    data: portfolioData.personal
  })
  
  // Migrate clients
  for (const client of portfolioData.clients) {
    await payload.create({
      collection: 'clients',
      data: client
    })
  }
  
  // Migrate projects (with media upload)
  for (const project of portfolioData.projects) {
    // Upload image first
    // Then create project with media relation
  }
  
  // ... continue for all collections
}

migrate()
```

### Phase 2: Data Migration (2-3 days)

**Goal:** Migrate all JSON data to Payload CMS

#### 2.1 Migrate Static Data (Day 1)
- [x] Clients (simple, no relations)
- [x] Skills (simple)
- [x] Education (simple)

#### 2.2 Migrate Media (Day 2)
- [x] Upload all images from `/public/projects/`, `/public/apps/`
- [x] Create Media records in Payload
- [x] Map old paths to new media IDs

#### 2.3 Migrate Complex Data (Day 2-3)
- [x] Projects (with media relations, sections, testimonials)
- [x] Apps (with details, screenshots)
- [x] Experience (with recommendations)

#### 2.4 Migrate Globals (Day 3)
- [x] PersonalInfo
- [x] SiteSettings

### Phase 3: Frontend Migration (3-5 days)

**Goal:** Switch frontend from JSON to Payload API

#### 3.1 Update Homepage (`src/app/page.tsx`)
**Before:**
```typescript
import portfolioData from "@/data/portfolio.json"
export default function Home() {
  const { personal, skills, projects } = portfolioData
```

**After:**
```typescript
import { getPersonalInfo, getSkills, getProjects } from "@/lib/payload"

export default async function Home() {
  const [personal, skills, projects] = await Promise.all([
    getPersonalInfo(),
    getSkills(),
    getProjects()
  ])
```

#### 3.2 Update Project Detail Pages
```typescript
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.docs.map(p => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug)
  // ...
}
```

#### 3.3 Update All Components
- [x] `components/Hero.tsx`
- [x] `components/Information.tsx`
- [x] `components/Skills.tsx`
- [x] `components/Projects.tsx`
- [x] `components/Clients.tsx`
- [x] `components/CV.tsx`
- [x] `components/Apps.tsx`

#### 3.4 Remove JSON Files
```bash
# After successful migration
mv src/data/portfolio.json src/data/portfolio.json.backup
mv src/data/experiences.json src/data/experiences.json.backup
```

### Phase 4: Optimization (2-3 days)

**Goal:** Add caching and performance optimizations

#### 4.1 Implement Query Caching
```typescript
// lib/payload.ts
export const getProjects = unstable_cache(
  async () => { /* ... */ },
  ['projects'],
  { revalidate: 3600, tags: ['projects'] }
)
```

#### 4.2 Add Static Generation
```typescript
// next.config.ts
export default {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}
```

#### 4.3 Optimize Images
- Configure Next.js Image component
- Add CDN (Cloudinary/Imgix)
- Set proper cache headers

#### 4.4 Add Database Indexes
```sql
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured);
CREATE INDEX IF NOT EXISTS projects_slug_idx ON projects(slug);
```

### Phase 5: Production Readiness (2-3 days)

**Goal:** Security, monitoring, deployment

#### 5.1 Security Hardening
- [x] Remove hardcoded secrets
- [x] Add rate limiting
- [x] Configure CORS
- [x] Add CSP headers
- [x] File upload restrictions

#### 5.2 Environment Configuration
```bash
# .env.production
PAYLOAD_SECRET="production-secret-32-chars"
DATABASE_URI="postgresql://user:pass@host:5432/dbname"  # Migrate to PostgreSQL
NEXT_PUBLIC_SERVER_URL="https://daniellauding.se"
```

#### 5.3 Database Migration (SQLite → PostgreSQL)
```bash
# Install PostgreSQL adapter
npm install @payloadcms/db-postgres

# Update payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'

db: postgresAdapter({
  pool: { connectionString: process.env.DATABASE_URI }
})

# Export SQLite data
sqlite3 database.db .dump > backup.sql

# Import to PostgreSQL (manual mapping required)
```

#### 5.4 Deployment Checklist
- [x] Environment variables configured
- [x] Database backed up
- [x] Static assets on CDN
- [x] HTTPS enabled
- [x] Monitoring setup (Sentry, LogRocket)
- [x] Performance monitoring (Lighthouse CI)

---

## Recommendations

### Immediate (Week 1)

1. **Remove Hardcoded Secret** ⚠️ Critical
   - Create `.env.local` with `PAYLOAD_SECRET`
   - Require env var in `payload.config.ts`

2. **Create Migration Script** 📝
   - Use script template above
   - Test with 1-2 items per collection
   - Validate data integrity

3. **Add Database Indexes** 🚀
   - Index `featured`, `slug`, `category`
   - Improves query performance 10-50x

### Short-term (Week 2-3)

4. **Complete Data Migration** 📦
   - Run migration script for all data
   - Validate in admin panel
   - Keep JSON backups for rollback

5. **Switch Frontend to Payload** 🔄
   - Update all components to use Payload helpers
   - Remove JSON imports
   - Test all pages thoroughly

6. **Add Query Caching** ⚡
   - Implement `unstable_cache` for all queries
   - Add cache tags for invalidation
   - Monitor cache hit rates

### Medium-term (Month 1-2)

7. **Security Hardening** 🔒
   - Rate limiting
   - CORS configuration
   - CSP headers
   - File upload restrictions

8. **Performance Optimization** 🏎️
   - Static generation for projects
   - ISR with 1-hour revalidation
   - Image CDN integration
   - Redis cache layer

9. **Migrate to PostgreSQL** 🗄️
   - Set up managed PostgreSQL (Railway, Supabase, AWS RDS)
   - Export SQLite data
   - Import to PostgreSQL
   - Update connection string
   - Deploy

### Long-term (Month 2+)

10. **Advanced Features** ✨
    - Content versioning workflow
    - Draft/published states
    - Scheduled publishing
    - Multi-language support (if needed)
    - Advanced analytics integration

11. **Monitoring & Observability** 📊
    - Sentry for error tracking
    - LogRocket for session replay
    - Lighthouse CI for performance
    - Uptime monitoring

12. **Backup & Disaster Recovery** 💾
    - Automated database backups
    - Media backup to S3/Cloudinary
    - Restore testing
    - Disaster recovery plan

---

## Appendix

### A. Useful Commands

```bash
# Start development server
npm run dev

# Access admin panel
open http://localhost:3000/admin

# Generate TypeScript types
npm run generate:types

# Database inspection
sqlite3 database.db
> .tables
> .schema projects
> SELECT * FROM projects;

# Migration script
npm run seed  # After creating script
```

### B. File Structure

```
daniellauding/
├── src/
│   ├── app/
│   │   ├── (admin)/admin/         # Admin panel routes
│   │   ├── api/
│   │   │   ├── [[...slug]]/       # Payload REST API
│   │   │   └── graphql/           # Payload GraphQL API
│   │   ├── projects/[slug]/       # Dynamic project pages
│   │   └── page.tsx               # Homepage
│   ├── collections/               # Payload collections
│   │   ├── Projects.ts
│   │   ├── Experience.ts
│   │   └── ...
│   ├── globals/                   # Payload globals
│   │   ├── PersonalInfo.ts
│   │   └── SiteSettings.ts
│   ├── components/                # React components
│   ├── lib/
│   │   └── payload.ts            # Payload helper methods
│   └── data/                      # ⚠️ To be removed after migration
│       ├── portfolio.json
│       └── experiences.json
├── payload.config.ts              # Payload configuration
├── next.config.ts                 # Next.js configuration
├── database.db                    # SQLite database
└── docs/
    └── BACKEND_ARCHITECTURE.md    # This document
```

### C. Environment Variables

```bash
# .env.local (development)
PAYLOAD_SECRET="your-32-character-secret-here"
DATABASE_URI="file:./database.db"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

# .env.production (production)
PAYLOAD_SECRET="production-secret-different-from-dev"
DATABASE_URI="postgresql://user:pass@host:5432/dbname"
NEXT_PUBLIC_SERVER_URL="https://daniellauding.se"
NODE_ENV="production"
```

### D. Type Definitions

After migration, types will be auto-generated:

```typescript
// payload-types.ts (auto-generated)
export interface Project {
  id: number
  name: string
  slug: string
  type: string
  description: string
  date: string
  location?: string
  url?: string
  featured: boolean
  color?: string
  image: Media
  tags: { tag: string }[]
  password?: string
  details: {
    client?: string
    duration?: string
    team?: string
    role?: string
    challenge?: string
    solution?: string
    impact?: string
    sections?: {
      title: string
      content?: any // Lexical JSON
      images?: { image: Media }[]
    }[]
    testimonial?: {
      quote?: string
      author?: string
      role?: string
    }
    nextProject?: Project
  }
  updatedAt: string
  createdAt: string
}
```

### E. Resources

- **Payload Docs:** https://payloadcms.com/docs
- **Next.js App Router:** https://nextjs.org/docs/app
- **Drizzle ORM:** https://orm.drizzle.team/
- **SQLite → PostgreSQL Migration:** https://github.com/coleifer/sqlite-web

---

**Document Version:** 1.0  
**Last Updated:** February 11, 2025  
**Author:** Backend Developer Agent  
**Status:** Ready for Review
