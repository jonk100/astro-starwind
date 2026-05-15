---
title: Aspect Ratio
---

# Aspect Ratio

```astro
---
import { AspectRatio } from "@/components/starwind/aspect-ratio";
---

<AspectRatio ratio={16 / 9}>
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Photo by Drew Beamer"
    class="rounded-md object-cover w-full h-full"
  />
</AspectRatio>
```

## Installation

```bash
npx starwind@latest add aspect-ratio
```

## Usage

### 16:9 Ratio (Default Video)

```astro
---
import { AspectRatio } from "@/components/starwind/aspect-ratio";
---

<AspectRatio ratio={16 / 9}>
  <div class="flex items-center justify-center w-full h-full bg-muted rounded-md">
    <span class="text-sm text-muted-foreground">16:9 Aspect Ratio</span>
  </div>
</AspectRatio>
```

### 4:3 Ratio (Classic Photo)

```astro
---
import { AspectRatio } from "@/components/starwind/aspect-ratio";
---

<AspectRatio ratio={4 / 3}>
  <img
    src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
    alt="Photo by Kari Shea"
    class="rounded-md object-cover w-full h-full"
  />
</AspectRatio>
```

### 1:1 Ratio (Square)

```astro
---
import { AspectRatio } from "@/components/starwind/aspect-ratio";
---

<AspectRatio ratio={1}>
  <img
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&dpr=2&q=80"
    alt="Photo by Ayo Ogunseinde"
    class="rounded-md object-cover w-full h-full"
  />
</AspectRatio>
```

### 21:9 Ratio (Ultrawide)

```astro
---
import { AspectRatio } from "@/components/starwind/aspect-ratio";
---

<AspectRatio ratio={21 / 9}>
  <img
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80"
    alt="Photo by Simon Berger"
    class="rounded-md object-cover w-full h-full"
  />
</AspectRatio>
```

### With Video

```astro
---
import { AspectRatio } from "@/components/starwind/aspect-ratio";
---

<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    class="w-full h-full rounded-md"
  ></iframe>
</AspectRatio>
```

## API Reference

### AspectRatio

A container component for maintaining consistent aspect ratios for media and content.

| Prop | Type | Default |
|------|------|---------|
| `ratio` | `number` | `1` |
| `as` | `HTMLTag` | `"div"` |
| `class` | `string` | - |

```astro
<AspectRatio ratio={16 / 9}>
  <img src="image.jpg" alt="Description" class="object-cover w-full h-full" />
</AspectRatio>
```

**Additional Notes:**

- `ratio`: The aspect ratio (e.g., 16/9, 4/3, 1)
- `as`: The HTML element to render as
