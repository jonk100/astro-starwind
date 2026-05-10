# RelatedPosts Components

Components for displaying related blog posts based on tags, categories, or custom criteria.

## Components

### RelatedPostsCarousel
A carousel displaying related posts with automatic rotation and navigation.

**Props:**
- `currentPost: BlogPost` - The current blog post
- `allPosts: BlogPost[]` - All blog posts to search from
- `maxPosts?: number` - Maximum related posts to show (default: 5)
- `criteria?: RelatedPostsOptions` - Filtering criteria
- `autoplay?: boolean` - Enable autoplay (default: false)
- `showArrows?: boolean` - Show navigation arrows (default: true)
- `cardVariant?: BlogCardVariant` - Card style variant
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<RelatedPostsCarousel 
  currentPost={currentPost}
  allPosts={allPosts}
  maxPosts={5}
  autoplay={true}
/>
```

### RelatedPostsLinks
A simple list of related posts as text links.

**Props:**
- `currentPost: BlogPost` - The current blog post
- `allPosts: BlogPost[]` - All blog posts to search from
- `maxPosts?: number` - Maximum related posts to show (default: 5)
- `criteria?: RelatedPostsOptions` - Filtering criteria
- `layout?: 'vertical' | 'horizontal'` - Layout orientation
- `showDate?: boolean` - Show post date (default: true)
- `showDescription?: boolean` - Show post description (default: false)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<RelatedPostsLinks 
  currentPost={currentPost}
  allPosts={allPosts}
  layout="vertical"
  showDate={true}
/>
```

### RelatedPostsCards
A grid of related posts displayed as cards.

**Props:**
- `currentPost: BlogPost` - The current blog post
- `allPosts: BlogPost[]` - All blog posts to search from
- `maxPosts?: number` - Maximum related posts to show (default: 3)
- `criteria?: RelatedPostsOptions` - Filtering criteria
- `columns?: number` - Number of grid columns (1-4)
- `cardVariant?: BlogCardVariant` - Card style variant
- `showImage?: boolean` - Show images (default: true)
- `showTags?: boolean` - Show tags (default: true)
- `showAuthor?: boolean` - Show author (default: true)
- `showReadTime?: boolean` - Show reading time (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<RelatedPostsCards 
  currentPost={currentPost}
  allPosts={allPosts}
  columns={3}
  cardVariant="default"
/>
```

## RelatedPostsOptions

Configuration for finding related posts:

```typescript
interface RelatedPostsOptions {
  byTags?: boolean;        // Match by tags (default: true)
  byCategories?: boolean;  // Match by categories (default: true)
  minMatches?: number;     // Minimum matches required (default: 1)
  excludeCurrent?: boolean; // Exclude current post (default: true)
  sortBy?: 'date' | 'relevance'; // Sort order (default: 'date')
}
```

## Features

- **Smart Matching**: Finds related posts by tags and categories
- **Configurable Criteria**: Customize how related posts are determined
- **Multiple Layouts**: Carousel, links, or grid display options
- **Responsive Design**: Adapts to different screen sizes
- **Performance**: Efficient filtering and sorting

## Examples

### Standard Related Posts Grid
```astro
<RelatedPostsCards 
  currentPost={currentPost}
  allPosts={allPosts}
  columns={3}
  showImage={true}
/>
```

### Minimal Links Layout
```astro
<RelatedPostsLinks 
  currentPost={currentPost}
  allPosts={allPosts}
  layout="horizontal"
  showDate={false}
/>
```

### Carousel with Custom Criteria
```astro
<RelatedPostsCarousel 
  currentPost={currentPost}
  allPosts={allPosts}
  criteria={{ byTags: true, byCategories: false }}
  autoplay={true}
/>
```
