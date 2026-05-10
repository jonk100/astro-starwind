# Accordion Component

## Purpose and Usage

The Accordion component provides collapsible content sections that allow users to expand and collapse information. Use it for FAQs, content organization, multi-step forms, or any situation where you need to present information in a space-efficient manner.

## Components

### Accordion

The root component that contains all accordion items and manages their state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | `"single"` | Determines whether only one or multiple accordion items can be open at once |
| `defaultValue` | `string` | - | The value of the item that should be open by default |
| `class` | `string` | - | Additional CSS classes for styling |

### AccordionItem

The container for each individual accordion item.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | A unique identifier for the accordion item |
| `class` | `string` | - | Additional CSS classes for styling |

### AccordionTrigger

The button that toggles the accordion item open/closed state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### AccordionContent

The content that is revealed when the accordion item is expanded.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic Accordion
```astro
---
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/starwind/accordion";
---

<Accordion defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Astro?</AccordionTrigger>
    <AccordionContent>
      Astro is an web framework for building fast, scalable, and secure websites.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Why should I use Astro?</AccordionTrigger>
    <AccordionContent>
      Astro provides a set of features that make it an ideal choice for building fast,
      scalable, and secure websites.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple Open Items
```astro
---
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/starwind/accordion";
---

<Accordion type="multiple" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Astro?</AccordionTrigger>
    <AccordionContent>
      Astro is an web framework for building fast, scalable, and secure websites.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Why should I use Astro?</AccordionTrigger>
    <AccordionContent>
      Astro provides a set of features that make it an ideal choice for building fast,
      scalable, and secure websites.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### FAQ Example
```astro
---
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/starwind/accordion";
---

<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Starwind UI?</AccordionTrigger>
    <AccordionContent>
      Starwind UI is a comprehensive component library for modern web applications.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How do I install components?</AccordionTrigger>
    <AccordionContent>
      Use the Starwind CLI: `npx starwind@latest add [component-name]`
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>What components are available?</AccordionTrigger>
    <AccordionContent>
      Check the documentation or use the CLI to browse available components.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Features

- **Single/Multiple modes**: Control whether one or multiple items can be open
- **Keyboard navigation**: Full keyboard support for accessibility
- **Smooth animations**: Built-in expand/collapse animations
- **Customizable styling**: Full CSS class support
- **Default values**: Set initial open item(s)
- **Responsive design**: Works across all screen sizes
- **Accessibility**: ARIA-compliant with proper semantic structure

## Animation Requirements

The accordion component requires CSS animations to function properly. The required keyframes are automatically included when initializing a Starwind project, but if you've removed them, add this CSS:

```scss
/* Tailwind CSS v4 theme definition */
@theme inline {
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;

  @keyframes accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(--starwind-accordion-content-height);
    }
  }

  @keyframes accordion-up {
    from {
      height: var(--starwind-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
}
```

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management for expanded/collapsed states
- Semantic HTML structure for assistive technology
- Consider using appropriate heading hierarchy within content
- Test with screen readers for proper announcements

## Best Practices

- Use meaningful trigger labels and content descriptions
- Consider using `type="single"` for FAQ-style accordions
- Use `type="multiple"` for content where users might want to compare multiple sections
- Ensure sufficient color contrast for all states
- Test keyboard navigation thoroughly
- Consider mobile touch interactions
- Use semantic heading structure within accordion content
- Provide clear visual indicators for expand/collapse states
