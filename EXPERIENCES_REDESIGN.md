# Experiences Page Redesign - Minimal Design

## Summary
Redesigned `/experiences` page with minimal aesthetic inspired by davidpaulsson.se and added missing 15+ years of work history (2007-2025).

## What Changed

### 1. Added Missing Experience Data (2007-2015)
**Previously:** Only detailed work from 2016-2025  
**Now:** Complete 15+ year history from 2007-present

**Added positions:**
- **Backbase** (2012-2017) - Lead Designer for banking platforms (ABN Amro, UniCredit, UOB Singapore, Standard Chartered)
- **DDB Stockholm** (2015) - UX Consultant for Samsung projects
- **KLM** (2015) - Senior Design Consultant with AKQA Amsterdam for booking platform redesign
- **Instinctly AB** (2007-Present) - Updated with full historical context

### 2. Minimal Design Overhaul

#### **Removed:**
- ❌ Heavy search UI with filters
- ❌ Tag pills and complex filtering
- ❌ Card backgrounds and borders
- ❌ Timeline dots and connectors
- ❌ Expand/collapse complexity
- ❌ Framer Motion animations
- ❌ Achievement lists
- ❌ Recommendation sections
- ❌ Type badges ("Work" / "Education")
- ❌ Icons and decorative elements
- ❌ Current status indicators

#### **Kept Minimal:**
- ✅ Clean year labels (left column)
- ✅ Simple company/school names (linked)
- ✅ Role/degree subtitles
- ✅ Brief descriptions
- ✅ Generous whitespace
- ✅ Simple typography hierarchy
- ✅ Subtle hover states
- ✅ Responsive layout

### 3. Design Philosophy
Inspired by davidpaulsson.se:
- **Typography:** Light font weights, clear hierarchy
- **Layout:** Year on left, content on right, plenty of breathing room
- **Colors:** Minimal use, relying on design system variables
- **Interactions:** Subtle hover on links only
- **Information density:** One description per entry, no overwhelming detail

### 4. Code Simplification
- **Before:** ~520 lines with complex state management, filtering, animations
- **After:** ~130 lines of clean, readable React
- **Removed dependencies:** Framer Motion animations, complex useMemo logic
- **Simplified data:** No tags, achievements, or recommendations in rendered output

## File Changes

### `src/data/experiences.json`
- Added Backbase (2012-2017)
- Added KLM (2015)
- Added DDB Stockholm (2015)
- Updated Instinctly description with full 15+ year context
- Removed tags, achievements, recommendations arrays (not needed for minimal UI)
- Streamlined education entries

### `src/app/experiences/page.tsx`
Complete rewrite:
- Removed search, filtering, tag system
- Removed animations and complex state
- Simple year extraction from dates
- Clean two-column layout (year | content)
- Separate sections for Experience and Education
- ~74% reduction in code complexity

## Testing Checklist
- [ ] Visit http://claudebot.taild61ab7.ts.net:3000/experiences
- [ ] Verify all 9 work experiences shown (2007-2025)
- [ ] Verify all 3 education entries shown
- [ ] Check responsive layout on mobile
- [ ] Verify dark/light mode works
- [ ] Compare aesthetic to davidpaulsson.se/output/
- [ ] Ensure 15+ years clearly represented

## Data Source
Missing years extracted from `src/data/portfolio.json` which contained:
- Backbase banking work (2012-2017)
- AKQA/KLM project (2015)
- DDB Stockholm consulting (2015)
- Early Instinctly projects and clients

## Result
✅ **Complete:** 15+ years of experience now visible (2007-2025)  
✅ **Minimal:** Clean, breathable design matching davidpaulsson.se aesthetic  
✅ **Simple:** 74% less code, easier to maintain  
✅ **Readable:** Clear timeline with year markers and descriptions  
✅ **Fast:** No heavy animations or complex state management  

---
**Commit:** `Redesign /experiences with minimal aesthetic + add 2007-2015 history`
