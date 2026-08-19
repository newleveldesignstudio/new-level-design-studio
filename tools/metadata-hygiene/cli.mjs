#!/usr/bin/env node
// NLDS metadata hygiene utility -- CLI.
//
// Local-only. No HTTP service, no daemon, no network calls.
//
// Usage:
//   node tools/metadata-hygiene/cli.mjs inspect <file...>
//   node tools/metadata-hygiene/cli.mjs clean-image <file...> [--out-dir DIR] [--in-place]
//   node tools/metadata-hygiene/cli.mjs scan-text <file...>
//
// See README.md in this directory for the full usage notes and boundaries.

import path from 'node:path';
import {
  isImageFile,
  isTextDraftFile,
  inspectImage,
  cleanImage,
  scanTextFile,
  STRIP_SUPPORTED_FORMATS,
} from './lib.mjs';

function printImageInspectReport(report) {
  console.log(`\n${report.file}`);
  console.log(`  format: ${report.format ?? 'unknown'}  ${report.width ?? '?'}x${report.height ?? '?'}  ${report.fileSizeBytes} bytes`);
  console.log(`  EXIF: ${report.hasExif ? `present (${report.exifBytes} bytes)` : 'none'}`);
  console.log(`  ICC:  ${report.hasIcc ? `present (${report.iccBytes} bytes)` : 'none'}`);
  console.log(`  IPTC: ${report.hasIptc ? `present (${report.iptcBytes} bytes)` : 'none'}`);
  console.log(`  XMP:  ${report.hasXmp ? `present (${report.xmpBytes} bytes)` : 'none'}`);
}

async function cmdInspect(files) {
  for (const file of files) {
    if (isImageFile(file)) {
      printImageInspectReport(await inspectImage(file));
    } else if (isTextDraftFile(file)) {
      const result = await scanTextFile(file);
      console.log(`\n${file}`);
      console.log(`  ${result.hitCount} invisible/format Unicode character(s) found in ${result.totalChars} characters.`);
    } else {
      console.log(`\n${file}\n  skipped: not a recognized image or text-draft extension.`);
    }
  }
}

async function cmdCleanImage(files, { outDir, inPlace }) {
  let anyUnsupported = false;
  for (const file of files) {
    const ext = path.extname(file).slice(1).toLowerCase();
    const normalized = ext === 'jpg' ? 'jpeg' : ext;
    if (!STRIP_SUPPORTED_FORMATS.has(normalized)) {
      console.log(`\n${file}\n  SKIPPED: ".${ext}" is not a supported strip format (supported: ${[...STRIP_SUPPORTED_FORMATS].join(', ')}).`);
      anyUnsupported = true;
      continue;
    }
    const outputPath = inPlace
      ? file
      : path.join(outDir ?? path.dirname(file), `${path.basename(file, path.extname(file))}.clean${path.extname(file)}`);
    const { before, after } = await cleanImage(file, outputPath);
    console.log(`\n${file} -> ${outputPath}`);
    console.log(`  before: EXIF=${before.hasExif ? 'yes' : 'no'} ICC=${before.hasIcc ? 'yes' : 'no'} IPTC=${before.hasIptc ? 'yes' : 'no'} XMP=${before.hasXmp ? 'yes' : 'no'} (${before.fileSizeBytes} bytes)`);
    console.log(`  after:  EXIF=${after.hasExif ? 'yes' : 'no'} ICC=${after.hasIcc ? 'yes' : 'no'} IPTC=${after.hasIptc ? 'yes' : 'no'} XMP=${after.hasXmp ? 'yes' : 'no'} (${after.fileSizeBytes} bytes)`);
  }
  if (anyUnsupported) console.log('\nSome files were skipped -- see SKIPPED lines above.');
}

async function cmdScanText(files) {
  for (const file of files) {
    const result = await scanTextFile(file);
    console.log(`\n${file}`);
    console.log(`  ${result.hitCount} invisible/format Unicode character(s) found in ${result.totalChars} characters (detect-only, file not modified).`);
    for (const hit of result.hits.slice(0, 50)) {
      console.log(`    line ${hit.line}, col ${hit.col}: ${hit.codepoint} (${hit.name})`);
    }
    if (result.hits.length > 50) console.log(`    ... and ${result.hits.length - 50} more.`);
  }
}

function parseArgs(argv) {
  const files = [];
  const flags = { outDir: null, inPlace: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out-dir') {
      flags.outDir = argv[i + 1];
      i += 1;
    } else if (arg === '--in-place') {
      flags.inPlace = true;
    } else {
      files.push(arg);
    }
  }
  return { files, flags };
}

async function main() {
  const [, , command, ...rest] = process.argv;
  const { files, flags } = parseArgs(rest);

  if (!command || files.length === 0) {
    console.log('Usage:');
    console.log('  node tools/metadata-hygiene/cli.mjs inspect <file...>');
    console.log('  node tools/metadata-hygiene/cli.mjs clean-image <file...> [--out-dir DIR] [--in-place]');
    console.log('  node tools/metadata-hygiene/cli.mjs scan-text <file...>');
    process.exitCode = files.length === 0 && command ? 1 : 0;
    return;
  }

  if (command === 'inspect') await cmdInspect(files);
  else if (command === 'clean-image') await cmdCleanImage(files, flags);
  else if (command === 'scan-text') await cmdScanText(files);
  else {
    console.error(`Unknown command: ${command}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
});
