# NLDS Website Audit — PAUSED (Report Only)

> **REPORT-ONLY FILE. This is NOT an active instruction file.**
> This file preserves in-progress audit findings from 2026-07-05. It must not
> be treated as build rules, design rules, or agent instructions. No agent
> should act on this file without an explicit human request to resume the audit.

**Status:** Paused mid-audit on 2026-07-05 at Michael's request, before scoring
and before proposing changes. No website files were edited. Audit was
read-only.

**Repo:** `~/nlds/new-level-design-studio` (newlvlstudio.com)
**Stack (verified):** Vite 7 + React 19 + TypeScript + Tailwind 3, react-router 7,
react-helmet-async, custom Playwright prerender (`scripts/prerender.mjs`),
vite-plugin-sitemap, Netlify (`build:full` = build + prerender).

---

## Findings preserved so far

### Technical SEO

1. **Soft 404s** — `public/_redirects` SPA fallback (`/* /index.html 200`)
   returns HTTP 200 for unknown URLs. `NotFound.tsx` has no
   `<meta name="robots" content="noindex">` and sets a canonical of
   `https://newlvlstudio.com/404`. Unknown URLs are indexable 200 pages.
2. **Orphaned page** — `src/pages/WorkBlendHouseSmoothieBar.tsx` has **no route
   in App.tsx**, is not in the Works grid, sitemap, or prerender list. Its
   canonical (`/works/blend-house-smoothie-bar`) resolves to the 404 page.
   Dead code; decide: wire up or remove.
3. **Route-list parity is currently OK** — App.tsx routes, vite.config.ts
   sitemap `dynamicRoutes`, `scripts/prerender.mjs` ROUTES, and
   `src/data/articles.ts` (32 slugs) are all in sync today, but they are four
   manually-maintained lists — high drift risk. Recommendation direction:
   generate sitemap + prerender lists from one shared route manifest.
4. **Prerender BASE_TITLE/BASE_DESC mismatch** — constants in
   `scripts/prerender.mjs` (lines 96–98) do not match the actual static
   `index.html` title ("Port Orange Web Design | ...") and description. The
   dedup filter in `cleanHead()` therefore never recognizes the static tags as
   "base." Live titles come from `page.title()` so titles are OK, but
   description/canonical dedup relies on order — fragile.
5. **Titles/descriptions/canonicals unique** across all pages (verified). All
   pages render `<SEO>` (local pages via `LocalLandingPage`). H1 present on
   all public pages (local pages get theirs from `LocalLandingPage`).
6. **Schema** — LocalBusiness + WebSite on Home; Person on /michael-vail;
   FAQPage on /packages and local pages; Article on journal details. Gaps:
   `/services` has no Service/schema markup; `/journal` has no Blog/ItemList
   schema; Work pages mostly lack CreativeWork schema. LocalBusiness schema
   lacks `geo`, `openingHours`, and `image`; `sameAs` has only Facebook.
7. **robots.txt** fine (AI crawlers allowed, sitemap declared,
   Content-Signal). `_headers` links llms.txt. `.well-known/agent-skills`
   exists. OpsDashboard (`/ops`) correctly sets noindex,nofollow at runtime and
   is excluded from sitemap/prerender.
8. **Redirect hygiene** — one legacy 301 for the ghost Central Florida URL is
   present and correct.
9. Both `react-router` and `react-router-dom` v7 are dependencies (redundant in
   v7; both bundled into vendor-react chunk).

### Local SEO

- Strong: 4 dedicated local pages with unique copy + FAQPage schema, NAP
  consistent (Port Orange, FL 32127 / (386) 846-5754 / michael@newlvlstudio.com)
  across footer, contact, schema, llms.txt. GBP linked from footer, trust band,
  contact. Service-area chips on Contact.
- Works dropdown "category" links (Contractors, Restaurants, …) all point to
  plain `/works` with no filter — weak internal linking + mild UX bait; TODO
  comments in Navigation.tsx acknowledge future category/service pages.
- Services dropdown: 6 links all to `/services` (no anchors/subpages yet).

### Conversion

1. **Contact form has no "Visual Starter Pack" option** —
   `CONTACT_SERVICE_OPTIONS` in `src/data/serviceTerminology.ts` omits it, yet
   `/starter-pack` has 5 CTAs pointing to /contact.
2. **Starter Pack naming inconsistent** — "$129 Starter Pack" (page title/SEO),
   "Business Starter Pack" (page copy), "Visual Starter Pack" (llms.txt +
   local-page links). Also collides verbally with "Starter Website ($499)".
3. Package cards link to `/contact` without preselecting the package
   (contact form ignores query params). Opportunity: `?service=core-website`
   prefill support.
4. Contact success copy says "1–2 business days" while sidebar says "within
   one business day" — contradiction.
5. CTA system otherwise consistent ("Start With a Free Website Review"
   everywhere; nav CTA "Free Website Review").
6. No form fallback without JS (prerendered HTML form intercepted by React;
   no `action` attribute) — minor.

### Trust / proof

- Honest concept labeling is exemplary: all 14 (15 incl. orphan) Work pages
  render `ConceptDisclosure`; Works data uses `classification: 'Concept Build'
  / 'Industry Demo'`; Home trust band says "10+ Independent Concept Builds …
  not paid client work." No fabricated testimonials/metrics found anywhere
  (scanned articles for % and results claims — clean).
- Packages FAQ explicitly refuses ranking guarantees — good.
- No client testimonials/reviews exist yet near decision points (expected —
  none may be fabricated; placeholder strategy is a business decision).

### Performance (biggest issues found)

1. `public/nlds/images/new-level-design-studio-premium-website-hero-intro.png`
   is **12MB** and appears **unreferenced** in src — likely orphan asset.
2. ~20 referenced PNGs at 1.5–3.1MB each (Works thumbnails, Home sections,
   Studio). Home alone ships roughly 8–10MB of PNGs. sharp is available in
   devDependencies but no image-optimization pipeline exists. WebP/AVIF +
   responsive srcset conversion is the single largest performance win.
3. Scroll-trigger hero frame sequence: 240 webp frames, 17MB total
   (desktop 11MB / tablet 4.2MB / mobile 2.4MB); all frames for the active
   breakpoint are eagerly loaded on Home mount.
4. `public/files/` (5.8MB) tree is partially referenced (Works/LaTequila/
   Studio); `public/images/packages-support.jpg` (1.9MB) unreferenced —
   orphan-asset sweep needed.
5. Google Fonts render-blocking `<link>` in head (no `display=swap` issue —
   swap is set; fine) + preconnect present. Minor.
6. Netlify build installs Playwright Chromium every build (slow builds, cost
   only).
7. `tsc --noEmit` passes clean (verified 2026-07-05).

### Mobile / UX / a11y

- Nav: focus trap, Escape handling, aria-expanded, reduced-motion checks all
  present and correct. Footer accordions have aria-expanded. Lenis + GSAP
  effects consistently gate on `prefers-reduced-motion` (verified in Home,
  Packages FAQ/cards, Navigation, Footer; ScrollTriggerSequence.css has a
  reduce block).
- Gap: Packages.tsx "word-animate" hero animation does not check reduced
  motion (runs `packages-word-appear` for everyone).
- Images broadly have alt text; founder portrait has width/height; most
  content imgs lack explicit dimensions (CLS risk on heavy pages).
- Desktop nav only appears at `xl` (1280px) — tablets get hamburger
  (intentional?).

### Brand / copy

- **VSM scan: clean** across src/, public/, index.html, scripts, root md files.
- **Banned-phrase scan clean** ("look bigger online", "elevate", "cutting-edge",
  etc. — none in site copy).
- index.html static description + prerender BASE_DESC still say "short-form
  content" (prerender constant) — check against current positioning where
  short-form video must not lead.
- ~14 of 32 journal articles are visual/video-production topics from the
  earlier positioning era (e.g. video-content-pricing-explained,
  car-dealerships-video-…). No VSM references and no fabricated claims, but
  they dilute the website-first positioning. Decision needed: keep, reframe,
  or de-emphasize.
- serviceTerminology.ts is a clean single source of naming truth (nav, footer,
  contact form all consume it) — good pattern.

### Not yet audited (remaining when resumed)

- Full reads: Services.tsx, Studio.tsx, MichaelVail.tsx, Works.tsx render
  section, Journal.tsx, ArticleDetail.tsx, FreeSeoTools.tsx, all 7
  LocalVisibility pages, Terms/Privacy, FinalCTA, remaining components.
- Live-render QA (browser screenshots at 375/768/desktop), contrast
  measurements, Lighthouse/CWV, actual `npm run build` verification, dist/
  spot-check of prerendered head output, broken-external-link check,
  journal article body copy review, og:image per-page coverage check
  (most pages fall back to the single default social-preview.jpg).
- Scoring (item 1 of the requested report) and the exact-change proposal
  (items 12–17) were **not produced** — audit paused before that stage.

---
*End of preserved findings. Resume by re-reading this file and completing the
"Not yet audited" list before scoring.*
