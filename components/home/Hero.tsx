'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { ButtonLink, buttonStyles } from '@/components/ui/Button';

const VIDEO = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/hero-bg.mp4';

/*
 * Hero della home: video a tutto schermo con velatura verde scura, promessa nell'H1,
 * un solo invito (il sopralluogo) e il link al «come funziona».
 * - Il video è decorativo ma in loop: ha un pulsante pausa (si ricorda la scelta).
 * - Con «riduci movimento» il video non parte da solo: resta il fotogramma.
 * - È l'LCP: nessuna animazione d'ingresso (data-no-motion).
 */
export function Hero() {
  const t = useTranslations('home');
  const th = useTranslations('hero');
  const tn = useTranslations('nav');
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    let paused = false;
    try {
      paused = localStorage.getItem('hero-video') === 'paused';
    } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced) return;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play().then(() => setPlaying(true));
      try {
        localStorage.removeItem('hero-video');
      } catch {}
    } else {
      v.pause();
      setPlaying(false);
      try {
        localStorage.setItem('hero-video', 'paused');
      } catch {}
    }
  };

  return (
    <section data-no-motion className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-surface-inverse text-ink-inverse">
      <Image src="/img/hero-poster-1920.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/img/hero-poster-960.webp"
        aria-hidden
        className="absolute inset-0 -z-10 size-full object-cover"
      >
        <source src={VIDEO} type="video/mp4" />
      </video>
      {/* Velatura: più scura in basso, dove sta il testo; in alto quanto basta per l'header */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_61_50/0.55)_0%,rgb(31_61_50/0.15)_35%,rgb(20_40_32/0.78)_78%,rgb(20_40_32/0.9)_100%)]" />

      <div className="container-site pb-14 pt-32 lg:pb-20">
        <p className="type-eyebrow mb-6 flex items-center gap-3 text-ink-inverse/85">
          <span aria-hidden className="inline-block h-px w-8 bg-cta" />
          {t('eyebrow')}
        </p>
        <h1 className="type-display max-w-[14ch] text-ink-inverse">{th('kicker')}</h1>
        <p className="type-lead mt-6 max-w-2xl text-ink-inverse/90">{t('lead')}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contatti" size="lg">
            {tn('cta')}
          </ButtonLink>
          <a href="#come-funziona" className={buttonStyles({ variant: 'inverse', size: 'lg' })}>
            {t('cta_how')}
          </a>
        </div>
        <div className="mt-14 flex items-center justify-between gap-6 border-t border-ink-inverse/25 pt-6">
          <p className="type-small flex items-center gap-3 text-ink-inverse/85">
            {t('partner')}
            <span className="relative block h-6 w-20">
              <Image src="/RainBirdLogo_330x100.png" alt="" fill sizes="100px" className="object-contain object-left brightness-0 invert" />
            </span>
          </p>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={!playing}
            aria-label={playing ? t('video_pause') : t('video_play')}
            className="inline-flex size-11 items-center justify-center rounded-full border border-ink-inverse/50 text-ink-inverse transition-colors hover:bg-ink-inverse hover:text-brand-strong"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
