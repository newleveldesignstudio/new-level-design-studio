// node --test tools/seo-intelligence/opportunities.test.mjs
// SYNTHETIC data only (no real GSC data in the repo). Temp dirs live outside the repo.
import test from "node:test"; import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, symlinkSync, writeFileSync, existsSync, readdirSync } from "node:fs"; import { tmpdir } from "node:os"; import path from "node:path"; import { spawnSync } from "node:child_process";
import { prepare, runAll, scoreOf, confidenceOf, components } from "./opportunities.mjs";
import { CONFIG as C, SCHEMA_VERSION } from "./config.mjs";
import { assertPrivateInput, ensurePrivateOutDir, safeWrite, PrivatePathError } from "./paths.mjs";
import * as L from "./lib.mjs";

const S = "https://newlvlstudio.com", u = (p) => S + p;
const row = (page, query, clicks, impressions, position) => ({ ...(page && { page: u(page) }), ...(query && { query }), clicks, impressions, ctr: impressions ? clicks / impressions : 0, position });
const dates = (n, start = 1) => Array.from({ length: n }, (_, i) => `2026-08-${String(start + i).padStart(2, "0")}`);
const dayRows = (page, query, total, n, extra = {}) => dates(n).map((date) => ({ page: u(page), ...(query && { query }), date, clicks: 0, impressions: total / n, position: 9, ...extra }));
function graph(pages) { const m = new Map(pages.map((p) => [u(p.route), { url: u(p.route), route: p.route, type: L.pageType(p.route), title: p.title ?? "", description: "", h1: "", text: (p.text ?? "").toLowerCase(), contentLinks: p.links ?? [], chromeLinks: [] }])); return { pages: m, source: "dist", contentInbound: (x) => p_in(m, x), chromeInbound: () => 0, linksInContent: (a, b) => !!m.get(a)?.contentLinks.some((l) => l.url === b) }; }
const p_in = (m, x) => [...m.values()].filter((p) => p.contentLinks.some((l) => l.url === x)).length;
const windows = { last_90d: { startDate: "2026-07-20", endDate: "2026-10-17" }, last_28d: { startDate: "2026-09-20", endDate: "2026-10-17" }, prev_28d: { startDate: "2026-08-23", endDate: "2026-09-19" } };
const run = (raw, g, prevIds = new Map(), extra = {}) => runAll(prepare(raw, g), { today: "2026-10-20", prevIds, windows, ...extra });
const base = (o = {}) => ({ pq_last90: [], pq_last28: [], pq_prev28: [], pq_prev90: [], p_last90: [], p_last28: [], p_prev28: [], p_prev90: [], pd_last90: [], pqd_last90: [], ...o });
const all = (r) => [...r.act, ...r.monitor];
const find = (r, cat, pred = () => true) => all(r).find((o) => o.category === cat && pred(o));
const page = { route: "/demo-service/", title: "Demo Service | NLDS", text: "we do demo things" };

test("striking distance: a position 6-20 query with real evidence is ACT with a specific action; positions 3 and 25 are not striking", () => {
  const raw = base({ pq_last90: [row("/demo-service/", "roof gutter cleaning plan", 0, 40, 9), row("/demo-service/", "top ranked thing", 0, 40, 3), row("/demo-service/", "far thing", 0, 40, 25)], pqd_last90: dayRows("/demo-service/", "roof gutter cleaning plan", 40, 8), p_last90: [row("/demo-service/", null, 0, 120, 9)], pd_last90: dayRows("/demo-service/", null, 120, 12), pq_last28: [row("/demo-service/", "roof gutter cleaning plan", 0, 20, 8)] });
  const r = run(raw, graph([page])); const s = r.act.filter((o) => o.category === "striking_distance");
  assert.equal(s.length, 1); assert.equal(s[0].recommended_action, "expand existing section"); assert.equal(s[0].score_components.proximity, 1); assert.deepEqual(s[0].queries.map((q) => q.query), ["roof gutter cleaning plan"]);
  assert.ok(!all(r).some((o) => o.category === "striking_distance" && o.queries.some((q) => /top ranked|far thing/.test(q.query))));
});
test("low CTR: benchmarked when the pool has >=5 clicks; otherwise 'cannot benchmark yet' (confidence-capped, never ACT)", () => {
  const pool = Array.from({ length: 6 }, (_, i) => row(`/p${i}/`, null, 3, 60, 8 + (i % 2))); const target = row("/low/", null, 0, 80, 8);
  const g = graph([...pool.map((r, i) => ({ route: `/p${i}/`, title: "x" })), { route: "/low/", title: "Low", text: "low" }]);
  const raw = base({ p_last90: [...pool, target], pd_last90: dayRows("/low/", null, 80, 20) });
  const a = find(run(raw, g), "low_ctr", (o) => o.url === u("/low/")); assert.ok(a); assert.equal(a.extra.benchmark_status, "benchmarked_heuristic"); assert.ok(a.score_components.ctrGap > 0.9); assert.match(a.evidence[0], /heuristic/);
  const b = find(run(base({ p_last90: [target], pd_last90: dayRows("/low/", null, 80, 20) }), g), "low_ctr"); assert.equal(b.extra.benchmark_status, "cannot_benchmark_yet"); assert.match(b.evidence[0], /CANNOT BENCHMARK YET/); assert.equal(b.confidence, "low"); assert.ok(b.confidence_score <= C.ctr.cannotBenchmarkConfidenceCap); assert.equal(b.tier, "MONITOR");
});
test("content decay: corroborated ranking decline is ACT; volatile query mix / small samples / site-wide moves are not", () => {
  const g = graph([{ route: "/dec/", title: "Dec", text: "alpha beta gamma" }]);
  const mk = (extra) => base({ p_prev28: [row("/dec/", null, 0, 60, 6)], p_last28: [row("/dec/", null, 0, 25, 14)], pq_prev28: [row("/dec/", "alpha beta", 0, 30, 6)], pq_last28: [row("/dec/", "alpha beta", 0, 12, 14)], p_last90: [row("/dec/", null, 0, 40, 12)], pd_last90: dayRows("/dec/", null, 40, 10), p_prev90: [row("/dec/", null, 0, 100, 6)], ...extra });
  const real = find(run(mk(), g), "content_decay", (o) => o.scope === "page"); assert.equal(real.tier, "ACT"); assert.equal(real.recommended_action, "refresh outdated section"); assert.match(real.reason, /ranking_decline/);
  const mix = find(run(mk({ pq_prev28: [row("/dec/", "old query", 0, 30, 6)], pq_last28: [row("/dec/", "new query", 0, 12, 40)] }), g), "content_decay", (o) => o.scope === "page"); assert.equal(mix.tier, "MONITOR"); assert.match(mix.reason, /volatile_query_mix/);
  const tiny = find(run(base({ p_prev28: [row("/dec/", null, 0, 8, 6)], p_last28: [row("/dec/", null, 0, 2, 14)] }), g), "content_decay"); assert.equal(tiny, undefined, "tiny samples are suppressed, not reported as decay");
});
test("cannibalization: defaults to investigate; consolidate only on the stronger criteria; mixed page types are normal", () => {
  const g = graph([{ route: "/a-guide/" }, { route: "/b-guide/" }, { route: "/business-systems/" }]);
  const mk = (a, b, aImp, bImp) => base({ pq_last90: [row(a, "storm roof repair cost", 0, aImp, 9), row(b, "roof repair storm cost", 0, bImp, 11)], pq_last28: [row(a, "storm roof repair cost", 0, 8, 9), row(b, "roof repair storm cost", 0, 6, 11)], pqd_last90: [...dayRows(a, "storm roof repair cost", aImp, 6), ...dayRows(b, "roof repair storm cost", bImp, 6)] });
  const t = find(run(mk("/a-guide/", "/b-guide/", 15, 9), g), "cannibalization"); assert.equal(t.extra.classification, "likely_true_cannibalization"); assert.equal(t.recommended_action, "investigate cannibalization"); assert.equal(t.requires_manual_review, true);
  const c = find(run(mk("/a-guide/", "/b-guide/", 26, 22), g), "cannibalization"); assert.equal(c.recommended_action, "consolidate overlapping content");
  const mixed = find(run(mk("/a-guide/", "/business-systems/", 18, 14), g), "cannibalization"); assert.equal(mixed.extra.classification, "normal_multi_page_visibility"); assert.equal(mixed.tier, "MONITOR");
  const thin = find(run(base({ pq_last90: [row("/a-guide/", "storm roof repair cost", 0, 4, 9), row("/b-guide/", "roof repair storm cost", 0, 3, 11)] }), g), "cannibalization"); assert.equal(thin.extra.classification, "insufficient_evidence"); assert.equal(thin.tier, "MONITOR");
});
test("noise suppression: tiny volume, anonymized queries and high commercial intent never promote an item to ACT", () => {
  const g = graph([{ route: "/website-design-quote/", title: "Website Design Quote", text: "nothing relevant here" }]);
  const tiny = run(base({ pq_last90: [row("/website-design-quote/", "website design quote", 0, 4, 8)], pqd_last90: dayRows("/website-design-quote/", "website design quote", 4, 2) }), g); assert.equal(tiny.act.length, 0);
  const one = find(tiny, "striking_distance"); if (one) assert.ok(one.blockers.some((b) => /needs >=10 impressions/.test(b)) && one.score_components.commercial >= 0.9, "high commercial score, still blocked");
  const anon = run(base({ p_last90: [row("/website-design-quote/", null, 0, 60, 12)], pd_last90: dayRows("/website-design-quote/", null, 60, 15) }), g); assert.equal(anon.act.length, 0, "page with only anonymized queries cannot be ACT");
  const lowVis = confidenceOf({ impressions: 60, days: 15, agreement: 1, visibility: 0.1, clicks: 0 }), hiVis = confidenceOf({ impressions: 60, days: 15, agreement: 1, visibility: 1, clicks: 0 }); assert.ok(lowVis.score < hiVis.score, "anonymization lowers confidence");
  const burst = confidenceOf({ impressions: 60, days: 15, agreement: 1, visibility: 1, clicks: 0, bursty: true }); assert.ok(burst.score < hiVis.score);
});
test("score ordering and separation: more demand/proximity ranks higher; confidence changes do not change the score; ACT list is sorted", () => {
  const W = C.weights; const hi = { demand: 1, proximity: 1, ctrGap: 0, trend: 0, commercial: 1, relevance: 1, traction: 1 }, lo = { ...hi, demand: 0.2, proximity: 0.25 };
  assert.ok(scoreOf(hi, "improve title/meta").score > scoreOf(lo, "improve title/meta").score); assert.ok(scoreOf(hi, "consolidate overlapping content", 1).score < scoreOf(hi, "improve title/meta").score);
  assert.equal(Math.round(Object.values(W).reduce((a, b) => a + b, 0) * 100) / 100, 1);
  const lowC = confidenceOf({ impressions: 10, days: 3, agreement: 0.3, visibility: 0.3, clicks: 0 }), highC = confidenceOf({ impressions: 200, days: 20, agreement: 1, visibility: 1, clicks: 6 }); assert.ok(highC.score > lowC.score); assert.equal(scoreOf(hi, "improve title/meta").score, scoreOf(hi, "improve title/meta").score);
  const g = graph([{ route: "/x1/", text: "n" }, { route: "/x2/", text: "n" }]);
  const raw = base({ pq_last90: [row("/x1/", "unmatched query words aaa", 0, 60, 8), row("/x2/", "other unmatched words bbb", 0, 15, 17)], pqd_last90: [...dayRows("/x1/", "unmatched query words aaa", 60, 12), ...dayRows("/x2/", "other unmatched words bbb", 15, 5)], p_last90: [row("/x1/", null, 0, 120, 8), row("/x2/", null, 0, 30, 17)], pd_last90: [...dayRows("/x1/", null, 120, 12), ...dayRows("/x2/", null, 30, 5)], pq_last28: [row("/x1/", "unmatched query words aaa", 0, 30, 8), row("/x2/", "other unmatched words bbb", 0, 8, 17)] });
  const r = run(raw, g); const s = r.act.map((o) => o.score); assert.deepEqual(s, [...s].sort((a, b) => b - a)); assert.ok(r.act.length >= 2); assert.equal(r.act[0].url, u("/x1/"));
});
test("locks and recent changes (private, passed per run) block ACT; first_seen survives re-runs", () => {
  const g = graph([{ route: "/demo-service/", title: "Demo Service", text: "unrelated" }]);
  const raw = base({ pq_last90: [row("/demo-service/", "roof gutter cleaning plan", 0, 40, 9)], pqd_last90: dayRows("/demo-service/", "roof gutter cleaning plan", 40, 8), p_last90: [row("/demo-service/", null, 0, 120, 9)], pd_last90: dayRows("/demo-service/", null, 120, 12), pq_last28: [row("/demo-service/", "roof gutter cleaning plan", 0, 20, 8)] });
  const free = run(raw, g); assert.equal(free.act.length, 1, "control: ACT without any lock");
  const changed = find(run(raw, g, new Map(), { recentChanges: [{ url: "/demo-service/", date: "2026-10-20", note: "synthetic" }] }), "striking_distance"); assert.equal(changed.tier, "MONITOR"); assert.ok(changed.blockers.some((b) => /CHANGE SHIPPED 2026-10-20/.test(b)));
  const locked = find(run(raw, g, new Map(), { locks: [{ url: "/demo-service/", actions: ["expand existing section"], until: "2026-12-31", reason: "synthetic lock" }] }), "striking_distance"); assert.equal(locked.tier, "MONITOR"); assert.ok(locked.blockers.some((b) => /LOCKED: synthetic lock/.test(b)));
  const expired = run(raw, g, new Map(), { locks: [{ url: "/demo-service/", actions: ["expand existing section"], until: "2026-10-01", reason: "expired" }] }); assert.equal(expired.act.length, 1, "an expired lock no longer blocks");
  assert.deepEqual(C.locks, []); assert.deepEqual(C.recentChanges, [], "the public repo ships no private decisions");
  const first = free.act[0]; const again = runAll(prepare(raw, g), { today: "2026-12-01", prevIds: new Map([[first.id, first.first_seen]]), windows }).act[0];
  assert.equal(first.first_seen, "2026-10-20"); assert.equal(again.id, first.id); assert.equal(again.first_seen, "2026-10-20", "first_seen is preserved across runs");
});
test("record schema: every required field is present and the schema is versioned", () => {
  const g = graph([page]); const r = run(base({ pq_last90: [row("/demo-service/", "roof gutter cleaning plan", 0, 40, 9)], pqd_last90: dayRows("/demo-service/", "roof gutter cleaning plan", 40, 8), p_last90: [row("/demo-service/", null, 0, 120, 9)], pd_last90: dayRows("/demo-service/", null, 120, 12) }), g);
  for (const f of ["id", "category", "url", "queries", "current_metrics", "comparison_metrics", "score", "score_components", "confidence", "evidence", "recommended_action", "reason", "requires_manual_review", "first_seen", "data_window", "tier", "blockers", "why_ranked"]) assert.ok(f in all(r)[0], "missing " + f);
  assert.match(SCHEMA_VERSION, /^\d+\.\d+\.\d+$/);
});

// ---------- private-path safety (fail closed) ----------
const REPO = path.resolve(import.meta.dirname, "../..");
const tmp = () => mkdtempSync(path.join(tmpdir(), "seo-private-"));
test("private paths: input/outputs inside the public repo, via symlink or traversal, are refused; a temp dir is accepted and writes stay outside the repo", () => {
  assert.throws(() => assertPrivateInput(path.join(REPO, "tools"), REPO), PrivatePathError);
  assert.throws(() => assertPrivateInput(REPO, REPO), PrivatePathError);
  assert.throws(() => assertPrivateInput(path.join(tmp(), "..", "..", REPO.slice(1), "src"), REPO), PrivatePathError);
  const t = tmp(); symlinkSync(path.join(REPO, "src"), path.join(t, "innocent")); assert.throws(() => assertPrivateInput(path.join(t, "innocent"), REPO), PrivatePathError, "symlink into repo");
  assert.throws(() => assertPrivateInput(path.join(t, "does-not-exist"), REPO), PrivatePathError, "unresolvable path fails closed"); assert.throws(() => assertPrivateInput("", REPO), PrivatePathError);
  const ok = tmp(); const real = assertPrivateInput(ok, REPO); const out = ensurePrivateOutDir(real, REPO); assert.ok(out.endsWith("v2")); safeWrite(out, REPO, "report.md", "x"); assert.ok(existsSync(path.join(out, "report.md")));
  assert.throws(() => safeWrite(out, REPO, "../escape.md", "x"), PrivatePathError); assert.throws(() => safeWrite(out, REPO, ".hidden", "x"), PrivatePathError);
  const bad = tmp(); symlinkSync(path.join(REPO, "src"), path.join(bad, "v2")); assert.throws(() => ensurePrivateOutDir(assertPrivateInput(bad, REPO), REPO), PrivatePathError, "v2 symlinked into the repo");
  const lnk = tmp(); const o2 = ensurePrivateOutDir(assertPrivateInput(lnk, REPO), REPO); symlinkSync(path.join(REPO, "package.json"), path.join(o2, "opportunities.json")); assert.throws(() => safeWrite(o2, REPO, "opportunities.json", "x"), PrivatePathError, "output file symlinked into the repo");
});
test("CLI refuses repo paths (exit 3) and writes nothing into the repo", () => {
  const before = readdirSync(REPO).sort().join(); const r = spawnSync("node", ["--experimental-strip-types", path.join(REPO, "tools/seo-intelligence/scan.mjs"), path.join(REPO, "src")], { encoding: "utf8" });
  assert.equal(r.status, 3); assert.match(r.stderr, /PRIVATE-PATH GUARD/); assert.equal(readdirSync(REPO).sort().join(), before); assert.ok(!existsSync(path.join(REPO, "src", "v2")));
  const empty = tmp(); const r2 = spawnSync("node", ["--experimental-strip-types", path.join(REPO, "tools/seo-intelligence/scan.mjs"), empty], { encoding: "utf8" }); assert.notEqual(r2.status, 0); assert.ok(!existsSync(path.join(REPO, "v2")));
});
