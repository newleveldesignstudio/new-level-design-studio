import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, '../public/social-preview.jpg');

const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
  }
  body {
    background: #14120F;
    color: #F4EAD5;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 64px 72px;
    position: relative;
  }
  /* Subtle warm vignette */
  body::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 80% at 10% 60%, rgba(200,175,140,0.07) 0%, transparent 60%),
      linear-gradient(160deg, rgba(255,255,255,0.015) 0%, transparent 50%);
    pointer-events: none;
  }
  /* Thin top accent line */
  body::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, rgba(244,234,213,0.18) 30%, rgba(244,234,213,0.08) 70%, transparent 100%);
  }
  .studio-mark {
    position: absolute;
    top: 52px;
    left: 72px;
    font-family: 'Plus Jakarta Sans', Arial, sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(244,234,213,0.35);
  }
  .rule-v {
    position: absolute;
    right: 72px;
    top: 52px;
    bottom: 52px;
    width: 1px;
    background: linear-gradient(180deg, transparent 0%, rgba(244,234,213,0.12) 25%, rgba(244,234,213,0.12) 75%, transparent 100%);
  }
  .url-vertical {
    position: absolute;
    right: 94px;
    bottom: 64px;
    font-family: 'Plus Jakarta Sans', Arial, sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244,234,213,0.2);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
  }
  .content {
    position: relative;
    z-index: 1;
    max-width: 900px;
  }
  .eyebrow {
    font-family: 'Plus Jakarta Sans', Arial, sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(244,234,213,0.45);
    margin-bottom: 20px;
  }
  .headline {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 72px;
    font-weight: 400;
    line-height: 0.97;
    letter-spacing: -0.025em;
    color: #F4EAD5;
    margin-bottom: 28px;
  }
  .divider {
    width: 36px;
    height: 1px;
    background: rgba(244,234,213,0.25);
    margin-bottom: 24px;
  }
  .location {
    font-family: 'Plus Jakarta Sans', Arial, sans-serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: rgba(244,234,213,0.38);
  }
  .location span {
    color: rgba(244,234,213,0.18);
    margin: 0 10px;
  }
</style>
</head>
<body>
  <p class="studio-mark">New Level Design Studio</p>
  <div class="rule-v"></div>
  <p class="url-vertical">newlvlstudio.com</p>
  <div class="content">
    <p class="eyebrow">Premium Web Design</p>
    <h1 class="headline">Built for local<br>businesses that want<br>to look bigger online.</h1>
    <div class="divider"></div>
    <p class="location">Port Orange<span>·</span>Daytona Beach<span>·</span>Volusia County</p>
  </div>
</body>
</html>`;

async function createSocialPreview() {
  console.log('Generating social-preview.jpg...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(HTML, { waitUntil: 'networkidle' });

  // Wait for Google Fonts to load
  await page.waitForTimeout(2500);

  const buffer = await page.screenshot({
    type: 'jpeg',
    quality: 95,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });

  writeFileSync(OUT_PATH, buffer);

  const kb = Math.round(buffer.length / 1024);
  console.log(`✓ Saved to public/social-preview.jpg (${kb} KB)`);

  await browser.close();
  process.exit(0);
}

createSocialPreview().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
