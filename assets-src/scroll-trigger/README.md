# Scroll-trigger source frames (NOT deployed)

- `desktop/` (96 frames, 2560px) and `tablet/` (80 frames, 1600px) here are
  the **source** frames. They are outside `public/`, so they are not deployed.
- The website loads the recompressed runtime frames from
  `public/images/scroll-trigger/desktop-optimized/` and `tablet-optimized/`,
  generated from these sources by `node scripts/optimize-images.mjs`.
- The mobile set is small and is served directly from
  `public/images/scroll-trigger/mobile/` (no source copy here).
- **Do not delete these source frames.** The upstream raw frames
  (`tmp/scroll-trigger-source-frames`, consumed by
  `scripts/prepare-scroll-trigger-frames.mjs`) no longer exist, so these are
  the only source for regenerating the runtime frames.
