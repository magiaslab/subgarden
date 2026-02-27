'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

const GALLERY_IMAGES = [
  { src: '/villa-mussio/DJI_0205.JPG', alt: 'Villa Mussio parco vista aerea' },
  { src: '/villa-mussio/20210914_090508.jpg', alt: 'Villa Mussio giardino' },
  { src: '/villa-mussio/20220902_173535.jpg', alt: 'Villa Mussio verde' },
  { src: '/villa-mussio/20210703_092814.jpg', alt: 'Villa Mussio restauro' },
  { src: '/villa-mussio/GTXT3302.JPG', alt: 'Villa Mussio dettaglio' },
  { src: '/villa-mussio/DJI_0444.JPG', alt: 'Villa Mussio paesaggio' },
] as const;

type GalleryCaptionProps = {
  caption: string;
};

export function VillaMussioGallery({ caption }: GalleryCaptionProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-widest text-copper mb-4">
        {caption}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {GALLERY_IMAGES.map((img) => (
          <button
            key={img.src}
            type="button"
            className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group text-left focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2"
            onClick={() => setLightbox({ src: img.src, alt: img.alt })}
            aria-label={img.alt}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      {lightbox && (
        <ImageLightbox
          isOpen={!!lightbox}
          onClose={() => setLightbox(null)}
          src={lightbox.src}
          alt={lightbox.alt}
        />
      )}
    </>
  );
}
