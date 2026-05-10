# Checkbox Component

## Purpose and Usage

The Checkbox component provides an accessible checkbox input with multiple variants and sizes. Use it for forms, settings, preferences, or any situation where you need binary yes/no choices from users.

## Components

### Checkbox

An accessible checkbox component with multiple variants and sizes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | Unique identifier for the checkbox, used for label association |
| `label` | `string` | - | Text label displayed next to the checkbox |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant for the checkbox |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the checkbox size |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Checkboxes
```astro
---
import { Checkbox } from "@/components/starwind/checkbox";
---

<Checkbox id="terms" label="Accept terms" variant="default" checked />
<Checkbox id="newsletter" label="Subscribe to newsletter" variant="primary" />
<Checkbox id="notifications" label="Enable notifications" variant="secondary" checked />
<Checkbox id="updates" label="Receive updates" variant="info" checked />
<Checkbox id="remember" label="Remember me" variant="success" />
<Checkbox id="warning" label="I understand the risks" variant="warning" />
<Checkbox id="error" label="Delete all data" variant="error" />
```

### Different Sizes
```astro
---
import { Checkbox } from "@/components/starwind/checkbox";
---

<Checkbox id="small" label="Small" size="sm" />
<Checkbox id="medium" label="Medium" size="md" />
<Checkbox id="large" label="Large" size="lg" />
```

### Disabled State
```astro
---
import { Checkbox } from "@/components/starwind/checkbox";
---

<Checkbox id="disabled" label="Disabled checkbox" disabled />
<Checkbox id="disabled-checked" label="Disabled but checked" disabled checked />
```

### Form Integration
```astro
---
import { Checkbox } from "@/components/starwind/checkbox";
---

<form>
  <div class="space-y-4">
    <Checkbox id="marketing" label="Send me marketing emails" />
    <Checkbox id="newsletter" label="Subscribe to newsletter" />
    <Checkbox id="terms" label="I accept the terms and conditions" />
    <Checkbox id="privacy" label="I agree to the privacy policy" />
  </div>
</form>
```

## Features

- **Multiple variants**: Default, primary, secondary, info, success, warning, error
- **Flexible sizing**: Small, medium, large options
- **Disabled state**: Can disable checkbox functionality
- **Accessible**: Proper ARIA attributes and keyboard navigation
- **Form integration**: Works seamlessly with forms
- **Customizable styling**: Full CSS class support
- **Lightweight**: Minimal markup for performance

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for checked/unchecked states
- Semantic checkbox structure for assistive technology
- High contrast for visibility
- Consider using appropriate variants for semantic meaning
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all variants

## Best Practices

- Use semantic variants (success for positive actions, error for destructive actions)
- Include descriptive labels that clearly indicate the checkbox purpose
- Consider using appropriate variants for different contexts
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful id attributes for form association
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for checked/unchecked states
