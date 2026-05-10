# Toast Component

## Purpose and Usage

The Toast component provides a notification system for displaying temporary messages to users. Use it for success messages, error notifications, loading states, or any temporary information that needs user attention.

## Components

### Toaster

The container component that renders toast notifications. Add this once to your layout.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-right"` | Where toasts appear on screen |
| `limit` | `number` | `3` | Maximum number of visible toasts (older ones stack behind) |
| `duration` | `number` | `5000` | Default auto-dismiss time in milliseconds |
| `gap` | `string` | `"0.5rem"` | Spacing between expanded toasts |
| `peek` | `string` | `"1rem"` | How much stacked toasts peek out from behind |
| `class` | `string` | - | Additional CSS classes for styling |

### toast()

The main function to create toast notifications.

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | Main toast message |
| `description` | `string` | Secondary description text |
| `variant` | `"default" \| "success" \| "error" \| "warning" \| "info" \| "loading"` | Visual variant |
| `duration` | `number` | Auto-dismiss time in ms (0 for infinite) |
| `id` | `string` | Custom ID for the toast |
| `onClose` | `() => void` | Callback when close animation starts |
| `onRemove` | `() => void` | Callback when toast is removed from DOM |

### toast.success() / error() / warning() / info() / loading()

Shorthand methods for creating variant-specific toasts.

```ts
toast.success("Saved successfully");
toast.error("Something went wrong", { description: "Please try again" });
toast.warning("Check your input");
toast.info("New update available");
toast.loading("Processing..."); // Does not auto-dismiss
```

### toast.promise()

Handle async operations with automatic state transitions.

```ts
toast.promise(asyncOperation(), {
  loading: "Saving...",
  success: "Saved!",
  error: "Failed to save",
});

// With dynamic messages
toast.promise(fetchUser(), {
  loading: { title: "Loading...", description: "Fetching user data" },
  success: (user) => ({ title: "Welcome!", description: `Hello, ${user.name}` }),
  error: (err) => `Error: ${err.message}`,
});
```

### toast.update()

Update an existing toast by ID.

```ts
const id = toast("Processing...");
toast.update(id, { title: "Done!", variant: "success" });
```

### toast.dismiss()

Dismiss toasts programmatically.

```ts
const id = toast("Hello world");
toast.dismiss(id);  // Dismiss specific toast
toast.dismiss();    // Dismiss all toasts
```

## Usage Examples

### Basic Setup
```astro
---
import { Button } from "@/components/starwind/button";
---
<div class="flex flex-wrap gap-2">
  <Button id="show-toast">Show Toast</Button>
</div>

<script>
  import { toast } from "@/components/starwind/toast";

  document.getElementById("show-toast")?.addEventListener("click", () => {
    toast("Hello world!");
  });
</script>
```

### With Variants
```astro
---
import { Button } from "@/components/starwind/button";
---
<div class="flex flex-wrap gap-2">
  <Button id="toast-success">Success</Button>
  <Button id="toast-error">Error</Button>
  <Button id="toast-warning">Warning</Button>
  <Button id="toast-info">Info</Button>
</div>

<script>
  import { toast } from "@/components/starwind/toast";

  document.getElementById("toast-success")?.addEventListener("click", () => {
    toast.success("Success!", { description: "Your changes have been saved." });
  });

  document.getElementById("toast-error")?.addEventListener("click", () => {
    toast.error("Error", { description: "Something went wrong." });
  });

  document.getElementById("toast-warning")?.addEventListener("click", () => {
    toast.warning("Warning", { description: "Please review your input." });
  });

  document.getElementById("toast-info")?.addEventListener("click", () => {
    toast.info("Info", { description: "Here's some helpful information." });
  });
</script>
```

### Promise Toast
```astro
---
import { Button } from "@/components/starwind/button";
---
<div class="flex flex-wrap gap-2">
  <Button id="toast-promise">Promise Toast</Button>
</div>

<script>
  import { toast } from "@/components/starwind/toast";

  document.getElementById("toast-promise")?.addEventListener("click", () => {
    const fakeApiCall = () =>
      new Promise<{ name: string }>((resolve) => {
        setTimeout(() => resolve({ name: "John" }), 2000);
      });

    toast.promise(fakeApiCall(), {
      loading: { title: "Saving...", description: "Please wait" },
      success: (data) => ({ title: "Saved!", description: `Welcome, ${data.name}!` }),
      error: { title: "Error", description: "Failed to save" },
    });
  });
</script>
```

## Features

- **Multiple variants**: Default, success, error, warning, info, loading
- **Promise support**: Automatic loading, success, and error states
- **Positioning**: 5 screen positions (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- **Stacking**: Multiple toasts with configurable limit and spacing
- **Dynamic updates**: Update existing toasts programmatically
- **Dismiss control**: Manual dismissal of specific or all toasts
- **Customizable**: Duration, delay, and styling options

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus management for multiple toasts
- Semantic color coding for different message types
- Consider using semantic variants appropriately
- Test with screen readers for proper announcements

## Best Practices

- Use semantic variants (success for success, error for errors, etc.)
- Include descriptive messages and optional descriptions
- Consider user preferences for notification duration
- Use promise toasts for async operations
- Test with keyboard navigation and assistive technology
- Provide clear, concise messages
- Consider mobile experience with appropriate positioning
