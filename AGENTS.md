# AGENTS.md

## Setup commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build for production: `pnpm build`
- Preview production build: `pnpm preview`
- Type check: `pnpm typecheck`
- Lint: `pnpm lint`
- Run tests: `pnpm test`
- Generate Supabase types: `pnpm db:types`

## Project structure
- This is a full-stack Astro application with Supabase backend
- Blog posts are located in `src/content/blog/`
- Components are in `src/components/` (organized by feature: apps, blog, cloudinary, etc.)
- Server actions are in `src/actions/`
- Static assets go in `public/`
- Supabase configuration in `supabase/`

## Code style
- TypeScript strict mode enabled
- Astro components use `.astro` extension
- Tailwind CSS v4 for styling with Starwind UI components
- Use functional patterns where possible
- ESLint configured for Astro and TypeScript

## Starwind UI
- Project uses Starwind Pro for UI components
- Initialize new components with Starwind CLI
- Component documentation available at starwind.dev
- Starwind components are in `src/components/starwind/`

## Supabase
- Authentication and database via Supabase
- Server actions in `src/actions/` handle Supabase operations
- Type-safe database queries with generated TypeScript types
- Run `pnpm db:types` after schema changes

## Cloudinary
- Image optimization and CDN via Cloudinary
- Cloudinary components in `src/components/cloudinary/`
- Use astro-cloudinary for image handling

## Content guidelines
- Blog posts use Markdown format in `src/content/blog/`
- Follow existing post structure for consistency
- Include frontmatter with title, date, and other metadata

## Testing
- Run `pnpm test` to run Vitest tests
- Run `pnpm build` to verify production build
- Check for TypeScript errors with `pnpm typecheck` before committing
- Run `pnpm lint` to check code style
- Test dev server locally with `pnpm dev`
