# NLDS metadata hygiene utility

A small, local-only CLI for cleaning files we own before publishing:
removing accidental private image metadata and flagging hidden Unicode
paste artifacts in text drafts for review.

## Intended use

- **Files we own.** For NLDS-owned images and drafts only — brand assets,
  screenshots, exports, client-approved copy before it goes out the door.
- **Privacy cleanup only.** The goal is removing incidental private data
  (camera/device info, editing-tool metadata, GPS if present, paste
  artifacts) before a file is shared or published — nothing more.
- **Does not prove content is human-written.** This tool makes no claim
  about authorship. It only removes file-level metadata and flags invisible
  Unicode characters for a human to review.
- **Does not bypass platform detection systems.** This is not a detection-
  evasion tool. It does not touch anything related to AI-content watermarks
  or authorship-detection signals — see "Out of scope" below.

## Out of scope (by design)

- No AI-detector evasion of any kind.
- No statistical/token-level watermark handling or removal.
- No claims about "humanizing" text or defeating any vendor's provenance
  system.
- No network calls, no background service, no daemon. Everything runs as a
  one-shot local process against files you point it at.

## Commands

```bash
# Inspect an image's metadata (EXIF/ICC/IPTC/XMP presence) without changing it.
node tools/metadata-hygiene/cli.mjs inspect path/to/photo.jpg

# Inspect a text/Markdown/HTML draft for invisible Unicode characters.
node tools/metadata-hygiene/cli.mjs inspect path/to/draft.md

# Strip EXIF/ICC/IPTC/XMP from a supported image, writing a new file
# (never overwrites the original unless --in-place is passed).
node tools/metadata-hygiene/cli.mjs clean-image path/to/photo.jpg
node tools/metadata-hygiene/cli.mjs clean-image path/to/photo.jpg --out-dir dist/clean
node tools/metadata-hygiene/cli.mjs clean-image path/to/photo.jpg --in-place

# Scan a text/Markdown/HTML draft for hidden Unicode paste artifacts.
# Detect-only -- this never modifies the file. Review each hit yourself;
# some (soft hyphens, directional marks in genuinely bidirectional text)
# can be intentional.
node tools/metadata-hygiene/cli.mjs scan-text path/to/draft.md
```

Multiple files can be passed to any command.

### Supported image formats for stripping

`clean-image` officially supports **PNG, JPEG, WebP**. Other raster formats
(TIFF, GIF, AVIF) can be inspected but are not covered by the strip command
in this version — pass one of the three supported extensions.

### What "clean-image" actually does

It re-encodes the image through [`sharp`](https://sharp.pixelplumbing.com/)
without re-attaching metadata. sharp's own documented default is to drop
EXIF/ICC/IPTC/XMP on output unless you explicitly ask it to keep them, which
is exactly the behavior this tool relies on — no metadata is parsed or
selectively edited, it's simply not carried into the new file.

## Dependencies

- [`sharp`](https://www.npmjs.com/package/sharp) — already a devDependency
  of this repo (used elsewhere for image optimization). No new dependency
  was added for image handling.
- Text scanning uses Node's built-in string/Unicode handling only — no
  dependency.
- Tests use Node's built-in [`node:test`](https://nodejs.org/api/test.html)
  runner — no test framework dependency was added, since this repo does not
  currently have a JS test framework installed.

## Tests

```bash
node --test tools/metadata-hygiene/test.mjs
```

## Design notes

- Non-destructive by default: `clean-image` always writes to a new file
  (`name.clean.ext`) unless you explicitly pass `--in-place`.
- Image inspection reports metadata **presence and byte size only** — it
  never parses or prints the actual EXIF/XMP field values, since the point
  is deciding whether to strip, not surfacing potentially private contents
  to a terminal/log.
- Unicode scanning is **detect-only**: it flags hits with line/column,
  codepoint, and name, but never rewrites text automatically. A human
  reviews and decides what (if anything) to change.
