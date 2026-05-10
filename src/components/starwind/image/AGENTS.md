# Image Component

## Purpose and Usage

The Image component is a thin wrapper around Astro's built-in `<Image />` component that provides sensible defaults and responsive styling. Use it for displaying images with automatic optimization and responsive behavior.

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `ImageMetadata \| string` | - | Image source - accepts imported image assets or remote URLs |
| `alt` | `string` | `""` | Alternative text for accessibility - always provide meaningful alt text |
| `inferSize` | `boolean` | `true` | Automatically infers width and height for remote images |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Usage with Local Image
```astro
---
import pricingImage from "@/assets/images/pricing-9.jpg";
import { Image } from "@/components/starwind/image";
---

<Image src={pricingImage} alt="Pricing illustration" class="rounded-lg" />
```

### Remote URL with Automatic Size Inference
```astro
---
import { Image } from "@/components/starwind/image";
---

<Image
  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
  alt="Sleek gray design"
  class="rounded-lg"
/>
```

## Features

- **Automatic size inference**: `inferSize` is enabled by default for remote images
- **Responsive defaults**: Images are set to `w-full h-auto` for responsive behavior
- **Optimized output**: Leverages Astro's image optimization pipeline
- **Accessibility**: Requires alt text for screen readers

## Accessibility Notes

- Always provide meaningful `alt` text for images
- For decorative images, use an empty string `alt=""`
- The component supports all standard accessibility features of Astro's Image component

## Additional Props

All other props from Astro's `<Image />` component are also supported:
- `width`, `height` - Manual dimensions (when `inferSize` is false)
- `format` - Output format (webp, avif, etc.)
- `quality` - Image quality (0-100)
