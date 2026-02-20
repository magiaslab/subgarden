'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const rows = [
  { key: 'water_eff', subgarden: 'check' },
  { key: 'mosquito', subgarden: 'check' },
  { key: 'furniture', subgarden: 'check' },
  { key: 'aesthetic', subgarden: 'check' },
  { key: 'maintenance', subgarden: 'check' },
] as const;

export function ComparisonTableSection() {
  const t = (useTranslations as any)('comparison');

  return (
    <section className="py-20 bg-[#F2F4F7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif font-bold text-deep-teal text-center mb-12"
        >
          {t('title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
        >
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[28%]" />
              <col className="w-[36%]" />
              <col className="w-[36%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="p-4 font-semibold text-gray-700">{t('feature')}</th>
                <th className="p-4 font-semibold text-gray-600">{t('rain')}</th>
                <th className="p-4 font-semibold text-deep-teal">{t('subgarden')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="p-4 text-gray-700 font-medium align-top">
                    {t(`${row.key}_label`)}
                  </td>
                  <td className="p-4 text-gray-500 text-sm align-top">
                    <span className="inline-flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      {t(`rain_${row.key}`)}
                    </span>
                  </td>
                  <td className="p-4 text-deep-teal text-sm align-top">
                    <span className="inline-flex items-center gap-2">
                      <Check className="w-5 h-5 text-deep-teal flex-shrink-0" />
                      {t(`subgarden_${row.key}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
