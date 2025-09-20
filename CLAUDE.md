# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on port 1977 (http://localhost:1977)
- `pnpm build` - Build for production (static export to /out)
- `pnpm start` - Preview production build locally
- `pnpm lint` - Run ESLint checks
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm release` - Create a new release with bumpp

## Architecture Overview

This is a Next.js 15-based portfolio and blog site with full static export and internationalization.

### Core Stack
- **Next.js 15** - React framework with App Router and static export
- **React 19** - UI components
- **TypeScript** - Full type safety
- **UnoCSS** - Atomic CSS framework with custom shortcuts and themes
- **MDX** - Enhanced markdown with component support via next-mdx-remote

### Internationalization (i18n)
- **next-intl** - Internationalization library compatible with static export
- **Supported Languages**: French (fr) and English (en)
- **Default Language**: French
- **URL Structure**: `/[locale]/...` (e.g., `/fr/blog/`, `/en/blog/`)
- **Browser Language Detection**: Automatic redirect based on navigator.language
- **Translation Files**: `/src/messages/{fr,en}.json`

### Content Management
- **Blog Posts** - Markdown/MDX files in `/src/content/blog/{fr,en}/`
- **Post Processing** - Gray-matter for frontmatter parsing
- **Syntax Highlighting** - rehype-highlight for code blocks
- **Date Formatting** - date-fns with locale support

### URL Structure
- Home: `/[locale]/` (e.g., `/fr/`, `/en/`)
- Blog list: `/[locale]/blog/`
- Blog post: `/[locale]/blog/[slug]`
- Projects: `/[locale]/projects/`
- RSS Feed: `/[locale]/rss.xml`

### Styling Architecture
- **UnoCSS Configuration** - Custom theme shortcuts in `uno.config.ts`
  - Dark/light theme variables (`bg-main`, `text-main`, etc.)
  - Component shortcuts (`nav-link`, `prose-link`, etc.)
  - Icon safelist for build optimization
- **Global Styles** - `src/styles/globals.css`
- **Theme Toggle** - Dark/Light/Auto mode with localStorage persistence

### Key Components
- **Layout** - `/src/app/[locale]/layout.tsx` with Header and Footer
- **Header** - Language switcher, navigation, theme toggle
- **PostList** - Blog post listing component
- **ThemeToggle** - Dark/light mode switcher

### Site Configuration
- **Central Config** - `src/site-config.ts` contains site metadata and social links
- **i18n Config** - `src/i18n.ts` and `src/i18n/request.ts` for locale handling

### Build & Deployment
- **Static Export** - `output: 'export'` in next.config.mjs
- **Output Directory** - Builds to `/out` for static hosting
- **Git Hooks** - Pre-commit linting with lint-staged
- **ESLint** - Next.js core-web-vitals configuration

### Important Notes
- All pages must use `setRequestLocale(locale)` for static generation
- Dynamic params in Next.js 15 are Promises (must await them)
- RSS feeds are generated as static routes with generateStaticParams
- The site is fully static and can be hosted on any static hosting service

### Development Notes
- Server runs on port 1977 (configured in package.json)
- UnoCSS integrated via webpack plugin
- Analytics tracking with Tinylytics
- All blog posts should have matching translations with translationKey frontmatter