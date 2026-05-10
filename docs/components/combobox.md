# Combobox

A combobox is a searchable select component that allows users to filter through options by typing in the search input field.

> **Info:** The Combobox is built using the [Select](/docs/components/select) component with a `SelectSearch` sub-component. For full API documentation see the [Select component page](/docs/components/select).

## Example

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

## Installation

```bash
npx starwind@latest add select
```
