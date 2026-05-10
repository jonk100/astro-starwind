# Spinner Component

## Purpose and Usage

The Spinner component is an accessible loading spinner with customizable styling. Use it for showing loading states, processing indicators, or any situation where you need to indicate that something is happening in the background.

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Spinner
```astro
---
import { Spinner } from "@/components/starwind/spinner";
---

<Spinner />
```

### Custom Sizes
```astro
---
import { Spinner } from "@/components/starwind/spinner";
---

<Spinner class="size-4" />
<Spinner class="size-6" />
<Spinner class="size-8" />
<Spinner class="size-12" />
```

### Custom Colors
```astro
---
import { Spinner } from "@/components/starwind/spinner";
---

<Spinner class="text-blue-500" />
<Spinner class="text-green-500" />
<Spinner class="text-red-500" />
<Spinner class="text-purple-500" />
```

### In Button
```astro
---
import { Spinner } from "@/components/starwind/spinner";
import { Button } from "@/components/starwind/button";
---

<Button disabled>
  <Spinner />
  Loading...
</Button>

<Button variant="outline" disabled>
  <Spinner class="text-blue-500" />
  Processing...
</Button>
```

### With Custom Styling
```astro
---
import { Spinner } from "@/components/starwind/spinner";
---

<Spinner class="size-8 text-primary animate-spin-slow" />
```

## Features

- **Accessible**: Built with proper ARIA attributes
- **Customizable**: Size and color via Tailwind classes
- **Lightweight**: Minimal markup for performance
- **Responsive**: Scales with parent font-size
- **Flexible**: Works with any custom CSS

## Styling Options

### Size Classes
- `size-4`: Extra small spinner (16px)
- `size-6`: Small spinner (24px)
- `size-8`: Medium spinner (32px)
- `size-12`: Large spinner (48px)

### Color Classes
- `text-blue-500`: Blue spinner
- `text-green-500`: Green spinner
- `text-red-500`: Red spinner
- `text-purple-500`: Purple spinner
- `text-gray-500`: Gray spinner

### Animation Classes
- `animate-spin-slow`: Slower rotation animation
- Custom CSS animations via `class` prop

## Accessibility Notes

- Includes `role="status"` for screen readers
- Uses `aria-live="polite"` for loading announcements
- Provides high contrast for visibility
- Consider adding `aria-label` for custom loading descriptions
- Test with keyboard navigation and screen readers

## Best Practices

- Use appropriate size for context (larger in main content, smaller in tight spaces)
- Choose colors that match your design system
- Consider using with loading messages for better UX
- Ensure spinner is visible against background colors
- Use sparingly to avoid cognitive overload
