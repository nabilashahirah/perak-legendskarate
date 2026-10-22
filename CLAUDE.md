@AGENTS.md

# CLAUDE.md: Perak Legends Karate Academy website

Live client website for Perak Legends Karate Academy (Perak United), *The Biggest in Perak*.
Pages: `/` (one long home page), `/centres` (locations & contact), and a custom 404.

## Stack
- Next.js 16 (App Router), **static export** (`output: "export"` in `next.config.ts`)
- React 19 + TypeScript
- Tailwind CSS v4 for all styling (utility classes in `className`)
- Motion for animations (lightbox, crest/parallax, reveal effects only)
- Hosting: Cloudflare Pages (pure static files in `out/`, no server)

## Where things live
- `src/content/site.ts`: **all site text and data** (coaches, programmes, centres, FAQ, links). Edit content here, not inside components.
- `src/types/content.ts`: TypeScript types for that content. Update types when the content shape changes.
- `src/components/sections/`: one component per home-page section (Hero, About, Programmes, Coaches, HallOfFame, Faq, …)
- `src/components/ui/`: shared building blocks (Button, SectionHeading, Lightbox, Reveal). Reuse these before creating new ones.
- `src/components/layout/`: Header, Footer, FloatingWhatsApp
- `src/app/`: routes plus `sitemap.ts`, `robots.ts`, `manifest.ts` (SEO)
- `scripts/`: `process-images.mjs` (image optimisation), `postbuild-flatten-rsc.mjs`, `deploy.mjs`

## Commands
- `npm run dev`: local dev server
- `npm run build`: static build to `out/` (must pass before any deploy)
- `npm run lint`: lint check
- `npm run images`: process new images before using them
- `npm run deploy`: build + deploy to Cloudflare Pages

## Rules
1. **Keep it fully static.** No API routes, server actions, middleware or anything that breaks `output: "export"`. Images stay `unoptimized`, so run `npm run images` for new photos.
2. **Content goes in `src/content/site.ts`**, typed by `src/types/content.ts`. Never hard-code academy details in JSX.
3. **Mobile first.** Most visitors are parents on their phones. Check every change at phone width.
4. **SEO on every page:** title, description and Open Graph metadata; keep `sitemap.ts` in sync when routes change.
5. **Accessibility:** meaningful `alt` text on images, keyboard-friendly lightbox, good colour contrast.
6. **Respect the client's wording.** Do not rewrite academy text, fees, schedules or coach names without asking. If a business detail is unclear, ask instead of guessing.
7. **Never commit secrets** or `.env` files.
8. **Small, focused changes.** Explain what changed and why, and run `npm run build` before saying a task is done. I review every diff before committing.
