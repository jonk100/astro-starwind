# Textarea Component

## Purpose and Usage

The Textarea component provides a versatile text input area with multiple sizes and states. Use it for multi-line text input, comments, descriptions, or any situation where users need to enter longer text content.

## Components

### Textarea

A versatile textarea component with multiple sizes and states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the textarea size |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Textarea
```astro
---
import { Textarea } from "@/components/starwind/textarea";
---

<Textarea placeholder="Type something..." />
```

### Different Sizes
```astro
---
import { Textarea } from "@/components/starwind/textarea";
---

<Textarea size="sm" placeholder="Small textarea" />
<Textarea size="md" placeholder="Medium textarea" />
<Textarea size="lg" placeholder="Large textarea" />
```

### Disabled State
```astro
---
import { Textarea } from "@/components/starwind/textarea";
---

<Textarea disabled placeholder="Disabled textarea" />
```

### Form Integration
```astro
---
import { Button } from "@/components/starwind/button";
import { Label } from "@/components/starwind/label";
import { Textarea } from "@/components/starwind/textarea";
---

<form id="textarea-form" class="space-y-4">
  <div class="space-y-2">
    <Label for="message">Message</Label>
    <Textarea id="message" name="message" placeholder="Type your message here..." />
  </div>
  <Button type="submit">Submit</Button>
</form>

<script>
  const form = document.getElementById("textarea-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  });
</script>
```

## Features

- **Multiple sizes**: Small, medium, large options
- **Disabled state**: Can be disabled to prevent user interaction
- **Form integration**: Works seamlessly with forms
- **Accessibility**: Full ARIA support and keyboard navigation
- **Customizable styling**: Full CSS class support
- **Standard HTML attributes**: Accepts all native textarea attributes
- **Responsive design**: Adapts to different content lengths
- **Auto-resize**: Users can resize the textarea by default

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for textarea states and cursor position
- High contrast for visibility
- Semantic textarea structure for assistive technology
- Consider using appropriate labels and descriptions
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use meaningful placeholder text that describes the expected input
- Consider using appropriate sizes for your layout context
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful form names and labels
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and interaction states
- Test form validation and submission handling
- Consider auto-resize behavior and its impact on your layout
- Use appropriate rows and cols attributes for expected content length
