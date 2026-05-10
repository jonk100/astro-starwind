# SVG Assets Documentation

## Overview

The SVG directory contains optimized vector icon assets used throughout the Astro website. These assets provide crisp, scalable graphics for social media links and other UI elements.

## Asset Files

### github.svg

**Purpose**: GitHub repository and source code link icon

**File Details**:
- **Path**: `/src/assets/svg/github.svg`
- **Size**: 673 bytes
- **Format**: Optimized SVG with proper viewBox and structure
- **Dimensions**: Designed for 24x24px display at default size
- **Color**: Uses `currentColor` for theme integration

**SVG Structure**:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <!-- GitHub logo paths -->
</svg>
```

**Usage**: Imported by `GitHubIcon.astro` component for consistent sizing and accessibility

---

### mastodon.svg

**Purpose**: Mastodon social media platform icon

**File Details**:
- **Path**: `/src/assets/svg/mastodon.svg`
- **Size**: 937 bytes
- **Format**: Optimized SVG with proper viewBox
- **Dimensions**: Designed for 24x24px display at default size
- **Color**: Uses `currentColor` for theme integration

**SVG Structure**:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <!-- Mastodon logo paths -->
</svg>
```

**Usage**: Imported by `MastodonIcon.astro` component for consistent sizing and accessibility

---

### twitter.svg

**Purpose**: Twitter social media platform icon

**File Details**:
- **Path**: `/src/assets/svg/twitter.svg`
- **Size**: 596 bytes
- **Format**: Optimized SVG with proper viewBox
- **Dimensions**: Designed for 24x24px display at default size
- **Color**: Uses `currentColor` for theme integration

**SVG Structure**:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <!-- Twitter logo paths -->
</svg>
```

**Usage**: Imported by `TwitterIcon.astro` component for consistent sizing and accessibility

---

## Asset Optimization

### File Size Considerations

- **github.svg**: 673 bytes - Moderate complexity, acceptable for logo
- **mastodon.svg**: 937 bytes - Higher complexity due to detailed mastodon design
- **twitter.svg**: 596 bytes - Simple design, efficient file size

### Performance Features

- **Optimized Paths**: All SVGs use efficient path commands
- **Proper ViewBox**: `viewBox="0 0 24 24"` for consistent scaling
- **CurrentColor Support**: All icons inherit color from parent element
- **Minimal Metadata**: Clean SVG structure without unnecessary bloat

---

## Integration Patterns

### Direct SVG Import

For cases where you want to use SVGs directly without the Icon wrapper:

```astro
---
import GitHub from '@/assets/svg/github.svg';
---

<GitHub width="24" height="24" class="icon-custom" />
```

### With Icon Wrapper

Recommended approach for consistent sizing and accessibility:

```astro
---
import { GitHubIcon } from '../icons';
---

<GitHubIcon size="md" />
```

---

## Best Practices

### SVG Design Guidelines

1. **Consistent ViewBox**: Use `viewBox="0 0 24 24"` for all icons
2. **CurrentColor**: Use `fill="currentColor"` for theme integration
3. **Optimized Paths**: Minimize anchor points and use efficient path commands
4. **Proper Scaling**: Design icons to look good at 24x24px
5. **Accessibility**: Include proper structure for screen readers

### File Organization

- Keep SVGs in dedicated `/assets/svg/` directory
- Use descriptive filenames matching the brand/service
- Maintain consistent file structure across the project

### Usage Guidelines

- Prefer Icon components over direct SVG imports for consistency
- Use size props for responsive design
- Leverage `currentColor` for theme integration
- Include proper alt text and accessibility labels

---

## Technical Specifications

### Browser Compatibility

- **Format**: SVG 1.1
- **Namespace**: `http://www.w3.org/2000/svg`
- **Fallback**: Supported in all modern browsers
- **Scaling**: Vector-based, infinite resolution

### Color Integration

- **Method**: `currentColor` CSS property
- **Fallback**: Inherits from parent text color
- **Override**: Can be set via `color` prop on Icon component

### Performance Impact

- **Rendering**: Hardware-accelerated in modern browsers
- **File Size**: Optimized for fast loading
- **Caching**: SVGs cache efficiently in browsers

---

## Troubleshooting

### Icon Not Displaying

- Check file path in import statement
- Verify SVG syntax is valid
- Ensure CSS custom properties are defined
- Check for conflicting styles

### Color Issues

- Verify `currentColor` is supported
- Check parent element has color set
- Test color inheritance in different themes

### Scaling Problems

- Verify viewBox is set correctly
- Check for explicit width/height overrides
- Test responsive behavior at different sizes

---

## Asset Management

### Adding New Icons

1. Create optimized SVG file in `/src/assets/svg/`
2. Create corresponding Icon component in `/src/components/icons/`
3. Update documentation in both directories
4. Test across different themes and sizes

### Updating Existing Icons

1. Modify SVG file directly for design changes
2. Update Icon component if interface changes
3. Test with existing implementations
4. Update documentation accordingly

---

## Integration Examples

### Social Media Links

```astro
---
import { GitHubIcon, MastodonIcon, TwitterIcon } from '../icons';
---

<div class="social-links">
  <a href="https://github.com/user/repo" class="social-icon">
    <GitHubIcon size="lg" />
  </a>
  <a href="https://mastodon.social/@user" class="social-icon">
    <MastodonIcon size="lg" />
  </a>
  <a href="https://twitter.com/user" class="social-icon">
    <TwitterIcon size="lg" />
  </a>
</div>
```

### Custom Icon Usage

```astro
---
import CustomIcon from '../icons/CustomIcon.astro';
import customSvg from '@/assets/svg/custom-icon.svg';
---

<CustomIcon>
  <svg width="24" height="24" viewBox="0 0 24 24">
    <!-- Custom SVG content -->
  </svg>
</CustomIcon>
```

---

## Performance Optimization

### SVG Minification

Consider using SVG optimization tools for production:

- **SVGO**: Removes unnecessary metadata and optimizes paths
- **Manual Optimization**: Remove comments, metadata, and optimize paths
- **Gzip Compression**: Server-side compression for delivery

### Loading Strategy

- **Critical Icons**: Inline in HTML for above-the-fold content
- **Lazy Loading**: Consider for non-critical icons
- **Preload**: Use `<link rel="preload"> for important icons

---

## Accessibility Guidelines

### Screen Reader Support

- Use `aria-label` on icon components
- Provide `role="img"` for standalone icons
- Use `aria-hidden="true"` for decorative icons
- Include descriptive alt text

### Keyboard Navigation

- Ensure icons in links are focusable
- Test tab order and focus indicators
- Provide skip links for icon navigation

### Color Contrast

- Test icons with different theme colors
- Ensure sufficient contrast ratios
- Test in high contrast mode

---

## Theme Integration

### CSS Custom Properties

Icons automatically inherit from CSS custom properties:

```css
:root {
  --icon-color: #3b82f6;
  --icon-hover: #2563eb;
}

.social-icon {
  color: var(--icon-color);
}

.social-icon:hover {
  color: var(--icon-hover);
}
```

### Dark Mode Support

Icons using `currentColor` automatically adapt to theme changes:

```css
[data-theme="dark"] .social-icon {
  color: #ffffff;
}

[data-theme="dark"] .social-icon:hover {
  color: #60a5fa;
}
```

---

## Maintenance

### Regular Updates

- Review icon licensing and attribution
- Update icons to match brand guidelines
- Optimize file sizes regularly
- Test across different browsers and devices

### Brand Consistency

- Follow official brand guidelines for social media icons
- Maintain consistent style across all icons
- Update when brands change their logos

---

## File Naming Conventions

### Recommended Pattern

- Use lowercase, hyphenated names
- Match service/platform name
- Include version suffix if needed: `github-v2.svg`

### Examples

- `github.svg` - GitHub repository icon
- `mastodon.svg` - Mastodon social platform
- `twitter.svg` - Twitter social platform
- `linkedin.svg` - LinkedIn professional network
- `email.svg` - Email communication icon
