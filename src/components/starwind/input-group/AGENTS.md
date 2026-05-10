# Input Group Component

## Purpose and Usage

The Input Group component provides a way to group input fields with labels, icons, buttons, and actions. Use it for forms, search interfaces, authentication, or any situation where you need multiple related input elements.

## Components

### InputGroup

The root wrapper that handles group-level border, focus ring, and invalid state styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### InputGroupAddon

A flexible container for icons, text, buttons, and status indicators.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Controls placement of addon content relative to input field |
| `class` | `string` | - | Additional CSS classes for styling |

### InputGroupButton

An input-group-tuned button with compact sizing and no shadow.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "icon-sm"` | `"sm"` | Determines the button size |
| `variant` | `"default" \| "primary" \| "secondary" \| "outline" \| "ghost" \| "info" \| "success" \| "warning" \| "error"` | `"ghost"` | Visual style variant for the button |
| `type` | `string` | `"button"` | HTML button type |
| `class` | `string` | - | Additional CSS classes for styling |

### InputGroupInput

Input replacement with input-group styles and focus-slot behavior pre-applied.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the input size |
| `type` | `string` | `"text"` | HTML input type (text, email, password, number, file, etc.) |
| `class` | `string` | - | Additional CSS classes for styling |

### InputGroupText

A helper text wrapper for prefixes, suffixes, and metadata labels.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### InputGroupTextarea

Textarea replacement with input-group styles and focus-slot behavior pre-applied.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the textarea size |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Input Group
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

### With Label and Icon
```astro
---
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/starwind/input-group";
import Mail from "@tabler/icons/outline/mail.svg";
---

<InputGroup>
  <InputGroupInput type="email" placeholder="Enter your email" />
  <InputGroupAddon>
    <Mail />
  </InputGroupAddon>
</InputGroup>
```

### With Prefix and Suffix
```astro
---
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/starwind/input-group";
---

<InputGroup>
  <InputGroupInput placeholder="0.00" />
  <InputGroupAddon align="inline-start">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

### With URL Input
```astro
---
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/starwind/input-group";
---

<InputGroup>
  <InputGroupInput placeholder="example" class="!pl-0.5" />
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupText>.com</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

### With Textarea
```astro
---
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/starwind/input-group";
---

<InputGroup>
  <InputGroupTextarea placeholder="Write a comment..." />
  <InputGroupAddon align="block-end">
    <InputGroupText>120 characters left</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

### With Action Button
```astro
---
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/starwind/input-group";
import Copy from "@tabler/icons/outline/copy.svg";
---

<InputGroup>
  <InputGroupInput placeholder="https://starwind.dev" readonly />
  <InputGroupAddon align="inline-end">
      <InputGroupButton aria-label="Copy" title="Copy" size="icon-sm">
        <Copy />
      </InputGroupButton>
    </InputGroupAddon>
</InputGroup>
```

### Complex Form Layout
```astro
---
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/starwind/input-group";
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
    <InputGroupTextarea
      id="textarea-code"
      placeholder="console.log('Hello, world!');"
      class="min-h-[180px] font-mono text-sm"
    />
    <InputGroupAddon align="block-end" class="border-t">
      <InputGroupText>Line 1, Column 1</InputGroupText>
      <InputGroupButton size="sm" class="ml-auto" variant="default">
        Run
        <Code />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>

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

## Features

- **Flexible layout**: Multiple alignment options for addons (inline-start, inline-end, block-start, block-end)
- **Rich components**: Support for inputs, textareas, buttons, icons, and text
- **Focus management**: Automatic focus ring and invalid state styling
- **Form integration**: Works seamlessly with forms and proper field association
- **Customizable styling**: Full CSS class support for all components
- **Responsive design**: Adapts to different screen sizes
- **Keyboard accessible**: Full keyboard navigation support
- **Slot-based architecture**: Flexible component composition

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for input groups and addons
- High contrast for visibility
- Semantic input structure for assistive technology
- Consider using appropriate input types and labels
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use meaningful labels and placeholder text
- Consider appropriate alignment for your layout
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful button variants and actions
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and error states
- Use appropriate input types for semantic meaning
- Test form validation and error handling
