# NLDS Website — Gaps & Weaknesses (Honest Audit)

> Report-only reference, not an active instruction file. Written 2026-07-06
> at commit `8e75d28` from direct codebase inspection and live-production
> verification. Items marked UNCERTAIN need the stated verification before
> acting. Companion: `docs/PROJECT_OVERVIEW.md` (what exists),
> `CLAUDE.md` (rules).

## Critical

**1. Analytics implemented but inactive in production**
- *What:* `src/lib/analytics.ts` wires GA4 behind `VITE_GA4_ID`; the live
  production JS bundle contains zero googletagmanager references (verified
  by inspecting the deployed bundle), so the env var is not set in Netlify.
- *Why it matters:* zero visitor, conversion, or CTA-mix data. The Jul 6
  conversion pass (project-first CTAs) cannot be measured; SEO changes
  can't be correlated with behavior. Every future optimization is blind.
- *Where:* Netlify build environment (not a code defect).
- *Fix:* Michael sets `VITE_GA4_ID` in Netlify env (agent must not handle
  the value), redeploy, verify tag fires. Optionally add form-submit and
  CTA-click events afterward.
- *Risk of fixing:* minimal. **Handle: now** (needs Michael for the ID).

## High priority

**2. No genuine third-party proof anywhere on the site**
- *What:* zero testimonials/reviews on any page (by design — none may be
  fabricated). Trust rests entirely on founder framing, concept builds, and
  transparency.
- *Why:* near decision points (Packages, Contact), real proof is the
  highest-converting element a local-services site can have.
- *Where:* Home, Packages, Contact, Works.
- *Fix:* when genuine reviews exist (e.g., GBP reviews), surface them
  verbatim with attribution; consider Review schema then. Requires real
  reviews from Michael's clients.
- *Risk:* none technically; content availability is the constraint.
  **Handle: later (as soon as real reviews exist).**

**3. Three Services dropdown items are soft dead-ends**
- *What:* Website Redesign, Brand Direction, Local SEO Structure link to
  plain `/services` — no matching sections/pages exist.
- *Why:* weakens nav intentionality; three named offers have no landing
  content for SEO or ads.
- *Where:* `src/components/Navigation.tsx` (TODOs present),
  `src/pages/Services.tsx`.
- *Fix:* build sections (fast) or dedicated pages (better SEO; add to
  App.tsx + routes.ts). Copy must be Michael-approved.
- *Risk:* low-medium (new content). **Handle: later — needs Michael's copy.**

**4. Journal positioning drift (~14 of 30 articles)**
- *What:* legacy visual/video-production-era articles (video pricing,
  med-spa video concepts, etc.) dilute website-first positioning; several
  quote old service price ranges for offerings that are no longer standing
  packages.
- *Why:* a prospect reading the journal gets a mixed story; AI answer
  engines summarizing the site may pick up stale positioning.
- *Where:* `src/data/articles.ts`.
- *Fix:* Michael decides keep / reframe / de-emphasize; then a copy pass.
- *Risk:* medium (content meaning changes require approval).
  **Handle: later — blocked on Michael's decision.**

## Medium priority

**5. Works grid has 5 lightbox-only projects with no case-study depth**
- *What:* Coastal Roofing, Port Orange Med Spa, Strand Salon, Harbor Homes,
  Iron House Gym exist only as grid cards + image lightbox.
- *Why:* thin compared to the 14 full case studies; missed internal-link
  and long-tail surface.
- *Where:* `src/pages/Works.tsx` data.
- *Fix:* promote selected ones to full pages (route + manifest + page) or
  accept as-is deliberately.
- *Risk:* low. **Handle: later, opportunistically.**

**6. Aureline demo CTA removed pending branded URL**
- *What:* the live demo exists only at an unbranded random Netlify URL;
  case study currently has no demo link.
- *Fix:* Michael renames the Netlify site (~1 min), then restore the CTA
  (`WorkAurelineEstates.tsx`).
- *Risk:* trivial. **Handle: now — one manual step from Michael.**

**7. og:image is one generic default outside Works**
- *What:* journal articles, local pages, packages, etc. share
  `social-preview.jpg`; only the 14 Works pages set custom og images.
- *Why:* weaker social CTR; articles shared on LinkedIn/Facebook all look
  identical.
- *Fix:* per-article/page og images (could reuse the carousel-style
  renderer pipeline).
- *Risk:* low. **Handle: later.**

**8. Duplicate identical canonical in hydrated DOM**
- *What:* prerendered Helmet tags lose `data-rh`, so client-side Helmet
  adds a twin canonical after JS runs (values identical). Crawler-fetched
  HTML has exactly one — verified across all 67 pages.
- *Fix:* stamp `data-rh="true"` in `cleanHead()`
  (`scripts/prerender.mjs`).
- *Risk:* low but touches the prerender pipeline; test carefully.
  **Handle: later (cosmetic).**

**9. Accessibility never formally audited**
- *What:* strong observed baseline (reduced-motion gates everywhere, focus
  traps, aria-expanded, alt coverage, ~4.9:1 muted-text contrast) but no
  axe/Lighthouse pass has ever been run; keyboard-only walkthrough and
  screen-reader labels unverified. UNCERTAIN: actual WCAG conformance.
- *Fix:* one axe + keyboard pass; fix findings.
- *Risk:* low. **Handle: later.**

**10. AI-search surface partially stale**
- *What:* `llms.txt`/`llms-full.txt` predate the Jul 6 conversion pass —
  accurate on services/pricing but silent on the project-first CTA
  hierarchy; "Visual Starter Pack (direct link only)" now understates its
  contact-form integration.
- *Why:* answer engines quoting llms.txt may describe outdated calls to
  action.
- *Fix:* refresh both files (+ `agents.json` check) to mirror current
  positioning; keep honest-claims section.
- *Risk:* low (static text). **Handle: now-ish (quick, agent-safe).**

## Low priority

**11. Soft-404s inherent to SPA fallback** — unknown URLs return HTTP 200
(noindexed, canonical-stripped; Google copes). A true 404 would require
serving a dedicated shell for unknown paths; not worth it today. **Later/no.**

**12. Works `result` data field name** invites future outcome-flavored
strings (chips are currently demo-framed). Rename to `demoFocus`. **Later.**

**13. Nav Works dropdown lacks Coffee & Cafés and Law Firms** filters that
exist on /works. **Later.**

**14. index.html ↔ prerender BASE constants coupling** — comment-guarded,
still manual. Could read index.html at prerender time. **Later.**

**15. Netlify build reinstalls Playwright Chromium each deploy** (~build
minutes only). Cacheable. **Later/no.**

**16. `capture.mjs` untracked at repo root** — intentional (video utility),
but undocumented for newcomers; either move to a tools dir or gitignore.
**Later.**

## Future opportunities

- **Conversion:** measure (after GA4) then iterate CTA mix; consider a
  lightweight "what happens after you inquire" strip on Contact to reduce
  hesitation; Netlify Forms → notification/automation wiring exists in the
  n8n stack (approval-gated).
- **Local SEO:** GBP review generation loop (real reviews → site proof →
  Review schema); city-page expansion (Ormond Beach / New Smyrna have
  copy mentions but no pages); service × city matrix only when real
  content can support it.
- **AI/answer engines:** already ahead of most local sites (llms.txt,
  agents.json, clean schema); keep files current with positioning; add
  per-article FAQ blocks where honest Q&A exists.
- **Content:** website-first article cadence (the newer SEO/first-impression
  articles are the model); founder story depth on /michael-vail.
- **Performance:** AVIF variants; hero frame idle-loading; both optional —
  current payloads (2.8MB mobile / 4.5MB desktop images on Home) are
  acceptable.
- **Tracking:** after GA4 activation, define 3–5 events (form submit,
  tel: click, package CTA clicks) — enough to steer, not surveil.

## Maintenance / automation dependencies

- Deploys depend on Netlify CI + GitHub remote; forms depend on Netlify
  Forms registration (hidden form in index.html).
- The social/n8n stack is fully separate (see NLDS-AUTOMATION-HANDOFF);
  its only repo coupling is the approved footer asset used by social
  renders living in `facebook-daily/assets/templates/`.
- Single-maintainer risk: all approvals route through Michael by design;
  the handoff docs + CLAUDE.md are the mitigation.
