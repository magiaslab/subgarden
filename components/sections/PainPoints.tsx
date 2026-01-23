'use client';

import { motion } from 'framer-motion';
import { Droplet, Sun, DollarSign, Clock, VolumeX, Sofa, Wind } from 'lucide-react';
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
    icon: Sun,
    key: 'weeds',
    color: 'text-orange-500',
    image: '/stunning-spring-collage.jpg',
  },
];

export function PainPoints() {
  const t = (useTranslations as any)('painPoints');

  return (
    <section id="about" className="py-20 bg-white">
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
                <Card className="h-full">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={point.image}
                      alt={t(`${point.key}.title`)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center ${point.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{t(`${point.key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{t(`${point.key}.description`)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
