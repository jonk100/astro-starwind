# Avatar

```astro
---
import { Avatar, AvatarImage, AvatarFallback } from "@/components/starwind/avatar";
---
<Avatar>
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Installation

```bash
npx starwind@latest add avatar
```

## Usage

### size

```astro
---
import { Avatar, AvatarImage, AvatarFallback } from "@/components/starwind/avatar";
---
<Avatar size="sm">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar size="md">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### variant

```astro
---
import { Avatar, AvatarImage, AvatarFallback } from "@/components/starwind/avatar";
---
<Avatar variant="default">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar variant="primary">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar variant="secondary">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar variant="info">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar variant="success">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar variant="warning">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar variant="error">
  <AvatarImage src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### image

Rather than passing an image URL, you can also pass an imported image to the `AvatarImage` component. This will optimize the image using astro:assets `<Image/>` component.

```astro
---
import { Avatar, AvatarImage, AvatarFallback } from "@/components/starwind/avatar";
import GigaChad from "@/assets/images/giga-chad.jpg";
---
<Avatar>
  <AvatarImage image={GigaChad} alt="GC" />
  <AvatarFallback>GC</AvatarFallback>
</Avatar>
```

### Fallback

When an image fails to load or isn't provided, fallback content will be displayed.

```astro
---
import { Avatar, AvatarImage, AvatarFallback } from "@/components/starwind/avatar";
---
<Avatar>
  <AvatarImage src="invalid-url.png" alt="Branden" />
  <AvatarFallback>WR</AvatarFallback>
</Avatar>
```

## API Reference

### Avatar

The root component that serves as a container for avatar content. It renders a styled figure element with configurable size and variant options.

| Prop | Type | Default |
|------|------|---------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `variant` | `"default" \| "primary" \| "secondary" \| "info" \| "success" \| "warning" \| "error"` | `"default"` |
| `class` | `string` | - |

```astro
<Avatar size="md" variant="default">
  <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

**Additional Notes:**
- `size`: Controls the size of the avatar
- `variant`: Sets the visual style of the avatar border

### AvatarImage

Displays an image within the Avatar component. This component handles both remote images via URL and local imported images.

| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | - |
| `image` | `ImageMetadata` | - |
| `alt` | `string` | Required |
| `class` | `string` | - |

```astro
<AvatarImage src="https://example.com/avatar.jpg" alt="John Doe" />
```

**Additional Notes:**
- `src`: URL of the image to display (use this or `image`, not both)
- `image`: An imported image (use this or `src`, not both)
- `alt`: Alternative text description of the image (required for accessibility)

### AvatarFallback

Renders fallback content (typically initials) when the avatar image fails to load or isn't provided.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<AvatarFallback>JD</AvatarFallback>
```

> **Tip:** The AvatarFallback component is automatically displayed when an image fails to load.
