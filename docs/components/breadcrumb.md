# Breadcrumb

```astro
---
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/starwind/breadcrumb";
---

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbEllipsis />
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products/categories">Categories</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Electronics</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Installation

```bash
npx starwind@latest add breadcrumb
```

## Usage

### Separator

The `BreadcrumbSeparator` component is used to visually separate items in the breadcrumb trail. By default, it displays a chevron-right icon, but you can provide your own custom separator.

```astro
---
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/starwind/breadcrumb";
---

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Interactive Ellipsis

Use the `BreadcrumbEllipsis` component with a dropdown menu to create interactive breadcrumbs that reveal hidden paths. This is especially useful for deep navigation hierarchies.

```astro
---
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/starwind/breadcrumb";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/starwind/dropdown";
---

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <Dropdown>
        <DropdownTrigger asChild>
          <BreadcrumbEllipsis class="hover:text-foreground transition-colors" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem as="a" href="/products">Products</DropdownItem>
          <DropdownItem as="a" href="/products/categories">Categories</DropdownItem>
          <DropdownItem as="a" href="/products/categories/electronics">Electronics</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products/categories/electronics/laptops">Laptops</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## API Reference

### Breadcrumb API Reference

The root navigation component that contains all breadcrumb elements.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<Breadcrumb>
  <BreadcrumbList>
    <!-- Breadcrumb items -->
  </BreadcrumbList>
</Breadcrumb>
```

### BreadcrumbList

A container component that renders an ordered list for breadcrumb items.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<BreadcrumbList>
  <!-- BreadcrumbItem components -->
</BreadcrumbList>
```

### BreadcrumbItem

A component that represents each item in the breadcrumb navigation.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<BreadcrumbItem>
  <BreadcrumbLink href="/path">Link Text</BreadcrumbLink>
</BreadcrumbItem>
```

### BreadcrumbLink

A component for clickable breadcrumb links that navigate to previous levels in the hierarchy.

| Prop | Type | Default |
|------|------|---------|
| `href` | `string` | Required |
| `asChild` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<BreadcrumbLink href="/path">Link Text</BreadcrumbLink>
```

**Additional Notes:**
- `asChild`: When enabled, renders the child element instead of an anchor tag

### BreadcrumbPage

A component that represents the current page in the breadcrumb trail (the last item).

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<BreadcrumbPage>Current Page</BreadcrumbPage>
```

### BreadcrumbSeparator

A component for visual separation between breadcrumb items.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<BreadcrumbSeparator />
```

### BreadcrumbEllipsis

A component used to indicate truncated breadcrumb items, typically used when there are many levels in the breadcrumb trail.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<BreadcrumbEllipsis />
```
