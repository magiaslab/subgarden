'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/Button';

/*
 * Consenso ai cookie: due scelte di pari peso (solo necessari / accetta), la scelta
 * resta in localStorage e AnalyticsScript aggiorna il Consent Mode v2. Chiudere senza
 * scegliere lascia tutto negato e il banner torna alla visita successiva.
 * Niente animazione d'ingresso: compare dopo un attimo, per non coprire l'LCP.
 */
export function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem('cookie-consent');
    } catch {}
    if (consent) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const choose = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem('cookie-consent', value);
    } catch {}
    window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      aria-labelledby="cookie-title"
      data-no-motion
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="container-site !px-0">
        <div className="relative border border-line bg-surface-raised p-5 pr-14 shadow-[0_12px_40px_rgb(28_36_32/0.18)] sm:p-6 sm:pr-16 lg:flex lg:items-center lg:gap-10">
          <div className="lg:flex-1">
            <h2 id="cookie-title" className="type-h3 text-ink">{t('title')}</h2>
            <p className="type-small mt-2 max-w-3xl text-ink-muted">
              {t('description')}{' '}
              <Link href="/privacy" className="text-brand underline underline-offset-4">
                {t('privacy_link')}
              </Link>
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Button variant="secondary" size="sm" onClick={() => choose('declined')}>
              {t('decline')}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => choose('accepted')}>
              {t('accept')}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label={t('close')}
            className="absolute right-2 top-2 inline-flex size-11 items-center justify-center text-ink-muted hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
