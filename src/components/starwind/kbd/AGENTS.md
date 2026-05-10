# Kbd Component

## Purpose and Usage

The Kbd component is used to display keyboard keys in documentation and UI. It includes both individual `Kbd` components for single keys and `KbdGroup` for displaying key combinations. Use it for keyboard shortcuts, command documentation, or any interface that needs to show keyboard input.

## Components

### Kbd

The main keyboard key component used to display individual keyboard keys.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### KbdGroup

A container component to group multiple keyboard keys together for displaying key combinations.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Keys
```astro
---
import { Kbd } from "@/components/starwind/kbd";
---

<Kbd>Ctrl</Kbd>
<Kbd>Shift</Kbd>
<Kbd>Alt</Kbd>
<Kbd>⌘</Kbd>
<Kbd>⏎</Kbd>
<Kbd>Esc</Kbd>
```

### Key Combinations
```astro
---
import { Kbd, KbdGroup } from "@/components/starwind/kbd";
---

<p class="text-sm text-muted-foreground">
  Use{" "}
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <span>+</span>
    <Kbd>K</Kbd>
  </KbdGroup>
  {" "}to open the command palette
</p>
```

### With Buttons
```astro
---
import { Button } from "@/components/starwind/button";
import { Kbd, KbdGroup } from "@/components/starwind/kbd";
---

<Button variant="outline" size="sm" class="pr-2">
  Accept
  <Kbd>⏎</Kbd>
</Button>

<Button variant="outline" size="sm" class="pr-2">
  Save
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <span>+</span>
    <Kbd>S</Kbd>
  </KbdGroup>
</Button>
```

### Common Shortcuts
```astro
---
import { Kbd, KbdGroup } from "@/components/starwind/kbd";
---

<div class="flex flex-col gap-3 min-w-sm">
  <div class="flex items-center gap-3 justify-between">
    <span class="text-sm">Copy</span>
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>C</Kbd>
    </KbdGroup>
  </div>
  <div class="flex items-center gap-3 justify-between">
    <span class="text-sm">Paste</span>
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>V</Kbd>
    </KbdGroup>
  </div>
</div>
```

### Arrow Keys
```astro
---
import { Kbd } from "@/components/starwind/kbd";
---

<div class="flex flex-col items-center gap-2">
  <Kbd>↑</Kbd>
  <div class="flex gap-2">
    <Kbd>←</Kbd>
    <Kbd>↓</Kbd>
    <Kbd>→</Kbd>
  </div>
</div>
```

## Features

- **Individual keys**: Display single keyboard keys
- **Key combinations**: Group multiple keys with `KbdGroup`
- **Unicode support**: Supports special characters like ⌘, ⏎, ↑
- **Flexible styling**: Accepts custom CSS classes
- **Button integration**: Works well inside Button components

## Accessibility Notes

- Use semantic HTML structure when displaying keyboard shortcuts
- Ensure key combinations are clearly separated with visual separators
- Consider providing alternative text for screen readers when necessary
- Use consistent formatting for similar shortcuts throughout your application

## Common Patterns

- Use `+` or `span` elements to separate keys in combinations
- Group related shortcuts together for better organization
- Consider using smaller sizes when integrating with buttons
- Maintain consistent styling across all keyboard shortcuts in your app
