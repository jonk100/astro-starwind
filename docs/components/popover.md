# Popover

```astro
---
import { Button } from "@/components/starwind/button";
import { Input } from "@/components/starwind/input";
import { Label } from "@/components/starwind/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/starwind/popover";
---

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the dimensions for the layer.
      </PopoverDescription>
    </PopoverHeader>
    <div class="grid gap-2 px-0.5">
      <div class="grid grid-cols-3 items-center gap-3">
        <Label for="popover-width">Width</Label>
        <Input id="popover-width" value="100%" class="col-span-2 h-8" />
      </div>
      <div class="grid grid-cols-3 items-center gap-3">
        <Label for="popover-max-width">Max. width</Label>
        <Input id="popover-max-width" value="300px" class="col-span-2 h-8" />
      </div>
      <div class="grid grid-cols-3 items-center gap-3">
        <Label for="popover-height">Height</Label>
        <Input id="popover-height" value="25px" class="col-span-2 h-8" />
      </div>
      <div class="grid grid-cols-3 items-center gap-3">
        <Label for="popover-max-height">Max. height</Label>
        <Input id="popover-max-height" value="none" class="col-span-2 h-8" />
      </div>
    </div>
  </PopoverContent>
</Popover>
```

## Installation

```bash
npx starwind@latest add popover
```

## Usage

### General Notes

Popovers are ideal for showing contextual content, settings, and quick actions without leaving the current page.

The essential components are `Popover`, `PopoverTrigger`, and `PopoverContent`. Use `PopoverHeader`, `PopoverTitle`, and `PopoverDescription` to create a consistent content structure.

### Hover Open

Enable hover behavior with `openOnHover`. Use `closeDelay` to control how long popover stays open after pointer leaves.

```astro
---
import { Button } from "@/components/starwind/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/starwind/popover";
---

<Popover openOnHover closeDelay={120}>
  <PopoverTrigger asChild>
    <Button variant="outline">Quick close</Button>
  </PopoverTrigger>
  <PopoverContent class="w-56">
    <PopoverHeader>
      <PopoverTitle>Fast close delay</PopoverTitle>
      <PopoverDescription>
        This popover closes quickly with `closeDelay` set to 120ms.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>

<Popover openOnHover closeDelay={500}>
  <PopoverTrigger asChild>
    <Button variant="outline">Slow close</Button>
  </PopoverTrigger>
  <PopoverContent class="w-56">
    <PopoverHeader>
      <PopoverTitle>Longer close delay</PopoverTitle>
      <PopoverDescription>
        This popover remains open longer with `closeDelay` set to 500ms.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

### Nested Popovers

Nested popovers work without immediately closing the parent popover while you interact with child content.

```astro
---
import { Button } from "@/components/starwind/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/starwind/popover";
---

<Popover>
  <PopoverTrigger asChild>
    <Button>Nested popover</Button>
  </PopoverTrigger>
  <PopoverContent class="w-72" align="start">
    <PopoverHeader>
      <PopoverTitle>Parent popover</PopoverTitle>
      <PopoverDescription>
        Open the nested popover below to verify nested interaction behavior.
      </PopoverDescription>
    </PopoverHeader>
    <div class="mt-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open child</Button>
        </PopoverTrigger>
        <PopoverContent side="right" align="start" class="w-64">
          <PopoverHeader>
            <PopoverTitle>Child popover</PopoverTitle>
            <PopoverDescription>
              These will stay nicely positioned even as viewport shrinks or expands.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  </PopoverContent>
</Popover>
```

### Align: start, center, end

Use the `align` prop on `PopoverContent` to control horizontal alignment relative to the trigger.

```astro
---
import { Button } from "@/components/starwind/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/starwind/popover";
---

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Start</Button>
  </PopoverTrigger>
  <PopoverContent align="start" class="w-40">
    Aligned to start.
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Center</Button>
  </PopoverTrigger>
  <PopoverContent align="center" class="w-40">
    Aligned to center.
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">End</Button>
  </PopoverTrigger>
  <PopoverContent align="end" class="w-40">
    Aligned to end.
  </PopoverContent>
</Popover>
```

### Side, sideOffset, and animationDuration

Position content with `side`, add spacing with `sideOffset`, and tune animation timing with `animationDuration`.

```astro
---
import { Button } from "@/components/starwind/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/starwind/popover";
---

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" class="w-full">Top</Button>
  </PopoverTrigger>
  <PopoverContent side="top" sideOffset={12} animationDuration={100} class="w-44">
    side="top" with sideOffset=12 and a quicker animation.
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" class="w-full">Right</Button>
  </PopoverTrigger>
  <PopoverContent side="right" align="start" sideOffset={16} animationDuration={180} class="w-44">
    side="right" + align="start".
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" class="w-full">Bottom</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="end" sideOffset={8} animationDuration={220} class="w-44">
    side="bottom" + align="end".
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" class="w-full">Left</Button>
  </PopoverTrigger>
  <PopoverContent side="left" sideOffset={14} animationDuration={500} class="w-44">
    side="left" with a longer animation duration.
  </PopoverContent>
</Popover>
```

## API Reference

### Popover

The root component that manages popover state and interaction behavior.

| Prop | Type | Default |
|------|------|---------|
| `openOnHover` | `boolean` | `false` |
| `closeDelay` | `number` | `200` |
| `defaultOpen` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<Popover openOnHover closeDelay={300} defaultOpen={false}>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>
```

**Additional Notes:**
- `openOnHover`: Opens popover on pointer hover (mouse) in addition to click and keyboard interactions
- `closeDelay`: Delay in milliseconds before hover-open popovers close after pointer leave
- `defaultOpen`: Sets the initial rendered state to open

### PopoverTrigger

The interactive trigger element that toggles popover.

| Prop | Type | Default |
|------|------|---------|
| `asChild` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<PopoverTrigger asChild>
  <Button variant="outline">Open popover</Button>
</PopoverTrigger>
```

**Additional Notes:**
- `asChild`: Renders the child element as a trigger while preserving popover behavior

### PopoverContent

The positioned floating panel rendered when popover is open.

| Prop | Type | Default |
|------|------|---------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` |
| `align` | `"start" \| "center" \| "end"` | `"center"` |
| `sideOffset` | `number` | `4` |
| `animationDuration` | `number` | `150` |
| `aria-label` | `string` | - |
| `class` | `string` | - |

```astro
<PopoverContent side="bottom" align="start" sideOffset={8} animationDuration={180}>
  Popover content
</PopoverContent>
```

**Additional Notes:**
- `side`: Preferred side for content placement relative to the trigger
- `align`: Alignment of the popover relative to the trigger along the chosen side
- `sideOffset`: Gap in pixels between trigger and content
- `animationDuration`: Open and close animation duration in milliseconds
- `aria-label`: Accessible name used when no `PopoverTitle` is present

### PopoverHeader

A layout wrapper for popover heading content.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<PopoverHeader>
  <PopoverTitle>Title</PopoverTitle>
  <PopoverDescription>Description</PopoverDescription>
</PopoverHeader>
```

### PopoverTitle

The title element for popover content.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<PopoverTitle>Popover title</PopoverTitle>
```

### PopoverDescription

Supporting descriptive text displayed under the title.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<PopoverDescription>
  Additional context for the popover.
</PopoverDescription>
```
