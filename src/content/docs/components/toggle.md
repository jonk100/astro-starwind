---
title: Toggle
---

# Toggle

```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<Toggle variant="outline">Toggle</Toggle>
```

## Installation

```bash
npx starwind@latest add toggle
```

## Usage

### variant

```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<Toggle variant="default">Default</Toggle>
<Toggle variant="outline">Outline</Toggle>
```

### size

```astro
---
import { Toggle } from "@/components/starwind/toggle";
---

<Toggle size="sm">Small</Toggle>
<Toggle size="md">Medium</Toggle>
<Toggle size="lg">Large</Toggle>
```

### syncGroup

Use `syncGroup` prop to keep multiple toggles in sync. When one toggle in a group is pressed, all toggles with the same `syncGroup` will mirror its state.

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

Whenever toggled, the toggle emits a `starwind-toggle:change` event. This can be listened to in order to update your UI based on the `event.detail.pressed` value.

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

The event emission happens on state change and looks like:

```js
const event = new CustomEvent<ToggleChangeEvent[detail]>("starwind-toggle:change", {
  detail: {
    pressed: newState, // boolean
    toggleId: this.toggleButton.id,
    syncGroup: this.syncGroup,
  },
  bubbles: true,
  cancelable: true,
});

this.toggleButton.dispatchEvent(event);
```

## API Reference

### Toggle

An accessible toggle button component with multiple variants and sizes.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "outline"` | `"default"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `defaultPressed` | `boolean` | `false` |
| `syncGroup` | `string` | - |
| `class` | `string` | - |

```astro
<Toggle variant="outline" size="md" defaultPressed syncGroup="filters">
  Toggle filters
</Toggle>
```

**Additional Notes:**
- `defaultPressed`: Controls the initial pressed/on state of the toggle
- `syncGroup`: Optional group key that synchronizes the pressed state across toggles with the same value
- This component accepts all standard HTML `<button>` attributes except `type` and ARIA attributes that are managed internally
