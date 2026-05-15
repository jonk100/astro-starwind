---
title: Sheet
---

# Sheet

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

## Installation

```bash
npx starwind@latest add sheet
```

## Usage

### General Notes

Sheets are slide-out panels that can extend from any edge of the screen. They're built on top of the Dialog component and are great for forms and mobile navigation menus.

The essential components are `Sheet`, `SheetTrigger`, and `SheetContent`. The `SheetHeader`, `SheetFooter`, `SheetTitle`, and `SheetDescription` components provide additional structure.

### side

Sheets can slide out from any side of the screen using the `side` prop.

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
      <div class="grid gap-3">
        <Label for="top-sheet-username">Username</Label>
        <Input id="top-sheet-username" value="@peduarte" />
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

<!-- Other sides: right, bottom, left -->
<SheetContent side="right">...</SheetContent>
<SheetContent side="bottom">...</SheetContent>
<SheetContent side="left">...</SheetContent>
```

## API Reference

### Sheet

The root component that manages sheet state. Built on top of the Dialog component.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | - |

```astro
<Sheet>
  <SheetTrigger>Open Sheet</SheetTrigger>
  <SheetContent>
    <!-- Sheet content goes here -->
  </SheetContent>
</Sheet>
```

**Additional Notes:**
- Inherits all accessibility and behavior props from the Dialog component
- Supports all the same positioning and interaction patterns

### SheetTrigger

A button that opens sheet when clicked.

| Prop | Type | Default |
|------|------|---------|
| `asChild` | `boolean` | `false` |
| `for` | `string` | - |
| `className` | `string` | - |

```astro
<SheetTrigger asChild>
  <Button>Open Sheet</Button>
</SheetTrigger>

<!-- Or as a standalone button -->
<SheetTrigger>Open Sheet</SheetTrigger>
```

**Additional Notes:**
- `asChild`: When enabled, applies sheet trigger behavior to the child element (like a link or custom button)
- `for`: Optional ID to associate with a specific sheet when not using direct parent-child relationship

### SheetContent

The slide-out panel container that appears when the sheet is opened.

| Prop | Type | Default |
|------|------|---------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` |
| `className` | `string` | - |

```astro
<SheetContent side="right" class="w-[400px] sm:w-[540px]">
  <!-- Sheet content goes here -->
</SheetContent>
```

**Additional Notes:**
- `side`: Preferred side for content placement relative to the trigger
- Inherits all accessibility and behavior props from the Dialog component

### SheetHeader

A container for sheet title and description.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | - |

```astro
<SheetHeader>
  <SheetTitle>Sheet Title</SheetTitle>
  <SheetDescription>Sheet description</SheetDescription>
</SheetHeader>
```

### SheetTitle

The title of the sheet. Automatically receives proper heading semantics.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | - |

```astro
<SheetTitle>Edit Profile</SheetTitle>
```

### SheetDescription

A description that provides additional context about the sheet.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | - |

```astro
<SheetDescription>
  Make changes to your profile here. Click save when you're done.
</SheetDescription>
```

### SheetFooter

A container for action buttons, typically containing cancel and confirm buttons.

| Prop | Type | Default |
|------|------|---------|
| `className` | `string` | - |

```astro
<SheetFooter>
  <SheetClose asChild>
    <Button variant="outline">Cancel</Button>
  </SheetClose>
  <Button>Save</Button>
</SheetFooter>
```

**Additional Notes:**
- Typically contains action buttons like save, cancel, or close

### SheetClose

A button that closes sheet when clicked.

| Prop | Type | Default |
|------|------|---------|
| `asChild` | `boolean` | `false` |
| `className` | `string` | - |

```astro
<SheetClose asChild>
  <Button>Close</Button>
</SheetClose>

<!-- Or as a standalone button -->
<SheetClose>Close</SheetClose>
```

**Additional Notes:**
- `asChild`: When enabled, applies close functionality to the child element while preserving its appearance
- Can be used anywhere within the sheet content, not just in the footer
- Automatically handles sheet closing when clicked or activated via keyboard
