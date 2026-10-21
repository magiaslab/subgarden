// Nome dei file preparati da scripts/prepara-immagini.mjs. Condiviso fra lo script
// (che li scrive) e il loader di next/image (che li chiede): se cambia uno, cambia l'altro.

/** Larghezze preparate per ogni immagine (mai oltre l'originale). */
export const WIDTHS = [480, 960, 1440, 1920] as const;

/** "/villa-mussio/DJI_0444.JPG" → "villa-mussio-dji-0444" */
export function variantBase(src: string): string {
  return decodeURIComponent(src)
    .replace(/^\/+/, '')
    .replace(/\.[a-z0-9]+$/i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function variantPath(src: string, width: number): string {
  return `/img/${variantBase(src)}-${width}.webp`;
}
