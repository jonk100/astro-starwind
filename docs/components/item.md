# Item

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemMedia } from "@/components/starwind/item";
import { Button } from "@/components/starwind/button";
import CircleCheck from "@tabler/icons/outline/circle-check.svg";
import ChevronRight from "@tabler/icons/outline/chevron-right.svg";
---

<Item variant="outline">
  <ItemContent>
    <ItemTitle>Basic Item</ItemTitle>
    <ItemDescription>A simple item with title and description.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Action</Button>
  </ItemActions>
</Item>

<Item variant="outline" size="sm" as="a" href="#">
  <ItemMedia>
    <CircleCheck class="size-5" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Your profile has been verified.</ItemTitle>
  </ItemContent>
  <ItemActions>
    <ChevronRight class="size-4" />
  </ItemActions>
</Item>
```

## Installation

```bash
npx starwind@latest add item
```

## Usage

### Icon

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemMedia } from "@/components/starwind/item";
import { Button } from "@/components/starwind/button";
import AlertHexagon from "@tabler/icons/outline/alert-hexagon.svg";
---

<Item variant="outline">
  <ItemMedia variant="icon">
    <AlertHexagon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Security Alert</ItemTitle>
    <ItemDescription>New login detected from unknown device.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm" variant="outline">Review</Button>
  </ItemActions>
</Item>
```

### Avatar

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemMedia } from "@/components/starwind/item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/starwind/avatar";
import { Button } from "@/components/starwind/button";
import Plus from "@tabler/icons/outline/plus.svg";
---

<Item variant="outline">
  <ItemMedia>
    <Avatar >
      <AvatarImage src="https://github.com/Boston343.png" alt="@BowTiedWebReapr" />
      <AvatarFallback>WR</AvatarFallback>
    </Avatar>
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Branden</ItemTitle>
    <ItemDescription>Last seen 5 months ago</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="icon-sm" variant="outline" class="rounded-full" aria-label="Invite">
      <Plus />
    </Button>
  </ItemActions>
</Item>
<Item variant="outline">
  <ItemMedia>
    <div class="flex -space-x-3">
      <Avatar class="hidden sm:flex ">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar class="hidden sm:flex z-1">
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar class="z-2">
        <AvatarImage src="https://github.com/Boston343.png" alt="@BowTiedWebReapr" />
        <AvatarFallback>WR</AvatarFallback>
      </Avatar>
    </div>
  </ItemMedia>
  <ItemContent>
    <ItemTitle>No Team Members</ItemTitle>
    <ItemDescription>Invite your team to collaborate on this project.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm" variant="outline">Invite</Button>
  </ItemActions>
</Item>
```

### Image

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemMedia, ItemGroup } from "@/components/starwind/item";
---

<ItemGroup class="gap-4">
  <Item variant="outline" as="a" href="#">
    <ItemMedia variant="image">
      <img
        src="https://avatar.vercel.sh/Midnight-City-Lights"
        alt="Midnight City Lights"
        class="object-cover grayscale"
      />
    </ItemMedia>
    <ItemContent>
      <ItemTitle class="line-clamp-1">
        Midnight City Lights - <span class="text-muted-foreground">Electric Nights</span>
      </ItemTitle>
      <ItemDescription>Neon Dreams</ItemDescription>
    </ItemContent>
    <ItemContent class="flex-none text-center">
      <ItemDescription>3:45</ItemDescription>
    </ItemContent>
  </Item>
  <!-- More items... -->
</ItemGroup>
```

### variant

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/starwind/item";
import { Button } from "@/components/starwind/button";
---

<Item>
  <ItemContent>
    <ItemTitle>Default Variant</ItemTitle>
    <ItemDescription>
      Standard styling with subtle background and borders.
    </ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Open</Button>
  </ItemActions>
</Item>

<Item variant="outline">
  <ItemContent>
    <ItemTitle>Outline Variant</ItemTitle>
    <ItemDescription>
      Outlined style with clear borders and transparent background.
    </ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Open</Button>
  </ItemActions>
</Item>

<Item variant="muted">
  <ItemContent>
    <ItemTitle>Muted Variant</ItemTitle>
    <ItemDescription>
      Subdued appearance with muted colors for secondary content.
    </ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Open</Button>
  </ItemActions>
</Item>
```

### size

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/starwind/item";
---

<Item variant="outline">
  <ItemContent>
    <ItemTitle>Default Size</ItemTitle>
    <ItemDescription>Standard padding and spacing for most use cases.</ItemDescription>
  </ItemContent>
</Item>

<Item variant="outline" size="sm">
  <ItemContent>
    <ItemTitle>Small Size</ItemTitle>
    <ItemDescription>Compact padding for dense layouts.</ItemDescription>
  </ItemContent>
</Item>
```

### Group

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemMedia, ItemGroup, ItemSeparator } from "@/components/starwind/item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/starwind/avatar";
import { Button } from "@/components/starwind/button";
import Plus from "@tabler/icons/outline/plus.svg";
---

<ItemGroup>
  <Item>
    <ItemMedia>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </ItemMedia>
    <ItemContent class="gap-1">
      <ItemTitle>shadcn</ItemTitle>
      <ItemDescription>shadcn@vercel.com</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="ghost" size="icon" class="rounded-full">
        <Plus />
      </Button>
    </ItemActions>
  </Item>
  <ItemSeparator />
  <!-- More items... -->
</ItemGroup>
```

### Header

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemHeader, ItemGroup } from "@/components/starwind/item";
---

<ItemGroup class="grid grid-cols-3 gap-4">
  <Item variant="outline">
    <ItemHeader>
      <img
        src="https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop"
        alt="v0-1.5-sm"
        class="aspect-square w-full rounded-sm object-cover"
      />
    </ItemHeader>
    <ItemContent>
      <ItemTitle>v0-1.5-sm</ItemTitle>
      <ItemDescription>Everyday tasks and UI generation.</ItemDescription>
    </ItemContent>
  </Item>
  <!-- More items... -->
</ItemGroup>
```

### Link

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/starwind/item";
import ChevronRight from "@tabler/icons/outline/chevron-right.svg";
import ExternalLink from "@tabler/icons/outline/external-link.svg";
---

<Item as="a" href="#">
  <ItemContent>
    <ItemTitle>Visit our documentation</ItemTitle>
    <ItemDescription>Learn how to get started with our components.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <ChevronRight class="size-4" />
  </ItemActions>
</Item>

<Item variant="outline" as="a" href="#" target="_blank" rel="noopener noreferrer">
  <ItemContent>
    <ItemTitle>External resource</ItemTitle>
    <ItemDescription>Opens in a new tab with security attributes.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <ExternalLink class="size-4" />
  </ItemActions>
</Item>
```

### Dropdown

```astro
---
import { Item, ItemContent, ItemTitle, ItemDescription, ItemMedia } from "@/components/starwind/item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/starwind/avatar";
import { Button } from "@/components/starwind/button";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/starwind/dropdown";
import ChevronDown from "@tabler/icons/outline/chevron-down.svg";
---

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="outline" size="sm" class="w-fit">
      Select
      <ChevronDown />
    </Button>
  </DropdownTrigger>
  <DropdownContent class="min-w-60" align="end">
    <DropdownItem class="p-0">
      <Item size="sm" class="w-full p-2">
        <ItemMedia>
          <Avatar class="size-8">
            <AvatarImage src="https://github.com/Boston343.png" alt="@BowTiedWebReapr" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent class="gap-0.5">
          <ItemTitle>Branden</ItemTitle>
          <ItemDescription>Creator of Starwind UI</ItemDescription>
        </ItemContent>
      </Item>
    </DropdownItem>
    <!-- More items... -->
  </DropdownContent>
</Dropdown>
```

## API Reference

### Item API Reference

The root component that serves as a container for item content. It provides a flexible layout with support for different visual variants and sizes.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "outline" \| "muted"` | `"default"` |
| `size` | `"default" \| "sm"` | `"default"` |
| `as` | `HTMLTag` | `"div"` |
| `class` | `string` | - |

```astro
<Item variant="outline" size="default">
  <!-- Item content -->
</Item>
```

**Additional Notes:**

- `as`: The HTML element to render as (e.g., "a", "button")

### ItemContent

A component for rendering the main content area of the item. Automatically grows to fill available space.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<ItemContent>
  <ItemTitle>Title</ItemTitle>
  <ItemDescription>Description</ItemDescription>
</ItemContent>
```

### ItemTitle

A component for rendering the item title with appropriate styling.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<ItemTitle>Item Title</ItemTitle>
```

### ItemDescription

A component for rendering the item description with muted styling and automatic text clamping.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<ItemDescription>Item description text.</ItemDescription>
```

### ItemActions

A component for rendering action buttons or icons on the right side of the item.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<ItemActions>
  <Button size="sm">Action</Button>
</ItemActions>
```

### ItemMedia

A component for rendering media content (icons, images, or custom content) on the left side of the item.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "icon" \| "image"` | `"default"` |
| `class` | `string` | - |

```astro
<ItemMedia variant="icon">
  <Icon />
</ItemMedia>
```

### ItemHeader

A component for rendering content above the main item content (e.g., timestamps, metadata).

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<ItemHeader>
  <!-- Header content -->
</ItemHeader>
```

### ItemFooter

A component for rendering content below the main item content (e.g., additional actions, metadata).

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<ItemFooter>
  <!-- Footer content -->
</ItemFooter>
```

### ItemGroup

A container component for grouping multiple items together with semantic list markup.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<ItemGroup>
  <!-- Multiple Item components -->
</ItemGroup>
```

### ItemSeparator

A separator component specifically designed for use within ItemGroup.

| Prop | Type | Default |
|------|------|---------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `class` | `string` | - |

```astro
<ItemSeparator />
```
