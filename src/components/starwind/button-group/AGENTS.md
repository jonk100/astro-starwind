# Button Group Component

## Purpose and Usage

The Button Group component provides a way to group related buttons together with proper spacing, orientation, and visual hierarchy. Use it for button toolbars, form actions, navigation controls, or any situation where you need multiple related buttons.

## Components

### ButtonGroup

The container component that groups related buttons together.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction of the button group |
| `class` | `string` | - | Additional CSS classes for styling |

### ButtonGroupSeparator

A visual separator component for dividing buttons within a group.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Orientation of the separator line |
| `class` | `string` | - | Additional CSS classes for styling |

### ButtonGroupText

A text label component for adding descriptive text within a button group.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Button Group
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

### Vertical Orientation
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

### Different Sizes
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

### Nested Button Groups
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

### Button Group with Separator
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

### Button Group with Input
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

### Button Group with Select
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

### Button Group with Dropdown
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

## Features

- **Flexible orientation**: Horizontal or vertical button group layouts
- **Visual separators**: ButtonGroupSeparator for visual hierarchy
- **Nested groups**: Support for complex button layouts
- **Size control**: Individual button sizing within groups
- **Text labels**: ButtonGroupText for descriptive text
- **Integration ready**: Works with Input, Select, Dropdown components
- **Responsive design**: Adapts to different screen sizes
- **Keyboard accessible**: Full keyboard navigation support
- **Customizable styling**: Full CSS class support

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for button groups and separators
- Semantic button structure for assistive technology
- High contrast for visibility
- Consider using appropriate button variants and groupings
- Test with screen readers for proper announcements

## Best Practices

- Use semantic grouping for related actions
- Consider orientation for your layout (horizontal vs vertical)
- Use separators to create visual hierarchy
- Provide descriptive labels for button groups
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for all variants
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Test with assistive technology for proper accessibility
- Use meaningful button groupings and text labels
