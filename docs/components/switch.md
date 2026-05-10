# Switch

```astro
---
import { Switch } from "@/components/starwind/switch";
---

<Switch id="demo-switch" label="Switch" />
```

## Installation

```bash
npx starwind@latest add switch
```

## Usage

### variant

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

### size

```astro
---
import { Switch } from "@/components/starwind/switch";
---

<Switch id="small" label="Small" size="sm" />
<Switch id="medium" label="Medium" size="md" />
<Switch id="large" label="Large" size="lg" />
```

### Event Handling

Whenever toggled, the switch emits a `starwind-switch:change` event. This can be listened to in order to update your UI based on the `event.detail.checked` value.

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

The event emission happens on state change and looks like:

```js
const event = new CustomEvent<SwitchChangeEvent[detail]>("starwind-switch:change", {
  detail: {
    checked: newState, // boolean
    switchId: this.switchButton.id,
  },
  bubbles: true,
  cancelable: true,
});

this.switchButton.dispatchEvent(event);
```

## API Reference

### Switch

An accessible toggle switch component with multiple variants and sizes.

| Prop | Type | Default |
|------|------|---------|
| `id` | `string` | Required |
| `label` | `string` | - |
| `checked` | `boolean` | `false` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` |
| `class` | `string` | - |

```astro
<Switch id="notifications" label="Notifications" variant="primary" size="md" checked />
```

**Additional Notes:**
- `id`: Used to associate the internal button with the label
- `label`: Accessible label rendered next to the switch
- This component accepts all standard HTML `<button>` attributes except `role`, `type`, and `aria-checked`
