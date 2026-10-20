#!/usr/bin/env node
// Paginated GSC pull via the local `seo` CLI. The CLI returns 50 rows per call even with --detail=full, so we page with --offset until `total`.
//   node tools/seo-intelligence/pull.mjs <outfile.json> <dimensions> <start> <end> [site]
// Write <outfile> OUTSIDE this repo (private data). Set SEO_BIN to use a specific seo binary instead of `npx --no-install seo`.
import { execFileSync } from "node:child_process"; import { writeFileSync } from "node:fs";
const [out, dims, start, end, site = "sc-domain:newlvlstudio.com"] = process.argv.slice(2);
if (!out || !dims || !start || !end) { console.error("usage: pull.mjs <out> <dimensions> <start> <end> [site]"); process.exit(1); }
const [bin, pre] = process.env.SEO_BIN ? [process.env.SEO_BIN, []] : ["npx", ["--no-install", "seo"]];
const call = (offset) => JSON.parse(execFileSync(bin, [...pre, "data", `--site=${site}`, `--dimensions=${dims}`, `--start-date=${start}`, `--end-date=${end}`, `--detail=${offset ? "rows" : "full"}`, ...(offset ? [`--offset=${offset}`] : ["--refresh"]), "--json"], { encoding: "utf8", maxBuffer: 1 << 28 }));
const first = call(0); const rows = [...first.rows];
while (rows.length < first.total) { const n = call(rows.length).rows; if (!n.length) break; rows.push(...n); }
if (rows.length !== first.total) { console.error(`row count ${rows.length} != total ${first.total}`); process.exit(2); }
writeFileSync(out, JSON.stringify({ range: first.range, comparisonRange: first.comparisonRange, total: first.total, rows }, null, 2)); console.log(`${out}: ${rows.length}/${first.total} rows`);
