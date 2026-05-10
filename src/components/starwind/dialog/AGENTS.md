# Dialog Component

## Purpose and Usage

The Dialog component provides modal dialogs for displaying important information, forms, or interactive content that requires user attention. Use it for confirmations, forms, detailed information, or any situation where you need to interrupt the main user flow.

## Components

### Dialog

The root component that manages the dialog state and handles keyboard interactions.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Optional identifier for the dialog (required for external triggers) |
| `class` | `string` | - | Additional CSS classes for styling |

### DialogTrigger

The button that opens the dialog when clicked.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | When enabled, renders the child element instead of a button |
| `for` | `string` | - | ID of the dialog to trigger (used for external triggers) |
| `class` | `string` | - | Additional CSS classes for styling |

### DialogContent

The container that renders the actual modal dialog with animation effects.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animationDuration` | `number` | `200` | Open and close animation duration in milliseconds |
| `class` | `string` | - | Additional CSS classes for styling |

### DialogHeader

Container for dialog header content (title and description).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### DialogTitle

Component for rendering the dialog title.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### DialogDescription

Component for rendering the dialog description.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### DialogFooter

Container for dialog footer content (action buttons).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### DialogClose

Button that closes the dialog when clicked.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | When enabled, renders the child element instead of a button |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Dialog
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

### Form Dialog
```astro
---
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/starwind/dialog";
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
```

### Multiple Triggers
```astro
---
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/starwind/dialog";
import { Button } from "@/components/starwind/button";
---

<Dialog id="contact-us-dialog">
  <DialogTrigger asChild>
    <Button variant="outline">Contact Us</Button>
  </DialogTrigger>
  <DialogContent class="sm:max-w-[450px]">
    <!-- Contact form content -->
  </DialogContent>
</Dialog>

<!-- External trigger -->
<DialogTrigger for="contact-us-dialog" class="mt-2" asChild>
  <Button variant="primary">Contact Us (External)</Button>
</DialogTrigger>
```

### Nested Dialogs
```astro
---
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/starwind/dialog";
import { Button } from "@/components/starwind/button";
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

## Features

- **Modal overlay**: Blocks interaction with background content
- **Keyboard navigation**: Full keyboard support (Escape, Tab navigation)
- **Multiple triggers**: Support for internal and external triggers
- **Nested dialogs**: Multi-level dialog support
- **Form integration**: Works seamlessly with forms
- **Customizable animations**: Configurable open/close animation duration
- **Responsive design**: Adapts to different screen sizes
- **Accessibility**: ARIA-compliant with proper focus management

## Accessibility Notes

- Includes proper ARIA attributes (role="dialog", aria-modal="true")
- Focus management prevents background interaction
- Keyboard navigation support (Escape to close, Tab to navigate)
- Screen reader announcements for dialog state changes
- Semantic HTML structure for assistive technology
- Focus trapping within modal content
- Consider using appropriate heading hierarchy

## Best Practices

- Use semantic heading structure (DialogTitle, DialogDescription)
- Provide clear cancel and action buttons
- Consider form validation and error handling
- Use appropriate dialog sizes for content
- Test keyboard navigation thoroughly
- Ensure focus management works correctly
- Consider mobile touch interactions
- Use external triggers when needed for multiple trigger points
- Test with screen readers for proper accessibility
