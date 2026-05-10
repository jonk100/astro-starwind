# Theme Toggle

```astro
---
import { ThemeToggle } from "@/components/starwind/theme-toggle";
---

<ThemeToggle />
```

## Installation

```bash
npx starwind@latest add theme-toggle
```

## Usage

### General Notes

The Theme Toggle component provides a simple way to switch between light and dark themes. It uses the Toggle component internally and syncs with `localStorage` to persist the user's preference.

**Important:** Add the following script to the `<head>` of each page to prevent flash of incorrect theme on page load:

```astro
<script is:inline>
  function initTheme() {
    const colorTheme = localStorage.getItem("colorTheme");
    if (!colorTheme) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("colorTheme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("colorTheme", "light");
      }
    } else {
      if (colorTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (colorTheme === "light") {
        document.documentElement.classList.remove("dark");
      } else if (colorTheme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", prefersDark);
      }
    }
  }

  initTheme();
  document.addEventListener("astro:after-swap", initTheme);
</script>
```

### Custom Icons

Use the `light-icon` and `dark-icon` slots to customize the icons displayed for each theme state.

```astro
---
import { ThemeToggle } from "@/components/starwind/theme-toggle";
import Heart from "@tabler/icons/outline/heart.svg";
import Star from "@tabler/icons/outline/star.svg";
---

<ThemeToggle>
  <Heart
    slot="light-icon"
    class="hidden size-5 group-data-[state=off]:data-ready:block"
    data-theme-icon
  />
  <Star
    slot="dark-icon"
    class="hidden size-5 group-data-[state=on]:data-ready:block"
    data-theme-icon
  />
</ThemeToggle>
```

**Note:** Custom icons must include the `data-theme-icon` attribute and the visibility classes shown above to work correctly with the theme toggle's state management.

## API Reference

### ThemeToggle

A toggle button that switches between light and dark themes.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"default" \| "outline"` | `"outline"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `ariaLabel` | `string` | `"Toggle theme"` |
| `class` | `string` | - |

```astro
<ThemeToggle variant="outline" size="md" />
```

**Additional Notes:**

- `variant`: Inherits from the Toggle component. Use `"outline"` for a bordered style
- `size`: Controls the button dimensions
- `ariaLabel`: Accessible label for screen readers

### Slots

| Slot | Description |
|------|-------------|
| `light-icon` | Icon shown when light theme is active (toggle is off) |
| `dark-icon` | Icon shown when dark theme is active (toggle is on) |

### Events

The component dispatches a `theme:change` event when the theme is toggled:

```typescript
interface ThemeChangeEvent {
  detail: {
    theme: "light" | "dark";
  };
}
```

Listen for theme changes:

```astro
<script>
  document.addEventListener("theme:change", (event) => {
    const { theme } = event.detail;
    console.log(`Theme changed to: ${theme}`);
  });
</script>
```
