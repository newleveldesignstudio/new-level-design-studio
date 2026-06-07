import { existsSync, mkdirSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SOURCE_DIR = path.resolve(ROOT, 'tmp/scroll-trigger-source-frames');

const OUTPUTS = [
  { name: 'desktop', dir: 'public/images/scroll-trigger/desktop', count: 96, width: 2560, quality: 92 },
  { name: 'tablet',  dir: 'public/images/scroll-trigger/tablet',  count: 80, width: 1600, quality: 90 },
  { name: 'mobile',  dir: 'public/images/scroll-trigger/mobile',  count: 64, width: 1200, quality: 90 },
];

function naturalSort(files) {
  return files.sort((a, b) => {
    const na = parseInt(path.basename(a).match(/(\d+)/)?.[1] ?? '0', 10);
    const nb = parseInt(path.basename(b).match(/(\d+)/)?.[1] ?? '0', 10);
    return na - nb;
  });
}

function evenSample(frames, count) {
  if (frames.length <= count) return [...frames];
  const result = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.round(i * (frames.length - 1) / (count - 1));
    result.push(frames[idx]);
  }
  return result;
}

async function processOutput(allFrames, cfg) {
  const sharp = (await import('sharp')).default;
  const outDir = path.resolve(ROOT, cfg.dir);
  mkdirSync(outDir, { recursive: true });

  const selected = evenSample(allFrames, cfg.count);
  console.log(`  ${cfg.name}: ${selected.length} frames → width ${cfg.width}px @ quality ${cfg.quality}`);

  // Check first frame dimensions to detect if we'd be upscaling
  const probe = await sharp(selected[0]).metadata();
  const actualWidth = Math.min(cfg.width, probe.width);
  if (actualWidth < cfg.width) {
    console.log(`  ⚠  Source width ${probe.width}px < target ${cfg.width}px — clamping to ${actualWidth}px (no upscale)`);
  }

  for (let i = 0; i < selected.length; i++) {
    const num = String(i + 1).padStart(4, '0');
    const outPath = path.join(outDir, `frame-${num}.webp`);
    await sharp(selected[i])
      .resize({ width: actualWidth, withoutEnlargement: true })
      .webp({ quality: cfg.quality, effort: 4 })
      .toFile(outPath);
  }
  console.log(`  ✓ ${cfg.name} done`);
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(`Source dir not found: ${SOURCE_DIR}`);
    console.error('Run the ffmpeg extraction step first.');
    process.exit(1);
  }

  const files = readdirSync(SOURCE_DIR)
    .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .map(f => path.join(SOURCE_DIR, f));

  const sorted = naturalSort(files);
  console.log(`Found ${sorted.length} source PNG frames`);

  if (sorted.length === 0) {
    console.error('No PNG frames found in source dir.');
    process.exit(1);
  }

  for (const cfg of OUTPUTS) {
    await processOutput(sorted, cfg);
  }

  console.log('\nAll frame sets ready.');
}

main().catch(err => { console.error(err); process.exit(1); });
