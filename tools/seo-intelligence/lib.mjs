// NLDS SEO Intelligence, Phase 1 library. Pure functions (no I/O except loadCatalog/readRaw), no dependencies.
// Analysis and recommendations only: nothing here edits pages, commits, or deploys.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

export const SITE = "https://newlvlstudio.com";
export const WEIGHTS = { impressions: 0.22, proximity: 0.22, ctrGap: 0.13, trend: 0.10, commercial: 0.18, traction: 0.15, effortPenalty: 15, cannibPenalty: 10 };
export const EFFORT = { "improve title/meta": 0.1, "add internal links": 0.15, "strengthen service relevance": 0.3, "expand existing page": 0.4, "refresh declining content": 0.45, "reposition competing pages": 0.6, "consolidate competing pages": 0.8, "create supporting cluster page": 0.7, "leave alone": 0 };

// ---------- URL + dataset normalization ----------
export function normUrl(u) {
  try {
    const x = new URL(u); let p = x.pathname.replace(/\/+$/, "") + "/"; if (p === "//") p = "/";
    return SITE + p;
  } catch { return u; }
}
const wavg = (a, wa, b, wb) => (wa + wb ? (a * wa + b * wb) / (wa + wb) : 0);
/** Raw GSC rows -> normalized records; URL variants (www / no trailing slash) merged. */
export function normalize(rows, period) {
  const m = new Map();
  for (const r of rows.filter((x) => x.impressions > 0)) { // the seo tool also returns comparison-window-only rows (0 impressions here)
    const page = r.page ? normUrl(r.page) : undefined; const query = r.query?.toLowerCase().trim();
    const k = `${page ?? ""}\u0000${query ?? ""}`; const c = m.get(k);
    if (!c) m.set(k, { ...(page && { page }), ...(query && { query }), clicks: r.clicks, impressions: r.impressions, position: r.position ?? 0, rawUrls: r.page ? [r.page] : [], period });
    else { c.position = wavg(c.position, c.impressions, r.position ?? 0, r.impressions); c.clicks += r.clicks; c.impressions += r.impressions; if (r.page && !c.rawUrls.includes(r.page)) c.rawUrls.push(r.page); }
  }
  return [...m.values()].map((r) => ({ ...r, ctr: r.impressions ? r.clicks / r.impressions : 0 }));
}
export function readRaw(dir, name) { const f = path.join(dir, name + ".json"); return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")).rows : []; }
export function urlVariants(rows) { // structural finding: same page reported under several URL spellings
  const m = new Map(); for (const r of rows) if (r.page) { const k = normUrl(r.page); (m.get(k) ?? m.set(k, new Set()).get(k)).add(r.page); }
  return [...m].filter(([, s]) => s.size > 1).map(([page, s]) => ({ page, variants: [...s] }));
}

// ---------- text helpers ----------
const STOP = new Set("a an the to for in of and or how what is are do does my me near with on at your you i can should vs best".split(" "));
export const tokens = (q) => q.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((t) => t && !STOP.has(t)).map((t) => t.replace(/(ing|es|s)$/, (m, s, o) => (o > 2 ? "" : m))).map((t) => SYN[t] ?? t);
const SYN = { website: "web", webs: "web", designer: "design", developer: "design", develop: "design" };
export const intentKey = (q) => [...new Set(tokens(q))].sort().join(" ");
const BRAND = /new\s?level|newlvl|\bnlds\b|michael vail/;
export const isBranded = (q) => BRAND.test(q.toLowerCase());

// ---------- commercial relevance (lexicon, adjustable) ----------
export const LEXICON = [
  [/web ?site design|web design|website (cost|builder|developer|redesign)|website for|build a website/, 1.0],
  [/business system|workflow|automation|lead (response|follow|intake|capture)|missed (call|lead)|follow.?up|crm|speed to lead/, 1.0],
  [/local seo|google business|google profile|local search|local visibility|map pack|get more (calls|leads|customers)|phone calls/, 0.9],
  [/real estate (web|market)|realtor|roofing|plumb|hvac|landscap|contractor|remodel/, 0.8],
  [/port orange|daytona|volusia|central florida|ormond|deland|new smyrna/, 0.7],
  [/seo company|seo agency|check seo|seo work|website care|maintenance|first impression audit/, 0.6],
  [/video content|video cost|photography/, 0.35],
];
export function commercialQuery(q) { if (isBranded(q)) return 0.15; let s = 0; for (const [re, w] of LEXICON) if (re.test(q.toLowerCase())) s = Math.max(s, w); return s; }
export function pageType(route) {
  if (route === "/") return "home";
  if (/^\/(privacy|terms)\//.test(route)) return "legal";
  if (/^\/works\//.test(route)) return "work";
  if (/^\/journal\/.+/.test(route)) return "article";
  if (/^\/(port-orange|daytona-beach|volusia-county|central-florida)-website-design\//.test(route)) return "local";
  if (/^\/(services|business-systems|real-estate-web-design|real-estate-marketing-website|local-visibility-setup|website-care|packages|starter-pack|free-local-visibility-check)\//.test(route)) return "service";
  return "other";
}
const TYPE_BASE = { service: 1.0, local: 0.95, home: 0.7, article: 0.6, other: 0.35, work: 0.35, legal: 0 };
export function commercialPage(page, queries) {
  const t = TYPE_BASE[pageType(new URL(page).pathname)] ?? 0.3;
  if (!queries.length) return t;
  const tot = queries.reduce((a, q) => a + q.impressions, 0) || 1;
  const qc = queries.reduce((a, q) => a + commercialQuery(q.query) * q.impressions, 0) / tot;
  return +(0.5 * t + 0.5 * qc).toFixed(3);
}

// ---------- site catalog (titles, text, links) ----------
export function loadCatalog(root, articles) {
  const pages = new Map(); const routes = [...readFileSync(path.join(root, "src/data/routes.ts"), "utf8").matchAll(/^\s*'(\/[^']*)',?$/gm)].map((m) => m[1]);
  for (const r of routes) { const u = normUrl(SITE + r); pages.set(u, { url: u, route: new URL(u).pathname, title: "", description: "", text: "", type: pageType(new URL(u).pathname), source: null }); }
  const dir = path.join(root, "src/pages");
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
    const src = readFileSync(path.join(dir, f), "utf8"); const c = src.match(/canonical="https:\/\/newlvlstudio\.com([^"]*)"/); if (!c) continue;
    const u = normUrl(SITE + c[1]); const p = pages.get(u) ?? { url: u, route: new URL(u).pathname, type: pageType(new URL(u).pathname) }; pages.set(u, p);
    p.title = src.match(/title="([^"]+)"/)?.[1] ?? ""; p.description = src.match(/description="([^"]+)"/)?.[1] ?? ""; p.source = "src/pages/" + f; p.raw = src;
    p.text = (p.title + " " + p.description + " " + [...src.matchAll(/>([^<>{}]{12,})</g)].map((m) => m[1]).join(" ") + " " + [...src.matchAll(/(["'`])((?:(?!\1)[^\n\\]){24,})\1/g)].map((m) => m[2]).join(" ")).toLowerCase();
  }
  for (const a of articles) {
    const u = normUrl(`${SITE}/journal/${a.slug}`); const p = pages.get(u) ?? { url: u, route: new URL(u).pathname, type: "article" }; pages.set(u, p);
    p.title = a.metaTitle ?? a.title; p.description = a.metaDescription ?? a.excerpt; p.raw = a.body; p.source = "src/data/articles.ts#" + a.slug; p.category = a.category;
    p.text = `${a.title} ${a.excerpt} ${a.body}`.toLowerCase();
  }
  for (const p of pages.values()) p.text ??= "";
  return pages;
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export function linksTo(source, target) {
  if (!source.raw) return false; const r = target.route.replace(/\/$/, "");
  return new RegExp(`(?:href=|to=|\\]\\()\\s*[{"'\`]*(?:https://newlvlstudio\\.com)?${esc(r)}/?[)"'\`#?}]`).test(source.raw);
}
export const coverage = (q, text) => { const t = tokens(q); return t.length ? t.filter((w) => text.includes(w)).length / t.length : 1; };

// ---------- scoring ----------
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const proximityScore = (pos) => (pos <= 0 ? 0 : pos <= 3 ? 0.15 : pos <= 5 ? 0.3 : pos <= 10 ? 1 : pos <= 15 ? 0.85 : pos <= 20 ? 0.6 : pos <= 30 ? 0.25 : 0);
export const impressionScore = (imp, maxImp) => (maxImp > 0 ? clamp(Math.log1p(imp) / Math.log1p(maxImp)) : 0);
export function score(c, action, cannib = 0) {
  const W = WEIGHTS; const pos = W.impressions * c.impressions + W.proximity * c.proximity + W.ctrGap * c.ctrGap + W.trend * c.trend + W.commercial * c.commercial + W.traction * c.traction;
  const neg = W.effortPenalty * (EFFORT[action] ?? 0.4) + W.cannibPenalty * cannib;
  return { score: +clamp(pos * 100 - neg, 0, 100).toFixed(1), positive: +(pos * 100).toFixed(1), penalty: +neg.toFixed(1) };
}
export function confidence(imp, clicks, windows = 1) { return imp >= 100 || clicks >= 5 ? "high" : imp >= 30 ? "medium" : "low"; }

// ---------- detectors ----------
const bucket = (p) => (p <= 3 ? "1-3" : p <= 10 ? "4-10" : p <= 20 ? "11-20" : "21+");
/** B: expected CTR per rank bucket, taken from NLDS's own query-page rows (impression-weighted), never an external benchmark. */
export function ownCtrByBucket(rows) {
  const b = {}; for (const r of rows) { const k = bucket(r.position); b[k] ??= { clicks: 0, impressions: 0 }; b[k].clicks += r.clicks; b[k].impressions += r.impressions; }
  for (const k in b) b[k].ctr = b[k].impressions ? b[k].clicks / b[k].impressions : 0; return b;
}
export function detectCtr(pageRows, bucketCtr, minImp = 20) {
  return pageRows.filter((r) => r.impressions >= minImp).map((r) => {
    const exp = bucketCtr[bucket(r.position)]?.ctr ?? 0; const gap = exp > 0 ? clamp((exp - r.ctr) / exp) : 0;
    return { page: r.page, impressions: r.impressions, clicks: r.clicks, position: r.position, ctr: r.ctr, bucket: bucket(r.position), expectedCtr: exp, ctrGap: gap, comparable: exp > 0 };
  }).filter((r) => r.ctrGap > 0.5 || (!r.comparable && r.clicks === 0 && r.position <= 12));
}
export function detectProximity(rows, minImp = 5) { return rows.filter((r) => r.position >= 6 && r.position <= 20 && r.impressions >= minImp).sort((a, b) => b.impressions - a.impressions); }

/** C: decay. Separates demand movement (site-wide / same-query impressions fell) from ranking movement (position worsened) from CTR-only movement. */
export function detectDecay(cur, prev, curQ, prevQ, { minPrevImp = 15 } = {}) {
  const sum = (a, k) => a.reduce((s, r) => s + r[k], 0);
  const siteChange = sum(prev, "impressions") ? sum(cur, "impressions") / sum(prev, "impressions") - 1 : 0;
  const pm = new Map(prev.map((r) => [r.page, r])); const cm = new Map(cur.map((r) => [r.page, r])); const out = [];
  for (const [page, p] of pm) {
    if (p.impressions < minPrevImp) continue; const c = cm.get(page) ?? { page, clicks: 0, impressions: 0, position: 0, ctr: 0 };
    const impCh = c.impressions / p.impressions - 1; const posCh = c.impressions ? c.position - p.position : null; const clkCh = p.clicks ? c.clicks / p.clicks - 1 : 0;
    const lost = c.impressions === 0; const sig = [];
    if (impCh <= -0.4) sig.push("impressions"); if (posCh !== null && posCh >= 3) sig.push("position"); if (p.clicks >= 2 && clkCh <= -0.5) sig.push("clicks"); if (p.clicks >= 2 && c.impressions >= 15 && c.ctr < p.ctr * 0.5) sig.push("ctr");
    if (!sig.length) continue;
    let cause;
    if (lost) cause = "page_absent_in_current_window (check indexing/URL variants)";
    else if (posCh !== null && posCh >= 3) cause = "ranking_decline";
    else if (impCh <= -0.4 && posCh !== null && posCh <= -3) cause = "volatile_query_mix (position improved while impressions fell; few queries, not a ranking loss)";
    else if (impCh <= -0.4 && impCh >= siteChange - 0.25) cause = "demand_or_site_wide (page moved with the site)";
    else if (impCh <= -0.4) cause = "page_specific_impression_loss (position steady)";
    else cause = "ctr_only";
    out.push({ page, cause, signals: sig, impressions: [p.impressions, c.impressions], clicks: [p.clicks, c.clicks], position: [p.position, c.impressions ? c.position : null], ctr: [p.ctr, c.ctr], siteImpressionChange: siteChange });
  }
  return out;
}

/** D: same-intent queries answered by >1 URL. */
export function detectCannibalization(pqRows, { minImp = 3 } = {}) {
  const g = new Map();
  for (const r of pqRows) { if (!r.query || r.impressions < minImp || isBranded(r.query)) continue; const k = intentKey(r.query); if (!k) continue; (g.get(k) ?? g.set(k, []).get(k)).push(r); }
  const out = [];
  for (const [key, rs] of g) {
    const pages = new Map(); for (const r of rs) { const x = pages.get(r.page) ?? { page: r.page, clicks: 0, impressions: 0, position: 0, queries: new Set() }; x.position = wavg(x.position, x.impressions, r.position, r.impressions); x.clicks += r.clicks; x.impressions += r.impressions; x.queries.add(r.query); pages.set(r.page, x); }
    if (pages.size < 2) continue; const list = [...pages.values()].sort((a, b) => b.impressions - a.impressions).map((p) => ({ ...p, queries: [...p.queries] }));
    out.push({ intent: key, queries: [...new Set(rs.map((r) => r.query))], pages: list, totalImpressions: list.reduce((s, p) => s + p.impressions, 0) });
  }
  return out.sort((a, b) => b.totalImpressions - a.totalImpressions);
}
export function cannibAdvice(c) {
  const types = c.pages.map((p) => pageType(new URL(p.page).pathname)); const share = c.pages[0].impressions / c.totalImpressions;
  if (new Set(types).size > 1) return { action: "add internal links", why: `different page types (${[...new Set(types)].join(" + ")}); keep separate, link the article/support page to the commercial page so Google has one clear target` };
  if (share < 0.7) return { action: "reposition competing pages", why: `same-type pages split impressions (${(share * 100).toFixed(0)}% / ${(100 - share * 100).toFixed(0)}%); give each a distinct primary query and cross-link` };
  return { action: "leave alone", why: `one URL already takes ${(share * 100).toFixed(0)}% of impressions; monitor` };
}

/** E: queries a page already gets impressions for that its own text does not cover. */
export function detectExpansion(pqRows, catalog, { minImp = 5, maxCover = 0.67 } = {}) {
  const by = new Map();
  for (const r of pqRows) { if (!r.query || isBranded(r.query) || r.impressions < minImp || r.position <= 3 || r.position > 40) continue; const p = catalog.get(r.page); if (!p?.text) continue; const cov = coverage(r.query, p.text); if (cov >= maxCover) continue; (by.get(r.page) ?? by.set(r.page, []).get(r.page)).push({ query: r.query, impressions: r.impressions, position: r.position, coverage: +cov.toFixed(2) }); }
  return [...by].map(([page, gaps]) => ({ page, gaps: gaps.sort((a, b) => b.impressions - a.impressions) }));
}

/** F: pages whose text discusses the target's topic but do not link to it. */
export function detectInternalLinks(target, queries, catalog, { max = 5 } = {}) {
  const terms = [...new Set(queries.flatMap((q) => tokens(q.query)))].filter((t) => t.length > 3); if (!terms.length) return [];
  const inbound = [...catalog.values()].filter((s) => s.url !== target.url && linksTo(s, target)).length; const out = [];
  for (const s of catalog.values()) {
    if (s.url === target.url || !s.text || s.type === "legal" || linksTo(s, target)) continue;
    const hit = terms.filter((t) => s.text.includes(t)); if (hit.length < Math.min(2, terms.length)) continue;
    const phrase = queries.map((q) => q.query).find((q) => s.text.includes(q)) ?? queries[0].query;
    out.push({ source: s.url, sourceType: s.type, target: target.url, anchorContext: phrase, topicOverlap: +(hit.length / terms.length).toFixed(2), inboundLinksToTargetFromContent: inbound });
  }
  return out.sort((a, b) => b.topicOverlap - a.topicOverlap || (a.sourceType === "article" ? -1 : 1)).slice(0, max);
}

/** G: themes with traction and what supports them. */
export const THEME_HUB = { "local web design (Volusia area)": "/volusia-county-website-design/", "local SEO / more calls": "/local-visibility-setup/", "business systems / lead response": "/business-systems/", "real estate websites": "/real-estate-web-design/", "website cost / strategy": "/packages/" };
export const THEMES = [
  ["local web design (Volusia area)", /port orange|daytona|volusia|central florida|ormond|deland/],
  ["local SEO / more calls", /local seo|google business|local search|phone call|get more (call|lead)|local visibility|map pack/],
  ["website cost / strategy", /website cost|how much|price|pricing|cost of|redesign|first impression|website (launch|care)/],
  ["business systems / lead response", /business system|workflow|lead (response|follow|intake)|missed (call|lead)|follow.?up|automation/],
  ["real estate websites", /real estate|realtor|listing/],
  ["video content", /video|photograph/],
  ["SEO company vetting", /seo (company|agency|work)|check seo/],
];
export function themeOf(q) { for (const [n, re] of THEMES) if (re.test(q.toLowerCase())) return n; return null; }
export function detectClusters(pqRows, catalog) {
  const t = new Map();
  for (const r of pqRows) { if (!r.query || isBranded(r.query)) continue; const n = themeOf(r.query); if (!n) continue; const x = t.get(n) ?? { theme: n, impressions: 0, clicks: 0, pages: new Map(), queries: new Map() }; x.impressions += r.impressions; x.clicks += r.clicks; x.pages.set(r.page, (x.pages.get(r.page) ?? 0) + r.impressions); x.queries.set(r.query, (x.queries.get(r.query) ?? 0) + r.impressions); t.set(n, x); }
  return [...t.values()].map((x) => {
    const pages = [...x.pages].sort((a, b) => b[1] - a[1]); const types = pages.map(([p]) => pageType(new URL(p).pathname));
    const re = THEMES.find((h) => h[0] === x.theme)[1]; const supporting = [...catalog.values()].filter((p) => p.type === "article" && re.test((p.title + " " + p.description).toLowerCase())).length;
    const hub = pages.find(([p]) => ["service", "local"].includes(pageType(new URL(p).pathname)))?.[0] ?? null;
    const uncovered = [...x.queries].filter(([q]) => ![...catalog.values()].some((p) => coverage(q, p.text) >= 0.67)).map(([q, i]) => ({ query: q, impressions: i }));
    return { theme: x.theme, suggestedHub: THEME_HUB[x.theme] ? SITE + THEME_HUB[x.theme] : null, impressions: x.impressions, clicks: x.clicks, pages: pages.map(([p, i]) => ({ page: p, impressions: i })), hub, supportingArticlesOnSite: supporting, hasHubTraction: types.some((t) => ["service", "local"].includes(t)), uncoveredQueries: uncovered, queries: [...x.queries].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([query, impressions]) => ({ query, impressions })) };
  }).sort((a, b) => b.impressions - a.impressions);
}
