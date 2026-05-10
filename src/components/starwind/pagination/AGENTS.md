# Pagination

```astro
---
import {
  Pagination,
  PaginationEllipsis,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/starwind/pagination";
---
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#">Prev</PaginationPrevious>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#">Next</PaginationNext>
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Installation

```bash
npx starwind@latest add pagination
```

## Usage

### General Notes

The basic pagination component includes previous/next buttons and numbered pages.

> **Tip:** Use the `isActive` prop on `<PaginationLink>` to highlight the current page.

### Sizes

Show pagination examples using small and large button sizes.

```astro
---
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/starwind/pagination";
---

<section class="mx-auto mt-10 max-w-lg">
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious size="sm" href="#">Prev</PaginationPrevious>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink size="icon-sm" href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink size="icon-sm" href="#" isActive>2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink size="icon-sm" href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis size="icon-sm" />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext size="sm" href="#">Next</PaginationNext>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</section>

<section class="mx-auto mt-10 max-w-lg">
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious size="lg" href="#">Prev</PaginationPrevious>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink size="icon-lg" href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink size="icon-lg" href="#" isActive>2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink size="icon-lg" href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis size="icon-lg" />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext size="lg" href="#">Next</PaginationNext>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</section>
```

## API Reference

### Pagination

Wrapper for the default pagination component.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<Pagination>
  <!-- Pagination content -->
</Pagination>
```

### PaginationContent

Wrapper for the default pagination content component.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<PaginationContent>
  <!-- Pagination items -->
</PaginationContent>
```

### PaginationItem

Wrapper for the default pagination item component.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<PaginationItem>
  <PaginationLink href="#">1</PaginationLink>
</PaginationItem>
```

### PaginationLink

A link component for page numbers with active state support. This uses default starwind button styles and similar props.

| Prop | Type | Default |
|------|------|---------|
| `isActive` | `boolean` | `false` |
| `size` | `"sm" \| "md" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg"` | `"icon"` |
| `href` | `string` | - |
| `class` | `string` | - |

```astro
<PaginationLink href="#" isActive>2</PaginationLink>
```

**Additional Notes:**

- `isActive`: Highlights the current page

### PaginationNext

A specialized wrapper of `<PaginationLink>` for the "Next" button that includes a right chevron icon.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg"` | `"md"` |
| `href` | `string` | - |
| `class` | `string` | - |

```astro
<PaginationNext href="#">Next</PaginationNext>
```

### PaginationPrevious

A specialized wrapper of `<PaginationLink>` for the "Previous" button that includes a left chevron icon.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg"` | `"md"` |
| `href` | `string` | - |
| `class` | `string` | - |

```astro
<PaginationPrevious href="#">Prev</PaginationPrevious>
```

### PaginationEllipsis

Includes a three-dot icon to indicate skipped pages.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"icon-sm" \| "icon" \| "icon-lg"` | `"icon"` |
| `class` | `string` | - |

```astro
<PaginationEllipsis />
```
