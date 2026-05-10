# Select Component

## Purpose and Usage

The Select component provides a styled dropdown with rich features like search, custom positioning, and advanced interaction patterns. Use it for complex form controls, searchable lists, or any situation where you need more than basic select functionality.

## Components

### Select

The root component that manages the select state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier for the element |
| `name` | `string` | - | Name attribute for form handling |
| `defaultValue` | `string` | - | The initial selected value |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectTrigger

The button that toggles the select dropdown.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the button size |
| `required` | `boolean` | `false` | Whether the select is required |
| `disabled` | `boolean` | `false` | When true, prevents all user interaction |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectContent

The dropdown content that appears when the select is open.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Determines the content size |
| `side` | `"top" \| "bottom"` | `"bottom"` | Side of the dropdown relative to the trigger |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment of the dropdown relative to the trigger |
| `sideOffset` | `number` | `4` | Offset distance in pixels from the trigger |
| `animationDuration` | `number` | `150` | Open and close animation duration in milliseconds |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectItem

An item that can be selected. Requires a `value` prop.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | The value for this select option |
| `disabled` | `boolean` | `false` | When true, this option cannot be selected |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectValue

The component that displays the selected value or placeholder text in the trigger.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"select"` | Text to display when no option is selected |
| `class` | `string` | - | Additional CSS classes for styling |

### SelectGroup

A component used to group related select items together.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### SelectLabel

A label component used to give a title to a group of items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### SelectSeparator

A visual separator that can be used between select items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### SelectSearch

A search input component that filters select items in real-time, creating a combobox pattern.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Search..."` | Placeholder text for the search input |
| `emptyText` | `string` | `"No results found."` | Text to display when no items match the search |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Select
```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/starwind/select";
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

### Different Sizes
```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/starwind/select";
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

### With Position Control
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

### Disabled State
```astro
---
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/starwind/select";
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

### With Search (Combobox)
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
  <Select id="select-programatic-control" name="options">
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
              // selectId: "select-programatic-control", // This is the id attribute of the select
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

### Form Integration
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

## Features

- **Rich dropdown**: Custom popover with advanced positioning and animations
- **Search functionality**: Built-in SelectSearch for real-time filtering
- **Multiple sizes**: Small, medium, large options for trigger and content
- **Position control**: Side, alignment, and offset customization
- **Form integration**: Seamless form handling with hidden select elements
- **Grouping support**: Organize options with SelectGroup and SelectLabel
- **Accessibility**: Full ARIA support and keyboard navigation
- **Customizable styling**: Full CSS class support for all components
- **Programmatic control**: Custom events for JavaScript integration
- **Visual separators**: SelectSeparator for better organization
- **Animation control**: Configurable open/close animation duration

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys, Escape)
- Focus management for select states and dropdown content
- High contrast for visibility
- Semantic select structure for assistive technology
- Consider using appropriate labels and descriptions
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use Select for complex interactions and search functionality
- Use NativeSelect for simple mobile-first applications
- Use meaningful option values and labels
- Consider using option groups for better organization
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful form names and labels
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and selection states
- Test form validation and submission handling
- Use appropriate positioning for your layout context
