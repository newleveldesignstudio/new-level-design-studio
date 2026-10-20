// Private-path safety: FAIL CLOSED. Private GSC data and generated reports must never be read from or written into the public repo.
import { realpathSync, lstatSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

export class PrivatePathError extends Error {}
const real = (p) => { try { return realpathSync(p); } catch (e) { throw new PrivatePathError(`cannot resolve path (fail closed): ${p}`); } };
const inside = (child, parent) => { const r = path.relative(parent, child); return r === "" || (!r.startsWith("..") && !path.isAbsolute(r)); };

/** Resolve an input dir; refuse it if it (after symlink resolution) is inside the repo. Returns the real path. */
export function assertPrivateInput(input, repoRoot) {
  if (!input || typeof input !== "string") throw new PrivatePathError("input directory required");
  const repo = real(repoRoot), dir = real(path.resolve(input));
  if (inside(dir, repo)) throw new PrivatePathError(`refusing: input resolves inside the public repo (${dir})`);
  if (!lstatSync(dir).isDirectory()) throw new PrivatePathError(`input is not a directory: ${dir}`);
  return dir;
}
/** Create <input>/v2 (never through a symlink) and return its real path, re-checked to be outside the repo. */
export function ensurePrivateOutDir(inputReal, repoRoot, name = "v2") {
  const repo = real(repoRoot), out = path.join(inputReal, name);
  try { if (lstatSync(out).isSymbolicLink()) throw new PrivatePathError(`refusing: output dir is a symlink (${out})`); } catch (e) { if (e instanceof PrivatePathError) throw e; mkdirSync(out, { recursive: true }); }
  const r = real(out); if (inside(r, repo) || !inside(r, inputReal)) throw new PrivatePathError(`refusing: output resolves to ${r}`);
  return r;
}
/** Write one file inside the checked output dir (no path separators, no symlink targets, never overwrites v1 artifacts). */
export function safeWrite(outReal, repoRoot, name, data) {
  if (name !== path.basename(name) || name.startsWith(".")) throw new PrivatePathError(`bad output file name: ${name}`);
  const repo = real(repoRoot), file = path.join(outReal, name);
  try { if (lstatSync(file).isSymbolicLink()) throw new PrivatePathError(`refusing: output file is a symlink (${file})`); } catch (e) { if (e instanceof PrivatePathError) throw e; }
  if (inside(real(outReal), repo)) throw new PrivatePathError("refusing: output dir inside the public repo");
  writeFileSync(file, data); return file;
}
