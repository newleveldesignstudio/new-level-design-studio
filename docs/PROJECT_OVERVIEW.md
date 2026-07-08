# NLDS Website — Project Overview

> Reference documentation for future developers and AI agents. `CLAUDE.md`
> at the repo root is the active rule set and wins on conflict. Written
> 2026-07-06 at commit `8e75d28` (production current at that commit).

## What NLDS is

New Level Design Studio is Michael Vail's founder-led studio in Port Orange,
FL (home-based, service-area business). It sells premium websites, website
redesigns, ongoing Website Care, brand direction, and website copy & visual
support to local service businesses (contractors, restaurants, salons, real
estate, fitness, wellness, legal, local services) across Port Orange, Daytona
Beach, Ormond Beach, New Smyrna Beach, Volusia County, and Central Florida.
Retired brand: VSM / Video Shatter Media — must never appear anywhere.

## What the website is designed to do

Earn trust fast ("trust before the first call") and convert visitors into
project-intent inquiries through the contact form. Positioning is
project-first: primary CTA **Start a Website Project**; **Get a Free Website
Review** is the deliberate low-friction secondary. Package pricing is public
(Starter $499 / Core $899 / Pro $1,499 / Care from $99/mo) to reduce pricing
anxiety.

## Main user journey

Search or social → Home (scroll-hero + direct value proposition + package
preview + founder trust) → Works (honest concept builds) and/or Packages →
Contact (`Start Your Website Project.` H1; form with `?service=` preselect;
Netlify Forms submission; "within one business day" promise). Local-intent
visitors may enter via the four local landing pages or journal articles.

## Route map

(Route count derives from `src/data/routes.ts` + `src/data/articles.ts` and grows
with new articles/pages — verify with the build rather than trusting a number.)

- `/` — Home (scroll-trigger hero, CTA hierarchy, package preview, founder
  block, concept-work preview)
- Core: `/services` (anchors: #website-design, #website-care,
  #website-copy-visual-support), `/packages`, `/starter-pack` (Visual
  Starter Pack $129), `/contact`, `/works`, `/studio`, `/michael-vail`,
  `/journal`, `/privacy`, `/terms`
- Local pages (4): `/port-orange-website-design`,
  `/daytona-beach-website-design`, `/volusia-county-website-design`,
  `/central-florida-website-design` — all render via the shared
  `LocalLandingPage` component with per-city `LocalPageConfig`
- Works case studies (14): `/works/<slug>` — all concept builds/industry
  demos, honestly labeled; Works grid also holds 5 lightbox-only projects
- Journal: `/journal/<slug>` — derived automatically from `src/data/articles.ts`
- Resources: `/free-seo-tools`, `/local-visibility-insights` + 6 children
- Private: `/ops` (noindexed internal dashboard; excluded from sitemap)
- Unknown URLs: SPA fallback serves shell → NotFound renders with
  noindex,nofollow and strips inherited canonicals (HTTP 200 is inherent)

## Data / content architecture

- `src/data/routes.ts` — route manifest; drives sitemap (vite.config.ts),
  which drives prerender (scripts/prerender.mjs reads dist/sitemap.xml).
  Journal routes derive from articles automatically.
- `src/data/articles.ts` — the journal articles (title/meta/category/date/body;
  count grows over time); category filter via `/journal?category=<slug>`.
- `src/data/serviceTerminology.ts` — canonical service names, package names,
  and the contact form's service `<select>` options.
- `src/lib/socialLinks.ts` — 7 verified profiles → footer, contact nav,
  LocalBusiness sameAs. `src/lib/links.ts` — GBP URL.
- Works grid data lives inline in `src/pages/Works.tsx` (19 projects;
  `?industry=<slug>` filters).

## Component architecture

- `Layout` (Navigation + Outlet + Footer) wraps all public routes.
- `Navigation` — Services/Works/Packages/Studio/Resources dropdowns
  (query-param + anchor destinations), "Start a Website Project" CTA,
  focus-trapped mobile overlay.
- `SEO` — Helmet meta + `localBusinessSchema()` / `personSchema()` /
  `websiteSchema()` helpers (schema privacy rules apply — see CLAUDE.md).
- `ScrollTriggerSequence` — canvas frame-scrub hero (96/80/64 frames per
  breakpoint from `public/images/scroll-trigger/`).
- Cards/blocks: `WorkProjectCard` (+`ConceptDisclosure`, "Demo focus" chips),
  `ProjectCard`, `PackageCard`, `ServiceCard`, `ValueCard`, `FramedImage`,
  `EditorialImageReveal` (srcset-aware), `FinalCTA`, `ImageLightbox`.
- Motion: GSAP + ScrollTrigger + Lenis, Framer Motion for nav/hero copy —
  all reduced-motion gated.

## SEO architecture

Per-page unique titles/descriptions/canonicals (trailing slash), prerendered
to static HTML for every manifest route; robots.txt allows AI crawlers + declares
sitemap; `llms.txt` + `llms-full.txt` + `agents.json` +
`.well-known/agent-skills` for answer engines; JSON-LD as listed in
CLAUDE.md; one legacy 301 in `_redirects`; security headers in `_headers`.

## Local pages strategy

Four unique-copy city pages (shared component, per-city config: h1/intro/
pain points/trust/FAQ+FAQPage schema) targeting "website design + city".
NAP consistent; GBP linked; ZIP-level address only (privacy decision).

## Works / case-study strategy

All portfolio items are independent concept builds / industry demos,
disclosed on every page and card. Five have live demo subdomains
(branded `*-nlds.netlify.app` style). Aureline's demo link is removed until
its Netlify site gets a branded name. Chips are demonstration-framed.

## Journal / content strategy

Articles span website strategy / local growth / visual direction /
content systems / brand presence. ~14 (as counted 2026-07-06) are legacy
visual/video-era topics (honest but positioning-diluting) — reframing
awaits Michael's decision.
Articles carry Article schema; the listing carries Blog schema.

## Contact form setup

React form → JS fetch POST to `/netlify-forms.html` (Netlify Forms); static
registration form in `index.html` with matching field names; honeypot;
no-JS fallback works natively (prerendered form POSTs, Netlify intercepts).
`?service=` preselect validated against `CONTACT_SERVICE_OPTIONS`.

## Deployment / build

`npm run build:full` = tsc + vite build (sitemap plugin) + Playwright
prerender (reads sitemap, fails on Page-Not-Found renders, dedupes head
tags, fixes trailing slashes). Netlify CI runs it on push to master
(`netlify.toml`), publishes `dist/` (~64MB). GA4 lives in
`src/lib/analytics.ts` behind `VITE_GA4_ID` and is **live in production**
(env var set in Netlify; activated and verified 2026-07-06, six conversion
events live). Do not re-implement GA4 or duplicate analytics events.

## External services

Netlify (hosting/CI/forms), GitHub (origin), Google Fonts, GA4 (live since
2026-07-06), Google Business Profile (linked), social platforms (7 profiles). The
separate n8n/social automation stack is documented in
`docs/NLDS-AUTOMATION-HANDOFF.md` and never touches website builds.

## Current production strengths

Prerendered SEO with structurally-coupled sitemap/prerender; honest-labeling
trust system; optimized image pipeline (WebP + srcset; hero frames
recompressed; sources outside deploy); coherent CTA hierarchy with package
transparency; strong a11y baseline (reduced-motion, focus traps, contrast);
answer-engine surface (llms.txt et al.); clean per-page schema.

## What should not be changed casually

Everything in CLAUDE.md's do-not-break rules — especially
`assets-src/scroll-trigger/` (sole frame source), `routes.ts` coverage,
`socialLinks.ts` fan-out, Netlify form fields, schema privacy limits,
concept-honesty labeling and demo-framed chips, project-first CTA
hierarchy, and the `build:full`-only deploy rule.
