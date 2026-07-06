/**
 * NLDS image optimization pipeline.
 *
 * Generates optimized runtime derivatives next to the original assets.
 * Originals are never modified or deleted — components reference the
 * derivatives; originals remain the source of truth.
 *
 * Outputs per heavy PNG/JPG (>= 200KB, referenced in src/):
 *   <base>.webp        — full size (capped at 1920px wide), q78
 *   <base>-w768.webp   — 768px wide, q75 (cards / mobile srcset)
 * Plus:
 *   founder portrait   — -w560.webp derivative
 *   favicon            — -512.png derivative (PNG for favicon compatibility)
 *   scroll frames      — desktop/tablet recompressed (same dimensions, q68)
 *                        into sibling *-optimized/ directories
 *
 * Usage: node scripts/optimize-images.mjs
 * Idempotent: skips outputs that already exist and are newer than the source.
 */
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'public');

/** Heavy content images referenced from src/ (originals preserved). */
const CONTENT_IMAGES = [
  '/nlds/images/aureline-estates-luxury-real-estate-website-concept-nlds.png',
  '/nlds/images/love-handles-bbq-catering-website-demo-ormond-beach.png',
  '/nlds/images/new-level-design-studio-foundation-system-studio-page.png',
  '/nlds/images/ember-oak-coffee-website-concept-nlds.png',
  '/nlds/images/dh-luxury-roofing-homepage-concept-nlds.png',
  '/nlds/images/port-orange-local-businesses-established-online-presence-new-level-design-studio.png',
  '/files/nlds/images/new-level-design-studio-website-brand-content-system-port-orange-fl.png',
  '/nlds/images/port-orange-local-business-storefront-first-impression-trust-new-level-design-studio.png',
  '/nlds/images/port-orange-local-business-online-presence-system-websites-brand-visuals-video-nlds.png',
  '/nlds/images/starter-pack-branded-marketing-assets-local-business-new-level-design-studio.png',
  '/nlds/images/new-level-design-studio-strand-salon-works-case-study-port-orange-web-design.png',
  '/nlds/images/volusia-legal-group-law-firm-website-concept-nlds.png',
  '/nlds/images/new-level-design-studio-website-strategy-workspace-hero.png',
  '/nlds/images/coastal-roofing-quote-ready-landing-page-case-study-new-level-design-studio.png',
  '/files/nlds/images/iron-house-gym-class-schedule-membership-landing-page-case-study-nlds.png',
  '/nlds/images/harbor-homes-group-coastal-real-estate-listing-website-design-nlds.png',
  '/files/nlds/images/la-tequila-port-orange-restaurant-website-design-case-study-nlds.png',
  '/nlds/images/stone-timber-remodeling-cinematic-contractor-website-concept-nlds.jpg',
  '/nlds/images/lotus-beauty-house-salon-website-concept-nlds.jpg',
  '/nlds/images/blend-house-smoothie-bar-website-concept-nlds.jpg',
];

const FOUNDER = '/images/founder/michael-vail-founder-portrait-new-level-design-studio.webp';
const FAVICON = '/nlds/images/new-level-design-studio-nl-monogram-logo-charcoal.png';

const FULL_MAX_WIDTH = 1920;
const FULL_QUALITY = 78;
const W768_QUALITY = 75;
const FRAME_QUALITY = 68;

function fresh(src, out) {
  return existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;
}

async function run() {
  const manifest = {};
  let before = 0;
  let after = 0;

  for (const rel of CONTENT_IMAGES) {
    const src = path.join(PUB, rel);
    if (!existsSync(src)) {
      console.warn(`  ! missing, skipped: ${rel}`);
      continue;
    }
    const dir = path.dirname(src);
    const base = path.basename(rel).replace(/\.(png|jpe?g)$/i, '');
    const fullOut = path.join(dir, `${base}.webp`);
    const w768Out = path.join(dir, `${base}-w768.webp`);

    const meta = await sharp(src).metadata();
    const fullWidth = Math.min(meta.width, FULL_MAX_WIDTH);
    const fullHeight = Math.round(meta.height * (fullWidth / meta.width));

    if (!fresh(src, fullOut)) {
      await sharp(src).resize({ width: fullWidth, withoutEnlargement: true })
        .webp({ quality: FULL_QUALITY }).toFile(fullOut);
    }
    if (!fresh(src, w768Out)) {
      await sharp(src).resize({ width: 768, withoutEnlargement: true })
        .webp({ quality: W768_QUALITY }).toFile(w768Out);
    }

    const relDir = path.dirname(rel);
    manifest[rel] = {
      full: `${relDir}/${base}.webp`,
      w768: `${relDir}/${base}-w768.webp`,
      width: fullWidth,
      height: fullHeight,
    };
    before += statSync(src).size;
    after += statSync(fullOut).size;
    console.log(`  ✓ ${base} — ${(statSync(src).size / 1e6).toFixed(2)}MB → ${(statSync(fullOut).size / 1e3).toFixed(0)}KB (+w768)`);
  }

  // Founder portrait: already webp; add a 560px derivative for its display sizes.
  const founderSrc = path.join(PUB, FOUNDER);
  const founderOut = founderSrc.replace(/\.webp$/, '-w560.webp');
  if (existsSync(founderSrc) && !fresh(founderSrc, founderOut)) {
    await sharp(founderSrc).resize({ width: 560 }).webp({ quality: 80 }).toFile(founderOut);
    console.log(`  ✓ founder portrait -w560`);
  }

  // Favicon: 512px PNG derivative (pure downscale of the approved monogram —
  // never regenerated or redrawn).
  const favSrc = path.join(PUB, FAVICON);
  const favOut = favSrc.replace(/\.png$/, '-512.png');
  if (existsSync(favSrc) && !fresh(favSrc, favOut)) {
    await sharp(favSrc).resize({ width: 512, withoutEnlargement: true }).png().toFile(favOut);
    console.log(`  ✓ favicon -512`);
  }

  // Scroll-trigger frames: recompress desktop + tablet at the same dimensions
  // into sibling *-optimized directories. Mobile set (2.4MB) is left as-is.
  for (const bp of ['desktop', 'tablet']) {
    const srcDir = path.join(PUB, 'images/scroll-trigger', bp);
    const outDir = path.join(PUB, 'images/scroll-trigger', `${bp}-optimized`);
    mkdirSync(outDir, { recursive: true });
    let dirBefore = 0;
    let dirAfter = 0;
    for (const f of readdirSync(srcDir).filter((f) => f.endsWith('.webp'))) {
      const src = path.join(srcDir, f);
      const out = path.join(outDir, f);
      if (!fresh(src, out)) {
        await sharp(src).webp({ quality: FRAME_QUALITY }).toFile(out);
      }
      dirBefore += statSync(src).size;
      dirAfter += statSync(out).size;
    }
    console.log(`  ✓ frames ${bp}: ${(dirBefore / 1e6).toFixed(1)}MB → ${(dirAfter / 1e6).toFixed(1)}MB`);
  }

  writeFileSync(path.join(ROOT, 'scripts', 'image-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nContent images: ${(before / 1e6).toFixed(1)}MB originals → ${(after / 1e6).toFixed(1)}MB full-size webp derivatives.`);
  console.log('Manifest written to scripts/image-manifest.json');
}

run().catch((err) => { console.error(err); process.exit(1); });
