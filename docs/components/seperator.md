# Separator

```astro
---
import { Separator } from "@/components/starwind/separator";
---

<div>
  <h4 class="text-sm font-medium">Starwind UI</h4>
  <p class="text-sm text-muted-foreground">A beautiful component library for Astro.</p>
</div>
<Separator />
<div class="flex h-5 items-center space-x-4 text-sm">
  <div>Components</div>
  <Separator orientation="vertical" />
  <div>Documentation</div>
  <Separator orientation="vertical" />
  <div>Examples</div>
</div>
```

## Installation

```bash
npx starwind@latest add separator
```

## Usage

### Horizontal (Default)

```astro
---
import { Separator } from "@/components/starwind/separator";
---

<div class="space-y-1">
  <h4 class="text-sm font-medium leading-none">Horizontal Separator</h4>
  <p class="text-sm text-muted-foreground">This is the default orientation.</p>
</div>
<Separator />
<div class="space-y-1">
  <h4 class="text-sm font-medium leading-none">Content Below</h4>
  <p class="text-sm text-muted-foreground">The separator divides content vertically.</p>
</div>
```

### Vertical

```astro
---
import { Separator } from "@/components/starwind/separator";
---

<div class="flex h-20 items-center space-x-4">
  <div class="text-sm">Left Content</div>
  <Separator orientation="vertical" />
  <div class="text-sm">Middle Content</div>
  <Separator orientation="vertical" />
  <div class="text-sm">Right Content</div>
</div>
```

### Custom Styling

```astro
---
import { Separator } from "@/components/starwind/separator";
---

<div>
  <p class="text-sm">Default border color</p>
</div>
<Separator />

<div>
  <p class="text-sm">Custom color and thickness</p>
</div>
<Separator class="bg-primary h-[2px]" />

<div>
  <p class="text-sm">Dashed style</p>
</div>
<Separator class="bg-transparent border-t border-dashed border-border" />
```

## API Reference

### Separator API Reference

A visual divider component for separating content with horizontal or vertical orientation.

| Prop | Type | Default | - |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | - |
| `class` | `string` | - | - |

```astro
<Separator orientation="horizontal" />
```
