# Label Component

## Purpose and Usage

The Label component provides an accessible label for form inputs with multiple sizes. Use it for form field labels, input descriptions, or any situation where you need to associate text with a form element.

## Components

### Label

An accessible label component for form inputs with multiple sizes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the label size |
| `for` | `string` | - | The ID of the form element this label is associated with |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Labels
```astro
---
import { Label } from "@/components/starwind/label";
import { Input } from "@/components/starwind/input";
---

<div class="space-y-2">
  <Label for="email">Email Address</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
  
  <Label for="password">Password</Label>
  <Input id="password" type="password" placeholder="Enter your password" />
  
  <Label for="name">Full Name</Label>
  <Input id="name" placeholder="Enter your full name" />
</div>
```

### Different Sizes
```astro
---
import { Label } from "@/components/starwind/label";
import { Input } from "@/components/starwind/input";
---

<div class="space-y-2">
  <Label size="sm" for="small-input">Small Label</Label>
  <Input id="small-input" size="sm" placeholder="Small input" />
  
  <Label size="md" for="medium-input">Medium Label</Label>
  <Input id="medium-input" size="md" placeholder="Medium input" />
  
  <Label size="lg" for="large-input">Large Label</Label>
  <Input id="large-input" size="lg" placeholder="Large input" />
</div>
```

### With Disabled Input
```astro
---
import { Label } from "@/components/starwind/label";
import { Input } from "@/components/starwind/input";
---

<div class="space-y-2">
  <Label for="disabled-input">Disabled Input Label</Label>
  <Input id="disabled-input" disabled placeholder="This input is disabled" />
</div>
```

### Form Integration
```astro
---
import { Label } from "@/components/starwind/label";
import { Input } from "@/components/starwind/input";
import { Checkbox } from "@/components/starwind/checkbox";
---

<form>
  <div class="space-y-4">
    <Label for="name">Full Name</Label>
    <Input id="name" name="name" placeholder="Enter your name" />
    
    <Label for="email">Email Address</Label>
    <Input id="email" name="email" type="email" placeholder="Enter your email" />
    
    <Label for="password">Password</Label>
    <Input id="password" name="password" type="password" placeholder="Enter your password" />
    
    <Label for="terms">Terms and Conditions</Label>
    <Checkbox id="terms" name="terms" label="I agree to the terms and conditions" />
  </div>
</form>
```

### With Required Indicator
```astro
---
import { Label } from "@/components/starwind/label";
import { Input } from "@/components/starwind/input";
---

<div class="space-y-2">
  <Label for="required-field">
    Required Field
    <span class="text-red-500 ml-1">*</span>
  </Label>
  <Input id="required-field" name="required-field" required placeholder="This field is required" />
</div>
```

## Features

- **Multiple sizes**: Small, medium, large options
- **Form association**: Proper `for` attribute for input association
- **Accessible**: Full ARIA support and screen reader compatibility
- **Customizable styling**: Full CSS class support
- **Semantic structure**: Proper label element semantics
- **Lightweight**: Minimal markup for performance
- **Flexible**: Works with any form element (input, select, textarea, etc.)

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Automatic association with form elements via `for` attribute
- Keyboard navigation support for associated form elements
- High contrast for visibility
- Semantic label structure for assistive technology
- Consider using appropriate label text descriptions
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use descriptive and concise label text
- Ensure proper association with form elements using the `for` attribute
- Consider using required indicators for mandatory fields
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful labels that clearly describe the form element's purpose
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and error states
- Test form validation and error handling
