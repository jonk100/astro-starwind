---
title: Alert
---

# Alert

```astro
---
import { Alert, AlertDescription, AlertTitle } from "@/components/starwind/alert";
---

<Alert variant="info">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an
    "AlertDescription".
  </AlertDescription>
</Alert>
```

## Installation

```bash
npx starwind@latest add alert
```

## Usage

### icon

You can add any svg icon inside `<AlertTitle>` component and it will be automatically styled.

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

### variant

```astro
---
import { Alert, AlertDescription, AlertTitle } from "@/components/starwind/alert";
---

<Alert variant="default">
  <AlertTitle>variant="default"</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an
    "AlertDescription".
  </AlertDescription>
</Alert>
<Alert variant="primary">
  <AlertTitle>variant="primary"</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an
    "AlertDescription".
  </AlertDescription>
</Alert>
<Alert variant="secondary">
  <AlertTitle>variant="secondary"</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an
    "AlertDescription".
  </AlertDescription>
</Alert>
<Alert variant="info">
  <AlertTitle>variant="info"</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an
    "AlertDescription".
  </AlertDescription>
</Alert>
<Alert variant="success">
  <AlertTitle>variant="success"</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an
    "AlertDescription".
  </AlertDescription>
</Alert>
<Alert variant="warning">
  <AlertTitle>variant="warning"</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an
    "AlertDescription".
  </AlertDescription>
</Alert>
<Alert variant="error">
  <AlertTitle>variant="error"</AlertTitle>
  <AlertDescription>
    A simple alert with an "AlertTitle" and an
    "AlertDescription".
  </AlertDescription>
</Alert>
```

## API Reference

### Alert

The root component that serves as a container for alert content. It provides styled notification messages with different visual variants.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` |
| `class` | `string` | - |

```astro
<Alert variant="info">
  <!-- Alert content -->
</Alert>
```

### AlertTitle

A component for rendering alert title with appropriate styling.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<AlertTitle>
  <Icon />
  Heads up!
</AlertTitle>
```

> **Tip:** Adding an SVG icon inside `<AlertTitle>` will automatically style it to match the current alert variant.

### AlertDescription

A component for rendering alert description with appropriate styling.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<AlertDescription>
  A simple alert with an "AlertTitle" and an "AlertDescription".
</AlertDescription>
```
