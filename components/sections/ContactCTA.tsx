'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function ContactCTA() {
  const t = (useTranslations as any)('cta');

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-deep-teal rounded-[3rem] p-12 md:p-20 overflow-hidden text-center text-white shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-copper/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8"
            >
              <MessageCircle className="w-4 h-4 text-copper" />
              <span className="text-sm font-bold uppercase tracking-widest text-white/80">
                {t('badge')}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              {t('title')}
            </h2>
            
            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/contatti"
                className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-copper text-white hover:bg-copper/90 px-8 py-4 text-lg shadow-md hover:shadow-lg min-w-[240px] group"
              >
                {t('button')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="tel:+393714379979" 
                className="text-white hover:text-copper transition-colors font-serif font-bold text-xl flex items-center gap-2"
              >
                {t('call_us')} +39 371 4379979
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
