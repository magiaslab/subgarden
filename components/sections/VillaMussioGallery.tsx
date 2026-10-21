'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

/*
 * Villa Mussio, le foto vere del lavoro in ordine: dal terreno lavorato visto dal drone
 * al prato finito. Griglia regolare (la prima foto più grande), ogni foto apre la
 * lightbox (la prima occupa due colonne e due righe). Il testo alternativo è anche la didascalia.
 */
const PHOTOS = [
  { src: '/villa-mussio/DJI_0204.JPG', key: 'gallery_1', wide: true },
  { src: '/villa-mussio/DJI_0206.JPG', key: 'gallery_2' },
  { src: '/villa-mussio/GTXT3302.JPG', key: 'gallery_3' },
  { src: '/villa-mussio/DJI_0444.JPG', key: 'gallery_4' },
  { src: '/villa-mussio/immagine 2026-02-25 205437.png', key: 'gallery_5' },
  { src: '/villa-mussio/20210914_090702.jpg', key: 'gallery_6' },
  { src: '/villa-mussio/20210703_092846.jpg', key: 'gallery_7' },
  { src: '/villa-mussio/20210621_103402.jpg', key: 'gallery_8' },
  { src: '/villa-mussio/20220902_173535.jpg', key: 'gallery_9' },
] as const;

export function VillaMussioGallery({ className }: { className?: string }) {
  const t = useTranslations('aboutPage');
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className={className}>
      <h3 className="type-h3 text-ink">{t('gallery_villa_mussio')}</h3>
      <p className="type-body mt-2 text-ink-muted">{t('gallery_lead')}</p>
      <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {PHOTOS.map((p, i) => {
          const alt = t(p.key);
          const wide = 'wide' in p && p.wide;
          return (
            <li key={p.src} className={cn('flex flex-col', wide && 'sm:col-span-2 lg:row-span-2')}>
              <button
                type="button"
                onClick={() => setOpen({ src: p.src, alt })}
                aria-label={t('gallery_open', { alt })}
                className="group flex w-full flex-1 flex-col text-left"
              >
                <span className={cn('rounded-media relative block bg-surface', wide ? 'aspect-4/3 lg:aspect-auto lg:min-h-80 lg:flex-1' : 'aspect-4/3')}>
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes={wide ? '(min-width: 64rem) 66vw, 100vw' : '(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw'}
                    className="object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-surface/90 text-brand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <Maximize2 className="size-4" />
                  </span>
                </span>
                <span aria-hidden className="type-small mt-3 flex gap-3 text-ink-muted">
                  <span className="type-ui text-ink">{String(i + 1).padStart(2, '0')}</span>
                  {alt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {open && <ImageLightbox isOpen onClose={() => setOpen(null)} src={open.src} alt={open.alt} />}
    </div>
  );
}
