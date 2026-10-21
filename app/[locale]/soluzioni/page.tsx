import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section, SectionIntro } from '@/components/site/Section';
import { DripLine } from '@/components/site/DripLine';
import { ButtonLink } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import { solutions } from '@/lib/solutions';
import { alternates, pick } from '@/lib/utils/metadata';

const TITLE: Record<string, string> = {
  it: 'Subirrigazione per giardini, parchi, campi sportivi e hotel',
  en: 'Subsurface irrigation for gardens, parks, sports fields and hotels',
  de: 'Unterflurbewässerung für Gärten, Parks, Sportplätze und Hotels',
};
const DESCRIPTION: Record<string, string> = {
  it: 'Giardini privati, parchi pubblici, campi sportivi e strutture turistiche: come cambia la subirrigazione SUBGarden in ciascun caso e quanto si risparmia.',
  en: 'Private gardens, public parks, sports fields and hospitality: how SUBGarden subsurface irrigation adapts to each case and how much it saves.',
  de: 'Privatgärten, öffentliche Parks, Sportplätze und Hotels: Wie sich die SUBGarden Unterflurbewässerung jeweils anpasst und wie viel sie spart.',
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
    alternates: alternates('/soluzioni', locale),
  };
}

/*
 * Indice delle soluzioni: le quattro come blocchi editoriali, foto grande e testo
 * alternati, tutto il blocco è il link. Poi i tre passi del lavoro sulla linea
 * gocciolante, in fascia scura.
 */
export default async function SoluzioniIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('solutionsPage');
  const tn = await getTranslations('nav');
  const ts = await getTranslations('operationalStrip');
  const lang = locale as 'it' | 'en' | 'de';

  return (
    <>
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          lead={t('lead')}
          image={{ src: '/rustic-patio-with-deck-furniture-vegetation.jpg' }}
        >
          <ButtonLink href="/contatti" size="lg">
            {tn('cta')}
          </ButtonLink>
        </PageHero>

        <Section tone="surface">
          <SectionIntro eyebrow={t('list_eyebrow')} title={t('list_title')} />
          <ol className="mt-12 space-y-16 lg:mt-20 lg:space-y-24">
            {solutions.map((s, i) => {
              const title = s.title[lang] ?? s.title.it;
              return (
                <li key={s.slug}>
                  <Link
                    href={{ pathname: '/soluzioni/[slug]', params: { slug: s.slug } }}
                    className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12"
                  >
                    <figure
                      className={`rounded-media relative aspect-4/3 bg-surface-alt lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2 lg:col-start-6' : ''}`}
                    >
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="(min-width: 64rem) 58vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                      />
                    </figure>
                    <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : ''}`}>
                      <p aria-hidden className="type-eyebrow text-brand">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="type-h2 mt-3 text-ink transition-colors group-hover:text-brand">{title}</h3>
                      <p className="type-lead mt-5 text-ink-muted">{s.description[lang] ?? s.description.it}</p>
                      <span aria-hidden className="mt-8 inline-flex size-11 items-center justify-center rounded-full border border-brand text-brand transition-colors group-hover:bg-brand group-hover:text-ink-inverse">
                        <ArrowUpRight className="size-5" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Section>

        <Section tone="inverse">
          <SectionIntro inverse eyebrow={t('method_eyebrow')} title={ts('title')} />
          <DripLine inverse drops={18} className="mt-12 lg:mt-16" />
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <p className="type-eyebrow text-ink-inverse/80">0{i}</p>
                <h3 className="type-h3 mt-2 text-ink-inverse">{ts(`step${i}_title`)}</h3>
                <p className="type-body mt-2 text-ink-inverse/85">{ts(`step${i}_desc`)}</p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/tecnologia" variant="inverse" className="mt-12">
            {t('tech_link')}
          </ButtonLink>
        </Section>
      </main>
      <Footer />
    </>
  );
}
