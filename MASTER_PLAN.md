# Queen.Raae.Codes - Laravel/Jigsaw Migration Master Plan

## Project Overview

Migrating from Gatsby to Laravel Jigsaw static site generator while maintaining all content and core features. The site will be rebuilt with a clean, maintainable Laravel-based architecture.

---

## Phase 1: Migration Plan

### 1.1 Initial Jigsaw Setup
- [ ] Install Jigsaw in current repository
- [ ] Configure basic Jigsaw structure
- [ ] Set up Tailwind CSS 3.x
- [ ] Configure build process

### 1.2 Content Migration Strategy

**Content to Migrate:**
- ✅ All blog posts from `posts-queen/` (262+ markdown files)
- ✅ All blog posts from `posts-olavea/`
- ✅ Landing pages from `landing/`
- ✅ Talks section from `talks/`
- ✅ Testimonials from `testimonials/`

**Migration Approach:**
- Keep separate `posts-queen/` and `posts-olavea/` directories for writing
- Mix posts chronologically in listings
- Maintain current URL structure: `/YYYY/MM/DD/article-slug/`
- Preserve YAML frontmatter structure

### 1.3 Homepage Design

**Layout:**
1. **Hero Section** - Intro text with YouTube live stream info
2. **Latest 7 Articles** - Mixed from both authors, sorted by date
3. **Info About Me** - Bio section with:
   - Queen Raae description + photo (raae.jpg)
   - Family photo (family.jpg)
   - Cap'n Ola description
   - Pirate Princess Lillian mention
   - Link to YouTube weekly treasure hunts
   - Maintain pirate/sailing theme 🏴‍☠️

**Note:** About page will be added later (Phase 2)

### 1.4 Core Features to Implement

#### Required Features:
- [x] **Tags** - Keep tag system on articles
- [x] **Related Posts** - Implement similar posts feature
- [x] **Syntax Highlighting** - For code blocks (Prism.js or similar)
- [x] **Tailwind Styling** - Light, friendly, emoji-based Queen theme
- [x] **Talks Section** - Speaking engagements display
- [x] **Testimonials** - Testimonials display

#### Content Organization:
- Posts listing page showing all articles (mixed authors)
- Individual post pages with full content
- Tag archive pages
- Landing pages for products/services

### 1.5 Styling & Theme

**Design Goals:**
- Light and friendly aesthetic
- Queen emoji-based theme 👑
- Pirate/sailing motifs 🏴‍☠️
- Maintain general vibe (not pixel-perfect)
- Responsive design
- Clean, readable typography

**Colors & Style References:**
- Extract from current Tailwind config
- Keep signature green dress vibe
- Maintain YouTube/social brand consistency

### 1.6 Technical Requirements

**Build Process:**
- Static HTML generation via Jigsaw
- Optimized for deployment (Netlify or similar)
- Fast build times
- SEO-friendly output

**Content Processing:**
- Parse markdown with frontmatter
- Generate slugs from date patterns
- Handle images and assets
- Create RSS feed
- Implement redirects if needed

---

## Phase 2: Future Features & Restructuring

**To be discussed and filled in...**

### Ideas to Explore:
-
-
-

### Potential Enhancements:
-
-
-

### Nice-to-Haves:
-
-
-

---

## Migration Phases Timeline

### Phase 1A: Setup (Current)
- Jigsaw installation
- Basic configuration
- Tailwind setup

### Phase 1B: Content Foundation
- Blog post collection setup
- Homepage implementation
- Basic styling

### Phase 1C: Features
- Tags & related posts
- Syntax highlighting
- Talks & testimonials

### Phase 1D: Polish & Deploy
- Final styling
- Testing
- Deployment setup

---

## Questions & Decisions Log

### Decisions Made:
- ✅ Use Jigsaw (Laravel's static site generator)
- ✅ Build in current repository on branch `claude/laravel-static-site-OnXAE`
- ✅ Keep all content (262+ markdown files)
- ✅ Separate author directories, mixed in listings
- ✅ Homepage shows latest 7 articles
- ✅ Keep tags, related posts, syntax highlighting
- ✅ Maintain current URL structure
- ✅ Keep Tailwind styling (general vibe, not pixel-perfect)
- ✅ Migrate talks and testimonials sections
- ✅ Info about me starts on homepage (about page later)

### Open Questions:
- (none currently)

---

## Notes

- Current Gatsby site remains functional during migration
- Jigsaw will be built alongside/replace Gatsby setup
- Focus on feature parity first, then enhancements
