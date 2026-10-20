// Internal-link graph + rendered page text. Preferred source: built dist/ HTML (the real rendered site; only <main> counts as in-content,
// nav/footer are "chrome"). Fallback: repo source (pages + articles), which cannot see rendered/JS-injected links: documented limitation.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { SITE, normUrl, pageType } from "./lib.mjs";

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const strip = (h) => decode(h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const walk = (d, o = []) => { for (const f of readdirSync(d)) { const p = path.join(d, f); statSync(p).isDirectory() ? walk(p, o) : f === "index.html" && o.push(p); } return o; };
const hrefOf = (h) => { if (!h || /^(mailto:|tel:|#|javascript:)/.test(h)) return null; const u = h.startsWith("/") ? SITE + h : h.startsWith(SITE) || h.startsWith("https://www.newlvlstudio.com") ? h.replace("https://www.", "https://") : null; return u ? normUrl(u.split("#")[0].split("?")[0]) : null; };
const anchors = (html) => [...html.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ url: hrefOf(m[1]), text: strip(m[2]) })).filter((a) => a.url && !/\.(png|jpe?g|webp|svg|pdf|xml|txt|ico|mp4|webm)$/i.test(a.url));

export function fromDist(distDir) {
  const pages = new Map();
  for (const f of walk(distDir)) {
    const html = readFileSync(f, "utf8"); const rel = path.relative(distDir, path.dirname(f)); const url = normUrl(SITE + "/" + (rel === "." ? "" : rel));
    if (/<title>Page Not Found/i.test(html)) continue;
    const m = html.match(/<main[\s\S]*?<\/main>/); const main = m ? m[0] : ""; const chrome = m ? html.replace(m[0], "") : html;
    pages.set(url, { url, route: new URL(url).pathname, type: pageType(new URL(url).pathname), title: decode(html.match(/<title[^>]*>([^<]*)/)?.[1] ?? ""), description: decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ""),
      h1: strip(main.match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? ""), text: strip(main).toLowerCase(), contentLinks: anchors(main), chromeLinks: anchors(chrome) });
  }
  return finish(pages, "dist", { builtAt: new Date(statSync(path.join(distDir, "index.html")).mtimeMs).toISOString() });
}
export function fromCatalog(catalog) { // fallback (source only)
  const pages = new Map();
  for (const p of catalog.values()) {
    const links = [...(p.raw ?? "").matchAll(/(?:href=|to=|\]\()\s*[{"'`]*(?:https:\/\/newlvlstudio\.com)?(\/[a-z0-9\-/]*)/g)].map((m) => ({ url: normUrl(SITE + m[1]), text: "" })).filter((a) => catalog.has(a.url));
    pages.set(p.url, { url: p.url, route: p.route, type: p.type, title: p.title ?? "", description: p.description ?? "", h1: "", text: p.text ?? "", contentLinks: links, chromeLinks: [] });
  }
  return finish(pages, "source", { limitation: "repo source only: cannot see rendered/JS-injected links, nav/footer (sitewide) links are not modelled" });
}
function finish(pages, source, extra) {
  const inboundContent = new Map(), inboundChrome = new Map();
  for (const p of pages.values()) { for (const a of p.contentLinks) if (a.url !== p.url) (inboundContent.get(a.url) ?? inboundContent.set(a.url, new Set()).get(a.url)).add(p.url); for (const a of p.chromeLinks) if (a.url !== p.url) (inboundChrome.get(a.url) ?? inboundChrome.set(a.url, new Set()).get(a.url)).add(p.url); }
  return { pages, inboundContent, inboundChrome, source, ...extra,
    linksInContent: (from, to) => !!pages.get(from)?.contentLinks.some((a) => a.url === to),
    contentInbound: (u) => inboundContent.get(u)?.size ?? 0, chromeInbound: (u) => inboundChrome.get(u)?.size ?? 0 };
}
export function distStale(distDir, srcDir) { // true when any src file is newer than the dist build
  const built = statSync(path.join(distDir, "index.html")).mtimeMs; let newest = 0;
  const w = (d) => { for (const f of readdirSync(d)) { const p = path.join(d, f), s = statSync(p); s.isDirectory() ? w(p) : (newest = Math.max(newest, s.mtimeMs)); } }; w(srcDir); return newest > built;
}
export const distExists = (d) => existsSync(path.join(d, "index.html"));
