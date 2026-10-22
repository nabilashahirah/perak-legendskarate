@AGENTS.md

# CLAUDE.md: Perak Legends Karate Academy website

Live client website for Perak Legends Karate Academy (Perak United), *The Biggest in Perak*.
Live at https://perakkarate.com. Pages: `/` (one long home page), `/centres` (locations & contact), and a custom 404.

## Stack
- Next.js 16 (App Router), **static export** (`output: "export"`, `images.unoptimized` in `next.config.ts`)
- React 19 + TypeScript
- Tailwind CSS v4 for all styling (utility classes in `className`)
- Motion (`motion/react`) for the Lightbox, ParallaxCrest and Header; `Reveal` uses IntersectionObserver
- lucide-react for icons
- Hosting: Cloudflare Pages, project `perakkarate` in the academy's own Cloudflare account

## Where things live
- `src/content/site.ts`: **all site text and data** (site info, contact and WhatsApp messages, nav, hero, programmes, Hall of Fame, students, coaches, centres, FAQ). Edit content here, not inside components.
- `src/types/content.ts`: TypeScript types for that content. Update types when the content shape changes.
- `src/components/sections/`: one component per home-page section (Hero, About, Founder, Programmes, HallOfFame, Students, Coaches, Faq, FinalCta, …)
- `src/components/ui/`: shared building blocks (Button, SectionHeading, Lightbox, Reveal, BrandIcons). Reuse these before creating new ones.
- `src/components/layout/`: Header, Footer, FloatingWhatsApp
- `src/components/centres/`: centres directory and map
- `src/app/`: routes plus `sitemap.ts`, `robots.ts`, `manifest.ts`; metadata in `layout.tsx`, `centres/page.tsx`, `not-found.tsx`
- `scripts/`: `process-images.mjs`, `postbuild-flatten-rsc.mjs`, `deploy.mjs`

## Commands
- `npm run dev`: local dev server
- `npm run build`: static build to `out/` (runs `postbuild` automatically)
- `npm run lint`: lint check
- `npm run images`: regenerate optimised images in `public/` from the originals in `assets-raw/`
- `npm run deploy`: build, then upload `out/` to Cloudflare Pages (needs `npx wrangler login` with the academy account)

## Rules
1. **Keep it fully static.** No API routes, server actions, middleware or anything that breaks `output: "export"`.
2. **Do not remove `scripts/postbuild-flatten-rsc.mjs`.** Next 16's static export nests segment-prefetch files that Cloudflare Pages would otherwise 404 on.
3. **Content goes in `src/content/site.ts`**, typed by `src/types/content.ts`. Never hard-code academy details in JSX.
4. **New photos:** put the original in `assets-raw/` (not committed), add a row to `JOBS` in `scripts/process-images.mjs`, run `npm run images`, then use the output path and size in `site.ts`. Every image needs meaningful `alt` text.
5. **Mobile first.** Most visitors are parents on their phones. Check every change at phone width and with large system text, so no text is clipped or hidden.
6. **Respect reduced motion.** Use `useReducedMotion` (Motion) or `prefers-reduced-motion`, and keep animations light.
7. **SEO:** keep metadata on every page, and update `sitemap.ts` when routes change.
8. **Respect the client's wording.** Do not change academy text, fees, schedules, coach names or locations without asking. If a business detail is unclear, ask instead of guessing.
9. **Never commit secrets** or `.env` files.
10. **Small, focused changes.** Explain what changed and why, and run `npm run build` before saying a task is done. I review every diff before committing.

## Lessons I learned on this project
- Next.js 16 static export broke client-side prefetch on Cloudflare Pages (404s), so I added the postbuild script that fixes the file paths.
- Parents with big phone text saw clipped or hidden headings, so I now always test with large system text.
- Coach names, centres and photos changed several times during the project, so all content lives in `site.ts` and I never edit text inside components.
