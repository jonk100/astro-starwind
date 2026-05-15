---
title: Dropdown
---

# Dropdown

Dropdown,
DropdownContent,
DropdownItem,
DropdownLabel,
DropdownSeparator,
DropdownShortcut,
DropdownSub,
DropdownSubContent,
DropdownSubTrigger,
DropdownTrigger,
} from "@/components/starwind/dropdown";

```astro
---
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownLabel, DropdownSeparator } from "@/components/starwind/dropdown";
import { Button } from "@/components/starwind/button";
---

<Dropdown>
  <DropdownTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>My Account</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem as="a" href="#">Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownSeparator />
    <DropdownItem>Help</DropdownItem>
    <DropdownItem disabled>Sign out</DropdownItem>
  </DropdownContent>
</Dropdown>
```

## Installation

```bash
npx starwind@latest add dropdown
```

## Usage

### Navigation Menu

A common use case is a standard navigation menu dropdown, where all items are likely links. Here is an example making use of the `as` prop on `DropdownItem`.

```astro
---
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/starwind/dropdown";
import { Button } from "@/components/starwind/button";
---

<Dropdown>
  <DropdownTrigger asChild>
    <Button>Navigation</Button>
  </DropdownTrigger>
  <DropdownContent align="center">
    <DropdownItem as="a" href="/">Home</DropdownItem>
    <DropdownItem as="a" href="/products">Products</DropdownItem>
    <DropdownItem as="a" href="/services">Services</DropdownItem>
    <DropdownItem as="a" href="/about">About Us</DropdownItem>
    <DropdownItem as="a" href="/contact">Contact</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Hover Open

The dropdown can be configured to open on hover in addition to click.

```astro
---
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownLabel, DropdownSeparator } from "@/components/starwind/dropdown";
import { Button } from "@/components/starwind/button";
---

<Dropdown openOnHover closeDelay={300}>
  <DropdownTrigger asChild>
    <Button>Hover Me</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>My Account</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem as="a" href="#">Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownSeparator />
    <DropdownItem>Help</DropdownItem>
    <DropdownItem disabled>Sign out</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Submenu

Use `DropdownSub`, `DropdownSubTrigger`, and `DropdownSubContent` to nest secondary actions.

```astro
---
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownShortcut,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownTrigger,
} from "@/components/starwind/dropdown";
import { Button } from "@/components/starwind/button";
---

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownTrigger>
  <DropdownContent class="min-w-[10rem]">
    <DropdownItem>Team</DropdownItem>
    <DropdownSub>
      <DropdownSubTrigger>Invite users</DropdownSubTrigger>
      <DropdownSubContent>
        <DropdownItem>Email</DropdownItem>
        <DropdownItem>Message</DropdownItem>
        <DropdownSub>
          <DropdownSubTrigger>More options</DropdownSubTrigger>
          <DropdownSubContent>
            <DropdownItem>Calendly</DropdownItem>
            <DropdownItem>Slack</DropdownItem>
            <DropdownSeparator />
            <DropdownItem>Webhook</DropdownItem>
          </DropdownSubContent>
        </DropdownSub>
        <DropdownSeparator />
        <DropdownItem>Advanced...</DropdownItem>
      </DropdownSubContent>
    </DropdownSub>
    <DropdownItem>
      <span>New Team</span>
      <DropdownShortcut>⌘+T</DropdownShortcut>
    </DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Shortcuts

Add `DropdownShortcut` to display keyboard hints alongside actions.

```astro
---
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownShortcut,
  DropdownTrigger,
} from "@/components/starwind/dropdown";
import { Button } from "@/components/starwind/button";
---

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>My Account</DropdownLabel>
    <DropdownItem>
      <span>Profile</span>
      <DropdownShortcut>⇧⌘P</DropdownShortcut>
    </DropdownItem>
    <DropdownItem>
      <span>Billing</span>
      <DropdownShortcut>⌘B</DropdownShortcut>
    </DropdownItem>
    <DropdownItem>
      <span>Settings</span>
      <DropdownShortcut>⌘S</DropdownShortcut>
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem>
      <span>Log out</span>
      <DropdownShortcut>⇧⌘Q</DropdownShortcut>
    </DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Placement Options

You can position the dropdown menu in different ways by customizing the `side` and `align` properties.

```astro
---
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/starwind/dropdown";
import { Button } from "@/components/starwind/button";
---

<div class="flex gap-4">
  <Dropdown>
    <DropdownTrigger asChild>
      <Button>Left (Start)</Button>
    </DropdownTrigger>
    <DropdownContent align="start">
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </DropdownContent>
  </Dropdown>
  <Dropdown>
    <DropdownTrigger asChild>
      <Button>Center</Button>
    </DropdownTrigger>
    <DropdownContent align="center">
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </DropdownContent>
  </Dropdown>
  <Dropdown>
    <DropdownTrigger asChild>
      <Button>Right (End)</Button>
    </DropdownTrigger>
    <DropdownContent align="end">
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </DropdownContent>
  </Dropdown>
</div>
```

### With Icons

You can add icons to dropdown items for better visual cues.

```astro
---
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownLabel, DropdownSeparator } from "@/components/starwind/dropdown";
import { Button } from "@/components/starwind/button";
import Copy from "@tabler/icons/outline/copy.svg";
import Edit from "@tabler/icons/outline/edit.svg";
---

<Dropdown>
  <DropdownTrigger asChild>
    <Button>Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>Actions</DropdownLabel>
    <DropdownSeparator />
    <DropdownItem>
      <Copy />
      Copy
    </DropdownItem>
    <DropdownItem>
      <Edit />
      Edit
    </DropdownItem>
    <DropdownSeparator />
    <DropdownLabel>Danger Zone</DropdownLabel>
    <DropdownItem inset>Archive</DropdownItem>
    <DropdownItem inset disabled>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>
```

## API Reference

### Dropdown

The root component that serves as a container for all dropdown-related components. It manages the state of the dropdown and handles keyboard interactions.

| Prop | Type | Default |
|------|------|---------|
| `openOnHover` | `boolean` | `false` |
| `closeDelay` | `number` | `200` |
| `class` | `string` | - |

```astro
<Dropdown openOnHover closeDelay={300}>
  <!-- Dropdown components -->
</Dropdown>
```

**Additional Notes:**

- `openOnHover`: When enabled, the dropdown will open on hover in addition to click
- `closeDelay`: Time in milliseconds to wait before closing when hover open is enabled

### DropdownTrigger

The button that opens the dropdown menu when clicked.

| Prop | Type | Default |
|------|------|---------|
| `asChild` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<DropdownTrigger asChild>
  <Button>Open</Button>
</DropdownTrigger>
```

**Additional Notes:**

- `asChild`: When enabled, renders the child element instead of a button

### DropdownContent

The container for dropdown menu content. This component renders the dropdown menu with animation effects.

| Prop | Type | Default |
|------|------|---------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` |
| `align` | `"start" \| "center" \| "end"` | `"start"` |
| `sideOffset` | `number` | `4` |
| `animationDuration` | `number` | `150` |
| `class` | `string` | - |

```astro
<DropdownContent align="center" sideOffset={8}>
  <!-- Dropdown items -->
</DropdownContent>
```

**Additional Notes:**

- `side`: Side of the dropdown relative to the trigger (`"top"`, `"bottom"`, `"left"`, or `"right"`)
- `align`: Alignment of the dropdown relative to the trigger
- `sideOffset`: Offset distance in pixels from the trigger
- `animationDuration`: Open and close animation duration in milliseconds

### DropdownItem

A component for creating interactive items within the dropdown menu.

| Prop | Type | Default |
|------|------|---------|
| `as` | `HTMLTag` | `"div"` |
| `inset` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<DropdownItem as="a" href="#">Menu Item</DropdownItem>
```

**Additional Notes:**

- `as`: HTML element to render the item as (e.g., "a", "button")
- `inset`: Whether the item has left padding for alignment with items that have icons

### DropdownLabel

A component for rendering a non-interactive label within the dropdown menu.

| Prop | Type | Default |
|------|------|---------|
| `inset` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<DropdownLabel>Section Title</DropdownLabel>
```

**Additional Notes:**

- `inset`: Whether the label has left padding for alignment with items that have icons

### DropdownSeparator

A component for creating a visual separator between dropdown menu items.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<DropdownSeparator />
```

### DropdownShortcut

An optional helper for rendering keyboard hints aligned to the end of a dropdown item.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<DropdownItem>
  Profile
  <DropdownShortcut>Shift+Ctrl+P</DropdownShortcut>
</DropdownItem>
```

### DropdownSub

A wrapper for submenu trigger and content pairs inside a dropdown.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<DropdownSub>
  <DropdownSubTrigger>Invite users</DropdownSubTrigger>
  <DropdownSubContent>
    <DropdownItem>Email</DropdownItem>
  </DropdownSubContent>
</DropdownSub>
```

### DropdownSubTrigger

The interactive trigger that opens a nested submenu.

| Prop | Type | Default |
|------|------|---------|
| `inset` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<DropdownSubTrigger inset>Invite users</DropdownSubTrigger>
```

**Additional Notes:**

- `inset`: Adds left padding to align with items that include icons
- `disabled`: Prevents interaction and keyboard focus

### DropdownSubContent

The content panel rendered when a submenu trigger is opened.

| Prop | Type | Default |
|------|------|---------|
| `animationDuration` | `number` | `150` |
| `class` | `string` | - |

```astro
<DropdownSubContent animationDuration={200}>
  <DropdownItem>Email</DropdownItem>
  <DropdownItem>Message</DropdownItem>
</DropdownSubContent>
```

**Additional Notes:**

- `animationDuration`: Open and close animation duration in milliseconds
