import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section, SectionIntro } from '@/components/site/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import { alternates, pick } from '@/lib/utils/metadata';

const cities = [
  {
    slug: 'elba',
    name: {
      it: 'Isola d\'Elba',
      en: 'Elba Island',
      de: 'Elba-Insel',
    },
    description: {
      it: 'Soluzioni specifiche per il clima costiero e i terreni dell\'isola.',
      en: 'Specific solutions for the coastal climate and island soils.',
      de: 'Spezifische Lösungen für das Küstenklima und die Inselböden.',
    },
    image: '/stunning-spring-collage.jpg',
  },
  {
    slug: 'maremma',
    name: {
      it: 'Maremma',
      en: 'Maremma',
      de: 'Maremma',
    },
    description: {
      it: 'Efficienza idrica massima per i grandi parchi della Toscana meridionale.',
      en: 'Maximum water efficiency for the large parks of southern Tuscany.',
      de: 'Maximale Wassereffizienz für die großen Parks der Südtoskana.',
    },
    image: '/grassland-landscape-greening-environment-park-background.jpg',
  },
  {
    slug: 'livorno',
    name: {
      it: 'Livorno',
      en: 'Livorno',
      de: 'Livorno',
    },
    description: {
      it: 'Sistemi invisibili per il verde urbano e le residenze della costa.',
      en: 'Invisible systems for urban greenery and coastal residences.',
      de: 'Unsichtbare Systeme für städtisches Grün und Küstenresidenzen.',
    },
    image: '/green-park-view.jpg',
  },
];

const TITLE: Record<string, string> = {
  it: 'Dove lavoriamo in Toscana: Elba, Maremma, Livorno',
  en: 'Where we work in Tuscany: Elba, Maremma, Livorno',
  de: 'Wo wir in der Toskana arbeiten: Elba, Maremma, Livorno',
};
const DESCRIPTION: Record<string, string> = {
  it: 'Subirrigazione sulla costa toscana: Isola d’Elba, Maremma, Livorno e San Vincenzo, dove l’estate è lunga e l’acqua va risparmiata.',
  en: 'Subsurface irrigation on the Tuscan coast: Elba, Maremma, Livorno and San Vincenzo, where summers are long and water must be saved.',
  de: 'Unterflurbewässerung an der toskanischen Küste: Elba, Maremma, Livorno und San Vincenzo, wo die Sommer lang sind und Wasser gespart werden muss.',
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
    alternates: alternates('/territorio', locale),
  };
}

/*
 * Indice delle zone: le tre pagine locali come blocchi con foto grande, numero, nome e
 * una frase. Tutto il blocco è il link.
 */
export default async function TerritorioIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('localPage');
  const tn = await getTranslations('nav');
  const lang = locale as 'it' | 'en' | 'de';

  return (
    <>
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('index_title')}
          lead={t('index_lead')}
          image={{ src: '/stunning-spring-collage.jpg' }}
        >
          <ButtonLink href="/contatti" size="lg">
            {tn('cta')}
          </ButtonLink>
        </PageHero>

        <Section tone="surface">
          <SectionIntro eyebrow={t('list_eyebrow')} title={t('list_title')} />
          <ol className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {cities.map((city, i) => (
              <li key={city.slug}>
                <Link href={{ pathname: '/territorio/[city]', params: { city: city.slug } }} className="group block">
                  <figure className="rounded-media relative aspect-4/5 bg-surface-alt">
                    <Image
                      src={city.image}
                      alt=""
                      fill
                      sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                    />
                  </figure>
                  <div className="mt-6 border-t border-line pt-5">
                    <p aria-hidden className="type-eyebrow text-brand">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="type-h3 mt-2 flex items-start justify-between gap-4 text-ink transition-colors group-hover:text-brand">
                      {city.name[lang] ?? city.name.it}
                      <ArrowUpRight aria-hidden className="mt-1 size-6 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p className="type-body mt-3 text-ink-muted">{city.description[lang] ?? city.description.it}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Section>
      </main>
      <Footer />
    </>
  );
}
