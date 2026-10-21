'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Maximize2 } from 'lucide-react';
import { Section, SectionIntro } from '@/components/site/Section';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

const INFOGRAPHICS = [
  { src: '/infographic-subgarden-1.png', altKey: 'alt_1' },
  { src: '/infographic-subgarden-2.png', altKey: 'alt_2' },
  { src: '/infographic-subgarden-3.png', altKey: 'alt_3' },
] as const;

/*
 * Le tre tavole create per SUBGarden (pagina Tecnologia): si aprono ingrandite per
 * leggerle. Il link #infographic-3 (usato altrove nel sito) apre direttamente la terza.
 */
export function InfographicSection() {
  const t = useTranslations('technologyPage');
  const ti = useTranslations('infographic');
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== '#infographic-3') return;
      const img = INFOGRAPHICS[2];
      setOpen({ src: img.src, alt: ti(img.altKey) });
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [ti]);

  return (
    <Section id="infographic" tone="alt" className="relative">
      <span id="infographic-3" aria-hidden className="absolute -top-20 left-0" />
      <SectionIntro eyebrow={t('infographics_eyebrow')} title={t('infographics_title')} lead={t('infographics_lead')} />
      <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
        {INFOGRAPHICS.map((img) => {
          const alt = ti(img.altKey);
          return (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setOpen({ src: img.src, alt })}
                aria-label={t('infographics_open', { alt })}
                className="group block w-full text-left"
              >
                <span className="rounded-media relative block aspect-[1024/571] bg-surface">
                  <Image src={img.src} alt="" fill sizes="(min-width: 48rem) 33vw, 100vw" className="object-cover" />
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-surface/90 text-brand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <Maximize2 className="size-4" />
                  </span>
                </span>
                <span aria-hidden className="type-small mt-3 block text-ink-muted">
                  {alt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {open && <ImageLightbox isOpen onClose={() => setOpen(null)} src={open.src} alt={open.alt} />}
    </Section>
  );
}
