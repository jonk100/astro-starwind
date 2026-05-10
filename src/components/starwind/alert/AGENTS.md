# Alert Component

## Purpose and Usage

The Alert component provides styled notification messages with different visual variants. Use it for displaying important information, warnings, errors, success messages, or any notification that needs visual emphasis.

## Components

### Alert

The root component that serves as a container for alert content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant for the alert |
| `class` | `string` | - | Additional CSS classes for styling |

### AlertTitle

A component for rendering alert title with appropriate styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### AlertDescription

A component for rendering alert description with appropriate styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Alert
```astro
---
import { Alert, AlertDescription, AlertTitle } from "@/components/starwind/alert";
---

<Alert variant="info">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an "AlertDescription".
  </AlertDescription>
</Alert>
```

### Alert with Icon
```astro
---
import { Alert, AlertDescription, AlertTitle } from "@/components/starwind/alert";
import Flame from "@tabler/icons/outline/flame.svg";
---

<Alert variant="error">
  <AlertTitle><Flame />Danger!</AlertTitle>
  <AlertDescription>
    This action is destructive and may have unintended consequences.
  </AlertDescription>
</Alert>
```

### All Variants
```astro
<Alert variant="default">
  <AlertTitle>Default</AlertTitle>
  <AlertDescription>Standard default alert styling</AlertDescription>
</Alert>

<Alert variant="primary">
  <AlertTitle>Primary</AlertTitle>
  <AlertDescription>Primary color scheme for emphasis</AlertDescription>
</Alert>

<Alert variant="secondary">
  <AlertTitle>Secondary</AlertTitle>
  <AlertDescription>Secondary color for less emphasis</AlertDescription>
</Alert>

<Alert variant="info">
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>Blue color scheme for information</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Green color scheme for success states</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Yellow/orange color scheme for warnings</AlertDescription>
</Alert>

<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Red color scheme for error states</AlertDescription>
</Alert>
```

## Variant Descriptions

- **default**: Standard alert styling with neutral colors
- **primary**: Primary color scheme for emphasis
- **secondary**: Secondary color scheme for less emphasis
- **info**: Blue color scheme for informational messages
- **success**: Green color scheme for success states
- **warning**: Yellow/orange color scheme for warnings
- **error**: Red color scheme for error states

## Features

- **Multiple variants**: 6 different visual styles for different message types
- **Icon support**: SVG icons in AlertTitle are automatically styled
- **Semantic colors**: Color-coded variants for different message types
- **Accessibility**: ARIA-compliant notification structure
- **Flexible**: Accepts custom CSS classes

## Accessibility Notes

- Use semantic variants appropriately (error for errors, warning for warnings, etc.)
- Icons in AlertTitle are automatically styled to match variant
- Ensure sufficient color contrast for readability
- Consider using aria-label for custom alerts
- Test with screen readers for proper announcement

## Best Practices

- Use appropriate variant for message type (error for errors, success for confirmations)
- Keep messages concise and clear
- Use icons to improve visual recognition
- Consider user preferences for notification persistence
- Test color combinations for accessibility
