#!/usr/bin/env node
/**
 * Prepara una volta le varianti WebP delle immagini del sito (docs/DESIGN-SYSTEM.md § 5).
 *
 *   node scripts/prepara-immagini.mjs
 *
 * Legge gli originali da assets/originali (stesso percorso che hanno nel codice, es.
 * "/villa-mussio/DJI_0444.JPG" → assets/originali/villa-mussio/DJI_0444.JPG), scrive
 * public/img/<nome>-<larghezza>.webp e lib/images/manifest.json con le larghezze di
 * ciascuna. Le varianti già presenti e più recenti dell'originale si saltano.
 * Il loader di next/image (lib/images/loader.ts) usa il manifest.
 */
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(root, 'assets/originali');
const outDir = join(root, 'public/img');
const manifestPath = join(root, 'lib/images/manifest.json');

// Stesse regole di lib/images/variant.ts
const WIDTHS = [480, 960, 1440, 1920];
const variantBase = (src) =>
  decodeURIComponent(src)
    .replace(/^\/+/, '')
    .replace(/\.[a-z0-9]+$/i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

mkdirSync(outDir, { recursive: true });
const manifest = {};
const files = walk(sourceDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

for (const file of files) {
  const src = '/' + relative(sourceDir, file).split('\\').join('/');
  const base = variantBase(src);
  // failOn: 'none' perché alcune foto del cantiere hanno la coda del file troncata.
  const image = sharp(file, { failOn: 'none' }).rotate();
  const { width: original } = await image.metadata().then((m) =>
    (m.orientation ?? 1) >= 5 ? { width: m.height } : { width: m.width },
  );
  const widths = WIDTHS.filter((w) => w < original);
  if (!widths.length || original < WIDTHS[WIDTHS.length - 1]) widths.push(Math.min(original, WIDTHS[WIDTHS.length - 1]));
  const unique = [...new Set(widths)].sort((a, b) => a - b);
  manifest[base] = unique;

  for (const w of unique) {
    const out = join(outDir, `${base}-${w}.webp`);
    if (existsSync(out) && statSync(out).mtimeMs > statSync(file).mtimeMs) continue;
    await sharp(file, { failOn: 'none' })
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: /\.png$/i.test(file) ? 88 : 78, effort: 5 })
      .toFile(out);
  }
  console.log(`${src} → ${unique.join(', ')}`);
}

// Immagine per le anteprime social (1200 × 630, JPEG per la massima compatibilità)
await sharp(join(sourceDir, 'rustic-patio-with-deck-furniture-vegetation.jpg'), { failOn: 'none' })
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(root, 'public/og.jpg'));

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${Object.keys(manifest).length} immagini, manifest in lib/images/manifest.json`);
