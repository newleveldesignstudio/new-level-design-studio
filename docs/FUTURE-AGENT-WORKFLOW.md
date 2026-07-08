# Future Agent Workflow — NLDS

> Operating guide for any agent (Claude, Kimi, or other) working on NLDS.
> `CLAUDE.md` at each repo root is the active source of truth and wins over
> this file on any conflict. Companion docs: `NLDS-WEBSITE-HANDOFF.md` and
> `NLDS-AUTOMATION-HANDOFF.md`.

## 1. Website work

1. Read the repo `CLAUDE.md` first. Treat `AGENTS.md` only as a pointer.
2. Work in **small bounded batches** — one scoped concern per batch. Long or
   multi-phase prompts are bounded tasks; finish the requested phase, stop.
3. Vague language ("make it premium", "polish it") is never permission to
   redesign, change the motion system, swap assets, or make broad edits.
   Preserve locked direction; make the smallest relevant change.
4. Use source assets only. Never recreate logos, footers, or brand marks from
   memory. If an asset is missing, report it — do not invent a replacement.
5. Never fabricate testimonials, reviews, metrics, client results, or
   guarantees. Concept builds stay honestly labeled.
6. Validate every batch:
   - `npx tsc --noEmit`
   - `npm run build:full` (never plain `build` before a deploy)
   - route, prerender, and sitemap counts must be verified from the current
     build output and route manifest (`src/data/routes.ts` + articles) — do
     not rely on hardcoded historical counts; all three must match each other
   - exercise the change in the running app (vite preview + browser), at
     390 / 768 / desktop for anything layout-affecting
   - zero broken images, zero console errors
7. New route → add to BOTH `src/App.tsx` and `src/data/routes.ts`. New heavy
   image → add to `scripts/optimize-images.mjs` CONTENT_IMAGES and run it.
8. Do not commit, push, or deploy without Michael's explicit approval in the
   current session. Report results faithfully — failures verbatim.

## 2. Agent roster (CC, Kimi, and others)

- **CC (Claude Code) now handles the Facebook, Instagram, and Google
  Business Profile content workflow.** Kimi is no longer the default for
  that workflow. Kimi is not globally retired unless Michael explicitly
  says so — it may still be used for other work at Michael's direction.
- **Every agent — Kimi, CC, Fable, Claude, or any other — must follow the
  repo `CLAUDE.md` as the source of truth** before any work in this repo.
- Kimi auto-loads `AGENTS.md` files, not `CLAUDE.md`. Project AGENTS.md files
  here are pointers; Kimi must follow them to the repo `CLAUDE.md` before any
  work. If a repo has no AGENTS.md, read its `CLAUDE.md` first anyway.
- Kimi's global rules live in `~/.kimi-code/AGENTS.md` (mirrors the Claude
  global rules; keep the two in sync when global rules change).
- Never blend rules across projects: NLDS production-site rules, Liquid
  Legacy rules, other concept-repo rules, and social-automation rules each
  apply only in their own repo.
- Kimi has no permission deny-rules — its instruction files are the only
  gate. Be extra conservative with publish/deploy-capable tools.

## 3. n8n / social automation work

- Read `NLDS-AUTOMATION-HANDOFF.md` first; the `nlds-social-publishing`
  skill is the source of truth for routing and approvals.
- Never run live workflows or `publish_*` scripts unless explicitly
  approved. Use dry-run scripts (`end_to_end_dry_run.py`,
  `simulate_publish.py`, `run_daily.py` in dry-run mode) and the
  validate scripts.
- Confirm platform routing before any scheduling/publishing action:
  Instagram→Metricool, Facebook→Zernio, GBP→Zernio, LinkedIn disabled
  (LinkedIn publishing is not active in automation). Instagram and GBP are
  prepared/pending; live status requires Michael confirmation.
- Keep approval gates, receipts, publishing locks, and validators intact.
- Never expose secrets: no reading `.env*`, no printing tokens/webhooks/
  account IDs, credentials only via the n8n UI.
- Never run `docker compose down -v` / volume-destructive commands against
  the n8n runtime.

## 4. Reusable prompts

**Safe website deploy**
> Ship the validated <change> live. Confirm changed files are exactly
> <list>. Run tsc --noEmit, npm run build:full; determine the current
> expected route count from the route manifest (src/data/routes.ts +
> articles) and confirm the prerender and sitemap counts both match it —
> do not rely on hardcoded historical counts. Verify <change-specific
> checks> in the built app. If all pass: commit, push, monitor the Netlify
> deploy, then spot-check <affected pages> on https://newlvlstudio.com.
> Report commit hash, deploy state, live results, remaining risks.

**Post-deploy website QA**
> Run a read-only post-deploy audit of https://newlvlstudio.com at commit
> <hash>. Verify: sitemap count, all sitemap URLs 200 with unique titles and
> correct canonicals, /ops excluded, broken-image/console-error sweep at
> 390/768/desktop on key pages, contact form Netlify attributes, unknown URL
> renders noindexed NotFound. Report pass/fail table; fix nothing.

**New Work page**
> Add a Work case study for <name>. Create src/pages/Work<Name>.tsx following
> an existing work page's structure (SEO, ConceptDisclosure, Industry Demo
> labeling, hero image via the image pipeline). Add the route to App.tsx AND
> src/data/routes.ts. Add a Works.tsx grid entry using only copy from the
> page itself. Run the optimizer for its images. Validate with build:full
> (prerender/sitemap counts increase by 1) and browser checks. No deploy.

**New journal article**
> Add an article to src/data/articles.ts with slug/title/metaTitle/category/
> date/excerpt/metaDescription/body, using only Michael-approved copy. Its
> route, sitemap entry, prerender, and Blog schema derive automatically.
> Validate with build:full (counts +1) and render the article page. No deploy.

**New service section/page**
> Build the <Website Redesign | Brand Direction | Local SEO Structure>
> section (or page) per the TODOs in Navigation.tsx. If a page: add to
> App.tsx + routes.ts. Update the Services dropdown link to the new
> destination. Copy is exact-wording-only from Michael. Validate anchors/
> routes in the browser. No deploy.

**Image optimization validation**
> Run node scripts/optimize-images.mjs; confirm it is idempotent (no
> unexpected regenerations), all referenced images resolve, and a full-page
> scroll of Home/Works/Studio shows zero broken images at three viewports.

**Search Console follow-up**
> Michael: in Search Console, compare clicks/impressions for / and /contact/
> for 14 days after <deploy date> vs prior 14 days, and check the pages
> report for soft-404s or dropped journal URLs. (Agent has no GSC access —
> this needs Michael or a connected MCP.)

**Netlify form check**
> Verify the live contact form: prerendered /contact/ HTML contains
> method="POST", data-netlify="true", form-name=contact, honeypot; a test
> submission appears in Netlify Forms (only with Michael's OK); the
> ?service= preselect works for free-website-review and visual-starter-pack.

**n8n workflow audit (read-only)**
> Inventory ~/nlds/n8n-workflows and n8n-modules: workflow/module counts vs
> WORKFLOW_INDEX/MODULE_INDEX, drafts vs live-read, safety-rule presence,
> stale docs. Do not trigger any workflow. Do not read .env files. Report
> drift only.

**n8n dry-run validation**
> Run scripts/validate-workflows.sh and validate-modules.sh; run
> facebook-daily end_to_end_dry_run.py. Confirm no publish calls fired
> (check receipts/logs unchanged). Report validator output verbatim.

**Social publishing approval check**
> Before any scheduling/publishing action: confirm Michael's explicit
> approval exists for THIS post in THIS session, the approval reference is
> recorded, the publishing lock is free, and the receipt path is writable.
> If any check fails, stop and report — do not proceed.

**Platform routing verification**
> Confirm the intended platform's route against the nlds-social-publishing
> skill: Instagram→Metricool, Facebook→Zernio, GBP→Zernio, LinkedIn→stop and
> report (disabled). Refuse any action that would cross-route or
> double-publish.
