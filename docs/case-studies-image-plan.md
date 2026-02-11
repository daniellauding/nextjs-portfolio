# Case Studies - Image Integration Plan

## 📸 Image Placement Guide

This document shows exactly where images should be added to the case study pages once extracted from Figma.

---

## 🟢 Qasa Case Study (`/work/qasa`)

### Current State
- ✅ Full content and copy
- ✅ Layout and structure
- ⚠️ Using placeholder SVG icons
- 🎯 Needs 6-8 images from Figma

### Image Slots

#### 1. Hero Section (Optional)
```tsx
// Location: Line ~10-60
// Current: Solid green background (#10B981)
// Enhancement: Add subtle background pattern or image

Suggested image: public/work/qasa/hero-bg.png
Size: 1920x1080px (landscape)
Usage: Background with overlay
```

#### 2. Research & Analysis Section
```tsx
// Location: Lines ~200-230
// Current: Two placeholder SVG boxes
// Status: ⚠️ NEEDS IMAGES

Slot 1: public/work/qasa/research-findings.png
  - Research findings & CSAT analysis
  - Charts, graphs, data visualization
  - Suggested size: 1200x675px

Slot 2: public/work/qasa/market-benchmarking.png
  - Nordic market comparison (SE, FI, NO)
  - Competitive analysis visuals
  - Suggested size: 1200x675px
```

#### 3. AI-Enhanced Design Process (Optional)
```tsx
// Location: Lines ~235-270
// Current: Text-only section
// Enhancement: Process diagram or workflow

Suggested image: public/work/qasa/ai-process-diagram.png
Size: 1200x800px
Usage: Inline below numbered steps
```

#### 4. Lovable Prototyping Tool Section
```tsx
// Location: Lines ~275-305
// Current: Two placeholder SVG boxes
// Status: ⚠️ NEEDS IMAGES

Slot 1: public/work/qasa/lovable-tool-config.png
  - Lovable tool interface
  - Configuration screen
  - Suggested size: 1200x675px

Slot 2: public/work/qasa/lovable-prototype.png
  - Interactive prototype showcase
  - Working demo screenshot
  - Suggested size: 1200x675px
```

#### 5. Before/After Comparison (Optional Addition)
```tsx
// Suggested location: After Impact section
// Enhancement: Show redesign improvements

Images needed:
  - public/work/qasa/before-upload-flow.png
  - public/work/qasa/after-upload-flow.png
Size: 800x600px each (side by side)
```

---

## 🔵 Vromm Case Study (`/work/vromm`)

### Current State
- ✅ Full content and copy
- ✅ Layout and structure
- ⚠️ Using placeholder SVG icons
- 🎯 Needs 8-10 images from Figma

### Image Slots

#### 1. Hero Section (Optional)
```tsx
// Location: Line ~10-60
// Current: Solid blue background (#3B82F6)
// Enhancement: Add subtle background pattern or app preview

Suggested image: public/work/vromm/hero-bg.png
Size: 1920x1080px (landscape)
Usage: Background with overlay
```

#### 2. Research & Discovery Section
```tsx
// Location: Lines ~200-250
// Current: Two boxes (one text, one placeholder)
// Status: ⚠️ NEEDS IMAGE

Slot 1: public/work/vromm/research-insights.png
  - Survey results visualization
  - Stakeholder feedback compilation
  - User journey mapping
  - Suggested size: 1200x675px
```

#### 3. AI-Powered Development Section
```tsx
// Location: Lines ~255-310
// Current: Text-only with numbered steps
// Enhancement: Workflow diagram

Suggested image: public/work/vromm/ai-workflow-diagram.png
Size: 1200x900px
Usage: After the 4-step process
```

#### 4. Product & Key Features Section
```tsx
// Location: Lines ~315-360
// Current: Three feature cards with icons
// Enhancement: Feature screenshots

Optional images (3):
  - public/work/vromm/feature-route-planning.png
  - public/work/vromm/feature-gamification.png
  - public/work/vromm/feature-collaboration.png
Size: 600x400px each
```

#### 5. App Preview Section ⚠️ HIGH PRIORITY
```tsx
// Location: Lines ~365-385
// Current: Three placeholder mobile frames
// Status: ⚠️ NEEDS IMAGES

Slot 1: public/work/vromm/app-screen-1.png
  - Home screen / Dashboard
  - Mobile portrait format
  - Suggested size: 750x1624px (iPhone 13 Pro)

Slot 2: public/work/vromm/app-screen-2.png
  - Route planning interface
  - Mobile portrait format
  - Suggested size: 750x1624px

Slot 3: public/work/vromm/app-screen-3.png
  - Progress tracking / Achievements
  - Mobile portrait format
  - Suggested size: 750x1624px
```

#### 6. Technology Stack (Optional Enhancement)
```tsx
// Location: Lines ~390-410
// Current: Simple text cards
// Enhancement: Tech stack diagram

Suggested image: public/work/vromm/tech-architecture.png
Size: 1200x800px
Usage: Replace text cards or add below
```

---

## 🎨 Figma Export Settings

### Recommended Export Settings
```
Format: PNG
Scale: 2x (@2x for Retina displays)
Color space: sRGB
Background: Transparent (where applicable)
```

### Naming Convention
```
Format: kebab-case.png
Examples:
  ✅ research-findings.png
  ✅ app-screen-1.png
  ✅ lovable-tool-config.png
  ❌ Research Findings.png
  ❌ AppScreen1.png
```

### File Size Targets
```
Hero backgrounds: < 500KB (compress with tinypng.com)
Screenshots: < 300KB
Mobile app screens: < 200KB
Icons/diagrams: < 150KB
```

---

## 🔄 Implementation Workflow

### Step 1: Export from Figma
```bash
# Use the provided script
./scripts/extract-figma-assets.sh

# Or manually:
# 1. Open Figma file
# 2. Select frame → Export → PNG @2x
# 3. Save to correct directory
```

### Step 2: Optimize Images
```bash
# Install imagemagick if needed
brew install imagemagick

# Optimize all images
cd ~/Work/internal/instinctly/daniellauding/public/work
find . -name "*.png" -exec mogrify -strip -quality 85 {} \;
```

### Step 3: Update Components

#### Example: Replace placeholder with real image

**Before:**
```tsx
<div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
  <div className="text-center p-8">
    <svg className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
    <p className="text-sm text-[var(--text-muted)]">Research findings & CSAT analysis</p>
  </div>
</div>
```

**After:**
```tsx
<div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden">
  <Image 
    src="/work/qasa/research-findings.png"
    alt="Research findings showing CSAT scores and user feedback analysis"
    width={1200}
    height={675}
    className="object-cover w-full h-full"
    priority={false}
  />
</div>
```

#### Don't forget to import Image:
```tsx
import Image from "next/image";
```

### Step 4: Test Locally
```bash
cd ~/Work/internal/instinctly/daniellauding
npm run dev

# Open in browser:
# http://localhost:3000/work/qasa
# http://localhost:3000/work/vromm

# Check:
# ✅ Images load correctly
# ✅ Responsive on mobile/tablet/desktop
# ✅ No layout shift (proper width/height props)
# ✅ Alt text for accessibility
```

### Step 5: Commit & Deploy
```bash
git add public/work
git add src/app/work
git commit -m "feat: Add case study images from Figma

- Add Qasa case study screenshots and visuals
- Add Vromm app screens and interface previews
- Optimize all images for web delivery
- Update Image components with proper sizing"

git push origin dev/agent-work
```

---

## 📊 Priority Matrix

### 🔴 High Priority (Must Have)
- [ ] Vromm app screens (3 mobile screenshots)
- [ ] Qasa research findings
- [ ] Qasa Lovable tool screenshots

### 🟡 Medium Priority (Should Have)
- [ ] Qasa market benchmarking
- [ ] Vromm research insights
- [ ] All remaining placeholder slots

### 🟢 Low Priority (Nice to Have)
- [ ] Hero background images
- [ ] Process diagrams
- [ ] Tech stack visualizations
- [ ] Before/after comparisons

---

## ✅ Completion Checklist

### Qasa
- [ ] 2 images in Research & Analysis section
- [ ] 2 images in Lovable Prototyping section
- [ ] Optional: Hero background
- [ ] Optional: AI process diagram
- [ ] Optional: Before/after comparison

### Vromm
- [ ] 3 mobile app screenshots
- [ ] 1 research insights image
- [ ] Optional: Hero background
- [ ] Optional: AI workflow diagram
- [ ] Optional: Tech architecture diagram
- [ ] Optional: 3 feature screenshots

### Final QA
- [ ] All images < 500KB
- [ ] All alt text added
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Client approval obtained

---

## 🆘 Troubleshooting

### Images not loading?
```bash
# Check file exists
ls -lh public/work/qasa/research-findings.png

# Check Next.js is serving static files
curl http://localhost:3000/work/qasa/research-findings.png

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Images too large?
```bash
# Compress with imagemagick
mogrify -strip -quality 80 -resize 1200x675 public/work/qasa/*.png

# Or use online tool
open https://tinypng.com
```

### Layout shift / CLS issues?
- Always set explicit `width` and `height` props
- Use `aspect-ratio` CSS to maintain proportions
- Add `priority` prop for above-the-fold images

---

**Last Updated**: 2026-02-11
**Maintained By**: Agent Subagent (Claude)
**For Questions**: See CASE_STUDIES_STATUS.md
