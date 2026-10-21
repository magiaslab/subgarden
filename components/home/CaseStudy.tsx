import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionIntro } from '@/components/site/Section';

/*
 * Il caso Villa Mussio con le foto vere del cantiere, in ordine: dal terreno lavorato
 * al prato finito. Da lg la sezione si blocca e la striscia scorre di lato
 * (data-horizontal + data-track, ScrollMotion); sotto lg scorre col dito, nativa.
 */
const PHOTOS = [
  { src: '/villa-mussio/DJI_0204.JPG', key: 'case_1', ratio: 'aspect-3/2' },
  { src: '/villa-mussio/DJI_0205.JPG', key: 'case_2', ratio: 'aspect-3/2' },
  { src: '/villa-mussio/DJI_0444.JPG', key: 'case_3', ratio: 'aspect-3/2' },
  { src: '/villa-mussio/20210914_090508.jpg', key: 'case_4', ratio: 'aspect-3/4' },
  { src: '/villa-mussio/20210914_090312.jpg', key: 'case_5', ratio: 'aspect-3/2' },
  { src: '/villa-mussio/20210703_092846.jpg', key: 'case_6', ratio: 'aspect-3/2' },
] as const;

export function CaseStudy() {
  const t = useTranslations('home');
  return (
    <section data-horizontal className="overflow-hidden bg-surface-inverse py-16 text-ink-inverse lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-20">
      <div className="container-site">
        <SectionIntro inverse eyebrow={t('case_eyebrow')} title={t('case_title')} lead={t('case_lead')} />
      </div>
      <ol
        data-track
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:mt-14 lg:gap-8 lg:snap-none lg:px-10"
        tabIndex={0}
        aria-label={t('case_title')}
      >
        {PHOTOS.map((p, i) => (
          <li key={p.src} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-auto">
            <figure>
              <div className={`rounded-media relative ${p.ratio} bg-prato-900 lg:h-[56vh] lg:aspect-auto ${p.ratio === 'aspect-3/4' ? 'lg:w-[42vh]' : 'lg:w-[84vh]'}`}>
                <Image src={p.src} alt={t(p.key)} fill sizes="(min-width: 64rem) 60vw, 82vw" className="object-cover" />
              </div>
              <figcaption className="type-small mt-4 flex gap-3 text-ink-inverse/85">
                <span className="type-ui text-ink-inverse">{String(i + 1).padStart(2, '0')}</span>
                {t(p.key)}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}
