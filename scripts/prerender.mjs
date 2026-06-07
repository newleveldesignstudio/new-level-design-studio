import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const ROUTES = [
  '/',
  '/services',
  '/works',
  '/studio',
  '/journal',
  '/contact',
  '/starter-pack',
  '/packages',
  '/privacy',
  '/terms',
  '/port-orange-website-design',
  '/daytona-beach-website-design',
  '/volusia-county-website-design',
  '/central-florida-website-design',
  '/works/the-grass-guys',
  '/works/dh-luxury-roofing',
  '/works/volusia-legal-group',
  '/works/ember-oak-coffee',
  '/works/love-handles-bbq',
  '/works/coastal-standard-realty',
  '/works/el-taller-2026',
  '/works/la-tequila-2026',
  '/works/the-best-landscape-2026',
  '/works/aureline-estates',
];
const PORT = 4174;
const BASE_URL = `http://localhost:${PORT}`;
const DIST_DIR = path.join(ROOT, 'dist');
const TIMEOUT = 60000;
const MAX_RETRIES = 2;

// Routes that MUST succeed — build fails loudly if any of these are missing.
const REQUIRED_ROUTES = new Set([
  '/',
  '/services',
  '/works',
  '/studio',
  '/journal',
  '/contact',
  '/packages',
]);

const BASE_TITLE = 'New Level Design Studio — Premium Websites for Local Businesses | Port Orange, FL';
const BASE_DESC = 'Premium websites, visuals, and short-form content for local businesses in Port Orange, Daytona Beach, Volusia County, and Central Florida. Built for credibility, visibility, and conversion.';
const BASE_CANONICAL = 'https://newlvlstudio.com/';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
    });

    let started = false;

    const tryResolve = (data) => {
      const text = data.toString();
      if (!started && (text.includes('localhost') || text.includes('Local:') || text.includes('ready'))) {
        started = true;
        resolve(server);
      }
    };

    server.stdout.on('data', tryResolve);
    server.stderr.on('data', tryResolve);
    server.on('error', reject);

    // Fallback: always resolve after 5s
    setTimeout(() => {
      if (!started) { started = true; resolve(server); }
    }, 5000);
  });
}

/**
 * Remove duplicate SEO tags injected by react-helmet-async on top of the
 * static index.html tags. Ensures exactly one title, description, canonical,
 * and deduplicated OG/Twitter/JSON-LD per page.
 *
 * @param {string} html - Raw HTML from page.content()
 * @param {string} [liveTitle] - Authoritative title from page.title() (React Helmet live value)
 */
function cleanHead(html, liveTitle) {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return html;

  let inner = headMatch[1];

  // 1. Titles: use liveTitle from page.title() when available (most reliable —
  //    captures the React Helmet value even if the DOM serialisation lags).
  //    Fall back to DOM extraction for safety.
  const titles = [];
  inner = inner.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, (m) => { titles.push(m); return ''; });

  let titleKeep;
  if (liveTitle && liveTitle.trim() !== '') {
    // Escape any stray < or > in the title text just in case
    const safeTitle = liveTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    titleKeep = `<title>${safeTitle}</title>`;
  } else {
    const nonBaseTitles = titles.filter((t) => {
      const text = t.replace(/<[^>]+>/g, '').trim();
      return text !== BASE_TITLE;
    });
    titleKeep = nonBaseTitles.length > 0 ? nonBaseTitles[nonBaseTitles.length - 1] : titles[0] || '';
  }

  // 2. Meta descriptions: keep first non-base; fallback to first
  const descs = [];
  inner = inner.replace(/<meta\b[^>]*name=["']description["'][^>]*>/gi, (m) => { descs.push(m); return ''; });
  const nonBaseDescs = descs.filter((d) => {
    const m = d.match(/content=["']([^"']+)["']/);
    return m && m[1] !== BASE_DESC;
  });
  const descKeep = nonBaseDescs.length > 0 ? nonBaseDescs[nonBaseDescs.length - 1] : descs[0] || '';

  // 3. Canonicals: keep first non-base; fallback to first
  const canons = [];
  inner = inner.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, (m) => { canons.push(m); return ''; });
  const nonBaseCanons = canons.filter((c) => {
    const m = c.match(/href=["']([^"']+)["']/);
    return m && m[1] !== BASE_CANONICAL;
  });
  const canonKeep = nonBaseCanons.length > 0 ? nonBaseCanons[nonBaseCanons.length - 1] : canons[0] || '';

  // 4. OG tags: group by property, keep last occurrence
  const ogMap = new Map();
  inner = inner.replace(/<meta\b[^>]*property=["'](og:[^"']+)["'][^>]*>/gi, (m, prop) => { ogMap.set(prop, m); return ''; });

  // 5. Twitter tags: group by name, keep last occurrence
  const twMap = new Map();
  inner = inner.replace(/<meta\b[^>]*name=["'](twitter:[^"']+)["'][^>]*>/gi, (m, name) => { twMap.set(name, m); return ''; });

  // 6. JSON-LD: remove old base schema (no code-path, has old Port Orange, FL marker);
  // keep Helmet-injected schemas (code-path attribute) or any non-base schema.
  const schemas = [];
  inner = inner.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, (m) => { schemas.push(m); return ''; });
  const schemasKeep = schemas.filter((s) => {
    if (s.includes('code-path')) return true;
    const isOldBase = s.includes('"@type": "ProfessionalService"') && s.includes('"Port Orange, FL"');
    return !isOldBase;
  });
  const finalSchemas = schemasKeep.length > 0 ? schemasKeep : schemas.slice(0, 1);

  // Rebuild SEO block and append to the end of <head>
  const seoBlock = [
    titleKeep,
    descKeep,
    canonKeep,
    ...Array.from(ogMap.values()),
    ...Array.from(twMap.values()),
    ...finalSchemas,
  ].filter(Boolean).join('\n    ');

  inner = inner.replace(/\n\s*\n/g, '\n').trim();

  const newHead = `<head>\n  ${inner}\n    ${seoBlock}\n  </head>`;
  return html.replace(headMatch[0], () => newHead);
}

async function prerender() {
  console.log('\n🔄 Starting prerender...\n');

  const server = await startPreviewServer();
  await wait(3000); // buffer for server readiness

  const browser = await chromium.launch();
  const results = [];

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    process.stdout.write(`  Rendering ${route}...`);

    let ok = false;
    let lastError = '';

    for (let attempt = 1; attempt <= MAX_RETRIES && !ok; attempt++) {
      if (attempt > 1) {
        process.stdout.write(`  Retry ${attempt - 1} ${route}...`);
      }

      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      // Abort images AND external font CDN — both block waitUntil:'load'
      // and are unnecessary for HTML/title extraction.
      await page.route('**', (r) => {
        const u = r.request().url();
        if (
          u.includes('fonts.googleapis.com') ||
          u.includes('fonts.gstatic.com') ||
          /\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i.test(u)
        ) {
          r.abort();
        } else {
          r.continue();
        }
      });

      try {
        await page.goto(url, { waitUntil: 'load', timeout: TIMEOUT });
        await wait(3000); // let React render + Helmet flush

        // Capture live document.title (set by React Helmet) alongside the full DOM.
        // page.title() reads document.title directly from the browser context,
        // which is more reliable than extracting from the serialised HTML.
        const [html, liveTitle] = await Promise.all([
          page.content(),
          page.title(),
        ]);
        const cleanedHtml = cleanHead(html, liveTitle);

        if (route === '/') {
          writeFileSync(path.join(DIST_DIR, 'index.html'), cleanedHtml, 'utf8');
        } else {
          const dir = path.join(DIST_DIR, route);
          mkdirSync(dir, { recursive: true });
          writeFileSync(path.join(dir, 'index.html'), cleanedHtml, 'utf8');
        }

        process.stdout.write(` ✓\n`);
        results.push({ route, ok: true, file: route === '/' ? 'dist/index.html' : `dist${route}/index.html` });
        ok = true;
      } catch (err) {
        lastError = err.message.split('\n')[0];
        process.stdout.write(` ✗ ${lastError}\n`);
      } finally {
        await page.close();
      }
    }

    if (!ok) {
      results.push({ route, ok: false, error: lastError });
    }
  }

  await browser.close();
  server.kill('SIGTERM');

  const failed = results.filter(r => !r.ok);
  const succeeded = results.filter(r => r.ok);

  if (failed.length > 0) {
    console.warn(`\n⚠️  ${failed.length} route(s) failed prerender:`);
    failed.forEach(r => console.warn(`   ${r.route}: ${r.error}`));
  }

  const failedRequired = failed.filter(r => REQUIRED_ROUTES.has(r.route));
  if (failedRequired.length > 0) {
    console.error(`\n✗ BUILD FAILED — ${failedRequired.length} required route(s) did not prerender:`);
    failedRequired.forEach(r => console.error(`   ${r.route}: ${r.error}`));
    console.error('');
    server.kill('SIGTERM');
    process.exit(1);
  }

  console.log(`\n✅ Prerender complete — ${succeeded.length}/${results.length} routes.\n`);

  // Fix sitemap: vite-plugin-sitemap strips trailing slashes via path.parse internals.
  // Post-process to add them back so sitemap URLs match Netlify's served URLs.
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  try {
    let sitemap = readFileSync(sitemapPath, 'utf8');
    // Add trailing slash to any loc URL that doesn't already end with /
    sitemap = sitemap.replace(/(https:\/\/newlvlstudio\.com\/[^<]*[^/])<\/loc>/g, '$1/</loc>');
    writeFileSync(sitemapPath, sitemap, 'utf8');
    const urlCount = (sitemap.match(/<loc>/g) || []).length;
    console.log(`✅ Sitemap trailing slashes fixed — ${urlCount} URLs.\n`);
  } catch (err) {
    console.warn(`⚠️  Could not fix sitemap: ${err.message}\n`);
  }

  process.exit(0);
}

prerender().catch((err) => {
  console.error('\n✗ Prerender failed:', err);
  process.exit(1);
});
