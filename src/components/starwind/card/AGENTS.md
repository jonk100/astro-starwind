# Card Component Quick Reference

## Overview
A flexible container component for grouping related content with optional header, footer, and action sections. Perfect for forms, product displays, and content cards.

## Installation
```bash
npx starwind@latest add card
```

## Import Pattern
```astro
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/starwind/card";
```

## Core Components & Props

### Card (Root Container)
- `size` ("default" | "sm", default: "default") - Controls overall spacing and text size
- `class` (string) - Custom styling

### CardHeader
- `class` (string) - Custom styling for header section

### CardTitle
- `class` (string) - Custom styling for title text

### CardDescription
- `class` (string) - Custom styling for description text

### CardContent
- `class` (string) - Custom styling for main content area

### CardFooter
- `class` (string) - Custom styling for footer section

### CardAction
- `class` (string) - Custom styling for action elements in header

## Common Usage Patterns

### Basic Card Layout
```astro
<Card class="w-[360px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent class="flex flex-col gap-4">
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter class="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </CardFooter>
</Card>
```

### Form Integration
```astro
<Card class="w-[360px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <form id="create-project-form">
    <CardContent class="flex flex-col gap-4">
      <div class="flex w-full flex-col gap-2">
        <Label for="name">Name</Label>
        <Input type="text" id="name" placeholder="Name of your project" required />
      </div>
      <div class="flex w-full flex-col gap-2">
        <Label for="framework">Framework</Label>
        <Select id="framework" required>
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frameworks</SelectLabel>
              <SelectItem value="astro">Astro</SelectItem>
              <SelectItem value="next">Next.js</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button type="button" variant="outline">Cancel</Button>
      <Button type="submit">Deploy</Button>
    </CardFooter>
  </form>
</Card>
```

### Small Size Variant
```astro
<Card size="sm" class="mx-auto w-full max-w-sm">
  <CardHeader>
    <CardTitle>Small Card</CardTitle>
    <CardDescription>Compact appearance with smaller spacing.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content with reduced spacing and text size.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" class="w-full">Action</Button>
  </CardFooter>
</Card>
```

### Card with Image and Action
```astro
<Card class="relative mx-auto w-full max-w-sm">
  <img
    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
    alt="Event cover"
    class="aspect-video w-full object-cover"
  />
  <CardHeader>
    <CardAction>
      <Badge size="sm" variant="primary">Featured</Badge>
    </CardAction>
    <CardTitle>Design systems meetup</CardTitle>
    <CardDescription>
      A practical talk on component APIs, accessibility, and shipping faster.
    </CardDescription>
  </CardHeader>
  <CardFooter>
    <Button class="w-full">View Event</Button>
  </CardFooter>
</Card>
```

## Key Features
- **Modular Structure**: Separate components for each card section
- **Size Variants**: Default and small sizes for different use cases
- **Form Integration**: Works seamlessly with HTML forms
- **Action Support**: CardAction component for header actions
- **Flexible Layout**: Customizable with Tailwind classes
- **Responsive Design**: Adapts to different screen sizes

## Best Practices
- Use `CardHeader` for title and description
- Place `CardAction` inside `CardHeader` for badges/buttons
- Use `CardContent` for main content area
- Reserve `CardFooter` for action buttons
- Consider `size="sm"` for compact interfaces
- Add forms inside `CardContent` for form-based cards
- Use semantic HTML with proper labels and accessibility

## Form Submission Pattern
```javascript
<script>
  const setupForm = () => {
    const form = document.getElementById("create-project-form") as HTMLFormElement;
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Handle form data
      console.log("Form submission data:", {
        name: (form.querySelector("#name") as HTMLInputElement)?.value,
        framework: (form.querySelector("#framework select") as HTMLSelectElement)?.value,
      });
    });
  };

  setupForm();
  document.addEventListener("astro:after-swap", setupForm);
</script>
```

## Documentation
For detailed examples and advanced usage, see the [complete Card documentation](../../../docs/components/card.md).

---
