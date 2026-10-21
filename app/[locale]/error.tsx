'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button, ButtonLink } from '@/components/ui/Button';

/* Errore inatteso: frase chiara, riprova e ritorno alla home. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errorPage');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="contenuto" data-no-motion className="bg-surface-alt">
      <div className="container-site flex min-h-[80svh] flex-col justify-center py-24">
        <h1 className="type-h1 max-w-[16ch] text-ink">{t('err_title')}</h1>
        <p className="type-lead mt-6 max-w-2xl text-ink-muted">{t('err_body')}</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button onClick={reset} variant="secondary" size="lg">
            {t('err_retry')}
          </Button>
          <ButtonLink href="/" variant="ghost">
            {t('err_home')}
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
