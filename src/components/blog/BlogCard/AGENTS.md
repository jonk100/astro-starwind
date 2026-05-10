# BlogCard Components

Individual blog post card components for displaying article previews and metadata.

## Components

### VerticalBlogCard
A vertical card layout with image, title, description, and metadata.

**Props:**
- `post: BlogPost` - Blog post data
- `href?: string` - Link URL (defaults to `/blog/${post.slug}`)
- `showImage?: boolean` - Show/hide image (default: true)
- `showTags?: boolean` - Show/hide tags (default: true)
- `showAuthor?: boolean` - Show/hide author (default: true)
- `showReadTime?: boolean` - Show/hide reading time (default: true)
- `variant?: BlogCardVariant` - Card style variant ('default', 'featured', 'minimal')
- `size?: BlogCardSize` - Card size ('sm', 'md', 'lg')
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<VerticalBlogCard 
  post={blogPost} 
  variant="featured"
  showTags={true}
  href="/blog/my-post"
/>
```

### HorizontalBlogCard
A horizontal card layout with side-by-side image and content.

**Props:** Same as VerticalBlogCard

**Usage:**
```astro
<HorizontalBlogCard 
  post={blogPost}
  size="lg"
  showAuthor={false}
/>
```

### BlogCardImage
An image-focused card with optional overlay and title.

**Props:**
- `post: BlogPost` - Blog post data
- `href?: string` - Link URL
- `aspectRatio?: string` - Image aspect ratio ('16/9', '4/3', '1/1', '3/2')
- `showOverlay?: boolean` - Show gradient overlay (default: true)
- `showTitle?: boolean` - Show title overlay (default: true)
- `showBadge?: boolean` - Show featured badge (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<BlogCardImage 
  post={blogPost}
  aspectRatio="16/9"
  showOverlay={true}
/>
```

### BlogCardMeta
A metadata-only component for displaying author, date, tags, and reading time.

**Props:**
- `post: BlogPost` - Blog post data
- `layout?: 'horizontal' | 'vertical' | 'compact'` - Layout style
- `showAuthor?: boolean` - Show author (default: true)
- `showDate?: boolean` - Show date (default: true)
- `showReadTime?: boolean` - Show reading time (default: true)
- `showTags?: boolean` - Show tags (default: true)
- `maxTags?: number` - Maximum tags to display (default: 3)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<BlogCardMeta 
  post={blogPost}
  layout="horizontal"
  maxTags={2}
/>
```

## Styling

Components use CSS variables for theming:
- `--accent`: Primary accent color for badges and links
- `--purple`: Secondary color for special elements
- `--foreground`: Text color
- `--muted`: Secondary text color
- `--border`: Border color

## Variants

### BlogCardVariant
- `'default'`: Standard card styling
- `'featured'`: Enhanced styling with accent colors
- `'minimal'`: Clean, minimal design

### BlogCardSize
- `'sm'`: Compact size for tight layouts
- `'md'`: Standard size (default)
- `'lg'`: Large size for featured content

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly text alternatives

## Performance

- Optimized for static generation
- Lazy loading for images
- Minimal client-side JavaScript
- Efficient CSS with Tailwind variants

## Examples

### Featured Article Card
```astro
<VerticalBlogCard 
  post={featuredPost}
  variant="featured"
  size="lg"
  showTags={true}
  showAuthor={true}
/>
```

### Minimal Card Grid
```astro
<HorizontalBlogCard 
  post={blogPost}
  variant="minimal"
  size="sm"
  showTags={false}
  showReadTime={false}
/>
```

### Image Gallery Card
```astro
<BlogCardImage 
  post={blogPost}
  aspectRatio="4/3"
  showTitle={true}
  showBadge={false}
/>
```
