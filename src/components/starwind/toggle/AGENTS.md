# Toggle Component

## Purpose and Usage

The Toggle component provides an accessible toggle button with multiple variants and sizes. Use it for binary settings, feature toggles, view switching, or any situation where users need to toggle between two states.

## Components

### Toggle

An accessible toggle button component with multiple variants and sizes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline"` | `"default"` | Controls the visual style of the toggle |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls the toggle size |
| `defaultPressed` | `boolean` | `false` | Controls the initial pressed/on state of the toggle |
| `syncGroup` | `string` | - | Optional group key that synchronizes the pressed state across toggles with the same value |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Toggle
```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<Toggle variant="outline">Toggle</Toggle>
```

### Different Variants
```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<Toggle variant="default">Default</Toggle>
<Toggle variant="outline">Outline</Toggle>
```

### Different Sizes
```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<Toggle size="sm">Small</Toggle>
<Toggle size="md">Medium</Toggle>
<Toggle size="lg">Large</Toggle>
```

### With Initial State
```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<Toggle variant="outline" defaultPressed={true}>Initially On</Toggle>
<Toggle variant="outline">Initially Off</Toggle>
```

### Synchronized Toggles
```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<Toggle variant="outline" syncGroup="view-mode">
  Grid view
</Toggle>
<Toggle variant="outline" syncGroup="view-mode">
  Grid view (mirrored)
</Toggle>
```

### Event Handling
```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<div class="space-y-4">
  <Toggle id="test-toggle">Test Toggle</Toggle>
  <div id="status-display" class="text-muted-foreground text-sm">
    Toggle is currently: <span class="text-foreground font-medium">off</span>
  </div>
</div>

<script>
  import type { ToggleChangeEvent } from "@/components/starwind/toggle";

  const testToggle = document.querySelector("#test-toggle") as HTMLElement;
  const statusDisplay = document.querySelector("#status-display span");

  testToggle.addEventListener("starwind-toggle:change", (e) => {
    const event = e as ToggleChangeEvent;
    if (event.detail.toggleId === "test-toggle" && statusDisplay) {
      statusDisplay.textContent = event.detail.pressed ? "on" : "off";
    }
  });
</script>
```

## Features

- **Multiple variants**: Default and outline styles for different contexts
- **Flexible sizing**: Small, medium, large options
- **Synchronization**: syncGroup prop for coordinating multiple toggles
- **Event system**: Custom events for state changes
- **Form integration**: Works seamlessly with forms
- **Accessibility**: Full ARIA support and keyboard navigation
- **Customizable styling**: Full CSS class support
- **Semantic structure**: Proper button element with managed ARIA attributes
- **State management**: Controlled and uncontrolled modes

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for toggle states and button positions
- High contrast for visibility
- Semantic button structure for assistive technology
- Consider using appropriate variants for different contexts
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use meaningful variants for different contexts (outline for secondary actions, default for primary)
- Consider using syncGroup for coordinating related toggles
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful id attributes for form association
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and interaction states
- Test form validation and submission handling
- Use appropriate variants for semantic meaning (success for enabled, error for disabled)
