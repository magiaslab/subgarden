'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { Section, SectionIntro } from '@/components/site/Section';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

const VIDEO = process.env.NEXT_PUBLIC_EXPLANATORY_VIDEO_URL;
const POSTER = process.env.NEXT_PUBLIC_EXPLANATORY_VIDEO_POSTER_URL;
const INFOGRAPHICS = [
  { src: '/infographic-subgarden-1.png', altKey: 'alt_1' },
  { src: '/infographic-subgarden-2.png', altKey: 'alt_2' },
  { src: '/infographic-subgarden-3.png', altKey: 'alt_3' },
] as const;

/*
 * Il sistema in sintesi: il video di un minuto (se configurato) e le tre infografiche
 * create per SUBGarden, che si aprono ingrandite per leggerle.
 */
export function Synthesis() {
  const t = useTranslations('home');
  const ti = useTranslations('infographic');
  const tv = useTranslations('explanatoryVideo');
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  return (
    <Section tone="alt">
      <SectionIntro eyebrow={t('synthesis_eyebrow')} title={ti('title')} lead={ti('caption')} />

      {VIDEO?.trim() && (
        <figure className="mt-12 lg:mt-16">
          <div className="rounded-media relative aspect-video bg-surface-inverse">
            <video controls playsInline preload="none" poster={POSTER || undefined} className="size-full object-contain">
              <source src={VIDEO} type="video/mp4" />
            </video>
          </div>
          <figcaption className="type-small mt-3 text-ink-muted">{tv('title')}</figcaption>
        </figure>
      )}

      <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
        {INFOGRAPHICS.map((img) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setOpen({ src: img.src, alt: ti(img.altKey) })}
              className="group block w-full text-left"
            >
              <span className="rounded-media relative block aspect-[1024/571] bg-surface">
                <Image src={img.src} alt={ti(img.altKey)} fill sizes="(min-width: 48rem) 33vw, 100vw" className="object-cover" />
                <span aria-hidden className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-surface/90 text-brand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
              </span>
              <span className="type-small mt-3 block text-ink-muted">{ti(img.altKey)}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="type-small mt-6 text-ink-muted">{ti('click_to_enlarge')}</p>

      {open && <ImageLightbox isOpen onClose={() => setOpen(null)} src={open.src} alt={open.alt} />}
    </Section>
  );
}
