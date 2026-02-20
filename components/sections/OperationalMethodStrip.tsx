'use client';

import { motion } from 'framer-motion';
import { MapPin, Ruler, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';

const steps = [
  { icon: MapPin, key: 'step1' },
  { icon: Ruler, key: 'step2' },
  { icon: Wrench, key: 'step3' },
] as const;

export function OperationalMethodStrip() {
  const t = (useTranslations as any)('operationalStrip');

  return (
    <section className="py-20 bg-deep-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif font-bold text-center mb-14"
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-white/30" />
                )}
                <div className="relative inline-flex w-20 h-20 rounded-2xl bg-white/10 border border-white/20 items-center justify-center mb-6">
                  <Icon className="w-9 h-9 text-copper" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-copper text-deep-teal font-bold text-sm flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {t(`${step.key}_title`)}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {t(`${step.key}_desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/tecnologia"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-copper text-white font-semibold hover:bg-copper/90 transition-colors"
          >
            {t('cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
