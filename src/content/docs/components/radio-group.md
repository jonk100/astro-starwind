---
title: Radio Group
---

# Radio Group

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

## Installation

```bash
npx starwind@latest add radio-group
```

## Usage

### variant

```astro
---
import { RadioGroup, RadioGroupItem } from "@/components/starwind/radio-group";
import { Label } from "@/components/starwind/label";
---

<RadioGroup name="variant-radio" legend="Default" defaultValue="default-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="default-1" value="default-1" variant="default" name="variant-default" />
    <Label for="default-1">Default Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="default-2" value="default-2" variant="default" name="variant-default" />
    <Label for="default-2">Default Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-primary" legend="Primary" defaultValue="primary-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="primary-1" value="primary-1" variant="primary" name="variant-primary" />
    <Label for="primary-1">Primary Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="primary-2" value="primary-2" variant="primary" name="variant-primary" />
    <Label for="primary-2">Primary Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-secondary" legend="Secondary" defaultValue="secondary-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="secondary-1" value="secondary-1" variant="secondary" name="variant-secondary" />
    <Label for="secondary-1">Secondary Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="secondary-2" value="secondary-2" variant="secondary" name="variant-secondary" />
    <Label for="secondary-2">Secondary Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-info" legend="Info" defaultValue="info-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="info-1" value="info-1" variant="info" name="variant-info" />
    <Label for="info-1">Info Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="info-2" value="info-2" variant="info" name="variant-info" />
    <Label for="info-2">Info Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-success" legend="Success" defaultValue="success-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="success-1" value="success-1" variant="success" name="variant-success" />
    <Label for="success-1">Success Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="success-2" value="success-2" variant="success" name="variant-success" />
    <Label for="success-2">Success Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-warning" legend="Warning" defaultValue="warning-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="warning-1" value="warning-1" variant="warning" name="variant-warning" />
    <Label for="warning-1">Warning Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="warning-2" value="warning-2" variant="warning" name="variant-warning" />
    <Label for="warning-2">Warning Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="variant-error" legend="Error" defaultValue="error-1">
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

### size

```astro
---
import { RadioGroup, RadioGroupItem } from "@/components/starwind/radio-group";
import { Label } from "@/components/starwind/label";
---

<RadioGroup name="size-sm" legend="Small" defaultValue="sm-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="sm-1" value="sm-1" size="sm" name="size-sm" />
    <Label for="sm-1" size="sm">Small Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="sm-2" value="sm-2" size="sm" name="size-sm" />
    <Label for="sm-2" size="sm">Small Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="size-md" legend="Medium" defaultValue="md-1">
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="md-1" value="md-1" size="md" name="size-md" />
    <Label for="md-1" size="md">Medium Option 1</Label>
  </div>
  <div class="flex gap-2 items-center">
    <RadioGroupItem id="md-2" value="md-2" size="md" name="size-md" />
    <Label for="md-2" size="md">Medium Option 2</Label>
  </div>
</RadioGroup>

<RadioGroup name="size-lg" legend="Large" defaultValue="lg-1">
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

### orientation

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

The RadioGroup component emits a `starwind:value-change` event when a radio option is selected. This can be listened to in order to update your UI based on the `event.detail.value` property.

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

The event emission happens when a radio item is selected and looks like:

```js
const event = new CustomEvent<RadioGroupChangeEvent[detail]>("starwind:value-change", {
  detail: {
    value: target.value, // string value of the selected radio
    radioGroupId: this.radioGroupId, // ID of the radio group
  },
  bubbles: true,
});

this.radioGroup.dispatchEvent(event);
```

## API Reference

### RadioGroup

The root component that manages the radio group state and keyboard navigation.

| Prop | Type | Default |
|------|------|---------|
| `name` | `string` | Required |
| `value` | `string` | - |
| `defaultValue` | `string` | - |
| `legend` | `string` | - |
| `required` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` |
| `class` | `string` | - |

```astro
<RadioGroup name="options" defaultValue="option-1" legend="Choose an option">
  <!-- Radio items -->
</RadioGroup>
```

**Additional Notes:**
- `name`: Name for the radio group inputs
- `legend`: Screen reader label for the group
- `orientation`: Layout orientation of radio items
- This component accepts all native fieldset attributes

### RadioGroupItem

Individual radio button item within the group.

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | Required |
| `id` | `string` | - |
| `name` | `string` | - |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` |
| `class` | `string` | - |

```astro
<RadioGroupItem id="option-1" value="option-1" name="options" />
```

**Additional Notes:**
- `variant`: Controls the visual style of the radio button
- `size`: Controls the radio button size
- This component accepts all native radio input attributes
