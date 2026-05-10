# Input OTP

InputOtp,
InputOtpGroup,
InputOtpSeparator,
InputOtpSlot,
REGEXP_ONLY_DIGITS_AND_CHARS,
} from "@/components/starwind/input-otp";

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

## Installation

```bash
npx starwind@latest add input-otp
```

## Usage

### General Notes

The Input OTP component provides a user-friendly way to input one-time passwords and verification codes. It supports keyboard navigation, paste handling, and pattern validation.

The essential components are `InputOtp`, `InputOtpGroup`, and `InputOtpSlot`. The `InputOtpSeparator` provides visual separation between groups of slots.

### With Separator

Use `InputOtpSeparator` to visually group slots, commonly used for phone verification codes or formatted inputs.

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

Use the `pattern` prop with `REGEXP_ONLY_DIGITS_AND_CHARS` to allow both letters and numbers.

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

### Sizes

The `InputOtpSlot` component supports three sizes: `sm`, `md` (default), and `lg`.

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

### Disabled

Use the `disabled` prop to prevent user interaction.

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

### Form Submission

The component integrates with native HTML forms using the `name` prop. The hidden input stores the complete OTP value.

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

## API Reference

### InputOtp

The root container that manages OTP input state and keyboard interactions.

| Prop | Type | Default |
|------|------|---------|
| `maxLength` | `number` | `6` |
| `value` | `string` | - |
| `defaultValue` | `string` | - |
| `disabled` | `boolean` | `false` |
| `pattern` | `RegExp \| string` | `\d` |
| `name` | `string` | - |
| `id` | `string` | - |
| `required` | `boolean` | - |
| `class` | `string` | - |

```astro
<InputOtp maxLength={6} name="otp" pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <InputOtpGroup>
    <InputOtpSlot index={0} />
  </InputOtpGroup>
</InputOtp>
```

**Additional Notes:**
- `maxLength`: The total number of characters allowed in the OTP
- `pattern`: A regex pattern to validate each character. Use `REGEXP_ONLY_DIGITS_AND_CHARS` for alphanumeric or `REGEXP_ONLY_DIGITS` for numbers only
- `name`: Required for form submission, the value is stored in a hidden input
- `disabled`: When true, prevents all user interaction

### InputOtpGroup

A container for grouping slots together visually.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<InputOtpGroup>
  <InputOtpSlot index={0} />
  <InputOtpSlot index={1} />
  <InputOtpSlot index={2} />
</InputOtpGroup>
```

### InputOtpSlot

An individual input slot that displays a single character.

| Prop | Type | Default |
|------|------|---------|
| `index` | `number` | - |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `class` | `string` | - |

```astro
<InputOtpSlot index={0} size="lg" />
```

**Additional Notes:**
- `index`: The position of this slot in the OTP sequence (0-indexed)
- `size`: Controls the slot dimensions. Use `"sm"` for compact layouts or `"lg"` for emphasis

### InputOtpSeparator

A visual separator between groups of slots.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<InputOtpSeparator />
```

The separator renders a dash icon by default. Use the `icon` slot to customize:

```astro
<InputOtpSeparator>
  <span slot="icon">/</span>
</InputOtpSeparator>
```

### Exported Constants

| Name | Description |
|------|-------------|
| `REGEXP_ONLY_DIGITS` | Pattern that allows only digits (0-9) |
| `REGEXP_ONLY_DIGITS_AND_CHARS` | Pattern that allows alphanumeric characters (A-Z, a-z, 0-9) |

### Events

The component dispatches a custom event when the value changes:

```typescript
interface InputOtpChangeEvent {
  detail: {
    value: string;
    inputOtpId: string;
  };
}
```

Listen for changes:

```astro
<script>
  document.addEventListener("starwind-input-otp:change", (e) => {
    const { value, inputOtpId } = e.detail;
    console.log(`OTP ${inputOtpId} changed to: ${value}`);
  });
</script>
```
