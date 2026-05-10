# TODO

## Consent to cookies and stuff

[astro-consent](https://github.com/zdenekkurecka/astro-consent#readme) ?

`pnpm astro add @zdenekkurecka/astro-consent`

## Astro meta engine

[astro-meta-engine](https://github.com/TheElegantCoding/astro-meta-engine#readme)

`pnpm i -D astro-meta-engine`

## Search plugin

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

