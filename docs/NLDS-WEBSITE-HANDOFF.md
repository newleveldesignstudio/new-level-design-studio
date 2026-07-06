# NLDS Website Handoff

> Reference documentation. `CLAUDE.md` at the repo root is the active source
> of truth and wins on any conflict with this file. Last verified: 2026-07-06,
> commit `57b4e6d`.

## 1. Current production state

- **Production URL:** https://newlvlstudio.com
- **Latest deployed commit:** `57b4e6d` (homepage conversion pass) — verified
  serving live
- **Sitemap:** 67 URLs, all trailing-slashed, `/ops` excluded
- **Prerender:** 67/67 routes render to static HTML in `dist/`
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
| Data | `src/data/` — `articles.ts` (30 journal articles), `routes.ts` (route manifest), `serviceTerminology.ts` (canonical service names + contact-form options) |
| Route control | `src/App.tsx` (React routes, manual) + `src/data/routes.ts` (sitemap/prerender manifest) |
| Social links | `src/lib/socialLinks.ts` — single source for footer, Contact social nav, and LocalBusiness `sameAs` |
| Runtime image assets | `public/nlds/images/`, `public/images/`, `public/files/nlds/images/` |
| Source-only assets (NOT deployed) | `assets-src/scroll-trigger/{desktop,tablet}/` — see its README |
| Approved brand assets | `brand-assets/approved/` (see `.claude/skills/nlds-canva/asset-rules.md`) |
| Build/utility scripts | `scripts/` — `prerender.mjs`, `optimize-images.mjs`, `prepare-scroll-trigger-frames.mjs`, `image-manifest.json` |

## 3. Critical source-of-truth files

- `CLAUDE.md` — active project instructions (asset rules, edit scope, QA bar,
  deploy gate). `AGENTS.md` is only a pointer to it (for Kimi and other
  agents).
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

- **`assets-src/scroll-trigger/` is load-bearing.** The upstream raw frames
  (`tmp/scroll-trigger-source-frames`) no longer exist; these are the ONLY
  source for regenerating runtime frames. Never delete.
- Optimized runtime frames must stay in
  `public/images/scroll-trigger/*-optimized/` (and `mobile/`).
- `SOCIAL_LINKS` feeds footer + Contact social nav + LocalBusiness `sameAs`.
  One edit changes all three — that is intentional; never fork them.
- `src/data/routes.ts` controls sitemap + prerender coverage. A route missing
  there silently disappears from Google.
- Contact form must retain its Netlify fields: `method="POST"`,
  `data-netlify="true"`, hidden `form-name=contact`, `bot-field` honeypot —
  and the matching hidden form in `index.html` must keep the same field names.
- `?service=` preselect on /contact must keep working
  (`free-website-review`, `visual-starter-pack`, etc. — values from
  `CONTACT_SERVICE_OPTIONS`).
- Concept builds must never imply real client outcomes. Keep "Concept Build"
  / "Industry Demo" labels, ConceptDisclosure, and the Works-page disclosure.
  Never reintroduce "not paid client work" *phrasing* on prominent cards —
  use the confident "built by NLDS to show…" framing instead.
- Works chips must stay demonstration-framed ("Demo focus: …"), never
  outcome-framed ("better/stronger/increased…"). The data field is named
  `result` — don't let that invite outcome language.
- Use `npm run build:full`, not plain `npm run build`, before any deploy.
- **No deploy, push, or publish without Michael's explicit approval in the
  current session.** Prior approvals do not carry forward.
- Never fabricate testimonials, reviews, metrics, client results, or
  guarantees. Never recreate logos/footers/brand marks from memory.

## 5. Current validated systems (all live at 57b4e6d)

- **Route manifest** — single source; sitemap/prerender structurally coupled;
  Page-Not-Found prerender guard active on every build.
- **Sitemap/prerender** — 67 URLs / 67 routes; unique titles + one correct
  self-referencing canonical per page (verified live across all 67).
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
