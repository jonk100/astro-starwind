# Table

```astro
---
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption, TableFoot } from "@/components/starwind/table";
---

<Table class="max-w-md mx-auto">
  <TableCaption>Example of a simple table</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ada Lovelace</TableCell>
      <TableCell>ada@starwind.dev</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Grace Hopper</TableCell>
      <TableCell>grace@starwind.dev</TableCell>
      <TableCell>Inactive</TableCell>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableCell colspan="3">Total: 2 users</TableCell>
    </TableRow>
  </TableFoot>
</Table>
```

## Installation

```bash
npx starwind@latest add table
```

## Usage

### Dynamic Data Table Example

Render a table of recent orders using Astro frontmatter and Starwind UI Table components:

```astro
---
const orders = [
  { order: "ORD1001", status: "Shipped", total: "$120.00", customer: "Alice Smith" },
  { order: "ORD1002", status: "Processing", total: "$80.00", customer: "Bob Johnson" },
  { order: "ORD1003", status: "Delivered", total: "$200.00", customer: "Charlie Rose" },
  { order: "ORD1004", status: "Cancelled", total: "$50.00", customer: "Dana Lee" },
];
---
<Table>
  <TableCaption>A list of your recent orders.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead class="w-[120px]">Order</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead class="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orders.map(order => (
      <TableRow>
        <TableCell class="font-medium">{order.order}</TableCell>
        <TableCell>{order.status}</TableCell>
        <TableCell>{order.customer}</TableCell>
        <TableCell class="text-right">{order.total}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableCell colspan="3">Total Orders</TableCell>
      <TableCell class="text-right">$450.00</TableCell>
    </TableRow>
  </TableFoot>
</Table>
```

## API Reference

### Table

The root table component. Renders a `<table>` inside a scrollable container.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<Table class="max-w-md mx-auto">
  <!-- headers, rows, and footers -->
</Table>
```

### TableHeader

Wraps `<thead>` for header rows.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TableHeader>
  <TableRow>
    <TableHead>Name</TableHead>
  </TableRow>
</TableHeader>
```

### TableHead

Wraps `<th>` for column headers.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TableHead class="w-[120px]">Order</TableHead>
```

### TableBody

Wraps `<tbody>` for data rows.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TableBody>
  <TableRow>
    <TableCell>Row content</TableCell>
  </TableRow>
</TableBody>
```

### TableRow

Wraps `<tr>` for each row.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TableRow>
  <TableCell>Cell</TableCell>
</TableRow>
```

### TableCell

Wraps `<td>` for data cells.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TableCell class="text-right">$120.00</TableCell>
```

### TableCaption

Wraps `<caption>` for table captions.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TableCaption>A list of your recent orders.</TableCaption>
```

### TableFoot

Wraps `<tfoot>` for summary rows.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TableFoot>
  <TableRow>
    <TableCell colspan="3">Total</TableCell>
  </TableRow>
</TableFoot>
```
