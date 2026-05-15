---
title: Toast
---

# Toast

```astro
---
import { Button } from "@/components/starwind/button";
---
<div class="flex flex-wrap gap-2">
  <Button variant="outline" id="toast-demo-default">Default</Button>
  <Button variant="outline" id="toast-demo-success">Success</Button>
  <Button variant="outline" id="toast-demo-error">Error</Button>
</div>

<script>
  import { toast } from "@/components/starwind/toast";

  document.getElementById("toast-demo-default")?.addEventListener("click", () => {
    toast("Default Toast");
  });

  document.getElementById("toast-demo-success")?.addEventListener("click", () => {
    toast.success("Success!", { description: "Your changes have been saved." });
  });

  document.getElementById("toast-demo-error")?.addEventListener("click", () => {
    toast.error("Error", { description: "Something went wrong." });
  });
</script>
```

## Installation

```bash
npx starwind@latest add toast
```

## Usage

### Setup

The `Toaster` component must be added once to your page, usually in a common layout file shared between pages so you can trigger toasts from anywhere.

```astro
title="src/layouts/Layout.astro"
<!doctype html>
<html lang="en">
 <head>
  <!-- ... -->
 </head>
 <body>
  <!-- navigation -->
  <main>
    <!-- content -->
  </main>
  <Toaster position="bottom-right" />
  </body>
</html>
```

### Basic Usage

Toasts are created using the `toast` function. Import it in a `<script>` tag and call it to show notifications.

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

### Variants

The toast system supports multiple variants for different message types.

```astro
---
import { Button } from "@/components/starwind/button";
---
<div class="flex flex-wrap gap-2">
  <Button variant="outline" id="toast-default">Default</Button>
  <Button variant="outline" id="toast-success">Success</Button>
  <Button variant="outline" id="toast-error">Error</Button>
  <Button variant="outline" id="toast-warning">Warning</Button>
  <Button variant="outline" id="toast-info">Info</Button>
  <Button variant="outline" id="toast-loading">Loading</Button>
</div>

<script>
  import { toast } from "@/components/starwind/toast";

  document.getElementById("toast-default")?.addEventListener("click", () => {
    toast("Default Toast");
  });

  document.getElementById("toast-success")?.addEventListener("click", () => {
    toast.success("Success!");
  });

  document.getElementById("toast-error")?.addEventListener("click", () => {
    toast.error("Error");
  });

  document.getElementById("toast-warning")?.addEventListener("click", () => {
    toast.warning("Warning");
  });

  document.getElementById("toast-info")?.addEventListener("click", () => {
    toast.info("Info");
  });

  document.getElementById("toast-loading")?.addEventListener("click", () => {
    toast.loading("Loading...");
  });
</script>
```

### Promise Toast

Handle async operations with automatic loading, success, and error states.

```astro
---
import { Button } from "@/components/starwind/button";
---
<div class="flex flex-wrap gap-2">
  <Button variant="primary" id="toast-promise-success">Promise (Success)</Button>
  <Button variant="error" id="toast-promise-error">Promise (Error)</Button>
</div>

<script>
  import { toast } from "@/components/starwind/toast";

  document.getElementById("toast-promise-success")?.addEventListener("click", () => {
    const fakeApiCall = () =>
      new Promise<{ name: string }>((resolve) => {
        setTimeout(() => resolve({ name: "John" }), 2000);
      });

    toast.promise(fakeApiCall(), {
      loading: { title: "Saving...", description: "Please wait" },
      success: (data) => ({ title: "Saved!", description: `Welcome, ${data.name}!` }),
      error: (err) => ({ 
        title: "Error", 
        description: "Failed to save",
      }),
    });
  });

  document.getElementById("toast-promise-error")?.addEventListener("click", () => {
    const fakeApiCall = () =>
      new Promise<string>((_, reject) => {
        setTimeout(() => reject(new Error("Network error")), 2000);
      });

    toast
      .promise(fakeApiCall(), {
        loading: "Processing...",
        success: "Done!",
        error: (err) => ({
          title: err.message || "Contact support for assistance",
          description: "Pardon our dust while we fix this issue.",
        }),
      })
      .catch(() => {});
  });
</script>
```

### Updating & Dismissing

You can update existing toasts or dismiss them programmatically.

```astro
---
import { Button } from "@/components/starwind/button";
---
<div class="flex flex-wrap gap-2">
  <Button variant="outline" id="toast-update">Create & Update</Button>
  <Button variant="outline" id="toast-dismiss-all">Dismiss All</Button>
</div>

<script>
  import { toast } from "@/components/starwind/toast";

  document.getElementById("toast-update")?.addEventListener("click", () => {
    const id = toast("Processing...", { description: "Step 1 of 3" });
    
    setTimeout(() => {
      toast.update(id, { title: "Still working...", description: "Step 2 of 3" });
    }, 1500);

    setTimeout(() => {
      toast.update(id, { title: "Complete!", variant: "success", description: "All steps finished" });
    }, 3000);

    document.getElementById("toast-dismiss-all")?.addEventListener("click", () => {
      toast.dismiss();
    });
  });
</script>
```

## API Reference

### Toaster

The container component that renders toast notifications. Add this once to your layout.

| Prop | Type | Default |
|------|------|---------|
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-right"` |
| `limit` | `number` | `3` |
| `duration` | `number` | `5000` |
| `gap` | `string` | `"0.5rem"` |
| `peek` | `string` | `"1rem"` |
| `class` | `string` | - |

```astro
<Toaster position="bottom-right" limit={3} duration={5000} />
```

**Additional Notes:**
- `position`: Where toasts appear on screen
- `limit`: Maximum number of visible toasts (older ones stack behind)
- `duration`: Default auto-dismiss time in milliseconds
- `gap`: Spacing between expanded toasts
- `peek`: How much stacked toasts peek out from behind

### toast()

The main function to create toast notifications.

```ts
import { toast } from "@/components/starwind/toast";

// Simple string
toast("Hello world");

// With options
toast("Title", { description: "Description text" });

// Full options object
toast({
  title: "Title",
  description: "Description",
  variant: "success",
  duration: 3000,
});
```

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

### ToastOptions

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Custom ID for the toast |
| `title` | `string` | Main toast message |
| `description` | `string` | Secondary description text |
| `variant` | `"default" \| "success" \| "error" \| "warning" \| "info" \| "loading"` | Visual variant |
| `duration` | `number` | Auto-dismiss time in ms (0 for infinite) |
| `onClose` | `() => void` | Callback when close animation starts |
| `onRemove` | `() => void` | Callback when toast is removed from DOM |
