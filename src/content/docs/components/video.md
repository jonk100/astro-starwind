---
title: Video
---

# Video

```astro
---
import navVideo from "@/assets/videos/starwind-pro_nav-3-responsive.mp4";
import { Video } from "@/components/starwind/video";
---

<Video src={navVideo} controls muted class="rounded-lg" />
```

## Installation

```bash
npx starwind@latest add video
```

## Usage

### General Notes

The `Video` component automatically detects the video type from the source URL and renders either a native HTML5 `<video>` element or a YouTube `<iframe>` embed. It supports:

- **Native videos**: Local files, imported assets, or direct video URLs
- **YouTube videos**: Standard YouTube URLs, short URLs, and embed URLs
- **YouTube Shorts**: Automatically detected and rendered with appropriate settings

### YouTube Video

Pass a YouTube URL directly to the `src` prop. The component handles URL parsing and creates a privacy-enhanced embed using `youtube-nocookie.com`.

```astro
---
import { Video } from "@/components/starwind/video";
---

<Video
  src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="YouTube video"
  class="rounded-lg"
/>
```

### YouTube Shorts

YouTube Shorts are automatically detected and rendered appropriately. Use custom aspect ratio classes to display them correctly.

```astro
---
import { Video } from "@/components/starwind/video";
---

<Video
  src="https://www.youtube.com/shorts/WVfUcdYugio"
  title="YouTube Shorts"
  class="aspect-square max-w-xs rounded-lg"
/>
```

## API Reference

### Video

A unified video component that renders either a native `<video>` element or a YouTube `<iframe>` based on the source URL.

| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | - |
| `title` | `string` | `"Video"` |
| `autoplay` | `boolean` | `false` |
| `muted` | `boolean` | `false` |
| `loop` | `boolean` | `false` |
| `controls` | `boolean` | `true` |
| `poster` | `string` | - |
| `class` | `string` | - |

```astro
<Video
  src={videoSource}
  title="My video"
  controls
  muted
  class="rounded-lg"
/>
```

**Additional Notes:**
- `src`: Video source URL. Accepts imported video assets, direct URLs, or YouTube URLs (including shorts)
- `title`: Used as the iframe title for YouTube embeds (accessibility)
- `autoplay`: Auto-starts playback. For YouTube, this sets the `autoplay=1` parameter
- `muted`: Mutes the video. Required for autoplay in most browsers
- `loop`: Loops the video. For YouTube, this also sets the playlist parameter
- `controls`: Shows video controls. Set to `false` to hide them
- `poster`: Poster image URL for native videos (not applicable to YouTube embeds)
