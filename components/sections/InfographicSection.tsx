'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function InfographicSection() {
  const t = (useTranslations as any)('infographic');

  return (
    <section className="py-24 bg-white overflow-hidden">
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
          <div className="w-24 h-1.5 bg-copper mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#F2F4F7]"
        >
          <Image
            src="/infograficasubgarden.png"
            alt="Infografica SUBGarden - Innovazione nella Subirrigazione Sostenibile"
            fill
            className="object-contain bg-[#F2F4F7]"
            priority
          />
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 italic text-lg">
            {t('caption')}
          </p>
        </div>
      </div>
    </section>
  );
}
