# Collapsible Component

## Purpose and Usage

The Collapsible component provides a way to show and hide content with a trigger button. Use it for FAQs, expandable sections, progressive disclosure patterns, or any situation where you need to toggle content visibility.

## Components

### Collapsible

The root container that manages the collapsible state and behavior.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOpen` | `boolean` | `false` | When true, collapsible content is visible on initial render |
| `disabled` | `boolean` | `false` | When true, trigger cannot be clicked and state cannot be changed |
| `class` | `string` | - | Additional CSS classes for styling |

### CollapsibleTrigger

The button that toggles the collapsible content visibility.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | When true, renders as a wrapper div allowing a custom trigger element as a child |
| `class` | `string` | - | Additional CSS classes for styling |

### CollapsibleContent

The container for content that will be shown or hidden based on the collapsible state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Collapsible
```astro
---
import { Button } from "@/components/starwind/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/starwind/collapsible";
import IconSelector from "@tabler/icons/outline/selector.svg";
---

<Collapsible class="w-[350px] space-y-2">
  <div class="flex items-center justify-between space-x-4 px-4">
    <h4 class="text-sm font-semibold">@starwind-ui starred 3 repositories</h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon-sm">
        <IconSelector class="size-4" />
        <span class="sr-only">Toggle</span>
      </Button>
    </CollapsibleTrigger>
  </div>
  <div class="rounded-md border px-4 py-2 font-mono text-sm">astro</div>
  <CollapsibleContent class="space-y-2">
    <div class="rounded-md border px-4 py-2 font-mono text-sm">tailwindcss</div>
    <div class="rounded-md border px-4 py-2 font-mono text-sm">starwind-ui</div>
  </CollapsibleContent>
</Collapsible>
```

### Default Open
```astro
---
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/starwind/collapsible";
---

<Collapsible defaultOpen>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Content that is open by default</CollapsibleContent>
</Collapsible>
```

### Custom Trigger
```astro
---
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/starwind/collapsible";
---

<Collapsible>
  <CollapsibleTrigger asChild>
    <div class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100">
      <span class="font-medium">Custom Trigger Element</span>
      <span class="text-sm text-gray-500">Click to toggle</span>
    </div>
  </CollapsibleTrigger>
  <CollapsibleContent class="mt-2 p-4 border rounded">
    Content revealed by custom trigger
  </CollapsibleContent>
</Collapsible>
```

## Features

- **Simple toggle**: Click to show/hide content with smooth animations
- **Default state**: Option to start with content open or closed
- **Custom triggers**: Support for custom trigger elements via asChild prop
- **Disabled state**: Can disable the toggle functionality
- **Smooth animations**: Built-in expand/collapse transitions
- **Keyboard accessible**: Full keyboard navigation support
- **Lightweight**: Minimal markup for performance

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space)
- Focus management for expand/collapse states
- Semantic button structure for assistive technology
- Consider using appropriate trigger labels
- Test with screen readers for proper announcements
- Supports both mouse and keyboard interactions

## Best Practices

- Use semantic trigger labels that clearly indicate the action
- Consider starting with content closed for progressive disclosure
- Use meaningful content structure inside CollapsibleContent
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for all states
- Consider mobile touch interactions
- Use appropriate heading hierarchy within content
- Test with assistive technology for proper behavior
