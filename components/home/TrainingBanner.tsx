import { useTranslations } from 'next-intl';
import { Section } from '@/components/site/Section';
import { ButtonLink } from '@/components/ui/Button';

/*
 * Banner del corso installatori: una fascia verde dentro la pagina, non un'altra
 * sezione di vendita. Chi cerca un impianto lo salta in un attimo, chi vuole
 * imparare il mestiere trova la porta.
 */
export function TrainingBanner() {
  const t = useTranslations('training.banner');
  return (
    <Section tone="surface" className="py-12 md:py-16 lg:py-20">
      <aside
        aria-labelledby="banner-formazione"
        className="rounded-media grid gap-8 bg-brand p-8 text-ink-inverse sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:p-14"
      >
        <div className="max-w-2xl">
          <p className="type-eyebrow flex items-center gap-3 text-ink-inverse/80">
            <span aria-hidden className="inline-block h-px w-8 bg-cta" />
            {t('eyebrow')}
          </p>
          <h2 id="banner-formazione" className="type-h2 mt-4 text-ink-inverse">
            {t('title')}
          </h2>
          <p className="type-lead mt-4 text-ink-inverse/85">{t('text')}</p>
        </div>
        <ButtonLink href="/formazione" size="lg" className="justify-self-start">
          {t('cta')}
        </ButtonLink>
      </aside>
    </Section>
  );
}
