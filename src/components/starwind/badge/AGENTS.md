# Badge Component

## Purpose and Usage

The Badge component is a versatile badge component with multiple variants and sizes. Use it for displaying status indicators, labels, tags, or small pieces of information that need visual emphasis.

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "primary" \| "secondary" \| "outline" \| "ghost" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant of the badge |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the badge |
| `href` | `string` | - | When provided, renders as a link (`<a>` tag) |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Badge
```astro
---
import { Badge } from "@/components/starwind/badge";
---

<Badge>Badge</Badge>
```

### Badge with Variants
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

### Badge with Sizes
```astro
---
import { Badge } from "@/components/starwind/badge";
import Mail from "@tabler/icons/outline/mail.svg";
---

<Badge size="sm"><Mail />small</Badge>
<Badge size="md"><Mail />medium</Badge>
<Badge size="lg"><Mail />large</Badge>
```

### Badge as Link
```astro
---
import { Badge } from "@/components/starwind/badge";
---

<Badge href="#link">Badge</Badge>
```

## Variant Descriptions

- **default**: Standard badge style
- **primary**: Primary color scheme for emphasis
- **secondary**: Secondary color scheme for less emphasis
- **outline**: Outlined style with transparent background
- **ghost**: Minimal style with subtle appearance
- **info**: Blue color scheme for information
- **success**: Green color scheme for success states
- **warning**: Yellow/orange color scheme for warnings
- **error**: Red color scheme for error states

## Size Descriptions

- **sm**: Small badge for compact spaces
- **md**: Medium badge (default size)
- **lg**: Large badge for more prominence

## Features

- **Multiple variants**: 9 different visual styles
- **Responsive sizing**: 3 size options
- **Link support**: Can render as clickable links
- **Icon support**: Works well with icon components
- **Customizable**: Accepts additional CSS classes

## Accessibility Notes

- When using as a link, ensure the `href` points to a meaningful destination
- The badge content should be descriptive of what it represents
- Consider using appropriate variants for semantic meaning (e.g., "error" for errors)
