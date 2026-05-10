# TableOfContents Component

Auto-generated table of contents for blog articles with interactive navigation and active section highlighting.

## Component

### TableOfContents
Generates a table of contents from markdown content with scroll tracking and active section highlighting.

**Props:**
- `content?: string` - Markdown content to parse (alternative to providedItems)
- `providedItems?: TableOfContentsItem[]` - Pre-parsed TOC items
- `title?: string` - Section title (default: "Table of Contents")
- `maxDepth?: number` - Maximum heading level to include (1-6, default: 3)
- `sticky?: boolean` - Make sidebar sticky (default: false)
- `variant?: 'sidebar' | 'card' | 'minimal'` - Visual style
- `showCounts?: boolean` - Show item count (default: false)
- `class?: string` - Additional CSS classes

**TableOfContentsItem Interface:**
```typescript
interface TableOfContentsItem {
  id: string;        // Anchor ID
  title: string;     // Heading text
  level: number;     // Heading level (1-6)
}
```

**Usage:**
```astro
<TableOfContents 
  content={post.content}
  maxDepth={3}
  sticky={true}
  variant="sidebar"
/>
```

## Features

- **Auto-generation**: Parses markdown headings automatically
- **Active tracking**: Highlights current section while scrolling
- **Smooth scrolling**: Animated scroll to sections
- **Responsive design**: Adapts to different screen sizes
- **Multiple variants**: Sidebar, card, or minimal styles
- **Depth control**: Include only specific heading levels

## Variants

### Sidebar Style
Designed for article sidebars with:
- Compact layout
- Indented hierarchy
- Sticky positioning
- Active section highlighting

### Card Style
Card-based layout with:
- Border and background
- Padding and spacing
- Clear visual separation
- Mobile-friendly

### Minimal Style
Clean, minimal design with:
- No borders or backgrounds
- Simple text links
- Compact spacing
- Focus on typography

## Behavior

- **Scroll tracking**: Updates active section based on scroll position
- **Click navigation**: Smooth scroll to clicked sections
- **Keyboard support**: Tab navigation and Enter activation
- **Mobile responsive**: Collapses on small screens when appropriate

## Examples

### Standard Article TOC
```astro
<TableOfContents 
  content={articleContent}
  maxDepth={3}
  showCounts={true}
/>
```

### Sticky Sidebar
```astro
<TableOfContents 
  content={articleContent}
  sticky={true}
  variant="sidebar"
  maxDepth={2}
/>
```

### Minimal Card
```astro
<TableOfContents 
  providedItems={customItems}
  variant="minimal"
  title="Quick Navigation"
/>
```
