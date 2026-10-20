// node --test tools/seo-intelligence/lib.test.mjs  (pure-function checks for the Phase 1 detectors)
import test from "node:test"; import assert from "node:assert/strict";
import * as L from "./lib.mjs";
const row = (page, query, clicks, impressions, position) => ({ page: "https://newlvlstudio.com" + page, query, clicks, impressions, position, ctr: impressions ? clicks / impressions : 0 });

test("URL variants (www, http, no trailing slash) merge; position is impression-weighted", () => {
  const n = L.normalize([{ page: "https://www.newlvlstudio.com/a", query: "x", clicks: 1, impressions: 10, position: 2 }, { page: "https://newlvlstudio.com/a/", query: "x", clicks: 0, impressions: 30, position: 6 }], "p");
  assert.equal(n.length, 1); assert.equal(n[0].page, "https://newlvlstudio.com/a/"); assert.equal(n[0].impressions, 40); assert.equal(n[0].position, 5); assert.equal(n[0].clicks, 1);
});
test("zero-impression comparison rows are dropped", () => assert.equal(L.normalize([{ page: "https://newlvlstudio.com/a/", clicks: 0, impressions: 0, position: null }], "p").length, 0));
test("proximity: positions 6-20 flagged, others not; impression floor respected", () => {
  const r = L.detectProximity([row("/a/", "q", 0, 50, 9), row("/b/", "q", 0, 50, 3), row("/c/", "q", 0, 50, 25), row("/d/", "q", 0, 2, 9)]);
  assert.deepEqual(r.map((x) => x.page.slice(-3)), ["/a/"]);
});
test("CTR uses NLDS's own bucket CTR, not an external benchmark", () => {
  const rows = [row("/a/", "q", 10, 100, 8), row("/b/", "q", 0, 100, 8)]; const b = L.ownCtrByBucket(rows); assert.equal(b["4-10"].ctr, 0.05);
  const f = L.detectCtr(rows, b); assert.equal(f.length, 1); assert.ok(f[0].page.endsWith("/b/")); assert.equal(f[0].ctrGap, 1);
});
test("decay separates demand (page moved with the site) from ranking loss", () => {
  const prev = [row("/a/", "", 0, 100, 5), row("/b/", "", 0, 100, 5)]; const cur = [row("/a/", "", 0, 50, 5), row("/b/", "", 0, 90, 12)];
  const d = Object.fromEntries(L.detectDecay(cur, prev).map((x) => [x.page.slice(-3), x.cause]));
  assert.match(d["/b/"], /ranking_decline/); assert.match(d["/a/"], /page_specific|demand/);
  assert.match(L.detectDecay([row("/a/", "", 0, 40, 3)], [row("/a/", "", 0, 100, 25)])[0].cause, /volatile_query_mix/);
});
test("no decay label for a flat page", () => assert.equal(L.detectDecay([row("/a/", "", 0, 98, 5)], [row("/a/", "", 0, 100, 5)]).length, 0));
test("cannibalization groups reordered / synonymous queries and ignores brand", () => {
  const c = L.detectCannibalization([row("/a/", "website design daytona", 0, 10, 5), row("/b/", "daytona web design", 0, 8, 9), row("/a/", "new level design", 0, 9, 1), row("/b/", "new level design", 0, 9, 2)]);
  assert.equal(c.length, 1); assert.equal(c[0].pages.length, 2);
});
test("cannib advice: different page types -> keep separate and link", () => assert.equal(L.cannibAdvice({ totalImpressions: 20, pages: [{ page: "https://newlvlstudio.com/journal/x/", impressions: 10 }, { page: "https://newlvlstudio.com/business-systems/", impressions: 10 }] }).action, "add internal links"));
test("score is bounded, monotonic in impressions, and shows its penalty", () => {
  const base = { impressions: 0.5, proximity: 0.5, ctrGap: 0.5, trend: 0, commercial: 0.5, traction: 0.5 };
  const a = L.score(base, "improve title/meta"), b = L.score({ ...base, impressions: 1 }, "improve title/meta"), c = L.score(base, "consolidate competing pages", 1);
  assert.ok(b.score > a.score); assert.ok(c.score < a.score); assert.ok(c.penalty > a.penalty);
  const hi = L.score({ impressions: 1, proximity: 1, ctrGap: 1, trend: 1, commercial: 1, traction: 1 }, "leave alone"); assert.ok(hi.score <= 100 && hi.score >= 0);
});
test("commercial: service lexicon beats informational; brand and legal are low", () => {
  assert.ok(L.commercialQuery("website design daytona beach") > L.commercialQuery("how much does it cost to license video content"));
  assert.ok(L.commercialQuery("new level design") < 0.2); assert.equal(L.commercialPage("https://newlvlstudio.com/terms/", []), 0);
});
test("internal links: finds topical pages that do not already link to the target", () => {
  const t = { url: "u/t", route: "/t/", text: "", type: "service" }, has = { url: "u/h", route: "/h/", type: "article", text: "local seo phone calls", raw: '<a href="/t/">x</a>' }, no = { url: "u/n", route: "/n/", type: "article", text: "local seo phone calls guide", raw: "nothing" };
  const r = L.detectInternalLinks(t, [{ query: "local seo phone calls" }], new Map([["t", t], ["h", has], ["n", no]])); assert.deepEqual(r.map((x) => x.source), ["u/n"]);
});
