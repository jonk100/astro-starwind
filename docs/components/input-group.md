# Input Group

InputGroup,
InputGroupAddon,
InputGroupButton,
InputGroupInput,
InputGroupText,
InputGroupTextarea,
} from "@/components/starwind/input-group";

```astro
---
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/starwind/input-group";
import Search from "@tabler/icons/outline/search.svg";
---

<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
</InputGroup>
```

## Installation

```bash
npx starwind@latest add input-group
```

## Usage

### General Notes

The essential components are `InputGroup`, `InputGroupAddon`, and either `InputGroupInput` or `InputGroupTextarea`.

`InputGroupText` and `InputGroupButton` are helper components for labels, metadata, and actions.

> **Focus management:** Keep `InputGroupAddon` after `InputGroupInput` or `InputGroupTextarea` in the DOM. Use `align` to control visual placement.

### Align

#### inline-start

Use `align="inline-start"` to place content at the start of the field. This is the default alignment.

```astro
---
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/starwind/input-group";
import Search from "@tabler/icons/outline/search.svg";
---

<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-start">
    <Search />
  </InputGroupAddon>
</InputGroup>
```

#### inline-end

Use `align="inline-end"` to place content at the end of the field.

```astro
---
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/starwind/input-group";
import InfoCircle from "@tabler/icons/outline/info-circle.svg";
---

<InputGroup>
  <InputGroupInput type="password" placeholder="Enter password" />
  <InputGroupAddon align="inline-end">
    <InfoCircle />
  </InputGroupAddon>
</InputGroup>
```

#### block-start

Use `align="block-start"` to place a header row above the control.

```astro
---
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/starwind/input-group";
import Code from "@tabler/icons/outline/code.svg";
import Copy from "@tabler/icons/outline/copy.svg";
---

<div class="grid w-full max-w-sm gap-4">
  <InputGroup>
    <InputGroupInput placeholder="Enter your name" />
    <InputGroupAddon align="block-start">
      <InputGroupText>Full Name</InputGroupText>
    </InputGroupAddon>
  </InputGroup>

  <InputGroup>
    <InputGroupTextarea class="font-mono text-sm" placeholder="console.log('Hello, world!');" />
    <InputGroupAddon align="block-start" class="border-b">
      <Code />
      <InputGroupText class="font-mono">script.js</InputGroupText>
      <InputGroupButton size="icon-sm" class="ml-auto" aria-label="Copy code">
        <Copy />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</div>
```

#### block-end

Use `align="block-end"` to place a footer row below the control.

```astro
---
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/starwind/input-group";
---

<div class="grid w-full max-w-sm gap-4">
  <InputGroup>
    <InputGroupInput placeholder="Enter amount" />
    <InputGroupAddon align="block-end">
      <InputGroupText>USD</InputGroupText>
    </InputGroupAddon>
  </InputGroup>

  <InputGroup>
    <InputGroupTextarea placeholder="Write a comment..." />
    <InputGroupAddon align="block-end">
      <InputGroupText>0/280</InputGroupText>
      <InputGroupButton variant="default" size="sm" class="ml-auto">Post</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</div>
```

## API Reference

### InputGroup

The root wrapper that handles group-level border, focus ring, and invalid state styling.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
</InputGroup>
```

**Additional Notes:**
- Accepts all standard HTML `<div>` attributes

### InputGroupAddon

A flexible container for icons, text, buttons, and status indicators.

| Prop | Type | Default |
|------|------|---------|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |
| `class` | `string` | - |

```astro
<InputGroupAddon align="inline-end">
  <Search />
</InputGroupAddon>
```

**Additional Notes:**
- Place after the control in markup for proper focus behavior
- Use `inline-start`/`inline-end` with `InputGroupInput`
- Use `block-start`/`block-end` with `InputGroupTextarea`

### InputGroupButton

An input-group-tuned button with compact sizing and no shadow.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "icon-sm"` | `"sm"` |
| `variant` | `"default" \| "primary" \| "secondary" \| "outline" \| "ghost" \| "info" \| "success" \| "warning" \| "error"` | `"ghost"` |
| `type` | `string` | `"button"` |
| `class` | `string` | - |

```astro
<InputGroupButton variant="secondary" size="icon-sm" aria-label="Copy">
  <Copy />
</InputGroupButton>
```

**Additional Notes:**
- Inherits remaining props from `Button`

### InputGroupInput

Input replacement with input-group styles and focus-slot behavior pre-applied.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `type` | `string` | `"text"` |
| `class` | `string` | - |

```astro
<InputGroupInput placeholder="Enter text..." />
```

**Additional Notes:**
- Inherits all props from `Input`
- Automatically applies `data-slot="input-group-control"`

### InputGroupText

A helper text wrapper for prefixes, suffixes, and metadata labels.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<InputGroupText>@company.com</InputGroupText>
```

### InputGroupTextarea

Textarea replacement with input-group styles and focus-slot behavior pre-applied.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `class` | `string` | - |

```astro
<InputGroupTextarea placeholder="Write a comment..." />
```

**Additional Notes:**
- Inherits all props from `Textarea`
- Automatically applies `data-slot="input-group-control"`
