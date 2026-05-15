---
title: Dialog
---

# Dialog

```astro
---
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/starwind/dialog";
import { Button } from "@/components/starwind/button";
---

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Example Dialog</DialogTitle>
      <DialogDescription>
        This is a simple dialog example that demonstrates basic functionality.
      </DialogDescription>
    </DialogHeader>
    <div class="py-4">Your dialog content goes here.</div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Installation

```bash
npx starwind@latest add dialog
```

## Usage

### General Notes

All you really need is the `Dialog`, `DialogTrigger`, and `DialogContent`. The rest is up to you. As examples, the search feature and mobile navbar of this site are built on top of the Dialog component.

### With Form

Dialogs are commonly used with forms for data input.

> **Tip:** Open up the dev tools console to see the form data on submission.

```astro
---
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/starwind/dialog";
import { Input } from "@/components/starwind/input";
import { Label } from "@/components/starwind/label";
import { Button } from "@/components/starwind/button";
---

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent class="sm:max-w-[450px]" animationDuration={200}>
    <form id="edit-profile-form" method="dialog" class="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name-edit" class="text-right"> Name </Label>
          <Input id="name-edit" name="name" placeholder="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> Username </Label>
          <Input id="username" name="username" placeholder="@peduarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

<script>
  function handleFormSubmit() {
    const form = document.querySelector("#edit-profile-form") as HTMLFormElement;

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

### Multiple Triggers

You can have multiple triggers open the same dialog, including external triggers (triggers outside the Dialog wrapper). To use external triggers, you need to add an `id` prop to the `<Dialog />` component and pass the matching ID to the `for` prop of any extra `<DialogTrigger />` elements you want to open the same dialog.

```astro
---
import { Button } from "@/components/starwind/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/starwind/dialog";
import { Input } from "@/components/starwind/input";
import { Label } from "@/components/starwind/label";
import { Textarea } from "@/components/starwind/textarea";
---

<Dialog id="contact-us-dialog">
  <DialogTrigger asChild>
    <Button variant="outline">Contact Us</Button>
  </DialogTrigger>
  <DialogContent class="sm:max-w-[450px]">
    <form id="contact-form" method="dialog" class="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogDescription>
          Send us a message and we'll get back to you shortly.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-6 py-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="your@email.com" />
        </div>
        <div class="grid gap-2">
          <Label for="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="How can we help?" />
        </div>
        <div class="grid gap-2">
          <Label for="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us what you need..."
            class="min-h-[80px]"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Send Message</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

<!-- External trigger that opens the same dialog -->
<div class="mt-8">
  <p class="text-muted-foreground mb-2 text-sm">
    This button is outside the Dialog component but opens the same dialog:
  </p>
  <DialogTrigger for="contact-us-dialog" class="mt-2" asChild>
    <Button variant="primary">Contact Us (External)</Button>
  </DialogTrigger>
</div>

<script>
  const setupForm = () => {
    const form = document.getElementById("contact-form") as HTMLFormElement;
    if (!form) return;

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
  };

  setupForm();

  document.addEventListener("astro:after-swap", setupForm);
</script>
```

### Nested Dialogs

You can nest dialogs within other dialogs to create multi-level workflows. The nested dialog will appear on top of the parent dialog, and only the topmost dialog will close when pressing Escape or clicking outside.

```astro
---
import { Button } from "@/components/starwind/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/starwind/dialog";
---

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Parent Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Parent Dialog</DialogTitle>
      <DialogDescription>
        This is the parent dialog. You can open a nested dialog from here.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter class="mt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button class="w-full sm:w-auto">Open Nested</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nested Dialog</DialogTitle>
            <DialogDescription>
              This is a nested dialog. The parent will not close when clicking outside.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter class="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close Nested</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DialogClose asChild>
        <Button variant="outline" class="w-full sm:w-auto">Close Parent</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## API Reference

### Dialog API

The root component that serves as a container for all dialog-related components. It manages the state of the dialog and handles keyboard interactions.

| Prop    | Type     | Default |
|---------|----------|---------|
| `id`    | `string` | -       |
| `class` | `string` | -       |

```astro
<Dialog>
  <!-- Dialog components -->
</Dialog>
```

**Additional Notes:**

- `id`: Optional identifier for the dialog. Required when using external triggers with the `for` prop

### DialogTrigger

The button that opens the dialog. When clicked, it shows the dialog content.

| Prop      | Type      | Default |
|-----------|-----------|---------|
| `asChild` | `boolean` | `false` |
| `for`     | `string`  | -       |
| `class`   | `string`  | -       |

```astro
<DialogTrigger asChild>
  <Button>Open Dialog</Button>
</DialogTrigger>
```

**Additional Notes:**

- `asChild`: When enabled, renders the child element instead of a button
- `for`: ID of the dialog to trigger. Used for external triggers outside the Dialog component

### DialogContent

The container for dialog content. This component renders the actual modal dialog with animation effects.

| Prop                | Type     | Default |
|---------------------|----------|---------|
| `animationDuration` | `number` | `200`   |
| `class`             | `string` | -       |

```astro
<DialogContent animationDuration={300}>
  <!-- Dialog content -->
</DialogContent>
```

**Additional Notes:**

- `animationDuration`: Open and close animation duration in milliseconds

### DialogHeader

A container for dialog header content, typically containing a title and description.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<DialogHeader>
  <DialogTitle>Title</DialogTitle>
  <DialogDescription>Description</DialogDescription>
</DialogHeader>
```

### DialogFooter

A container for dialog footer content, typically containing action buttons.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<DialogFooter>
  <DialogClose asChild>
    <Button variant="outline">Cancel</Button>
  </DialogClose>
  <Button>Save</Button>
</DialogFooter>
```

### DialogTitle

A component for rendering the dialog title with appropriate styling.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<DialogTitle>Dialog Title</DialogTitle>
```

### DialogDescription

A component for rendering the dialog description with appropriate styling.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<DialogDescription>Dialog description text.</DialogDescription>
```

### DialogClose

A button that closes the dialog when clicked.

| Prop      | Type      | Default |
|-----------|-----------|---------|
| `asChild` | `boolean` | `false` |
| `class`   | `string`  | -       |

```astro
<DialogClose asChild>
  <Button variant="outline">Cancel</Button>
</DialogClose>
```

**Additional Notes:**

- `asChild`: When enabled, renders the child element instead of a button
