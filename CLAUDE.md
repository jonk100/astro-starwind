# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a modern, high-performance blog built with Astro and Starwind UI components. It features TypeScript support, Tailwind CSS v4, content collections for blog posts, and integrations for RSS, sitemap, and SEO.

## Development Commands

All commands are run from the root of the project using pnpm:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start local development server at http://localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview the built site locally
- `pnpm astro` - Run Astro CLI commands (e.g., `pnpm astro add`, `pnpm astro check`)
- `pnpm typecheck` - Run TypeScript type checking via Astro Check
- `pnpm lint` - Run ESLint for code linting

## Project Structure

- `src/pages/` - Astro pages that become website routes

- `src/content/` - Content collections (blog posts in Markdown/MDX under `src/content/blog/`)
- `src/content/docs/` - Documentation content (MDX files)

- `src/components/` - Reusable UI components
- `src/components/starwind/` - Starwind UI components. [Full documentation available locally](src/content/docs/starwind-ref.md)
- `src/components/sectional/` - Sectional display components commonly used on pages
- `src/components/layout/` - Reusable components commonly found in [sectional display components](src/components/sectional/)
- `src/components/layout/primitives/` - Reusable layout primitives used in [other layout components](src/components/layout/)

- `src/layouts/` - Layout components (nesting: BlogPostLayout → Layout → BaseHead)
- `src/assets/` - Static assets (images, fonts, etc.)
- `public/` - Static assets served directly (favicon, etc.)
- `src/data/` - Data files (constants, types, etc.)
- `src/app/` - Application-specific code (routes, API endpoints, etc.)
- `src/actions/` - Astro actions for form handling and server-side logic
- `src/lib/` - Utility libraries and helpers
- `src/styles/` - CSS/Tailwind configuration and global styles

Key configuration files:
- `astro.config.mjs` - Astro configuration (integrations, build options), Vite configuration including tailwindcss
- `tsconfig.json` - TypeScript configuration
- `content.config.ts` - Content collections schema for blog and docs

The blog uses Astro's Content Collections for type-safe frontmatter on MDX files. Styling is done with Tailwind CSS v4.