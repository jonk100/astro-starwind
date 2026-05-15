---
title: Label
---

# Label

```astro
---
import { Label } from "@/components/starwind/label";
import { Input } from "@/components/starwind/input";
---

<div class="space-y-2">
  <Label for="demo-input">Email</Label>
  <Input id="demo-input" type="email" placeholder="Enter your email" />
</div>
```

## Installation

```bash
npx starwind@latest add label
```

## Usage

### size

```astro
---
import { Label } from "@/components/starwind/label";
import { Input } from "@/components/starwind/input";
---

<div class="space-y-2">
  <Label size="sm" for="small-input">Small Label</Label>
  <Input id="small-input" size="sm" placeholder="Small input" />
</div>

<div class="space-y-2">
  <Label size="md" for="medium-input">Medium Label</Label>
  <Input id="medium-input" size="md" placeholder="Medium input" />
</div>

<div class="space-y-2">
  <Label size="lg" for="large-input">Large Label</Label>
  <Input id="large-input" size="lg" placeholder="Large input" />
</div>
```

### disabled state

```astro
---
import { Label } from "@/components/starwind/label";
import { Input } from "@/components/starwind/input";
---

<div class="space-y-2">
  <Label for="disabled-input">Disabled Input Label</Label>
  <Input id="disabled-input" disabled placeholder="This Input is disabled" />
</div>
```

## API Reference

### Label

An accessible label component for form inputs with multiple sizes.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `for` | `string` | - |
| `class` | `string` | - |

```astro
<Label for="input-id" size="md">Label Text</Label>
```
