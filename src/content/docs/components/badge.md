---
title: Badge
---

# Badge

```astro
---
import { Badge } from "@/components/starwind/badge";
---

<Badge>Badge</Badge>
```

## Installation

```bash
npx starwind@latest add badge
```

## Link

The Badge component can also function as a link (`<a>` tag) by providing an `href` prop.

```astro
---
import { Badge } from "@/components/starwind/badge";
---

<Badge href="#link">Badge</Badge>
```

## Usage

### variant

```astro
---
import { Badge } from "@/components/starwind/badge";
---

<Badge variant="default">default</Badge>
<Badge variant="primary">primary</Badge>
<Badge variant="secondary">secondary</Badge>
<Badge variant="outline">outline</Badge>
<Badge variant="ghost">ghost</Badge>
<Badge variant="info">info</Badge>
<Badge variant="success">success</Badge>
<Badge variant="warning">warning</Badge>
<Badge variant="error">error</Badge>
```

### size

```astro
---
import { Badge } from "@/components/starwind/badge";
import Mail from "@tabler/icons/outline/mail.svg";
---

<Badge size="sm"><Mail />small</Badge>
<Badge size="md"><Mail />medium</Badge>
<Badge size="lg"><Mail />large</Badge>
```

## API Reference

### Badge API

A versatile badge component with multiple variants and sizes.

| Prop      | Type                                                                                                           | Default     |
|-----------|----------------------------------------------------------------------------------------------------------------|-------------|
| `variant` | `"default" \| "primary" \| "secondary" \| "outline" \| "ghost" \| "info" \| "success" \| "warning" \| "error"` | `"default"` |
| `size`    | `"sm" \| "md" \| "lg"`                                                                                         | `"md"`      |
| `href`    | `string`                                                                                                       | -           |
| `class`   | `string`                                                                                                       | -           |

```astro
<Badge variant="default" size="md">Badge</Badge>
```

**Additional Notes:**

- `href`: When provided, renders the badge as a link (`<a>` tag) instead of a `<div>`
