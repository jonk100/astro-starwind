# HeroCard Components

Large, prominent hero cards for featuring important blog posts with impactful designs.

## Components

### HeroCard
A large hero card with multiple style variants for featured content.

**Props:**
- `post: BlogPost` - Blog post data
- `style?: HeroCardStyle` - Visual style ('classic', 'modern', 'minimal', 'overlay')
- `href?: string` - Link URL (defaults to `/blog/${post.slug}`)
- `showAuthor?: boolean` - Show author (default: true)
- `showReadTime?: boolean` - Show reading time (default: true)
- `class?: string` - Additional CSS classes

**HeroCardStyle Options:**
- `'classic'`: Traditional card with border and shadow
- `'modern'`: Gradient overlay with modern typography
- `'minimal'`: Clean, minimal design with subtle borders
- `'overlay'`: Full image overlay with text on top

**Usage:**
```astro
<HeroCard 
  post={featuredPost}
  style="modern"
  showAuthor={true}
/>
```

### HeroCardLarge
An even larger version of HeroCard with enhanced visual impact.

**Props:** Same as HeroCard

**Usage:**
```astro
<HeroCardLarge 
  post={mainFeature}
  style="overlay"
  showReadTime={true}
/>
```

## Style Variants

### Classic Style
Traditional blog card styling with:
- Card background and borders
- Standard typography
- Subtle shadows
- Clean separation of elements

### Modern Style
Contemporary design featuring:
- Gradient overlays
- Bold typography
- Accent colors
- Smooth transitions

### Minimal Style
Clean and simple design with:
- Minimal borders
- Subtle colors
- Focus on typography
- Clean whitespace

### Overlay Style
Image-focused design with:
- Full-width background image
- Text overlay on image
- Gradient masks for readability
- High visual impact

## Responsive Design

- **Desktop**: Full width with large typography
- **Tablet**: Scaled down appropriately
- **Mobile**: Stacked layout with adjusted typography

## Accessibility

- Semantic heading structure
- High contrast text on overlays
- Keyboard navigation support
- Screen reader friendly

## Performance

- Optimized image loading
- CSS transitions for smooth animations
- Minimal JavaScript
- Static generation friendly

## Examples

### Modern Featured Article
```astro
<HeroCard 
  post={todayFeature}
  style="modern"
  showAuthor={true}
  showReadTime={true}
/>
```

### Minimal Homepage Hero
```astro
<HeroCard 
  post={minimalFeature}
  style="minimal"
  showAuthor={false}
/>
```

### Full-Width Overlay Hero
```astro
<HeroCardLarge 
  post={heroPost}
  style="overlay"
  href="/blog/featured"
/>
```
