# Kbd

```astro
---
import { Kbd } from "@/components/starwind/kbd";
---

<div class="flex items-center gap-2">
  <span class="text-sm text-muted-foreground">Press</span>
  <Kbd>Ctrl</Kbd>
  <span class="text-sm text-muted-foreground">to continue</span>
</div>
```

## Installation

```bash
npx starwind@latest add kbd
```

## Usage

### Basic

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

### Group

Use the `KbdGroup` component to group keyboard keys together.

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

<p class="text-sm text-muted-foreground">
  Press{" "}
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <span>+</span>
    <Kbd>Shift</Kbd>
    <span>+</span>
    <Kbd>P</Kbd>
  </KbdGroup>
  {" "}to open command palette
</p>
```

### With Button

Use the `Kbd` component inside a `Button` component to display a keyboard key inside a button.

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
  Cancel
  <Kbd>Esc</Kbd>
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
  <div class="flex items-center gap-3 justify-between">
    <span class="text-sm">Cut</span>
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>X</Kbd>
    </KbdGroup>
  </div>
  <div class="flex items-center gap-3 justify-between">
    <span class="text-sm">Undo</span>
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>Z</Kbd>
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
<p class="text-sm text-muted-foreground">Use arrow keys to navigate</p>
```

## API Reference

### Kbd

The main keyboard key component used to display individual keyboard keys.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<Kbd>Ctrl</Kbd>
```

### KbdGroup

A container component to group multiple keyboard keys together for displaying key combinations.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>K</Kbd>
</KbdGroup>
```
