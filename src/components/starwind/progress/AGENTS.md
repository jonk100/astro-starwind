# Progress Component

## Purpose and Usage

The Progress component is an accessible progress bar with multiple variants for visual feedback. Use it for showing file upload progress, form completion, step-by-step processes, or any situation where you need to indicate completion status.

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier for the progress element |
| `value` | `number` | - | Current progress value (0-100) |
| `max` | `number` | `100` | Maximum value for progress bar |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Progress
```astro
---
import { Progress } from "@/components/starwind/progress";
---

<div class="w-full max-w-[400px]">
  <Progress id="demo-progress" value={50} />
</div>
```

### All Variants
```astro
---
import { Progress } from "@/components/starwind/progress";
---

<div class="flex flex-col gap-4 w-full max-w-[400px]">
  <Progress id="default" value={60} variant="default" />
  <Progress id="primary" value={60} variant="primary" />
  <Progress id="secondary" value={60} variant="secondary" />
  <Progress id="info" value={60} variant="info" />
  <Progress id="success" value={60} variant="success" />
  <Progress id="warning" value={60} variant="warning" />
  <Progress id="error" value={60} variant="error" />
</div>
```

### Indeterminate Progress
```astro
---
import { Progress } from "@/components/starwind/progress";
---

<Progress id="indeterminate" />
```

### Dynamic Updates
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

### Custom Styling
```astro
---
import { Progress } from "@/components/starwind/progress";
---

<Progress id="custom-progress" value={75} class="h-3 bg-primary" />
```

## Variant Descriptions

- **default**: Standard neutral styling
- **primary**: Primary color scheme for emphasis
- **secondary**: Secondary color scheme for less emphasis
- **info**: Blue color scheme for informational progress
- **success**: Green color scheme for successful completion
- **warning**: Yellow/orange color scheme for warnings
- **error**: Red color scheme for error states

## Features

- **Multiple variants**: 6 different visual styles for different contexts
- **Indeterminate state**: Loading animation when no value provided
- **Dynamic updates**: Update progress via `data-value` attribute
- **Responsive**: Scales with parent container width
- **Accessible**: ARIA-compliant progress indicator

## Accessibility Notes

- Includes proper `role="progressbar"` attribute
- Uses `aria-valuenow` for live updates
- Provides `aria-valuemin` and `aria-valuemax` boundaries
- Supports keyboard navigation and screen readers
- Consider using semantic variants appropriately

## Dynamic Updates

The Progress component can be updated dynamically by changing the `data-value` attribute:

```javascript
// Update progress to 75%
progressElement.setAttribute("data-value", "75");
```

This is useful for:
- File upload progress
- Form completion tracking
- Step-by-step processes
- Real-time data synchronization

## Best Practices

- Use appropriate variant for context (success for completion, error for failures)
- Include descriptive labels for screen readers
- Consider providing indeterminate state for unknown duration
- Test with keyboard navigation and assistive technology
- Ensure sufficient color contrast for all variants
