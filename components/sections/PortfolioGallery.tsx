'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

/*
 * Galleria dei lavori: filtro a pulsanti (aria-pressed, niente controlli di sistema) e
 * un elenco di foto con luogo e titolo sotto, sempre visibili. Il movimento d'ingresso
 * lo fa ScrollMotion; il filtro cambia l'elenco senza animazioni.
 * La pagina è fuori dall'indice finché i lavori non sono quelli veri.
 */
const projects = [
  {
    id: 1,
    title: {
      it: 'Villa medicea del XVIII secolo',
      en: '18th Century Medici Villa',
      de: 'Medici-Villa aus dem 18. Jahrhundert',
    },
    category: 'historical',
    image: '/stunning-spring-collage.jpg',
    location: 'Firenze',
  },
  {
    id: 2,
    title: {
      it: 'Residenza moderna sul mare',
      en: 'Modern Seaside Residence',
      de: 'Moderne Residenz am Meer',
    },
    category: 'residential',
    image: '/rustic-patio-with-deck-furniture-vegetation.jpg',
    location: 'Castiglioncello',
  },
  {
    id: 3,
    title: {
      it: 'Parco urbano pubblico',
      en: 'Public Urban Park',
      de: 'Öffentlicher Stadtpark',
    },
    category: 'commercial',
    image: '/green-park-view.jpg',
    location: 'Livorno',
  },
  {
    id: 4,
    title: {
      it: 'Tenuta vinicola',
      en: 'Wine estate',
      de: 'Weingut',
    },
    category: 'commercial',
    image: '/grassland-landscape-greening-environment-park-background.jpg',
    location: 'Bolgheri',
  },
  {
    id: 5,
    title: {
      it: 'Giardino nel centro storico',
      en: 'Garden in the historic centre',
      de: 'Garten im historischen Zentrum',
    },
    category: 'residential',
    image: '/spring-nature-outdoors-backgrounds-fresh.jpg',
    location: 'Lucca',
  },
  {
    id: 6,
    title: {
      it: 'Resort all\'Isola d\'Elba',
      en: 'Resort on Elba Island',
      de: 'Resort auf der Insel Elba',
    },
    category: 'commercial',
    image: '/stunning-spring-collage.jpg',
    location: 'Portoferraio',
  },
];

type Lang = 'it' | 'en' | 'de';
const CATEGORIES = ['all', 'residential', 'commercial', 'historical'] as const;

export function PortfolioGallery() {
  const t = useTranslations('portfolio');
  const locale = useLocale() as Lang;
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('all');
  const shown = projects.filter((p) => filter === 'all' || p.category === filter);

  return (
    <>
      <div role="group" aria-label={t('filter_label')} className="flex flex-wrap gap-3">
        {CATEGORIES.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={cn(
              'type-ui min-h-11 rounded-[var(--radius-control)] border px-5 transition-colors',
              filter === id
                ? 'border-brand bg-brand text-ink-inverse'
                : 'border-line-strong text-ink hover:border-brand hover:text-brand',
            )}
          >
            {t(`categories.${id}`)}
          </button>
        ))}
      </div>

      <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3" aria-live="polite">
        {shown.map((project) => (
          <li key={project.id}>
            <figure>
              <div className="rounded-media relative aspect-4/5 bg-surface-alt">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5 border-t border-line pt-4">
                <p className="type-eyebrow text-brand">{project.location}</p>
                <p className="type-h3 mt-2 text-ink">{project.title[locale] ?? project.title.it}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
