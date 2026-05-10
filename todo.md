# TODO

## TypeScript Errors & Code Review Fixes

### High Priority (Critical - Blocking Build)

- [x] **Fix ButtonVariants Export Issue** - Pagination components can't find ButtonVariants export
  - Location: `src/components/starwind/pagination/PaginationNext.astro:6:10`
  - Location: `src/components/starwind/pagination/PaginationPrevious.astro:6:10`

- [x] **Fix BlogPost Description Type** - Undefined description prop causing type error
  - Location: `src/layouts/BlogPost.astro:18:27`

- [x] **Fix Blog Categories Page Types** - Implicit 'any' types in map functions
  - Location: `src/pages/blog/category/[category].astro:21:37`

- [x] **Fix Blog Tag Pages Types** - Unknown type assignments throughout tag pages
  - Location: `src/pages/blog/tag/[tag].astro` (multiple lines: 71, 77, 97, 119)
  - Location: `src/pages/blog/tags.astro` (multiple lines: 29, 137)

- [x] **Fix Theme Toggle Memory Leak** - activeToggles Set never cleared during page transitions
  - Location: `src/components/starwind/theme-toggle/ThemeToggle.astro:173-175`

- [x] **Fix Theme Toggle Race Condition** - Initialization state synchronization issues
  - Location: `src/components/starwind/theme-toggle/ThemeToggle.astro:106-109`

### Medium Priority

- [x] **Fix Dropdown Null Reference** - Potential runtime error in focus management
  - Location: `src/components/starwind/dropdown/Dropdown.astro:421-422`

- [x] **Enhance CI/CD Security** - Add dependency scanning to prevent supply chain attacks
  - Location: `.github/workflows/ci.yml:26`

### Low Priority (Code Quality)

- [x] **Clean Up Unused Imports** - Remove unused imports across 20+ files
  - Files affected: BaseHead.astro, BlogIndexLayout.astro, BlogPost.astro, BlogPostLayout.astro, Layout.astro, about.astro, blog pages, etc.

- [x] **Remove Commented CSS** - Clean up redundant styles in HeaderMenu
  - Location: `src/components/header/HeaderMenu.astro:89-104`

- [x] **Update README.md** - Reflect current project state and features
  - Updated with Starwind UI, modern tooling, and comprehensive feature list

## Feature Requests

### Consent to cookies and stuff

[astro-consent](https://github.com/zdenekkurecka/astro-consent#readme) ?

`pnpm astro add @zdenekkurecka/astro-consent`

### Astro meta engine

[astro-meta-engine](https://github.com/TheElegantCoding/astro-meta-engine#readme)

`pnpm i -D astro-meta-engine`

### Search plugin

[astro-search-plugin](https://github.com/freshjuice-dev/astro-search-plugin)

```astro
---
// src/layouts/BaseLayout.astro
import "@freshjuice/astro-search-plugin/styles.css";
---

<html>
  <body>
    <slot />

    <astro-search-palette
      index-url="/search-index.json"
      shortcut="mod+k"
      placeholder="Search…"
      group-by="type"
    ></astro-search-palette>

    <script>
      // Side-effect import: registers <astro-search-palette> globally
      import "@freshjuice/astro-search-plugin/element";
    </script>
  </body>
</html>
```

