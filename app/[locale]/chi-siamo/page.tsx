import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section, SectionIntro } from '@/components/site/Section';
import { DripLine } from '@/components/site/DripLine';
import { ButtonLink } from '@/components/ui/Button';
import { VillaMussioGallery } from '@/components/sections/VillaMussioGallery';
import { alternates, pick } from '@/lib/utils/metadata';

const TITLE: Record<string, string> = {
  it: 'Chi siamo: dal 1990 tra piante e giardini',
  en: 'About us: plants and gardens since 1990',
  de: 'Über uns: seit 1990 bei Pflanzen und Gärten',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return {
    title: pick(TITLE, locale),
    alternates: alternates('/chi-siamo', locale),
  };
}

const MILESTONES = [
  { when: 'milestone_1_when', text: 'milestone_1990' },
  { when: 'milestone_2_when', text: 'milestone_patent' },
  { when: 'milestone_3_when', text: 'milestone_villa' },
] as const;

const PHILOSOPHY_PHOTOS = [
  { src: '/villa-mussio/20210914_090312.jpg', alt: 'philosophy_photo_1' },
  { src: '/villa-mussio/20210703_092804.jpg', alt: 'philosophy_photo_2' },
  { src: '/villa-mussio/DJI_0203.JPG', alt: 'philosophy_photo_3' },
] as const;

const FACTS = ['years', 'invasive', 'patent'] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('aboutPage');
  const ta = await getTranslations('about');
  const tn = await getTranslations('nav');

  return (
    <>
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('hero_eyebrow')}
          title={t('hero_title')}
          lead={t('hero_lead')}
          image={{ src: '/villa-mussio/20210914_090508.jpg', alt: t('hero_image_alt') }}
          breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('about') }]}
        >
          <ButtonLink href="/contatti" size="lg">
            {tn('cta')}
          </ButtonLink>
        </PageHero>

        {/* Le radici: 1990, la storia in prima persona */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <figure className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-media relative aspect-4/5 bg-surface-alt">
                <Image
                  src="/villa-mussio/20210703_085226.jpg"
                  alt={t('roots_image_alt')}
                  fill
                  sizes="(min-width: 64rem) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div>
              <SectionIntro eyebrow={t('roots_eyebrow')} title={t('roots_title')} />
              <p className="type-lead mt-6 max-w-prose text-ink">{t('roots_text')}</p>
              <blockquote className="mt-10 border-l-2 border-cta pl-6">
                <p className="type-h3 max-w-prose text-brand">«{t('roots_quote')}»</p>
              </blockquote>
              <p className="type-body mt-10 max-w-prose text-ink-muted">{t('roots_ancient_text')}</p>

              <h3 className="type-eyebrow mt-14 text-brand">{t('milestones_label')}</h3>
              <DripLine drops={12} className="mt-5" />
              <ol className="mt-6 grid gap-6 sm:grid-cols-3">
                {MILESTONES.map((m) => (
                  <li key={m.when} className="border-l border-line pl-4">
                    <p className="type-h3 text-ink">{t(m.when)}</p>
                    <p className="type-small mt-2 text-ink-muted">{ta(m.text)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        {/* Il metodo: paesaggio prestato e giardino empatico */}
        <Section tone="inverse">
          <SectionIntro inverse eyebrow={t('philosophy_eyebrow')} title={t('philosophy_expanded_title')} />
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-12 lg:gap-16">
            <p className="type-body max-w-prose text-ink-inverse/85">{t('philosophy_expanded_text1')}</p>
            <p className="type-body max-w-prose text-ink-inverse/85">{t('philosophy_expanded_text2')}</p>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
            {PHILOSOPHY_PHOTOS.map((p) => (
              <li key={p.src}>
                <figure>
                  <div className="rounded-media relative aspect-4/3 bg-brand">
                    <Image src={p.src} alt={t(p.alt)} fill sizes="(min-width: 48rem) 33vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="type-small mt-3 text-ink-inverse/85">{t(p.alt)}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>

        {/* Un lavoro: il parco del Settecento e la galleria di Villa Mussio */}
        <Section tone="alt">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <SectionIntro eyebrow={t('case_eyebrow')} title={t('case_history_title')} />
            <div>
              <p className="type-lead max-w-prose text-ink">{t('case_history_text')}</p>
              <p className="type-body mt-6 max-w-prose border-l-2 border-cta pl-6 text-ink-muted">{t('case_history_focus')}</p>
            </div>
          </div>
          <VillaMussioGallery className="mt-16 lg:mt-24" />
        </Section>

        {/* SUBGarden: l'impianto che non si vede, tre fatti */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <SectionIntro eyebrow={t('innovation_eyebrow')} title={t('innovation_title')} />
            <p className="type-lead max-w-prose text-ink-muted">{t('innovation_text')}</p>
          </div>
          <DripLine drops={20} className="mt-14 lg:mt-20" />
          <dl className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f} className="flex flex-col border-l border-line pl-5">
                <dt className="type-body order-2 mt-3 text-ink-muted">{t(`fact_${f}_label`)}</dt>
                <dd className="type-data order-1 text-brand">{t(`fact_${f}_value`)}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>
      <Footer />
    </>
  );
}
