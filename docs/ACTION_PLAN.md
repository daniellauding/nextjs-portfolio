# 🎯 Action Plan - Data Improvements

**Based on:** Data Reconnaissance Report (2026-02-10)  
**Priority System:** 🔴 Critical | 🟡 Important | 🟢 Nice to Have

---

## 🔴 CRITICAL (Fix Immediately)

### 1. Fix Featured Projects Flag
**Problem:** All 4 projects have `featured: false`  
**Impact:** No projects shown on homepage  
**Effort:** 5 minutes

**Action:**
```json
// In src/data/portfolio.json
{
  "id": "project-1",
  "slug": "vromm-driving-app",
  "featured": true,  // ← Change to true
  ...
}
```

**Recommendation:** Mark at least 2-3 projects as featured (Vromm, Qasa, Asteria).

---

### 2. Verify Image Files Exist
**Problem:** JSON references images that may not exist  
**Impact:** Broken images on live site  
**Effort:** 30 minutes

**Action:**
1. Run image verification script:
```bash
# Create verification script
cat > scripts/verify-images.js << 'EOF'
const fs = require('fs');
const portfolio = require('../src/data/portfolio.json');

const missing = [];

// Check project images
portfolio.projects.forEach(p => {
  const path = `./public${p.image}`;
  if (!fs.existsSync(path)) missing.push(p.image);
  
  // Check detail section images
  p.details?.sections?.forEach(s => {
    s.images?.forEach(img => {
      const imgPath = `./public${img}`;
      if (!fs.existsSync(imgPath)) missing.push(img);
    });
  });
});

// Check app icons
portfolio.apps.forEach(a => {
  if (a.icon.startsWith('/')) {
    const path = `./public${a.icon}`;
    if (!fs.existsSync(path)) missing.push(a.icon);
  }
});

console.log('Missing images:', missing.length);
missing.forEach(img => console.log('  -', img));
EOF

node scripts/verify-images.js
```

2. Add placeholder images or update JSON paths

---

### 3. Create Environment Configuration
**Problem:** No `.env` file, hardcoded secrets  
**Impact:** Security risk, no environment control  
**Effort:** 10 minutes

**Action:**
```bash
# Create .env file
cat > .env << 'EOF'
# Payload CMS
PAYLOAD_SECRET=your-secure-random-secret-here
DATABASE_URI=file:./database.db

# Data Source
USE_CMS=false

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_GA_ID=
EOF

# Update .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

**Update payload.config.ts:**
```typescript
secret: process.env.PAYLOAD_SECRET,  // Remove hardcoded 'YOUR-SECRET-HERE'
```

---

## 🟡 IMPORTANT (Fix Soon)

### 4. Categorize Skills
**Problem:** 75 skills in flat array, no structure  
**Impact:** Can't filter/group skills  
**Effort:** 1-2 hours

**Action:**
Create structured skills in JSON:
```json
{
  "skills": {
    "design": [
      {
        "name": "Product Design",
        "proficiency": "expert",
        "years": 15
      },
      {
        "name": "UX/UI Design",
        "proficiency": "expert",
        "years": 15
      }
    ],
    "development": [
      {
        "name": "React",
        "proficiency": "advanced",
        "years": 8
      }
    ],
    "tools": [...],
    "soft": [...]
  }
}
```

**Or:** Keep simple array but add to CMS with categories:
1. Run `npm run seed` (seeds basic skills)
2. Edit in `/admin/collections/skills`
3. Add category + proficiency to each
4. Set `USE_CMS=true` for skills only

---

### 5. Add Client Logos
**Problem:** Clients have no logos in JSON  
**Impact:** Only text names shown, less impressive  
**Effort:** 2-3 hours

**Action:**
1. Collect logo files (SVG preferred)
2. Add to `/public/clients/`
3. Update JSON:
```json
{
  "id": "client-1",
  "name": "Spotify",
  "url": "https://www.spotify.com",
  "logo": "/clients/spotify.svg",  // ← Add
  "order": 1
}
```

4. Update component to display logos

---

### 6. Complete Seed Script
**Problem:** Seed script doesn't populate projects/apps  
**Impact:** Can't fully test CMS mode  
**Effort:** 2-3 hours

**Action:**
Enhance `scripts/seed.js`:

```javascript
// Add Projects seeding
for (const project of portfolioData.projects) {
  // Upload main image first
  const imageFile = await uploadImage(`./public${project.image}`)
  
  await payload.create({
    collection: 'projects',
    data: {
      name: project.name,
      slug: project.slug,
      type: project.type,
      description: project.description,
      date: project.date,
      image: imageFile.id,
      featured: project.featured,
      tags: project.tags.map(tag => ({ tag })),
      // ... rest of fields
    },
  })
}

// Add Apps seeding
// Similar structure...
```

**Note:** Need to handle image uploads programmatically.

---

### 7. Implement Password Protection
**Problem:** Defined in JSON but not enforced in UI  
**Impact:** Protected projects are accessible to everyone  
**Effort:** 1-2 hours

**Action:**
Update `src/app/projects/[slug]/page.tsx`:

```typescript
export default async function ProjectPage({ params }) {
  const project = findProject(params.slug)
  
  // Check if password protected
  if (project.password) {
    return <PasswordProtectedProject project={project} />
  }
  
  return <ProjectContent project={project} />
}
```

Create `PasswordProtectedProject` component with:
- Password input form
- Session/cookie storage
- Unlock on correct password

---

### 8. Add Social Links
**Problem:** Social links empty in JSON  
**Impact:** No social media connections shown  
**Effort:** 5 minutes

**Action:**
```json
{
  "personal": {
    "socialLinks": {
      "linkedin": "https://www.linkedin.com/in/daniellauding/",
      "github": "https://github.com/daniellauding",
      "medium": "https://medium.com/@daniellauding",
      "twitter": null
    }
  }
}
```

Update footer/header to display icons.

---

## 🟢 NICE TO HAVE (Future Improvements)

### 9. Migrate to Payload CMS
**When:** Multiple editors needed or frequent content updates  
**Effort:** 1-2 days

**Steps:**
1. ✅ Complete seed script (Action #6)
2. Run seed: `npm run seed`
3. Upload media files via `/admin`
4. Test all pages with CMS data
5. Update all pages to use `src/lib/data.ts` abstraction
6. Set `USE_CMS=true`
7. Deploy and test
8. Archive JSON as backup

**Benefits:**
- ✅ User-friendly admin interface
- ✅ Non-technical content editing
- ✅ Media library management
- ✅ API access
- ✅ Version control for content

**Tradeoffs:**
- ⚠️ Slower builds (database queries)
- ⚠️ Database maintenance
- ⚠️ More complex deployment

---

### 10. Add TypeScript Types
**Problem:** No type safety for JSON structure  
**Impact:** Runtime errors, poor IDE support  
**Effort:** 1-2 hours

**Action:**
Create `src/types/portfolio.ts`:
```typescript
export interface Portfolio {
  personal: PersonalInfo
  skills: Skill[]
  projects: Project[]
  clients: Client[]
  apps: App[]
  cv: CV
}

// ... (see JSON_SCHEMA.md for full types)
```

Import in components:
```typescript
import type { Project } from '@/types/portfolio'
import portfolioData from '@/data/portfolio.json'

const projects: Project[] = portfolioData.projects
```

**Alternative:** Use Payload's generated types:
```bash
npm run generate:types
```

---

### 11. Image Optimization
**Problem:** Large image files, slow loading  
**Effort:** 2-3 hours

**Action:**
1. Optimize existing images:
```bash
# Install sharp-cli
npm install -g sharp-cli

# Optimize all project images
sharp-cli resize 1200 --input "public/projects/*.jpg" \
  --output "public/projects/" --quality 85
```

2. Use Next.js Image component:
```typescript
import Image from 'next/image'

<Image
  src={project.image}
  alt={project.name}
  width={1200}
  height={800}
  quality={85}
/>
```

3. Add WebP format support

---

### 12. Search & Filtering
**Problem:** No way to search/filter projects or skills  
**Effort:** 3-4 hours

**Action:**
Add to homepage:
```typescript
const [filter, setFilter] = useState('')
const [category, setCategory] = useState('all')

const filteredProjects = projects.filter(p => {
  const matchesSearch = p.name.toLowerCase().includes(filter.toLowerCase())
  const matchesCategory = category === 'all' || p.type === category
  return matchesSearch && matchesCategory
})
```

Add UI:
- Search input
- Category filters (Design, Development, etc.)
- Tag filters

---

### 13. Analytics Setup
**Problem:** No tracking configured  
**Effort:** 30 minutes

**Action:**
1. Get PostHog API key from https://posthog.com
2. Add to `.env`:
```env
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

3. Verify tracking in `src/lib/tracking.ts`
4. Test pageview events

**Alternative:** Google Analytics
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

### 14. SEO Improvements
**Problem:** Limited SEO metadata  
**Effort:** 1-2 hours

**Action:**
1. Add to each page:
```typescript
export const metadata = {
  title: `${project.name} | Daniel Lauding Portfolio`,
  description: project.description,
  openGraph: {
    title: project.name,
    description: project.description,
    images: [{ url: project.image }],
  },
}
```

2. Add JSON-LD structured data
3. Sitemap generation
4. robots.txt optimization

---

### 15. Performance Monitoring
**Problem:** No performance tracking  
**Effort:** 1 hour

**Action:**
1. Add Web Vitals tracking:
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

2. Monitor Core Web Vitals:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

---

## 📅 Suggested Timeline

### Week 1: Critical Fixes
- [x] Day 1: Fix featured projects flag (5 min)
- [x] Day 1: Create .env file (10 min)
- [x] Day 2: Verify all image files (30 min)
- [ ] Day 3: Add missing images or placeholders

### Week 2: Important Improvements
- [ ] Day 1: Categorize skills (2 hours)
- [ ] Day 2-3: Add client logos (2-3 hours)
- [ ] Day 4: Implement password protection (2 hours)
- [ ] Day 5: Add social links + analytics (1 hour)

### Week 3: Seed Script & CMS Prep
- [ ] Day 1-2: Complete seed script (4-6 hours)
- [ ] Day 3: Test seeding process
- [ ] Day 4-5: Optional: Migrate to CMS

### Week 4: Nice to Have
- [ ] Add TypeScript types
- [ ] Image optimization
- [ ] SEO improvements
- [ ] Performance monitoring

---

## ✅ Quick Wins (< 30 minutes)

1. ✅ Fix featured projects flag
2. ✅ Create .env file
3. ✅ Add social links to JSON
4. ✅ Add order field to clients
5. ✅ Update README with data info

---

## 🎯 Success Metrics

**After Critical Fixes:**
- [ ] Homepage shows featured projects
- [ ] All images load correctly
- [ ] No security warnings

**After Important Improvements:**
- [ ] Skills are categorized and filterable
- [ ] Client logos displayed
- [ ] Password protection works
- [ ] Analytics tracking active

**After CMS Migration (Optional):**
- [ ] Admin can edit content via /admin
- [ ] Media uploads work
- [ ] All pages use CMS data
- [ ] Performance is acceptable

---

## 🚫 What NOT to Do

1. **Don't delete portfolio.json** - Keep as backup even after CMS migration
2. **Don't change URLs** - Maintain slug consistency for SEO
3. **Don't break existing pages** - Test thoroughly before deploying
4. **Don't over-engineer** - JSON works fine, CMS only if needed
5. **Don't ignore performance** - Monitor build times and page load

---

## 📞 Questions to Answer

Before starting, clarify:

1. **Will multiple people edit content?** → Determines if CMS is needed
2. **How often will content update?** → Frequency affects strategy
3. **Are client logos available?** → Impacts timeline for Action #5
4. **Which projects should be featured?** → Needed for Action #1
5. **What's the deployment platform?** → Affects .env setup

---

**Plan Version:** 1.0  
**Created:** 2026-02-10  
**Next Review:** After Week 1 completion
