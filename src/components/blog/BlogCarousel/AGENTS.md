# BlogCarousel Components

Carousel components for rotating and displaying blog content in interactive slideshows.

## Components

### BlogCardCarousel
A carousel displaying blog posts as vertical cards with navigation controls.

**Props:**
- `posts: BlogPost[]` - Array of blog posts
- `autoplay?: boolean` - Enable automatic rotation (default: false)
- `showArrows?: boolean` - Show navigation arrows (default: true)
- `slidesPerView?: number` - Number of slides visible (1, 2, 3, 4)
- `cardVariant?: BlogCardVariant` - Card style variant
- `showImage?: boolean` - Show images (default: true)
- `showTags?: boolean` - Show tags (default: true)
- `showAuthor?: boolean` - Show author (default: true)
- `showReadTime?: boolean` - Show reading time (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<BlogCardCarousel 
  posts={featuredPosts}
  autoplay={true}
  showArrows={true}
  slidesPerView={2}
/>
```

### BlogImageCarousel
A carousel focused on blog post images with minimal text overlays.

**Props:**
- `posts: BlogPost[]` - Array of blog posts (must have images)
- `autoplay?: boolean` - Enable autoplay (default: true)
- `showArrows?: boolean` - Show navigation arrows (default: true)
- `slidesPerView?: number` - Number of slides visible (1, 2, 3, 4)
- `aspectRatio?: string` - Image aspect ratio ('16/9', '4/3', '1/1', '3/2')
- `showOverlay?: boolean` - Show gradient overlay (default: true)
- `showTitle?: boolean` - Show title overlay (default: true)
- `showBadge?: boolean` - Show featured badge (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<BlogImageCarousel 
  posts={imagePosts}
  aspectRatio="16/9"
  showOverlay={true}
  autoplay={true}
/>
```

### BlogGridCarousel
A carousel that can display a mix of card types in a grid layout.

**Props:**
- `posts: BlogPost[]` - Array of blog posts
- `autoplay?: boolean` - Enable autoplay (default: false)
- `showArrows?: boolean` - Show navigation arrows (default: true)
- `slidesPerView?: number` - Number of slides visible (1, 2, 3, 4)
- `layout?: 'mixed' | 'cards-only' | 'images-only'` - Layout type
- `cardVariant?: BlogCardVariant` - Card style for card items
- `imageAspectRatio?: string` - Aspect ratio for image items
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<BlogGridCarousel 
  posts={mixedPosts}
  layout="mixed"
  slidesPerView={1}
  showArrows={true}
/>
```

## Features

- **Responsive Design**: Adapts slides per view based on screen size
- **Touch Support**: Swipe gestures on mobile devices
- **Keyboard Navigation**: Arrow keys for accessibility
- **Autoplay**: Optional automatic rotation with pause on hover
- **Lazy Loading**: Images load as needed
- **Smooth Transitions**: CSS animations for slide changes

## Accessibility

- ARIA labels for carousel controls
- Keyboard navigation support
- Screen reader announcements
- Focus management
- High contrast support

## Performance

- Optimized for static generation
- Lazy loading for images
- Efficient CSS transitions
- Minimal JavaScript footprint

## Examples

### Featured Posts Carousel
```astro
<BlogCardCarousel 
  posts={featuredPosts}
  autoplay={true}
  showArrows={true}
  slidesPerView={1}
  cardVariant="featured"
/>
```

### Image Gallery Carousel
```astro
<BlogImageCarousel 
  posts={galleryPosts}
  aspectRatio="4/3"
  showOverlay={false}
  showTitle={true}
/>
```

### Mixed Content Carousel
```astro
<BlogGridCarousel 
  posts={mixedContent}
  layout="mixed"
  slidesPerView={1}
  autoplay={false}
/>
```
