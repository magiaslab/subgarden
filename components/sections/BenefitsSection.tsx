'use client';

import { motion } from 'framer-motion';
import { Droplets, Wrench, Leaf, Gauge, Zap, ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';

export function BenefitsSection() {
  const t = (useTranslations as any)('benefits');

  return (
    <section id="vantaggi" className="py-24 bg-[#F2F4F7] overflow-hidden">
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Risparmio idrico */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="h-full rounded-3xl bg-white p-8 md:p-10 shadow-xl border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-deep-teal/5 rounded-full -mr-24 -mt-24 blur-3xl" />
              <div className="relative flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-deep-teal/10 flex items-center justify-center text-deep-teal">
                  <Droplets className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-deep-teal">
                    {t('water_title')}
                  </h3>
                  <p className="mt-2 text-lg text-gray-600 leading-relaxed">
                    {t('water_lead')}
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {['water_1', 'water_2', 'water_3'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#infographic-3"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-deep-teal hover:text-copper transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                {t('view_infographic')}
              </a>
            </div>
          </motion.div>

          {/* Semplicità di montaggio */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="h-full rounded-3xl bg-white p-8 md:p-10 shadow-xl border border-gray-100 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-copper/10 rounded-full -ml-24 -mb-24 blur-3xl" />
              <div className="relative flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-copper/10 flex items-center justify-center text-copper">
                  <Wrench className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-deep-teal">
                    {t('install_title')}
                  </h3>
                  <p className="mt-2 text-lg text-gray-600 leading-relaxed">
                    {t('install_lead')}
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {['install_1', 'install_2', 'install_3'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/tecnologia"
                  className="inline-flex items-center gap-2 text-copper font-semibold hover:text-deep-teal transition-colors"
                >
                  {t('install_cta')}
                  <Gauge className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
