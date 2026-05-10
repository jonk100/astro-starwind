# Tooltip Component

## Purpose and Usage

The Tooltip component provides contextual information that appears on hover or focus. Use it for additional context, help text, or any situation where you need to provide extra information without cluttering the interface.

## Components

### Tooltip

The root component that manages tooltip visibility and positioning.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `openDelay` | `number` | `200` | Time in milliseconds to wait before showing tooltip after hover |
| `closeDelay` | `number` | `200` | Time in milliseconds to wait before hiding tooltip after leaving the trigger/content |
| `disableHoverableContent` | `boolean` | `false` | When `true`, prevents tooltip from staying open when user hovers over tooltip content itself |
| `class` | `string` | - | Additional CSS classes for styling |

### TooltipContent

The positioned popup content that appears when triggered.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Which side of the trigger tooltip appears on |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment of the tooltip relative to the trigger along the chosen side |
| `sideOffset` | `number` | `4` | Gap in pixels between tooltip and the trigger element |
| `avoidCollisions` | `boolean` | `true` | When `true`, automatically repositions tooltip to stay within the viewport |
| `animationDuration` | `number` | `150` | Duration in milliseconds for the open/close animation |
| `class` | `string` | - | Additional CSS classes for styling |

### TooltipTrigger

Wraps the element that triggers the tooltip.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Tooltip
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

### Position Variants
```astro
---
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/starwind/tooltip";
import { Button } from "@/components/starwind/button";
---

<div class="flex gap-4">
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
</div>
```

### Delay Customization
```astro
---
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/starwind/tooltip";
import { Button } from "@/components/starwind/button";
---

<div class="flex gap-4">
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
</div>
```

### Alignment Control
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

## Features

- **Positioning**: 4 sides (top, right, bottom, left) with alignment control
- **Delay control**: Customizable open and close delays for better UX
- **Collision avoidance**: Automatic repositioning to stay within viewport
- **Hoverable content**: Option to allow/disallow hovering over tooltip content
- **Smooth animations**: Configurable animation duration
- **Responsive design**: Adapts to different screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support

## Positioning Options

### Side Options
- `top`: Appears above the trigger element
- `right`: Appears to the right of the trigger element
- `bottom`: Appears below the trigger element
- `left`: Appears to the left of the trigger element

### Alignment Options
- `start`: Aligns to the start (left for top/bottom, top for right/left)
- `center`: Aligns to the center of the trigger element
- `end`: Aligns to the end (right for top/bottom, bottom for right/left)

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for multiple tooltips
- High contrast for visibility
- Consider using descriptive tooltip content
- Test with screen readers for proper announcements
- Supports both hover and focus triggers

## Best Practices

- Use concise, descriptive tooltip content
- Consider delay timing for better user experience
- Ensure sufficient color contrast for readability
- Test with keyboard navigation and assistive technology
- Use appropriate positioning for your layout
- Consider mobile touch interactions
- Avoid critical information in tooltips (use inline or help text instead)
- Test collision avoidance in complex layouts
