// Regression check for scripts/prerender.mjs: with another server already on port 4174 (e.g. a stale
// `vite preview`), prerender must fail, must not touch dist/, and must not leave a preview process behind.
// Needs an existing build (dist/sitemap.xml). Run: node scripts/prerender-preview-guard.test.mjs
import assert from 'node:assert/strict';
import { spawnSync, execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_INDEX = path.join(ROOT, 'dist', 'index.html');
if (!existsSync(path.join(ROOT, 'dist', 'sitemap.xml'))) {
  console.log('SKIP: no dist/ build; run `npm run build` first');
  process.exit(0);
}
const previews = () =>
  execSync('ps -eo args=', { encoding: 'utf8' }).split('\n')
    .filter((a) => a.includes(path.join(ROOT, 'node_modules')) && a.includes('vite') && a.includes('preview'));
const hash = () => createHash('sha256').update(readFileSync(DIST_INDEX)).digest('hex');

assert.deepEqual(previews(), [], 'a preview server for this repo is already running; stop it first');
const stale = createServer((_, res) => res.end('<html>some other site</html>'));
await new Promise((resolve, reject) => stale.once('error', reject).listen(4174, '127.0.0.1', resolve));
const before = hash();
try {
  const run = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'prerender.mjs')], { cwd: ROOT, encoding: 'utf8', timeout: 90000 });
  const out = run.stdout + run.stderr;
  assert.equal(run.status, 1, `prerender should fail with port 4174 taken; exit ${run.status}\n${out}`);
  assert.match(out, /4174/, `failure should name the port\n${out}`);
  assert.equal(hash(), before, 'dist/index.html must not change');
  assert.deepEqual(previews(), [], 'no preview process may remain');
  console.log('PASS: prerender refuses an occupied port 4174, leaves dist/ untouched and no preview process');
} finally {
  stale.close();
}
