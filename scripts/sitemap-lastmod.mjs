// Per-URL <lastmod> for sitemap.xml from real evidence only:
//   - static routes: the git commit date of the route's own page file (plus shared template files where the page is rendered by one)
//   - journal articles: the article's published date (src/data/articles.ts); no modified date exists, so none is invented
// A URL with no defensible date gets NO <lastmod>. In a shallow clone every file looks "just committed", so lastmod is omitted entirely.
// Run standalone to print the map:  node scripts/sitemap-lastmod.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

const MIN_COMMITS = 50;

// Shared templates: a change to these changes the content of every page that renders through them.
const SHARED = { 'LocalLandingPage': ['src/components/LocalLandingPage.tsx', 'src/data/locationPages.ts'], 'ConceptCaseStudy': ['src/components/ConceptCaseStudy.tsx'] };

export function routeFiles(appSource) {
  const imports = {};
  for (const m of appSource.matchAll(/import\s+(\w+)\s+from\s+'@\/pages\/(\w+)'/g)) imports[m[1]] = `src/pages/${m[2]}.tsx`;
  const out = {};
  for (const m of appSource.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(?:Suspense[^>]*>\s*<)?(\w+)\s*\/>/g)) if (imports[m[2]]) out[m[1]] = imports[m[2]];
  return out;
}

export function buildLastmodMap(routes) {
  const map = {};
  let shallow = true;
  try { shallow = git('rev-parse', '--is-shallow-repository') !== 'false'; } catch { return map; }
  if (shallow) return map;
  // Belt and braces for CI clones that are shallow without saying so: real history here has hundreds of commits.
  try { if (Number(git('rev-list', '--count', 'HEAD')) < MIN_COMMITS) return map; } catch { return map; }
  const appSource = readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf8');
  const files = routeFiles(appSource);
  const commitDate = (f) => { try { return existsSync(path.join(ROOT, f)) ? git('log', '-1', '--format=%cI', '--', f) : ''; } catch { return ''; } };
  const newest = (list) => list.map(commitDate).filter(Boolean).sort().at(-1);
  const iso = (d) => (d ? new Date(d).toISOString().slice(0, 10) : undefined);
  const articles = readFileSync(path.join(ROOT, 'src/data/articles.ts'), 'utf8');
  for (const r of routes) {
    const route = r.replace(/\/+$/, '') || '/';
    let d;
    const m = route.match(/^\/journal\/(.+)$/);
    if (m) {
      const block = articles.split(`slug: '${m[1]}'`)[1]?.slice(0, 600) ?? '';
      const ds = block.match(/date:\s*'([^']+)'/)?.[1];
      const parsed = ds ? new Date(`${ds} 12:00:00 GMT`) : null;
      d = parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString().slice(0, 10) : undefined;
    } else {
      const f = files[route] ?? (route.startsWith('/works/') ? undefined : undefined);
      if (f) {
        const extra = Object.entries(SHARED).filter(([k]) => readFileSync(path.join(ROOT, f), 'utf8').includes(k)).flatMap(([, v]) => v);
        d = iso(newest([f, ...extra]));
      }
    }
    if (d) map[route] = d;
  }
  return map;
}

/** Rewrites <url> entries: drops any existing <lastmod> and adds the evidence-based one (or none). */
export function applyLastmod(xml, map) {
  return xml.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
    const loc = inner.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc) return block;
    const route = new URL(loc).pathname.replace(/\/+$/, '') || '/';
    const cleaned = inner.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, '');
    const lm = map[route];
    return `<url>${cleaned.replace(/(<loc>[^<]+<\/loc>)/, lm ? `$1\n    <lastmod>${lm}</lastmod>` : '$1')}</url>`;
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const routes = [...readFileSync(path.join(ROOT, 'src/data/routes.ts'), 'utf8').matchAll(/'(\/[^']*)'/g)].map((m) => m[1]);
  console.log(JSON.stringify(buildLastmodMap(routes), null, 1));
}
