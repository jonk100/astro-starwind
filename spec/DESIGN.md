# re:MindMatters — Design System & Creative Direction

## Core Design Principle

Visual design should communicate:
- restorative sanctuary
- editorial sophistication
- quiet, confident warmth
- biological and tactile authenticity

The interface is structured to act as a physical writing room and reading sanctuary. It rejects the hyper-vibrant, low-contrast, and fast-paced styling trends of tech dashboards in favor of a timeless, print-inspired, spacious editorial system that naturally calms the nervous system upon entry.

---

# Color System

Our color architecture is designed around semantic custom properties that seamlessly transition between light (Warm Ivory) and dark (Cozy Charcoal) themes. 

We completely prohibit high-saturation primaries, artificial "tech" blues, or distracting multi-colored gradients.

## 1. The Light Palette (Warm Ivory Sanctuary)
- **Background (`--background`)**: `#FAF9F6` (Warm Ivory) — A premium, warm white that minimizes eye strain and mimics high-quality linen book pages.
- **Surface (`--color-surface`)**: `#FFFFFF` (Pure white) — Used for notepad container cards.
- **Primary/Sage (`--color-primary`)**: `#5F7D6A` (Muted Calm Sage) — Symbolizing nature, restoration, growth, and calm.
- **Accent/Terracotta (`--color-accent`)**: `#D48D72` (Soft Terracotta) — Adding warm, cozy, human highlights to indicators, active buttons, and key focus loops.
- **Text (`--color-text`)**: `#2C302E` (Deep forest charcoal) — Soft, high-contrast, comfortable reading tone.
- **Muted Text (`--color-text-muted`)**: `#6E7571` (Muted stone grey) — For metadata, subtitles, and key bindings.
- **Border (`--color-border`)**: `rgba(44, 48, 46, 0.08)` — Quiet, physical hairline separations.

---

## 2. The Dark Palette (Cozy Charcoal Sanctuary)
- **Background (`--background`)**: `#121213` (Deep Cozy Ink) — Comfortable night reading.
- **Surface (`--color-surface`)**: `#18181A` (Cozy Slate Charcoal) — For notepad containers and panels.
- **Primary/Sage (`--color-primary`)**: `#82A38E` (Lighter Calm Sage) — Softened for comfortable contrast against dark slate.
- **Accent/Terracotta (`--color-accent`)**: `#E2A38A` (Softened Terracotta) — Warmly luminous highlights.
- **Text (`--color-text`)**: `#EAECEB` (Off-white linen) — Comfortable text contrast.
- **Muted Text (`--color-text-muted`)**: `#A2A8A5` (Soft mineral grey) — Secondary metadata.
- **Border (`--color-border`)**: `rgba(255, 255, 255, 0.06)` — Gentle dark hairline dividers.

---

# Typography System

Typography is the primary voice of our design. We pair an elegant, literary editorial serif for reading and headings with a stable, highly readable geometric sans-serif for functional controls and interfaces.

```
Headings & Quotes:    [ EB Garamond / Instrument Serif ] (Warm, Cinematic, Literate)
─────────────────────────────────────────────────────────────────────────────
Body & UI Labels:     [ Outfit / Inter ] (Highly Legible, Modern, Restrained)
```

## 1. Headline Typeface (Editorial Serif)
- **Primary Selection**: *EB Garamond* or *Instrument Serif* (from Google Fonts).
- **Style Rules**: Set with generous line-heights, tracking set slightly wider (`tracking-wide` or `0.02em`), and never rendered in ultra-compressed or heavy-black weights.
- **Emotion**: Literacy, historical depth, storytelling, calm wisdom.

## 2. Body & UI Typeface (Stable Sans-Serif)
- **Primary Selection**: *Outfit* or *Inter*.
- **Style Rules**: Set with a clean `font-weight: 500` for standard UI, `font-weight: 400` for compact body descriptors, and structured tracking.
- **Emotion**: Clarity, stability, accessibility, functional ease.

---

# Layout & Pacing Rules

Our page layouts follow strict structural guidelines to prevent visual clutter and cognitive strain:

## 1. Max-Width Reading Gutter
- **Rule**: Long-form editorial text (Essays, Guides) must be contained in a centered column with a maximum width of `680px` (`42.5rem`).
- **Reason**: Shorter measures prevent eye tracking fatigue, making deep reading feel effortless and highly restorative.

## 2. notepad Shell (Write App Connection)
- **Notepad Shell (`.tiptop-shell`)**: Must sat centered with a max-width of `820px`, with double-dashed borders creating a physical "tablet/writing slab" silhouette.
- **Connected Toolbar**: The formatting toolbar (`.tiptop-toolbar`) must sit perfectly flush against the top, left, and right borders of the notepad shell, removing all margins and using zero bottom border-radius to look like a premium slab device.
- **No Margin Tops**: The toolbar must be pressed flush against the top edge of the notepad paper, maximizing vertical screen height for focused writing.

## 3. Solid, Opaque Formatting Menus
- **Rule**: All dropdown panels, popovers, emoji selectors, and folder menus must have **100% solid, opaque backgrounds** (Warm Ivory `#FAF9F6` in light mode, Cozy Slate `#18181A` in dark mode).
- **Prohibition**: Transparency effects, backing blurs, or overlay opacities are strictly banned inside text-interactive panels. The text underneath must never bleed through, ensuring perfect readability and a premium, clean interface.

---

# Imagery & Graphics Direction

Visual imagery on re:MindMatters should support somatic grounding:
- **Style**: Soft-focus archival photography, clean botanical illustrations, textured paper scans, quiet landscapes, and warm, human-centric organic interactions.
- **Composition**: Spacious, asymmetrical, atmospheric, and natural.
- **Prohibitions**: Bright commercial stock photos, generic vector "flat art" characters, flashy neon overlays, or busy collages that distract from reading.
