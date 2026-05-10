# Input Component

## Purpose and Usage

The Input component provides a versatile text input with multiple sizes, types, and states. Use it for forms, search fields, data entry, or any situation where users need to input text.

## Components

### Input

A versatile input component with multiple sizes and states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the input size |
| `type` | `string` | `"text"` | HTML input type (text, email, password, number, file, etc.) |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Inputs
```astro
---
import { Input } from "@/components/starwind/input";
---

<Input placeholder="Enter your name" />
<Input placeholder="Enter your email" type="email" />
<Input placeholder="Enter your password" type="password" />
<Input placeholder="Enter your age" type="number" />
<Input type="file" />
```

### Different Sizes
```astro
---
import { Input } from "@/components/starwind/input";
---

<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />
```

### Disabled State
```astro
---
import { Input } from "@/components/starwind/input";
---

<Input disabled placeholder="Disabled input" />
<Input disabled value="Disabled with value" />
```

### Form Integration
```astro
---
import { Input } from "@/components/starwind/input";
---

<form>
  <div class="space-y-4">
    <Input id="name" name="name" placeholder="Full Name" />
    <Input id="email" name="email" type="email" placeholder="Email Address" />
    <Input id="password" name="password" type="password" placeholder="Password" />
    <Input id="age" name="age" type="number" placeholder="Age" />
    <Input id="message" name="message" type="text" placeholder="Your message" />
  </div>
</form>
```

### Search Input
```astro
---
import { Input } from "@/components/starwind/input";
import Search from "@tabler/icons/outline/search.svg";
---

<div class="relative">
  <Input placeholder="Search..." class="pr-10" />
  <Search class="absolute right-3 top-1/2 size-4" />
</div>
```

## Features

- **Multiple types**: Text, email, password, number, file, etc.
- **Flexible sizing**: Small, medium, large options
- **Disabled state**: Can disable input functionality
- **Form integration**: Works seamlessly with forms
- **Accessible**: Proper ARIA attributes and keyboard navigation
- **Customizable styling**: Full CSS class support
- **Lightweight**: Minimal markup for performance
- **HTML5 compatible**: Supports all standard HTML input attributes

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for input states
- Semantic input structure for assistive technology
- High contrast for visibility
- Consider using appropriate input types for semantic meaning
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use appropriate input types for semantic meaning (email for email, password for passwords)
- Include descriptive placeholder text to guide user input
- Consider using appropriate sizes for your layout
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful id and name attributes for form association
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear error states and validation feedback
