# Combobox Component

## Purpose and Usage

The Combobox component provides a searchable select input with filtering capabilities. Use it for autocomplete, searchable dropdowns, or any situation where users need to select from a list of options.

## Components

### Combobox

The root component that manages the combobox state and behavior.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | Unique identifier for the element |
| `name` | `string` | - | Name for the form element |
| `disabled` | `boolean` | `false` | When true, the combobox cannot be interacted with |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectSearch

The search input component within the combobox.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text displayed when input is empty |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectTrigger

The button that toggles the combobox dropdown.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | When true, renders child element as trigger while preserving combobox behavior |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectContent

The container that holds the combobox dropdown content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### SelectItem

An individual option within the combobox.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | The value for this option |
| `disabled` | `boolean` | `false` | When true, this option cannot be selected |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectValue

The element that displays the selected value.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Text displayed when no value is selected |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Combobox
```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectSearch, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select id="combobox-demo" name="framework">
  <SelectTrigger class="w-[240px]">
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectSearch placeholder="Search frameworks..." emptyText="No frameworks found." />
    <SelectGroup>
      <SelectItem value="astro">Astro</SelectItem>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="svelte">SvelteKit</SelectItem>
      <SelectItem value="solid">SolidStart</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
      <SelectItem value="nuxt">Nuxt</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Custom Styling
```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectSearch, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select id="styled-combobox" name="framework" class="border-2 rounded-lg">
  <SelectTrigger class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent class="border-blue-200 bg-white">
    <SelectSearch placeholder="Search frameworks..." class="border-blue-300" />
    <SelectGroup>
      <SelectItem value="astro" class="text-blue-600">Astro</SelectItem>
      <SelectItem value="next" class="text-blue-600">Next.js</SelectItem>
      <SelectItem value="svelte" class="text-blue-600">SvelteKit</SelectItem>
      <SelectItem value="solid" class="text-blue-600">SolidStart</SelectItem>
      <SelectItem value="remix" class="text-blue-600">Remix</SelectItem>
      <SelectItem value="nuxt" class="text-blue-600">Nuxt</SelectItem>
      <SelectItem value="angular" class="text-blue-600">Angular</SelectItem>
      <SelectItem value="vue" class="text-blue-600">Vue</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Disabled State
```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectSearch, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select id="disabled-combobox" name="framework" disabled>
  <SelectTrigger class="opacity-50 cursor-not-allowed">
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectSearch placeholder="Search frameworks..." disabled />
    <SelectGroup>
      <SelectItem value="astro" disabled>Astro</SelectItem>
      <SelectItem value="next" disabled>Next.js</SelectItem>
      <SelectItem value="svelte" disabled>SvelteKit</SelectItem>
      <SelectItem value="solid" disabled>SolidStart</SelectItem>
      <SelectItem value="remix" disabled>Remix</SelectItem>
      <SelectItem value="nuxt" disabled>Nuxt</SelectItem>
      <SelectItem value="angular" disabled>Angular</SelectItem>
      <SelectItem value="vue" disabled>Vue</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Features

- **Search functionality**: Built-in search with filtering and highlighting
- **Keyboard accessible**: Full keyboard navigation (Tab, Enter, Space, Arrow keys)
- **Customizable styling**: Full CSS class support
- **Disabled state**: Can disable the entire combobox
- **Filtering**: Automatic filtering of options based on search input
- **Empty state**: Custom empty state when no options match
- **High contrast**: Accessible color schemes
- **Touch friendly**: Optimized for mobile interactions

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys, Escape to close)
- Focus management for search and selection states
- High contrast for visibility
- Search functionality with proper announcements
- Consider using appropriate labels and descriptions
- Test with screen readers for proper behavior

## Best Practices

- Use meaningful option values and labels
- Provide helpful placeholder text and empty state messages
- Consider using appropriate disabled states
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for all states
- Use semantic option grouping with SelectGroup
- Consider mobile touch interactions
- Test with assistive technology for proper accessibility
- Use appropriate form association with id and name attributes
