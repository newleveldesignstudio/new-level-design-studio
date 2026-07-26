# New Level Design Studio — Claude Instructions

**This file is the source of truth for this repo.** If any other Markdown file in this repo conflicts with it, this file wins — report the conflict instead of silently resolving it. Depth lives in `docs/PROJECT_OVERVIEW.md`, `docs/NLDS-WEBSITE-HANDOFF.md`, and `docs/GAPS_AND_WEAKNESSES.md`; this file is the rules.

## Project

The production website for New Level Design Studio (NLDS) — Michael Vail's founder-led, website-first studio for local service businesses in Port Orange / Daytona Beach / Volusia County / Central Florida. The site's job: earn trust fast and convert visitors into project-intent inquiries via the contact form.

- **Stack:** Vite 7 + React 19 + TypeScript + Tailwind 3, react-router-dom 7, react-helmet-async, GSAP + Lenis, Framer Motion. Custom Playwright prerender.
- **Production:** https://newlvlstudio.com — Netlify, site ID in `.netlify/state.json`. Every route in the manifest is prerendered; the sitemap and prerender counts must always match the route manifest (`src/data/routes.ts` + articles) — verify with the build, don't trust hardcoded numbers.
- **Build:** `npm run build:full` (build + prerender + sitemap fix). Plain `npm run build` produces an un-prerendered dist — never ship it.
- **Deploy:** commit → push to `master` (GitHub) → Netlify CI builds and publishes `dist/`. **Never commit, push, or deploy without Michael's explicit instruction in the current session.**

## Key routes & source-of-truth files

- Routes: declared in `src/App.tsx` AND mirrored in `src/data/routes.ts` (the manifest that drives sitemap + prerender). Add new public routes to BOTH; prerender fails the build if a manifest route renders Page Not Found. `/ops` is private/noindexed and excluded.
- `src/data/articles.ts` — journal content; article routes/sitemap/schema derive from it automatically.
- `src/data/serviceTerminology.ts` — canonical service names + contact-form options.
- `src/lib/socialLinks.ts` — the verified social profiles; feeds footer + Contact nav + LocalBusiness `sameAs`. YouTube is `@newlvlstudio1`; the old `@newlvlstudio` handle is a dead 404, never re-add.
- `src/components/SEO.tsx` — per-page meta + schema helpers.
- `scripts/optimize-images.mjs` — sharp image pipeline (see Image rules).

## SEO / prerender rules

- Every public page renders `<SEO>` with unique title, description, self-referencing trailing-slash canonical.
- `scripts/prerender.mjs` reads routes from the built sitemap; its BASE_TITLE/BASE_DESC constants must match `index.html` statics exactly.
- Schema: LocalBusiness (+WebSite) on Home/local pages, Person on /michael-vail, Service ItemList on /services, Blog on /journal, Article on posts, FAQPage on /packages + local pages.
- **Privacy (decided 2026-07-06):** NLDS is home-based and service-area focused. Never add streetAddress, geo lat/lng, or openingHours to schema unless Michael explicitly approves. Use areaServed/locality/region signals. GBP hours are managed in GBP, never from this repo.

## Design system & brand voice

- Palette: warm ivory `#F7F7F3`, charcoal `#1E1F20`, muted `#676C70`, silver `#D9D9D8`. Type: DM Serif Display + Plus Jakarta Sans. Editorial, premium, restrained. No orange/neon/gold/plants/stock-lifestyle styling.
- Respect existing structure and the Motion/GSAP patterns already present; honor `prefers-reduced-motion` in all motion work; verify layouts mobile-first (375/390, 768, desktop).
- Customer-facing copy is exact-wording-only: use text Michael approved or leave a placeholder. Never fabricate testimonials, reviews, metrics, client results, or guarantees.
- Voice: direct, plainspoken, local-business focused. Avoid "look bigger online," "elevate," "unlock," "transform," "online presence" filler, "not just X, but Y."
- **Positioning is project-first:** primary CTA "Start a Website Project"; "Get a Free Website Review" is the low-friction secondary. Do not revert to review-first messaging.
- Concept builds stay honestly labeled ("Concept Build" / "Industry Demo" + disclosures) but framed confidently — never reintroduce "not paid client work" phrasing; Works chips stay demonstration-framed ("Demo focus: …"), never outcome-framed.

## Image / asset rules

- Locked brand assets live in `brand-assets/approved/` (rules + SHA-256 hashes in `.claude/skills/nlds-canva/asset-rules.md`). Never recreate logos, footers, or brand marks from memory. Missing asset → report, don't invent.
- New heavy images: add to `CONTENT_IMAGES` in `scripts/optimize-images.mjs`, run it, reference the `.webp` (+ `-w768.webp` srcset). Originals stay (they're og:image targets + pipeline sources).
- **`assets-src/scroll-trigger/` is load-bearing** — the ONLY source for the hero frames (upstream tmp source is gone). Never delete. Runtime frames serve from `public/images/scroll-trigger/{desktop-optimized,tablet-optimized,mobile}/`.

## Portfolio demo hosting (Lovable/Netlify rule)

- Lovable is only the build/prototype environment. Public demos must be
  hosted on Netlify.
- NLDS portfolio pages must never link to Lovable preview URLs. Every
  portfolio "View Live Site," "View Concept Website," or demo CTA must
  point to a Netlify URL or a client-owned production domain.
- Before deploying a portfolio entry, search the NLDS source for
  `lovable.app`, `lovable.dev`, and `id-preview`. If any public NLDS page
  contains those strings, replace them with the Netlify-hosted demo URL
  before deployment.
- For concept builds, create a separate Netlify site using a clear name
  (e.g. `the-grooming-forge-nlds`, `client-or-concept-name-nlds`), then
  update the NLDS case study to link to that Netlify demo.
- Final QA before any portfolio deploy must confirm no Lovable URLs
  remain in the public NLDS source or production HTML.

## Contact / GBP / social rules

- Contact form must keep: `method="POST"`, `data-netlify="true"`, hidden `form-name=contact`, `bot-field` honeypot — matching field names in the hidden `index.html` form. `?service=` preselect must keep working.
- Response-time promise is "within one business day" everywhere.
- GBP link comes from `src/lib/links.ts`; NAP is Port Orange, FL 32127 / (386) 846-5754 / michael@newlvlstudio.com — keep consistent.
- Social publishing is out of scope for website work (see `docs/NLDS-AUTOMATION-HANDOFF.md`); never publish/schedule from here.

## QA checklist before any deploy

1. `npx tsc --noEmit` passes.
2. `npm run build:full` passes — **all manifest routes prerender with zero failures**, and the sitemap count matches the manifest.
3. The specific change exercised in the running app (vite preview + browser), at 390/768/desktop if layout-affecting.
4. Zero broken images, zero console errors, zero failed image requests on affected pages.
5. No banned phrases or invented proof introduced.
6. `git status` surface = exactly the intended files (`capture.mjs` stays untracked).
7. Michael's explicit deploy approval, then push → monitor Netlify to `ready` → live spot-check affected pages.

## Backlog & analytics status

See `docs/GAPS_AND_WEAKNESSES.md` for the backlog — it is a **dated report**; verify each item against the current codebase before acting. **GA4 is live in production** (since 2026-07-06) with six verified conversion events: `phone_click`, `email_click`, `gbp_click`, `contact_cta_click`, `package_cta_click`, `generate_lead`. Never re-implement GA4 or add duplicate analytics events.

## How future agents make changes safely

Execution method, verification standards, and trap tests live in
`~/nlds/agent-os/` (business rulebooks: `~/nlds/nlds-os/`); this file
outranks both for anything in this repo.

Work in small bounded batches; one scoped concern per batch. Vague language ("premium," "polish") is never license to redesign — smallest relevant change. Assess-vs-fix ambiguity → assess and report first. Multi-file/production changes → state a short plan before editing. Run the QA checklist; report failures verbatim; never claim done without verification. `AGENTS.md` is only a pointer here. Files under `reports/` and `docs/archive/` are report-only/historical, never active instructions.

## NLDS Canva Work

For any NLDS Canva graphics task, use the nlds-canva skill (`.claude/skills/nlds-canva/SKILL.md`). Mode 1 (Website Portfolio Visuals) is the active default; Mode 2 (Social Media Graphics) activates only when explicitly requested. Do not load the skill for unrelated coding or SEO work.
