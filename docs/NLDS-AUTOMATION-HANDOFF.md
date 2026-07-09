# NLDS Automation Handoff (n8n + Social)

> Reference documentation for the automation stack, kept separate from
> website instructions on purpose. Automation rules do NOT apply to website
> builds, and website rules do NOT apply here. The `nlds-social-publishing`
> skill (`~/.claude/skills/nlds-social-publishing/`) is the active source of
> truth for routing/approval; this file describes, it does not override.
> Last verified (read-only): 2026-07-06. No workflows were triggered and no
> posts were published or scheduled while producing this document.

## 1. Purpose

The NLDS automation stack handles:
- **Social content generation** — topic rotation, caption drafting, branded
  1080×1350 image rendering (Pillow), template QA.
- **Approval workflows** — every publish/schedule path checks
  `approval_status == approved_by_michael`; approval-gate modules exist as
  reusable n8n components.
- **Platform routing** — locked per-platform service assignment (below).
- **Scheduling/publishing support** — Zernio (Facebook, GBP) and Metricool
  (Instagram) integrations; presigned-S3 media upload for Zernio.
- **Receipts/logs** — `publishing-receipts.json`, `history.json`, per-day
  `logs/`, and a publishing lock (`publishing_lock.py`) against double-runs.
- **Image/template generation** — master shells + Pillow templates in
  `facebook-daily/assets/`; the approved automated footer variant is
  documented in the nlds-canva skill's asset rules.
- **Gmail-based workflow support** — n8n draft workflows read Gmail for the
  daily command brief / lead intake (see `n8n-workflows/docs/GMAIL_SETUP.md`).

## 2. Platform routing (locked)

| Platform | Service | Status |
|---|---|---|
| Instagram | **Metricool** | **PREPARED/PENDING — live status requires Michael's confirmation.** Planned go-live was Jul 7 2026, but activation has not been confirmed. Do not describe or treat as actively posting until Michael confirms. |
| Facebook | **Zernio** | **Approval-gated interactive scheduling** (NLDS Facebook Page "Newlvlstudio" only) — posts are batch-scheduled in Zernio during Michael-approved sessions; a weekly gap check (NLDS-Queue-Maintenance, Fridays 9 AM) flags upcoming empty slots. No confirmed unattended daily runner. |
| Google Business Profile | **Zernio** | **PREPARED/PENDING — live status requires Michael's confirmation.** Planned go-live was Jul 7 2026, but activation has not been confirmed. Do not describe or treat as actively posting until Michael confirms. |
| LinkedIn | **DISABLED** | do not connect credentials or create publish nodes unless Michael explicitly enables it |

Email service is **Gmail**. Zoho Mail is not active anywhere in the stack
(verified: zero references in the automation repos).

## 3. Publishing guardrails (hard rules)

- Never publish without Michael's explicit approval.
- Never schedule without Michael's explicit approval.
- Never send test posts to live platforms unless explicitly approved —
  use the dry-run scripts instead.
- Never treat generated content as approved content. Generation ≠ approval.
- Approval gates, receipts, publishing locks, and validation steps must stay
  intact in every pipeline and workflow.
- Platform routing must not be changed casually — it is locked in the
  nlds-social-publishing skill and mirrored in `SAFETY_RULES.md`.
- Social automation rules do not apply to website builds, and vice versa.

## 4. Repo / workflow overview

### `~/nlds/n8n-runtime` — the n8n instance
- Local-only Docker Compose (`compose.yaml`); n8n pinned to `2.27.4`;
  port 5678 bound to 127.0.0.1 only.
- **CRITICAL:** never `docker compose down -v`, never
  `docker volume rm n8n_data`, never `docker system prune` — the volume holds
  all workflows/credentials with no undo. Backups in `runtime-backups/`.
- All secrets live in the n8n credential UI (http://localhost:5678) — never
  in files, never pasted into agent sessions.

### `~/nlds/n8n-workflows` — importable workflow pack (33 JSONs)
- Categories: `00-tests`, `01-content`, `02-daily-ops`, `03-leads`,
  `04-client-onboarding`, `05-website-projects`.
- Nearly all are **draft-only** (write actions disabled, placeholder data);
  two `live-read` variants exist for the daily command brief and 3PM status.
- Docs: `WORKFLOW_INDEX.md` (per-workflow safety table, updated 2026-06-25),
  `SAFETY_RULES.md`, `CREDENTIALS_MAP.md`, `GMAIL_SETUP.md`,
  `NOTION_SETUP.md`, `CALENDAR_SETUP.md`, `IMPORT_GUIDE.md`,
  `PRODUCTION_READINESS.md` (Level 0 draft-only → staged levels),
  `PHASE1_*` test/integration docs, `QA_CHECKLIST.md`, `NEXT_STEPS.md`.
- Scripts: `backup-workflows.sh`, `create-backup.sh`, `list-workflows.sh`,
  `validate-workflows.sh` (safe, local).
- An `.env.example` exists at the repo root (placeholder names only; not
  read while writing this doc — `.env*` files are deny-listed for agents).

### `~/nlds/n8n-modules` — reusable module library (30 JSONs)
- Categories `00-core` (approval gate, error handler, status output) through
  `10-utilities`, including `04-approval` (michael-approval-check,
  platform-routing-approval) and `08-publishing` (Zernio FB/GBP placeholder,
  Metricool IG placeholder).
- Docs: `MODULE_INDEX.md`, `MODULE_STANDARD.md`, `HOW_TO_USE_MODULES.md`,
  `SAFETY_RULES.md`, phase plans (1 read-only / 2 AI-draft /
  3 controlled-writes). Scripts: backup/list/validate.

### `~/nlds/social-automation` — production social pipelines
- `PUBLISHING-ROUTING-RULES.md` — pipeline-local reference (skill wins),
  `DEFAULT-SCHEDULE.md` — approved posting slots (America/New_York).
- **`facebook-daily/`** — the Facebook pipeline (render/QA/receipts/Zernio
  support). **Corrected 2026-07-09: there is no confirmed daily 12 PM
  unattended runner in this environment.** The only registered Windows task
  is **NLDS-Queue-Maintenance** (weekly, Fridays 9:00 AM → WSL →
  `maintain_queue.py`), which detects upcoming Zernio queue gaps for manual
  scheduling. The working model: topic/copy → Pillow render → automated QA
  → Michael's approval → Zernio upload (presigned S3) → **scheduled** post
  on the NLDS Facebook Page only → receipt. Zernio access depends on MCP
  availability/configuration in the scheduling session (`prompts/
  daily-run.md` documents the runner design for reference).
  - Entry points: `scripts/run_daily.py` (dry-run by default per README),
    `run_publishing.py`, `publish_facebook.py`, `publish_gbp.py`,
    `publish_instagram.py`.
  - Dry-run/simulation: `end_to_end_dry_run.py`, `simulate_publish.py`,
    `build_platform_dry_run.py`; validators: `validate_post.py`,
    `validate_gbp_post.py`, `validate_instagram_media.py`,
    `validate_topics.py`.
  - State/receipts: `content/history.json`, `content/publishing-receipts.json`,
    `content/queue-state.json`, `logs/YYYY-MM-DD.json`,
    `scripts/publishing_lock.py`.
  - Config (names only): `config/publishing.json`, `brand.json`,
    `gbp-render-config.json`, `canva-templates.json`; `.env.example` at the
    pipeline root (do not read `.env*` as an agent; deny-listed).

## 5. Current known state

- **Working:** facebook-daily Facebook pipeline via Zernio — approval-gated
  interactive scheduling with QA, receipts, and the publishing lock, plus
  the weekly NLDS-Queue-Maintenance gap check (Fridays 9 AM). **Not
  hands-off auto-publishing; no confirmed unattended daily runs.** Zernio
  scheduling depends on MCP availability/configuration in the session.
- **Working (local/support):** n8n instance (local-only Docker), backup and
  validation scripts, Pillow rendering + QA.
- **Draft/disabled:** the 33-workflow n8n pack is Level 0 draft-only — write
  actions disabled, credentials not wired; two live-read daily-ops variants
  exist. LinkedIn publishing is disabled by policy.
- **Prepared/pending:** Instagram (Metricool) and Google Business Profile
  (Zernio) publishing were planned to go live Jul 7 2026, but **go-live has
  not been confirmed — live status requires Michael's explicit confirmation.**
  Scripts, specs, and validators exist; treat neither platform as actively
  posting until Michael confirms. All go-live activation still requires
  Michael's explicit approval and must preserve approval gates, routing
  validation, receipts, and dry-run safety.
- **Requires credentials:** any n8n workflow beyond placeholder mode
  (Gmail, Notion, Calendar, Zernio, Metricool, AI) — all configured only via
  the n8n credential UI.
- **Requires manual approval:** every publish/schedule action, always.
- **Production-sensitive (do not trigger during audits):** anything under
  `facebook-daily/scripts/publish_*.py` or `run_publishing.py`, the n8n
  live-read workflows once credentialed, and the scheduled daily task.

## 6. Do-not-break list (automation)

- Do not trigger live workflows or publish scripts during audits — use the
  dry-run scripts.
- Do not publish or schedule anything without Michael's explicit approval.
- Do not change, move, or re-enter credentials; never paste secrets into
  agent sessions; never read `.env*` files.
- Do not expose tokens, webhook URLs, account IDs, or presigned URLs in
  documentation or output.
- Do not alter platform routing without Michael's approval (skill +
  SAFETY_RULES are the locked references).
- Do not remove or weaken approval gates, receipts, the publishing lock, or
  validation steps.
- Do not remove dry-run safety gates from any script.
- Do not run destructive Docker commands against the n8n volume (see §4).
- Do not mix website rules into automation workflows or automation rules
  into website builds.

## 7. Recommended future automation work

**Safe documentation:**
- Once Michael explicitly confirms the Instagram/GBP go-live, update the
  routing table in this file from PREPARED/PENDING to live and record
  first-run receipt results. Do not mark either platform live on any other
  basis.
- Refresh `WORKFLOW_INDEX.md` if workflows changed since 2026-06-25.
- Note: `SAFETY_RULES.md` is intentionally duplicated in n8n-modules and
  n8n-workflows — keep the two in sync when either changes.

**Safe dry-run testing:**
- `end_to_end_dry_run.py` / `run_daily.py --date <future>` for the Facebook
  pipeline; `validate-workflows.sh` / `validate-modules.sh` for the n8n pack;
  n8n manual-test workflow (00-tests) against the local instance.

**Production-sensitive (needs Michael's approval):**
- Moving any n8n workflow from Level 0 to live (credential wiring + enabling
  write actions), per `PRODUCTION_READINESS.md` levels.
- Enabling GBP or Instagram publishing runs.
- Any change to posting schedule (`DEFAULT-SCHEDULE.md`) or routing.

**Credential/account work (Michael only):**
- Zernio/Metricool account changes, Gmail/Notion/Calendar OAuth in the n8n
  UI, LinkedIn enablement (currently OFF by policy).

**Per-platform next steps:**
- *Instagram/Metricool:* finish carousel spec validation → dry-run →
  Michael-approved pilot post.
- *Facebook/Zernio:* running; periodic receipt/log review is the maintenance
  task.
- *GBP/Zernio:* validate `render_gbp_post.py` + `validate_gbp_post.py`
  output in dry-run, then approval-gated pilot.
- *LinkedIn:* stays disabled unless Michael says otherwise.
- *Gmail:* wire the daily-command-brief live-read workflow first (read-only,
  lowest risk) once credentials are approved.
- *Content approval:* the approval queue draft workflow
  (05-nlds-publishing-approval-queue) is the natural next build-out — keep
  the michael-approval-check module as its gate.
