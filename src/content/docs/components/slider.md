---
title: Slider
---

# Slider

```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider defaultValue={25} aria-label="Volume" />
```

## Installation

```bash
npx starwind@latest add slider
```

## Usage

### General Notes

The `Slider` component provides an accessible way to select values within a range. It supports:

- **Single value selection**: Default mode with one thumb
- **Range selection**: Pass an array to `defaultValue` for two thumbs
- **Keyboard navigation**: Arrow keys, Page Up/Down, Home/End
- **Form integration**: Works with native form submission via hidden inputs

### Range Slider

Pass an array of two values to create a range slider with two thumbs.

```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider defaultValue={[25, 75]} aria-label="Price range" />
```

### With Step

Use the `step` prop to control the increment value.

```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider defaultValue={50} step={10} aria-label="Rating" />
```

### Variants

The slider supports multiple color variants.

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

### Disabled

```astro
---
import { Slider } from "@/components/starwind/slider";
---

<Slider defaultValue={40} disabled aria-label="Disabled slider" />
```

### Vertical Orientation

Set `orientation="vertical"` for a vertical slider. Make sure to provide a container with a defined height.

```astro
---
import { Slider } from "@/components/starwind/slider";
---

<div class="h-32">
  <Slider defaultValue={60} orientation="vertical" aria-label="Vertical slider" />
</div>
```

### Form Submission

The slider includes hidden `<input type="range">` elements for native form submission. For range sliders, the inputs are named with array notation (e.g., `price[0]`, `price[1]`).

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

## API Reference

### Slider

An accessible slider component for selecting values within a range.

| Prop | Type | Default |
|------|------|---------|
| `defaultValue` | `number \| number[]` | `0` |
| `value` | `number \| number[]` | - |
| `min` | `number` | `0` |
| `max` | `number` | `100` |
| `step` | `number` | `1` |
| `largeStep` | `number` | `10` |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `disabled` | `boolean` | `false` |
| `name` | `string` | - |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` |
| `aria-label` | `string` | - |
| `aria-labelledby` | `string` | - |
| `class` | `string` | - |

```astro
<Slider
  defaultValue={50}
  min={0}
  max={100}
  step={5}
  variant="primary"
  aria-label="Volume"
/>
```

**Additional Notes:**
- `defaultValue`: Initial value(s). Pass an array for range sliders
- `value`: Controlled value (use with JavaScript event handlers)
- `largeStep`: Step size for Page Up/Down and Shift+Arrow keys
- `orientation`: Set to `"vertical"` for vertical sliders. Requires a container with defined height
- `name`: Form field name. For range sliders, creates inputs named `name[0]` and `name[1]`

### Events

The slider emits custom events for JavaScript integration:

| Event | Detail | Description |
|-------|--------|-------------|
| `slider-change` | `{ value: number \| number[] }` | Fired on every value change during interaction |
| `slider-commit` | `{ value: number \| number[] }` | Fired when interaction ends (pointer up) |

```astro
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
