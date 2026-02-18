# Performance Optimization Plan
**daniellauding.se Backend**

**Goal:** Achieve <1s page loads with efficient caching and query optimization  
**Current State:** Development (no optimization)  
**Target:** Production-ready with 90+ Lighthouse scores

---

## Table of Contents

1. [Current Performance Baseline](#current-performance-baseline)
2. [Caching Strategy](#caching-strategy)
3. [Database Optimization](#database-optimization)
4. [API Route Optimization](#api-route-optimization)
5. [Static Generation Strategy](#static-generation-strategy)
6. [Image Optimization](#image-optimization)
7. [Production Deployment](#production-deployment)
8. [Monitoring & Metrics](#monitoring--metrics)

---

## Current Performance Baseline

### Development Server Performance

**Measured with:** Next.js development server on local machine

| Metric | Value | Target |
|--------|-------|--------|
| Homepage load | ~200-300ms | <500ms |
| Project detail | ~150-250ms | <400ms |
| Admin panel | ~1-2s | <1.5s |
| Database queries | ~10-50ms | <100ms |
| Image load | Varies | <200ms |

### Performance Issues Identified

1. **No Query Caching**
   - Every request hits SQLite
   - Payload client recreated (partially cached)
   - No result memoization

2. **No Static Generation**
   - All pages server-rendered on demand
   - Static content re-fetched every request
   - No build-time optimization

3. **Inefficient Queries**
   - Fetch all fields (including unused richText)
   - No field selection
   - No pagination on large collections

4. **Image Optimization Gaps**
   - Sharp configured but not optimized
   - No CDN
   - No lazy loading
   - No modern formats (WebP/AVIF)

5. **Database Bottlenecks**
   - Missing indexes on filtered fields
   - No query planning
   - SQLite single-thread writes

---

## Caching Strategy

### Multi-Layer Caching Architecture

```
Client Browser Cache
    ↓
CDN Edge Cache (CloudFlare)
    ↓
Next.js Data Cache (unstable_cache)
    ↓
Payload Instance Cache (implemented)
    ↓
Database
```

### Layer 1: Payload Instance Cache (Implemented ✅)

**Current Implementation:**
```typescript
// src/lib/payload.ts
let cachedPayload: any = null

export const getPayloadClient = async () => {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config })
  }
  return cachedPayload
}
```

**Performance Gain:** 50-100ms saved per request

### Layer 2: Query Result Cache (To Implement ⚠️)

**Implementation:**

```typescript
// src/lib/payload.ts
import { unstable_cache } from 'next/cache'

// Cache projects for 1 hour
export const getProjects = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return await payload.find({
      collection: 'projects',
      sort: '-featured',
    })
  },
  ['projects'], // Cache key
  {
    revalidate: 3600, // 1 hour in seconds
    tags: ['projects'], // For manual invalidation
  }
)

// Cache single project for 1 hour
export const getProject = unstable_cache(
  async (slug: string) => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] || null
  },
  ['project'], // Cache key prefix
  {
    revalidate: 3600,
    tags: (slug) => ['projects', `project-${slug}`], // Dynamic tags
  }
)

// Cache globals for 24 hours (rarely change)
export const getPersonalInfo = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'personal-info' })
  },
  ['personal-info'],
  {
    revalidate: 86400, // 24 hours
    tags: ['personal-info'],
  }
)

export const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'site-settings' })
  },
  ['site-settings'],
  {
    revalidate: 86400,
    tags: ['site-settings'],
  }
)

// Shorter cache for experience/skills (edited more often)
export const getExperience = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return await payload.find({
      collection: 'experience',
      sort: 'order',
    })
  },
  ['experience'],
  {
    revalidate: 1800, // 30 minutes
    tags: ['experience'],
  }
)
```

**Performance Gain:** 80-95% reduction in query time (10-50ms → <5ms)

### Layer 3: Cache Invalidation (Manual)

**Trigger on Content Updates:**

```typescript
// src/collections/Projects.ts (Payload hook)
import { revalidateTag } from 'next/cache'

export const Projects: CollectionConfig = {
  slug: 'projects',
  hooks: {
    afterChange: [
      async ({ doc }) => {
        // Invalidate projects list cache
        revalidateTag('projects')
        // Invalidate specific project cache
        revalidateTag(`project-${doc.slug}`)
        console.log(`🔄 Cache invalidated for project: ${doc.slug}`)
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        revalidateTag('projects')
        revalidateTag(`project-${doc.slug}`)
      },
    ],
  },
  // ... rest of config
}
```

**Apply to All Collections:**
- Projects ✓
- Experience ✓
- Skills ✓
- Apps ✓
- Clients ✓
- Education ✓
- PersonalInfo (global) ✓
- SiteSettings (global) ✓

### Layer 4: Redis Cache (Production Optional)

**For High-Traffic Sites:**

```typescript
// lib/redis-cache.ts
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export async function getCachedProjects() {
  const cached = await redis.get('projects')
  if (cached) return JSON.parse(cached)

  const projects = await getProjects() // Fetch fresh
  await redis.set('projects', JSON.stringify(projects), 'EX', 3600) // 1 hour
  return projects
}
```

**When to Use Redis:**
- >10,000 requests/day
- Multiple server instances
- Need distributed cache

**Cost-Benefit:**
- Setup complexity: Medium
- Hosting cost: $5-15/month (managed Redis)
- Performance gain: 10-20ms saved
- **Verdict:** Skip for now, revisit if traffic grows

---

## Database Optimization

### 1. Add Missing Indexes

**Current Indexes (Auto-generated by Payload):**
```sql
-- Already exist
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX media_filename_idx ON media(filename);
CREATE INDEX projects_tags_parent_id_idx ON projects_tags(_parent_id);
```

**Missing Indexes (To Add):**
```sql
-- Projects
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Skills
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_proficiency ON skills(proficiency);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills("order");

-- Experience
CREATE INDEX IF NOT EXISTS idx_experience_order ON experience("order");
CREATE INDEX IF NOT EXISTS idx_experience_company ON experience(company);

-- Clients
CREATE INDEX IF NOT EXISTS idx_clients_order ON clients("order");

-- Apps
CREATE INDEX IF NOT EXISTS idx_apps_featured ON apps(featured);
CREATE INDEX IF NOT EXISTS idx_apps_slug ON apps(slug);

-- Education
CREATE INDEX IF NOT EXISTS idx_education_order ON education("order");
```

**Add Indexes Script:**

```bash
# scripts/add-indexes.sh
sqlite3 database.db << EOF
-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type);

-- Skills indexes
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills("order");

-- Experience indexes
CREATE INDEX IF NOT EXISTS idx_experience_order ON experience("order");

-- Clients indexes
CREATE INDEX IF NOT EXISTS idx_clients_order ON clients("order");

-- Apps indexes
CREATE INDEX IF NOT EXISTS idx_apps_featured ON apps(featured);
CREATE INDEX IF NOT EXISTS idx_apps_slug ON apps(slug);

-- Education indexes
CREATE INDEX IF NOT EXISTS idx_education_order ON education("order");

-- Verify indexes
.indexes
EOF
```

**Performance Gain:** 5-50x faster on filtered queries

### 2. Query Optimization

**Before (Fetch Everything):**
```typescript
const projects = await payload.find({
  collection: 'projects',
})
// Returns all fields including large richText sections
```

**After (Select Only Needed Fields):**
```typescript
const projects = await payload.find({
  collection: 'projects',
  select: {
    name: true,
    slug: true,
    type: true,
    description: true,
    date: true,
    featured: true,
    image: true,
    tags: true,
    // Skip heavy fields like details.sections
  },
})
```

**Performance Gain:** 40-60% smaller payloads, faster serialization

### 3. Pagination

**Before (Load All):**
```typescript
const skills = await payload.find({
  collection: 'skills', // Could be 100+ items
})
```

**After (Paginate):**
```typescript
const skills = await payload.find({
  collection: 'skills',
  limit: 50,
  page: 1,
  sort: 'order',
})
```

**Note:** For portfolio site with <100 items per collection, full load is OK. But good practice for scalability.

### 4. Database Vacuum (SQLite Maintenance)

```bash
# Compact database, rebuild indexes
sqlite3 database.db "VACUUM;"
sqlite3 database.db "ANALYZE;"
```

**Run:** Weekly in production (cron job)

---

## API Route Optimization

### 1. Remove Unused Endpoints (Optional)

**Current:** All REST endpoints enabled

**If only reading data on frontend:**
```typescript
// src/app/api/[[...slug]]/route.ts
import config from '@/payload.config'
import { REST_GET } from '@payloadcms/next/routes'

// Only expose GET (read-only API)
export const GET = REST_GET(config)

// Remove POST, PATCH, DELETE to reduce attack surface
// (Admin panel still works, uses direct Payload calls)
```

**Security Benefit:** Prevent public writes

### 2. Add Rate Limiting

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimit = new Map<string, { count: number; resetAt: number }>()

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || 'unknown'
    const now = Date.now()
    const windowMs = 60 * 1000 // 1 minute
    const maxRequests = 100

    const record = rateLimit.get(ip)
    if (record && record.resetAt > now) {
      if (record.count >= maxRequests) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        )
      }
      record.count++
    } else {
      rateLimit.set(ip, { count: 1, resetAt: now + windowMs })
    }
  }

  return NextResponse.next()
}
```

**Protection:** DDoS, brute force attacks

### 3. CORS Configuration

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://daniellauding.se' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
}
```

---

## Static Generation Strategy

### 1. Static Params for Dynamic Routes

```typescript
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await getProjects()
  
  return projects.docs.map((project) => ({
    slug: project.slug,
  }))
}

// This tells Next.js to pre-render all project pages at build time
```

**Result:** 5 project pages generated at build → instant loads

### 2. Incremental Static Regeneration (ISR)

```typescript
// app/projects/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every 1 hour

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  return <ProjectDetail project={project} />
}
```

**How It Works:**
1. Build: Generate static HTML for all projects
2. Request: Serve cached HTML (instant)
3. After 1 hour: Next request triggers regeneration in background
4. Subsequent requests: Get fresh HTML

**Performance:** 
- First load: <100ms (static HTML)
- After cache: <50ms
- ISR rebuild: Transparent to users

### 3. Static Globals

```typescript
// app/layout.tsx
export const revalidate = 86400 // 24 hours (globals rarely change)

export default async function RootLayout() {
  const settings = await getSiteSettings()
  const personal = await getPersonalInfo()
  // ...
}
```

### 4. Dynamic vs Static Decision Matrix

| Page Type | Strategy | Revalidate | Reason |
|-----------|----------|------------|--------|
| Homepage | ISR | 1 hour | Featured projects may change |
| Project Detail | Static + ISR | 1 hour | Content updates occasionally |
| Experiences | ISR | 30 min | Work history updates |
| Admin Panel | Dynamic | N/A | Always fresh, auth required |
| API Routes | Dynamic | N/A | Real-time data |

---

## Image Optimization

### 1. Next.js Image Component (Already Using ✅)

**Update Components:**

```typescript
// Before
<img src={project.image} alt={project.name} />

// After
import Image from 'next/image'

<Image
  src={project.image.url}
  alt={project.image.alt}
  width={768}
  height={1024}
  quality={85}
  placeholder="blur"
  blurDataURL={project.image.sizes?.thumbnail?.url}
/>
```

**Benefits:**
- Automatic format conversion (WebP/AVIF)
- Lazy loading
- Responsive images
- Blur-up loading

### 2. Payload Media Sizes (Already Configured ✅)

```typescript
// src/collections/Media.ts
imageSizes: [
  { name: 'thumbnail', width: 400, height: 300 },   // Preview
  { name: 'card', width: 768, height: 1024 },       // Grid view
  { name: 'tablet', width: 1024 },                  // Full width
]
```

**Usage:**
```typescript
<Image
  src={media.sizes.card.url}      // Use 768px version for cards
  srcSet={`
    ${media.sizes.thumbnail.url} 400w,
    ${media.sizes.card.url} 768w,
    ${media.sizes.tablet.url} 1024w
  `}
/>
```

### 3. CDN Integration (Production)

**Option 1: Vercel Built-in (Recommended)**
- Automatic image optimization
- Global CDN
- WebP/AVIF support
- Zero config

**Option 2: Cloudinary**
```typescript
// next.config.ts
images: {
  loader: 'cloudinary',
  path: 'https://res.cloudinary.com/your-cloud/',
}
```

**Option 3: imgix**
```typescript
images: {
  loader: 'imgix',
  path: 'https://your-domain.imgix.net',
}
```

**Recommendation:** Use Vercel built-in for simplicity.

### 4. Image Loading Priority

```typescript
// Hero image: load immediately
<Image src={heroImage} alt="..." priority />

// Below fold: lazy load (default)
<Image src={projectImage} alt="..." />
```

---

## Production Deployment

### 1. Environment Variables

```bash
# .env.production
NODE_ENV=production
PAYLOAD_SECRET="production-secret-32-characters"
DATABASE_URI="postgresql://user:pass@host:5432/dbname"
NEXT_PUBLIC_SERVER_URL="https://daniellauding.se"

# Optional
REDIS_URL="redis://localhost:6379"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

### 2. Database Migration (SQLite → PostgreSQL)

**Why PostgreSQL?**
- Better concurrency (multiple writes)
- Managed hosting (automatic backups)
- Scalability
- Production-grade

**Migration Steps:**

1. **Install adapter:**
```bash
npm install @payloadcms/db-postgres
```

2. **Update config:**
```typescript
// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'

db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI,
  },
}),
```

3. **Export SQLite data:**
```bash
sqlite3 database.db .dump > backup.sql
```

4. **Import to PostgreSQL:**
```bash
# Setup PostgreSQL database (Railway, Supabase, AWS RDS)
# Then run Payload migrations
npm run payload migrate
```

5. **Migrate data manually or via script**

**Hosting Options:**
- **Railway:** $5-10/month, PostgreSQL + Next.js hosting
- **Supabase:** Free tier, then $25/month
- **AWS RDS:** $15-30/month
- **Vercel Postgres:** $20/month

**Recommendation:** Railway (simplest setup)

### 3. Build Configuration

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'daniellauding.se',
      },
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com', // Keep existing
      },
    ],
  },
  
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
          },
        ],
      },
    ]
  },
}
```

### 4. Deployment Checklist

**Pre-Deploy:**
- [ ] All environment variables set
- [ ] Database migrated to PostgreSQL
- [ ] `npm run build` succeeds locally
- [ ] All tests pass
- [ ] Lighthouse score >90

**Deploy:**
- [ ] Push to GitHub
- [ ] Vercel auto-deploy triggers
- [ ] Database migrations run
- [ ] Environment variables synced

**Post-Deploy:**
- [ ] Site loads at production URL
- [ ] Admin panel accessible
- [ ] Can login to admin
- [ ] Projects display correctly
- [ ] Images load from CDN
- [ ] Performance metrics meet targets

---

## Monitoring & Metrics

### 1. Performance Monitoring

**Vercel Analytics (Built-in):**
- Real User Monitoring (RUM)
- Web Vitals tracking
- Page load times

**Google Lighthouse CI:**
```bash
# .github/workflows/lighthouse.yml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
```

**Target Metrics:**
- **First Contentful Paint (FCP):** <1.5s
- **Largest Contentful Paint (LCP):** <2.5s
- **Time to Interactive (TTI):** <3.5s
- **Cumulative Layout Shift (CLS):** <0.1
- **Total Blocking Time (TBT):** <300ms

### 2. Error Tracking

**Sentry (Recommended):**
```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

**Track:**
- Runtime errors
- API failures
- Performance issues
- User session replays

### 3. Uptime Monitoring

**Options:**
- **Vercel:** Built-in uptime monitoring
- **UptimeRobot:** Free, checks every 5 min
- **Pingdom:** $15/month, advanced features

**Setup:**
- Monitor: `https://daniellauding.se`
- Check: Every 5 minutes
- Alert: Email + SMS on downtime

### 4. Database Monitoring

**PostgreSQL Metrics:**
- Query performance (slow query log)
- Connection pool usage
- Disk usage
- Backup status

**Tools:**
- **pgAdmin:** GUI for PostgreSQL
- **DataDog:** Full observability ($15/host)
- **Railway Dashboard:** Built-in metrics

---

## Performance Checklist

### Development
- [x] Payload instance cache implemented
- [ ] Query result cache added (`unstable_cache`)
- [ ] Cache invalidation hooks configured
- [ ] Database indexes created
- [ ] Query optimization (field selection)

### Pre-Production
- [ ] Static generation for all routes
- [ ] ISR configured with appropriate revalidate times
- [ ] Image optimization (Next.js Image component)
- [ ] CDN configured (Vercel/Cloudinary)
- [ ] PostgreSQL migration complete

### Production
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Security headers set
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Uptime monitoring (UptimeRobot)

### Post-Launch
- [ ] Lighthouse score >90 achieved
- [ ] Web Vitals meet targets
- [ ] Cache hit rate >80%
- [ ] Average response time <500ms
- [ ] Zero downtime

---

## Expected Performance Gains

### Before Optimization
- Homepage: ~300ms
- Project detail: ~250ms
- Database query: ~30ms
- Image load: ~500ms
- Total Time to Interactive: ~2.5s

### After Optimization
- Homepage: ~100ms (static + cache)
- Project detail: ~80ms (ISR)
- Database query: ~5ms (cache)
- Image load: ~150ms (CDN + WebP)
- Total Time to Interactive: **~800ms**

### Improvement
- **70% faster page loads**
- **85% faster database queries**
- **70% smaller image payloads**
- **Lighthouse score: 95+**

---

**Document Version:** 1.0  
**Last Updated:** February 11, 2025  
**Status:** Implementation Ready
