# ⚡ Quick Reference - daniellauding.se Data

**TL;DR:** Portfolio uses JSON as primary data source. Payload CMS configured but not active.

---

## 📂 Data Sources

| Source | Status | Location | Usage |
|--------|--------|----------|-------|
| portfolio.json | ✅ Active | `src/data/portfolio.json` | Primary data source |
| database.db | ⚠️ Empty | `./database.db` | SQLite, 0 records |
| Payload CMS | ⚠️ Inactive | `/admin` | Not used (USE_CMS=false) |

---

## 🎯 Key Data Locations

### JSON Structure
```
portfolio.json
├── personal       (1 object)  - Personal info, bio, tools, roles
├── skills         (75 items)  - Skill list (flat array)
├── projects       (4 items)   - Portfolio case studies
├── clients        (28 items)  - Client logos
├── apps           (4 items)   - App showcase
└── cv
    ├── experience (7 items)   - Work history
    ├── education  (3 items)   - Education
    ├── keyContributions (3)   - Highlights
    └── mediumPosts (2 items)  - Blog posts
```

### Database (Empty)
```
Collections:
- users (0)
- media (0)
- projects (0)
- clients (0)
- apps (0)
- skills (0)
- experience (0)
- education (0)

Globals:
- personal_info (empty)
- site_settings (empty)
```

---

## 🔧 Common Tasks

### Add a New Project

1. Edit `src/data/portfolio.json`
2. Add to `projects` array:
```json
{
  "id": "project-5",
  "slug": "new-project-slug",
  "name": "New Project Name",
  "type": "Product Design",
  "description": "Short description...",
  "date": "2026",
  "tags": ["React", "TypeScript"],
  "image": "/projects/new-project.jpg",
  "featured": true,
  "details": { ... }
}
```
3. Add image to `/public/projects/`
4. Test locally: `npm run dev`

### Add a New Client

```json
{
  "id": "client-29",
  "name": "New Client",
  "url": "https://newclient.com"
}
```

Add to `clients` array in portfolio.json.

### Add a New Skill

Add string to `skills` array:
```json
"skills": [
  "Product Design",
  "React",
  "New Skill Here"  // ← Add here
]
```

### Update Personal Info

Edit `personal` object in portfolio.json:
```json
{
  "name": "Daniel Lauding",
  "email": "daniel@lauding.se",
  "bio": "Updated bio text...",
  ...
}
```

---

## 🚦 Feature Flags

### USE_CMS Environment Variable

```bash
# Current (default)
USE_CMS=false          # Uses portfolio.json

# To activate Payload CMS
USE_CMS=true           # Uses database.db
```

**Location:** `.env` (create if missing)

**Code:** `src/lib/data.ts`

---

## 📊 Data Flow

```
User Request
    ↓
Page Component (page.tsx)
    ↓
    ├─→ Direct JSON Import (current)
    │   └─→ portfolio.json ✅
    │
    └─→ src/lib/data.ts (abstraction)
        └─→ Check USE_CMS
            ├─→ true → Payload CMS → database.db ⚠️ (empty)
            └─→ false → portfolio.json ✅
```

---

## 🐛 Known Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| No featured projects | None shown on homepage | Set `featured: true` in JSON |
| Database empty | CMS not usable | Run `npm run seed` |
| Skills not categorized | No filtering possible | Add category field |
| Client logos missing | Only names shown | Add logo field + files |
| Some images missing | Broken image links | Add files to /public/ |

---

## 🔑 Important Paths

| Item | Path |
|------|------|
| Portfolio data | `src/data/portfolio.json` |
| Database | `./database.db` |
| Collections | `src/collections/*.ts` |
| Globals | `src/globals/*.ts` |
| Data abstraction | `src/lib/data.ts` |
| Payload helpers | `src/lib/payload.ts` |
| Seed script | `scripts/seed.js` |
| Admin panel | `http://localhost:3000/admin` |
| API endpoint | `http://localhost:3000/api/projects` |

---

## 📝 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Seed database (populates CMS)
npm run seed

# Generate TypeScript types from Payload
npm run generate:types

# Access admin panel
# → http://localhost:3000/admin
```

---

## 🎨 Image Locations

| Type | Directory | Example |
|------|-----------|---------|
| Project images | `/public/projects/` | vromm.jpg |
| Project details | `/public/projects/vromm/` | research-1.jpg |
| App icons | `/public/apps/` | app_vromm.png |
| App screenshots | `/public/apps/vromm/` | screen-1.jpg |
| Client logos | `/public/clients/` | spotify.svg |
| Personal | `/public/` | avatar.png, og-image.png |

---

## 🔍 Search & Filter

### Find a Project by Slug
```typescript
const project = portfolioData.projects.find(p => p.slug === 'vromm-driving-app')
```

### Get Featured Projects
```typescript
const featured = portfolioData.projects.filter(p => p.featured)
// ⚠️ Currently returns [] (no featured projects)
```

### Get All Skills
```typescript
const skills = portfolioData.skills
// Array of 75 strings
```

### Find Client by Name
```typescript
const client = portfolioData.clients.find(c => c.name === 'Spotify')
```

---

## ⚡ Performance Tips

1. **JSON is fast** - No database queries needed
2. **Static generation** - Next.js builds pages at build time
3. **Image optimization** - Use Next.js Image component
4. **Caching** - Static JSON is cached by browser

---

## 🔒 Password-Protected Projects

| Project | Password |
|---------|----------|
| Vromm | WELCOME |
| Qasa | WELCOME |
| Asteria | fintech2025 |
| Spotify | WELCOME |

⚠️ **Note:** Password protection defined in JSON but not implemented in UI yet.

---

## 📊 Data Statistics

| Metric | Count |
|--------|-------|
| Skills | 75 |
| Projects | 4 |
| Clients | 28 |
| Apps | 4 |
| Experience | 7 |
| Education | 3 |
| Featured Projects | 0 ❌ |
| Featured Apps | 3 |

---

## 🆘 Troubleshooting

### Issue: Image not showing
**Check:**
1. File exists in `/public/` directory
2. Path in JSON matches file location
3. File extension is correct (.jpg, .png, etc.)

### Issue: Changes not reflected
**Solutions:**
1. Restart dev server: `npm run dev`
2. Clear `.next` cache: `rm -rf .next`
3. Hard refresh browser: `Cmd+Shift+R`

### Issue: Admin panel not loading
**Check:**
1. Database exists: `ls -la database.db`
2. Migrations run: Check payload_migrations table
3. User created: Run `npm run seed`

### Issue: 404 on project page
**Check:**
1. Slug matches URL
2. Project exists in portfolio.json
3. Dynamic route exists: `src/app/projects/[slug]/page.tsx`

---

## 📞 Need Help?

1. **Check main docs:** `docs/DATA_RECONNAISSANCE.md`
2. **JSON schema:** `docs/JSON_SCHEMA.md`
3. **Database schema:** `docs/DATABASE_SCHEMA.md`

---

**Last Updated:** 2026-02-10  
**Quick Access Version:** 1.0
