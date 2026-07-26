import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Manual IndexNow submission. NOT wired into any build/deploy step —
 * run on demand after shipping new or changed pages:
 *
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs https://newlvlstudio.com/some-page/ https://newlvlstudio.com/another/
 *
 * Key is read from the key file itself (public/<key>.txt) so the key only
 * exists in one place. Batches all given URLs into a single POST — IndexNow
 * supports up to 10,000 URLs per request, well above anything this site
 * would ever submit at once.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HOST = 'newlvlstudio.com';
const KEY_FILENAME = 'c7d7421765ec5b19a0b5109897c8518d.txt';
const KEY_LOCATION = `https://${HOST}/${KEY_FILENAME}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const DEFAULT_URLS = [
  'https://newlvlstudio.com/local-visibility-setup/',
  'https://newlvlstudio.com/free-local-visibility-check/',
];

function loadKey() {
  const keyPath = path.join(ROOT, 'public', KEY_FILENAME);
  return readFileSync(keyPath, 'utf8').trim();
}

async function main() {
  const key = loadKey();
  const urlList = process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_URLS;

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow for host "${HOST}":`);
  urlList.forEach((u) => console.log(`  - ${u}`));

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: KEY_LOCATION, urlList }),
  });

  const text = await res.text();
  console.log(`\nResponse: ${res.status} ${res.statusText}`);
  if (text) console.log(text);

  if (res.status === 200 || res.status === 202) {
    console.log('\nSubmitted successfully.');
  } else if (res.status === 403) {
    console.log(
      '\n403 — key verification failed. Expected if the key file is not live yet ' +
        '(not deployed). Deploy first, then re-run.',
    );
  } else {
    console.log('\nUnexpected response — see status/body above.');
  }
}

main().catch((err) => {
  console.error('IndexNow submission failed:', err);
  process.exitCode = 1;
});
