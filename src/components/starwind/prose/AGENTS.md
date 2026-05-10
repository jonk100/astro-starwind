# Prose Component

## Purpose and Usage

The Prose component applies beautiful typography styles to markdown and rich text content. It handles headings, paragraphs, lists, blockquotes, code blocks, tables, and more. Use it for blog posts, documentation, articles, or any content that needs readable typography.

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Usage
```astro
---
import { Prose } from "@/components/starwind/prose";
---

<Prose>
  <h1>Welcome to Starwind</h1>
  <p>
    Starwind UI is a <strong>beautiful component library</strong> designed for
    modern web. It provides accessible, customizable components that work
    seamlessly with <a href="#">Astro</a> and Tailwind CSS.
  </p>
  <h2>Getting Started</h2>
  <p>Installation is simple. Just run CLI command and you're ready to go.</p>
</Prose>
```

### With Content Collections
```astro
<Prose>
  <Content />
</Prose>
```

### Custom Styling
```astro
<Prose class="custom-prose">
  <!-- Content with custom typography -->
</Prose>

<style>
  .custom-prose {
    --prose-line-height: 1.7;
    --prose-color: var(--color-muted-foreground);
    --prose-h1-size: 3em;
    --prose-link-color: var(--color-primary-accent);
    --prose-code-bg: --alpha(var(--color-primary-accent) / 10%);
  }
</style>
```

### Inline Overrides
```astro
<Prose class="[--prose-spacing:1.5em] md:[--prose-spacing:1.25em]">
  <!-- Content with responsive spacing -->
</Prose>
```

### Opting Out
```astro
<Prose>
  <h1>Styled Heading</h1>
  <div class="not-sw-prose">
    <!-- This content won't have prose styles applied -->
    <h2>Unstyled Heading</h2>
  </div>
</Prose>
```

## Features

- **Typography optimization**: Beautiful, readable text styling
- **Responsive sizing**: Em-based sizing that scales with font-size
- **Markdown support**: Handles all common markdown elements
- **CSS variables**: Extensive customization options
- **Opt-out support**: `not-sw-prose` class for exclusions
- **Accessibility**: Semantic HTML structure with proper contrast

## CSS Variables Reference

### Typography & Spacing
- `--prose-line-height`: Base line height for text (default: 1.6)
- `--prose-spacing`: Vertical spacing between block elements (default: 1.25em)
- `--prose-heading-spacing`: Extra spacing before headings (default: 1.5em)
- `--prose-code-size`: Font size for code elements (default: 0.875em)
- `--prose-list-indent`: Indentation for lists (default: 1.625em)

### Colors
- `--prose-color`: Base text color (default: foreground/80%)
- `--prose-heading-color`: Heading text color (default: foreground)
- `--prose-list-marker-color`: List bullet/number color (default: muted-foreground)

### Headings
- `--prose-heading-font`: Font family for headings (default: inherit)
- `--prose-heading-weight`: Default heading font weight (default: 600)
- `--prose-h1-size`: H1 font size (default: 2.25em)
- `--prose-h2-size`: H2 font size (default: 1.5em)
- `--prose-h3-size`: H3 font size (default: 1.25em)
- `--prose-h4-size`: H4 font size (default: 1em)

### Links
- `--prose-link-color`: Link text color (default: foreground)
- `--prose-link-hover-color`: Link hover color (default: primary-accent)

### Inline Code
- `--prose-code-bg`: Inline code background (default: muted)
- `--prose-code-color`: Inline code text color (default: foreground)
- `--prose-code-radius`: Inline code border radius (default: radius-sm)

### Blockquotes
- `--prose-blockquote-color`: Blockquote text color (default: foreground)
- `--prose-blockquote-border-color`: Blockquote left border color (default: border)
- `--prose-blockquote-border-width`: Blockquote left border width (default: 4px)

### Tables
- `--prose-table-heading-color`: Table header text color (default: foreground)
- `--prose-table-border-color`: Table border color (default: border)

### Media
- `--prose-media-border-width`: Border width for images/video (default: 0px)
- `--prose-media-border-color`: Border color for images/video (default: border)
- `--prose-media-border-radius`: Border radius for images/video (default: 0)

### Highlight/Mark
- `--prose-highlight-bg-color`: Highlighted text background (default: warning/30%)

## Accessibility Notes

- Maintains proper heading hierarchy
- Provides sufficient color contrast
- Semantic HTML structure for screen readers
- Consider color choices for accessibility
- Use semantic HTML elements appropriately

## Customization Tips

- Use CSS variables for consistent theming
- Apply responsive sizing with Tailwind utilities
- Override specific elements with inline styles
- Use `not-sw-prose` class to exclude elements
- Test color combinations for readability
