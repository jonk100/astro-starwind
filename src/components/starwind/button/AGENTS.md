# Button Component

## Purpose and Usage

The Button component provides a versatile button element with multiple variants, sizes, and styling options. Use it for actions, navigation, form submissions, or any interactive element in your interface.

## Components

### Button

A versatile button component with multiple variants and sizes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "primary" \| "secondary" \| "outline" \| "ghost" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant for the button |
| `size` | `"sm" \| "md" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg"` | `"md"` | Determines the button size. Use `"icon"`, `"icon-sm"`, or `"icon-lg"` for icon-only buttons |
| `href` | `string` | - | When provided, renders the button as a link (`<a>` tag) instead of a `<button>` |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Buttons
```astro
---
import { Button } from "@/components/starwind/button";
---

<Button>Default Button</Button>
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="info">Info Button</Button>
<Button variant="success">Success Button</Button>
<Button variant="warning">Warning Button</Button>
<Button variant="error">Error Button</Button>
```

### Button Sizes
```astro
---
import { Button } from "@/components/starwind/button";
import Mail from "@tabler/icons/outline/mail.svg";
---

<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon"><Mail /></Button>
<Button size="icon-sm"><Mail /></Button>
<Button size="icon-lg"><Mail /></Button>
```

### Button as Link
```astro
---
import { Button } from "@/components/starwind/button";
---

<Button href="#link">Link Button</Button>
<Button href="https://example.com" target="_blank">External Link</Button>
```

### Custom Styling
```astro
---
import { Button } from "@/components/starwind/button";
---

<Button class="rounded-none">No Radius</Button>
<Button class="rounded-full">Full Radius</Button>
<Button class="shadow-lg">With Shadow</Button>
<Button class="border-2">Custom Border</Button>
```

### Icon Buttons
```astro
---
import { Button } from "@/components/starwind/button";
import Plus from "@tabler/icons/outline/plus.svg";
import Heart from "@tabler/icons/outline/heart.svg";
import Settings from "@tabler/icons/outline/settings.svg";
---

<div class="flex gap-2">
  <Button size="icon" variant="outline">
    <Plus />
  </Button>
  <Button size="icon" variant="outline">
    <Heart />
  </Button>
  <Button size="icon" variant="outline">
    <Settings />
  </Button>
</div>
```

## Features

- **Multiple variants**: Default, primary, secondary, outline, ghost, info, success, warning, error
- **Flexible sizing**: Small, medium, large, and icon-only sizes
- **Link support**: Can render as `<a>` tag when `href` prop is provided
- **Custom styling**: Full CSS class support with `tailwind-variants` integration
- **Icon support**: Built-in icon button sizes for perfect icon alignment
- **Accessibility**: Full keyboard navigation and ARIA support
- **Lightweight**: Minimal markup for performance

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space)
- Focus management for interactive states
- High contrast for all variants
- Semantic button structure for assistive technology
- Consider using appropriate variants for semantic meaning
- Test with screen readers for proper announcements

## Best Practices

- Use semantic variants (success for positive actions, error for destructive actions)
- Include descriptive text or icons for better UX
- Consider size hierarchy for primary vs secondary actions
- Use appropriate hover and focus states
- Ensure sufficient color contrast for accessibility
- Test keyboard navigation thoroughly
- Use link variant for navigation actions
- Consider mobile touch targets for smaller buttons
- Use consistent styling patterns across your interface
