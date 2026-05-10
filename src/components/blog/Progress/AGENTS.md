# Progress Components

Progress indicator components for tracking reading progress and scroll position.

## Components

### ReadingProgress
A progress bar indicating reading progress through an article.

**Props:**
- `value?: number` - Current progress value (0-100)
- `max?: number` - Maximum value (default: 100)
- `position?: 'fixed-top' | 'fixed-bottom' | 'inline'` - Position on page
- `size?: 'sm' | 'md' | 'lg'` - Progress bar size
- `showLabel?: boolean` - Show progress label (default: true)
- `label?: string` - Custom label text (default: "Reading Progress")
- `class?: string` - Additional CSS classes

**Auto-tracking:** Automatically tracks scroll position when no value provided.

**Usage:**
```astro
<ReadingProgress 
  position="fixed-top"
  showLabel={true}
  size="md"
/>
```

### ScrollProgress
A thin progress bar showing overall page scroll progress.

**Props:**
- `height?: number` - Bar height in pixels (default: 3)
- `color?: string` - Progress bar color (default: accent color)
- `position?: 'top' | 'bottom'` - Position on viewport
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<ScrollProgress 
  height={4}
  color="rgb(var(--accent))"
  position="top"
/>
```

## Features

- **Auto-tracking**: Automatically detects scroll position
- **Smooth animations**: CSS transitions for progress updates
- **Responsive**: Adapts to different screen sizes
- **Accessible**: ARIA labels and semantic markup
- **Customizable**: Multiple positions, sizes, and colors

## Position Options

### ReadingProgress Positions
- `'fixed-top'`: Fixed at top of viewport
- `'fixed-bottom'`: Fixed at bottom of viewport  
- `'inline'`: Inline within content flow

### ScrollProgress Positions
- `'top'`: Top edge of viewport
- `'bottom'`: Bottom edge of viewport

## Size Options
- `'sm'`: Small height (2px)
- `'md'`: Medium height (3px)
- `'lg'`: Large height (4px)

## Examples

### Fixed Top Reading Progress
```astro
<ReadingProgress 
  position="fixed-top"
  showLabel={true}
  label="Article Progress"
/>
```

### Minimal Scroll Bar
```astro
<ScrollProgress 
  height={2}
  position="top"
/>
```

### Bottom Progress with Custom Color
```astro
<ScrollProgress 
  height={4}
  color="rgb(var(--purple))"
  position="bottom"
/>
```
