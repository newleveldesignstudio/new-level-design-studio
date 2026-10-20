// NLDS SEO Intelligence v2: unified Opportunity records, detectors, explainable scoring, SEPARATE confidence, Act/Monitor gate.
import { createHash } from "node:crypto";
import * as L from "./lib.mjs";
import { CONFIG as C, SCHEMA_VERSION } from "./config.mjs";

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sum = (a, k) => a.reduce((s, r) => s + (r[k] ?? 0), 0);
const r1 = (x) => (x == null ? null : +x.toFixed(1)), r3 = (x) => +x.toFixed(3);
const path_ = (u) => new URL(u).pathname;
export const idFor = (category, key) => `${category}:${createHash("sha1").update(key).digest("hex").slice(0, 10)}`;

// ---------- data prep ----------
export function prepare(raw, graph) {
  const nz = (rows, k) => L.normalize(rows, k);
  const D = { pq90: nz(raw.pq_last90, "last_90d"), pq28: nz(raw.pq_last28, "last_28d"), pqPrev28: nz(raw.pq_prev28, "prev_28d"), p90: nz(raw.p_last90, "last_90d"), p28: nz(raw.p_last28, "last_28d"), pPrev28: nz(raw.p_prev28, "prev_28d"), pPrev90: nz(raw.p_prev90 ?? [], "prev_90d"), pqPrev90: nz(raw.pq_prev90 ?? [], "prev_90d") };
  D.pageDays = new Map(); D.pqDays = new Map(); D.queryDays = new Map();
  const add = (m, k, date, imp) => { if (!m.has(k)) m.set(k, new Map()); m.get(k).set(date, (m.get(k).get(date) ?? 0) + imp); };
  for (const r of raw.pd_last90 ?? []) if (r.impressions > 0) add(D.pageDays, L.normUrl(r.page), r.date, r.impressions);
  for (const r of raw.pqd_last90 ?? []) if (r.impressions > 0) { const pg = L.normUrl(r.page), q = r.query.toLowerCase().trim(); add(D.pqDays, pg + "\0" + q, r.date, r.impressions); add(D.queryDays, q, r.date, r.impressions); }
  D.haveQueryDays = (raw.pqd_last90 ?? []).length > 0;
  D.p90By = new Map(D.p90.map((r) => [r.page, r]));
  const el = D.p90.filter((r) => L.pageType(path_(r.page)) !== "legal");
  D.maxImp = Math.max(1, ...el.map((r) => r.impressions)); D.maxTr = Math.log1p(Math.max(1, ...el.map((r) => r.clicks * 4 + r.impressions / 20)));
  D.graph = graph; return D;
}
const eligible = (D, url) => L.pageType(path_(url)) !== "legal";
const daysOf = (m) => (m ? m.size : 0);
const burstShare = (m) => { if (!m || !m.size) return 0; const v = [...m.values()].sort((a, b) => b - a), t = v.reduce((a, b) => a + b, 0); return t ? v.slice(0, C.burst.topDays).reduce((a, b) => a + b, 0) / t : 0; };
const visibility = (D, page) => { const pr = D.p90By.get(page); if (!pr?.impressions) return 0; return Math.min(1, sum(D.pq90.filter((x) => x.page === page), "impressions") / pr.impressions); };
const mq = (r) => ({ query: r.query, impressions: r.impressions, clicks: r.clicks, position: r1(r.position) });
const m = (r) => (r ? { impressions: r.impressions, clicks: r.clicks, ctr: r3(r.ctr), position: r1(r.position) } : null);

// ---------- scoring + confidence + gate ----------
export function components(D, { page, imp, pos, ctrGap = 0, trend = 0, queries = [], relevance, clicks = 0 }) {
  const qs = queries.filter((q) => q.impressions > 0); const comm = qs.length ? sum(qs.map((q) => ({ v: L.commercialQuery(q.query) * q.impressions })), "v") / sum(qs, "impressions") : L.commercialPage(page, []);
  const pt = L.pageType(path_(page)); const hub = !!L.THEME_HUB[L.themeOf((qs[0]?.query ?? "") + " " + (D.graph.pages.get(page)?.title ?? "")) ?? ""];
  const rel = relevance ?? ({ service: 1, local: 1, home: 0.7, article: hub ? 0.6 : 0.35, work: 0.2, other: 0.3, legal: 0 }[pt] ?? 0.3);
  return { demand: r3(clamp(Math.log1p(imp) / Math.log1p(D.maxImp))), proximity: r3(pos ? L.proximityScore(pos) : 0), ctrGap: r3(clamp(ctrGap)), trend: r3(clamp(trend)), commercial: r3(clamp(comm)), relevance: r3(clamp(rel)), traction: r3(clamp(Math.log1p(clicks * 4 + imp / 20) / D.maxTr)) };
}
export function scoreOf(comp, action, risk = 0) {
  const W = C.weights; const parts = Object.fromEntries(Object.keys(W).map((k) => [k, W[k] * (comp[k] ?? 0) * 100]));
  const pos = Object.values(parts).reduce((a, b) => a + b, 0), eff = C.penalties.effort * (C.effort[action] ?? 0.4), rk = C.penalties.risk * risk;
  return { score: r1(clamp(pos - eff - rk, 0, 100)), positive: r1(pos), effort_penalty: r1(eff), risk_penalty: r1(rk), contributions: Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, r1(v)])) };
}
export function confidenceOf({ impressions, days, agreement, visibility: vis, clicks, bursty = false, cap = null }) {
  const W = C.confidence.weights, tier = (x, t) => t.find(([min]) => x >= min)[1];
  let sample = tier(impressions, [[100, 1], [50, 0.8], [20, 0.6], [10, 0.4], [3, 0.25], [0, 0.1]]); if (bursty) sample *= C.burst.samplePenalty;
  const c = { sample: r3(sample), days: tier(days ?? 0, [[10, 1], [5, 0.75], [3, 0.5], [1, 0.25], [0, 0.1]]), agreement, visibility: tier(vis, [[0.7, 1], [0.3, 0.6], [0, 0.3]]), clicks: tier(clicks, [[5, 1], [1, 0.6], [0, 0.3]]) };
  let score = Object.keys(W).reduce((a, k) => a + W[k] * c[k], 0); if (cap != null) score = Math.min(score, cap);
  return { score: r3(score), level: score >= C.confidence.high ? "high" : score >= C.confidence.medium ? "medium" : "low", components: c };
}
const RANK = { low: 0, medium: 1, high: 2 };

/** One place that builds the final record (so every detector is scored/gated identically). */
function finalize(D, ctx, o) {
  const comp = components(D, { page: o.url, imp: o.gateImpressions, pos: o.position, ctrGap: o.ctrGap, trend: o.trend, queries: o.queries, relevance: o.relevance, clicks: o.current.clicks ?? 0 });
  const sc = scoreOf(comp, o.action, o.risk ?? 0);
  const conf = confidenceOf({ impressions: o.gateImpressions, days: o.days, agreement: o.agreement, visibility: o.visibility, clicks: o.current.clicks ?? 0, bursty: o.bursty, cap: o.confidenceCap });
  const G = C.gates, need = o.level === "query" ? [G.queryMinImpressions, G.queryMinDays] : o.level === "cluster" ? [G.clusterMinImpressions, G.clusterMinDays] : [G.pageMinImpressions, 0];
  const blockers = [...(o.blockers ?? [])];
  if (o.gateImpressions < need[0]) blockers.push(`needs >=${need[0]} impressions (has ${o.gateImpressions})`);
  if (need[1] && (o.days ?? 0) < need[1]) blockers.push(`needs impressions on >=${need[1]} distinct days (has ${o.days ?? "unknown"})`);
  if (RANK[conf.level] < RANK[C.actMinConfidence]) blockers.push(`confidence ${conf.level} (${conf.score}) is below ${C.actMinConfidence}`);
  if (o.action === "monitor only / insufficient evidence") blockers.push("no defensible action yet");
  for (const k of ctx.locks ?? C.locks) if (L.normUrl(L.SITE + k.url) === o.url && k.actions.includes(o.action) && ctx.today < k.until) blockers.push(`LOCKED: ${k.reason}`);
  for (const c of ctx.recentChanges ?? C.recentChanges) if (L.normUrl(L.SITE + c.url) === o.url && ctx.windows.last_90d.endDate < c.date) blockers.push(`CHANGE SHIPPED ${c.date} (${c.note}): this window ends ${ctx.windows.last_90d.endDate}, so wait for a full post-change window before judging`);
  if (o.bursty) blockers.push("impressions concentrated on a few days (possible self-search / rank-tracker noise)");
  const top3 = Object.entries(sc.contributions).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k} ${v}`).join(", ");
  const id = idFor(o.category, o.key);
  return { id, category: o.category, scope: o.level, tier: blockers.length ? "MONITOR" : "ACT", url: o.url, queries: o.queries ?? [], current_metrics: o.current, comparison_metrics: o.comparison ?? null, score: sc.score, score_components: comp, score_breakdown: sc,
    confidence: conf.level, confidence_score: conf.score, confidence_components: conf.components, evidence: o.evidence, recommended_action: o.action, reason: o.reason, requires_manual_review: !!o.manual || conf.level !== "high" || ["consolidate overlapping content", "create supporting article", "create service/landing page"].includes(o.action),
    blockers, why_ranked: `score ${sc.score}: top contributors ${top3}; effort -${sc.effort_penalty}, risk -${sc.risk_penalty}; confidence ${conf.level} (${conf.score}) is separate`,
    additional_evidence_needed: o.needs ?? [], first_seen: ctx.prevIds.get(id) ?? ctx.today, data_window: o.window ?? ctx.windows, extra: o.extra };
}

// ---------- detectors ----------
const inRange = (p) => p >= C.striking.minPos && p <= C.striking.maxPos;
function strikingAction(D, page, query) {
  const pg = D.graph.pages.get(page); const text = pg?.text ?? "", title = pg?.title.toLowerCase() ?? "";
  const missing = L.tokens(query).filter((t) => !text.includes(t));
  if (L.coverage(query, text) < 0.67) return { action: "expand existing section", why: `page text does not cover "${query}" (missing terms: ${missing.join(", ")}): add a section that answers it` };
  const key = L.tokens(query).filter((t) => !C.title.genericTokens.includes(t)); const miss = key.filter((t) => !title.includes(t));
  if (key.length && miss.length / key.length >= C.title.minMissingShare) return { action: "improve title/meta", why: `page covers "${query}" in its body but the title ("${pg?.title}") lacks ${miss.length} of ${key.length} meaningful query words: ${miss.join(", ")}` };
  if (D.graph.contentInbound(page) <= C.links.weakInboundMax + 1) return { action: "add internal links", why: `page already covers and is titled for "${query}"; only ${D.graph.contentInbound(page)} in-content link(s) point to it` };
  return { action: "monitor only / insufficient evidence", why: `page already covers and is titled for "${query}" and is reasonably linked; no clear lever yet` };
}
export function detectStriking(D, ctx) {
  const out = []; const withQuery = new Set();
  for (const r of D.pq90) {
    if (!inRange(r.position) || r.impressions < C.gates.queryEmitImpressions || L.isBranded(r.query) || !eligible(D, r.page)) continue;
    withQuery.add(r.page); const key = r.page + "\0" + r.query; const days = D.pqDays.get(key); const last = D.pq28.find((x) => x.page === r.page && x.query === r.query), prev = D.pqPrev28.find((x) => x.page === r.page && x.query === r.query);
    const a = strikingAction(D, r.page, r.query); const bursty = r.impressions >= C.burst.minImpressions && burstShare(days) > C.burst.maxShare;
    out.push(finalize(D, ctx, { category: "striking_distance", key, level: "query", url: r.page, queries: [mq(r)], current: m(r), comparison: { last_28d: m(last), prev_28d: m(prev) }, position: r.position, gateImpressions: r.impressions, days: D.haveQueryDays ? daysOf(days) : null, agreement: last && inRange(last.position) ? 1 : last ? 0.5 : 0.3, visibility: visibility(D, r.page), bursty, action: a.action, reason: a.why,
      evidence: [`"${r.query}": ${r.impressions} impressions, position ${r1(r.position)}, ${r.clicks} clicks (90d)`, last ? `last 28d: ${last.impressions} imp @ ${r1(last.position)}` : "not visible in last 28d", prev ? `previous 28d: ${prev.impressions} imp @ ${r1(prev.position)}` : "not visible in previous 28d", `distinct days with impressions: ${daysOf(days)}`], needs: ["more weeks of data to confirm the position holds", "check the live results page for this query before editing"] }));
  }
  for (const r of D.p90) { // page-level: only when no query-level evidence exists for the page
    if (!inRange(r.position) || r.impressions < C.gates.pageEmitImpressions || withQuery.has(r.page) || !eligible(D, r.page)) continue;
    const qs = D.pq90.filter((x) => x.page === r.page && !L.isBranded(x.query)).sort((a, b) => b.impressions - a.impressions).slice(0, 3);
    const qImp = sum(qs, "impressions"), qPos = qImp ? sum(qs.map((x) => ({ v: x.position * x.impressions })), "v") / qImp : 0;
    const usable = qs.length && visibility(D, r.page) >= C.striking_page.minVisibleShare && qs[0].impressions >= C.gates.queryEmitImpressions && inRange(qPos);
    if (qs.length && visibility(D, r.page) >= C.striking_page.minVisibleShare && !inRange(qPos)) continue; // the page average is a blend (e.g. position-1 queries + position-100 noise), not striking distance
    const days = D.pageDays.get(r.page), last = D.p28.find((x) => x.page === r.page), prev = D.pPrev28.find((x) => x.page === r.page);
    const a = usable ? strikingAction(D, r.page, qs[0].query) : { action: "monitor only / insufficient evidence", why: "page averages position 6-20 but its visible queries are too few/small to act on (most impressions are anonymized)" };
    out.push(finalize(D, ctx, { category: "striking_distance", key: r.page, level: "page", url: r.page, queries: qs.map(mq), current: m(r), comparison: { last_28d: m(last), prev_28d: m(prev) }, position: r.position, gateImpressions: r.impressions, days: daysOf(days), agreement: last && inRange(last.position) ? 1 : 0.5, visibility: visibility(D, r.page), bursty: false, blockers: usable ? [] : ["no usable query-level evidence (queries anonymized or too small)"], action: a.action, reason: a.why,
      evidence: [`page average position ${r1(r.position)} on ${r.impressions} impressions (90d); ${Math.round(visibility(D, r.page) * 100)}% of its impressions have visible queries`], needs: ["query-level data (more traffic) to know which query to target"] }));
  }
  return out;
}

function pool(rows, self, win) { const o = rows.filter((x) => x !== self && Math.abs(x.position - self.position) <= win); const imp = sum(o, "impressions"), clk = sum(o, "clicks"); return { clicks: clk, impressions: imp, ctr: imp ? clk / imp : 0 }; }
export function detectLowCtr(D, ctx) {
  const out = []; const W = C.ctr.window;
  const run = (rows, level, emit, zMin) => {
    for (const r of rows) {
      if (r.impressions < emit || !eligible(D, r.page) || (level === "query" && L.isBranded(r.query))) continue;
      const bm = pool(rows, r, W); const ok = bm.clicks >= C.ctr.benchmarkMinClicks; let gap = 0, status, evidenceLine;
      if (ok) { const ratio = bm.ctr ? r.ctr / bm.ctr : 1; if (!(ratio < C.ctr.flagBelowRatio && bm.ctr * r.impressions >= C.ctr.minExpectedClicks)) continue; gap = 1 - ratio; status = "benchmarked_heuristic"; evidenceLine = `CTR ${(r.ctr * 100).toFixed(1)}% vs pooled NLDS CTR ${(bm.ctr * 100).toFixed(1)}% for positions within +-${W} (${bm.clicks} clicks / ${bm.impressions} imp) [heuristic, not an external benchmark]`; }
      else { if (!(r.clicks === 0 && r.position <= C.ctr.zeroClickMaxPos && r.impressions >= zMin)) continue; gap = 0.3; status = "cannot_benchmark_yet"; evidenceLine = `CANNOT BENCHMARK YET: only ${bm.clicks} click(s) among NLDS rows within +-${W} positions (needs >=${C.ctr.benchmarkMinClicks}). Flagged only by the zero-click heuristic: ${r.impressions} impressions at position ${r1(r.position)} with 0 clicks`; }
      const key = level === "query" ? r.page + "\0" + r.query : r.page; const days = level === "query" ? D.pqDays.get(key) : D.pageDays.get(r.page); const qs = level === "query" ? [mq(r)] : D.pq90.filter((x) => x.page === r.page && !L.isBranded(x.query)).sort((a, b) => b.impressions - a.impressions).slice(0, 3).map(mq);
      const bursty = r.impressions >= C.burst.minImpressions && burstShare(days) > C.burst.maxShare;
      out.push(finalize(D, ctx, { category: "low_ctr", key, level, url: r.page, queries: qs, current: m(r), position: r.position, ctrGap: gap, gateImpressions: r.impressions, days: level === "query" && !D.haveQueryDays ? null : daysOf(days), agreement: 0.5, visibility: level === "query" ? 1 : visibility(D, r.page), bursty, confidenceCap: status === "cannot_benchmark_yet" ? C.ctr.cannotBenchmarkConfidenceCap : null,
        action: "improve title/meta", reason: status === "cannot_benchmark_yet" ? "possible weak snippet, but the dataset cannot show it yet; check the live results page (own searches and rank trackers can inflate zero-click rows) before touching the title" : "CTR is far below NLDS's own comparable rows; review title/description against the query intent", extra: { benchmark_status: status },
        evidence: [evidenceLine, `distinct days with impressions: ${daysOf(days)}`], needs: ["more clicks in comparable positions to build a defensible benchmark", "live results-page check for the query"] }));
    }
  };
  run(D.p90, "page", C.gates.pageEmitImpressions, C.ctr.zeroClickMinPageImpressions); run(D.pq90, "query", C.gates.queryEmitImpressions, C.ctr.zeroClickMinQueryImpressions);
  return out;
}

export function detectDecay(D, ctx) {
  const out = []; const dc = C.decay;
  const x_ok = (y) => y.impressions >= 5;
  const go = (cur, prev, level, minPrev, label) => {
    const rows = L.detectDecay(cur, prev, null, null, { minPrevImp: minPrev });
    for (const d of rows) {
      const [page, query] = d.page.split("\0"); if (!eligible(D, page) || (query && L.isBranded(query))) continue;
      const drop = d.impressions[0] - d.impressions[1], rel = d.impressions[0] ? drop / d.impressions[0] : 0; const blockers = [];
      if (d.impressions[0] < minPrev) blockers.push(`previous-window sample too small (${d.impressions[0]} < ${minPrev} impressions)`);
      if (drop < dc.minAbsoluteDrop) blockers.push(`absolute change ${drop} < ${dc.minAbsoluteDrop} impressions (noise)`);
      let cause = d.cause;
      if (!query && /^ranking_decline/.test(cause)) { // a page-average move only counts if the SAME queries got worse (otherwise it is query-mix noise)
        const both = D.pq28.filter((x) => x.page === page).map((x) => [x, D.pqPrev28.find((y) => y.page === page && y.query === x.query)]).filter(([, y]) => y && x_ok(y)); const worse = both.filter(([x, y]) => x.position - y.position >= dc.positionWorsen);
        if (!worse.length) cause = "volatile_query_mix (page average position moved but no shared query got worse)"; }
      const real = /^ranking_decline/.test(cause);
      if (!real) blockers.push(`likely not content decay: ${cause}`);
      const sev = clamp(Math.max(rel, d.position[1] != null ? (d.position[1] - d.position[0]) / 30 : 0));
      const key = page + (query ? "\0" + query : ""); const days = query ? D.pqDays.get(page + "\0" + query) : D.pageDays.get(page);
      const cur90 = query ? D.pq90.find((x) => x.page === page && x.query === query) : D.p90By.get(page); const cmp90 = (query ? D.pqPrev90 : D.pPrev90).find((x) => x.page === page && (!query || x.query === query));
      const agree = cmp90 && cmp90.impressions > 0 && cur90 && cur90.impressions < cmp90.impressions * (1 - dc.minRelativeDrop) ? 1 : 0.5;
      out.push(finalize(D, ctx, { category: "content_decay", key, level: query ? "query" : "page", url: page, queries: query ? [{ query, impressions: d.impressions[1], clicks: d.clicks[1], position: r1(d.position[1]) }] : [], current: { impressions: d.impressions[1], clicks: d.clicks[1], ctr: r3(d.ctr[1]), position: r1(d.position[1]) }, comparison: { prev_28d: { impressions: d.impressions[0], clicks: d.clicks[0], ctr: r3(d.ctr[0]), position: r1(d.position[0]) }, site_impression_change_28d: r3(d.siteImpressionChange) },
        position: d.position[1] ?? 0, trend: sev, gateImpressions: Math.max(d.impressions[0], d.impressions[1]), days: query && !D.haveQueryDays ? null : daysOf(days), agreement: agree, visibility: query ? 1 : visibility(D, page), bursty: false, blockers,
        action: real ? "refresh outdated section" : "monitor only / insufficient evidence", reason: `${cause}; 28d vs previous 28d: impressions ${d.impressions.join("→")}, clicks ${d.clicks.join("→")}, position ${d.position.map((x) => (x == null ? "none" : r1(x))).join("→")}; site-wide impressions moved ${(d.siteImpressionChange * 100).toFixed(0)}% (${label})`,
        evidence: [`cause classification: ${cause}`, `previous 28d ${d.impressions[0]} imp → last 28d ${d.impressions[1]} imp`], needs: ["a second consecutive window showing the same decline", "check whether the page changed (git log) or the query set changed"], manual: real }));
    }
  };
  const key = (rows) => rows.map((r) => ({ ...r, page: r.page + "\0" + r.query }));
  go(D.p28, D.pPrev28, "page", dc.pageMinPrevImpressions, "page level"); go(key(D.pq28), key(D.pqPrev28), "query", dc.queryMinPrevImpressions, "query level");
  return out;
}

export function detectCannibalization(D, ctx) {
  const K = C.cannibalization, out = []; const rep = new Set(L.detectCannibalization(D.pq28, { minImp: 1 }).map((g) => g.intent));
  for (const g of L.detectCannibalization(D.pq90, { minImp: K.minImpressionsEach })) {
    const pages = g.pages.filter((p) => eligible(D, p.page)); if (pages.length < 2) continue;
    const types = [...new Set(pages.map((p) => L.pageType(path_(p.page))))], share = pages[0].impressions / g.totalImpressions, gap = Math.max(...pages.map((p) => p.position)) - Math.min(...pages.map((p) => p.position)), repeated = rep.has(g.intent), eachMin = Math.min(...pages.map((p) => p.impressions));
    let cls, why;
    if (types.length > 1 || share >= K.topShareMax || gap > K.positionGapMax) { cls = "normal_multi_page_visibility"; why = types.length > 1 ? `different page types (${types.join(" + ")}): expected` : share >= K.topShareMax ? `one URL holds ${(share * 100).toFixed(0)}% of impressions` : `positions differ by ${r1(gap)}: one URL clearly outranks the other`; }
    else if (eachMin >= K.trueMinImpressionsEach && repeated) { cls = "likely_true_cannibalization"; why = `same-type URLs each >=${K.trueMinImpressionsEach} impressions, top share ${(share * 100).toFixed(0)}%, repeats in the last 28d`; }
    else { cls = "insufficient_evidence"; why = `${eachMin < K.trueMinImpressionsEach ? `a URL has only ${eachMin} impressions` : "not seen in the last 28d"}`; }
    const consolidate = cls === "likely_true_cannibalization" && eachMin >= K.consolidateMinEach && share < 0.6;
    const action = cls === "likely_true_cannibalization" ? (consolidate ? "consolidate overlapping content" : "investigate cannibalization") : "monitor only / insufficient evidence";
    const days = D.haveQueryDays ? Math.max(...pages.map((p) => daysOf(D.pqDays.get(p.page + "\0" + p.queries[0])))) : null;
    out.push(finalize(D, ctx, { category: "cannibalization", key: g.intent, level: "cluster", url: pages[0].page, queries: g.queries.map((q) => ({ query: q })), current: { impressions: g.totalImpressions, clicks: sum(pages, "clicks"), position: r1(pages[0].position) }, comparison: { competing_urls: pages.map((p) => ({ url: p.page, impressions: p.impressions, clicks: p.clicks, position: r1(p.position) })) },
      position: pages[0].position, gateImpressions: g.totalImpressions, days, agreement: repeated ? 1 : 0.5, visibility: 1, risk: cls === "likely_true_cannibalization" ? 1 : 0.3, relevance: 0.7, action, manual: true, reason: `${cls.replace(/_/g, " ")}: ${why}. Default response is to investigate, not merge.`,
      blockers: cls === "likely_true_cannibalization" ? [] : [`classified ${cls}`], extra: { classification: cls },
      evidence: [`${pages.length} URLs share the intent "${g.queries[0]}": ${pages.map((p) => `${path_(p.page)} ${p.impressions}i@${r1(p.position)}`).join(" vs ")}`, `classification: ${cls}`], needs: ["a repeat in the next window", "manual review of both pages' intent before any consolidation"] }));
  }
  return out;
}

function suggestSources(D, target, queries) {
  const tp = D.graph.pages.get(target); const terms = [...new Set([...queries.flatMap((q) => L.tokens(q.query ?? q)), ...(queries.length ? [] : L.tokens(tp?.title ?? ""))])].filter((t) => t.length > 3); if (!terms.length) return [];
  const out = [];
  for (const s of D.graph.pages.values()) {
    if (s.url === target || s.type === "legal" || !s.text || D.graph.linksInContent(s.url, target)) continue;
    const hit = terms.filter((t) => s.text.includes(t)); if (hit.length < Math.min(2, terms.length)) continue;
    const phrase = queries.map((q) => q.query ?? q).find((q) => s.text.includes(q)); out.push({ source: s.url, source_type: s.type, target, topic_overlap: r3(hit.length / terms.length), anchor_context: phrase ?? null, anchor_phrase_found_in_source: !!phrase, matched_terms: hit });
  }
  return out.sort((a, b) => b.topic_overlap - a.topic_overlap || Number(b.anchor_phrase_found_in_source) - Number(a.anchor_phrase_found_in_source)).slice(0, C.links.maxSuggestions);
}
export function detectInternalLinks(D, ctx) {
  const out = [], G = D.graph, K = C.links;
  for (const r of D.p90) { // (a) pages with search traction but weak in-content linking
    const pt = L.pageType(path_(r.page)); if (pt === "legal" || r.page === L.SITE + "/" || !G.pages.has(r.page)) continue;
    if (!(r.impressions >= K.tractionMinImpressions || r.clicks >= 1) || G.contentInbound(r.page) > K.weakInboundMax || G.chromeInbound(r.page) >= K.sitewideSkipChromeInbound) continue;
    const qs = D.pq90.filter((x) => x.page === r.page && !L.isBranded(x.query)).sort((a, b) => b.impressions - a.impressions).slice(0, 3); const sug = qs.length ? suggestSources(D, r.page, qs) : []; const days = D.pageDays.get(r.page);
    out.push(finalize(D, ctx, { category: "internal_links", key: "weak:" + r.page, level: "page", url: r.page, queries: qs.map(mq), current: { ...m(r), content_inbound_links: G.contentInbound(r.page), chrome_inbound_links: G.chromeInbound(r.page) }, position: r.position, gateImpressions: r.impressions, days: daysOf(days), agreement: 0.5, visibility: visibility(D, r.page), clicks: r.clicks,
      action: sug.length ? "add internal links" : "monitor only / insufficient evidence", blockers: sug.length ? [] : [qs.length ? "no relevant source page found in the rendered site" : "no visible query to anchor on (anonymized): cannot propose a defensible anchor"], reason: `has search traction (${r.impressions} imp, ${r.clicks} clicks) but only ${G.contentInbound(r.page)} in-content link(s) (${G.chromeInbound(r.page)} sitewide nav/footer)`, extra: { suggestions: sug, link_graph_source: G.source },
      evidence: [`in-content inbound links: ${G.contentInbound(r.page)}; sitewide: ${G.chromeInbound(r.page)} (source: ${G.source})`, ...sug.slice(0, 3).map((s) => `${path_(s.source)} → ${path_(s.target)} (overlap ${s.topic_overlap}${s.anchor_context ? `, anchor "${s.anchor_context}"` : ""})`)], needs: ["a rendered-site crawl including JS-injected links (dist is used when available)"] }));
  }
  const themeImp = new Map(); for (const r of D.pq90) { const t = L.themeOf(r.query); if (t && !L.isBranded(r.query)) themeImp.set(t, (themeImp.get(t) ?? 0) + r.impressions); }
  for (const r of D.p90) { // (b) article with traction should reach the theme's service hub
    if (L.pageType(path_(r.page)) !== "article" || r.impressions < K.tractionMinImpressions) continue;
    const qs = D.pq90.filter((x) => x.page === r.page && !L.isBranded(x.query)).sort((a, b) => b.impressions - a.impressions); const theme = L.themeOf((qs[0]?.query ?? "") + " " + (G.pages.get(r.page)?.title ?? "")); const hubRoute = L.THEME_HUB[theme]; if (!hubRoute) continue;
    const hub = L.normUrl(L.SITE + hubRoute); if (hub === r.page || !G.pages.has(hub) || G.linksInContent(r.page, hub)) continue;
    const hubImp = D.p90By.get(hub)?.impressions ?? 0; const thImp = themeImp.get(theme) ?? 0; if (thImp && hubImp > thImp * K.themeHubMaxShare) continue;
    const anchor = qs[0]?.query ?? null; const days = D.pageDays.get(r.page);
    out.push(finalize(D, ctx, { category: "internal_links", key: "hub:" + r.page + ">" + hub, level: "page", url: hub, queries: qs.slice(0, 3).map(mq), current: { ...m(r), source_url: r.page, hub_impressions: hubImp, theme_visible_impressions: thImp }, position: r.position, gateImpressions: r.impressions, days: daysOf(days), agreement: 0.5, visibility: visibility(D, r.page), clicks: r.clicks, relevance: 1,
      action: "add internal links", reason: `article ${path_(r.page)} has ${r.impressions} impressions in the "${theme}" theme but no in-content link to the service page ${path_(hub)} (which gets ${hubImp} of ${thImp} visible theme impressions)`, extra: { suggestions: [{ source: r.page, source_type: "article", target: hub, anchor_context: anchor, anchor_phrase_found_in_source: !!anchor && (G.pages.get(r.page)?.text ?? "").includes(anchor), topic_overlap: null }], link_graph_source: G.source },
      evidence: [`${path_(r.page)} (${r.impressions} imp, pos ${r1(r.position)}) → ${path_(hub)}: no in-content link in the rendered page`, `theme: ${theme}`], needs: ["confirm the sentence/anchor reads naturally in the article before adding"] }));
  }
  return out;
}

export function detectCommercialGaps(D, ctx) {
  const byQ = new Map(); for (const r of D.pq90) { if (L.isBranded(r.query) || !eligible(D, r.page)) continue; const x = byQ.get(r.query) ?? { query: r.query, impressions: 0, clicks: 0, pages: [] }; x.impressions += r.impressions; x.clicks += r.clicks; x.pages.push(r.page); byQ.set(r.query, x); }
  const gaps = [], ignored = []; const pages = [...D.graph.pages.values()];
  for (const q of byQ.values()) {
    if (q.impressions < C.gates.monitorFloorImpressions) continue; const comm = L.commercialQuery(q.query);
    if (comm < C.gaps.minQueryCommercial) { ignored.push(q.query); continue; }
    const best = Math.max(0, ...pages.map((p) => L.coverage(q.query, p.text))); if (best >= C.gaps.maxBestCoverage) continue; gaps.push({ ...q, comm, best });
  }
  const by = new Map(); for (const g of gaps) { const t = L.themeOf(g.query) ?? "unmapped"; (by.get(t) ?? by.set(t, []).get(t)).push(g); }
  const out = [];
  for (const [theme, gs] of by) {
    const imp = sum(gs, "impressions"), hubRoute = L.THEME_HUB[theme], hub = hubRoute ? L.normUrl(L.SITE + hubRoute) : null; const dates = new Set(); for (const g of gs) for (const d of (D.queryDays.get(g.query)?.keys() ?? [])) dates.add(d);
    const action = hub ? "create supporting article" : "create service/landing page"; const top = gs.sort((a, b) => b.impressions - a.impressions);
    out.push(finalize(D, ctx, { category: "commercial_gap", key: theme, level: "cluster", url: hub ?? top[0].pages[0], queries: top.map((g) => ({ query: g.query, impressions: g.impressions, clicks: g.clicks })), current: { impressions: imp, clicks: sum(gs, "clicks"), best_existing_page_coverage: r3(Math.max(...gs.map((g) => g.best))) }, position: 0, gateImpressions: imp, days: D.haveQueryDays ? dates.size : null, agreement: 0.5, visibility: 1,
      relevance: Math.max(...gs.map((g) => g.comm)), action, manual: true, reason: `commercially relevant queries (${top.slice(0, 3).map((g) => `"${g.query}"`).join(", ")}) are not answered well by any existing page (best coverage ${r3(Math.max(...gs.map((g) => g.best)))} < ${C.gaps.maxBestCoverage})${hub ? `; the theme's service page ${path_(hub)} exists` : "; no matching service destination exists"}`,
      evidence: [`${gs.length} uncovered commercial quer${gs.length > 1 ? "ies" : "y"}, ${imp} impressions total (90d)`, `${ignored.length} non-commercial quer${ignored.length === 1 ? "y" : "ies"} ignored (not treated as gaps)`], needs: ["a second window with the same queries", "manual check that no existing page already serves this intent under different wording"] }));
  }
  return { out, ignored };
}

export function runAll(D, ctx) {
  const gaps = detectCommercialGaps(D, ctx);
  const all = [...detectStriking(D, ctx), ...detectLowCtr(D, ctx), ...detectDecay(D, ctx), ...detectCannibalization(D, ctx), ...detectInternalLinks(D, ctx), ...gaps.out];
  const seen = new Set(); const uniq = all.filter((o) => (seen.has(o.id) ? false : seen.add(o.id)));
  const cmp = (a, b) => b.score - a.score || b.confidence_score - a.confidence_score || a.id.localeCompare(b.id);
  return { act: uniq.filter((o) => o.tier === "ACT").sort(cmp), monitor: uniq.filter((o) => o.tier === "MONITOR").sort(cmp), nonCommercialIgnored: gaps.ignored.length };
}
export { SCHEMA_VERSION };
