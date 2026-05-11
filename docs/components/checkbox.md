# Checkbox

```astro
---
import { Checkbox } from "@/components/starwind/checkbox";
---

<Checkbox id="demo-checkbox" label="Checkbox" />
```

## Installation

```bash
npx starwind@latest add checkbox
```

## Usage

### variant

```astro
---
import { Checkbox } from "@/components/starwind/checkbox";
---

<Checkbox id="default" label="Default" variant="default" checked />
<Checkbox id="primary" label="Primary" variant="primary" checked />
<Checkbox id="secondary" label="Secondary" variant="secondary" checked />
<Checkbox id="info" label="Info" variant="info" checked />
<Checkbox id="success" label="Success" variant="success" checked />
<Checkbox id="warning" label="Warning" variant="warning" checked />
<Checkbox id="error" label="Error" variant="error" checked />
```

### size

```astro
---
import { Checkbox } from "@/components/starwind/checkbox";
---

<Checkbox id="small" label="Small" size="sm" />
<Checkbox id="medium" label="Medium" size="md" />
<Checkbox id="large" label="Large" size="lg" />
```

### disabled

```astro
---
import { Checkbox } from "@/components/starwind/checkbox";
---

<Checkbox id="disabled" label="Disabled" disabled />
<Checkbox id="disabled-checked" label="Disabled Checked" disabled checked />
```

## API Reference

### Checkbox API

An accessible checkbox component with multiple variants and sizes.

| Prop      | Type                                                                                   | Default     |
|-----------|----------------------------------------------------------------------------------------|-------------|
| `id`      | `string`                                                                               | Required    |
| `label`   | `string`                                                                               | -           |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` |
| `size`    | `"sm" \| "md" \| "lg"`                                                                 | `"md"`      |
| `class`   | `string`                                                                               | -           |

```astro
<Checkbox id="terms" label="Accept terms" variant="default" size="md" />
```

**Additional Notes:**

- `id`: Unique identifier for the checkbox, used for label association
- `label`: Text label displayed next to the checkbox
