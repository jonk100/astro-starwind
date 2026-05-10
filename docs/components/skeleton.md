# Skeleton

```astro
---
import { Skeleton } from "@/components/starwind/skeleton";
---

<div class="flex items-center space-x-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2 w-[250px]">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
    <Skeleton class="h-8 w-full" />
    <Skeleton class="h-8 w-full" />
    <Skeleton class="h-8 w-full" />
  </div>
</div>
```

## Installation

```bash
npx starwind@latest add skeleton
```

## Usage

### Card Skeleton

```astro
---
import { Skeleton } from "@/components/starwind/skeleton";
---

<div class="flex flex-col space-y-3">
  <Skeleton class="h-[125px] w-[250px] rounded-xl" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[250px]" />
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

## API Reference

### Skeleton

A loading placeholder animation that can be used to indicate content is being loaded.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<Skeleton class="h-12 w-12 rounded-full" />
```

**Additional Notes:**
- The default styles can be extended or overridden using the `class` prop
- Use Tailwind classes to control size, shape, and spacing
- Combine multiple skeletons to create complex loading patterns
- Consider using with shimmer effects for enhanced loading experience
