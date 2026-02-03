# Queen Raae

> Sailing the high seas of the World Wide Web

Personal blog and product showcase for [queen.raae.codes](https://queen.raae.codes) — built with Astro and deployed on Netlify.

## Tech stack

- **Framework**: [Astro](https://astro.build/) with MDX
- **Styling**: Tailwind CSS with Typography and Forms plugins
- **Deployment**: Netlify
- **Newsletter**: ConvertKit
- **Analytics**: Fathom
- **OG Images**: Satori + Sharp (generated at build time)
- **Code Quality**: Prettier, Husky, CommitLint, Playwright

## Getting started

```shell
npm install
```

Copy `.env.example` to `.env` and add your ConvertKit API key:

```shell
cp .env.example .env
```

Start the dev server:

```shell
npm run dev
```

The site runs at `http://localhost:4321`.

## Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Astro dev server                   |
| `npm run build`   | Build the production site to `dist/`         |
| `npm run preview` | Preview the production build locally         |
| `npm run prettier`| Format code (JS, TS, JSON, MDX, Astro files) |

## Project structure

```
src/
├── assets/            # Fonts for OG image generation
├── components/        # Reusable Astro components
├── content/           # Astro Content Collections
│   ├── posts-queen/   # Queen Raae's blog posts (~227)
│   ├── posts-olavea/  # Cap'n Ola's blog posts (~20)
│   ├── landing/       # Landing page data
│   ├── talks/         # Speaking engagements
│   ├── tags/          # Tag metadata (YAML)
│   └── testimonials/  # Testimonial data (YAML)
├── data/              # Site metadata
├── layouts/           # Base HTML layout
├── lib/               # Utilities (feeds, OG images, post helpers)
├── pages/             # File-based routes
└── global.css         # Tailwind directives and global styles
```

## Content

Blog posts live in `src/content/posts-queen/` organized by date: `YYYY/MM/DD-slug/index.md`. Content schemas are defined with Zod in `src/content/config.ts`.

### Content collections

- **posts-queen** / **posts-olavea** — Blog posts with frontmatter: title, emojii, tags, brands, peeps, projects
- **landing** — Multi-section landing pages with CTAs, forms, and images
- **talks** — Speaking engagements with event info and recordings
- **tags** — Tag labels and disclaimers (YAML)
- **testimonials** — Customer testimonials (YAML)

## Deployment

The site deploys to Netlify automatically. Configuration is in `netlify.toml`:

- **Build command**: `npm run build`
- **Publish directory**: `dist/`
- **Redirects**: Legacy `/emails/*` URLs, speaker shortcuts, sitemap rewrite

## Environment variables

| Variable            | Description          |
| ------------------- | -------------------- |
| `PUBLIC_CK_API_KEY` | ConvertKit API key   |
