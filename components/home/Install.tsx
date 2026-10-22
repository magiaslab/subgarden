import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Section, SectionIntro } from '@/components/site/Section';

/*
 * La posa: perché si può fare in un giardino già fatto (a sinistra il testo, a destra
 * il prato vero a lavoro finito), poi i tre passi del metodo sulla linea gocciolante.
 */
export function Install() {
  const t = useTranslations('home');
  const tb = useTranslations('benefits');
  const ts = useTranslations('operationalStrip');
  return (
    <Section tone="surface">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
          <SectionIntro eyebrow={t('install_eyebrow')} title={t('install_title')} lead={tb('install_lead')} />
          <ul className="mt-8 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="type-body grid grid-cols-[1.25rem_1fr] gap-3 text-ink">
                <span aria-hidden className="mt-2.5 block size-2 rounded-full bg-cta" />
                {tb(`install_${i}`)}
              </li>
            ))}
          </ul>
        </div>
        <figure className="rounded-media relative aspect-4/5 bg-surface-alt lg:aspect-auto lg:h-full lg:min-h-[32rem]">
          <Image
            src="/villa-mussio/20210914_090702.jpg"
            alt={t('install_photo')}
            fill
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>

      <div className="mt-20 lg:mt-28">
        <h3 className="type-h3 text-ink">{t('method_title')}</h3>
        <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
          {[1, 2, 3].map((i) => (
            <li key={i} className="relative border-t border-line pt-6">
              <span aria-hidden className="absolute left-0 top-0 block size-[9px] -translate-y-1/2 rounded-full bg-water" />
              <p className="type-eyebrow text-brand">0{i}</p>
              <p className="type-h3 mt-2 text-ink">{ts(`step${i}_title`)}</p>
              <p className="type-body mt-2 text-ink-muted">{ts(`step${i}_desc`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
