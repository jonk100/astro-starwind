# Search Components

Search functionality components for finding blog posts with filters and interactive results.

## Components

### BlogSearch
A search input with dynamic filtering and results display.

**Props:**
- `posts: BlogPost[]` - Array of blog posts to search through
- `placeholder?: string` - Input placeholder text (default: "Search articles...")
- `showFilters?: boolean` - Show tag/category filters (default: false)
- `maxResults?: number` - Maximum results to show (default: 10)
- `showImages?: boolean` - Show images in results (default: true)
- `showTags?: boolean` - Show tags in results (default: true)
- `showAuthor?: boolean` - Show author in results (default: true)
- `showReadTime?: boolean` - Show reading time in results (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<BlogSearch 
  posts={allPosts}
  placeholder="Search blog posts..."
  showFilters={true}
  maxResults={8}
/>
```

### BlogSearchCombobox
A select-style combobox with search functionality and keyboard navigation.

**Props:**
- `posts: BlogPost[]` - Array of blog posts to search through
- `placeholder?: string` - Input placeholder (default: "Search and select...")
- `maxResults?: number` - Maximum results to show (default: 8)
- `showTags?: boolean` - Show tags in results (default: false)
- `showDate?: boolean` - Show date in results (default: true)
- `navigateOnSelect?: boolean` - Navigate to post on selection (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<BlogSearchCombobox 
  posts={allPosts}
  placeholder="Find an article..."
  showTags={true}
  navigateOnSelect={true}
/>
```

## Features

- **Real-time search**: Instant filtering as you type
- **Multi-field search**: Searches title, description, tags, and content
- **Keyboard navigation**: Arrow keys, Enter, Escape support
- **Tag filtering**: Filter results by specific tags
- **Responsive design**: Adapts to different screen sizes
- **Accessibility**: ARIA labels and screen reader support

## Search Algorithm

The search functionality:
1. Searches post titles (highest weight)
2. Searches descriptions (medium weight)
3. Searches tags (medium weight)
4. Searches content (lower weight)
5. Ranks results by relevance and date

## Filter Options

When `showFilters=true`, displays:
- **Tag filters**: Click tags to filter results
- **Category filters**: Filter by post categories
- **Date filters**: Filter by date ranges
- **Clear filters**: Reset all active filters

## Keyboard Shortcuts

### BlogSearch
- `Enter`: Submit search
- `Escape`: Clear search
- `Tab`: Navigate through results

### BlogSearchCombobox
- `↑/↓`: Navigate options
- `Enter`: Select option
- `Escape`: Close combobox
- `Type`: Filter options

## Examples

### Full-Featured Search
```astro
<BlogSearch 
  posts={allPosts}
  showFilters={true}
  maxResults={12}
  showImages={true}
  showTags={true}
/>
```

### Minimal Search
```astro
<BlogSearch 
  posts={allPosts}
  placeholder="Quick search..."
  showFilters={false}
  maxResults={5}
/>
```

### Navigation Combobox
```astro
<BlogSearchCombobox 
  posts={allPosts}
  placeholder="Jump to article..."
  showTags={true}
  navigateOnSelect={true}
/>
```
