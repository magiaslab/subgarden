'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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
      'Emettitori interrati con passo preciso di 330 mm',
    ],
    image: '/spring-nature-outdoors-backgrounds-fresh.jpg',
  },
  {
    category: 'Efficienza e Risparmio',
    items: [
      'Risparmio idrico certificato dal 50% al 70%',
      'Eliminazione totale dell\'evaporazione superficiale',
      'Riduzione del 90% delle malattie del prato e delle piante',
      'Distribuzione minerali ottimale senza cristallizzazione',
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
    <section className="py-20 bg-gray-50">
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Caratteristiche e vantaggi del sistema SUBGarden
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
              <Card className="h-full overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={spec.image}
                    alt={spec.category}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/80 to-transparent" />
                  <CardTitle className="absolute bottom-4 left-4 right-4 text-2xl text-white">
                    {spec.category}
                  </CardTitle>
                </div>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {spec.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
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
