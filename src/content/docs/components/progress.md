---
title: Progress
---

# Progress

```astro
---
import { Progress } from "@/components/starwind/progress";
---

<div class="w-full max-w-[400px]">
  <Progress id="demo-progress" value={50} />
</div>
```

## Installation

```bash
npx starwind@latest add progress
```

## Usage

### Variants

```astro
---
import { Progress } from "@/components/starwind/progress";
---

<div class="flex flex-col gap-4 w-full max-w-[400px]" slot="preview">
  <Progress id="default" value={60} variant="default" />
  <Progress id="primary" value={60} variant="primary" />
  <Progress id="secondary" value={60} variant="secondary" />
  <Progress id="info" value={60} variant="info" />
  <Progress id="success" value={60} variant="success" />
  <Progress id="warning" value={60} variant="warning" />
  <Progress id="error" value={60} variant="error" />
</div>
```

### Indeterminate

When you need to show a loading state without a specific value, omit the `value` prop to create an indeterminate progress bar.

```astro
---
import { Progress } from "@/components/starwind/progress";
---

<Progress id="indeterminate" />
```

### Dynamic Updates

The Progress component can be updated dynamically by changing the `data-value` attribute. This is useful for showing real-time progress like file uploads, form completion, or step-by-step processes.

```astro
---
import { Progress } from "@/components/starwind/progress";
import { Button } from "@/components/starwind/button";
---

<div class="flex w-full max-w-[400px] flex-col gap-4">
  <h3 class="text-lg font-medium">Interactive Progress Example</h3>

  <div class="space-y-4">
    <Progress id="interactive-progress" value={25} class="w-full" />

    <Button id="toggle-progress" variant="outline">Toggle Progress (25% ⟷ 75%)</Button>
  </div>
</div>

<script>
  let isHighValue = false;

  function setupProgressExample() {
    const progressElement = document.getElementById("interactive-progress");
    const toggleButton = document.getElementById("toggle-progress");

    if (!progressElement || !toggleButton) return;

    toggleButton.addEventListener("click", () => {
      isHighValue = !isHighValue;
      const newValue = isHighValue ? 75 : 25;

      progressElement.setAttribute("data-value", String(newValue));
    });
  }

  setupProgressExample();
  document.addEventListener("astro:after-swap", setupProgressExample);
</script>
```

## API Reference

### Progress

An accessible progress bar component with multiple variants for visual feedback.

| Prop | Type | Default |
|------|------|---------|
| `id` | `string` | - |
| `value` | `number` | - |
| `max` | `number` | `100` |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` |
| `class` | `string` | - |

```astro
<Progress id="progress" value={50} variant="default" />
```

**Additional Notes:**
- `value`: When omitted, progress bar enters an indeterminate state and displays a loading animation
- `max`: Maximum value for progress bar
- The component can be updated dynamically by changing the `data-value` attribute
