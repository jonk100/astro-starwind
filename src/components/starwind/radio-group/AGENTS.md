# Radio Group Component

## Purpose and Usage

The Radio Group component provides a way to group related radio buttons with proper accessibility and keyboard navigation. Use it for single-choice selections, preference settings, or any situation where users need to select one option from a group of related choices.

## Components

### RadioGroup

The root component that manages the radio group state and keyboard navigation.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | Required | Name for the radio group inputs |
| `value` | `string` | - | The currently selected value |
| `defaultValue` | `string` | - | The initial selected value |
| `legend` | `string` | - | Screen reader label for the group |
| `required` | `boolean` | `false` | Whether the radio group is required |
| `disabled` | `boolean` | `false` | When true, prevents all user interaction |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Layout orientation of radio items |
| `class` | `string` | - | Additional CSS classes for styling |

### RadioGroupItem

Individual radio button item within the group.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | The value for this radio option |
| `id` | `string` | - | Unique identifier for the radio input |
| `name` | `string` | - | Name for the radio input (should match group name) |
| `checked` | `boolean` | `false` | When true, this option is initially selected |
| `disabled` | `boolean` | `false` | When true, this option cannot be selected |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls the radio button size |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant for the radio button |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Radio Group
```astro
---
import { RadioGroup, RadioGroupItem } from "@/components/starwind/radio-group";
import { Label } from "@/components/starwind/label";
---

<RadioGroup name="demo-radio" defaultValue="option-1" legend="Choose an option">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="option-1" value="option-1" name="demo-radio-1" />
    <Label for="option-1">Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="option-2" value="option-2" name="demo-radio-1" />
    <Label for="option-2">Option 2</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="option-3" value="option-3" name="demo-radio-1" />
    <Label for="option-3">Option 3</Label>
  </div>
</RadioGroup>
```

### Different Variants
```astro
---
import { RadioGroup, RadioGroupItem } from "@/components/starwind/radio-group";
import { Label } from "@/components/starwind/label";
---

<RadioGroup name="variant-radio" legend="Choose a style">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="default-1" value="default-1" variant="default" name="variant-default" />
    <Label for="default-1">Default Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="default-2" value="default-2" variant="default" name="variant-default" />
    <Label for="default-2">Default Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-primary" legend="Primary">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="primary-1" value="primary-1" variant="primary" name="variant-primary" />
    <Label for="primary-1">Primary Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="primary-2" value="primary-2" variant="primary" name="variant-primary" />
    <Label for="primary-2">Primary Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-secondary" legend="Secondary">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="secondary-1" value="secondary-1" variant="secondary" name="variant-secondary" />
    <Label for="secondary-1">Secondary Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="secondary-2" value="secondary-2" variant="secondary" name="variant-secondary" />
    <Label for="secondary-2">Secondary Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-info" legend="Info">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="info-1" value="info-1" variant="info" name="variant-info" />
    <Label for="info-1">Info Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="info-2" value="info-2" variant="info" name="variant-info" />
    <Label for="info-2">Info Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-success" legend="Success">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="success-1" value="success-1" variant="success" name="variant-success" />
    <Label for="success-1">Success Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="success-2" value="success-2" variant="success" name="variant-success" />
    <Label for="success-2">Success Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-warning" legend="Warning">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="warning-1" value="warning-1" variant="warning" name="variant-warning" />
    <Label for="warning-1">Warning Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="warning-2" value="warning-2" variant="warning" name="variant-warning" />
    <Label for="warning-2">Warning Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-error" legend="Error">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="error-1" value="error-1" variant="error" name="variant-error" />
    <Label for="error-1">Error Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="error-2" value="error-2" variant="error" name="variant-error" />
    <Label for="error-2">Error Option 2</Label>
  </div>
</RadioGroup>
```

### Different Sizes
```astro
---
import { RadioGroup, RadioGroupItem } from "@/components/starwind/radio-group";
import { Label } from "@/components/starwind/label";
---

<RadioGroup name="size-sm" legend="Small">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="sm-1" value="sm-1" size="sm" name="size-sm" />
    <Label for="sm-1" size="sm">Small Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="sm-2" value="sm-2" size="sm" name="size-sm" />
    <Label for="sm-2" size="sm">Small Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="size-md" legend="Medium (default)">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="md-1" value="md-1" size="md" name="size-md" />
    <Label for="md-1" size="md">Medium Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="md-2" value="md-2" size="md" name="size-md" />
    <Label for="md-2" size="md">Medium Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="size-lg" legend="Large">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="lg-1" value="lg-1" size="lg" name="size-lg" />
    <Label for="lg-1" size="lg">Large Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="lg-2" value="lg-2" size="lg" name="size-lg" />
    <Label for="lg-2" size="lg">Large Option 2</Label>
  </div>
</RadioGroup>
```

### Different Orientations
```astro
---
import { RadioGroup, RadioGroupItem } from "@/components/starwind/radio-group";
import { Label } from "@/components/starwind/label";
---

<h3>Vertical (Default)</h3>
<RadioGroup name="orientation-vertical" orientation="vertical" defaultValue="vertical-1">
  <div class="space-y-2">
    <RadioGroupItem id="vertical-1" value="vertical-1" name="orientation-vertical" />
    <Label for="vertical-1">Option 1</Label>
  </div>
  <div class="space-y-2">
    <RadioGroupItem id="vertical-2" value="vertical-2" name="orientation-vertical" />
    <Label for="vertical-2">Option 2</Label>
  </div>
  <div class="space-y-2">
    <RadioGroupItem id="vertical-3" value="vertical-3" name="orientation-vertical" />
    <Label for="vertical-3">Option 3</Label>
  </div>
</RadioGroup>

<h3>Horizontal</h3>
<RadioGroup name="orientation-horizontal" orientation="horizontal" defaultValue="horizontal-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="horizontal-1" value="horizontal-1" name="orientation-horizontal" />
    <Label for="horizontal-1">Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="horizontal-2" value="horizontal-2" name="orientation-horizontal" />
    <Label for="horizontal-2">Option 2</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="horizontal-3" value="horizontal-3" name="orientation-horizontal" />
    <Label for="horizontal-3">Option 3</Label>
  </div>
</RadioGroup>
```

### Event Handling
```astro
---
import { RadioGroup, RadioGroupItem } from "@/components/starwind/radio-group";
import { Label } from "@/components/starwind/label";
---

<div class="space-y-4">
  <h3 class="text-lg font-medium">Radio Group Event Test</h3>
  <RadioGroup id="event-test" name="event-test" legend="Choose an option">
    <div class="flex gap-2">
      <RadioGroupItem id="event-1" value="one" name="radio-event-test" />
      <Label for="event-1">Option One</Label>
    </div>
    <div class="flex gap-2">
      <RadioGroupItem id="event-2" value="two" name="radio-event-test" />
      <Label for="event-2">Option Two</Label>
    </div>
    <div class="flex gap-2">
      <RadioGroupItem id="event-3" value="three" name="radio-event-test" />
      <Label for="event-3">Option Three</Label>
    </div>
  </RadioGroup>

  <div id="event-output" class="text-muted-foreground text-sm">
    Selected value: <span class="text-foreground font-medium">none</span>
  </div>
</div>

<script>
  import type { RadioGroupChangeEvent } from "@/components/starwind/radio-group";

  document.addEventListener("starwind:value-change", (e) => {
    const event = e as RadioGroupChangeEvent;
    const outputElement = document.querySelector("#event-output span");

    if (event.detail.radioGroupId === "event-test" && outputElement) {
      outputElement.textContent = event.detail.value;
    }
  });
</script>
```

## Features

- **Multiple variants**: Default, primary, secondary, info, success, warning, error
- **Flexible sizing**: Small, medium, large options
- **Orientation control**: Vertical or horizontal layout
- **Event system**: Custom events for value changes
- **Form integration**: Works seamlessly with forms
- **Accessibility**: Full ARIA support and keyboard navigation
- **Customizable styling**: Full CSS class support
- **Semantic structure**: Proper fieldset and legend elements

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Arrow keys, Tab, Enter, Space)
- Focus management for radio group and individual items
- High contrast for visibility
- Semantic fieldset/legend structure for assistive technology
- Consider using appropriate variants for semantic meaning
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use meaningful radio button labels and group legends
- Consider using appropriate variants for different contexts
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful name attributes for form association
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and selection states
- Test form validation and submission handling
- Use appropriate orientation for your layout (vertical for lists, horizontal for forms)
