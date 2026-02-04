# Task: Remove Gatsby focus from home page

## Goal
Transform the home page from a Gatsby-focused landing into a traditional personal/professional intro page with posts and newsletter signup — while keeping the existing visual design and layout structure.

## Context
The site (queen.raae.codes) has been fully migrated from Gatsby to Astro, but the home page still prominently features Gatsby-related services and copy. Queen's current focus has shifted to: Outseta developer advocacy, speaking about AI/Claude Code, and side projects. The Gatsby positioning is outdated.

The page should feel more like a classic personal site: intro about who Queen is, recent posts to browse, and newsletter signup.

## Scope

**In scope:**
- Update `src/pages/index.astro` — page structure
- Update `src/content/landing/index.md` — intro copy and frontmatter
- Update copy in the "Products & Services" section (or remove/rename it)
- Update the "Who are we?" section — keep Queen intro and family outro, remove Gatsby references
- Remove or update any Gatsby-focused CTAs

**Out of scope:**
- Changing the visual design, colors, typography, or layout structure
- Touching any components (`PageSection`, `Newsletter`, `Posts`, etc.) — these stay as-is
- Creating new pages or services
- Changing anything outside the home page
- Updating the Noteworthy section (keep as-is)
- Newsletter component functionality

## Preflight
Verify before starting. If any fail, STOP and report what's missing.
- [ ] Can read `src/pages/index.astro`
- [ ] Can read `src/content/landing/index.md`
- [ ] Dev server starts (`npm run dev`)
- [ ] Site renders at localhost:4321

## Autonomy
🟢 Full autonomy — run until done.

Stop and ask if:
- You're unsure what services/products to highlight (if any)
- You'd need to create new components or pages
- Copy decisions feel like they need Queen's voice/approval

## Acceptance Criteria
Self-verify each before marking complete:
- [ ] No mentions of "Gatsby" anywhere on the home page
- [ ] No mentions of "Gatsby Emergency Call", "Gatsby Code Review", or "Done-for-you Gatsby Demo"
- [ ] Intro section introduces Queen Raae as a web developer, builder, and fractional CTO/DevRel
- [ ] Posts section remains (latest posts with "more" link)
- [ ] Newsletter signup appears in header section and at the bottom
- [ ] "Who are we?" section still includes Queen intro and family outro, but without Gatsby/pirate waters framing
- [ ] Page renders without errors
- [ ] Existing design/layout is preserved — same sections, same visual structure

## Constraints
- **Environment:** Dev only, do not deploy
- **Stack:** Astro 5, Tailwind CSS, MDX
- **Do NOT:** Change component files — only page and content files
- **Do NOT:** Remove the Newsletter component or Posts component
- **Style:** Keep the pirate brand personality where it fits naturally, but don't force it
- **Tone:** Professional but warm, direct communication (matches Queen's goals: "practical, no fluff")

## Copy Guidance

Use these sources for tone and content:

**For intro (from bios.md):**
> Benedicte (Queen) Raae is a Norwegian web developer who loves jamming together side projects for fun and profit. She works as a fractional CTO for Whee and Developer Advocate for Outseta.

**For positioning (from goals.md):**
- Focus on: sustainable lifestyle business, speaking authority, AI-native positioning
- Values: galskap (pursue what's exciting), margins, joy as compass, ship over dream

**For family section (from family.md):**
- Partner: Ola (also business partner in Lilly Labs)
- Daughter: Lillian
- Lilly Labs is the "piratical family business" — named after Lillian and Queen's grandmother

**Suggested structure:**
1. **Header section:** Brief intro to Queen + what she does now + newsletter signup
2. **Posts section:** Keep as-is (latest posts)
3. **Noteworthy section:** Keep as-is (talks, webinars)
4. **About section:** Who is Queen, who is the family, what is Lilly Labs
5. **Newsletter section:** Keep as-is (final CTA)

The "Products & Services" section can be removed entirely OR transformed into something lighter (like "What I'm working on" with brief mentions of Outseta work, speaking, and side projects).

## Reference
- Current page: `src/pages/index.astro`
- Landing content: `src/content/landing/index.md`
- Site architecture: `CLAUDE.md`
- Queen's current focus: Outseta DX strategy, OpenClaw talk (Feb 2026), side projects
