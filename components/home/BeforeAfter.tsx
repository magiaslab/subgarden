'use client';

import { useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Section, SectionIntro } from '@/components/site/Section';
import { cn } from '@/lib/utils/cn';

const BEFORE = '/Gemini_Generated_Image_ydrfelydrfelydrf.png';
const AFTER = '/Gemini_Generated_Image_ljy601ljy601ljy6.png';
const ROWS = ['water_eff', 'mosquito', 'furniture', 'aesthetic', 'maintenance'] as const;

/*
 * Prima e dopo con le illustrazioni create per SUBGarden, poi la tabella di confronto
 * completa (testo vero, leggibile anche dagli assistenti AI).
 * Il cursore è un role="slider" disegnato da noi (niente controlli di sistema): si
 * trascina col puntatore e si sposta con le frecce, Pag su/giù, Inizio e Fine.
 */
export function BeforeAfter() {
  const t = useTranslations('home');
  const tc = useTranslations('comparison');
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromPointer = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === 'PageUp' || e.key === 'PageDown' ? 10 : 2;
    const next =
      e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'PageDown'
        ? pos - step
        : e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'PageUp'
          ? pos + step
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    setPos(Math.max(0, Math.min(100, next)));
  };

  return (
    <Section tone="surface">
      <SectionIntro eyebrow={t('compare_eyebrow')} title={t('compare_title')} />

      <div
        ref={frame}
        className="rounded-media relative mt-12 aspect-4/3 touch-pan-y select-none bg-surface-alt sm:aspect-16/9 lg:mt-16"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image src={BEFORE} alt={tc('before_alt')} fill sizes="(min-width: 80rem) 1200px, 100vw" className="object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={AFTER} alt={tc('after_alt')} fill sizes="(min-width: 80rem) 1200px, 100vw" className="object-cover" draggable={false} />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/65 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-2 gap-6 p-5 text-ink-inverse sm:p-8">
          <div className={cn('transition-opacity', pos < 20 && 'opacity-0')}>
            <p className="type-eyebrow text-ink-inverse/80">{tc('before_label')}</p>
            <p className="type-h3 mt-1">{tc('before_title')}</p>
            <p className="type-small mt-1 hidden text-ink-inverse/85 sm:block">{tc('before_text')}</p>
          </div>
          <div className={cn('text-right transition-opacity', pos > 80 && 'opacity-0')}>
            <p className="type-eyebrow text-ink-inverse/80">{tc('after_label')}</p>
            <p className="type-h3 mt-1">{tc('after_title')}</p>
            <p className="type-small mt-1 hidden text-ink-inverse/85 sm:block">{tc('after_text')}</p>
          </div>
        </div>

        <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-ink-inverse" style={{ left: `${pos}%` }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label={tc('slider_label')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${tc('before_label')} ${Math.round(pos)}%`}
            onKeyDown={onKey}
            className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-ink-inverse text-brand-strong shadow-lg"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-14 overflow-x-auto lg:mt-20">
        <table className="type-body w-full min-w-[34rem] border-collapse text-left">
          <caption className="type-h3 mb-6 text-left text-ink">{tc('title')}</caption>
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="type-ui py-3 pr-4 text-ink-muted">{tc('feature')}</th>
              <th scope="col" className="type-ui py-3 pr-4 text-ink-muted">{tc('rain')}</th>
              <th scope="col" className="type-ui py-3 text-brand">{tc('subgarden')}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row} className="border-b border-line/60">
                <th scope="row" className="py-4 pr-4 font-semibold text-ink">{tc(`${row}_label`)}</th>
                <td className="py-4 pr-4 text-ink-muted">{tc(`rain_${row}`)}</td>
                <td className="py-4 font-medium text-brand">{tc(`subgarden_${row}`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
