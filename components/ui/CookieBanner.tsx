'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner = () => {
  const t = (useTranslations as any)('cookie');
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border border-gray-100 md:p-8">
              {/* Luxury Background Detail */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-deep-teal/5 blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-copper/5 blur-3xl" />

              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div className="flex flex-1 gap-4">
                  <div className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-deep-teal/10 text-deep-teal md:flex">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-deep-teal">
                      {t('title')}
                    </h3>
                    <p className="max-w-3xl text-sm leading-relaxed text-gray-600">
                      {t('description')}{' '}
                      <Link
                        href={`/${locale}/privacy`}
                        className="font-medium text-copper underline decoration-copper/30 transition-colors hover:text-deep-teal hover:decoration-deep-teal"
                      >
                        {t('privacy_link')}
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
                  <button
                    onClick={handleDecline}
                    className="flex-1 whitespace-nowrap rounded-xl px-6 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 sm:flex-none"
                  >
                    {t('decline')}
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 whitespace-nowrap rounded-xl bg-deep-teal px-8 py-3 text-sm font-medium text-white shadow-lg shadow-deep-teal/20 transition-all hover:bg-deep-teal/90 hover:shadow-xl sm:flex-none"
                  >
                    {t('accept')}
                  </button>
                </div>

                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600 md:static md:ml-4"
                  aria-label="Chiudi"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
