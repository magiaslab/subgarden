'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Image from 'next/image';

const specifications = [
  {
    category: 'Efficienza Idrica',
    items: [
      'Risparmio idrico fino al 60% rispetto all\'irrigazione tradizionale a pioggia',
      'Distribuzione uniforme dell\'acqua direttamente alle radici, eliminando sprechi',
      'Riduzione dell\'evaporazione del 90% e zero ruscellamento',
      'Ottimizzazione automatica basata su umidità del terreno e condizioni meteo',
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  },
  {
    category: 'Installazione Professionale',
    items: [
      'Sistema modulare adattabile a qualsiasi tipo di giardino o terreno',
      'Installazione non invasiva, compatibile con giardini esistenti',
      'Team di esperti certificati per installazione su misura',
      'Progettazione personalizzata in base alle esigenze specifiche',
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    category: 'Controllo Intelligente',
    items: [
      'Sistema automatizzato con sensori IoT per monitoraggio in tempo reale',
      'Manutenzione minima richiesta: controlli automatici e allarmi preventivi',
      'App mobile per controllo remoto e programmazione personalizzata',
      'Integrazione con sistemi domotici e assistenti vocali',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    category: 'Sostenibilità Ambientale',
    items: [
      'Riduzione dell\'impatto ambientale e dell\'impronta idrica',
      'Supporto per fertilizzanti liquidi a rilascio controllato',
      'Compatibile con sistemi di riciclo dell\'acqua e raccolta pioggia',
      'Certificazioni ambientali e conformità alle normative regionali',
    ],
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
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
