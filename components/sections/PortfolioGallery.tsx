'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: {
      it: 'Villa Medicea del XVIII Secolo',
      en: '18th Century Medici Villa',
      de: 'Medici-Villa aus dem 18. Jahrhundert',
    },
    category: 'historical',
    image: '/stunning-spring-collage.jpg',
    location: 'Firenze',
  },
  {
    id: 2,
    title: {
      it: 'Residenza Moderna sul Mare',
      en: 'Modern Seaside Residence',
      de: 'Moderne Residenz am Meer',
    },
    category: 'residential',
    image: '/rustic-patio-with-deck-furniture-vegetation.jpg',
    location: 'Castiglioncello',
  },
  {
    id: 3,
    title: {
      it: 'Parco Urbano Pubblico',
      en: 'Public Urban Park',
      de: 'Öffentlicher Stadtpark',
    },
    category: 'commercial',
    image: '/green-park-view.jpg',
    location: 'Livorno',
  },
  {
    id: 4,
    title: {
      it: 'Tenuta Vinicola d\'Eccellenza',
      en: 'Excellence Wine Estate',
      de: 'Exzellentes Weingut',
    },
    category: 'commercial',
    image: '/grassland-landscape-greening-environment-park-background.jpg',
    location: 'Bolgheri',
  },
  {
    id: 5,
    title: {
      it: 'Giardino Segreto nel Centro Storico',
      en: 'Secret Garden in the Historic Center',
      de: 'Geheimer Garten im historischen Zentrum',
    },
    category: 'residential',
    image: '/spring-nature-outdoors-backgrounds-fresh.jpg',
    location: 'Lucca',
  },
  {
    id: 6,
    title: {
      it: 'Resort di Lusso Isola d\'Elba',
      en: 'Luxury Resort Elba Island',
      de: 'Luxusresort Insel Elba',
    },
    category: 'commercial',
    image: '/stunning-spring-collage.jpg',
    location: 'Portoferraio',
  },
];

export function PortfolioGallery() {
  const t = (useTranslations as any)('portfolio');
  const locale = useLocale();
  
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'residential', label: t('categories.residential') },
    { id: 'commercial', label: t('categories.commercial') },
    { id: 'historical', label: t('categories.historical') },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section className="py-24 bg-[#F2F4F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={cn(
                "px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-md",
                filter === cat.id
                  ? "bg-deep-teal text-white shadow-deep-teal/20 scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:text-deep-teal"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full"
              >
                {/* Image Container */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={(project.title as any)[locale] || (project.title as any).it}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/90 via-deep-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div>
                        <span className="text-copper font-bold text-sm uppercase tracking-widest mb-2 block">
                          {project.location}
                        </span>
                        <h3 className="text-white text-2xl font-serif font-bold leading-tight">
                          {(project.title as any)[locale] || (project.title as any).it}
                        </h3>
                      </div>
                      <div className="p-3 bg-white rounded-full text-deep-teal hover:bg-copper hover:text-white transition-colors">
                        <ExternalLink className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content for non-hover (mobile/tablet) */}
                <div className="p-6 md:hidden">
                  <span className="text-copper font-bold text-xs uppercase tracking-widest mb-1 block">
                    {project.location}
                  </span>
                  <h3 className="text-deep-teal text-xl font-serif font-bold">
                    {(project.title as any)[locale] || (project.title as any).it}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
