# BlogGrid Components

Grid layout components for displaying multiple blog posts in organized layouts.

## Components

### ThreeColumnGrid
A responsive three-column grid layout that adapts to screen size.

**Props:**
- `posts: BlogPost[]` - Array of blog posts
- `cardVariant?: BlogCardVariant` - Card style ('default', 'featured', 'minimal')
- `showImage?: boolean` - Show images in cards (default: true)
- `showTags?: boolean` - Show tags (default: true)
- `showAuthor?: boolean` - Show author (default: true)
- `showReadTime?: boolean` - Show reading time (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<ThreeColumnGrid 
  posts={blogPosts}
  cardVariant="default"
  showTags={true}
/>
```

### StackingGrid
A vertical stacking layout with horizontal cards, featuring the first post prominently.

**Props:**
- `posts: BlogPost[]` - Array of blog posts
- `featureFirst?: boolean` - Feature first post with larger size (default: true)
- `cardVariant?: BlogCardVariant` - Card style variant
- `showImage?: boolean` - Show images (default: true)
- `showTags?: boolean` - Show tags (default: true)
- `showAuthor?: boolean` - Show author (default: true)
- `showReadTime?: boolean` - Show reading time (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<StackingGrid 
  posts={blogPosts}
  featureFirst={true}
  cardVariant="featured"
/>
```

### MasonryGrid
A masonry-style layout mixing vertical cards and image cards for visual variety.

**Props:**
- `posts: BlogPost[]` - Array of blog posts
- `cardVariant?: BlogCardVariant` - Default card style
- `imageAspectRatio?: string` - Aspect ratio for image cards ('16/9', '4/3', '1/1')
- `showTags?: boolean` - Show tags (default: true)
- `showAuthor?: boolean` - Show author (default: true)
- `showReadTime?: boolean` - Show reading time (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<MasonryGrid 
  posts={blogPosts}
  imageAspectRatio="4/3"
  cardVariant="minimal"
/>
```

## Responsive Behavior

- **Desktop**: Full grid layout (3 columns for ThreeColumnGrid)
- **Tablet**: 2-column layout
- **Mobile**: Single column layout

## Styling

Components use CSS variables:
- `--accent`: Primary accent color
- `--purple`: Secondary color
- `--foreground`: Text color
- `--muted`: Secondary text color
- `--border`: Border color

## Performance

- Optimized for static generation
- Lazy loading for images
- Efficient CSS with Tailwind variants
- Minimal client-side JavaScript

## Examples

### Standard Blog Grid
```astro
<ThreeColumnGrid 
  posts={latestPosts}
  showImage={true}
  showTags={true}
  showAuthor={true}
/>
```

### Featured Stacking Layout
```astro
<StackingGrid 
  posts={featuredPosts}
  featureFirst={true}
  cardVariant="featured"
/>
```

### Visual Masonry Gallery
```astro
<MasonryGrid 
  posts={galleryPosts}
  imageAspectRatio="16/9"
  showTags={false}
/>
```
