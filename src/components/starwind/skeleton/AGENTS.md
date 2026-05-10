# Skeleton Component

## Purpose and Usage

The Skeleton component provides loading placeholder animations that indicate content is being loaded. Use it for improving perceived performance during data fetching, page transitions, or any situation where content needs time to load.

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Card Skeleton
```astro
---
import { Skeleton } from "@/components/starwind/skeleton";
---
<div class="flex flex-col space-y-3">
  <Skeleton class="h-[125px] w-[250px] rounded-xl" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
    <Skeleton class="h-4 w-[250px]" />
  </div>
</div>
```

### Avatar Skeleton
```astro
---
import { Skeleton } from "@/components/starwind/skeleton";
---
<div class="flex items-center space-x-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2 w-[250px]">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
  </div>
</div>
```

### Table Skeleton
```astro
---
import { Skeleton } from "@/components/starwind/skeleton";
---
<div class="space-y-2 w-[250px]">
  <Skeleton class="h-8 w-full" />
  <Skeleton class="h-8 w-full" />
  <Skeleton class="h-8 w-full" />
  <Skeleton class="h-8 w-full" />
</div>
```

### Form Skeleton
```astro
---
import { Skeleton } from "@/components/starwind/skeleton";
---
<div class="space-y-4">
  <Skeleton class="h-8 w-[200px]" />
  <div class="grid grid-cols-2 gap-4">
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-full" />
  </div>
  <Skeleton class="h-12 w-full" />
</div>
```

### Custom Styling
```astro
---
import { Skeleton } from "@/components/starwind/skeleton";
---
<div class="space-y-4">
  <Skeleton class="h-4 w-full bg-gray-200" />
  <Skeleton class="h-4 w-[200px] rounded-lg" />
  <Skeleton class="h-8 w-full animate-pulse" />
</div>
```

## Features

- **Loading animation**: Smooth placeholder animation
- **Customizable**: Size, shape, and styling via Tailwind classes
- **Flexible**: Works with any layout or content type
- **Lightweight**: Minimal markup for performance
- **Responsive**: Scales with parent container
- **Accessible**: Proper ARIA attributes for screen readers

## Styling Options

### Size Classes
- `h-4`: Small height (16px)
- `h-8`: Medium height (32px)
- `h-12`: Large height (48px)
- `w-12`: Small width (48px)
- `w-[200px]`: Custom width (200px)
- `w-full`: Full width of container

### Shape Classes
- `rounded-full`: Perfect circle for avatars
- `rounded-lg`: Large rounded corners
- `rounded-xl`: Extra large rounded corners
- Default: Sharp corners

### Animation Classes
- `animate-pulse`: Pulsing animation effect
- Default: Shimmer animation

## Accessibility Notes

- Includes `role="status"` for screen readers
- Uses `aria-label` for descriptive text
- Provides high contrast for visibility
- Consider adding loading text for additional context
- Test with keyboard navigation and screen readers

## Best Practices

- Use appropriate skeleton size for expected content
- Match skeleton shape to actual content shape
- Consider using with shimmer effects for enhanced loading
- Ensure sufficient color contrast for visibility
- Use semantic loading states when possible
- Test loading states for realistic content loading times
- Consider progressive loading for better UX
