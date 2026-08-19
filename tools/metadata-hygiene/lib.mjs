// NLDS metadata hygiene utility -- core logic.
//
// Two independent, local-only checks for files we own before publishing:
//   1. Image metadata (EXIF / ICC / IPTC / XMP) inspection + stripping.
//   2. Invisible/format Unicode character detection in text drafts.
//
// No network calls, no daemon, no external service. Image handling uses
// `sharp` (already a project devDependency). Text scanning is pure Node
// stdlib -- no dependency needed.

import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// ---------------------------------------------------------------------------
// Image metadata
// ---------------------------------------------------------------------------

/** Formats this tool declares official strip support for. sharp can read
 *  metadata from more formats than this, but we only promise write/strip
 *  behavior for the three formats the task actually asked for. */
export const STRIP_SUPPORTED_FORMATS = new Set(['png', 'jpeg', 'jpg', 'webp']);

const IMAGE_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.tif', '.tiff', '.gif', '.avif',
]);

export function isImageFile(filePath) {
  return IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

/** Inspects one image file's metadata without modifying it. Returns which
 *  provenance/private-metadata blocks are present (never their contents --
 *  we don't parse EXIF fields, only report presence/size, which is enough
 *  to decide whether a strip is worth doing). */
export async function inspectImage(filePath) {
  const fileStat = await stat(filePath);
  const img = sharp(filePath);
  const meta = await img.metadata();
  return {
    file: filePath,
    fileSizeBytes: fileStat.size,
    format: meta.format ?? null,
    width: meta.width ?? null,
    height: meta.height ?? null,
    hasExif: Boolean(meta.exif),
    exifBytes: meta.exif ? meta.exif.length : 0,
    hasIcc: Boolean(meta.icc),
    iccBytes: meta.icc ? meta.icc.length : 0,
    hasIptc: Boolean(meta.iptc),
    iptcBytes: meta.iptc ? meta.iptc.length : 0,
    hasXmp: Boolean(meta.xmp),
    xmpBytes: meta.xmp ? meta.xmp.length : 0,
  };
}

/** Strips EXIF/ICC/IPTC/XMP from a supported raster image and writes the
 *  result to `outputPath` (never overwrites the input unless the caller
 *  explicitly passes the same path). Piping through sharp WITHOUT calling
 *  `.withMetadata()` is sharp's own documented default: metadata is
 *  dropped on output unless explicitly re-attached. */
export async function cleanImage(inputPath, outputPath) {
  const format = path.extname(inputPath).slice(1).toLowerCase();
  const normalized = format === 'jpg' ? 'jpeg' : format;
  if (!STRIP_SUPPORTED_FORMATS.has(normalized)) {
    throw new Error(
      `Unsupported format for stripping: ".${format}". Supported: ${[...STRIP_SUPPORTED_FORMATS].join(', ')}.`,
    );
  }
  const before = await inspectImage(inputPath);
  await sharp(inputPath).toFile(outputPath);
  const after = await inspectImage(outputPath);
  return { before, after };
}

// ---------------------------------------------------------------------------
// Invisible / format Unicode detection (text, Markdown, HTML drafts)
// ---------------------------------------------------------------------------

/** Real Unicode format-control / zero-width / bidi-control code points that
 *  are invisible or near-invisible in rendered text and commonly show up as
 *  paste artifacts from word processors, chat apps, or copy-pasted web
 *  content. This is standard Unicode data (the "Cf" General Category plus a
 *  handful of well-known specific points such as the BOM and variation
 *  selectors) -- there is exactly one correct code point for "zero width
 *  space", independent of any particular tool. */
export const INVISIBLE_CODEPOINTS = new Map([
  [0x00ad, 'soft hyphen'],
  [0x034f, 'combining grapheme joiner'],
  [0x061c, 'Arabic letter mark'],
  [0x115f, 'Hangul choseong filler'],
  [0x1160, 'Hangul jungseong filler'],
  [0x17b4, 'Khmer vowel inherent AQ'],
  [0x17b5, 'Khmer vowel inherent AA'],
  [0x180b, 'Mongolian free variation selector-1'],
  [0x180c, 'Mongolian free variation selector-2'],
  [0x180d, 'Mongolian free variation selector-3'],
  [0x180e, 'Mongolian vowel separator'],
  [0x200b, 'zero width space'],
  [0x200c, 'zero width non-joiner'],
  [0x200d, 'zero width joiner'],
  [0x200e, 'left-to-right mark'],
  [0x200f, 'right-to-left mark'],
  [0x202a, 'left-to-right embedding'],
  [0x202b, 'right-to-left embedding'],
  [0x202c, 'pop directional formatting'],
  [0x202d, 'left-to-right override'],
  [0x202e, 'right-to-left override'],
  [0x2060, 'word joiner'],
  [0x2061, 'function application'],
  [0x2062, 'invisible times'],
  [0x2063, 'invisible separator'],
  [0x2064, 'invisible plus'],
  [0x2066, 'left-to-right isolate'],
  [0x2067, 'right-to-left isolate'],
  [0x2068, 'first strong isolate'],
  [0x2069, 'pop directional isolate'],
  [0xfeff, 'zero width no-break space / BOM'],
]);
// Variation selectors FE00-FE0F.
for (let cp = 0xfe00; cp <= 0xfe0f; cp += 1) {
  INVISIBLE_CODEPOINTS.set(cp, 'variation selector');
}

const TEXT_EXTENSIONS = new Set(['.txt', '.md', '.markdown', '.html', '.htm']);

export function isTextDraftFile(filePath) {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

/** Scans text for invisible/format Unicode code points. Detect-only: this
 *  never rewrites the file. Some of these characters (soft hyphen, RLM/LRM
 *  for genuinely bidirectional text) can be intentional, so a human should
 *  review hits rather than have them silently stripped. */
export function scanTextForInvisibleUnicode(text) {
  const hits = [];
  let line = 1;
  let col = 0;
  for (const ch of text) {
    col += 1;
    if (ch === '\n') {
      line += 1;
      col = 0;
      continue;
    }
    const cp = ch.codePointAt(0);
    if (INVISIBLE_CODEPOINTS.has(cp)) {
      hits.push({
        line,
        col,
        codepoint: `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`,
        name: INVISIBLE_CODEPOINTS.get(cp),
      });
    }
  }
  return { totalChars: [...text].length, hits, hitCount: hits.length };
}

export async function scanTextFile(filePath) {
  const text = await readFile(filePath, 'utf8');
  return { file: filePath, ...scanTextForInvisibleUnicode(text) };
}
