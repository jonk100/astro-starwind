# Carousel Component

## Purpose and Usage

The Carousel component is a responsive, touch-enabled carousel built on top of Embla Carousel. It provides smooth animations and supports both horizontal and vertical orientations, multiple items per view, and various configuration options. Use it for image galleries, product showcases, testimonial sliders, or any content that needs sliding navigation.

## Components

### Carousel

The root carousel component that manages carousel state and configuration.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Controls carousel scroll direction |
| `opts` | `EmblaOptionsType` | - | Embla Carousel options object for advanced configuration |
| `autoInit` | `boolean` | `true` | Whether to automatically initialize carousel |
| `id` | `string` | - | Required when using manual initialization with plugins |
| `class` | `string` | - | Additional CSS classes for styling |

### CarouselContent

The scrollable content container that holds all carousel items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### CarouselItem

Individual carousel slide that can contain any content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### CarouselPrevious

Navigation button to go to previous slide.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `"outline"` | Button variant styling |
| `size` | `ButtonSize` | `"icon"` | Button size |
| `class` | `string` | - | Additional CSS classes for styling |

### CarouselNext

Navigation button to go to next slide.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `"outline"` | Button variant styling |
| `size` | `ButtonSize` | `"icon"` | Button size |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Carousel
```astro
---
import { Card, CardContent } from "@/components/starwind/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/starwind/carousel";
---

<Carousel opts={{ align: "start" }} class="mx-auto w-full max-w-xs">
  <CarouselContent>
    {Array.from({ length: 5 }).map((_, index) => (
      <CarouselItem>
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-4xl font-semibold">{index + 1}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Multiple Items per View
```astro
<Carousel opts={{ align: "start" }} class="mx-auto w-full max-w-sm">
  <CarouselContent>
    {Array.from({ length: 5 }).map((_, index) => (
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">
        <!-- Item content -->
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Vertical Orientation
```astro
<Carousel opts={{ align: "start" }} orientation="vertical" class="my-10 w-full max-w-xs">
  <CarouselContent class="h-[200px] min-w-[140px]">
    <!-- Vertical carousel items -->
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### With Plugins
```astro
<Carousel
  id="carousel-autoplay"
  autoInit={false}
  opts={{ align: "start" }}
  class="mx-auto w-full max-w-xs"
>
  <!-- Content -->
</Carousel>

<script>
  import Autoplay from "embla-carousel-autoplay";
  import { initCarousel } from "@/components/starwind/carousel";

  function initAutoplayCarousel() {
    const carouselElement = document.getElementById("carousel-autoplay");
    if (!carouselElement) return;
    initCarousel(carouselElement, {
      plugins: [Autoplay({ delay: 2000 })],
    });
  }

  initAutoplayCarousel();
  document.addEventListener("astro:after-swap", initAutoplayCarousel);
</script>
```

## Features

- **Built on Embla Carousel**: Robust carousel foundation with extensive features
- **Touch-enabled**: Mobile-friendly touch interactions
- **Responsive**: Adapts to different screen sizes
- **Plugin support**: Extensible with Embla Carousel plugins
- **Multiple orientations**: Horizontal and vertical layouts
- **Accessibility**: ARIA-compliant navigation controls

## Configuration Options

Common `opts` properties:
- `align`: Slide alignment ("start", "center", "end")
- `loop`: Enable infinite looping
- `dragFree`: Enable free scrolling
- `slidesToScroll`: Number of slides to scroll at once
- `startIndex`: Starting slide index

## Accessibility Notes

- Keyboard navigation support
- ARIA labels for screen readers
- Touch-friendly for mobile devices
- Focus management for navigation controls
- Consider providing `aria-label` for custom carousels

## Plugin Integration

- Set `autoInit={false}` when using plugins
- Use `initCarousel` function for manual initialization
- Install plugins via npm (e.g., `embla-carousel-autoplay`)
- Combine multiple plugins for enhanced functionality
