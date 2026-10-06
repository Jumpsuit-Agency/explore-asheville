/**
 * Resize and re-encode every asset the deck actually references.
 *
 * The deck shipped 186MB of referenced PNGs — a 3000x3000 photograph behind a
 * 160px avatar, 5MB mockups inside a 1254px box. Sized to the box they render
 * in and encoded as WebP, the same set is roughly 12MB.
 *
 * Idempotent: already-converted assets are skipped, so it is safe to re-run
 * after adding new creative.
 */
import { readFileSync, writeFileSync, statSync, existsSync, unlinkSync, readdirSync } from "node:fs";
import { join, extname, relative } from "node:path";
import sharp from "sharp";

const SRC_DIRS = ["src"];
const PUBLIC = "public";

/** Longest edge each role is allowed, at roughly 2x its rendered box. */
const WIDTH_RULES = [
  [/^\/team\//, 440],        // 160px circles
  [/ridge-bg/, 2200],        // full-bleed 1920 canvas
  [/wordmark/, 600],
  [/^\/creative\//, 1600],   // carousel box tops out near 1254 canvas px
];
const DEFAULT_WIDTH = 1600;

function widthFor(ref) {
  for (const [re, w] of WIDTH_RULES) if (re.test(ref)) return w;
  return DEFAULT_WIDTH;
}

function sourceFiles(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) sourceFiles(p, out);
    else if (/\.(tsx?|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = SRC_DIRS.flatMap((d) => sourceFiles(d));
const refs = new Set();
for (const f of files) {
  const s = readFileSync(f, "utf8");
  for (const m of s.matchAll(/["'`](\/[A-Za-z0-9._\/-]+\.(?:png|jpe?g))["'`]/g)) refs.add(m[1]);
  for (const m of s.matchAll(/url\((\/[A-Za-z0-9._\/-]+\.(?:png|jpe?g))\)/g)) refs.add(m[1]);
}

let before = 0, after = 0, converted = 0, missing = [];
const rename = new Map();

for (const ref of [...refs].sort()) {
  const src = join(PUBLIC, ref);
  if (!existsSync(src)) { missing.push(ref); continue; }
  const target = ref.replace(/\.(png|jpe?g)$/i, ".webp");
  const dst = join(PUBLIC, target);
  const b = statSync(src).size;
  const buf = await sharp(src)
    .rotate()
    .resize({ width: widthFor(ref), withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toBuffer();
  writeFileSync(dst, buf);
  unlinkSync(src);
  before += b; after += buf.length; converted++;
  rename.set(ref, target);
}

// Rewrite every reference in one pass.
let edited = 0;
for (const f of files) {
  let s = readFileSync(f, "utf8"); const orig = s;
  for (const [from, to] of rename) s = s.split(from).join(to);
  if (s !== orig) { writeFileSync(f, s); edited++; }
}

const mb = (n) => (n / 1048576).toFixed(1);
console.log(`converted ${converted} assets across ${edited} source files`);
console.log(`  ${mb(before)} MB -> ${mb(after)} MB  (${(100 - after * 100 / before).toFixed(1)}% smaller)`);
if (missing.length) console.log(`  referenced but missing on disk: ${missing.join(", ")}`);

// Emit the precache manifest the service worker installs.
const manifest = [...rename.values()].sort();
writeFileSync(join(PUBLIC, "asset-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`  wrote public/asset-manifest.json (${manifest.length} entries)`);
