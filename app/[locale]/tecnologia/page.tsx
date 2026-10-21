import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section, SectionIntro } from '@/components/site/Section';
import { SoilSection, type SoilLegendItem } from '@/components/site/SoilSection';
import { DripLine } from '@/components/site/DripLine';
import { ButtonLink } from '@/components/ui/Button';
import { InfographicSection } from '@/components/sections/InfographicSection';
import { TechnologyVideoSection } from '@/components/sections/TechnologyVideoSection';
import { alternates, pick } from '@/lib/utils/metadata';

const TITLE: Record<string, string> = {
  it: 'Tecnologia Rain Bird XFS: come funziona la subirrigazione',
  en: 'Rain Bird XFS technology: how subsurface irrigation works',
  de: 'Rain Bird XFS Technik: So funktioniert Unterflurbewässerung',
};
const DESCRIPTION: Record<string, string> = {
  it: 'Ala gocciolante Rain Bird XFS posata sotto il prato a griglia 300 × 330 mm: l’acqua va alle radici per capillarità, senza evaporazione e senza ruscellamento.',
  en: 'Rain Bird XFS dripline laid under the lawn in a 300 × 330 mm grid: water reaches the roots by capillarity, with no evaporation and no runoff.',
  de: 'Rain Bird XFS Tropfleitung im Raster 300 × 330 mm unter dem Rasen verlegt: Das Wasser erreicht die Wurzeln durch Kapillarwirkung, ohne Verdunstung und ohne Abfluss.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return {
    title: pick(TITLE, locale),
    description: pick(DESCRIPTION, locale),
    alternates: alternates('/tecnologia', locale),
  };
}

const SPECS = ['flow', 'pressure', 'grid', 'efficiency', 'saving'] as const;
const FEATURES = [1, 2, 3, 4, 5, 6] as const;
const STEPS = [1, 2, 3, 4, 5] as const;
const TABLE_ROWS = ['maintenance', 'uniformity', 'efficiency', 'surface'] as const;
const TABLE_COLS = ['subgarden', 'ollas', 'sprinkler'] as const;

export default async function TecnologiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('technologyPage');
  const tp = await getTranslations('process');
  const tn = await getTranslations('nav');

  const legend = [1, 2, 3, 4].map((i) => ({
    label: t(`soil_${i}_label`),
    text: t(`soil_${i}_text`),
  })) as [SoilLegendItem, SoilLegendItem, SoilLegendItem, SoilLegendItem];

  return (
    <>
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('hero_eyebrow')}
          title={t('hero_title')}
          lead={t('hero_lead')}
          image={{ src: '/grassland-landscape-greening-environment-park-background.jpg' }}
          breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('technology') }]}
        >
          <ButtonLink href="/contatti" size="lg">
            {tn('cta')}
          </ButtonLink>
        </PageHero>

        {/* Lo spaccato del terreno, in versione approfondita */}
        <Section tone="raised">
          <SectionIntro eyebrow={t('soil_eyebrow')} title={t('soil_title')} lead={t('soil_lead')} />
          <SoilSection
            className="mt-12 lg:mt-16"
            title={t('soil_figure')}
            legend={legend}
            spacingLabel={t('soil_spacing')}
          />
        </Section>

        {/* Scheda tecnica Rain Bird XFS: numeri grandi sulla linea gocciolante */}
        <Section>
          <SectionIntro eyebrow={t('specs_eyebrow')} title={t('specs_title')} lead={t('specs_lead')} />
          <DripLine drops={20} className="mt-12 lg:mt-16" />
          <dl className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {SPECS.map((key) => (
              <div key={key} className="flex flex-col border-l border-line pl-5">
                <dt className="type-ui order-2 mt-3 text-ink">{t(`spec_${key}_label`)}</dt>
                <dd className="type-data order-1 whitespace-nowrap text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] text-brand">{t(`spec_${key}_value`)}</dd>
                <dd className="type-body order-3 mt-1 text-ink-muted">{t(`spec_${key}_note`)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 border-t border-line pt-10 lg:mt-20">
            <h3 className="type-h3 text-ink">{t('features_title')}</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((i) => (
                <li key={i} className="type-body flex gap-3 text-ink">
                  <span aria-hidden className="mt-[0.55em] block size-[7px] shrink-0 rounded-full bg-water" />
                  {t(`feature_${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* La posa: metodo brevettato, fertirrigazione, manutenzione */}
        <Section tone="alt">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionIntro eyebrow={t('install_eyebrow')} title={t('install_title')} />
              <p className="type-body mt-6 max-w-prose text-ink-muted">{t('install_text')}</p>
              <p className="type-body mt-4 max-w-prose text-ink-muted">{t('install_text_2')}</p>
            </div>
            <figure>
              <div className="rounded-media relative aspect-[960/524] bg-surface">
                <Image
                  src="/Gemini_Generated_Image_reiwdqreiwdqreiw (1).png"
                  alt={t('install_image_alt')}
                  fill
                  sizes="(min-width: 64rem) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </Section>

        {/* Il principio antico e il confronto fra metodi */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <figure className="lg:order-2">
              <div className="rounded-media relative aspect-[960/524] bg-surface-alt">
                <Image
                  src="/Gemini_Generated_Image_reiwdqreiwdqreiw (3).png"
                  alt={t('evolution_image_alt')}
                  fill
                  sizes="(min-width: 64rem) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="lg:order-1">
              <SectionIntro eyebrow={t('evolution_eyebrow')} title={t('evolution_title')} />
              <p className="type-body mt-6 max-w-prose text-ink-muted">{t('evolution_text')}</p>
            </div>
          </div>

          <div className="mt-16 lg:mt-24">
            <h3 id="confronto" className="type-h3 text-ink">
              {t('comparison_table_title')}
            </h3>
            <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-labelledby="confronto">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="type-ui py-4 pr-6 text-ink-muted">
                      {t('table_method')}
                    </th>
                    {TABLE_COLS.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className={col === 'subgarden' ? 'type-ui bg-surface-raised px-4 py-4 text-brand' : 'type-ui px-4 py-4 text-ink'}
                      >
                        {t(`method_${col}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row) => (
                    <tr key={row} className="border-b border-line">
                      <th scope="row" className="type-ui py-4 pr-6 align-top text-ink">
                        {t(`table_${row}`)}
                      </th>
                      {TABLE_COLS.map((col) => (
                        <td
                          key={col}
                          className={
                            col === 'subgarden'
                              ? 'type-body bg-surface-raised px-4 py-4 align-top font-semibold text-ink'
                              : 'type-body px-4 py-4 align-top text-ink-muted'
                          }
                        >
                          {t(`${col}_${row}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <InfographicSection />
        <TechnologyVideoSection />

        {/* Metodo di lavoro: cinque fasi numerate, allineate a sinistra */}
        <Section>
          <SectionIntro eyebrow={t('method_eyebrow')} title={t('method_title')} />
          <ol className="mt-12 border-t border-line lg:mt-16">
            {STEPS.map((step) => (
              <li
                key={step}
                className="grid gap-x-8 gap-y-3 border-b border-line py-8 md:grid-cols-[8rem_1fr_1.4fr] md:items-baseline lg:py-10"
              >
                <p className="type-data text-brand" aria-hidden>
                  {String(step).padStart(2, '0')}
                </p>
                <h3 className="type-h3 text-ink">
                  <span className="sr-only">
                    {t('step_label')} {step}:{' '}
                  </span>
                  {tp(`step${step}`)}
                </h3>
                <p className="type-body max-w-prose text-ink-muted">{tp(`step${step}_desc`)}</p>
              </li>
            ))}
          </ol>
        </Section>
      </main>
      <Footer />
    </>
  );
}
