'use client';

import { motion } from 'framer-motion';
import { Droplet, Sun, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Image from 'next/image';

const painPoints = [
  {
    icon: Droplet,
    title: 'Spreco d\'Acqua Massiccio',
    description: 'L\'irrigazione tradizionale a pioggia disperde fino al 50-70% dell\'acqua per evaporazione, ruscellamento e vento. In estate, questo spreco aumenta drasticamente.',
    color: 'text-blue-500',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  },
  {
    icon: Sun,
    title: 'Crescita Irregolare e Zone Secche',
    description: 'Le zone più lontane dall\'irrigatore ricevono meno acqua, creando aree secche e zone allagate. Il risultato? Un giardino con macchie gialle e crescita disomogenea.',
    color: 'text-yellow-500',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
  },
  {
    icon: DollarSign,
    title: 'Costi Operativi Elevati',
    description: 'Consumi idrici alti, bollette salate e manutenzione frequente di irrigatori e tubi aumentano i costi operativi del giardino del 40-60% rispetto alla subirrigazione.',
    color: 'text-green-500',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
  {
    icon: Clock,
    title: 'Tempo e Manutenzione Continua',
    description: 'Controlli manuali costanti, regolazioni frequenti degli irrigatori, pulizia di filtri e riparazioni richiedono tempo e attenzione continua che potresti dedicare ad altro.',
    color: 'text-purple-500',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
];

export function PainPoints() {
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
            Problemi dell'Irrigazione Tradizionale
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scopri come la subirrigazione risolve i problemi comuni dei sistemi di irrigazione tradizionali
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={point.image}
                      alt={point.title}
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
                    <CardTitle className="text-xl">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{point.description}</p>
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
