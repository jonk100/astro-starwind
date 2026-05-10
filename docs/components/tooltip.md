# Tooltip

```astro
---
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/starwind/tooltip";
import { Button } from "@/components/starwind/button";
---

<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    Add to library
  </TooltipContent>
</Tooltip>
```

## Installation

```bash
npx starwind@latest add tooltip
```

## Usage

### Positioning

Control the position and alignment of the tooltip using `side` and `align` props.

```astro
---
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/starwind/tooltip";
import { Button } from "@/components/starwind/button";
---

<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Top</Button>
  </TooltipTrigger>
  <TooltipContent>
    Tooltip on top
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Right</Button>
  </TooltipTrigger>
  <TooltipContent side="right">
    Tooltip on right
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    Tooltip on bottom
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Left</Button>
  </TooltipTrigger>
  <TooltipContent side="left">
    Tooltip on left
  </TooltipContent>
</Tooltip>
```

### Delay

Customize the open and close delay using `openDelay` and `closeDelay` props.

```astro
---
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/starwind/tooltip";
import { Button } from "@/components/starwind/button";
---

<Tooltip openDelay={0} closeDelay={500}>
  <TooltipTrigger>
    <Button variant="outline">No open delay</Button>
  </TooltipTrigger>
  <TooltipContent>
    Instant tooltip
  </TooltipContent>
</Tooltip>

<Tooltip openDelay={1000}>
  <TooltipTrigger>
    <Button variant="outline">Slow open</Button>
  </TooltipTrigger>
  <TooltipContent>
    Opens after 1 second
  </TooltipContent>
</Tooltip>
```

### Alignment

Control the alignment of the tooltip relative to its trigger using the `align` prop.

```astro
---
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/starwind/tooltip";
import { Button } from "@/components/starwind/button";
---

<div class="flex justify-between w-[300px]">
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Start</Button>
    </TooltipTrigger>
    <TooltipContent align="start">
      Aligned to start
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Center</Button>
    </TooltipTrigger>
    <TooltipContent align="center">
      Aligned to center
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">End</Button>
    </TooltipTrigger>
    <TooltipContent align="end">
      Aligned to end
    </TooltipContent>
  </Tooltip>
</div>

<div class="flex justify-between w-[300px]">
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Bottom Start</Button>
    </TooltipTrigger>
    <TooltipContent side="bottom" align="start">
      Bottom aligned to start
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Bottom End</Button>
    </TooltipTrigger>
    <TooltipContent side="bottom" align="end">
      Bottom aligned to end
    </TooltipContent>
  </Tooltip>
</div>
```

## API Reference

### Tooltip

The root component that manages tooltip visibility.

| Prop | Type | Default |
|------|------|---------|
| `openDelay` | `number` | `200` |
| `closeDelay` | `number` | `200` |
| `disableHoverableContent` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>
```

**Additional Notes:**
- `openDelay`: Time in milliseconds to wait before showing tooltip after hover
- `closeDelay`: Time in milliseconds to wait before hiding tooltip after leaving the trigger/content
- `disableHoverableContent`: When `true`, prevents tooltip from staying open when user hovers over tooltip content itself

### TooltipContent

The positioned popup content.

| Prop | Type | Default |
|------|------|---------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` |
| `align` | `"start" \| "center" \| "end"` | `"center"` |
| `sideOffset` | `number` | `4` |
| `avoidCollisions` | `boolean` | `true` |
| `animationDuration` | `number` | `150` |
| `class` | `string` | - |

```astro
<TooltipContent side="right" align="center">
  Tooltip on right
</TooltipContent>
```

**Additional Notes:**
- `side`: Which side of the trigger the tooltip appears on (top, right, bottom, or left)
- `align`: Alignment of the tooltip relative to the trigger along the chosen side
- `sideOffset`: Gap in pixels between the tooltip and the trigger element
- `avoidCollisions`: When `true`, automatically repositions the tooltip to stay within the viewport
- `animationDuration`: Duration in milliseconds for the open/close animation

### TooltipTrigger

Wraps the element that triggers the tooltip.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TooltipTrigger>
  <Button variant="outline">Hover me</Button>
</TooltipTrigger>
```

**Additional Notes:**
- Can wrap any interactive element
- Tooltip appears on hover by default
- Supports keyboard navigation and screen readers
- Use with buttons, links, or any interactive element
