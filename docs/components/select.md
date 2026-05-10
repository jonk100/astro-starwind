# Select

```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Frameworks</SelectLabel>
      <SelectItem value="astro">Astro</SelectItem>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="svelte">SvelteKit</SelectItem>
      <SelectItem value="solid">SolidStart</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Installation

```bash
npx starwind@latest add select
```

## Usage

### size

You can control the size of the select trigger and content using the `size` prop. Available sizes are `"sm"`, `"md"` (default), and `"lg"`.

```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select>
  <SelectTrigger size="sm" class="w-[180px]">
    <SelectValue placeholder="Small select" />
  </SelectTrigger>
  <SelectContent size="sm">
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
  </SelectContent>
</Select>

<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Default select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
  </SelectContent>
</Select>

<Select>
  <SelectTrigger size="lg" class="w-[180px]">
    <SelectValue placeholder="Large select" />
  </SelectTrigger>
  <SelectContent size="lg">
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### side, align, and sideOffset

You can control the position of the select dropdown using the `side`, `align` and `sideOffset` props on `SelectContent`.

```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Opens above" />
  </SelectTrigger>
  <SelectContent side="top" align="center" sideOffset={12}>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
  </SelectContent>
</Select>

<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Opens below" />
  </SelectTrigger>
  <SelectContent side="bottom" align="end" sideOffset={4}>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### disabled

You can disable the select trigger or individual items.

```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select>
  <SelectTrigger disabled class="w-[180px]">
    <SelectValue placeholder="Disabled trigger" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>

<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="With disabled items" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2" disabled>Option 2 (Disabled)</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
    <SelectItem value="4" disabled>Option 4 (Disabled)</SelectItem>
    <SelectItem value="5">Option 5</SelectItem>
  </SelectContent>
</Select>
```

### Form Handling

This component mirrors the behavior of a standard HTML select element. Internally, it renders a hidden `<select>` to integrate seamlessly with forms.

> **Tip:** Open up the dev tools console to see the form data on submission.

```astro
---
import { Button } from "@/components/starwind/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/starwind/card";
import { Input } from "@/components/starwind/input";
import { Label } from "@/components/starwind/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/starwind/select";
---

<Card class="w-[400px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <form id="create-project-form">
    <CardContent class="flex flex-col gap-4">
      <div class="flex w-full flex-col gap-2">
        <Label for="name">Name</Label>
        <Input type="text" id="name" name="name" placeholder="Name of your project" />
      </div>
      <div class="flex w-full flex-col gap-2">
        <Label for="framework">Framework</Label>
        <Select required id="framework" name="framework">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frameworks</SelectLabel>
              <SelectItem value="astro">Astro</SelectItem>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="svelte">SvelteKit</SelectItem>
              <SelectItem value="solid">SolidStart</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
    <CardFooter class="mt-6 flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button type="submit">Deploy</Button>
    </CardFooter>
  </form>
</Card>

<script>
  function handleFormSubmit() {
    const form = document.querySelector("#create-project-form") as HTMLFormElement;
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());

        // demo form data logging
        console.log("Form submission values:", formValues);

        // You can add additional logic here like:
        // - Form validation
        // - API submission
        // - Success/error handling
      });
    }
  }

  handleFormSubmit();

  document.addEventListener("astro:after-swap", handleFormSubmit);
</script>
```

### With Search (Combobox)

Add a search input to filter through select options, creating a combobox pattern. The `SelectSearch` component provides built-in filtering functionality.

```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectSearch, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select id="select-demo-framework" name="framework">
  <SelectTrigger class="w-[240px]" required>
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectSearch placeholder="Search frameworks..." emptyText="No frameworks found." />
    <SelectGroup>
      <SelectLabel>Frameworks</SelectLabel>
      <SelectItem value="astro">Astro</SelectItem>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="svelte">SvelteKit</SelectItem>
      <SelectItem value="solid">SolidStart</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### With Groups and Labels

Group related items together and add labels for better organization.

```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/starwind/select";
---

<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select a food" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="grape">Grape</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="spinach">Spinach</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Programmatic Control

You can programmatically select an option by dispatching a custom `SelectEvent` with the `value` property set to the desired option's value. You also need to pass either a `name` or `id` of the select element to the event.

```astro
---
import { Button } from "@/components/starwind/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/starwind/select";
---

<div class="flex w-full max-w-[400px] flex-col gap-4">
  <Select id="select-programmatic-control" name="options">
    <SelectTrigger class="w-full" required>
      <SelectValue placeholder="Select" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Options</SelectLabel>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
        <SelectItem value="3">Option 3</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>

  <Button variant="primary" id="select-option-1-btn">Programmatically Select "option 1"</Button>
</div>

<script>
  function setupProgrammaticSelectDemo() {
    const selectOption1Btn = document.querySelector("#select-option-1-btn");
    if (selectOption1Btn) {
      selectOption1Btn.addEventListener("click", () => {
        // Dispatches custom event to programmatically select 'option 1'
        document.dispatchEvent(
          new CustomEvent("starwind-select:select", {
            detail: {
              // You can use either the name or id of the select
              selectName: "options", // This is the name attribute of the select
              // selectId: "select-programmatic-control", // This is the id attribute of the select
              value: "1",
            },
          }),
        );

        console.log("Dispatched event to select option 1");
      });
    }
  }

  setupProgrammaticSelectDemo();

  document.addEventListener("astro:after-swap", () => {
    setupProgrammaticSelectDemo();
  });
</script>
```

### Change Event Handling

The select component emits a `starwind-select:change` event when a selection is made. The selected value can be accessed through `event.detail.value`.

```astro
<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
  </SelectContent>
</Select>

<script>
  document.querySelector('.starwind-select')?.addEventListener('starwind-select:change', (event) => {
    console.log('Selected value:', event.detail.value);
  });
</script>
```

## API Reference

### Select

The root component that manages the select state.

| Prop | Type | Default |
|------|------|---------|
| `id` | `string` | - |
| `name` | `string` | - |
| `defaultValue` | `string` | - |
| `class` | `string` | - |

```astro
<Select name="framework">
  <!-- Select components -->
</Select>
```

**Additional Notes:**
- `name`: Name attribute for form handling

### SelectTrigger

The button that toggles the select dropdown.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `required` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<SelectTrigger class="w-[180px]">
  <SelectValue placeholder="Select" />
</SelectTrigger>
```

### SelectContent

The dropdown content that appears when the select is open.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `side` | `"top" \| "bottom"` | `"bottom"` |
| `align` | `"start" \| "center" \| "end"` | `"start"` |
| `sideOffset` | `number` | `4` |
| `animationDuration` | `number` | `150` |
| `class` | `string` | - |

```astro
<SelectContent>
  <!-- Select items -->
</SelectContent>
```

**Additional Notes:**
- `side`: Side of the dropdown relative to the trigger
- `align`: Alignment of the dropdown relative to the trigger
- `sideOffset`: Offset distance in pixels from the trigger
- `animationDuration`: Open and close animation duration in milliseconds

### SelectItem

An item that can be selected. Requires a `value` prop.

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | Required |
| `disabled` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<SelectItem value="astro">Astro</SelectItem>
```

### SelectValue

The component that displays the selected value or placeholder text in the trigger.

| Prop | Type | Default |
|------|------|---------|
| `placeholder` | `string` | `"select"` |
| `class` | `string` | - |

```astro
<SelectValue placeholder="Select a framework" />
```

### SelectGroup

A component used to group related select items together.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<SelectGroup>
  <SelectLabel>Frameworks</SelectLabel>
  <!-- Select items -->
</SelectGroup>
```

### SelectLabel

A label component used to give a title to a group of items.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<SelectLabel>Frameworks</SelectLabel>
```

### SelectSeparator

A visual separator that can be used between select items.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<SelectSeparator />
```

### SelectSearch

A search input component that filters select items in real-time, creating a combobox pattern.

| Prop | Type | Default |
|------|------|---------|
| `placeholder` | `string` | `"Search..."` |
| `emptyText` | `string` | `"No results found."` |
| `class` | `string` | - |

```astro
<SelectSearch placeholder="Search frameworks..." />
```

**Additional Notes:**
- Place inside `SelectContent` before the items you want to filter
- `emptyText`: Text to display when no items match the search
