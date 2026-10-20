#!/usr/bin/env node
// NLDS SEO Intelligence, Phase 1: SEO Opportunity Scanner. READ-ONLY analysis: reads raw GSC pulls + site source, writes reports. Edits no page.
//   node --experimental-strip-types tools/seo-intelligence/scan.mjs reports/seo-intelligence/<date>
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { articles } from "../../src/data/articles.ts";
import * as L from "./lib.mjs";

const dir = process.argv[2]; if (!dir) { console.error("usage: scan.mjs <report-dir containing raw/>"); process.exit(1); }
const root = path.resolve(import.meta.dirname, "../.."); const rawDir = path.join(dir, "raw");
const meta = JSON.parse(readFileSync(path.join(rawDir, "pq_last90.json"), "utf8")).range; const m28 = JSON.parse(readFileSync(path.join(rawDir, "pq_last28.json"), "utf8")).range;
const P = { last_28d: ["pq_last28", "p_last28"], prev_28d: ["pq_prev28", "p_prev28"], last_90d: ["pq_last90", "p_last90"], prev_90d: ["pq_prev90", "p_prev90"] };
const ds = {}; for (const [k, [pq, p]] of Object.entries(P)) ds[k] = { pq: L.normalize(L.readRaw(rawDir, pq), k), page: L.normalize(L.readRaw(rawDir, p), k) };
mkdirSync(path.join(dir, "normalized"), { recursive: true }); mkdirSync(path.join(dir, "derived"), { recursive: true });
for (const [k, v] of Object.entries(ds)) { writeFileSync(path.join(dir, "normalized", k + "_page_query.json"), JSON.stringify(v.pq, null, 1)); writeFileSync(path.join(dir, "normalized", k + "_page.json"), JSON.stringify(v.page, null, 1)); }
const variants = L.urlVariants([...L.readRaw(rawDir, "p_last90"), ...L.readRaw(rawDir, "p_last28"), ...L.readRaw(rawDir, "p_prev28")]);
const catalog = L.loadCatalog(root, articles);
const tot = (a, k) => a.reduce((s, r) => s + r[k], 0); const pct = (a, b) => (b ? ((a / b - 1) * 100).toFixed(0) + "%" : "n/a");
const site = Object.fromEntries(Object.entries(ds).map(([k, v]) => [k, { clicks: tot(v.page, "clicks"), impressions: tot(v.page, "impressions"), pages: v.page.length }]));

// detectors
const pq90 = ds.last_90d.pq.filter((r) => catalog.get(r.page)?.type !== "legal");
const prox = L.detectProximity(pq90); const ctrB = L.ownCtrByBucket(ds.last_90d.pq); const ctr = L.detectCtr(ds.last_90d.page.filter((r) => catalog.get(r.page)?.type !== "legal"), ctrB);
const decay28 = L.detectDecay(ds.last_28d.page, ds.prev_28d.page).map((d) => ({ ...d, window: "28d vs prev 28d" }));
const decay90 = L.detectDecay(ds.last_90d.page, ds.prev_90d.page, null, null, { minPrevImp: 20 }).map((d) => ({ ...d, window: "90d vs prev 90d" }));
const decay = [...decay28, ...decay90.filter((d) => !decay28.some((x) => x.page === d.page))];
const cannib = L.detectCannibalization(ds.last_90d.pq).map((c) => ({ ...c, advice: L.cannibAdvice(c) }));
const expansion = L.detectExpansion(ds.last_90d.pq, catalog); const clusters = L.detectClusters(ds.last_90d.pq, catalog);

// per-page opportunities
const pages90 = new Map(ds.last_90d.page.map((r) => [r.page, r])); const pagesPrev = new Map(ds.prev_28d.page.map((r) => [r.page, r])); const pages28 = new Map(ds.last_28d.page.map((r) => [r.page, r]));
const eligible = [...pages90.values()].filter((r) => catalog.get(r.page)?.type !== "legal");
const maxImp = Math.max(...eligible.map((r) => r.impressions)); const maxTr = Math.log1p(Math.max(...eligible.map((r) => r.clicks * 4 + r.impressions / 20)));
const opps = [];
const posTrend = (a, b) => (a && b && a.impressions >= 10 && b.impressions >= 10 ? +(a.position - b.position).toFixed(1) : null);
for (const r of eligible) {
  const page = r.page; const cat = catalog.get(page); const qs = ds.last_90d.pq.filter((x) => x.page === page && !L.isBranded(x.query));
  const pr = prox.filter((x) => x.page === page); const cr = ctr.find((x) => x.page === page); const dc = decay.find((x) => x.page === page); const ex = expansion.find((x) => x.page === page);
  const zt = pq90.filter((x) => x.page === page && x.position <= 3 && x.impressions >= 20 && x.clicks === 0 && !L.isBranded(x.query));
  const cb = cannib.filter((c) => c.pages.some((p) => p.page === page)); const worstCb = cb.sort((a, b) => b.totalImpressions - a.totalImpressions)[0];
  const signals = []; if (pr.length) signals.push("ranking_proximity"); if (cr) signals.push("ctr_gap"); if (dc && /ranking|page_specific|absent/.test(dc.cause)) signals.push("decay"); if (ex) signals.push("expansion"); if (zt.length) signals.push("zero_click_top_rank"); if (worstCb) signals.push("cannibalization");
  const prxScore = pr.length ? tot(pr.map((x) => ({ v: L.proximityScore(x.position) * x.impressions })), "v") / tot(pr, "impressions") : L.proximityScore(r.position) * 0.5;
  const comp = L.commercialPage(page, qs);
  const c = { impressions: L.impressionScore(r.impressions, maxImp), proximity: prxScore, ctrGap: cr?.comparable ? cr.ctrGap : cr ? 0.4 : 0, trend: dc ? Math.min(1, Math.abs(dc.impressions[1] / dc.impressions[0] - 1)) : 0, commercial: comp, traction: Math.min(1, Math.log1p(r.clicks * 4 + r.impressions / 20) / maxTr) };
  let action, why;
  if (dc && /ranking|page_specific|absent/.test(dc.cause)) { action = "refresh declining content"; why = `${dc.cause}: impressions ${dc.impressions[0]}→${dc.impressions[1]}, position ${dc.position[0]?.toFixed(1)}→${dc.position[1]?.toFixed(1) ?? "none"} (${dc.window}); site-wide impressions moved ${(dc.siteImpressionChange * 100).toFixed(0)}%`; }
  else if (ex && (pr.length || r.clicks > 0 || r.impressions >= 30)) { action = cat.type === "service" || cat.type === "local" ? "strengthen service relevance" : "expand existing page"; why = `page already earns impressions for queries its text does not cover: ${ex.gaps.slice(0, 3).map((g) => `"${g.query}" (${g.impressions} imp, pos ${g.position.toFixed(1)})`).join("; ")}`; }
  else if (pr.length) { action = cat.type === "article" || cat.type === "service" || cat.type === "local" ? "expand existing page" : "improve title/meta"; why = `ranks position ${pr.map((x) => x.position.toFixed(0)).join("/")} for ${pr.length} quer${pr.length > 1 ? "ies" : "y"}; the page text already covers them, so depth/title alignment is the lever`; }
  else if (cr) { action = "improve title/meta"; why = cr.comparable ? `${cr.impressions} impressions at position ${cr.position.toFixed(1)}, CTR ${(cr.ctr * 100).toFixed(1)}% vs NLDS ${cr.bucket}-bucket ${(cr.expectedCtr * 100).toFixed(1)}%` : `${cr.impressions} impressions at position ${cr.position.toFixed(1)} produced 0 clicks; NLDS has no clicks in the ${cr.bucket} rank bucket yet, so there is no internal benchmark (flag, not proof)`; }
  else if (zt.length) { action = "improve title/meta"; why = `top-3 rank with zero clicks: ${zt.slice(0, 3).map((x) => `"${x.query}" ${x.impressions} imp @ pos ${x.position.toFixed(1)}`).join("; ")}. GSC cannot say whether this is weak title/snippet, SERP features, or low real demand: check the live SERP before editing`; }
  else if (worstCb) { action = worstCb.advice.action; why = worstCb.advice.why; }
  else { action = "leave alone"; why = "no detector fired with enough evidence"; }
  if ((cat.type === "work" || cat.type === "other") && comp < 0.3 && action !== "leave alone" && !dc) { why = `${action} not recommended: ${why.slice(0, 80)}… ranks for a demo client name or low-commercial page (commercial ${comp})`; action = "leave alone"; }
  if (r.impressions < 10 && action !== "leave alone") { why += " | <10 impressions in 90d: treat as a watch item"; }
  const cannibRisk = worstCb ? (worstCb.advice.action === "leave alone" ? 0.3 : 1) : 0;
  const sc = L.score(c, action, cannibRisk); const links = (pr.length || cr || ex || dc) ? L.detectInternalLinks(cat, (pr.length ? pr : qs.sort((a, b) => b.impressions - a.impressions).slice(0, 3)), catalog) : [];
  const p28 = pages28.get(page), pp = pagesPrev.get(page);
  opps.push({ page, title: cat.title, type: cat.type, action, why, signals, score: sc.score, scoreParts: { components: Object.fromEntries(Object.entries(c).map(([k, v]) => [k, +v.toFixed(3)])), ...sc }, confidence: L.confidence(r.impressions, r.clicks), effort: L.EFFORT[action] <= 0.15 ? "S" : L.EFFORT[action] <= 0.45 ? "M" : "L",
    trendPositionDelta28d: posTrend(pages28.get(page), pagesPrev.get(page)), metrics: { last_90d: { clicks: r.clicks, impressions: r.impressions, position: +r.position.toFixed(1) }, last_28d: p28 ? { clicks: p28.clicks, impressions: p28.impressions, position: +p28.position.toFixed(1) } : null, prev_28d: pp ? { clicks: pp.clicks, impressions: pp.impressions, position: +pp.position.toFixed(1) } : null },
    queries: qs.sort((a, b) => b.impressions - a.impressions).slice(0, 6).map((q) => ({ query: q.query, impressions: q.impressions, clicks: q.clicks, position: +q.position.toFixed(1) })), internalLinks: links });
}
opps.sort((a, b) => (a.action === "leave alone") - (b.action === "leave alone") || b.score - a.score);

// queue
const queue = { "Quick wins": [], "Existing-page improvements": [], "Content refreshes": [], "Structural issues": [], "New content": [] };
for (const o of opps) {
  if (o.action === "leave alone") continue;
  if (o.action === "improve title/meta" || o.action === "add internal links") queue["Quick wins"].push(o);
  else if (o.action === "refresh declining content") queue["Content refreshes"].push(o);
  else if (o.action === "expand existing page" || o.action === "strengthen service relevance") queue["Existing-page improvements"].push(o);
  else queue["Structural issues"].push(o);
}
const structural = [...variants.map((v) => ({ kind: "url_variants", detail: `${v.page} is also reported as ${v.variants.join(", ")}`, action: "INFO ONLY, no action: live HEAD checks 2026-10-20 show http/www/no-slash all 301 to the canonical https apex trailing-slash URL; variants are historical and merged in this analysis" })), ...cannib.filter((c) => c.advice.action !== "leave alone").slice(0, 8).map((c) => ({ kind: "cannibalization", detail: `"${c.queries[0]}" (${c.totalImpressions} imp): ${c.pages.map((p) => `${new URL(p.page).pathname} ${p.impressions}imp@${p.position.toFixed(1)}`).join(" vs ")}`, action: c.advice.action + " — " + c.advice.why }))];
for (const c of clusters) { if (!c.suggestedHub || c.impressions < 30) continue; const hub = catalog.get(c.suggestedHub); const top = catalog.get(c.pages[0].page); if (!hub || !top || top.url === hub.url) continue; const hubImp = c.pages.find((x) => x.page === hub.url)?.impressions ?? 0;
  if (hubImp < c.impressions * 0.3 && !L.linksTo(top, hub)) structural.push({ kind: "hub_link", detail: `theme "${c.theme}" has ${c.impressions} imp but only ${hubImp} reach the service hub ${hub.route}; the top page (${top.route}) has no in-content link to it`, action: `add internal link ${top.route} → ${hub.route} (anchor context: "${c.queries[0].query}")` }); }
const newContent = clusters.filter((c) => c.uncoveredQueries.length && c.hasHubTraction).map((c) => ({ theme: c.theme, evidence: `${c.impressions} imp across ${c.pages.length} page(s); supporting articles on site: ${c.supportingArticlesOnSite}`, uncovered: c.uncoveredQueries.slice(0, 4), confidence: c.impressions >= 100 ? "medium" : "low" }));

writeFileSync(path.join(dir, "derived/opportunities.json"), JSON.stringify({ generated: new Date().toISOString(), property: "sc-domain:newlvlstudio.com", windows: { last_90d: meta, last_28d: m28 }, site, weights: L.WEIGHTS, opportunities: opps, cannibalization: cannib, expansion, clusters, decay, urlVariants: variants, ctrBuckets: ctrB, queue: { ...queue, structural, newContent } }, null, 1));

// report
const f = (n) => (n == null ? "–" : n); const pm = (m) => (m ? `${m.clicks}c/${m.impressions}i/pos ${m.position}` : "none");
let md = `# NLDS SEO Opportunity Report — Phase 1\n\nProperty: sc-domain:newlvlstudio.com · Last 28d ${m28.startDate}→${m28.endDate} · Last 90d ${meta.startDate}→${meta.endDate} · Analysis only; no page was edited.\n\n`;
md += `## Site totals (page-level, includes anonymized queries)\n\n| Window | Clicks | Impressions | Pages with impressions |\n|---|---|---|---|\n` + Object.entries(site).map(([k, v]) => `| ${k} | ${v.clicks} | ${v.impressions} | ${v.pages} |`).join("\n") + `\n\n28d impressions vs previous 28d: **${pct(site.last_28d.impressions, site.prev_28d.impressions)}**, clicks ${site.prev_28d.clicks}→${site.last_28d.clicks}. **Volume is very low** (${site.last_90d.clicks} clicks / ${site.last_90d.impressions} impressions in 90 days), so every finding below carries a confidence label and none should be read as statistically firm.\n\n`;
md += `## Ranked opportunities\n\n| # | Page | Evidence | Opportunity | Recommended action | Score | Conf. | Effort |\n|---|---|---|---|---|---|---|---|\n`;
opps.filter((o) => o.action !== "leave alone").slice(0, 15).forEach((o, i) => { md += `| ${i + 1} | ${new URL(o.page).pathname} | ${o.metrics.last_90d.impressions} imp / ${o.metrics.last_90d.clicks} clk / pos ${o.metrics.last_90d.position} (90d) | ${o.signals.join(", ") || "-"} | ${o.action} | ${o.score} | ${o.confidence} | ${o.effort} |\n`; });
md += `\n### Detail for the top ${Math.min(10, opps.length)}\n`;
opps.filter((o) => o.action !== "leave alone").slice(0, 10).forEach((o, i) => {
  md += `\n**${i + 1}. ${new URL(o.page).pathname}** — ${o.action} (score ${o.score}: +${o.scoreParts.positive} −${o.scoreParts.penalty})\n- Why: ${o.why}\n- Metrics: 90d ${pm(o.metrics.last_90d)} · 28d ${pm(o.metrics.last_28d)} · prev 28d ${pm(o.metrics.prev_28d)}\n- Components (0–1): ${Object.entries(o.scoreParts.components).map(([k, v]) => `${k} ${v}`).join(", ")}\n- Query set: ${o.queries.map((q) => `"${q.query}" ${q.impressions}i@${q.position}`).join("; ") || "none visible (anonymized)"}\n`;
  if (o.internalLinks.length) md += `- Internal links to add: ${o.internalLinks.slice(0, 3).map((l) => `${new URL(l.source).pathname} → ${new URL(l.target).pathname} (context: "${l.anchorContext}")`).join("; ")}\n`;
});
md += `\n## Detector output\n\n### A. Ranking proximity (position 6–20, ≥5 impressions, 90d)\n${prox.slice(0, 12).map((r) => `- "${r.query}" → ${new URL(r.page).pathname}: ${r.impressions} imp, pos ${r.position.toFixed(1)}, ${r.clicks} clk`).join("\n") || "none"}\n`;
md += `\n### B. CTR (vs NLDS own rank-bucket CTR)\nOwn buckets: ${Object.entries(ctrB).map(([k, v]) => `${k}: ${(v.ctr * 100).toFixed(1)}% of ${v.impressions} imp`).join(" · ")}\n${ctr.map((r) => `- ${new URL(r.page).pathname}: ${r.impressions} imp, pos ${r.position.toFixed(1)}, CTR ${(r.ctr * 100).toFixed(1)}% vs ${(r.expectedCtr * 100).toFixed(1)}% expected${r.comparable ? "" : " (bucket has no clicks yet; zero-click flag only)"}`).join("\n") || "none"}\n`;
md += `\n### C. Decay (cause separated)\n${decay.map((d) => `- ${new URL(d.page).pathname} [${d.window}]: ${d.cause}; impressions ${d.impressions.join("→")}, clicks ${d.clicks.join("→")}, position ${d.position.map((x) => (x == null ? "none" : x.toFixed(1))).join("→")}`).join("\n") || "none"}\n`;
md += `\n### D. Cannibalization (same intent, >1 URL, ≥3 imp each query)\n${cannib.slice(0, 10).map((c) => `- "${c.queries.slice(0, 2).join('" / "')}" (${c.totalImpressions} imp): ${c.pages.map((p) => `${new URL(p.page).pathname} ${p.impressions}i@${p.position.toFixed(1)}`).join(" vs ")} → **${c.advice.action}**: ${c.advice.why}`).join("\n") || "none"}\n`;
md += `\n### E. Expansion (query evidence not covered by page text)\n${expansion.slice(0, 10).map((e) => `- ${new URL(e.page).pathname}: ${e.gaps.slice(0, 3).map((g) => `"${g.query}" ${g.impressions}i@${g.position.toFixed(1)} cov ${g.coverage}`).join("; ")}`).join("\n") || "none"}\n`;
md += `\n### G. Topic themes\n${clusters.map((c) => `- ${c.theme}: ${c.impressions} imp, ${c.clicks} clk, hub traction ${c.hasHubTraction ? "yes" : "no"}, suggested hub ${c.suggestedHub ? new URL(c.suggestedHub).pathname : "-"}, supporting articles (title/excerpt match) ${c.supportingArticlesOnSite}, uncovered queries ${c.uncoveredQueries.length}`).join("\n")}\n`;
md += `\n## Production queue (review only — nothing acted on)\n`;
for (const [k, v] of Object.entries(queue)) { if (k === "Structural issues") continue; md += `\n### ${k}\n${v.slice(0, 8).map((o) => `- [ ] ${new URL(o.page).pathname} — ${o.action} (score ${o.score}, ${o.confidence}, effort ${o.effort}): ${o.why}`).join("\n") || "_none with evidence_"}\n`; }
md += `\n### Structural issues\n${[...structural.map((s) => `- [ ] ${s.kind}: ${s.detail} → ${s.action}`), ...queue["Structural issues"].map((o) => `- [ ] ${new URL(o.page).pathname} — ${o.action}: ${o.why}`)].join("\n") || "_none_"}\n`;
md += `\n### New content (only where evidence supports it)\n${newContent.map((n) => `- [ ] ${n.theme}: ${n.evidence}; uncovered queries: ${n.uncovered.map((u) => `"${u.query}" (${u.impressions})`).join(", ")} — confidence ${n.confidence}`).join("\n") || "_none: no theme has traction plus queries the site does not already cover_"}\n`;
md += `\n## Score formula\nScore = 100 × (${Object.entries(L.WEIGHTS).filter(([k]) => !/Penalty/.test(k)).map(([k, v]) => `${v}·${k}`).join(" + ")}) − ${L.WEIGHTS.effortPenalty}·effort(action) − ${L.WEIGHTS.cannibPenalty}·cannibalizationRisk. Every component is normalized 0–1 (impressions on a log scale vs the site max; proximity by position band; CTR gap vs NLDS's own bucket CTR; trend = size of decline; commercial from the service lexicon + page type; traction from clicks/impressions). Weights live in lib.mjs.\n`;
writeFileSync(path.join(dir, "report.md"), md);
console.log(`wrote ${dir}/report.md and derived/opportunities.json — ${opps.filter((o) => o.action !== "leave alone").length} actionable, ${opps.length} pages scored`);
