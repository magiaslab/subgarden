'use client';

import { motion } from 'framer-motion';
import { Droplet, Zap, DollarSign, Clock, VolumeX, Sofa, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const painPoints = [
  {
    icon: Droplet,
    key: 'water',
    color: 'text-blue-500',
    image: '/spring-nature-outdoors-backgrounds-fresh.jpg',
  },
  {
    icon: Wind,
    key: 'mosquitoes',
    color: 'text-yellow-500',
    image: '/grassland-landscape-greening-environment-park-background.jpg',
  },
  {
    icon: Sofa,
    key: 'furniture',
    color: 'text-green-500',
    image: '/rustic-patio-with-deck-furniture-vegetation.jpg',
  },
  {
    icon: VolumeX,
    key: 'noise',
    color: 'text-purple-500',
    image: '/stunning-spring-collage.jpg',
  },
  {
    icon: Droplet,
    key: 'puddles',
    color: 'text-cyan-500',
    image: '/green-park-view.jpg',
  },
  {
    icon: Zap,
    key: 'installation',
    color: 'text-orange-500',
    image: '/stunning-spring-collage.jpg',
  },
];

export function PainPoints() {
  const t = (useTranslations as any)('painPoints');

  return (
    <section className="py-20 bg-[#F2F4F7]">
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full p-0 overflow-hidden group">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={point.image}
                      alt={t(`${point.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/80 via-transparent to-transparent opacity-60" />
                    <div className={`absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center ${point.color} transform -rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-deep-teal mb-3 group-hover:text-copper transition-colors duration-300">
                      {t(`${point.key}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`${point.key}.description`)}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
