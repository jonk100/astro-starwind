# Input

```astro
---
import { Input } from "@/components/starwind/input";
---

<Input placeholder="Type something..." />
```

## Installation

```bash
npx starwind@latest add input
```

## Usage

### size

```astro
---
import { Input } from "@/components/starwind/input";
---

<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />
```

### disabled

```astro
---
import { Input } from "@/components/starwind/input";
---

<Input disabled placeholder="Disabled input" />
<Input disabled value="Disabled with value" />
```

### with type

```astro
---
import { Input } from "@/components/starwind/input";
---

<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="file" />
```

## API Reference

### Input

A versatile input component with multiple sizes and states.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `type` | `string` | `"text"` |
| `class` | `string` | - |

```astro
<Input size="md" type="text" placeholder="Enter text" />
```

**Additional Notes:**
- This component accepts all HTML input attributes, such as `id`, `name`, `value`, etc.
