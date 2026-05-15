---
title: Carousel
---

# Carousel

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
    {
      Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem>
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))
    }
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Installation

```bash
npx starwind@latest add carousel
```

## Usage

### General Notes

The Carousel component is built on top of [Embla Carousel](https://www.embla-carousel.com/) and provides a responsive, touch-enabled carousel with smooth animations. It supports both horizontal and vertical orientations, multiple items per view, and various configuration options.

The essential components are `Carousel`, `CarouselContent`, and `CarouselItem`. The `CarouselPrevious` and `CarouselNext` components provide navigation controls.

### Multiple Items

Show multiple items at once by using responsive basis classes on carousel items.

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

<Carousel opts={{ align: "start" }} class="mx-auto w-full max-w-sm">
  <CarouselContent>
    {
      Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem class="md:basis-1/2 lg:basis-1/3">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-2xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))
    }
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Vertical Carousel

Carousels can be oriented vertically by setting `orientation` prop.

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

<Carousel opts={{ align: "start" }} orientation="vertical" class="my-10 w-full max-w-xs">
  <CarouselContent class="h-[200px] min-w-[140px]">
    {
      Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem class="aspect-square pt-1 md:basis-3/4">
          <div class="h-full p-1">
            <Card class="h-full">
              <CardContent class="flex h-full items-center justify-center p-6">
                <span class="text-3xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))
    }
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Looping Carousel

Enable infinite looping with `loop` option.

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

<Carousel opts={{ align: "start", loop: true }} class="mx-auto w-full max-w-xs">
  <CarouselContent>
    <CarouselItem>
      <div class="p-1">
        <Card class="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardContent class="flex aspect-square items-center justify-center p-6">
            <span class="text-4xl font-semibold">∞</span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="p-1">
        <Card class="bg-gradient-to-br from-green-500 to-blue-600 text-white">
          <CardContent class="flex aspect-square items-center justify-center p-6">
            <span class="text-4xl font-semibold">Loop</span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="p-1">
        <Card class="bg-gradient-to-br from-pink-500 to-red-600 text-white">
          <CardContent class="flex aspect-square items-center justify-center p-6">
            <span class="text-4xl font-semibold">∞</span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Plugins

Extend carousel functionality with Embla Carousel plugins. First install plugin package, then use manual initialization with `initCarousel` function.

> **Info:** You need to set `autoInit={false}` on Carousel component, so that you can manually initialize it with your plugins and any additional options.

```bash
# Install autoplay plugin
npm install embla-carousel-autoplay
```

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

<Carousel
  id="carousel-autoplay"
  autoInit={false}
  opts={{ align: "start" }}
  class="mx-auto w-full max-w-xs"
>
  <CarouselContent>
    {
      Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem>
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))
    }
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

<script>
  import Autoplay from "embla-carousel-autoplay";

  import { initCarousel } from "@/components/starwind/carousel";

  function initAutoplayCarousel() {
    const carouselElement = document.getElementById("carousel-autoplay");
    if (!carouselElement) return;
    initCarousel(carouselElement, {
      plugins: [
        Autoplay({
          delay: 2000,
        }),
      ],
    });
  }

  initAutoplayCarousel();

  document.addEventListener("astro:after-swap", initAutoplayCarousel);
</script>
```

## API Reference

### Carousel

The root carousel component that manages carousel state and configuration.

| Prop | Type | Default |
|------|------|---------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `opts` | `EmblaOptionsType` | - |
| `autoInit` | `boolean` | `true` |
| `id` | `string` | - |
| `class` | `string` | - |

```astro
<Carousel orientation="horizontal" opts={{ align: "start", loop: false }}>
  <!-- Carousel content -->
</Carousel>
```

**Additional Notes:**
- `orientation`: Controls carousel scroll direction
- `opts`: Embla Carousel options object for advanced configuration
- `autoInit`: Whether to automatically initialize carousel. Set to `false` when using plugins
- `id`: Required when using manual initialization with plugins

### CarouselContent

The scrollable content container that holds all carousel items.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<CarouselContent>
  <!-- Carousel items -->
</CarouselContent>
```

### CarouselItem

Individual carousel slide that can contain any content.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<CarouselItem class="md:basis-1/2 lg:basis-1/3">
  <!-- Item content -->
</CarouselItem>
```

### CarouselPrevious

Navigation button to go to previous slide.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `ButtonVariant` | `"outline"` |
| `size` | `ButtonSize` | `"icon"` |
| `class` | `string` | - |

```astro
<CarouselPrevious variant="outline" size="icon" />
```

### CarouselNext

Navigation button to go to next slide.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `ButtonVariant` | `"outline"` |
| `size` | `ButtonSize` | `"icon"` |
| `class` | `string` | - |

```astro
<CarouselNext variant="outline" size="icon" />
```

## Configuration Options

The `opts` prop accepts any [Embla Carousel options](https://www.embla-carousel.com/api/options/). Common options include:

```astro
<Carousel opts={{
  align: "start",        // Alignment of slides
  loop: false,           // Enable infinite looping
  skipSnaps: false,      // Allow free scrolling
  dragFree: false,       // Enable drag free scrolling
  containScroll: "trimSnaps", // Contain scroll behavior
  slidesToScroll: 1,     // Number of slides to scroll
  startIndex: 0,         // Starting slide index
}}>
  <!-- Content -->
</Carousel>
```
