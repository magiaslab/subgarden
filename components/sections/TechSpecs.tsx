'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { BrandName } from '@/components/ui/BrandName';
import Image from 'next/image';

const specifications = [
  {
    category: 'Installazione Brevettata',
    items: [
      'Sistema unico per giardini esistenti senza scavi invasivi',
      'Metodo non distruttivo che preserva il manto erboso',
      'Installazione rapida e pulita, invisibile dopo il montaggio',
      'Garanzia di integrità per radici e arredi fissi preesistenti',
    ],
    image: '/grassland-landscape-greening-environment-park-background.jpg',
  },
  {
    category: 'Tecnologia Rain Bird XSF®',
    items: [
      'Ala gocciolante auto-compensante da 0.4 a 3.6 atm',
      'Sistema brevettato auto-pulente ad ogni ciclo',
      'Protezione antintrusione radicale certificata',
      'Bassa pressione e portata (1,6 l/h): nessun sistema di pompaggio invasivo',
    ],
    image: '/spring-nature-outdoors-backgrounds-fresh.jpg',
  },
  {
    category: 'Efficienza e Risparmio',
    items: [
      'Risparmio idrico certificato dal 50% al 70%',
      'Distribuzione per capillarità: lenta, uniforme e senza sprechi',
      'Possibilità di fertirrigazione senza contatto con prodotti chimici',
      'Riduzione del 90% delle malattie del prato e delle piante',
    ],
    image: '/green-park-view.jpg',
  },
  {
    category: 'Ingegneria di Griglia',
    items: [
      'Schema interrato con spaziatura tra linee di 300 mm',
      'Valvole di spurgo aria su ogni zona irrigua',
      'Sistema di filtraggio e riduzione pressione post-valvola',
      'Lavaggio tubazioni semplificato senza attivazione gocciolatori',
    ],
    image: '/stunning-spring-collage.jpg',
  },
];

export function TechSpecs() {
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
            Specifiche Tecniche
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            Caratteristiche e vantaggi del sistema <BrandName />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full p-0 overflow-hidden group">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={spec.image}
                    alt={spec.category}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/90 via-deep-teal/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-copper transition-colors duration-300">
                      {spec.category}
                    </h3>
                    <div className="w-12 h-1 bg-copper rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                  </div>
                </div>
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {spec.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-4 group/item">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-copper/10 flex items-center justify-center group-hover/item:bg-copper transition-colors duration-300">
                          <CheckCircle2 className="w-3 h-3 text-copper group-hover/item:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-gray-700 leading-relaxed font-medium group-hover/item:text-deep-teal transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
