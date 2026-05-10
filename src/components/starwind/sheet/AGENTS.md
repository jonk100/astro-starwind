# Sheet Component

## Purpose and Usage

The Sheet component provides slide-out panels that extend from any edge of the screen. Use it for forms, mobile navigation menus, or any situation where you need a modal-like interface without full-screen blocking.

## Components

### Sheet

The root component that manages sheet state. Built on top of the Dialog component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes for styling |

### SheetTrigger

A button that opens the sheet when clicked.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | When enabled, applies sheet trigger behavior to the child element (like a link or custom button) |
| `for` | `string` | - | Optional ID to associate with a specific sheet when not using direct parent-child relationship |
| `className` | `string` | - | Additional CSS classes for styling |

### SheetContent

The slide-out panel container that appears when the sheet is opened.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Preferred side for content placement relative to the trigger |
| `className` | `string` | - | Additional CSS classes for styling |

### SheetHeader

A container for the sheet title and description.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes for styling |

### SheetTitle

The title of the sheet. Automatically receives proper heading semantics.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes for styling |

### SheetDescription

A description that provides additional context about the sheet.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes for styling |

### SheetFooter

A container for action buttons, typically containing cancel and confirm buttons.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes for styling |

### SheetClose

A button that closes the sheet when clicked.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | When enabled, applies close functionality to the child element while preserving its appearance |
| `className` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Sheet
```astro
---
import { Button } from "@/components/starwind/button";
import { Input } from "@/components/starwind/input";
import { Label } from "@/components/starwind/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/starwind/sheet";
---

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div class="grid gap-4 px-4">
      <div class="grid gap-2">
        <Label for="name">Name</Label>
        <Input id="name" value="Pedro Duarte" />
      </div>
      <div class="grid gap-2">
        <Label for="username">Username</Label>
        <Input id="username" value="@peduarte" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Different Sides
```astro
---
import { Button } from "@/components/starwind/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/starwind/sheet";
---

<!-- Top Sheet -->
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Top Sheet</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Top Sheet</SheetTitle>
      <SheetDescription>This sheet opens from the top of the screen.</SheetDescription>
    </SheetHeader>
    <div class="grid gap-4 px-4">
      <div class="grid gap-3">
        <Label for="top-sheet-name">Name</Label>
        <Input id="top-sheet-name" value="Pedro Duarte" />
      </div>
    </div>
    <SheetFooter>
      <Button variant="default">Save changes</Button>
      <SheetClose asChild>
        <Button variant="outline">Close</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>

<!-- Right Sheet -->
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Right Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Right Sheet</SheetTitle>
      <SheetDescription>This sheet opens from the right of the screen.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

<!-- Bottom Sheet -->
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Bottom Sheet</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Bottom Sheet</SheetTitle>
      <SheetDescription>This sheet opens from the bottom of the screen.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

<!-- Left Sheet -->
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Left Sheet</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Left Sheet</SheetTitle>
      <SheetDescription>This sheet opens from the left of the screen.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

## Features

- **Slide-out panels**: Extends from any screen edge (top, right, bottom, left)
- **Modal behavior**: Built on top of Dialog component with accessibility features
- **Responsive design**: Adapts to different screen sizes
- **Form integration**: Works seamlessly with forms and inputs
- **Customizable**: Full CSS class support for styling
- **Keyboard navigation**: Full keyboard support for accessibility
- **Touch friendly**: Optimized for mobile interactions

## Accessibility Notes

- Inherits all accessibility and behavior props from the Dialog component
- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Escape to close, Tab to navigate)
- Focus management for proper screen reader behavior
- Semantic heading structure with SheetTitle and SheetDescription
- High contrast for visibility
- Consider mobile touch interactions

## Best Practices

- Use semantic heading structure with SheetHeader, SheetTitle, SheetDescription
- Include clear action buttons in SheetFooter (save, cancel, close)
- Consider appropriate side placement for your content
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for readability
- Use meaningful trigger labels and content descriptions
- Consider mobile-specific interactions and layouts
- Test with assistive technology for proper accessibility
- Use SheetClose for consistent closing behavior
