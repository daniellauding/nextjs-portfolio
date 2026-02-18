# Migration Plan: JSON → Payload CMS
**daniellauding.se**

**Goal:** Migrate from static JSON files to Payload CMS as single source of truth  
**Timeline:** 10-14 days  
**Risk Level:** Medium (reversible with backups)

---

## Table of Contents

1. [Overview](#overview)
2. [Pre-Migration Checklist](#pre-migration-checklist)
3. [Migration Phases](#migration-phases)
4. [Rollback Plan](#rollback-plan)
5. [Testing Strategy](#testing-strategy)
6. [Post-Migration Verification](#post-migration-verification)

---

## Overview

### Current State
- ✅ Payload CMS configured
- ✅ Database schema created
- ✅ Admin panel accessible
- ⚠️ Frontend reads from JSON files
- ⚠️ CMS updates don't affect site

### Target State
- ✅ All content in Payload CMS
- ✅ Frontend reads from Payload API
- ✅ Admin panel is content management system
- ✅ JSON files archived as backups
- ✅ Type-safe queries throughout

### Migration Strategy
1. **Additive approach:** Add Payload queries alongside JSON (temporary dual-read)
2. **Gradual switchover:** Migrate one component at a time
3. **Validation:** Compare JSON vs Payload output
4. **Atomic cutover:** Switch data source once validated
5. **Cleanup:** Archive JSON files

---

## Pre-Migration Checklist

### 1. Environment Setup

```bash
# Create .env.local if not exists
cat > .env.local << EOF
PAYLOAD_SECRET="$(openssl rand -base64 32)"
DATABASE_URI="file:./database.db"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
EOF

# Verify Payload starts
npm run dev
# Visit http://localhost:3000/admin
```

**✓ Checklist:**
- [ ] `.env.local` exists with `PAYLOAD_SECRET`
- [ ] Admin panel loads at `/admin`
- [ ] Can create test user and login
- [ ] Database file `database.db` exists

### 2. Backup Current State

```bash
# Create backups directory
mkdir -p backups/$(date +%Y%m%d)

# Backup JSON files
cp src/data/portfolio.json backups/$(date +%Y%m%d)/
cp src/data/experiences.json backups/$(date +%Y%m%d)/

# Backup database
cp database.db backups/$(date +%Y%m%d)/database.db.backup

# Backup public assets
tar -czf backups/$(date +%Y%m%d)/public-assets.tar.gz public/
```

**✓ Checklist:**
- [ ] JSON files backed up
- [ ] Database backed up
- [ ] Public assets backed up
- [ ] Git commit current state

### 3. Create Migration Script

```javascript
// scripts/migrate-json-to-payload.js
const payload = require('payload')
const path = require('path')
const fs = require('fs')

// Import Payload config
require('dotenv').config({ path: '.env.local' })
const config = require('../payload.config').default

// Import JSON data
const portfolioData = require('../src/data/portfolio.json')
const experiencesData = require('../src/data/experiences.json')

async function migrate() {
  console.log('🚀 Starting migration...')
  
  // Initialize Payload
  await payload.init({
    config,
    local: true, // Bypass authentication
  })

  try {
    // Phase 1: Migrate Clients
    console.log('\n📦 Migrating Clients...')
    for (const client of portfolioData.clients) {
      await payload.create({
        collection: 'clients',
        data: {
          name: client.name,
          url: client.url,
          // logo: null, // TODO: Upload later
          order: parseInt(client.id.split('-')[1]) || 0,
        },
      })
      console.log(`  ✓ ${client.name}`)
    }

    // Phase 2: Migrate Skills
    console.log('\n🎯 Migrating Skills...')
    const skillCategories = {
      'Figma': 'tools',
      'React': 'development',
      'Product Design': 'design',
      'Leadership': 'soft-skills',
    }
    
    for (let i = 0; i < portfolioData.skills.length; i++) {
      const skill = portfolioData.skills[i]
      await payload.create({
        collection: 'skills',
        data: {
          name: skill,
          category: skillCategories[skill] || 'other',
          proficiency: 'advanced', // Default
          order: i,
        },
      })
      if (i % 10 === 0) console.log(`  ✓ ${i}/${portfolioData.skills.length} skills`)
    }

    // Phase 3: Migrate Education
    console.log('\n🎓 Migrating Education...')
    for (const edu of portfolioData.cv.education) {
      await payload.create({
        collection: 'education',
        data: {
          degree: edu.degree,
          school: edu.school,
          schoolUrl: edu.schoolUrl,
          year: edu.year,
          order: 0, // TODO: Set proper order
        },
      })
      console.log(`  ✓ ${edu.school}`)
    }

    // Phase 4: Migrate Experience
    console.log('\n💼 Migrating Experience...')
    for (const exp of portfolioData.cv.experience) {
      // Convert projects array to richText
      const projectsRichText = exp.projects?.map(p => ({
        project: {
          root: {
            type: 'root',
            children: [{
              type: 'paragraph',
              children: [{ type: 'text', text: p }]
            }]
          }
        }
      })) || []

      // Extract recommendation if exists
      let recommendation = undefined
      if (exp.recommendation) {
        recommendation = {
          quote: exp.recommendation.quote,
          author: exp.recommendation.author,
          role: exp.recommendation.role,
          date: exp.recommendation.date,
        }
      }

      await payload.create({
        collection: 'experience',
        data: {
          title: exp.title,
          company: exp.company,
          companyUrl: exp.companyUrl,
          period: exp.period,
          description: {
            root: {
              type: 'root',
              children: [{
                type: 'paragraph',
                children: [{ type: 'text', text: exp.description }]
              }]
            }
          },
          projects: projectsRichText,
          recommendation,
          order: 0, // TODO: Set proper order
        },
      })
      console.log(`  ✓ ${exp.company}`)
    }

    // Phase 5: Migrate Projects (simplified - media later)
    console.log('\n🎨 Migrating Projects (without media)...')
    for (const project of portfolioData.projects) {
      // Convert tags array
      const tags = project.tags.map(tag => ({ tag }))

      // Build details object
      const details = project.details ? {
        client: project.details.client,
        duration: project.details.duration,
        team: project.details.team,
        role: project.details.role,
        challenge: project.details.challenge,
        solution: project.details.solution,
        impact: project.details.impact,
        // sections: [], // TODO: Convert sections
        testimonial: project.details.testimonial,
        // nextProject: null, // TODO: Link after all projects created
      } : undefined

      await payload.create({
        collection: 'projects',
        data: {
          name: project.name,
          slug: project.slug,
          type: project.type,
          description: project.description,
          date: project.date,
          location: project.location,
          url: project.url,
          featured: project.featured || false,
          color: project.color,
          // image: null, // TODO: Upload media
          tags,
          password: project.password,
          details,
        },
      })
      console.log(`  ✓ ${project.name}`)
    }

    // Phase 6: Migrate Apps
    console.log('\n📱 Migrating Apps (without media)...')
    for (const app of portfolioData.apps) {
      const tags = app.tags.map(tag => ({ tag }))

      await payload.create({
        collection: 'apps',
        data: {
          name: app.name,
          slug: app.slug,
          // icon: null, // TODO: Upload media
          description: app.description,
          appStoreUrl: app.appStoreUrl,
          playStoreUrl: app.playStoreUrl,
          tags,
          color: app.color,
          featured: app.featured || false,
          details: app.details,
        },
      })
      console.log(`  ✓ ${app.name}`)
    }

    // Phase 7: Migrate PersonalInfo (Global)
    console.log('\n👤 Migrating Personal Info...')
    const personal = portfolioData.personal
    await payload.updateGlobal({
      slug: 'personal-info',
      data: {
        name: personal.name,
        firstName: personal.firstName,
        lastName: personal.lastName,
        title: personal.title,
        subtitle: personal.subtitle,
        status: personal.status,
        studio: personal.studio,
        location: personal.location,
        email: personal.email,
        phone: personal.phone,
        website: personal.website,
        bio: {
          root: {
            type: 'root',
            children: [{
              type: 'paragraph',
              children: [{ type: 'text', text: personal.bio }]
            }]
          }
        },
        tools: personal.tools.map(tool => ({ tool })),
        roles: personal.roles.map(role => ({ role })),
        experience: personal.experience,
        keyContributions: portfolioData.cv.keyContributions.map(c => ({ contribution: c })),
        socialLinks: personal.socialLinks || {},
      },
    })
    console.log('  ✓ Personal info migrated')

    // Phase 8: Migrate SiteSettings (Global)
    console.log('\n⚙️ Migrating Site Settings...')
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'Daniel Lauding',
        siteDescription: personal.bio,
        siteKeywords: portfolioData.skills.slice(0, 20).join(', '),
        analytics: {
          posthogKey: '', // TODO: Add from env
          posthogHost: 'https://eu.posthog.com',
        },
        maintenance: {
          enabled: false,
        },
      },
    })
    console.log('  ✓ Site settings migrated')

    console.log('\n✅ Migration complete!')
    console.log('\n⚠️  TODO:')
    console.log('  1. Upload media files and link to projects/apps')
    console.log('  2. Convert rich text sections in project details')
    console.log('  3. Link nextProject relationships')
    console.log('  4. Set proper order values')
    console.log('  5. Categorize skills properly')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }

  process.exit(0)
}

migrate()
```

**Save as:** `scripts/migrate-json-to-payload.js`

**✓ Checklist:**
- [ ] Script created
- [ ] Dependencies installed (`dotenv`)
- [ ] Can run `node scripts/migrate-json-to-payload.js`

---

## Migration Phases

### Phase 1: Run Initial Migration (Day 1)

```bash
# Install dependencies
npm install dotenv

# Run migration
node scripts/migrate-json-to-payload.js
```

**Expected Output:**
```
🚀 Starting migration...
📦 Migrating Clients...
  ✓ Spotify
  ✓ Swedbank
  ...
🎯 Migrating Skills...
  ✓ 10/75 skills
  ...
✅ Migration complete!
```

**Validation:**
1. Visit `/admin` → Collections → Projects
2. Verify count matches JSON (5 projects)
3. Check data integrity (names, descriptions, tags)
4. Verify relationships (no broken links)

**✓ Checklist:**
- [ ] Migration script runs without errors
- [ ] All collections have data in admin panel
- [ ] Data matches JSON source
- [ ] No duplicate entries

### Phase 2: Media Upload (Day 1-2)

**Manual Upload via Admin:**
1. Go to `/admin/collections/media`
2. Upload each project image:
   - `public/projects/vromm.jpg` → Upload → Set alt text
   - Copy Media ID from URL
3. Edit project → Select uploaded media

**OR Script Upload:**

```javascript
// scripts/upload-media.js
const fs = require('fs')
const path = require('path')

async function uploadMedia() {
  await payload.init({ config, local: true })

  const projectImages = [
    { path: 'public/projects/vromm.jpg', alt: 'Vromm driving app', projectSlug: 'vromm-driving-app' },
    { path: 'public/projects/qasa.jpg', alt: 'Qasa rental platform', projectSlug: 'qasa-rental-platform' },
    // ... more
  ]

  for (const img of projectImages) {
    // Read file
    const fileBuffer = fs.readFileSync(img.path)
    
    // Upload to Payload
    const media = await payload.create({
      collection: 'media',
      data: { alt: img.alt },
      file: {
        data: fileBuffer,
        mimetype: 'image/jpeg',
        name: path.basename(img.path),
        size: fileBuffer.length,
      },
    })

    console.log(`Uploaded ${media.filename}`)

    // Link to project
    const project = await payload.find({
      collection: 'projects',
      where: { slug: { equals: img.projectSlug } },
      limit: 1,
    })

    if (project.docs[0]) {
      await payload.update({
        collection: 'projects',
        id: project.docs[0].id,
        data: { image: media.id },
      })
      console.log(`Linked to ${img.projectSlug}`)
    }
  }
}

uploadMedia()
```

**✓ Checklist:**
- [ ] All project images uploaded
- [ ] All app icons uploaded
- [ ] Images linked to projects/apps
- [ ] Alt text set for accessibility

### Phase 3: Frontend Migration (Day 3-5)

#### Step 1: Test Payload Queries

```typescript
// src/app/test-payload/page.tsx
import { getProjects, getPersonalInfo } from '@/lib/payload'

export default async function TestPage() {
  const projects = await getProjects()
  const personal = await getPersonalInfo()

  return (
    <div className="p-8">
      <h1>Payload Test</h1>
      <h2>Projects: {projects.docs.length}</h2>
      <pre>{JSON.stringify(projects.docs[0], null, 2)}</pre>
      
      <h2>Personal Info</h2>
      <pre>{JSON.stringify(personal, null, 2)}</pre>
    </div>
  )
}
```

**Validation:**
- Visit `/test-payload`
- Verify data structure matches expectations
- Compare with JSON data
- Check for missing fields

**✓ Checklist:**
- [ ] Test page shows data
- [ ] Data structure correct
- [ ] No missing critical fields

#### Step 2: Migrate Components (One at a Time)

**Component Migration Order:**
1. ✅ `Clients.tsx` (simplest, no complex data)
2. ✅ `Skills.tsx` (simple array)
3. ✅ `Information.tsx` (global data)
4. ✅ `Hero.tsx` (global + apps)
5. ✅ `Projects.tsx` (complex, test filtering)
6. ✅ `CV.tsx` (experience + education)
7. ✅ `Apps.tsx` (similar to Projects)

**Example: Clients Component**

**Before:**
```typescript
// components/Clients.tsx
interface ClientsProps {
  clients: Array<{ name: string; url: string; logo?: string }>
}

export default function Clients({ clients }: ClientsProps) {
  // ... render
}
```

**After:**
```typescript
// components/Clients.tsx
import { Client } from '@/payload-types' // Auto-generated types

interface ClientsProps {
  clients: Client[]
}

export default function Clients({ clients }: ClientsProps) {
  // ... render (same logic)
}
```

**Parent Page:**
```typescript
// app/page.tsx
import { getClients } from '@/lib/payload'

export default async function Home() {
  const clients = await getClients()
  
  return (
    <main>
      <Clients clients={clients.docs} />
    </main>
  )
}
```

**Validation Per Component:**
1. Visual comparison (screenshot before/after)
2. Check console for errors
3. Verify data displays correctly
4. Test interactions (filtering, etc.)

**✓ Checklist (per component):**
- [ ] Component updated to accept Payload types
- [ ] Parent page fetches from Payload
- [ ] Visual output matches original
- [ ] No console errors
- [ ] Interactions work

#### Step 3: Update All Pages

```bash
# Pages to update
src/app/page.tsx                        # Homepage
src/app/projects/[slug]/page.tsx        # Project detail
src/app/experiences/page.tsx            # Experiences
src/app/services/*/page.tsx             # Service pages
```

**✓ Checklist:**
- [ ] All pages use Payload queries
- [ ] No JSON imports remain
- [ ] All routes working
- [ ] Dynamic routes generate correctly

### Phase 4: Remove JSON Dependencies (Day 6)

```bash
# Archive JSON files (don't delete yet!)
mkdir -p src/data/archive
mv src/data/portfolio.json src/data/archive/
mv src/data/experiences.json src/data/archive/

# Verify build still works
npm run build

# If build fails, restore and debug
# mv src/data/archive/*.json src/data/
```

**✓ Checklist:**
- [ ] JSON files archived
- [ ] `npm run build` succeeds
- [ ] `npm run start` works
- [ ] All pages load in production build

### Phase 5: Optimization (Day 7-10)

#### Add Query Caching

```typescript
// lib/payload.ts
import { unstable_cache } from 'next/cache'

export const getProjects = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return await payload.find({
      collection: 'projects',
      sort: '-featured',
    })
  },
  ['projects'],
  {
    revalidate: 3600, // 1 hour
    tags: ['projects'],
  }
)

// Repeat for all queries
```

#### Add Static Generation

```typescript
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.docs.map((p) => ({
    slug: p.slug,
  }))
}

export const revalidate = 3600 // ISR: revalidate every hour
```

#### Add Database Indexes

```sql
-- Run in sqlite3 database.db
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured);
CREATE INDEX IF NOT EXISTS projects_slug_idx ON projects(slug);
CREATE INDEX IF NOT EXISTS skills_category_idx ON skills(category);
CREATE INDEX IF NOT EXISTS experience_order_idx ON experience("order");
CREATE INDEX IF NOT EXISTS clients_order_idx ON clients("order");
```

**✓ Checklist:**
- [ ] Caching implemented
- [ ] Static params generated
- [ ] ISR configured
- [ ] Database indexes added
- [ ] Performance tested (Lighthouse)

---

## Rollback Plan

### Immediate Rollback (During Migration)

**If migration script fails:**

```bash
# Restore database
cp backups/$(date +%Y%m%d)/database.db.backup database.db

# Restore JSON files (if deleted)
cp backups/$(date +%Y%m%d)/*.json src/data/

# Restart dev server
npm run dev
```

### Rollback After Frontend Migration

**If issues found after switching to Payload:**

```bash
# 1. Restore JSON files
cp src/data/archive/portfolio.json src/data/
cp src/data/archive/experiences.json src/data/

# 2. Revert git commits
git log --oneline | head -10  # Find commit before migration
git revert <commit-hash>

# 3. Rebuild
npm run build
npm run start
```

### Partial Rollback (One Component)

**If specific component has issues:**

```typescript
// app/page.tsx
// Temporarily revert to JSON for one component
import portfolioData from '@/data/archive/portfolio.json' // Restore file first
import { getProjects } from '@/lib/payload'

export default async function Home() {
  const projects = await getProjects() // New
  const clients = portfolioData.clients // Old (temporary)
  
  return (
    <>
      <Projects projects={projects.docs} />
      <Clients clients={clients} /> {/* Still using JSON */}
    </>
  )
}
```

**✓ Rollback Checklist:**
- [ ] Backups accessible
- [ ] Git history clean
- [ ] Rollback procedure tested
- [ ] Team aware of rollback steps

---

## Testing Strategy

### Unit Testing

**Test Payload Queries:**

```typescript
// __tests__/lib/payload.test.ts
import { getProjects, getProject } from '@/lib/payload'

describe('Payload Queries', () => {
  it('should fetch all projects', async () => {
    const projects = await getProjects()
    expect(projects.docs).toHaveLength(5)
    expect(projects.docs[0]).toHaveProperty('name')
  })

  it('should fetch single project by slug', async () => {
    const project = await getProject('vromm-driving-app')
    expect(project).toBeTruthy()
    expect(project.name).toBe('Vromm - Driving Instruction App')
  })
})
```

### Integration Testing

**Test Full Page Renders:**

```typescript
// __tests__/app/page.test.tsx
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Homepage', () => {
  it('renders projects from Payload', async () => {
    render(await Home())
    expect(screen.getByText(/Vromm/i)).toBeInTheDocument()
  })
})
```

### Visual Regression Testing

**Before Migration:**
```bash
# Take screenshots
npx playwright test --update-snapshots
```

**After Migration:**
```bash
# Compare
npx playwright test
```

### Manual Testing Checklist

**✓ Homepage:**
- [ ] Hero section displays correctly
- [ ] Personal info loads
- [ ] Skills list complete
- [ ] Projects render with images
- [ ] Clients logos show
- [ ] CV section displays
- [ ] No console errors

**✓ Project Detail Pages:**
- [ ] All 5 projects accessible
- [ ] Images load
- [ ] Case study content displays
- [ ] Testimonials show
- [ ] Tags work
- [ ] Next project link works

**✓ Admin Panel:**
- [ ] Can login
- [ ] Can view all collections
- [ ] Can edit a project
- [ ] Changes reflect on frontend (after cache clear)
- [ ] Can upload media
- [ ] Can create new project

**✓ Performance:**
- [ ] Lighthouse score >90
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3s
- [ ] No layout shifts (CLS <0.1)

---

## Post-Migration Verification

### 1. Data Integrity Check

```javascript
// scripts/verify-migration.js
const portfolioData = require('../src/data/archive/portfolio.json')
const payload = require('payload')

async function verify() {
  await payload.init({ config, local: true })

  // Verify counts
  const projects = await payload.find({ collection: 'projects', limit: 0 })
  console.log(`Projects: ${projects.totalDocs} (expected: ${portfolioData.projects.length})`)
  
  const clients = await payload.find({ collection: 'clients', limit: 0 })
  console.log(`Clients: ${clients.totalDocs} (expected: ${portfolioData.clients.length})`)

  // Verify specific project
  const vromm = await payload.find({
    collection: 'projects',
    where: { slug: { equals: 'vromm-driving-app' } },
    limit: 1,
  })
  
  const expected = portfolioData.projects.find(p => p.slug === 'vromm-driving-app')
  
  console.log('\nVromm Project Comparison:')
  console.log('Name:', vromm.docs[0].name === expected.name ? '✅' : '❌')
  console.log('Tags:', vromm.docs[0].tags.length === expected.tags.length ? '✅' : '❌')
  console.log('Featured:', vromm.docs[0].featured === expected.featured ? '✅' : '❌')
}

verify()
```

**Run:**
```bash
node scripts/verify-migration.js
```

**✓ Checklist:**
- [ ] All counts match
- [ ] Sample project data matches
- [ ] No data loss detected

### 2. Performance Benchmarks

**Before Migration:**
```
Homepage: 250ms
Project detail: 180ms
```

**After Migration (Expected):**
```
First load: 400-600ms (cold cache)
Subsequent: 50-150ms (warm cache)
Static pages: <100ms
```

**Run Lighthouse:**
```bash
npx lighthouse http://localhost:3000 --view
```

**Target Scores:**
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95

**✓ Checklist:**
- [ ] Lighthouse scores meet targets
- [ ] No performance regression >20%
- [ ] Cache hit rate >80% (after warmup)

### 3. Content Management Test

**Admin Workflow Test:**
1. Login to `/admin`
2. Create new test project
3. Upload test image
4. Publish project
5. View on frontend
6. Edit project (change title)
7. Verify change on frontend
8. Delete test project

**✓ Checklist:**
- [ ] Can create content
- [ ] Changes reflect immediately (or after cache)
- [ ] Can delete content
- [ ] No orphaned media files

### 4. Deployment Test

```bash
# Build production
npm run build

# Check build output
# ✓ Static pages generated
# ✓ No build errors
# ✓ Bundle size reasonable

# Start production server
npm run start

# Test production site
# ✓ All pages load
# ✓ No console errors
# ✓ Assets load from CDN
```

**✓ Checklist:**
- [ ] Production build succeeds
- [ ] No runtime errors
- [ ] Assets optimized
- [ ] CDN configured (if applicable)

---

## Timeline Summary

| Phase | Duration | Tasks | Deliverable |
|-------|----------|-------|-------------|
| **Pre-Migration** | 1 day | Setup, backups, script | Migration script ready |
| **Data Migration** | 2 days | Run script, upload media | CMS populated |
| **Frontend Migration** | 3 days | Update components, pages | Frontend uses Payload |
| **Testing** | 2 days | Manual + automated tests | All tests pass |
| **Optimization** | 2 days | Caching, indexes, ISR | Performance optimized |
| **Verification** | 1 day | Final checks, docs | Migration complete |
| **Total** | **10-14 days** | | **Production ready** |

---

## Success Criteria

**Migration is complete when:**
- [x] All JSON data migrated to Payload
- [x] All frontend components use Payload queries
- [x] JSON files archived (not deleted)
- [x] Admin panel fully functional
- [x] Performance meets targets (Lighthouse >90)
- [x] No data loss verified
- [x] Team trained on CMS usage
- [x] Documentation updated
- [x] Rollback plan tested
- [x] Production deployment successful

---

**Document Version:** 1.0  
**Last Updated:** February 11, 2025  
**Status:** Ready for Execution
