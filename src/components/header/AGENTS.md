# Header Components Documentation

## Overview

The header components provide a complete navigation system for the Astro website, featuring a responsive layout with dropdown menus, logo, and social media icons. The system is built with modular components that can be easily customized and extended.

## Components

### Header.astro

**Purpose**: Main header container that orchestrates all header components in a responsive layout.

**Props**: None (uses fixed component structure)

**Usage**:

```astro
---
import Header from '@/components/header/Header.astro';
---

<Header />
```

**Features**:

- Responsive flex layout (horizontal on desktop, vertical on mobile)
- Teal background color
- Consistent spacing and shadows
- Border bottom for visual separation
- Auto margins for centering

**Styling**:

- Uses `bg-teal-400` for background
- Responsive breakpoint at 768px
- Box shadow and border for depth
- Flexible padding that adjusts on mobile

---

### HeaderLogo.astro

**Purpose**: Renders the site logo with optimized image handling.

**Props**: None (uses fixed logo asset)

**Usage**:

```astro
---
import HeaderLogo from '@/components/header/HeaderLogo.astro';
---

<HeaderLogo />
```

**Features**:

- Uses Astro's Image component for optimization
- Fixed height of 50px for consistency
- Automatic alt text for accessibility
- Direct link to homepage

**Dependencies**:

- `astro:assets` Image component
- Logo asset from `/src/assets/logo-black.png`

---

### HeaderMenu.astro

**Purpose**: Main navigation menu with dropdown functionality for blog sections.

**Props**: None (uses utility functions for navigation data)

**Usage**:

```astro
---
import HeaderMenu from '@/components/header/HeaderMenu.astro';
---

<HeaderMenu />
```

**Features**:

- Horizontal navigation layout
- Dropdown menu for blog sections (All Posts, Categories, Tags)
- Responsive design with mobile considerations
- Consistent styling with hover effects
- Active state handling for navigation items

**Navigation Structure**:

- Home (direct link)
- Blog (dropdown with sub-items)
  - All Posts
  - Categories  
  - Tags
- About (direct link)

**Styling Features**:

- Flex layout with centered alignment
- Responsive font sizing using `clamp()`
- Hover effects with scale transformation
- Color transitions matching site theme
- Pulse animation for active dropdown state
- Full-width dropdown on mobile

**Dependencies**:

- Starwind dropdown components
- Button component
- HeaderLink component
- Utility functions from `@/lib/utils.ts`

**CSS Classes**:

- `.internal-links`: Main navigation container
- `.dropdown-full-width`: Full-width dropdown styling
- `.submenu-item`: Individual dropdown item styling

---

### HeaderIcons.astro

**Purpose**: Social media icon links with consistent hover effects.

**Props**: None (uses fixed icon set)

**Usage**:

```astro
---
import HeaderIcons from '@/components/header/HeaderIcons.astro';
---

<HeaderIcons />
```

**Features**:

- Three social media links (Mastodon, Twitter, GitHub)
- Consistent hover effects matching navigation
- Accessibility with screen reader only text
- External link handling with `target="_blank"`

**Icon Set**:

- Mastodon: `https://m.webtoo.ls/@astro`
- Twitter: `https://twitter.com/astrodotbuild`
- GitHub: `https://github.com/withastro/astro`

**Styling**:

- Flex layout with consistent spacing
- Hover effects with scale transformation
- Color transitions matching site theme
- Responsive design considerations

**Dependencies**:

- Icon components from `../icons/`
- SVG assets from `@/assets/svg/`
- Base Icon wrapper from `../ui/icon/Icon.astro`
- CSS custom properties for theming

---

## Icons Directory Structure

The icons directory contains individual icon components that wrap SVG assets for consistent sizing and styling.

### Directory Organization

```sh
/src/components/icons/
├── index.ts              # Barrel export for all icons
├── GitHubIcon.astro       # GitHub repository icon
├── MastodonIcon.astro      # Mastodon social media icon
└── TwitterIcon.astro       # Twitter social media icon
```

### Available Icons

#### GitHubIcon.astro

- **SVG Source**: `@/assets/svg/github.svg`
- **Purpose**: GitHub repository link
- **Size Options**: xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
- **Default Size**: md (20px)
- **Default Color**: `currentColor` (inherits from parent)
- **Component Path**: `/src/components/icons/GitHubIcon.astro`

#### MastodonIcon.astro

- **SVG Source**: `@/assets/svg/mastodon.svg`
- **Purpose**: Mastodon social media link
- **Size Options**: xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
- **Default Size**: md (20px)
- **Default Color**: `currentColor` (inherits from parent)
- **Component Path**: `/src/components/icons/MastodonIcon.astro`

#### TwitterIcon.astro

- **SVG Source**: `@/assets/svg/twitter.svg`
- **Purpose**: Twitter social media link
- **Size Options**: xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
- **Default Size**: md (20px)
- **Default Color**: `currentColor` (inherits from parent)
- **Component Path**: `/src/components/icons/TwitterIcon.astro`

#### index.ts

- **Purpose**: Barrel export for easy imports
- **Exports**: All icon components for clean import statements
- **Usage**: `import { GitHubIcon, TwitterIcon, MastodonIcon } from '../icons';`

---

## Icon Component Architecture

### Base Icon Wrapper (`../ui/icon/Icon.astro`)

**Purpose**: Provides consistent sizing, accessibility, and styling wrapper for SVG icons.

**Key Features**:

- **Responsive Sizing**: Maps named sizes to pixel values
- **Color Inheritance**: Uses `currentColor` by default to inherit from parent
- **Accessibility**: Automatic ARIA labeling and role assignment
- **CSS Custom Properties**: Sets `--icon-size` for dynamic sizing
- **Slot Pattern**: Accepts SVG content or icon components as children

**Props Interface**:

```typescript
interface Props {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  px?: number;
  color?: string;
  label?: string;
  class?: string;
  style?: string;
}
```

**Size Mapping**:

```typescript
const SIZE_MAP: Record<NonNullable<Props["size"]>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};
```

---

## SVG Assets Directory (`@/assets/svg/`)

### Asset Files

#### github.svg

- **Path**: `/src/assets/svg/github.svg`
- **Size**: 673 bytes
- **Format**: Optimized SVG with proper viewBox

#### mastodon.svg

- **Path**: `/src/assets/svg/mastodon.svg`
- **Size**: 937 bytes
- **Format**: Optimized SVG with proper viewBox

#### twitter.svg

- **Path**: `/src/assets/svg/twitter.svg`
- **Size**: 596 bytes
- **Format**: Optimized SVG with proper viewBox

---

## Icon Usage Examples

### Basic Usage

```astro
---
import { GitHubIcon, TwitterIcon, MastodonIcon } from '../icons';
---

<GitHubIcon size="xl" />
<TwitterIcon size="lg" color="#1DA1F2" />
<MastodonIcon size="md" class="custom-class" />
```

### With Custom Styling

```astro
---
import { GitHubIcon } from '../icons';
---

<GitHubIcon 
  size="xl" 
  color="var(--accent-color)"
  class="hover:scale-110"
  style="transition: transform 0.2s ease"
/>
```

### With Explicit Pixel Size

```astro
---
import { TwitterIcon } from '../icons';
---

<TwitterIcon px={28} />
```

### Accessibility Features

- **Automatic ARIA Labels**: Icons inherit accessible labels from props
- **Screen Reader Support**: Proper role assignment for decorative vs functional icons
- **Keyboard Navigation**: Icons are focusable when wrapped in links
- **Color Contrast**: Inherits from parent or uses explicit colors

---

## Icon Integration in HeaderIcons.astro

The `HeaderIcons.astro` component demonstrates best practices for icon usage:

```astro
---
import { GitHubIcon, MastodonIcon, TwitterIcon } from '../icons';
---

<div class="header-icons">
  <a href="https://github.com/withastro/astro" target="_blank" class="icon-link">
    <span class="sr-only">Go to Astro's GitHub repo</span>
    <GitHubIcon size="xl" color="" />
  </a>
  
  <a href="https://twitter.com/astrodotbuild" target="_blank" class="icon-link">
    <span class="sr-only">Follow Astro on Twitter</span>
    <TwitterIcon size="xl" />
  </a>
  
  <a href="https://m.webtoo.ls/@astro" target="_blank" class="icon-link">
    <span class="sr-only">Follow Astro on Mastodon</span>
    <MastodonIcon size="xl" />
  </a>
</div>
```

**Key Integration Points**:

- Uses `size="xl"` for consistent large icon sizing
- Wraps each icon in semantic link with proper `target="_blank"`
- Includes screen reader only text for accessibility
- Applies consistent `icon-link` class for hover effects
- Leverages `currentColor` for theme integration

---

## Integration Guide

### Basic Setup

```astro
---
import Header from '@/components/header/Header.astro';
import Layout from '@/layouts/Layout.astro';
---

<Layout>
  <Header />
  <main>
    <!-- Your content here -->
  </main>
</Layout>
```

### Customization

#### Logo Customization

Replace the logo asset in `HeaderLogo.astro`:

```astro
import CustomLogo from '@/assets/custom-logo.png';
```

#### Navigation Items

Modify navigation in `@/lib/utils.ts`:

```typescript
export function getNavItems() {
  return [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
  ];
}

export function getBlogPages() {
  return [
    { label: 'All Posts', href: '/blog/' },
    { label: 'Categories', href: '/blog/categories/' },
    { label: 'Tags', href: '/blog/tags/' },
    { label: 'Archive', href: '/blog/archive/' },
  ];
}
```

#### Social Links

Update social media links in `HeaderIcons.astro`:

```astro
<a href="https://linkedin.com/company" target="_blank" class="icon-link">
  <span class="sr-only">Follow on LinkedIn</span>
  <LinkedInIcon size="xl" />
</a>
```

#### Theme Customization

Modify CSS custom properties in global styles:

```css
:root {
  --color-primary-300: rgb(100, 150, 200);
  --primary-accent: rgb(50, 100, 150);
  /* Add more theme colors */
}
```

---

## Responsive Behavior

### Desktop (>768px)

- Horizontal header layout
- Flex items: logo, navigation, icons
- Dropdown appears as full-width horizontal menu
- Hover effects on all interactive elements

### Mobile (≤768px)

- Vertical header layout
- Stacked components with gap
- Adjusted padding for touch targets
- Maintained hover effects

---

## Accessibility Features (Additional)

- Semantic HTML5 header element
- Proper ARIA labels for dropdown triggers
- Screen reader only text for icon links
- Keyboard navigation support through starwind components
- Focus states for all interactive elements
- Semantic link structure for navigation

---

## Performance Considerations

- Image optimization through Astro's Image component
- CSS transitions for smooth interactions
- Minimal JavaScript dependency
- Efficient CSS custom properties
- Responsive font sizing with clamp()

---

## Troubleshooting

### Dropdown Not Opening

- Check starwind dropdown dependencies
- Verify CSS custom properties
- Ensure button `aria-expanded` state handling
- Check for conflicting position styles

### Icon Styling Issues

- Verify CSS custom properties are defined
- Check icon component imports
- Ensure consistent class naming
- Test hover state transitions

### Responsive Layout Problems

- Verify breakpoint values
- Check flex direction changes
- Test spacing on mobile devices
- Validate container widths

---

## Best Practices

1. **Consistent Styling**: Use the same hover effects and colors across all navigation elements
2. **Responsive Design**: Test layouts on various screen sizes
3. **Accessibility**: Always include proper ARIA labels and screen reader support
4. **Performance**: Optimize images and minimize JavaScript usage
5. **Modularity**: Keep components focused and reusable
6. **Theme Integration**: Use CSS custom properties for consistent theming
