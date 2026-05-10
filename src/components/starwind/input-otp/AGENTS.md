# Input OTP Component

## Purpose and Usage

The Input OTP component provides a user-friendly way to input one-time passwords and verification codes. Use it for two-factor authentication, phone verification, security codes, or any situation where users need to enter a fixed-length code.

## Components

### InputOtp

The root container that manages OTP input state and keyboard interactions.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxLength` | `number` | `6` | The total number of characters allowed in the OTP |
| `value` | `string` | - | The current OTP value |
| `defaultValue` | `string` | - | The initial OTP value |
| `disabled` | `boolean` | `false` | When true, prevents all user interaction |
| `pattern` | `RegExp \| string` | `\d` | A regex pattern to validate each character |
| `name` | `string` | - | Required for form submission, value is stored in a hidden input |
| `id` | `string` | - | Unique identifier for the element |
| `required` | `boolean` | - | Whether the OTP input is required |
| `class` | `string` | - | Additional CSS classes for styling |

### InputOtpGroup

A container for grouping slots together visually.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

### InputOtpSlot

An individual input slot that displays a single character.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | - | The position of this slot in the OTP sequence (0-indexed) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls the slot dimensions |
| `class` | `string` | - | Additional CSS classes for styling |

### InputOtpSeparator

A visual separator between groups of slots.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Basic OTP Input
```astro
---
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
} from "@/components/starwind/input-otp";
---

<InputOtp maxLength={6}>
  <InputOtpGroup>
    <InputOtpSlot index={0} />
    <InputOtpSlot index={1} />
    <InputOtpSlot index={2} />
    <InputOtpSlot index={3} />
    <InputOtpSlot index={4} />
    <InputOtpSlot index={5} />
  </InputOtpGroup>
</InputOtp>
```

### With Separator
```astro
---
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSeparator,
  InputOtpSlot,
} from "@/components/starwind/input-otp";
---

<InputOtp maxLength={6}>
  <InputOtpGroup>
    <InputOtpSlot index={0} />
    <InputOtpSlot index={1} />
    <InputOtpSlot index={2} />
  </InputOtpGroup>
  <InputOtpSeparator />
  <InputOtpGroup>
    <InputOtpSlot index={3} />
    <InputOtpSlot index={4} />
    <InputOtpSlot index={5} />
  </InputOtpGroup>
</InputOtp>
```

### Alphanumeric Pattern
```astro
---
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "@/components/starwind/input-otp";
---

<InputOtp maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <InputOtpGroup>
    <InputOtpSlot index={0} />
    <InputOtpSlot index={1} />
    <InputOtpSlot index={2} />
    <InputOtpSlot index={3} />
    <InputOtpSlot index={4} />
    <InputOtpSlot index={5} />
  </InputOtpGroup>
</InputOtp>
```

### Different Sizes
```astro
---
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
} from "@/components/starwind/input-otp";
---

<div class="flex flex-col gap-6">
  <div class="space-y-2">
    <p class="text-muted-foreground text-sm">Small</p>
    <InputOtp maxLength={4}>
      <InputOtpGroup>
        <InputOtpSlot index={0} size="sm" />
        <InputOtpSlot index={1} size="sm" />
        <InputOtpSlot index={2} size="sm" />
        <InputOtpSlot index={3} size="sm" />
      </InputOtpGroup>
    </InputOtp>
  </div>
  <div class="space-y-2">
    <p class="text-muted-foreground text-sm">Medium (default)</p>
    <InputOtp maxLength={4}>
      <InputOtpGroup>
        <InputOtpSlot index={0} size="md" />
        <InputOtpSlot index={1} size="md" />
        <InputOtpSlot index={2} size="md" />
        <InputOtpSlot index={3} size="md" />
      </InputOtpGroup>
    </InputOtp>
  </div>
  <div class="space-y-2">
    <p class="text-muted-foreground text-sm">Large</p>
    <InputOtp maxLength={4}>
      <InputOtpGroup>
        <InputOtpSlot index={0} size="lg" />
        <InputOtpSlot index={1} size="lg" />
        <InputOtpSlot index={2} size="lg" />
        <InputOtpSlot index={3} size="lg" />
      </InputOtpGroup>
    </InputOtp>
  </div>
</div>
```

### Disabled State
```astro
---
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
} from "@/components/starwind/input-otp";
---

<InputOtp maxLength={6} disabled>
  <InputOtpGroup>
    <InputOtpSlot index={0} />
    <InputOtpSlot index={1} />
    <InputOtpSlot index={2} />
    <InputOtpSlot index={3} />
    <InputOtpSlot index={4} />
    <InputOtpSlot index={5} />
  </InputOtpGroup>
</InputOtp>
```

### Form Integration
```astro
---
import { Button } from "@/components/starwind/button";
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSlot,
} from "@/components/starwind/input-otp";
import { Label } from "@/components/starwind/label";
---

<form id="otp-demo-form" class="space-y-4">
  <div class="space-y-2">
    <Label for="otp-form">Verification Code</Label>
    <InputOtp id="otp-form" name="otp" maxLength={6} required>
      <InputOtpGroup>
        <InputOtpSlot index={0} />
        <InputOtpSlot index={1} />
        <InputOtpSlot index={2} />
        <InputOtpSlot index={3} />
        <InputOtpSlot index={4} />
        <InputOtpSlot index={5} />
      </InputOtpGroup>
    </InputOtp>
  </div>
  <Button type="submit">Submit Code</Button>
</form>
<div id="form-result" class="bg-muted mt-4 hidden rounded-md p-4 font-mono text-sm"></div>

<script>
  const form = document.getElementById("otp-demo-form") as HTMLFormElement;
  const resultDiv = document.getElementById("form-result");

  if (form && resultDiv) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const otp = formData.get("otp");

      resultDiv.textContent = `Submitted OTP: ${otp}`;
      resultDiv.classList.remove("hidden");
    });
  }
</script>
```

## Features

- **User-friendly OTP input**: Individual character slots for easy entry
- **Keyboard navigation**: Full support for Arrow keys, Tab, Enter, Space, Delete, Backspace
- **Paste handling**: Smart paste that fills slots automatically
- **Pattern validation**: Built-in regex patterns for digits or alphanumeric
- **Flexible sizing**: Small, medium, large slot sizes
- **Visual separators**: Optional grouping with visual separators
- **Form integration**: Hidden input stores complete OTP value
- **Customizable styling**: Full CSS class support
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Event system**: Custom events for value changes

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Arrow keys, Tab, Enter, Space, Delete, Backspace)
- Focus management for individual slots and complete OTP
- High contrast for visibility
- Semantic form structure for assistive technology
- Consider using appropriate patterns for your use case
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use appropriate maxLength for your verification code length
- Consider using separators for longer codes (phone numbers, etc.)
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful form names and labels
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide clear visual feedback for focus and error states
- Test form validation and submission handling
- Use appropriate validation patterns for your security requirements
