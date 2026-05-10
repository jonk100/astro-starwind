# Blog Components

A comprehensive set of blog components built with Starwind UI and Tailwind CSS v4 for Astro applications.

## Overview

This directory contains all the blog-related components for displaying articles, managing navigation, and creating beautiful blog layouts. The components are designed to work together seamlessly while maintaining flexibility for different use cases.

## Architecture

### Core Components

- **BlogCard/**: Individual blog post cards in various layouts (vertical, horizontal, image-focused)
- **BlogGrid/**: Grid layouts for displaying multiple blog posts
- **HeroCard/**: Large, prominent cards for featured articles
- **BlogCarousel/**: Carousel components for rotating blog content
- **Navigation/**: Navigation components for blog posts (next/prev, breadcrumbs)
- **RelatedPosts/**: Components for displaying related articles
- **Progress/**: Reading and scroll progress indicators
- **TableOfContents/**: Auto-generated table of contents for articles
- **Search/**: Search functionality with filters and combobox

### Layout Components

- **BlogIndexLayout**: Layout for blog listing pages
- **BlogPostLayout**: Layout for individual blog posts

### Shared Resources

- **types.ts**: TypeScript interfaces for all blog components
- **utils.ts**: Utility functions for date formatting, related posts, etc.
- **index.ts**: Main barrel export file

## Usage

```astro
---
import { 
  VerticalBlogCard, 
  ThreeColumnGrid, 
  HeroCard,
  BlogSearch 
} from '@/components/blog';
---

<VerticalBlogCard post={blogPost} />
<ThreeColumnGrid posts={blogPosts} />
<HeroCard post={featuredPost} style="modern" />
<BlogSearch posts={allPosts} />
```

## Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Mode Support**: Uses CSS variables for seamless theme switching
- **TypeScript**: Full type safety with comprehensive interfaces
- **Accessibility**: ARIA labels and semantic HTML
- **Performance**: Optimized for static generation
- **Customizable**: Extensive props for variants, sizes, and behaviors

## Theming

Components use CSS variables defined in your global styles:

- `--accent`: Primary accent color
- `--purple`: Secondary purple color
- `--foreground`: Text color
- `--background`: Background color
- `--border`: Border color
- `--muted`: Muted/secondary colors

## Content Collections

Components are designed to work with Astro content collections. The main interfaces expect:

```typescript
interface BlogPost {
  title: string;
  description: string;
  date: Date | string;
  slug: string;
  author?: string;
  image?: string;
  tags?: string[];
  categories?: string[];
  minutesRead?: string;
  content?: string;
}
```

## Development

All components follow the Starwind UI patterns:

- Use `tv()` from tailwind-variants for styling variants
- Accept `class` prop for custom styling
- Include proper TypeScript interfaces
- Follow compound component patterns where applicable
- Include client-side JavaScript for interactive features

## File Structure

```
blog/
├── BlogCard/
│   ├── VerticalBlogCard.astro
│   ├── HorizontalBlogCard.astro
│   ├── BlogCardImage.astro
│   ├── BlogCardMeta.astro
│   └── index.ts
├── BlogGrid/
│   ├── ThreeColumnGrid.astro
│   ├── StackingGrid.astro
│   ├── MasonryGrid.astro
│   └── index.ts
├── HeroCard/
│   ├── HeroCard.astro
│   ├── HeroCardLarge.astro
│   └── index.ts
├── BlogCarousel/
│   ├── BlogCardCarousel.astro
│   ├── BlogImageCarousel.astro
│   ├── BlogGridCarousel.astro
│   └── index.ts
├── Navigation/
│   ├── NextPostButton.astro
│   ├── PreviousPostButton.astro
│   ├── BlogBreadcrumbs.astro
│   └── index.ts
├── RelatedPosts/
│   ├── RelatedPostsCarousel.astro
│   ├── RelatedPostsLinks.astro
│   ├── RelatedPostsCards.astro
│   └── index.ts
├── Progress/
│   ├── ReadingProgress.astro
│   ├── ScrollProgress.astro
│   └── index.ts
├── TableOfContents/
│   ├── TableOfContents.astro
│   └── index.ts
├── Search/
│   ├── BlogSearch.astro
│   ├── BlogSearchCombobox.astro
│   └── index.ts
├── types.ts
├── utils.ts
├── index.ts
└── AGENTS.md
```
