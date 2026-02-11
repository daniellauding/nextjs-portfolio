# 📄 portfolio.json - Schema Documentation

**File:** `src/data/portfolio.json`  
**Lines:** ~1,980  
**Size:** ~85 KB  
**Format:** JSON

---

## 🗂️ Root Structure

```json
{
  "personal": { ... },      // Personal information object
  "skills": [ ... ],        // Array of skill strings (75 items)
  "projects": [ ... ],      // Array of project objects (4 items)
  "clients": [ ... ],       // Array of client objects (28 items)
  "apps": [ ... ],          // Array of app objects (4 items)
  "cv": { ... }             // CV object (experience, education)
}
```

---

## 📋 Field Reference

### `personal` Object

| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| name | string | ✅ | "Daniel Lauding" | Full name |
| firstName | string | ✅ | "Daniel" | First name only |
| lastName | string | ✅ | "Lauding" | Last name only |
| title | string | ✅ | "Design Engineer · Lead Product Design..." | Professional headline |
| subtitle | string | ❌ | "Creator · Builder · Enabler..." | Sub-headline |
| status | string | ❌ | "Open for 2026 opportunities" | Current status |
| studio | string | ❌ | "Instinctly" | Company/studio name |
| location | string | ❌ | "Lund/Stockholm" | Geographic location |
| email | string | ✅ | "daniel@lauding.se" | Contact email |
| phone | string | ❌ | "+46(0) 73 918 44 10" | Contact phone |
| website | string | ❌ | "http://www.daniellauding.se" | Portfolio URL |
| bio | string | ✅ | Long text (~850 chars) | Professional biography |
| tools | string[] | ❌ | ["Figma", "Cursor", "Supabase", ...] | 11 tools/technologies |
| roles | string[] | ❌ | ["Lead Product Designer", ...] | 6 professional roles |
| experience | string | ❌ | "15+ years • Design to Code..." | Experience summary |

**Usage:**
```typescript
import portfolioData from '@/data/portfolio.json'
const { name, email, bio } = portfolioData.personal
```

---

### `skills` Array

**Structure:** Array of strings (75 items)

**Categories (inferred):**
- **Design:** Product Design, UX/UI Design, Design Systems, Figma, Sketch, etc.
- **Development:** React, TypeScript, Next.js, Vue.js, React Native, etc.
- **Tools:** Cursor, Lovable, Supabase, Git, Notion, etc.
- **Soft Skills:** Leadership, Workshop Facilitation, Stakeholder Collaboration, etc.

**Example:**
```json
[
  "Product Design",
  "UX/UI Design",
  "Design Systems",
  "React",
  "TypeScript",
  ...
]
```

**Current Issues:**
- ❌ No categorization
- ❌ No proficiency levels
- ❌ Potential duplicates

**Usage:**
```typescript
const skills = portfolioData.skills
const hasReact = skills.includes('React')
```

---

### `projects` Array

**Structure:** Array of project objects (4 items)

#### Project Object Fields

| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| id | string | ✅ | "project-1" | Unique ID |
| slug | string | ✅ | "vromm-driving-app" | URL-friendly slug |
| name | string | ✅ | "Vromm - Driving Instruction App" | Project title |
| type | string | ✅ | "Product Design & Development" | Project type |
| url | string | ❌ | "https://www.vromm.se" | External URL |
| date | string | ✅ | "2025" | Year or period |
| location | string | ❌ | "Remote/Stockholm" | Location |
| description | string | ✅ | Short description (~150 chars) | Brief summary |
| tags | string[] | ❌ | ["Product Design", "React Native", ...] | Technology tags |
| image | string | ✅ | "/projects/vromm.jpg" | Main image path |
| color | string | ❌ | "#3B82F6" | Theme color (hex) |
| featured | boolean | ❌ | false | Featured on homepage |
| password | string\|null | ❌ | "WELCOME" | Password protection |
| details | object | ❌ | { ... } | Detailed information |

#### Project Details Object

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| client | string | ❌ | Client name |
| duration | string | ❌ | Project duration |
| team | string | ❌ | Team composition |
| role | string | ❌ | Your role |
| challenge | string | ❌ | Problem statement |
| solution | string | ❌ | Solution description |
| impact | string | ❌ | Results/impact |
| sections | array | ❌ | Content sections |
| testimonial | object | ❌ | Client testimonial |
| nextProject | string | ❌ | Slug of next project |

#### Project Section

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | ✅ | Section title |
| content | string | ❌ | Section content |
| images | string[] | ❌ | Image paths |

#### Testimonial Object

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| quote | string | ❌ | Testimonial quote |
| author | string | ❌ | Author name |
| role | string | ❌ | Author role |

**Example:**
```json
{
  "id": "project-1",
  "slug": "vromm-driving-app",
  "name": "Vromm - Driving Instruction App",
  "type": "Product Design & Development",
  "url": "https://www.vromm.se",
  "date": "2025",
  "location": "Remote/Stockholm",
  "description": "Building a smarter, more engaging way...",
  "tags": ["Product Design", "React Native", "AI"],
  "image": "/projects/vromm.jpg",
  "color": "#3B82F6",
  "featured": false,
  "password": "WELCOME",
  "details": {
    "client": "Vromm (Own Startup)",
    "duration": "Ongoing (2025-Present)",
    "role": "Founder & Product Designer",
    "sections": [...],
    "testimonial": {
      "quote": "Really impressed with the user experience...",
      "author": "Maria Andersson",
      "role": "Driving Instructor, Skåne"
    }
  }
}
```

**Usage:**
```typescript
const project = portfolioData.projects.find(p => p.slug === 'vromm-driving-app')
const featuredProjects = portfolioData.projects.filter(p => p.featured)
```

**Current Issues:**
- ❌ All projects have `featured: false`
- ⚠️ Password protection not implemented in UI
- ⚠️ Some image paths may not exist

---

### `clients` Array

**Structure:** Array of client objects (28 items)

#### Client Object Fields

| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| id | string | ✅ | "client-1" | Unique ID |
| name | string | ✅ | "Spotify" | Company name |
| url | string | ❌ | "https://www.spotify.com" | Company website |

**Example:**
```json
{
  "id": "client-1",
  "name": "Spotify",
  "url": "https://www.spotify.com"
}
```

**Usage:**
```typescript
const clients = portfolioData.clients
const spotify = clients.find(c => c.name === 'Spotify')
```

**Missing Fields (in DB schema but not JSON):**
- ❌ `logo` (upload field)
- ❌ `order` (sorting number)

---

### `apps` Array

**Structure:** Array of app objects (4 items)

#### App Object Fields

| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| id | string | ✅ | "app-1" | Unique ID |
| slug | string | ✅ | "vromm-app" | URL-friendly slug |
| name | string | ✅ | "Vromm" | App name |
| icon | string | ✅ | "/apps/app_vromm.png" | Icon path or letter |
| description | string | ✅ | "AI-powered driving instruction app" | Short description |
| appStoreUrl | string\|null | ❌ | "https://apps.apple.com/..." | iOS App Store link |
| playStoreUrl | string\|null | ❌ | "https://play.google.com/..." | Android Play Store link |
| tags | string[] | ❌ | ["React Native", "AI", ...] | Technology tags |
| color | string | ❌ | "#3B82F6" | Theme color (hex) |
| featured | boolean | ❌ | true | Featured on homepage |
| details | object | ❌ | { ... } | Detailed information |

#### App Details Object

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| category | string | ❌ | "Education" |
| platform | string | ❌ | "React Native" |
| downloads | string | ❌ | "Internal MVP" |
| rating | string | ❌ | "Beta Testing" |
| releaseDate | string | ❌ | "2025" |
| version | string | ❌ | "1.0" |
| overview | string | ❌ | Long description |
| features | string[] | ❌ | Feature list |
| screenshots | string[] | ❌ | Screenshot paths |
| testimonials | array | ❌ | User testimonials |

#### App Testimonial

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| quote | string | ✅ | Testimonial text |
| author | string | ✅ | Author name |
| rating | number | ❌ | 1-5 stars |

**Example:**
```json
{
  "id": "app-1",
  "slug": "vromm-app",
  "name": "Vromm",
  "icon": "/apps/app_vromm.png",
  "description": "AI-powered driving instruction app",
  "appStoreUrl": "https://www.vromm.se",
  "playStoreUrl": null,
  "tags": ["React Native", "AI", "Education"],
  "color": "#3B82F6",
  "featured": true,
  "details": {
    "category": "Education",
    "platform": "React Native",
    "features": [
      "AI-powered route planning",
      "Gamified progress tracking",
      ...
    ]
  }
}
```

**Usage:**
```typescript
const featuredApps = portfolioData.apps.filter(app => app.featured)
```

---

### `cv` Object

**Structure:**
```json
{
  "experience": [...],       // Array of experience objects (7 items)
  "education": [...],        // Array of education objects (3 items)
  "keyContributions": [...], // Array of strings (3 items)
  "mediumPosts": [...]       // Array of post objects (2 items)
}
```

#### Experience Object

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | ✅ | Job title |
| company | string | ✅ | Company name |
| companyUrl | string | ❌ | Company website |
| period | string | ✅ | Time period |
| description | string | ❌ | Role description |
| recommendations | array | ❌ | Array of recommendation objects |
| projects | string[] | ❌ | Project descriptions |
| recommendation | object | ❌ | Single recommendation (some entries) |

#### Recommendation Object

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| quote | string | ✅ | Recommendation text |
| author | string | ✅ | Recommender name |
| role | string | ✅ | Recommender role |
| date | string | ✅ | Date of recommendation |

**Example:**
```json
{
  "title": "Founder & Design Consultant",
  "company": "Instinctly",
  "companyUrl": "https://www.instinctly.se",
  "period": "2007 - Present",
  "description": "Design & development consultancy...",
  "recommendations": [
    {
      "quote": "I highly recommend Daniel!...",
      "author": "Jens Wedin",
      "role": "Design Director, Service Designer",
      "date": "December, 2025"
    }
  ],
  "projects": [
    "All Aboard (2025) – Product Design Consultant...",
    "Qasa (2025) – Senior Product Design Consultant..."
  ]
}
```

**Data Inconsistency:**
- ⚠️ Some entries use `recommendations` (array)
- ⚠️ Some entries use `recommendation` (single object)

---

#### Education Object

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| degree | string | ✅ | Degree/program name |
| school | string | ✅ | School name |
| schoolUrl | string | ❌ | School website |
| year | string | ✅ | Year or period |

**Example:**
```json
{
  "degree": "JavaScript Bootcamp",
  "school": "Technigo",
  "schoolUrl": "https://www.technigo.com",
  "year": "2025-2026"
}
```

---

#### Medium Post Object

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | ✅ | Article title |
| url | string | ✅ | Article URL |

**Example:**
```json
{
  "title": "My Path Wasn't Linear, But It Makes Sense Now",
  "url": "https://medium.com/@daniellauding/my-path-wasnt-linear-but-it-makes-sense-now-408dc1aeb47e"
}
```

---

## 🔍 Quick Lookup Tables

### Projects by Slug

| Slug | Name | Date | Featured |
|------|------|------|----------|
| vromm-driving-app | Vromm - Driving Instruction App | 2025 | ❌ |
| qasa-rental-platform | Qasa - Rental Matching Platform | 2025 | ❌ |
| asteria-fintech | Asteria - Smart Cash Flow | 2017-2025 | ❌ |
| spotify-data-saver | Spotify - Data Saver Feature | 2017 | ❌ |

### Apps by Slug

| Slug | Name | Featured |
|------|------|----------|
| vromm-app | Vromm | ✅ |
| pepparkakshus-battle | Pepparkakshus Battle | ✅ |
| plotta | plotta | ❌ |
| greeto | Greeto | ✅ |

### Top Clients

1. Spotify
2. Swedbank
3. Länsförsäkringar
4. KLM
5. Qasa
6. Backbase
7. PayEx
8. ABN Amro
9. UniCredit
10. UOB Singapore

### Skills by Category (Inferred)

**Design (25 skills):**
Product Design, UX/UI Design, Design Systems, Figma, Sketch, Adobe Photoshop, Wireframing, Prototyping, Visual Design, User Interface Design, etc.

**Development (30 skills):**
React, TypeScript, Next.js, Vue.js, React Native, JavaScript, HTML, CSS, Redux.js, React Router, Tailwind, etc.

**Tools (10 skills):**
Cursor, Lovable, Supabase, Git, Notion, WordPress, Google Analytics, SEO, etc.

**Soft Skills (10 skills):**
Leadership, Workshop Facilitation, Stakeholder Collaboration, Cross-team Collaboration, Planning, Growth, etc.

---

## 📊 Data Statistics

| Metric | Count |
|--------|-------|
| Total skills | 75 |
| Total projects | 4 |
| Total clients | 28 |
| Total apps | 4 |
| Experience entries | 7 |
| Education entries | 3 |
| Key contributions | 3 |
| Medium posts | 2 |
| Featured projects | 0 ❌ |
| Featured apps | 3 |
| Password-protected projects | 3 |

---

## ⚠️ Known Issues

1. **No featured projects** - All 4 projects have `featured: false`
2. **Skills not categorized** - Flat array, no structure
3. **Missing client logos** - No logo field in JSON
4. **Image paths may not exist** - Some referenced images missing
5. **Inconsistent recommendations** - Some use array, some use object
6. **Password protection not implemented** - Defined but not enforced in UI

---

## 🔄 Update Process

To update portfolio data:

1. Open `src/data/portfolio.json`
2. Edit the relevant section
3. Validate JSON syntax
4. Test locally (`npm run dev`)
5. Commit and push

**No database sync needed** - JSON is the source of truth.

---

**Last Updated:** 2026-02-10  
**Maintained By:** Backend Developer Agent
