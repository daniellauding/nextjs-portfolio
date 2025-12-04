# Tag Filtering Features

## Overview
The portfolio now supports cross-component tag filtering. When a user clicks on a skill tag in the Skills component, it filters content across multiple sections of the site.

## Components Updated

### 1. Skills Component (`src/components/Skills.tsx`)
- ✅ Already had tag filtering functionality
- Shows active tag indicator with "×" button to clear filter
- Manages the `activeTag` state and `onTagClick` callback

### 2. CV Component (`src/components/CV.tsx`)
- ✅ **NEW**: Now supports tag filtering
- Filters experience entries based on matches in:
  - Job titles
  - Company names
  - Job descriptions
  - Project lists (expanded sections)
  - Recommendations (quotes and author names)
- **Visual Features**:
  - Highlights matching text with accent color background
  - Shows filtering indicator with entry count
  - Displays "No entries found" message when no matches
- **Smart Filtering**: Case-insensitive partial matching

### 3. Main Page (`src/app/page.tsx`)
- ✅ Passes `activeTag` prop to CV component
- Already had filtering for Projects and Apps (currently commented out)

## How It Works

1. **User clicks a skill tag** → `Skills` component calls `onTagClick(tagName)`
2. **State updates** → `activeTag` state is updated in the main page component
3. **Components react** → All connected components filter their content:
   - Skills: Shows active tag indicator
   - CV: Filters experience entries and highlights matches
   - Projects: (Ready but currently commented out)
   - Apps: (Ready but currently commented out)

## Example Usage

When a user clicks "Vue.js" in the Skills section:
- ✅ Skills section shows "Filtering by: Vue.js ×" indicator
- ✅ CV section shows "Showing CV entries related to: Vue.js (X entries found)"
- ✅ Only experience entries mentioning Vue.js are displayed
- ✅ "Vue.js" text is highlighted wherever it appears

## Technical Implementation

### Filtering Logic (CV Component)
```typescript
const filteredExperience = activeTag
  ? experience.filter((exp) => {
      const searchTerm = activeTag.toLowerCase();
      
      // Check multiple fields for matches
      const projectsMatch = exp.projects?.some(project => 
        project.toLowerCase().includes(searchTerm)
      ) || false;
      
      const descriptionMatch = exp.description.toLowerCase().includes(searchTerm);
      const companyMatch = exp.company.toLowerCase().includes(searchTerm);
      const titleMatch = exp.title.toLowerCase().includes(searchTerm);
      const recommendationMatch = exp.recommendation?.quote.toLowerCase().includes(searchTerm) || 
                                 exp.recommendation?.author.toLowerCase().includes(searchTerm) || false;
      
      return projectsMatch || descriptionMatch || companyMatch || titleMatch || recommendationMatch;
    })
  : experience;
```

### Text Highlighting
```typescript
const highlightText = (text: string, searchTerm: string | null | undefined) => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? 
      <span key={index} className="bg-[var(--accent)]/20 text-[var(--accent)] font-medium px-1 rounded">{part}</span> : 
      part
  );
};
```

## Future Enhancements

1. **Projects Section**: Uncomment and test the existing filtering
2. **Apps Section**: Uncomment and test the existing filtering  
3. **Education Section**: Could add technology/skill mentions to education entries
4. **Search Input**: Add a search input field for free-text filtering
5. **Multiple Tags**: Support selecting multiple tags simultaneously
6. **URL State**: Preserve active tag in URL for shareable filtered views

## Testing

Visit `http://localhost:3000` and:
1. Scroll to the Skills section
2. Click any skill tag (e.g., "React", "Vue.js", "Figma")
3. See the CV section filter to show only relevant experience
4. Notice the highlighting of matching terms
5. Click the "×" or another tag to change/clear the filter