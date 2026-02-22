#!/usr/bin/env node
/**
 * Genera favicon e icon per Next.js dal logo SUBGarden.
 * Esegui: npm run generate-favicon
 * Richiede: sharp e to-ico (devDependencies)
 */

import sharp from 'sharp';
import { createRequire } from 'module';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const toIco = require('to-ico');

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const appDir = join(root, 'app');

// Logo da usare (preferisci colori per favicon riconoscibile)
const logoPath = join(publicDir, 'SUBGARDEN - LOGO COLORI.png');
if (!existsSync(logoPath)) {
  console.error('Logo non trovato:', logoPath);
  process.exit(1);
}

async function main() {
  const sizes = [
    { name: 'icon.png', size: 32 },
    { name: 'apple-icon.png', size: 180 },
  ];

  const image = sharp(logoPath);
  const meta = await image.metadata();
  const w = meta.width || 1;
  const h = meta.height || 1;
  const side = Math.min(w, h);
  const left = Math.floor((w - side) / 2);
  const top = Math.floor((h - side) / 2);

  // Ritaglio quadrato al centro del logo, poi resize
  const square = image.extract({ left, top, width: side, height: side });

  for (const { name, size } of sizes) {
    const outPath = join(appDir, name);
    await square.clone().resize(size, size).png().toFile(outPath);
    console.log('Scritto:', outPath);
  }

  // favicon.ico (multisize 16, 32, 48 - richiesti da to-ico)
  const icoSizes = [16, 32, 48];
  const buffers = await Promise.all(
    icoSizes.map((s) => square.clone().resize(s, s).png().toBuffer())
  );
  const ico = await toIco(buffers);
  const icoPath = join(appDir, 'favicon.ico');
  writeFileSync(icoPath, ico);
  console.log('Scritto:', icoPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
