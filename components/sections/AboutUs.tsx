'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import { History, Heart, Lightbulb, ArrowRight } from 'lucide-react';

export function AboutUs() {
  const t = (useTranslations as any)('about');
  const tHero = (useTranslations as any)('hero');

  const milestones = [
    {
      icon: History,
      year: '1990',
      label: t('milestone_1990'),
    },
    {
      icon: Heart,
      year: 'Restauro',
      label: t('milestone_villa'),
    },
    {
      icon: Lightbulb,
      year: 'Brevetto',
      label: t('milestone_patent'),
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#F2F4F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-copper mb-3">
            {t('title')}
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-deep-teal mb-6">
            {t('subtitle')}
          </h3>
          <div className="w-20 h-1.5 bg-copper mx-auto"></div>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for Founder Image */}
              <div className="absolute inset-0 bg-stone-grey/20 flex items-center justify-center">
                <p className="text-stone-grey font-medium italic">[Immagine Fausto Favilli]</p>
              </div>
              <Image
                src="/rustic-patio-with-deck-furniture-vegetation.jpg" // Temporaneo
                alt="Fausto Favilli - Founder"
                fill
                className="object-cover opacity-40 mix-blend-multiply"
              />
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-copper/10 rounded-full -z-10 blur-3xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-3xl font-serif font-bold text-deep-teal mb-6">
              {t('story_title')}
            </h4>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{t('story_text')}</p>
              <div className="flex items-center gap-4 py-4 border-y border-gray-100">
                <div className="w-12 h-12 rounded-full bg-deep-teal/10 flex items-center justify-center">
                  <Heart className="text-copper w-6 h-6" />
                </div>
                <p className="font-serif font-bold text-deep-teal italic">
                  &quot;Accompagnare la natura nel suo ritorno alla semplicità.&quot;
                </p>
              </div>
              <div className="pt-4">
                <Link 
                  href="/chi-siamo"
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white px-8 py-4 text-lg shadow-sm hover:shadow-md"
                >
                  {t('discover_more')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-2"
          >
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for Philosophy Image */}
              <div className="absolute inset-0 bg-deep-teal/10 flex items-center justify-center">
                <p className="text-deep-teal font-medium italic">[Immagine Giardino Empatico]</p>
              </div>
              <Image
                src="/green-park-view.jpg" // Temporaneo
                alt="Il Giardino Empatico"
                fill
                className="object-cover opacity-30 mix-blend-multiply"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-1"
          >
            <h4 className="text-3xl font-serif font-bold text-deep-teal mb-6">
              {t('philosophy_title')}
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {t('philosophy_text')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="border-white/50">
                  <CardContent className="p-6 text-center">
                    <milestone.icon className="w-8 h-8 text-copper mx-auto mb-3" />
                    <p className="text-xs font-bold text-deep-teal/40 uppercase tracking-tighter mb-1">
                      {milestone.year}
                    </p>
                    <p className="text-sm font-medium text-gray-800 leading-tight">
                      {milestone.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
