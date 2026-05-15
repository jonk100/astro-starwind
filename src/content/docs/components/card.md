---
title: Card
---

# Card

```astro
---
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/starwind/card";
import { Button } from "@/components/starwind/button";
import { Input } from "@/components/starwind/input";
import { Label } from "@/components/starwind/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator, } from "@/components/starwind/select";
---

<Card class="w-[360px]" slot="preview">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent class="flex flex-col gap-4">
    <div class="flex w-full flex-col gap-2">
      <Label for="name">Name</Label>
      <Input type="text" id="name" placeholder="Name of your project" />
    </div>
    <div class="flex w-full flex-col gap-2">
      <Label for="framework">Framework</Label>
      <Select id="framework">
        <SelectTrigger class="w-full" required>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent class="w-full">
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
  <CardFooter class="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button type="submit">Deploy</Button>
  </CardFooter>
</Card>
```

## Installation

```bash
npx starwind@latest add card
```

## Usage

### Form Submission

You can easily add a standard html form submission to your card. Here is a full example with the javascript submission code.

> **Tip:** Open up your browser's dev tools and view the console to see the form data.

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
  SelectTrigger,
  SelectValue,
} from "@/components/starwind/select";
---

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
        <!-- <InputFeedback>This is a required field</InputFeedback> -->
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
              <SelectItem value="svelte">SvelteKit</SelectItem>
              <SelectItem value="solid">SolidStart</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
    <CardFooter class="mt-6 flex justify-between">
      <Button type="button" variant="outline">Cancel</Button>
      <Button type="submit">Deploy</Button>
    </CardFooter>
  </form>
</Card>

<script>
  const setupForm = () => {
    const form = document.getElementById("create-project-form") as HTMLFormElement;
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Log all form inputs
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

### Size

Use the `size="sm"` prop to set the size of the card to small. The small size variant uses smaller spacing.

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
---

<Card size="sm" class="mx-auto w-full max-w-sm">
  <CardHeader>
    <CardTitle>Small Card</CardTitle>
    <CardDescription>This card uses the small size variant.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>
      The card component supports a size prop that can be set to "sm" for a more compact
      appearance.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" class="w-full">Action</Button>
  </CardFooter>
</Card>
```

### Image

Add an image before the card header to create a card with an image. Use the `CardAction` component to position a badge or other action in the header.

```astro
---
import { Button } from "@/components/starwind/button";
import { Badge } from "@/components/starwind/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/starwind/card";
---

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

## API Reference

### Card API Reference

The root component that serves as a container for card content.

| Prop    | Type                | Default     |
|---------|---------------------|-------------|
| `size`  | `"default" \| "sm"` | `"default"` |
| `class` | `string`            | -           |

```astro
<Card size="default">
  <!-- Card content -->
</Card>
```

**Additional Notes:**

- `size`: Controls the overall spacing and text size. Use `"sm"` for a more compact appearance.

### CardHeader API Reference

A container for card header content, typically containing the title and description.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<CardHeader>
  <CardTitle>Title</CardTitle>
  <CardDescription>Description</CardDescription>
</CardHeader>
```

### CardTitle

A component for rendering the card title with appropriate font styling.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<CardTitle>Create project</CardTitle>
```

### CardDescription

A component for rendering the card description with muted colors and appropriate text styling.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<CardDescription>Deploy your new project in one-click.</CardDescription>
```

### CardContent

A container for the main content of the card.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<CardContent>
  <!-- Main card content -->
</CardContent>
```

### CardFooter

A container for card footer content, typically containing action buttons.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<CardFooter>
  <Button>Action</Button>
</CardFooter>
```

### CardAction

A component for positioning actions (like badges or buttons) in the card header. Designed to be placed inside `CardHeader`.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<CardHeader>
  <CardAction>
    <Badge>Featured</Badge>
  </CardAction>
  <CardTitle>Title</CardTitle>
</CardHeader>
```
