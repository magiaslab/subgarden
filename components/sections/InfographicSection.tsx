'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ImageLightbox } from '@/components/ui/ImageLightbox';
import { Expand } from 'lucide-react';

const infographicImages = [
  { src: '/infographic-subgarden-1.png', altKey: 'alt_1' },
  { src: '/infographic-subgarden-2.png', altKey: 'alt_2' },
  { src: '/infographic-subgarden-3.png', altKey: 'alt_3' },
];

export function InfographicSection() {
  const t = (useTranslations as any)('infographic');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      if (hash === '#infographic-3') {
        const img = infographicImages[2];
        setLightbox({ src: img.src, alt: t(img.altKey) || 'Infografica SUBGarden 3' });
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [t]);

  const openLightbox = (src: string, altKey: string) => {
    setLightbox({ src, alt: t(altKey) || src });
  };

  return (
    <section id="infographic" className="py-24 bg-white overflow-hidden relative">
      <span id="infographic-3" className="absolute -top-20 left-0" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-copper mb-3">
            {t('subtitle')}
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-deep-teal mb-6">
            {t('title')}
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto mb-4">
            {t('click_to_enlarge')}
          </p>
          <div className="w-24 h-1.5 bg-copper mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infographicImages.map((img, index) => (
            <motion.button
              key={img.src}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(img.src, img.altKey)}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#F2F4F7] bg-[#F2F4F7] text-left hover:shadow-deep-teal/20 hover:border-deep-teal/30 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-deep-teal/30"
            >
              <Image
                src={img.src}
                alt={t(img.altKey) || `Infografica SUBGarden ${index + 1}`}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-deep-teal text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="h-5 w-5" />
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 italic text-lg">
            {t('caption')}
          </p>
        </div>
      </div>

      {lightbox && (
        <ImageLightbox
          isOpen={!!lightbox}
          onClose={() => setLightbox(null)}
          src={lightbox.src}
          alt={lightbox.alt}
        />
      )}
    </section>
  );
}
