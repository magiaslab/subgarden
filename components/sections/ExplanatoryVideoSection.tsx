'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const videoUrl = process.env.NEXT_PUBLIC_EXPLANATORY_VIDEO_URL;

export function ExplanatoryVideoSection() {
  const t = (useTranslations as any)('explanatoryVideo');

  if (!videoUrl?.trim()) return null;

  return (
    <section className="py-16 bg-gray-50/80 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-serif font-bold text-deep-teal text-center mb-10"
        >
          {t('title')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden bg-black shadow-xl aspect-video"
        >
          <video
            controls
            playsInline
            className="w-full h-full object-contain"
            poster={process.env.NEXT_PUBLIC_EXPLANATORY_VIDEO_POSTER_URL || undefined}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}
