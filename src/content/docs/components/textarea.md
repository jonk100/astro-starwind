---
title: Textarea
---

# Textarea

```astro
---
import { Textarea } from "@/components/starwind/textarea";
---

<Textarea placeholder="Type something..." />
```

## Installation

```bash
npx starwind@latest add textarea
```

## Usage

### size

```astro
---
import { Textarea } from "@/components/starwind/textarea";
---

<Textarea size="sm" placeholder="Small textarea" />
<Textarea size="md" placeholder="Medium textarea" />
<Textarea size="lg" placeholder="Large textarea" />
```

### disabled

```astro
---
import { Textarea } from "@/components/starwind/textarea";
---

<Textarea disabled placeholder="Disabled textarea" />
```

## API Reference

### Textarea

A versatile textarea component with multiple sizes and states.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `class` | `string` | - |

```astro
<Textarea size="md" placeholder="Type something..." />
```

**Additional Notes:**
- This component accepts all standard HTML `<textarea>` attributes
