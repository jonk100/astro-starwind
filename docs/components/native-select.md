# Native Select

```astro
---
import { NativeSelect, NativeSelectOption } from "@/components/starwind/native-select";
---

<NativeSelect class="w-[240px]" defaultValue="">
  <NativeSelectOption value="" disabled>Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>
```

> **Info:** For a styled select component, see the [Select](/docs/components/select/) component.

## Installation

```bash
npx starwind@latest add native-select
```

## Usage

### Groups

Use `NativeSelectOptGroup` to organize options into categories.

```astro
---
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/starwind/native-select";
---

<NativeSelect class="w-[260px]" defaultValue="">
  <NativeSelectOption value="" disabled>Select an option</NativeSelectOption>
  <NativeSelectOptGroup label="Fruits">
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
  </NativeSelectOptGroup>
  <NativeSelectOptGroup label="Vegetables">
    <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
    <NativeSelectOption value="spinach">Spinach</NativeSelectOption>
  </NativeSelectOptGroup>
</NativeSelect>
```

### Disabled

Add the `disabled` prop to disable the entire select, or disable specific options.

```astro
---
import { NativeSelect, NativeSelectOption } from "@/components/starwind/native-select";
---

<NativeSelect class="w-[220px]" disabled defaultValue="">
  <NativeSelectOption value="" disabled>Select framework</NativeSelectOption>
  <NativeSelectOption value="astro">Astro</NativeSelectOption>
  <NativeSelectOption value="next">Next.js</NativeSelectOption>
  <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
</NativeSelect>

<NativeSelect class="w-[220px]" defaultValue="astro">
  <NativeSelectOption value="astro">Astro</NativeSelectOption>
  <NativeSelectOption value="next" disabled>Next.js (Disabled)</NativeSelectOption>
  <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
</NativeSelect>
```

### Invalid

Use `aria-invalid` to show validation and error states.

```astro
---
import { Label } from "@/components/starwind/label";
import { NativeSelect, NativeSelectOption } from "@/components/starwind/native-select";
---

<div class="grid w-full max-w-sm gap-2">
  <Label for="native-select-invalid">Framework</Label>
  <NativeSelect id="native-select-invalid" class="w-full" aria-invalid defaultValue="">
    <NativeSelectOption value="" disabled>Select a framework</NativeSelectOption>
    <NativeSelectOption value="astro">Astro</NativeSelectOption>
    <NativeSelectOption value="next">Next.js</NativeSelectOption>
    <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
  </NativeSelect>
  <p class="text-error text-sm">Please select a framework.</p>
</div>
```

### Size

Use the `size` prop to render compact or larger controls.

```astro
---
import { NativeSelect, NativeSelectOption } from "@/components/starwind/native-select";
---

<NativeSelect size="sm" class="w-[180px]" defaultValue="">
  <NativeSelectOption value="" disabled>Small</NativeSelectOption>
  <NativeSelectOption value="one">Option 1</NativeSelectOption>
  <NativeSelectOption value="two">Option 2</NativeSelectOption>
</NativeSelect>

<NativeSelect size="md" class="w-[180px]" defaultValue="">
  <NativeSelectOption value="" disabled>Medium</NativeSelectOption>
  <NativeSelectOption value="one">Option 1</NativeSelectOption>
  <NativeSelectOption value="two">Option 2</NativeSelectOption>
</NativeSelect>

<NativeSelect size="lg" class="w-[180px]" defaultValue="">
  <NativeSelectOption value="" disabled>Large</NativeSelectOption>
  <NativeSelectOption value="one">Option 1</NativeSelectOption>
  <NativeSelectOption value="two">Option 2</NativeSelectOption>
</NativeSelect>
```

### RTL

Set `dir="rtl"` to support right-to-left languages.

```astro
---
import { NativeSelect, NativeSelectOption } from "@/components/starwind/native-select";
---

<div dir="rtl">
  <NativeSelect class="w-[240px]" defaultValue="">
    <NativeSelectOption value="" disabled>Select a fruit</NativeSelectOption>
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
    <NativeSelectOption value="grape">Grape</NativeSelectOption>
  </NativeSelect>
</div>
```

### Native Select vs Select

Use [Native Select](/docs/components/native-select/) for simple forms when you want browser-native behavior and mobile pickers. Use [Select](/docs/components/select/) when you need richer UI features like searchable options, custom popover positioning, and advanced interaction patterns.

> **Tip:** Prefer `NativeSelect` for straightforward form controls and mobile-first flows where native platform pickers are beneficial. Choose [Select](/docs/components/select/) when you need richer UI features like searchable options, custom popover positioning, and advanced interaction patterns.

## API Reference

### NativeSelect

The main select component that wraps the native HTML `<select>` element.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `disabled` | `boolean` | `false` |
| `defaultValue` | `string` | - |
| `name` | `string` | - |
| `id` | `string` | - |
| `aria-invalid` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<NativeSelect name="framework" defaultValue="astro">
  <NativeSelectOption value="astro">Astro</NativeSelectOption>
  <NativeSelectOption value="next">Next.js</NativeSelectOption>
</NativeSelect>
```

**Additional Notes:**
- This component accepts all native `<select>` attributes.
- Use the named `icon` slot to replace the default chevron icon.

### NativeSelectOption

Represents an individual option within the select.

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | - |
| `disabled` | `boolean` | `false` |
| `selected` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<NativeSelectOption value="apple">Apple</NativeSelectOption>
```

### NativeSelectOptGroup

Groups related options together for better organization.

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | Required |
| `disabled` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<NativeSelectOptGroup label="Fruits">
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
</NativeSelectOptGroup>
```
