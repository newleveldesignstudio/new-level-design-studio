#!/usr/bin/env node
// NLDS SEO Intelligence v2 (Phase 1.1): SEO Opportunity Scanner. READ-ONLY decision support: edits no page, deploys nothing.
//   node --experimental-strip-types tools/seo-intelligence/scan.mjs ~/nlds/research/seo-intelligence/<date> [--dist <dir> | --no-dist] [--today YYYY-MM-DD]
// Raw GSC pulls and every generated file are PRIVATE: input and output must live outside this repo (enforced, fails closed). Output: <input>/v2/.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import * as L from "./lib.mjs";
import { CONFIG, SCHEMA_VERSION } from "./config.mjs";
import { assertPrivateInput, ensurePrivateOutDir, safeWrite, PrivatePathError } from "./paths.mjs";
import { fromDist, fromCatalog, distExists, distStale } from "./linkgraph.mjs";
import { prepare, runAll } from "./opportunities.mjs";
import { renderReport } from "./report.mjs";

const repoRoot = path.resolve(import.meta.dirname, "../..");
const args = process.argv.slice(2); const flag = (n) => { const i = args.indexOf(n); return i < 0 ? null : args[i + 1]; };
const positional = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && ["--dist", "--today"].includes(args[i - 1])));
try {
  const input = assertPrivateInput(positional[0], repoRoot); const out = ensurePrivateOutDir(input, repoRoot); const rawDir = path.join(input, "raw");
  if (!existsSync(path.join(rawDir, "pq_last90.json"))) throw new Error(`missing ${rawDir}/pq_last90.json`);
  const raw = Object.fromEntries(["pq_last90", "pq_last28", "pq_prev28", "pq_prev90", "p_last90", "p_last28", "p_prev28", "p_prev90", "pd_last90", "pqd_last90"].map((n) => [n, L.readRaw(rawDir, n)]));
  const rng = (n) => JSON.parse(readFileSync(path.join(rawDir, n + ".json"), "utf8")).range;
  const windows = { last_90d: rng("pq_last90"), last_28d: rng("pq_last28"), prev_28d: rng("pq_prev28") };
  // link graph: built dist/ HTML preferred (rendered truth); repo source as a documented fallback
  const dist = flag("--dist") ? path.resolve(flag("--dist")) : path.join(repoRoot, "dist"); let graph;
  if (!args.includes("--no-dist") && distExists(dist)) { graph = fromDist(dist); graph.stale = distStale(dist, path.join(repoRoot, "src")); }
  if (!graph || graph.pages.size === 0) { const { articles } = await import("../../src/data/articles.ts"); graph = fromCatalog(L.loadCatalog(repoRoot, articles)); }
  const today = flag("--today") ?? new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  const prevIds = new Map(); const prevFile = path.join(out, "opportunities.json");
  if (existsSync(prevFile)) for (const o of JSON.parse(readFileSync(prevFile, "utf8")).opportunities ?? []) prevIds.set(o.id, o.first_seen);
  const localFile = path.join(input, "scanner.local.json"); let local = { locks: [], recentChanges: [] };
  if (existsSync(localFile)) { const j = JSON.parse(readFileSync(localFile, "utf8")); local = { locks: Array.isArray(j.locks) ? j.locks : [], recentChanges: Array.isArray(j.recentChanges) ? j.recentChanges : [] };
    for (const k of local.locks) if (!(k.url && Array.isArray(k.actions) && k.until && k.reason)) throw new Error("scanner.local.json: each lock needs url, actions[], until, reason");
    for (const c of local.recentChanges) if (!(c.url && c.date && c.note)) throw new Error("scanner.local.json: each recentChange needs url, date, note"); }
  const D = prepare(raw, graph); const { act, monitor, nonCommercialIgnored } = runAll(D, { today, prevIds, windows, locks: local.locks, recentChanges: local.recentChanges });

  // data-quality warnings (sparse / anonymized data lowers confidence; it is never silently ignored)
  const pImp = L.normalize(raw.p_last90, "p").reduce((s, r) => s + r.impressions, 0), qImp = D.pq90.reduce((s, r) => s + r.impressions, 0), clicks = D.p90.reduce((s, r) => s + r.clicks, 0);
  const warnings = [`Only ${Math.round((100 * qImp) / Math.max(1, pImp))}% of 90d impressions (${qImp} of ${pImp}) have a visible query; the rest are anonymized by Google. Query-level findings describe a minority of the traffic.`,
    `${clicks} clicks in 90 days across ${D.p90.length} pages: CTR and click-based trends are statistically thin.`,
    D.haveQueryDays ? "Distinct-day counts come from a page+query+date pull." : "No page+query+date pull found: query-level distinct days are UNKNOWN, so query-level ACT is blocked until it is pulled (tools/seo-intelligence/pull.mjs page,query,date).",
    `${[...act, ...monitor].filter((o) => o.extra?.benchmark_status === "cannot_benchmark_yet").length} CTR item(s) say "cannot benchmark yet": no defensible internal benchmark exists.`,
    `${[...act, ...monitor].filter((o) => o.blockers.some((b) => /concentrated/.test(b))).length} item(s) have impressions concentrated on a few days (possible self-search / rank-tracker noise).`,
    `${nonCommercialIgnored} non-commercial quer${nonCommercialIgnored === 1 ? "y was" : "ies were"} ignored by the gap detector (not every query is a content gap).`,
    graph.source === "source" ? `Link graph came from repo source, not the rendered site: ${graph.limitation}` : graph.stale ? "dist/ is older than the source files: rebuild (npm run build:full) before trusting link findings." : "Link graph uses the built dist/ HTML (rendered truth)."];
  const meta = { runDate: today, property: "sc-domain:newlvlstudio.com", window: windows, linkGraph: { source: graph.source, built_at: graph.builtAt ?? null, stale: !!graph.stale, limitation: graph.limitation ?? null } };
  const ranked = [...act.map((o, i) => ({ rank: i + 1, ...o })), ...monitor.map((o, i) => ({ rank: i + 1, ...o }))];
  const doc = { schema_version: SCHEMA_VERSION, generated_at: new Date().toISOString(), run_date: today, property: meta.property, data_window: windows, link_graph: meta.linkGraph, config: CONFIG, private_config_loaded: { locks: local.locks.length, recent_changes: local.recentChanges.length }, summary: { total: ranked.length, act: act.length, monitor: monitor.length, warnings }, opportunities: ranked };
  safeWrite(out, repoRoot, "opportunities.json", JSON.stringify(doc, null, 2)); safeWrite(out, repoRoot, "report.md", renderReport({ meta, act, monitor, stats: { warnings } }));
  console.log(`v2 written to ${out}: ${ranked.length} opportunities (${act.length} ACT, ${monitor.length} Monitor); link graph: ${graph.source}`);
} catch (e) { console.error(e instanceof PrivatePathError ? `PRIVATE-PATH GUARD: ${e.message}` : `scan failed: ${e.message}`); process.exit(e instanceof PrivatePathError ? 3 : 1); }
