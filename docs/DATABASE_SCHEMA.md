# 🗄️ Database Schema - daniellauding.se

**Database:** SQLite (`database.db`)  
**ORM:** Payload CMS 3.66.0  
**Status:** ⚠️ Empty (0 records in all tables)  
**Last Migration:** 2026-01-05 13:09:20

---

## 📊 Table Overview

**Total Tables:** 26

### Core Collections (8)
- `users` - Admin authentication
- `media` - File uploads & images
- `projects` - Portfolio case studies
- `clients` - Client logos/info
- `apps` - App showcase
- `skills` - Skill taxonomy
- `experience` - Work history
- `education` - Education entries

### Support Tables (14)
- `users_sessions`
- `projects_tags`, `projects_details_sections`, `projects_details_sections_images`
- `apps_tags`, `apps_details_features`, `apps_details_screenshots`, `apps_details_testimonials`
- `experience_projects`
- `personal_info_tools`, `personal_info_roles`, `personal_info_key_contributions`

### Globals (2)
- `personal_info` - Personal/professional information
- `site_settings` - Site configuration

### Payload System (4)
- `payload_kv` - Key-value store
- `payload_migrations` - Migration history
- `payload_locked_documents` + `_rels` - Document locking
- `payload_preferences` + `_rels` - User preferences

---

## 🔗 Entity Relationship Diagram

```
┌─────────────┐
│    users    │
│ (auth)      │
└──────┬──────┘
       │ 1:∞
       │
       ▼
┌─────────────────┐
│ users_sessions  │
└─────────────────┘


┌─────────────┐         ┌─────────────────────┐
│   media     │ 1:∞ ────│    projects         │
│ (images)    │─────────│ (portfolio)         │
└──────┬──────┘         └──────┬──────────────┘
       │                       │
       │ 1:∞                   │ 1:∞
       │                       │
       ▼                ┌──────┴───────────────────────────┐
┌─────────────┐         │                                  │
│  clients    │         ▼                                  ▼
└─────────────┘  ┌──────────────┐              ┌─────────────────────┐
                 │projects_tags │              │projects_details_    │
                 │ (array)      │              │sections             │
┌─────────────┐  └──────────────┘              └──────┬──────────────┘
│    apps     │                                       │ 1:∞
│ (showcase)  │                                       │
└──────┬──────┘                              ┌────────▼──────────────┐
       │ 1:∞                                 │projects_details_      │
       │                                     │sections_images        │
       ├──────┬──────────┬─────────┐         └───────────────────────┘
       │      │          │         │
       ▼      ▼          ▼         ▼
  ┌────────┬──────┬─────────┬──────────┐
  │apps_   │apps_ │apps_    │apps_     │
  │tags    │details│details_ │details_  │
  │        │features│screen  │testimon  │
  │        │      │shots    │ials      │
  └────────┴──────┴─────────┴──────────┘


┌──────────────┐         ┌────────────────────┐
│ experience   │ 1:∞ ────│experience_projects │
│ (work history)│         │ (array)            │
└──────────────┘         └────────────────────┘


┌──────────────┐
│  education   │
│              │
└──────────────┘


┌──────────────┐
│   skills     │
│ (taxonomy)   │
└──────────────┘


┌──────────────────┐         ┌────────────────────────────┐
│ personal_info    │ 1:∞ ────│personal_info_tools         │
│ (global)         │─────────│personal_info_roles         │
└──────────────────┘         │personal_info_key_contribs  │
                             └────────────────────────────┘


┌──────────────────┐
│ site_settings    │
│ (global)         │
└──────────────────┘
```

---

## 📋 Detailed Table Schemas

### 1. users

**Purpose:** Admin authentication for Payload CMS

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | Auto-increment |
| name | text | - | Display name |
| email | text | UNIQUE, NOT NULL | Login email |
| salt | text | - | Password salt |
| hash | text | - | Password hash |
| reset_password_token | text | - | Reset token |
| reset_password_expiration | text | - | Token expiry |
| login_attempts | numeric | DEFAULT 0 | Brute force protection |
| lock_until | text | - | Account lock timestamp |
| created_at | text | DEFAULT now() | Creation timestamp |
| updated_at | text | DEFAULT now() | Update timestamp |

**Indexes:**
- `email` (unique)
- `created_at`, `updated_at`

**Relationships:**
- 1:∞ `users_sessions`

**Current Data:** 0 users  
**Seed Data:** `admin@example.com / password123`

---

### 2. media

**Purpose:** Image and file uploads with responsive sizes

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | - |
| alt | text | NOT NULL | Alt text (accessibility) |
| url | text | - | Original file URL |
| filename | text | UNIQUE | Original filename |
| mime_type | text | - | image/jpeg, etc. |
| filesize | numeric | - | Bytes |
| width | numeric | - | Original width (px) |
| height | numeric | - | Original height (px) |
| focal_x | numeric | - | Focal point X (%) |
| focal_y | numeric | - | Focal point Y (%) |

**Image Sizes (each has: url, width, height, mime_type, filesize, filename):**
- `sizes_thumbnail_*` - 400x300 (centre crop)
- `sizes_card_*` - 768x1024 (centre crop)
- `sizes_tablet_*` - 1024x? (centre crop, maintains aspect)

**Indexes:**
- `filename` (unique)
- Each size's filename

**Upload Directory:** `media/` (configured but empty)

**Current Data:** 0 files

---

### 3. projects

**Purpose:** Portfolio case studies

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | - |
| name | text | NOT NULL | Project name |
| slug | text | UNIQUE, NOT NULL | URL slug |
| type | text | NOT NULL | Project type |
| description | text | NOT NULL | Short description |
| date | text | NOT NULL | Year/period |
| location | text | - | Geographic location |
| url | text | - | External URL |
| featured | integer | DEFAULT false | Boolean (0/1) |
| color | text | - | Hex color (#3B82F6) |
| image_id | integer | FK → media, NOT NULL | Main image |
| password | text | - | Optional password |

**Details Group (flattened):**
- `details_client`, `details_duration`, `details_team`, `details_role`
- `details_challenge`, `details_solution`, `details_impact` (textarea)
- `details_testimonial_quote`, `details_testimonial_author`, `details_testimonial_role`
- `details_next_project_id` (FK → projects, self-reference)

**Timestamps:**
- `created_at`, `updated_at`

**Indexes:**
- `slug` (unique)
- `image_id`, `details_next_project_id`

**Sub-tables:**
- `projects_tags` (1:∞) - Array of tag strings
- `projects_details_sections` (1:∞) - Content sections
- `projects_details_sections_images` (1:∞) - Nested image arrays

**Current Data:** 0 projects  
**JSON has:** 4 projects

---

### 4. projects_tags

**Purpose:** Technology/skill tags for projects

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| _order | integer | NOT NULL | Array position |
| _parent_id | integer | FK → projects, CASCADE | Parent project |
| id | text | PK | UUID |
| tag | text | - | Tag text |

**Current Data:** 0 tags

---

### 5. projects_details_sections

**Purpose:** Content sections within project details

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| _order | integer | NOT NULL | Section order |
| _parent_id | integer | FK → projects, CASCADE | Parent project |
| id | text | PK | UUID |
| title | text | NOT NULL | Section title |
| content | text | - | RichText content |

**Sub-table:**
- `projects_details_sections_images` (1:∞)

**Current Data:** 0 sections

---

### 6. projects_details_sections_images

**Purpose:** Images within project detail sections

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| _order | integer | NOT NULL | Image order |
| _parent_id | text | FK → sections, CASCADE | Parent section |
| id | text | PK | UUID |
| image_id | integer | FK → media | Image reference |

**Current Data:** 0 images

---

### 7. clients

**Purpose:** Client logos and information

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | - |
| name | text | NOT NULL | Company name |
| url | text | - | Company website |
| logo_id | integer | FK → media | Logo image |
| order | numeric | - | Display order |
| created_at | text | DEFAULT now() | - |
| updated_at | text | DEFAULT now() | - |

**Current Data:** 0 clients  
**JSON has:** 28 clients (no logos)

---

### 8. apps

**Purpose:** Mobile/web app showcase

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | - |
| name | text | NOT NULL | App name |
| slug | text | UNIQUE, NOT NULL | URL slug |
| icon_id | integer | FK → media | App icon |
| description | text | NOT NULL | Short description |
| app_store_url | text | - | iOS App Store link |
| play_store_url | text | - | Android Play Store link |
| color | text | - | Theme color (hex) |
| featured | integer | DEFAULT false | Boolean (0/1) |

**Details Group:**
- `details_category`, `details_platform`, `details_downloads`
- `details_rating`, `details_release_date`, `details_version`
- `details_overview` (richText)

**Timestamps:**
- `created_at`, `updated_at`

**Indexes:**
- `slug` (unique)
- `icon_id`

**Sub-tables:**
- `apps_tags` (1:∞)
- `apps_details_features` (1:∞)
- `apps_details_screenshots` (1:∞)
- `apps_details_testimonials` (1:∞)

**Current Data:** 0 apps  
**JSON has:** 4 apps

---

### 9. apps_tags

| Column | Type | Notes |
|--------|------|-------|
| _order | integer | Array position |
| _parent_id | integer | FK → apps |
| id | text | PK (UUID) |
| tag | text | Tag text |

---

### 10. apps_details_features

| Column | Type | Notes |
|--------|------|-------|
| _order | integer | Array position |
| _parent_id | integer | FK → apps |
| id | text | PK (UUID) |
| feature | text | Feature description |

---

### 11. apps_details_screenshots

| Column | Type | Notes |
|--------|------|-------|
| _order | integer | Array position |
| _parent_id | integer | FK → apps |
| id | text | PK (UUID) |
| screenshot_id | integer | FK → media |

---

### 12. apps_details_testimonials

| Column | Type | Notes |
|--------|------|-------|
| _order | integer | Array position |
| _parent_id | integer | FK → apps |
| id | text | PK (UUID) |
| quote | text | Testimonial text |
| author | text | Author name |
| rating | numeric | 1-5 stars |

---

### 13. skills

**Purpose:** Skill taxonomy with categorization

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | - |
| name | text | NOT NULL | Skill name |
| category | text | DEFAULT 'other' | Enum: design, development, tools, soft-skills, other |
| proficiency | text | DEFAULT 'intermediate' | Enum: expert, advanced, intermediate, beginner |
| order | numeric | - | Display order |
| created_at | text | DEFAULT now() | - |
| updated_at | text | DEFAULT now() | - |

**Current Data:** 0 skills  
**JSON has:** 75 skills (no categorization/proficiency)

---

### 14. experience

**Purpose:** Work experience / CV entries

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | - |
| title | text | NOT NULL | Job title |
| company | text | NOT NULL | Company name |
| company_url | text | - | Company website |
| period | text | NOT NULL | Date range |
| description | text | - | RichText description |
| recommendation_quote | text | - | Singular recommendation |
| recommendation_author | text | - | Recommender name |
| recommendation_role | text | - | Recommender role |
| recommendation_date | text | - | Recommendation date |
| order | numeric | - | Display order |
| created_at | text | DEFAULT now() | - |
| updated_at | text | DEFAULT now() | - |

**Sub-table:**
- `experience_projects` (1:∞) - Project descriptions

**Current Data:** 0 entries  
**JSON has:** 7 entries

**Note:** JSON uses `recommendations` (plural, array) but DB uses singular `recommendation` (group)

---

### 15. experience_projects

| Column | Type | Notes |
|--------|------|-------|
| _order | integer | Array position |
| _parent_id | integer | FK → experience |
| id | text | PK (UUID) |
| project | text | RichText project description |

---

### 16. education

**Purpose:** Education/training entries

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | - |
| degree | text | NOT NULL | Degree/program |
| school | text | NOT NULL | School name |
| school_url | text | - | School website |
| year | text | NOT NULL | Year/period |
| description | text | - | RichText description |
| order | numeric | - | Display order |
| created_at | text | DEFAULT now() | - |
| updated_at | text | DEFAULT now() | - |

**Current Data:** 0 entries  
**JSON has:** 3 entries

---

### 17. personal_info (Global)

**Purpose:** Personal/professional information singleton

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | Always 1 record |
| name | text | NOT NULL | Full name |
| first_name | text | NOT NULL | First name |
| last_name | text | NOT NULL | Last name |
| title | text | NOT NULL | Professional title |
| subtitle | text | - | Sub-headline |
| status | text | - | Current status |
| studio | text | - | Company/studio |
| location | text | - | Location |
| email | text | NOT NULL | Contact email |
| phone | text | - | Contact phone |
| website | text | - | Portfolio URL |
| bio | text | NOT NULL | RichText bio |
| avatar_id | integer | FK → media | Profile picture |
| experience | text | - | Experience summary |

**Social Links Group:**
- `social_links_linkedin`, `social_links_github`
- `social_links_medium`, `social_links_twitter`

**Timestamps:**
- `created_at`, `updated_at`

**Sub-tables:**
- `personal_info_tools` (1:∞)
- `personal_info_roles` (1:∞)
- `personal_info_key_contributions` (1:∞)

**Current Data:** Empty global

---

### 18. personal_info_tools

| Column | Type | Notes |
|--------|------|-------|
| _order | integer | Array position |
| _parent_id | integer | FK → personal_info |
| id | text | PK (UUID) |
| tool | text | Tool/technology name |

---

### 19. personal_info_roles

| Column | Type | Notes |
|--------|------|-------|
| _order | integer | Array position |
| _parent_id | integer | FK → personal_info |
| id | text | PK (UUID) |
| role | text | Professional role |

---

### 20. personal_info_key_contributions

| Column | Type | Notes |
|--------|------|-------|
| _order | integer | Array position |
| _parent_id | integer | FK → personal_info |
| id | text | PK (UUID) |
| contribution | text | Key contribution text |

---

### 21. site_settings (Global)

**Purpose:** Site-wide configuration singleton

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | integer | PK | Always 1 record |
| site_name | text | NOT NULL, DEFAULT 'Portfolio' | Site name |
| site_description | text | - | Meta description |
| site_keywords | text | - | SEO keywords |
| og_image_id | integer | FK → media | Open Graph image |
| favicon_id | integer | FK → media | Favicon |

**Analytics Group:**
- `analytics_google_analytics` - GA tracking ID
- `analytics_posthog_key` - PostHog API key
- `analytics_posthog_host` - PostHog host URL

**Maintenance Group:**
- `maintenance_enabled` (integer, boolean) - Maintenance mode
- `maintenance_message` (text) - Maintenance message

**Timestamps:**
- `created_at`, `updated_at`

**Current Data:** Empty global

---

## 🔍 Key Relationships

### Media Relationships
```
media (1) ──┬──< projects.image_id
            ├──< clients.logo_id
            ├──< apps.icon_id
            ├──< personal_info.avatar_id
            ├──< site_settings.og_image_id
            ├──< site_settings.favicon_id
            ├──< projects_details_sections_images.image_id
            └──< apps_details_screenshots.screenshot_id
```

### Projects Relationships
```
projects (1) ──┬──< projects_tags
               ├──< projects_details_sections
               │    └──< projects_details_sections_images
               └──< projects.details_next_project_id (self)
```

### Apps Relationships
```
apps (1) ──┬──< apps_tags
           ├──< apps_details_features
           ├──< apps_details_screenshots
           └──< apps_details_testimonials
```

---

## 📊 Data Integrity

### Constraints

- **Unique Keys:** slug fields (projects, apps), email (users), filename (media)
- **Foreign Keys:** All with CASCADE delete on parent removal
- **Required Fields:** name, email, title, description fields
- **Defaults:** Timestamps (now()), booleans (false), enums

### Indexes

All tables have indexes on:
- Primary keys
- Foreign keys
- Timestamps (`created_at`, `updated_at`)
- Unique fields (`slug`, `email`, `filename`)

---

## 🔄 Migration Status

| Migration | Batch | Date |
|-----------|-------|------|
| dev | -1 | 2026-01-05 13:09:20 |

**Status:** Schema created, no data migrations yet.

---

## ⚠️ Current Issues

1. **All tables empty** - Database has structure but no data
2. **Seed script incomplete** - Doesn't seed projects/apps/media
3. **No admin user** - Can't access `/admin` panel
4. **Media directory empty** - No uploaded files
5. **Globals not populated** - personal_info and site_settings empty

---

## 🎯 Recommendations

### To Activate CMS

1. **Run seed script:** `npm run seed`
2. **Create admin user** (included in seed)
3. **Upload media files** via `/admin` panel
4. **Populate globals** via `/admin/globals`
5. **Set USE_CMS=true** in environment

### To Enhance Seed Script

Add seeding for:
- Projects (with image uploads)
- Apps (with icons/screenshots)
- Media files (programmatic upload)
- Globals (personal_info, site_settings)

---

**Schema Version:** 1.0  
**Last Updated:** 2026-02-10  
**Database Size:** 524 KB (empty)
