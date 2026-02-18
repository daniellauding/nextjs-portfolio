# Payload CMS Integration Brief
## daniellauding.se portfolio

**Goal**: Integrate Payload CMS into the Next.js portfolio so all cases, copy, and content can be managed via admin UI at `/admin`.

## Repo & Branch
- Repo: https://github.com/daniellauding/nextjs-portfolio.git
- Local: /Users/lume/Work/internal/instinctly/daniellauding
- Branch to work from: `payload-cms` (already has payload installed)
- Current work (cases + /cases page): `dev/agent-work`
- Target new branch: `feature/payload-cms-content`

## Payload version already installed
- payload ^3.66.0
- @payloadcms/db-sqlite ^3.66.0
- @payloadcms/next ^3.66.0
- @payloadcms/richtext-lexical ^3.66.0

## Current data source
All content lives in: `src/data/portfolio.json`
Structure:
- `personal` — name, title, bio, tools, roles, status
- `skills` — array of skill strings
- `projects` — 13 case studies (see below)
- `clients` — 29 client companies
- `apps` — 5 apps (Skistar, Vromm, Pepparkakshus, Plotta, Greeto)
- `cv.experience` — work history
- `cv.education` — 3 entries
- `cv.mediumPosts` — 2 articles

## Project structure (each case)
```json
{
  "id": "project-N",
  "slug": "slug-here",
  "name": "Project Name",
  "type": "Role type",
  "date": "2024",
  "location": "City",
  "url": "https://...",
  "description": "Short description",
  "tags": ["Tag1", "Tag2"],
  "image": "/projects/image.jpg",
  "color": "#hex",
  "featured": true/false,
  "details": {
    "client": "Client Name",
    "duration": "X months",
    "team": "Team description",
    "role": "My role",
    "challenge": "Problem statement",
    "solution": "What we built",
    "impact": "Results",
    "sections": [
      { "title": "Section", "content": "Content", "images": [] }
    ],
    "testimonial": { "quote": "...", "author": "...", "role": "..." },
    "nextProject": "slug"
  }
}
```

## Task: Create Payload Collections

### 1. `projects` collection
Fields matching the project structure above. All fields:
- slug (text, required, unique)
- name (text, required)
- type (text)
- date (text)
- location (text)
- url (text)
- description (textarea, required)
- tags (array of text)
- image (upload or text URL)
- color (text, hex)
- featured (checkbox)
- client (text) — from details
- duration (text)
- teamDescription (text)
- role (text)
- challenge (textarea)
- solution (textarea)
- impact (textarea)
- sections (array with title + richtext content)
- testimonialQuote (text)
- testimonialAuthor (text)
- testimonialRole (text)
- nextProject (relationship to projects)

### 2. `apps` collection
- slug, name, icon (text URL), description, appStoreUrl, playStoreUrl, tags, color, featured
- overview, features (array), screenshots (array of URLs)

### 3. `personal` global
- name, firstName, lastName, title, subtitle, status, bio, email, phone, website
- tools (array), roles (array)

### 4. `skills` global
- skills (array of text)

### 5. `clients` collection
- name, url

### 6. `experience` collection (CV)
- title, company, companyUrl, period, description
- projects (richtext or array)
- recommendations (array with quote/author/role/date)

## Task: Seed data
Write a seed script `scripts/seed-payload.ts` that:
1. Reads `src/data/portfolio.json`
2. Uses Payload's local API to create all records
3. Can be run with `npx tsx scripts/seed-payload.ts`

## Task: Update Next.js pages
Update these files to read from Payload instead of portfolio.json:
- `src/app/page.tsx` — homepage
- `src/app/cases/page.tsx` — all cases
- `src/app/projects/[slug]/page.tsx` — individual case

Use Payload's local API:
```ts
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'projects', where: { featured: { equals: true } } })
```

## Task: Admin setup
- Enable admin at `/admin`
- Set up initial admin user in seed script
- Make sure all rich text fields use Lexical editor
- Configure upload storage (local for now, /public/uploads)

## Working server
- Local dev: http://claudebot.taild61ab7.ts.net:3000/
- After changes: run `npm run build && npm start`

## Rules
- Don't break existing pages
- Keep portfolio.json as fallback during migration
- All collections need proper TypeScript types
- Use SQLite adapter (already configured)
- Test admin at /admin after setup

## Agents needed
1. **payload-backend** — Collections config, seed script, TypeScript types
2. **payload-frontend** — Update pages to read from Payload API
3. **payload-content** — Review and improve all case study texts in admin
4. **payload-accessibility** — WCAG audit of case study pages
