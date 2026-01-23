'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function PartnerBanner() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Technology Partner
            </p>
            <h3 className="text-2xl font-serif font-bold text-deep-teal">
              Sviluppato con Tecnologia Rain Bird®
            </h3>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-64 h-20"
          >
            <Image
              src="/RainBirdLogo_330x100.png"
              alt="Rain Bird Logo"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
