# Slider Component

## Purpose and Usage

The Slider component provides an accessible way to select values within a range. Use it for volume controls, brightness settings, price ranges, or any situation where users need to select a value from a continuous range.

## Components

### Slider

An accessible slider component for selecting values within a range.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `number \| number[]` | `0` | The initial value(s). Pass an array for range sliders |
| `value` | `number \| number[]` | - | Controlled value (use with JavaScript event handlers) |
| `min` | `number` | `0` | The minimum allowed value |
| `max` | `number` | `100` | The maximum allowed value |
| `step` | `number` | `1` | The increment/decrement value |
| `largeStep` | `number` | `10` | Step size for Page Up/Down and Shift+Arrow keys |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation of the slider |
| `disabled` | `boolean` | `false` | When true, prevents all user interaction |
| `name` | `string` | - | Form field name. For range sliders, creates inputs named `name[0]` and `name[1]` |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant for the slider |
| `aria-label` | `string` | - | Accessibility label for screen readers |
| `aria-labelledby` | `string` | - | Associates the slider with a label element |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Slider
```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider defaultValue={25} aria-label="Volume" />
```

### Range Slider
```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider defaultValue={[25, 75]} aria-label="Price range" />
```

### With Step Control
```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider defaultValue={50} step={10} aria-label="Rating" />
```

### Different Variants
```astro
---
import { Slider } from "@/components/starwind/slider";
---

<div class="flex flex-col gap-4">
  <Slider defaultValue={50} variant="default" aria-label="Default variant" />
  <Slider defaultValue={50} variant="primary" aria-label="Primary variant" />
  <Slider defaultValue={50} variant="secondary" aria-label="Secondary variant" />
  <Slider defaultValue={50} variant="info" aria-label="Info variant" />
  <Slider defaultValue={50} variant="success" aria-label="Success variant" />
  <Slider defaultValue={50} variant="warning" aria-label="Warning variant" />
  <Slider defaultValue={50} variant="error" aria-label="Error variant" />
</div>
```

### Disabled State
```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider defaultValue={40} disabled aria-label="Disabled slider" />
```

### Vertical Orientation
```astro
---
import { Slider } from "@/components/starwind/slider";
---

<div class="h-32">
  <Slider defaultValue={60} orientation="vertical" aria-label="Vertical slider" />
</div>
```

### Form Integration
```astro
---
import { Button } from "@/components/starwind/button";
import { Label } from "@/components/starwind/label";
import { Slider } from "@/components/starwind/slider";
---

<form id="slider-form" class="space-y-4">
  <div class="space-y-2">
    <Label for="volume">Volume</Label>
    <Slider defaultValue={50} name="volume" aria-label="Volume" />
  </div>
  <div class="space-y-2">
    <Label for="price-range">Price Range</Label>
    <Slider defaultValue={[20, 80]} name="price" aria-label="Price range" />
  </div>
  <Button type="submit">Submit</Button>
</form>

<script>
  const form = document.getElementById("slider-form") as HTMLFormElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  });
</script>
```

### Event Handling
```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider id="my-slider" defaultValue={50} aria-label="Volume" />

<script>
  const slider = document.getElementById("my-slider");
  slider.addEventListener("slider-change", (e) => {
    console.log("Value changed:", e.detail.value);
  });
  slider.addEventListener("slider-commit", (e) => {
    console.log("Final value:", e.detail.value);
  });
</script>
```

## Features

- **Accessible range selection**: Full keyboard navigation and ARIA support
- **Single and range support**: Works with single values or arrays for range sliders
- **Multiple variants**: Default, primary, secondary, info, success, warning, error
- **Flexible orientation**: Horizontal or vertical layout options
- **Step control**: Configurable increment/decrement behavior
- **Form integration**: Hidden inputs for native form submission
- **Event system**: Custom events for JavaScript integration
- **Customizable styling**: Full CSS class support
- **Large step support**: Different step sizes for different interaction patterns

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Arrow keys, Page Up/Down, Home/End, Tab)
- Focus management for slider states and thumb positions
- High contrast for visibility
- Semantic input structure for assistive technology
- Consider using appropriate labels and descriptions
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use meaningful aria-labels for accessibility
- Consider appropriate step sizes for your use case
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful form names and labels
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and interaction states
- Test form validation and submission handling
- Use appropriate orientation for your layout context
- Consider the difference between single and range sliders for your use case
