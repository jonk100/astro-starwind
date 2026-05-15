---
title: Button Group
---

# Button Group

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup } from "@/components/starwind/button-group";
---

<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
```

## Installation

```bash
npx starwind@latest add button-group
```

## Usage

### Orientation

Set the `orientation` prop to change the button group layout.

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup } from "@/components/starwind/button-group";
import IconPlus from "@tabler/icons/outline/plus.svg";
import IconMinus from "@tabler/icons/outline/minus.svg";
---

<ButtonGroup orientation="vertical" class="h-fit">
  <Button variant="outline" size="icon">
    <IconPlus />
  </Button>
  <Button variant="outline" size="icon">
    <IconMinus />
  </Button>
</ButtonGroup>
```

### Size

Control the size of buttons using the `size` prop on individual buttons.

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup } from "@/components/starwind/button-group";
import IconPlus from "@tabler/icons/outline/plus.svg";
---

<div class="flex flex-col items-start gap-8">
  <ButtonGroup>
    <Button variant="outline" size="sm">Small</Button>
    <Button variant="outline" size="sm">Button</Button>
    <Button variant="outline" size="sm">Group</Button>
    <Button variant="outline" size="icon-sm">
      <IconPlus />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Default</Button>
    <Button variant="outline">Button</Button>
    <Button variant="outline">Group</Button>
    <Button variant="outline" size="icon">
      <IconPlus />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline" size="lg">Large</Button>
    <Button variant="outline" size="lg">Button</Button>
    <Button variant="outline" size="lg">Group</Button>
    <Button variant="outline" size="icon-lg">
      <IconPlus />
    </Button>
  </ButtonGroup>
</div>
```

### Nested

Nest `ButtonGroup` components to create button groups with spacing.

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup } from "@/components/starwind/button-group";
import IconArrowLeft from "@tabler/icons/outline/arrow-left.svg";
import IconArrowRight from "@tabler/icons/outline/arrow-right.svg";
---

<ButtonGroup>
  <ButtonGroup>
    <Button variant="outline" size="sm">1</Button>
    <Button variant="outline" size="sm">2</Button>
    <Button variant="outline" size="sm">3</Button>
    <Button variant="outline" size="sm">4</Button>
    <Button variant="outline" size="sm">5</Button>
  </ButtonGroup>
  <ButtonGroup>
    <ButtonGroup>
    <Button variant="outline" size="icon-sm" aria-label="Previous">
      <IconArrowLeft />
    </Button>
    <Button variant="outline" size="icon-sm" aria-label="Next">
      <IconArrowRight />
    </Button>
  </ButtonGroup>
</ButtonGroup>
```

### Separator

The `ButtonGroupSeparator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/starwind/button-group";
import IconCopy from "@tabler/icons/outline/copy.svg";
import IconClipboard from "@tabler/icons/outline/clipboard.svg";
---

<ButtonGroup>
  <Button size="sm">
    <IconCopy />
    Copy
  </Button>
  <ButtonGroupSeparator />
  <Button size="sm">
    <IconClipboard />
    Paste
  </Button>
</ButtonGroup>
```

### Split

Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/starwind/button-group";
import IconPlus from "@tabler/icons/outline/plus.svg";
---

<ButtonGroup>
  <Button>Button</Button>
  <ButtonGroupSeparator />
  <Button size="icon">
    <IconPlus />
  </Button>
</ButtonGroup>
```

### Input

Wrap an `Input` component with buttons.

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup } from "@/components/starwind/button-group";
import { Input } from "@/components/starwind/input";
import IconSearch from "@tabler/icons/outline/search.svg";
---

<ButtonGroup>
  <Input placeholder="Search..." />
  <Button variant="outline" aria-label="Search">
    <IconSearch />
  </Button>
</ButtonGroup>
```

### Select

Pair with a `Select` component.

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup } from "@/components/starwind/button-group";
import { Input } from "@/components/starwind/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/starwind/select";
import IconArrowRight from "@tabler/icons/outline/arrow-right.svg";
---

<ButtonGroup>
  <ButtonGroup>
    <Select defaultValue="$">
      <SelectTrigger class="font-mono">
        <SelectValue placeholder="$" />
      </SelectTrigger>
      <SelectContent class="min-w-20">
        <SelectItem value="$"> $ </SelectItem>
        <SelectItem value="€"> € </SelectItem>
        <SelectItem value="£"> £ </SelectItem>
      </SelectContent>
    </Select>
    <Input placeholder="10.00" pattern="[0-9]*" />
  </ButtonGroup>
  <ButtonGroup>
    <Button aria-label="Send" size="icon" variant="outline">
      <IconArrowRight />
    </Button>
  </ButtonGroup>
</ButtonGroup>
```

### Dropdown Menu

Create a split button group with a dropdown menu.

```astro
---
import { Button } from "@/components/starwind/button";
import { ButtonGroup } from "@/components/starwind/button-group";
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator, DropdownTrigger } from "@/components/starwind/dropdown";
import IconChevronDown from "@tabler/icons/outline/chevron-down.svg";
---

<ButtonGroup>
  <Button variant="outline">Follow</Button>
  <Dropdown>
    <DropdownTrigger asChild>
      <Button variant="outline" size="icon">
        <IconChevronDown />
      </Button>
    </DropdownTrigger>
    <DropdownContent align="end" class="min-w-[200px]">
      <DropdownItem>Mute Conversation</DropdownItem>
      <DropdownItem>Mark as Read</DropdownItem>
      <DropdownItem>Report Conversation</DropdownItem>
      <DropdownSeparator />
      <DropdownItem>Delete Conversation</DropdownItem>
    </DropdownContent>
  </Dropdown>
</ButtonGroup>
```

## API Reference

### ButtonGroup

The container component that groups related buttons together.

| Prop          | Type                         | Default        |
|---------------|------------------------------|----------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `class`       | `string`                     | -              |

```astro
<ButtonGroup orientation="horizontal">
  <!-- Buttons -->
</ButtonGroup>
```

### ButtonGroupSeparator

A visual separator component for dividing buttons within a group.

| Prop          | Type                         | Default      |
|---------------|------------------------------|--------------|
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` |
| `class`       | `string`                     | -            |

```astro
<ButtonGroupSeparator orientation="vertical" />
```

### ButtonGroupText

A text label component for adding descriptive text within a button group.

| Prop    | Type     | Default |
|---------|----------|---------|
| `class` | `string` | -       |

```astro
<ButtonGroupText>
  Label text
</ButtonGroupText>
```
