# Native Select Component

## Purpose and Usage

The Native Select component provides a browser-native HTML select element with styling and accessibility features. Use it for simple forms, mobile-first applications, or any situation where you need native select behavior and mobile picker integration.

## Components

### NativeSelect

The main select component that wraps the native HTML `<select>` element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the select size |
| `disabled` | `boolean` | `false` | When true, prevents all user interaction |
| `defaultValue` | `string` | - | The initial selected value |
| `name` | `string` | - | Name for the form element |
| `id` | `string` | - | Unique identifier for the element |
| `aria-invalid` | `boolean` | `false` | Shows validation and error states |
| `class` | `string` | - | Additional CSS classes for styling |

### NativeSelectOption

Represents an individual option within the select.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The value for this option |
| `disabled` | `boolean` | `false` | When true, this option cannot be selected |
| `selected` | `boolean` | `false` | When true, this option is initially selected |
| `class` | `string` | - | Additional CSS classes for styling |

### NativeSelectOptGroup

Groups related options together for better organization.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | Required | Screen reader label for the option group |
| `disabled` | `boolean` | `false` | When true, all options in this group are disabled |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Native Select
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

### With Groups
```astro
---
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "@/components/starwind/native-select";
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

### Disabled State
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

### Different Sizes
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

### RTL Support
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

### Form Integration
```astro
---
import { NativeSelect, NativeSelectOption } from "@/components/starwind/native-select";
---

<form>
  <NativeSelect name="framework" defaultValue="astro">
    <NativeSelectOption value="astro">Astro</NativeSelectOption>
    <NativeSelectOption value="next">Next.js</NativeSelectOption>
    <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
  </NativeSelect>
</form>
```

## Features

- **Native HTML select**: Full browser-native behavior and mobile picker integration
- **Multiple sizes**: Small, medium, large options
- **Option grouping**: NativeSelectOptGroup for organized option categories
- **Disabled state**: Can disable the entire select or specific options
- **RTL support**: Right-to-left language support
- **Form integration**: Works seamlessly with forms
- **Customizable styling**: Full CSS class support
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Icon slot**: Replace default chevron with custom content
- **Validation**: Built-in error and invalid state support

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys, Escape)
- Focus management for select states and options
- High contrast for visibility
- Semantic select structure for assistive technology
- Consider using appropriate option labels and descriptions
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use Native Select for mobile-first applications and native picker integration
- Use Select component for richer UI features like search and custom positioning
- Use meaningful option values and labels
- Consider using option groups for better organization
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful form names and labels
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and error states
- Test form validation and submission handling
