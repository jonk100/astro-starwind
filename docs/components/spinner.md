# Spinner

```astro
---
import { Spinner } from "@/components/starwind/spinner";
---

<Spinner />
```

## Installation

```bash
npx starwind@latest add spinner
```

## Usage

### Custom Size

```astro
---
import { Spinner } from "@/components/starwind/spinner";
---

<Spinner class="size-4" />
<Spinner class="size-6" />
<Spinner class="size-8" />
<Spinner class="size-12" />
```

### Custom Color

```astro
---
import { Spinner } from "@/components/starwind/spinner";
---

<Spinner class="text-blue-500" />
<Spinner class="text-green-500" />
<Spinner class="text-red-500" />
<Spinner class="text-purple-500" />
```

### In Button

```astro
---
import { Spinner } from "@/components/starwind/spinner";
import { Button } from "@/components/starwind/button";
---

<Button disabled>
  <Spinner />
  Loading...
</Button>
```

## API Reference

### Spinner

An accessible loading spinner component with customizable styling.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<Spinner class="size-6 text-primary" />
```

**Additional Notes:**
- Use Tailwind classes to control size with `size-*` utilities
- Use Tailwind color classes to change spinner color
