'use client';

import { useCallback, useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

type ImageLightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

export function ImageLightbox({ isOpen, onClose, src, alt }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);

  const handleClose = useCallback(() => {
    setScale(1);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ingrandisci immagine"
    >
      <div className="absolute top-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setScale((s) => Math.max(0.5, s - 0.25)); }}
          className="rounded-lg p-1.5 text-white hover:bg-white/20"
          aria-label="Riduci"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <span className="min-w-[4rem] text-center text-sm text-white">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setScale((s) => Math.min(3, s + 0.25)); }}
          className="rounded-lg p-1.5 text-white hover:bg-white/20"
          aria-label="Ingrandisci"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setScale(1); }}
          className="rounded-lg p-1.5 text-white hover:bg-white/20"
          aria-label="Dimensione normale"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 rounded-lg p-2 text-white hover:bg-white/20 z-10"
        aria-label="Chiudi"
      >
        <X className="h-8 w-8" />
      </button>

      <div className="mt-16 flex-1 w-full overflow-auto flex items-start justify-center min-h-0">
        <div
          className="inline-block origin-top"
          style={{ transform: `scale(${scale})` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-w-none rounded-lg shadow-2xl"
            style={{ maxHeight: '80vh', width: 'auto' }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
