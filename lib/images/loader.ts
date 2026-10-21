
import manifest from './manifest.json';
import { variantBase, variantPath } from './variant';

/*
 * Loader di next/image: invece dell'ottimizzazione di Vercel (a pagamento a ogni
 * trasformazione) serve le varianti WebP preparate una volta da
 * scripts/prepara-immagini.mjs. Sceglie la più piccola che copre la larghezza chiesta,
 * senza superare quelle che esistono per quell'immagine (manifest.json).
 * Le immagini che non sono nel manifest (SVG, esterne) passano così come sono.
 */
const available = manifest as Record<string, number[]>;

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (!src.startsWith('/') || src.startsWith('/img/')) return src;
  const widths = available[variantBase(src)];
  if (!widths?.length) return src;
  const chosen = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return variantPath(src, chosen);
}

