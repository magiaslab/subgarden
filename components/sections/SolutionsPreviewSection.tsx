'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { solutions } from '@/lib/solutions';
import { Card } from '@/components/ui/Card';

export function SolutionsPreviewSection() {
  const t = (useTranslations as any)('solutionsPreview');
  const locale = useLocale() as 'it' | 'en' | 'de';

  return (
    <section id="soluzioni" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-teal mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            {t('subtitle')}
          </p>
          <Link
            href="/soluzioni"
            className="inline-flex items-center gap-2 text-copper font-semibold hover:text-deep-teal transition-colors"
          >
            {t('view_all')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={{ pathname: '/soluzioni/[slug]', params: { slug: solution.slug } }}
              >
                <Card className="h-full overflow-hidden cursor-pointer group p-0 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-52 w-full">
                    <Image
                      src={solution.image}
                      alt={solution.title[locale] || solution.title.it}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-deep-teal mb-2 group-hover:text-copper transition-colors">
                      {solution.title[locale] || solution.title.it}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                      {solution.description[locale] || solution.description.it}
                    </p>
                    <span className="inline-flex items-center gap-2 text-copper font-medium text-sm">
                      {t('discover')}
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
