// Focused tests for the metadata hygiene utility.
// Uses Node's built-in test runner (node:test) -- no new dependency, since
// this repo has no JS test framework installed.
//
// Run with: node --test tools/metadata-hygiene/test.mjs

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import {
  inspectImage,
  cleanImage,
  scanTextForInvisibleUnicode,
  isImageFile,
  isTextDraftFile,
  STRIP_SUPPORTED_FORMATS,
} from './lib.mjs';

async function withTempDir(fn) {
  const dir = await mkdtemp(path.join(tmpdir(), 'nlds-metadata-hygiene-'));
  try {
    return await fn(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test('isImageFile / isTextDraftFile classify by extension', () => {
  assert.equal(isImageFile('photo.JPG'), true);
  assert.equal(isImageFile('photo.png'), true);
  assert.equal(isImageFile('notes.md'), false);
  assert.equal(isTextDraftFile('draft.md'), true);
  assert.equal(isTextDraftFile('draft.html'), true);
  assert.equal(isTextDraftFile('photo.png'), false);
});

test('inspectImage reports EXIF presence on a JPEG with EXIF embedded', async () => {
  await withTempDir(async (dir) => {
    const filePath = path.join(dir, 'with-exif.jpg');
    await sharp({ create: { width: 4, height: 4, channels: 3, background: '#ff0000' } })
      .jpeg()
      .withExif({ IFD0: { Make: 'TestCam', Software: 'nlds-test' } })
      .toFile(filePath);

    const report = await inspectImage(filePath);
    assert.equal(report.format, 'jpeg');
    assert.equal(report.hasExif, true);
    assert.ok(report.exifBytes > 0);
    assert.equal(report.width, 4);
    assert.equal(report.height, 4);
  });
});

test('cleanImage strips EXIF from a JPEG and writes a separate output file', async () => {
  await withTempDir(async (dir) => {
    const inputPath = path.join(dir, 'source.jpg');
    const outputPath = path.join(dir, 'source.clean.jpg');
    await sharp({ create: { width: 4, height: 4, channels: 3, background: '#00ff00' } })
      .jpeg()
      .withExif({ IFD0: { Make: 'TestCam' } })
      .toFile(inputPath);

    const { before, after } = await cleanImage(inputPath, outputPath);
    assert.equal(before.hasExif, true);
    assert.equal(after.hasExif, false, 'expected EXIF removed from the cleaned output');

    // Input file itself must be untouched (non-destructive default).
    const inputAfter = await inspectImage(inputPath);
    assert.equal(inputAfter.hasExif, true, 'expected the original input file left unmodified');
  });
});

test('cleanImage rejects an unsupported strip format', async () => {
  await withTempDir(async (dir) => {
    const inputPath = path.join(dir, 'source.gif');
    await writeFile(inputPath, Buffer.from('GIF89a', 'utf8'));
    await assert.rejects(() => cleanImage(inputPath, path.join(dir, 'out.gif')));
  });
});

test('STRIP_SUPPORTED_FORMATS matches the task scope: png, jpeg/jpg, webp', () => {
  assert.equal(STRIP_SUPPORTED_FORMATS.has('png'), true);
  assert.equal(STRIP_SUPPORTED_FORMATS.has('jpeg'), true);
  assert.equal(STRIP_SUPPORTED_FORMATS.has('webp'), true);
  assert.equal(STRIP_SUPPORTED_FORMATS.has('gif'), false);
});

test('scanTextForInvisibleUnicode finds a zero-width space and reports position', () => {
  const text = 'Hello​world';
  const result = scanTextForInvisibleUnicode(text);
  assert.equal(result.hitCount, 1);
  assert.equal(result.hits[0].codepoint, 'U+200B');
  assert.equal(result.hits[0].name, 'zero width space');
  assert.equal(result.hits[0].line, 1);
});

test('scanTextForInvisibleUnicode tracks line numbers across newlines', () => {
  const text = 'line one\nline‌two\nline three';
  const result = scanTextForInvisibleUnicode(text);
  assert.equal(result.hitCount, 1);
  assert.equal(result.hits[0].line, 2);
  assert.equal(result.hits[0].name, 'zero width non-joiner');
});

test('scanTextForInvisibleUnicode returns zero hits on ordinary prose', () => {
  const text = 'This is completely ordinary text with no hidden characters.';
  const result = scanTextForInvisibleUnicode(text);
  assert.equal(result.hitCount, 0);
  assert.deepEqual(result.hits, []);
});

test('scanTextForInvisibleUnicode never modifies the input (detect-only)', () => {
  const text = 'Some​text﻿here';
  const before = text;
  scanTextForInvisibleUnicode(text);
  assert.equal(text, before, 'the scanner must be read-only');
});
