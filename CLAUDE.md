# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on port 1977 (http://localhost:1977)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint checks
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm release` - Create a new release with bumpp

## Architecture Overview

This is an Astro-based portfolio and blog site using the Vitesse theme with the following key integrations:

### Core Stack
- **Astro 4** - Static site generator with Vue component support
- **Vue 3** - For interactive components (.vue files)
- **UnoCSS** - Atomic CSS framework with custom shortcuts and themes
- **MDX** - Enhanced markdown with component support
- **TypeScript** - Full type safety

### Content Management
- **Astro Content Collections** - Type-safe content management
  - `blog/` - Blog posts with frontmatter schema validation
  - `pages/` - Static pages
- **Content Schema** - Defined in `src/content/config.ts` with date transformation and validation

### Styling Architecture
- **UnoCSS Configuration** - Custom theme shortcuts in `uno.config.ts`
  - Dark/light theme variables (`bg-main`, `text-main`, etc.)
  - Component shortcuts (`nav-link`, `prose-link`, etc.)
  - Icon safelist for build optimization
- **Global Styles** - Organized in `src/styles/` directory
  - `global.css` - Base styles and CSS variables
  - `prose.css` - Typography styles for content
  - `dot.css` - Decorative elements

### Site Configuration
- **Central Config** - `src/site-config.ts` contains all site metadata, navigation, and social links
- **URL Structure**:
  - Blog posts: `/blog/[slug]` (served from `/posts/[slug].astro`)
  - Pages: `/[slug]` (catch-all route)
  - Projects: `/projects/`

### Key Components
- **Layout System** - `BaseLayout.astro` with `BaseHead.astro` for SEO
- **Vue Components** - Header, Footer, ThemeToggle, ListPosts, etc.
- **Content Utilities** - `src/utils/posts.ts` for content processing

### Build & Deployment
- **Git Hooks** - Pre-commit linting with lint-staged
- **ESLint** - Antfu's config with Astro and Vue plugins
- **Static Generation** - Builds to `dist/` for deployment

### Development Notes
- Server runs on port 1977 (configured in astro.config.ts)
- Content is type-safe with Zod schemas
- UnoCSS provides utility-first styling with custom theme variables
- Analytics tracking scripts are included in BaseHead component