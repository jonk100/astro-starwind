---
title: Prose
---

# Prose

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
  <p>
    Installation is simple. Just run CLI command and you're ready to go. Here's a quick example: <code
      >npx starwind@latest add prose</code
    >
  </p>
  <h3>Key Features</h3>
  <ul>
    <li>Fully accessible components following WAI-ARIA guidelines</li>
    <li>Customizable via CSS variables and Tailwind classes</li>
    <li>TypeScript support out of the box</li>
  </ul>
  <blockquote>
    <p>Build beautiful interfaces without complexity.</p>
  </blockquote>
  <p>
    For more information, check out <mark>documentation</mark> or join our
    community.
  </p>
</Prose>
```

## Installation

```bash
npx starwind@latest add prose
```

## Usage

### General Notes

The Prose component applies beautiful typography styles to markdown and rich text content. It handles headings, paragraphs, lists, blockquotes, code blocks, tables, and more.

Sizing is em-based, so it scales with the inherited font-size. Control overall size via Tailwind text utilities like `text-sm md:text-base`.

### With Rendered Markdown

The Prose component works great with Astro's content collections:

```astro
<Prose>
  <Content />
</Prose>
```

### Custom Styling

Override default styles using CSS variables. You can apply them inline, via Tailwind arbitrary properties, or through a custom class:

```astro
---
import { Prose } from "@/components/starwind/prose";
---

<Prose class="custom-prose">
  <h1>Welcome to Starwind</h1>
  <p>
    Starwind UI is a <strong>beautiful component library</strong> designed for
    modern web. It provides accessible, customizable components that work
    seamlessly with <a href="#">Astro</a> and Tailwind CSS.
  </p>
  <!-- ... more content -->
</Prose>

<style>
  .custom-prose {
    /* spacing */
    --prose-line-height: 1.7;
    --prose-spacing: 1.4em;
    --prose-heading-spacing: 1.7em;

    /* colors */
    --prose-color: var(--color-muted-foreground);

    /* headings */
    --prose-h1-size: 3em;
    --prose-heading-font: var(--font-serif);
    --prose-heading-weight: var(--font-weight-medium);

    /* links */
    --prose-link-color: var(--color-primary-accent);
    --prose-link-hover-color: --alpha(var(--color-primary-accent) / 80%);

    /* blockquotes */
    --prose-blockquote-border-color: var(--color-primary-accent);

    /* inline code */
    --prose-code-color: var(--color-primary-accent);
    --prose-code-bg: --alpha(var(--color-primary-accent) / 10%);

    /* media */
    --prose-media-border-width: 1px;
    --prose-media-border-radius: var(--radius-md);

    /* highlight */
    --prose-highlight-bg-color: --alpha(var(--color-primary-accent) / 20%);
  }
</style>
```

### Inline Overrides

You can also override specific values using Tailwind's arbitrary property syntax for responsive adjustments:

```astro
<Prose class="[--prose-spacing:1.5em] md:[--prose-spacing:1.25em]">
  <!-- content -->
</Prose>
```

Or set variables on a parent element:

```astro
<div style="--prose-h1-size: 3em;">
  <Prose>
    <!-- content with larger h1 -->
  </Prose>
</div>
```

### Opting Out

Use `not-sw-prose` class on any element to exclude it from prose styling:

```astro
<Prose>
  <h1>Styled Heading</h1>
  <div class="not-sw-prose">
    <!-- This content won't have prose styles applied -->
    <h2>Unstyled Heading</h2>
  </div>
</Prose>
```

## API Reference

### Prose

A wrapper component that applies typography styles to its children.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<Prose class="mx-auto text-sm md:text-base">
  <!-- markdown or rich text content -->
</Prose>
```

## CSS Variables Reference

All CSS variables use `--prose-` prefix. Override them to customize appearance.

### Typography & Spacing

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-line-height` | `1.6` | Base line height for text |
| `--prose-spacing` | `1.25em` | Vertical spacing between block elements |
| `--prose-heading-spacing` | `1.5em` | Extra spacing before headings |
| `--prose-code-size` | `0.875em` | Font size for code elements |
| `--prose-list-indent` | `1.625em` | Indentation for lists |

### Colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-color` | `foreground/80%` | Base text color |
| `--prose-heading-color` | `foreground` | Heading text color |
| `--prose-list-marker-color` | `muted-foreground` | List bullet/number color |

### Headings

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-heading-font` | `inherit` | Font family for headings |
| `--prose-heading-weight` | `600` | Default heading font weight |
| `--prose-heading-line-height` | `1.25` | Line height for headings |
| `--prose-h1-size` | `2.25em` | H1 font size |
| `--prose-h1-weight` | `heading-weight` | H1 font weight |
| `--prose-h2-size` | `1.5em` | H2 font size |
| `--prose-h2-weight` | `heading-weight` | H2 font weight |
| `--prose-h3-size` | `1.25em` | H3 font size |
| `--prose-h3-weight` | `heading-weight` | H3 font weight |
| `--prose-h4-size` | `1em` | H4 font size |
| `--prose-h4-weight` | `heading-weight` | H4 font weight |

### Links

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-link-color` | `foreground` | Link text color |
| `--prose-link-decoration-color` | `primary-accent` | Link underline color |
| `--prose-link-hover-color` | `primary-accent` | Link hover color |

### Strong/Bold

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-strong-color` | `foreground` | Bold text color |
| `--prose-strong-weight` | `600` | Bold text font weight |

### Blockquotes

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-blockquote-color` | `foreground` | Blockquote text color |
| `--prose-blockquote-border-color` | `border` | Blockquote left border color |
| `--prose-blockquote-border-width` | `4px` | Blockquote left border width |

### Inline Code

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-code-bg` | `muted` | Inline code background |
| `--prose-code-color` | `foreground` | Inline code text color |
| `--prose-code-weight` | `500` | Inline code font weight |
| `--prose-code-radius` | `radius-sm` | Inline code border radius |

### Code Blocks

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-pre-border-color` | `border` | Code block border color |
| `--prose-pre-border-radius` | `radius-md` | Code block border radius |

### Tables

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-table-heading-color` | `foreground` | Table header text color |
| `--prose-table-border-color` | `border` | Table border color |

### Media

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-media-border-width` | `0px` | Border width for images/video |
| `--prose-media-border-color` | `border` | Border color for images/video |
| `--prose-media-border-radius` | `0` | Border radius for images/video |

### Highlight/Mark

| Variable | Default | Description |
|----------|---------|-------------|
| `--prose-highlight-color` | `foreground` | Highlighted text color |
| `--prose-highlight-bg-color` | `warning/30%` | Highlighted text background |
