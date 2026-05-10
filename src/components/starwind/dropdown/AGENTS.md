# Dropdown Component Quick Reference

## Overview

A versatile dropdown menu system with extensive customization options, supporting navigation, submenus, keyboard shortcuts, hover interactions, and flexible positioning.

## Installation

```bash
npx starwind@latest add dropdown
```

## Import Pattern

```astro
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownShortcut,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
} from "@/components/starwind/dropdown";
```

## Core Components & Props

### Dropdown (Root Container)

- `openOnHover` (boolean, default: false) - Enable hover to open
- `closeDelay` (number, default: 200) - Delay before closing on hover
- `class` (string) - Custom styling

### DropdownTrigger

- `asChild` (boolean, default: false) - Render child instead of button
- `class` (string) - Custom styling

### DropdownContent (Menu Container)

- `side` ("top" | "bottom" | "left" | "right", default: "bottom") - Position relative to trigger
- `align` ("start" | "center" | "end", default: "start") - Horizontal alignment
- `sideOffset` (number, default: 4) - Distance from trigger in pixels
- `animationDuration` (number, default: 150) - Animation timing in ms
- `class` (string) - Custom styling

### DropdownItem

- `as` (HTMLTag, default: "div") - Render as different element (e.g., "a", "button")
- `inset` (boolean, default: false) - Left padding for icon alignment
- `disabled` (boolean, default: false) - Disable interaction
- `class` (string) - Custom styling

### DropdownLabel

- `inset` (boolean, default: false) - Left padding for icon alignment
- `class` (string) - Custom styling

### DropdownSeparator

- `class` (string) - Custom styling

### DropdownShortcut

- `class` (string) - Custom styling for keyboard hints

### Submenu Components

- `DropdownSub` - Wrapper for submenu trigger/content
- `DropdownSubTrigger` - Interactive submenu opener (supports `inset`, `disabled`)
- `DropdownSubContent` - Submenu panel (supports `animationDuration`)

## Common Usage Patterns

### Basic Navigation Menu

```astro
<Dropdown>
  <DropdownTrigger asChild>
    <Button>Navigation</Button>
  </DropdownTrigger>
  <DropdownContent align="center">
    <DropdownItem as="a" href="/">Home</DropdownItem>
    <DropdownItem as="a" href="/products">Products</DropdownItem>
    <DropdownItem as="a" href="/services">Services</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Hover-Activated Dropdown

```astro
<Dropdown openOnHover closeDelay={300}>
  <DropdownTrigger asChild>
    <Button>Hover Me</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Quick Action 1</DropdownItem>
    <DropdownItem>Quick Action 2</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### With Keyboard Shortcuts

```astro
<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>My Account</DropdownLabel>
    <DropdownItem>
      <span>Profile</span>
      <DropdownShortcut>⇧⌘P</DropdownShortcut>
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

### Multi-Level Submenu

```astro
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
      </DropdownSubContent>
    </DropdownSub>
  </DropdownContent>
</Dropdown>
```

### With Icons

```astro
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

## Positioning Variations

```astro
<!-- Left aligned (default) -->
<DropdownContent align="start">...</DropdownContent>

<!-- Center aligned -->
<DropdownContent align="center">...</DropdownContent>

<!-- Right aligned -->
<DropdownContent align="end">...</DropdownContent>

<!-- Top positioned -->
<DropdownContent side="top">...</DropdownContent>
```

## Key Features

- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive**: Adapts to screen boundaries automatically
- **Customizable**: Extensive styling and positioning options
- **Interactive**: Support for hover, click, and keyboard shortcuts
- **Hierarchical**: Multi-level submenu support
- **Flexible**: Can render items as any HTML element

## Best Practices

- Use `asChild` on trigger when wrapping buttons or links
- Use `inset` prop for consistent alignment when mixing icons and text
- Add `DropdownSeparator` between logical sections
- Use `DropdownLabel` for non-interactive section headers
- Consider `openOnHover` for toolbar-style interfaces
- Add keyboard shortcuts for frequently used actions
