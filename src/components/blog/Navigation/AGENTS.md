# Navigation Components

Navigation components for blog posts including next/previous buttons and breadcrumb navigation.

## Components

### NextPostButton
A button linking to the next blog post in chronological order.

**Props:**
- `nextPost: BlogNavigationPost` - Next post data
- `variant?: 'default' | 'outline' | 'ghost'` - Button style
- `showDate?: boolean` - Show post date (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<NextPostButton 
  nextPost={nextPost}
  variant="default"
  showDate={true}
/>
```

### PreviousPostButton
A button linking to the previous blog post in chronological order.

**Props:**
- `previousPost: BlogNavigationPost` - Previous post data
- `variant?: 'default' | 'outline' | 'ghost'` - Button style
- `showDate?: boolean` - Show post date (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<PreviousPostButton 
  previousPost={previousPost}
  variant="outline"
  showDate={true}
/>
```

### BlogBreadcrumbs
Breadcrumb navigation for hierarchical blog navigation.

**Props:**
- `breadcrumbs?: BlogBreadcrumb[]` - Custom breadcrumb array
- `separator?: string` - Separator between items (default: '→')
- `showHome?: boolean` - Show home link (default: true)
- `class?: string` - Additional CSS classes

**Auto-generation:** If no breadcrumbs provided, automatically generates from current URL path.

**Usage:**
```astro
<BlogBreadcrumbs 
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Category', href: '/blog/category' },
    { label: 'Tech', href: '/blog/category/tech', current: true }
  ]}
/>
```

## Features

- **Auto-generation**: Breadcrumbs automatically generated from URL
- **Accessibility**: ARIA labels and semantic markup
- **Responsive**: Adapts to mobile screens
- **Styling**: Consistent with Starwind design system

## Accessibility

- Semantic navigation structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast support
- Focus management

## Examples

### Standard Navigation
```astro
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <PreviousPostButton previousPost={prevPost} />
  <NextPostButton nextPost={nextPost} />
</div>
```

### Custom Breadcrumbs
```astro
<BlogBreadcrumbs 
  breadcrumbs={customBreadcrumbs}
  separator="/"
  showHome={true}
/>
```

### Minimal Navigation
```astro
<NextPostButton 
  nextPost={nextPost}
  variant="ghost"
  showDate={false}
/>
```
