# Popover Component

## Purpose and Usage

The Popover component provides contextual floating content that appears on click or hover. Use it for dropdown menus, tooltips, quick actions, or any situation where you need to show additional content without navigation.

## Components

### Popover

The root component that manages popover state and interaction behavior.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `openOnHover` | `boolean` | `false` | Opens popover on pointer hover in addition to click and keyboard interactions |
| `closeDelay` | `number` | `200` | Delay in milliseconds before hover-open popovers close after pointer leave |
| `defaultOpen` | `boolean` | `false` | Sets the initial rendered state to open |
| `class` | `string` | - | Additional CSS classes for styling |

### PopoverTrigger

The interactive trigger element that toggles the popover.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Renders child element as trigger while preserving popover behavior |
| `class` | `string` | - | Additional CSS classes for styling |

### PopoverContent

The positioned floating panel rendered when the popover is open.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Preferred side for content placement relative to trigger |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment of popover relative to trigger along the chosen side |
| `sideOffset` | `number` | `4` | Gap in pixels between trigger and content |
| `animationDuration` | `number` | `150` | Open and close animation duration in milliseconds |
| `aria-label` | `string` | - | Accessible name used when no PopoverTitle is present |
| `class` | `string` | - | Additional CSS classes for styling |

### PopoverHeader

A layout wrapper for popover heading content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### PopoverTitle

The title element for popover content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### PopoverDescription

Supporting descriptive text displayed under the title.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Popover
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
    </div>
  </PopoverContent>
</Popover>
```

### Hover Popover
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

<Popover openOnHover closeDelay={300}>
  <PopoverTrigger asChild>
    <Button variant="outline">Quick close</Button>
  </PopoverTrigger>
  <PopoverContent class="w-56">
    <PopoverHeader>
      <PopoverTitle>Fast close delay</PopoverTitle>
      <PopoverDescription>
        This popover closes quickly with `closeDelay` set to 300ms.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

### Nested Popovers
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
              These will stay nicely positioned even as the viewport shrinks or expands.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  </PopoverContent>
</Popover>
```

## Features

- **Flexible positioning**: 4 sides (top, bottom, left, right) with alignment control
- **Hover support**: Optional hover behavior with customizable close delay
- **Nested support**: Works with nested popovers without closing parent immediately
- **Collision avoidance**: Automatic repositioning to stay within viewport
- **Smooth animations**: Configurable animation duration
- **Keyboard navigation**: Full keyboard support for accessibility
- **Customizable styling**: Full CSS class support

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for multiple popovers
- High contrast for visibility
- Consider using descriptive content
- Test with screen readers for proper announcements
- Supports both hover and focus triggers

## Best Practices

- Use semantic heading structure with PopoverHeader, PopoverTitle, PopoverDescription
- Consider hover behavior for quick actions
- Use appropriate positioning for your layout
- Test collision avoidance in complex layouts
- Ensure sufficient color contrast for readability
- Test with keyboard navigation and assistive technology
- Consider mobile touch interactions
- Use meaningful trigger labels and content descriptions
