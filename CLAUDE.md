# New Level Design Studio — Claude Instructions

**This file is the source of truth for this repo.** If any other Markdown file in this repo conflicts with it, this file wins — report the conflict instead of silently resolving it. Depth lives in `docs/PROJECT_OVERVIEW.md`, `docs/NLDS-WEBSITE-HANDOFF.md`, and `docs/GAPS_AND_WEAKNESSES.md`; this file is the rules.

## Project

The production website for New Level Design Studio (NLDS) — Michael Vail's founder-led studio building websites, lead systems, and practical business workflows for local businesses in Port Orange / Daytona Beach / Volusia County / Central Florida. The site's job: earn trust fast and convert visitors into project-intent inquiries via the contact form.

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
- **Positioning (updated 2026-10-09):** NLDS improves the digital systems local businesses use to attract customers, respond to opportunities, and run more efficiently. That is the filter for every service and every piece of copy.
  - Global/umbrella CTA: **"See What We Can Improve"** (nav, homepage, cross-service sections). Website-specific pages may still use website-specific CTAs (e.g. "Start a Website Project") where appropriate.
  - Do not position NLDS as a generic AI automation agency. No "AI Automation" in the main navigation, no AI-agent language. Use practical, concrete language about websites, lead systems, and business workflows, and never claim integrations or capabilities that are not built and production-ready.
  - LeadStrike CTA is "Ask About LeadStrike" → `/contact/?service=leadstrike` while the public LeadStrike site is not accessible; switch back to "Explore LeadStrike" once it is public.
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

## NLDS Social Graphic Rules

For NLDS social graphics, technical QA is not enough. A graphic must pass visual composition QA before it is shown.

### Current Workflow Standard (approved 2026-07-21)

Reference exemplar: `brand-assets/reference/nlds-social-graphic-standard-website-audit-v1.png`. Default workflow for any "website/device visual" NLDS social graphic:

- Higgsfield generates the device/environment photo only — blank screen, no invented UI.
- A real NLDS-owned screenshot (own site or a labeled Concept Build/portfolio project) is composited into the screen manually.
- One main monitor/device by default. No phone/tablet/secondary device unless there's a strong, specific reason — see Device And Spacing Rules.
- No generic gray placeholder UI, no fake dashboards.
- No pasted footer image on a mismatched background (see Footer Rules) — the dark-editorial-layout + real-text-footer approach is the default going forward, not just one of three options.
- Unified dark editorial layout; real-text footer, not a raster logo lockup.
- Run visual composition QA (below) before showing any result, every time.

### Hard Rejection Rules

Reject and revise before presenting if:

- The footer/logo area looks pasted on or disconnected from the main layout.
- The post has a dark top and unrelated light bottom unless the transition is intentionally designed.
- A monitor, phone, laptop, product, face, or main subject is cut off awkwardly.
- The generated asset touches the frame edge without intentional cropping.
- The footer uses a different paper texture, color temperature, or lighting style than the rest of the graphic.
- The design feels like a brand board instead of a finished social post.
- The AI-generated asset looks generic, stock-like, or dashboard-placeholder-like.
- QA only proves pixel size, palette, or logo accuracy but does not evaluate overall design fit.

### Footer Rules

Do not slap the approved footer image onto a separate white rectangle under a dark layout.

Use one of these approaches only:

1. Full dark editorial layout with small text footer lockup rebuilt in real text.
2. Full ivory editorial layout where the approved footer asset naturally matches the page.
3. Create a dedicated dark-compatible NLDS footer/logo variant once, then reuse it.

If no approved dark footer variant exists, do not force the light footer asset into a dark design.

### Composition QA

Before final delivery, zoom out and answer:

- Does this look like one designed piece?
- Does the footer belong to the same visual system?
- Is the main subject fully framed?
- Is there enough breathing room around all devices?
- Would this look intentional on Instagram without explanation?

If any answer is no, revise before showing.

### No Generic Website Mockups

For NLDS social graphics, do not use AI-generated blank website screens, gray placeholder UI bars, fake dashboards, or generic homepage mockups as the main visual.

If a website is shown, it should come from:
- a real NLDS site screenshot,
- a real portfolio/project screenshot,
- or a manually designed page with intentional content blocks.

AI may generate the device/environment, but the website screen content should be composited manually whenever possible.

### Device And Spacing Rules

For NLDS social graphics, avoid unnecessary secondary devices. Do not add a phone, tablet, laptop, or extra prop unless it clearly improves the concept.

Reject and revise if:
- A secondary device distracts from the main subject.
- The phone/tablet crop looks awkward, tiny, blurry, or hard to read.
- The image panel has visible accidental letterbox bars.
- There is excessive dead space between the image panel and footer.
- The footer feels stranded at the bottom instead of connected to the composition.

Default to one strong main subject over multiple devices.
