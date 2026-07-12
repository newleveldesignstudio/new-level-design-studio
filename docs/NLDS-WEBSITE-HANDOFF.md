# NLDS Website Handoff

> Reference documentation. `CLAUDE.md` at the repo root is the active source
> of truth and wins on any conflict with this file. Last verified: 2026-07-11.
> Companions: `docs/PROJECT_OVERVIEW.md` (architecture)
> and `docs/GAPS_AND_WEAKNESSES.md` (honest audit).

## 1. Current production state

- **Production URL:** https://newlvlstudio.com
- **Latest deployed commit:** `8cdf24c` (production-audit P0 fixes; four
  local-SEO journal articles ids 34–37 live since `d4ed7b4`; GA4 + conversion
  events live since `b5541e6`, 2026-07-06) — full audit + live verification
  2026-07-11
- **Sitemap:** all manifest routes (72 URLs as of 2026-07-11 — the count grows
  with new articles/pages), all trailing-slashed, `/ops` excluded
- **2026-07-11 audit result:** all 72 pages verified — unique titles and meta
  descriptions, correct self-referencing canonicals, exactly one H1 per page,
  complete OG/Twitter tags, zero broken internal links, robots.txt + sitemap
  healthy, contact form + tel/mailto intact. Two P0s found and fixed in
  `8cdf24c`: (1) `kimi-plugin-inspect-react` shipped `code-path` source-path
  attributes on every production element — now dev-only; (2) the prerender's
  blind 3s Helmet wait let slow CI capture pages before the JSON-LD script
  landed (the four newest articles went live schema-less) — prerender now
  waits for the ld+json node, bounded and non-fatal.
- **Prerender:** every sitemap route renders to static HTML in `dist/`; the
  build fails if any manifest route renders Page Not Found
- **Build command:** `npm run build:full` (tsc + vite build + Playwright
  prerender + sitemap trailing-slash fix). Plain `npm run build` produces an
  UN-prerendered dist — never deploy that.
- **Deploy workflow:** commit to `master` → push to GitHub
  (`newleveldesignstudio/new-level-design-studio`) → Netlify CI runs
  `npx playwright install chromium && npm run build:full` and publishes
  `dist/`. Site ID lives in `.netlify/state.json`. Deploys take ~4 minutes.
  **Only deploy with Michael's explicit approval in the current session.**

## 2. Repo structure overview

| What | Where |
|---|---|
| Pages (route-level) | `src/pages/` (Home, Services, Works, work case studies, local pages, journal, contact, local-visibility pages) |
| Shared components | `src/components/` (SEO, Navigation, Footer, Layout, cards, ScrollTriggerSequence, etc.) |
| Data | `src/data/` — `articles.ts` (journal articles; count grows over time), `routes.ts` (route manifest), `serviceTerminology.ts` (canonical service names + contact-form options) |
| Route control | `src/App.tsx` (React routes, manual) + `src/data/routes.ts` (sitemap/prerender manifest) |
| Social links | `src/lib/socialLinks.ts` — single source for footer, Contact social nav, and LocalBusiness `sameAs` |
| Runtime image assets | `public/nlds/images/`, `public/images/`, `public/files/nlds/images/` |
| Source-only assets (NOT deployed) | `assets-src/scroll-trigger/{desktop,tablet}/` — see its README |
| Approved brand assets | `brand-assets/approved/` (see `.claude/skills/nlds-canva/asset-rules.md`) |
| Build/utility scripts | `scripts/` — `prerender.mjs`, `optimize-images.mjs`, `prepare-scroll-trigger-frames.mjs`, `image-manifest.json` |

## 3. Critical source-of-truth files

- `CLAUDE.md` — active project instructions (asset rules, edit scope, QA bar,
  deploy gate). `AGENTS.md` is only a pointer to it. CC handles the
  Facebook/Instagram/GBP content workflow; any other agents must follow
  `CLAUDE.md`.
- `src/data/routes.ts` — THE route manifest. Drives the sitemap
  (vite.config.ts) which drives the prerender (scripts/prerender.mjs reads
  dist/sitemap.xml). Add every new public route here AND in App.tsx; the
  prerender fails the build if a manifest route renders Page Not Found.
- `src/data/articles.ts` — journal content; article routes derive from it
  automatically.
- `src/lib/socialLinks.ts` — the 7 verified profiles. YouTube is
  `https://www.youtube.com/@newlvlstudio1` (confirmed by Michael); the old
  `@newlvlstudio` handle is a dead 404, never re-add it.
- `scripts/optimize-images.mjs` — sharp pipeline. For any new heavy image:
  add its path to `CONTENT_IMAGES`, run `node scripts/optimize-images.mjs`,
  reference the generated `.webp` (+ `-w768.webp` in srcset) from code.
  Originals stay in place (they are og:image targets and pipeline sources).
- Scroll-trigger frames: **source** in `assets-src/scroll-trigger/`
  (desktop 96 @2560px, tablet 80 @1600px), **runtime** in
  `public/images/scroll-trigger/{desktop-optimized,tablet-optimized,mobile}/`.
  `ScrollTriggerSequence.tsx` CONFIG points at the runtime dirs.

## 4. Do-not-break list

The authoritative do-not-break rules live in `CLAUDE.md` (route-manifest
coverage, contact-form Netlify fields + `?service=` preselect, schema privacy,
`build:full`-only deploys, the deploy approval gate, fabrication bans, and
locked-asset rules). Details this file adds beyond `CLAUDE.md`:

- **`assets-src/scroll-trigger/` is load-bearing.** The upstream raw frames
  (`tmp/scroll-trigger-source-frames`) no longer exist; these are the ONLY
  source for regenerating runtime frames. Never delete.
- Optimized runtime frames must stay in
  `public/images/scroll-trigger/*-optimized/` (and `mobile/`).
- `SOCIAL_LINKS` feeds footer + Contact social nav + LocalBusiness `sameAs`.
  One edit changes all three — that is intentional; never fork them.
- Concept builds must never imply real client outcomes. Keep "Concept Build"
  / "Industry Demo" labels, ConceptDisclosure, and the Works-page disclosure.
  Never reintroduce "not paid client work" *phrasing* on prominent cards —
  use the confident "built by NLDS to show…" framing instead. Works chips
  stay demonstration-framed ("Demo focus: …"), never outcome-framed — the
  data field is named `result`; don't let that invite outcome language.

## 5. Current validated systems (all live at 57b4e6d)

- **Route manifest** — single source; sitemap/prerender structurally coupled;
  Page-Not-Found prerender guard active on every build.
- **Sitemap/prerender** — all manifest routes (67 at that commit; the count
  grows with new articles/pages); unique titles + one correct
  self-referencing canonical per page (verified live across all of them).
- **Image pipeline** — 35.5MB of originals serve as ~2.5MB WebP derivatives
  with srcset/dimensions; Home ~2.8MB mobile / ~4.5MB desktop images.
- **Scroll-trigger frames** — runtime q68 sets (desktop 3.8MB / tablet 1.8MB /
  mobile 2.4MB), sources outside the deploy (~15MB saved per deploy).
- **Contact form** — Netlify-registered, honeypot, no-JS native submit works,
  service preselect via query param.
- **Schema** — LocalBusiness (7 sameAs, image, logo, inline founder),
  WebSite, Person, Service ItemList (/services), Blog (/journal), Article
  (+publisher logo, mainEntityOfPage), FAQPage (packages + local pages).
- **Social links** — 7 verified live profiles from one source.
- **Works filters** — `?industry=<slug>` URL-driven (9 filters addressable).
- **Services anchors** — `#website-design`, `#website-care`,
  `#website-copy-visual-support` with Lenis-aware reduced-motion scrolling.
- **Reduced motion** — honored site-wide, including Packages and Starter Pack
  word animations.
- **NotFound** — noindex,nofollow + strips inherited canonical; unknown URLs
  are non-indexable (HTTP 200 is inherent to the SPA fallback).
- **CTA hierarchy** — primary "Start a Website Project", secondary
  "View Packages", low-friction "Get a Free Website Review" (2 placements);
  Contact H1 "Start Your Website Project." with review as secondary path.

## 6. Remaining website backlog

**Decided (2026-07-06) — geo/hours schema:**
NLDS is home-based and service-area focused. **Do not publish Michael's home
street address or exact geo coordinates in schema. Do not add openingHours
schema unless Michael explicitly approves public business hours for schema
use.** Use `areaServed`, locality, region, and service-area signals instead
(all present and verified). GBP hours (9–6) are managed in GBP directly —
never from this repo. This is a deliberate privacy/business decision, not a
missing SEO defect. A guard comment sits on `localBusinessSchema()` in
`src/components/SEO.tsx`.

**Needs Michael's decision:**
- Aureline demo: rename the Netlify site (currently
  `harmonious-sorbet-38230a.netlify.app`) to a branded subdomain, then
  restore the demo CTA on `WorkAurelineEstates.tsx`.
- Journal video-era articles (~14 of 30): keep, reframe, or de-emphasize.
- Tablet hamburger below 1280px — confirm intentional or lower breakpoint.
- Search Console watch: Home H1 (city names moved to supporting copy) and
  Contact title (project-first) after the 57b4e6d conversion pass.

**Safe technical polish:**
- Stamp `data-rh="true"` in prerender `cleanHead()` so hydrated pages don't
  show a duplicate identical canonical (cosmetic, zero SEO impact today).
- Rename Works data field `result` → `demoFocus`.
- Add Coffee & Cafés and Law Firms to the Works nav dropdown.
- Per-article og:images (everything outside Works uses the default JPG).
- From the 2026-07-11 audit (P2, copy approval needed): 29 meta descriptions
  run 166–211 chars (truncated in SERPs, not a defect) and 2 titles exceed
  65 chars (`google-business-profile-vs-website`, `stone-timber-remodeling`).
- Optional: JSON-LD on `/contact`, `/studio`, and `/works/*` (schema is not
  mandated there by CLAUDE.md; decide before adding).
- Note: `cleanHead()`'s schema keep-filter had a `code-path` shortcut that is
  now inert in production (attributes are dev-only); the old-base filter path
  keeps all Helmet schemas correctly — verified 2026-07-11.

**Content strategy:**
- Real sections/pages for the three unmapped Services dropdown items
  (Website Redesign, Brand Direction, Local SEO Structure) — TODOs already in
  Navigation.tsx.
- Journal reframing pass (after Michael's decision above).

**Future trust/conversion:**
- Genuine testimonials/reviews near decision points when they exist (never
  fabricated).
- Optional axe/Lighthouse accessibility pass (never formally run).
- Optional AVIF variants / hero-frame idle loading if performance budgets
  tighten.
