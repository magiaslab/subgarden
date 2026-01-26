'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const t = useTranslations();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <section className="py-20 bg-[#F2F4F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-teal mb-4">
            Prima e Dopo
          </h2>
          <p className="text-xl text-gray-600">
            Confronta l&apos;efficacia della subirrigazione rispetto all&apos;irrigazione tradizionale
          </p>
        </motion.div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div
            className="relative h-[500px] cursor-col-resize"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* Before Image */}
            <div className="absolute inset-0">
              <Image
                src="/Gemini_Generated_Image_ljy601ljy601ljy6.png"
                alt="Disagio con irrigazione tradizionale a pioggia"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">Irrigazione Tradizionale</h3>
                  <p className="text-lg md:text-xl">Superfici bagnate, arredi inutilizzabili, disturbo costante</p>
                </div>
              </div>
            </div>

            {/* After Image */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="/Gemini_Generated_Image_ydrfelydrfelydrf.png"
                alt="Comfort con subirrigazione SUBGarden"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">Subirrigazione SUBGarden</h3>
                  <p className="text-lg md:text-xl">Superficie asciutta, comfort totale, acqua solo dove serve</p>
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-gray-400 rounded" />
                  <div className="w-1 h-4 bg-gray-400 rounded" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg">
              Prima
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg">
              Dopo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
