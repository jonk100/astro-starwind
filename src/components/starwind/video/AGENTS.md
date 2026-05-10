# Video Component

## Purpose and Usage

The Video component is a unified video component that automatically detects video type and renders either a native HTML5 `<video>` element or a YouTube `<iframe>` embed. Use it for displaying local videos, remote video files, or YouTube videos including shorts.

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Video source - accepts imported video assets, direct URLs, or YouTube URLs |
| `title` | `string` | `"Video"` | Used as iframe title for YouTube embeds (accessibility) |
| `autoplay` | `boolean` | `false` | Auto-starts playback. For YouTube, sets autoplay=1 parameter |
| `muted` | `boolean` | `false` | Mutes the video. Required for autoplay in most browsers |
| `loop` | `boolean` | `false` | Loops the video. For YouTube, also sets playlist parameter |
| `controls` | `boolean` | `true` | Shows video controls. Set to false to hide them |
| `poster` | `string` | - | Poster image URL for native videos (not applicable to YouTube) |
| `class` | `string` | - | Additional CSS classes for styling |

## Usage Examples

### Native Video with Local File
```astro
---
import navVideo from "@/assets/videos/starwind-pro_nav-3-responsive.mp4";
import { Video } from "@/components/starwind/video";
---

<Video src={navVideo} controls muted class="rounded-lg" />
```

### YouTube Video
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

## Features

- **Automatic detection**: Detects video type from source URL
- **YouTube support**: Handles standard YouTube URLs, short URLs, and embed URLs
- **YouTube Shorts**: Automatically detected and rendered appropriately
- **Privacy-enhanced**: Uses youtube-nocookie.com for YouTube embeds
- **Native video support**: Local files, imported assets, or direct video URLs

## Accessibility Notes

- Always provide meaningful `title` for YouTube embeds
- The component uses privacy-enhanced YouTube embeds
- For native videos, ensure `controls` is enabled for user control
- Consider providing captions for accessibility

## Additional Notes

- For YouTube videos, the component handles URL parsing automatically
- YouTube Shorts may need custom aspect ratio classes for proper display
- `poster` prop only applies to native videos, not YouTube embeds
- `autoplay` requires `muted` to work in most browsers
