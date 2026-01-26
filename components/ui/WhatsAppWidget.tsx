'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const WhatsAppWidget = () => {
  const t = (useTranslations as any)('whatsapp');
  const phoneNumber = '393714379979'; // Format: CountryCodePhoneNumber
  const message = 'Salve, vorrei ricevere informazioni sui sistemi SUBGarden.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-shadow hover:shadow-[0_0_20px_rgba(37,211,102,0.6)]"
      aria-label={t('aria_label')}
    >
      <MessageCircle className="h-8 w-8 fill-current" />
      <span className="absolute -right-1 -top-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex h-4 w-4 rounded-full bg-white/20"></span>
      </span>
    </motion.a>
  );
};
