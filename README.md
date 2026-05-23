# RemindMatters

A modern full-stack application built with Astro, Supabase, and Starwind UI components.

Features:

- ✅ **Supabase Integration** - Authentication, database, and real-time features
- ✅ **Starwind UI Components** - Professional UI components with Pro blocks
- ✅ **Cloudinary Integration** - Image optimization and CDN delivery
- ✅ **TypeScript Support** - Full type safety with Astro Check
- ✅ **Content Management** - Markdown & MDX support with content collections
- ✅ **RSS & Sitemap** - Automatic RSS feed and sitemap generation
- ✅ **Responsive Design** - Mobile-first responsive layout
- ✅ **Modern Tooling** - Tailwind CSS v4, pnpm, and ES6 modules
- ✅ **Testing** - Vitest for unit testing
- ✅ **Linting** - ESLint with Astro and TypeScript support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                           |
| :---------------------- | :----------------------------------------------- |
| `pnpm install`          | Installs dependencies                            |
| `pnpm dev`              | Starts local dev server at `localhost:4321`      |
| `pnpm build`            | Build your production site to `./dist/`          |
| `pnpm preview`          | Preview your build locally, before deploying     |
| `pnpm astro ...`        | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`  | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
