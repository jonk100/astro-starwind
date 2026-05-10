# Item Component Quick Reference

## Overview
A flexible list item component with support for media, actions, and various layouts. Perfect for lists, navigation items, and content cards with consistent styling.

## Installation
```bash
npx starwind@latest add item
```

## Import Pattern
```astro
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemMedia,
  ItemHeader,
  ItemFooter,
  ItemGroup,
  ItemSeparator,
} from "@/components/starwind/item";
```

## Core Components & Props

### Item (Root Container)
- `variant` ("default" | "outline" | "muted", default: "default") - Visual style variant
- `size` ("default" | "sm", default: "default") - Overall size and spacing
- `as` (HTMLTag, default: "div") - HTML element to render as (e.g., "a", "button")
- `class` (string) - Custom styling

### ItemContent
- `class` (string) - Custom styling for main content area

### ItemTitle
- `class` (string) - Custom styling for title text

### ItemDescription
- `class` (string) - Custom styling for description text

### ItemActions
- `class` (string) - Custom styling for action area

### ItemMedia
- `variant` ("default" | "icon" | "image", default: "default") - Media type styling
- `class` (string) - Custom styling for media content

### ItemHeader
- `class` (string) - Custom styling for header content

### ItemFooter
- `class` (string) - Custom styling for footer content

### ItemGroup
- `class` (string) - Custom styling for item group container

### ItemSeparator
- `orientation` ("horizontal" | "vertical", default: "horizontal") - Separator orientation
- `class` (string) - Custom styling

## Common Usage Patterns

### Basic Item
```astro
<Item variant="outline">
  <ItemContent>
    <ItemTitle>Basic Item</ItemTitle>
    <ItemDescription>A simple item with title and description.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Action</Button>
  </ItemActions>
</Item>
```

### With Icon
```astro
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

### With Avatar
```astro
<Item variant="outline">
  <ItemMedia>
    <Avatar>
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
```

### With Image
```astro
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
```

### Link Item
```astro
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

### Item Group with Separator
```astro
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

### With Header
```astro
<Item variant="outline">
  <ItemHeader>
    <img
      src="https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop"
      alt="Product"
      class="aspect-square w-full rounded-sm object-cover"
    />
  </ItemHeader>
  <ItemContent>
    <ItemTitle>Product Name</ItemTitle>
    <ItemDescription>Product description goes here.</ItemDescription>
  </ItemContent>
</Item>
```

### In Dropdown
```astro
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
  </DropdownContent>
</Dropdown>
```

## Variant Options

### Default Variant
```astro
<Item>
  <ItemContent>
    <ItemTitle>Default Variant</ItemTitle>
    <ItemDescription>Standard styling with subtle background and borders.</ItemDescription>
  </ItemContent>
</Item>
```

### Outline Variant
```astro
<Item variant="outline">
  <ItemContent>
    <ItemTitle>Outline Variant</ItemTitle>
    <ItemDescription>Outlined style with clear borders and transparent background.</ItemDescription>
  </ItemContent>
</Item>
```

### Muted Variant
```astro
<Item variant="muted">
  <ItemContent>
    <ItemTitle>Muted Variant</ItemTitle>
    <ItemDescription>Subdued appearance with muted colors for secondary content.</ItemDescription>
  </ItemContent>
</Item>
```

## Size Options

### Default Size
```astro
<Item variant="outline">
  <ItemContent>
    <ItemTitle>Default Size</ItemTitle>
    <ItemDescription>Standard padding and spacing for most use cases.</ItemDescription>
  </ItemContent>
</Item>
```

### Small Size
```astro
<Item variant="outline" size="sm">
  <ItemContent>
    <ItemTitle>Small Size</ItemTitle>
    <ItemDescription>Compact padding for dense layouts.</ItemDescription>
  </ItemContent>
</Item>
```

## Key Features
- **Flexible Layout**: Support for media, content, and actions
- **Multiple Variants**: Default, outline, and muted styling options
- **Size Options**: Default and small sizes for different densities
- **Link Support**: Can render as anchor tags with proper semantics
- **Group Management**: Built-in grouping and separator components
- **Media Types**: Specialized handling for icons, avatars, and images
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Semantic HTML and ARIA support

## Best Practices
- Use `ItemMedia` with appropriate variant for icons, avatars, or images
- Place `ItemActions` for buttons or navigation indicators
- Use `ItemGroup` when displaying multiple related items
- Add `ItemSeparator` between items in groups for clarity
- Use `as="a"` for navigation items with proper link semantics
- Consider `size="sm"` for compact interfaces like dropdowns
- Use `variant="muted"` for secondary or less important items
- Add `target="_blank"` and `rel="noopener noreferrer"` for external links

## Documentation
For detailed examples and advanced usage, see the [complete Item documentation](../../../docs/components/item.md).

---
