# Switch Component

## Purpose and Usage

The Switch component provides an accessible toggle switch with multiple variants and sizes. Use it for binary settings, feature toggles, or any situation where users need to switch between two states.

## Components

### Switch

An accessible toggle switch component with multiple variants and sizes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | Unique identifier for the switch |
| `label` | `string` | - | Accessible label rendered next to the switch |
| `checked` | `boolean` | `false` | When true, the switch is initially checked |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls the switch size |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant for the switch |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Switch
```astro
---
import { Switch } from "@/components/starwind/switch";
---

<Switch id="demo-switch" label="Switch" />
```

### Different Variants
```astro
---
import { Switch } from "@/components/starwind/switch";
---

<Switch id="default" label="Default" variant="default" checked />
<Switch id="primary" label="Primary" variant="primary" checked />
<Switch id="secondary" label="Secondary" variant="secondary" checked />
<Switch id="info" label="Info" variant="info" checked />
<Switch id="success" label="Success" variant="success" checked />
<Switch id="warning" label="Warning" variant="warning" checked />
<Switch id="error" label="Error" variant="error" checked />
```

### Different Sizes
```astro
---
import { Switch } from "@/components/starwind/switch";
---

<Switch id="small" label="Small" size="sm" />
<Switch id="medium" label="Medium" size="md" />
<Switch id="large" label="Large" size="lg" />
```

### Event Handling
```astro
---
import { Switch } from "@/components/starwind/switch";
---

<div class="mt-8 space-y-4">
  <h2 class="text-xl font-semibold">Switch Event Test</h2>
  <div class="space-y-4">
    <Switch id="test-switch" label="Test Switch" variant="primary" />
    <div id="status-display" class="text-muted-foreground text-sm">
      Switch is currently: <span class="text-foreground font-medium">off</span>
    </div>
  </div>
</div>

<script>
  import type { SwitchChangeEvent } from "@/components/starwind/switch";

  const testSwitch = document.querySelector("#test-switch") as HTMLElement;
  const statusDisplay = document.querySelector("#status-display span");

  testSwitch.addEventListener("starwind-switch:change", (e) => {
    const event = e as SwitchChangeEvent;
    if (event.detail.switchId === "test-switch" && statusDisplay) {
      statusDisplay.textContent = event.detail.checked ? "on" : "off";
    }
  });
</script>
```

## Features

- **Multiple variants**: Default, primary, secondary, info, success, warning, error
- **Flexible sizing**: Small, medium, large options
- **Event system**: Custom events for state changes
- **Form integration**: Works seamlessly with forms
- **Accessibility**: Full ARIA support and keyboard navigation
- **Customizable styling**: Full CSS class support
- **Semantic structure**: Proper button and label elements

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for switch states and thumb positions
- High contrast for visibility
- Semantic button structure for assistive technology
- Consider using appropriate variants for different contexts
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use meaningful labels that describe the switch's purpose
- Consider using appropriate variants for different contexts
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful id attributes for form association
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and interaction states
- Test form validation and submission handling
- Use appropriate variants for semantic meaning (success for enabled, error for disabled)
