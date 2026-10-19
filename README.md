# Perak Legends Karate Academy — website

Marketing site for **Perak Legends Karate Academy (Perak United)**, *The Biggest in Perak*.

- **Stack:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · Motion
- **Pages:** `/` (home, one long page) · `/centres` (locations & contact) · custom 404
- **Hosting:** Cloudflare Pages (pure static files, no server)

---

## Run it locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000 (live reload)
```

Production build (exactly what Cloudflare deploys):

```bash
npm run build      # writes the static site to out/
npx serve out      # preview it at http://localhost:3000
```

---

## Edit the content

**All text, achievements, centres, links and image paths live in one file:**
[`src/content/site.ts`](src/content/site.ts). You never need to touch components to update content.

| To change… | Edit in `site.ts` |
|---|---|
| WhatsApp number, Instagram, TikTok | `contact` |
| Book-a-Trial WhatsApp message | `trialMessage` (and `centreTrialMessage` for per-centre buttons; `{centre}` is replaced with the centre name) |
| Hero, About, Founder, Programmes text | `hero`, `about`, `founder`, `programmes` |
| Scrolling achievements ticker | `marquee` |
| Hall of Fame scoreboard, athletes, posters | `hallOfFame` (see note below) |
| Classes by age, FAQ | `programmes.groups`, `faq` |
| Coaches gallery | `coaches.items` |
| Centre addresses, maps, schedules | `centres` |
| Site domain (for SEO / sitemap) | `site.url` |

Search the file for **`TODO`** to find everything that's still missing.

### Centres
The HQ (Buntong, `isHQ: true`) is shown as a featured card with an embedded map; the other centres are a simple list.
- `address`: optional street address (the area is shown when it's missing).
- `mapQuery`: what the embedded map searches for. Only centres with a `mapQuery` get a map (currently just the HQ, which uses its Google listing name so the pin is exact).
- `mapUrl`: the Google Maps share link for the **Open in Google Maps** button.
- `schedule`: a list of `{ day, time, group }` rows. While it's empty the page says *"Message us on WhatsApp for current class times"*. Example:
  ```ts
  schedule: [
    { day: "Tuesday", time: "8:00pm – 9:30pm", group: "Kids (6–12)" },
    { day: "Saturday", time: "9:00am – 11:00am", group: "All levels" },
  ],
  ```

### Hall of Fame
`hallOfFame` in `site.ts` has three parts:
- `results`: the scoreboard cards (event, headline like `"3rd"`, medal counts, short notes). Each entry notes which poster its figures came from.
- `athletes`: real photos of medallists. The first image is the card; all images open in the lightbox.
- `posters`: the client's result posters, shown as a small archive strip and opened full-size in the lightbox.

### Programmes by age, FAQ
- `programmes.groups`: age-group cards (name, ages, description, details). **The "Classes by age" block stays hidden until this has at least one entry.** An example is in the comment.
- `faq.items`: questions and answers. They're also published as FAQ structured data for Google. Commented TODO questions (ages, fees, what to bring) are ready to fill in.

### Adding or replacing photos
1. Put the original photo in `assets-raw/` (this folder is git-ignored and keeps the untouched originals).
2. Add a line to the `JOBS` list in [`scripts/process-images.mjs`](scripts/process-images.mjs) (optionally with a crop).
3. Run `npm run images`. It writes an optimised WebP (max 1600px) plus a 600px `-sm` thumbnail to `public/images/…` and prints each image's width × height.
4. Reference the new path and dimensions in `src/content/site.ts`.

The same script regenerates the logo variants, favicons/app icons and the Open Graph image (`public/og-image.jpg`).

---

## Deploy to Cloudflare Pages

1. Push this repository to GitHub (or GitLab).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → choose the repo.
3. Build settings:
   - **Framework preset:** `Next.js (Static HTML Export)`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - Environment variable (recommended): `NODE_VERSION` = `22`
4. **Save and Deploy.** Every push to the main branch redeploys automatically.
5. After connecting a custom domain, update `site.url` in `src/content/site.ts` so canonical URLs, the sitemap and social-share images point at it.

Notes:
- No Vercel-specific features are used; the build output is plain HTML/CSS/JS.
- `npm run build` also runs `scripts/postbuild-flatten-rsc.mjs`, a small workaround for Next 16.4's static export (it copies route prefetch files to the file names the client router requests, so link prefetching works on static hosts).

---

## Project structure

```
src/
  app/                 routes: page.tsx (home), centres/, not-found.tsx, robots/sitemap/manifest
  components/
    layout/            Header, Footer, floating WhatsApp button
    sections/          Home page sections (Hero, About, Founder, Programmes, HallOfFame, Coaches, Faq…)
    centres/           Centres directory (HQ card with map + list) and lazy map embed
    ui/                Buttons, Lightbox, Reveal (scroll animation), CountUp, brand icons
  content/site.ts      ← ALL editable content
  lib/links.ts         WhatsApp / Google Maps URL helpers
  types/content.ts     Content types (shared with a future admin)
scripts/               Image pipeline + post-build step
public/images/         Optimised images (generated)
assets-raw/            Client originals (git-ignored)
```

### Future `/admin` (Supabase)
The site is ready for a client-side admin to be added later:
- Content shapes are defined once in `src/types/content.ts`; an admin can read/write the same types from Supabase tables (protected by Row Level Security).
- Add the dashboard as `src/app/admin/` (client components only, since the site stays a static export) using `@supabase/supabase-js` with the public anon key in `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Public sections would then fetch from Supabase on the client, falling back to `site.ts`.
- `/admin` is already disallowed in `robots.txt`.

---

## Design system

Defined as CSS variables + Tailwind theme tokens in [`src/app/globals.css`](src/app/globals.css):

- Backgrounds `#0A0A0A` / `#121212` / `#1A1A1A`; text `#F2F0EA`, muted `#A8A39A`
- Gold sampled from the crest: `#F8C850` → `#E8A828` → `#9A5A0A`; CTA yellow `#FFC72C`
- Type: Bebas Neue (display, uppercase) + Inter (body)
- All motion respects `prefers-reduced-motion`.
