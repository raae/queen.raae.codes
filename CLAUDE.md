# CLAUDE.md

Development guidelines for queen.raae.codes — an Astro site deployed on Netlify.

## Quick reference

```shell
npm run dev        # Start dev server at localhost:4321
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run prettier   # Format code
```

## Architecture

- **Framework**: Astro 5 with MDX, Tailwind CSS, Sharp image processing
- **Content**: Astro Content Collections with Zod schemas (`src/content/config.ts`)
- **Routing**: File-based routing in `src/pages/`; trailing slashes enforced
- **Deployment**: Netlify (config in `netlify.toml`)
- **OG images**: Generated with Satori + Sharp in `src/lib/og-image.ts`
- **RSS feeds**: Built with `@astrojs/rss` in `src/lib/feed.ts`

## Content collections

| Collection       | Type    | Location                      | Format   |
| ---------------- | ------- | ----------------------------- | -------- |
| `posts-queen`    | content | `src/content/posts-queen/`    | Markdown |
| `posts-olavea`   | content | `src/content/posts-olavea/`   | Markdown |
| `landing`        | content | `src/content/landing/`        | Markdown |
| `talks`          | content | `src/content/talks/`          | Markdown |
| `tags`           | data    | `src/content/tags/`           | YAML     |
| `testimonials`   | data    | `src/content/testimonials/`   | YAML     |

Blog post paths follow the pattern: `posts-queen/YYYY/MM/DD-slug/index.md`

## Key files

- `astro.config.mjs` — Astro config: site URL, integrations (MDX, Tailwind, Sitemap)
- `tailwind.config.js` — Custom brown color palette, typography plugin with custom prose
- `netlify.toml` — Build config and redirects (legacy email URLs, speaker shortcuts)
- `src/content/config.ts` — Zod schemas for all content collections
- `src/data/siteMetadata.js` — Site name, URL, description, social links
- `src/lib/posts.ts` — Post fetching, sorting, tag aggregation, related posts
- `src/lib/og-image.ts` — OG image generation (1200x628, per-author styling)
- `src/lib/feed.ts` — RSS feed generation (separate feeds per author)
- `src/layouts/BaseLayout.astro` — Root HTML layout with meta tags and Fathom analytics
- `src/components/Newsletter.astro` — ConvertKit signup form with multiple form IDs

## Environment variables

- `PUBLIC_CK_API_KEY` — ConvertKit API key (see `.env.example`)

## Coding conventions

- Astro components in `src/components/`, pages in `src/pages/`
- Tailwind utility classes for styling; custom brown color palette defined in `tailwind.config.js`
- Prettier for formatting (config in `.prettierrc`); run `npm run prettier` before committing
- Always run `npm run lint` before pushing
- Two authors supported: "queen" (Queen Raae) and "olavea" (Cap'n Ola) with separate content collections and RSS feeds

## Gotchas

- The repo is named `queen.raae.codes-gatsby` for historical reasons — the project has been fully migrated to Astro
- Trailing slashes are enforced (`trailingSlash: 'always'` in astro config)
- The `content/` directory at the project root mirrors `src/content/` — the canonical source is `src/content/`
- OG image generation uses Satori which renders a JSX-like structure to SVG, then Sharp converts to PNG
- Newsletter form IDs are mapped by key in `src/components/Newsletter.astro` (e.g., QUEEN, BOOTCAMPS, REMINDERS)
- Sitemap excludes `/search/`, `/tag/*`, and subscription management pages
