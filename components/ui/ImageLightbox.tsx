'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import imageLoader from '@/lib/images/loader';

type ImageLightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

/*
 * Immagine ingrandita (le infografiche si leggono solo così). Dialog modale: blocca la
 * pagina e Lenis (data-scroll-locked), focus sul pulsante Chiudi, Esc chiude e il
 * focus torna dove era. Lo zoom serve a leggere i testi piccoli.
 */
export function ImageLightbox({ isOpen, onClose, src, alt }: ImageLightboxProps) {
  const t = useTranslations('lightbox');
  const [scale, setScale] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setScale(1);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.setAttribute('data-scroll-locked', '');
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.removeAttribute('data-scroll-locked');
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const control =
    'inline-flex size-11 items-center justify-center text-ink-inverse transition-colors hover:bg-ink-inverse/15';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      data-lenis-prevent
      className="fixed inset-0 z-[200] flex flex-col bg-[rgb(20_30_26/0.96)]"
      onClick={close}
    >
      <div className="flex items-center justify-between gap-4 p-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center border border-ink-inverse/25">
          <button type="button" className={control} onClick={() => setScale((s) => Math.max(0.5, s - 0.25))} aria-label={t('zoom_out')}>
            <ZoomOut className="size-5" />
          </button>
          <span className="type-small min-w-14 text-center text-ink-inverse" aria-live="polite">
            {Math.round(scale * 100)}%
          </span>
          <button type="button" className={control} onClick={() => setScale((s) => Math.min(3, s + 0.25))} aria-label={t('zoom_in')}>
            <ZoomIn className="size-5" />
          </button>
          <button type="button" className={control} onClick={() => setScale(1)} aria-label={t('reset')}>
            <Maximize2 className="size-5" />
          </button>
        </div>
        <button ref={closeRef} type="button" className={control} onClick={close} aria-label={t('close')}>
          <X className="size-6" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto p-4">
        <div className="origin-top" style={{ transform: `scale(${scale})` }} onClick={(e) => e.stopPropagation()}>
          {/* eslint-disable-next-line @next/next/no-img-element -- variante già preparata, dimensione libera per lo zoom */}
          <img
            src={imageLoader({ src, width: 1920 })}
            alt={alt}
            className="max-h-[82vh] w-auto max-w-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
