---
title: Collapsible
---

# Collapsible

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
  <div class="rounded-md border px-4 py-2 font-mono text-sm">tailwindcss</div>
  <CollapsibleContent class="space-y-2">
    <div class="rounded-md border px-4 py-2 font-mono text-sm">astro</div>
    <div class="rounded-md border px-4 py-2 font-mono text-sm">starwind-ui</div>
  </CollapsibleContent>
</Collapsible>
```

## Installation

```bash
npx starwind@latest add collapsible
```

## Usage

### General Notes

The Collapsible component provides a way to show and hide content with a trigger button. It's useful for FAQs, expandable sections, and progressive disclosure patterns.

The essential components are `Collapsible`, `CollapsibleTrigger`, and `CollapsibleContent`.

## API Reference

### Collapsible

The root container that manages the collapsible state.

| Prop | Type | Default |
|------|------|---------|
| `defaultOpen` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<Collapsible defaultOpen>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>
```

**Additional Notes:**
- `defaultOpen`: When true, the collapsible content is visible on initial render
- `disabled`: When true, the trigger cannot be clicked and the state cannot be changed

### CollapsibleTrigger

The button that toggles the collapsible content visibility.

| Prop | Type | Default |
|------|------|---------|
| `asChild` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<CollapsibleTrigger asChild>
  <Button variant="ghost">Toggle</Button>
</CollapsibleTrigger>
```

**Additional Notes:**
- `asChild`: When true, renders as a wrapper div allowing a custom trigger element as a child

### CollapsibleContent

The container for content that will be shown or hidden.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<CollapsibleContent class="space-y-2">
  <p>Hidden content goes here</p>
</CollapsibleContent>
```
