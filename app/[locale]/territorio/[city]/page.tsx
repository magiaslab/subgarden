import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section, SectionIntro } from '@/components/site/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import { SITE_URL, absoluteUrl, alternates } from '@/lib/utils/metadata';

// Dati statici per le città (in futuro verranno dal CMS)
const cities = {
  elba: {
    image: '/stunning-spring-collage.jpg',
    it: {
      name: 'Isola d\'Elba',
      title: 'Subirrigazione SUBGarden all\'Isola d\'Elba',
      description:
        'Soluzioni di subirrigazione professionali per giardini e spazi verdi all\'Isola d\'Elba',
      ordinances: 'Le ordinanze locali per il risparmio idrico dell\'Isola d\'Elba rendono la subirrigazione particolarmente vantaggiosa. Con estati calde e secche, il sistema SUBGarden garantisce un risparmio idrico fino al 65% rispetto all\'irrigazione tradizionale, rispettando le normative regionali.',
      features: [
        'Adattamento ottimale al clima mediterraneo con estati calde e secche',
        'Riduzione consumo idrico fino al 65% rispetto all\'irrigazione a pioggia',
        'Installazione specializzata su terreni sabbiosi tipici dell\'isola',
        'Supporto per la vegetazione locale mediterranea e specie autoctone',
        'Resistenza alla salsedine e alle condizioni costiere',
        'Team locale specializzato con conoscenza del territorio',
      ],
    },
    en: {
      name: 'Elba Island',
      title: 'SUBGarden Sub-Irrigation on Elba Island',
      description:
        'Professional sub-irrigation solutions for gardens and green spaces on Elba Island',
      ordinances: 'Local ordinances for water saving make sub-irrigation particularly advantageous.',
      features: [
        'Optimal adaptation to the Mediterranean climate with hot and dry summers',
        'Water consumption reduction up to 65% compared to spray irrigation',
        'Specialized installation on sandy soils typical of the island',
        'Support for local Mediterranean vegetation and native species',
        'Resistance to salt spray and coastal conditions',
        'Specialized local team with local knowledge',
      ],
    },
    de: {
      name: 'Elba-Insel',
      title: 'SUBGarden Unterflurbewässerung auf der Elba-Insel',
      description:
        'Professionelle Unterflurbewässerungslösungen für Gärten und Grünflächen auf der Elba-Insel',
      ordinances:
        'Lokale Verordnungen zum Wassersparen machen die Unterflurbewässerung besonders vorteilhaft.',
      features: [
        'Optimale Anpassung an das mediterrane Klima mit heißen und trockenen Sommern',
        'Reduzierung des Wasserverbrauchs um bis zu 65 % im Vergleich zur Sprühbewässerung',
        'Spezialisierte Installation auf inseltypischen Sandböden',
        'Unterstützung für lokale mediterrane Vegetation und einheimische Arten',
        'Beständigkeit gegen Salzsprühnebel und Küstenbedingungen',
        'Spezialisiertes lokales Team mit Ortskenntnissen',
      ],
    },
  },
  maremma: {
    image: '/grassland-landscape-greening-environment-park-background.jpg',
    it: {
      name: 'Maremma',
      title: 'Subirrigazione SUBGarden in Maremma',
      description:
        'Sistemi di subirrigazione per la Maremma Toscana, tra natura e tradizione',
      ordinances: 'La Maremma Toscana, con il suo clima caldo e secco, richiede sistemi di irrigazione estremamente efficienti. Le ordinanze regionali per il risparmio idrico e la tutela delle risorse idriche rendono la subirrigazione SUBGarden la scelta ideale per agricoltori e proprietari di giardini.',
      features: [
        'Resistenza alle alte temperature estive e ai periodi di siccità prolungata',
        'Efficienza ottimale in terreni argillosi tipici della Maremma',
        'Supporto specializzato per oliveti, vigneti e coltivazioni estensive',
        'Integrazione perfetta con sistemi di irrigazione esistenti',
        'Riduzione dell\'erosione del suolo e miglioramento della struttura del terreno',
        'Team locale con esperienza decennale nel territorio maremmano',
      ],
    },
    en: {
      name: 'Maremma',
      title: 'SUBGarden Sub-Irrigation in Maremma',
      description:
        'Sub-irrigation systems for the Tuscan Maremma, between nature and tradition',
      ordinances: 'The Maremma requires efficient irrigation systems for the hot and dry climate.',
      features: [
        'Resistance to high summer temperatures and prolonged drought periods',
        'Optimal efficiency in clay soils typical of Maremma',
        'Specialized support for olive groves, vineyards, and extensive crops',
        'Seamless integration with existing irrigation systems',
        'Reduction of soil erosion and improvement of soil structure',
        'Local team with ten years of experience in the Maremma territory',
      ],
    },
    de: {
      name: 'Maremma',
      title: 'SUBGarden Unterflurbewässerung in der Maremma',
      description:
        'Unterflurbewässerungssysteme für die toskanische Maremma, zwischen Natur und Tradition',
      ordinances:
        'Die Maremma erfordert effiziente Bewässerungssysteme für das heiße und trockene Klima.',
      features: [
        'Beständigkeit gegen hohe Sommertemperaturen und längere Dürreperioden',
        'Optimale Effizienz in maremmatypischen Lehmböden',
        'Spezialisierte Unterstützung für Olivenhaine, Weinberge und extensiven Ackerbau',
        'Nahtlose Integration in bestehende Bewässerungssysteme',
        'Reduzierung der Bodenerosion und Verbesserung der Bodenstruktur',
        'Lokales Team mit zehnjähriger Erfahrung im Maremma-Gebiet',
      ],
    },
  },
  livorno: {
    image: '/green-park-view.jpg',
    it: {
      name: 'Livorno',
      title: 'Subirrigazione SUBGarden a Livorno',
      description:
        'Soluzioni di subirrigazione per giardini e parchi urbani a Livorno',
      ordinances: 'Le politiche urbane di Livorno per la sostenibilità e l\'efficienza idrica favoriscono sistemi di irrigazione innovativi come SUBGarden. Il Comune promuove iniziative per la riduzione dei consumi idrici, rendendo la subirrigazione particolarmente vantaggiosa per giardini pubblici e privati.',
      features: [
        'Adattamento ottimale a spazi urbani e giardini condominiali',
        'Riduzione impatto visivo: sistema completamente interrato e invisibile',
        'Manutenzione semplificata e ridotta rispetto ai sistemi tradizionali',
        'Integrazione con sistemi smart city e domotica urbana',
        'Conformità alle normative comunali per il risparmio idrico',
        'Supporto tecnico locale con interventi rapidi in caso di necessità',
      ],
    },
    en: {
      name: 'Livorno',
      title: 'SUBGarden Sub-Irrigation in Livorno',
      description:
        'Sub-irrigation solutions for gardens and urban parks in Livorno',
      ordinances: 'Urban sustainability policies favor efficient irrigation systems.',
      features: [
        'Optimal adaptation to urban spaces and condominium gardens',
        'Reduced visual impact: completely buried and invisible system',
        'Simplified and reduced maintenance compared to traditional systems',
        'Integration with smart city systems and urban home automation',
        'Compliance with municipal regulations for water saving',
        'Local technical support with quick interventions when needed',
      ],
    },
    de: {
      name: 'Livorno',
      title: 'SUBGarden Unterflurbewässerung in Livorno',
      description:
        'Unterflurbewässerungslösungen für Gärten und städtische Parks in Livorno',
      ordinances:
        'Städtische Nachhaltigkeitspolitik begünstigt effiziente Bewässerungssysteme.',
      features: [
        'Optimale Anpassung an städtische Räume und Eigentumswohnungen',
        'Reduzierte visuelle Auswirkungen: vollständig vergrabenes und unsichtbares System',
        'Vereinfachte und reduzierte Wartung im Vergleich zu herkömmlichen Systemen',
        'Integration in Smart-City-Systeme und urbane Gebäudeautomation',
        'Einhaltung der städtischen Vorschriften zum Wassersparen',
        'Lokaler technischer Support mit schnellen Einsätzen bei Bedarf',
      ],
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({
    city,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city } = (await params) as { locale: Locale; city: string };
  const cityData = (cities as any)[city];
  if (!cityData) {
    return {};
  }
  const content = cityData[locale] || cityData.it;
  return {
    // Il titolo della pagina contiene già il marchio: nel <title> lo aggiunge il layout.
    title: content.title.replace('SUBGarden ', ''),
    description: content.description,
    alternates: alternates({ pathname: '/territorio/[city]', params: { city } }, locale),
  };
}

/*
 * Pagina locale: apertura con la foto della zona, il contesto (clima, terreno, regole
 * sull'acqua) come testo lungo accanto al titolo, poi le voci numerate con i filetti e
 * le altre zone come righe.
 */
export default async function TerritorioPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city } = await params;
  setRequestLocale(locale as Locale);
  const cityData = (cities as any)[city];

  if (!cityData) {
    notFound();
  }

  const content = cityData[locale] || cityData.it;
  const image = cityData.image;
  // Un servizio nella zona, fornito dall'impresa di San Vincenzo (nodo del layout):
  // niente LocalBusiness con un indirizzo che non esiste.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    description: content.description,
    url: absoluteUrl({ pathname: '/territorio/[city]', params: { city } }, locale as Locale),
    serviceType: 'Subirrigazione',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Place', name: content.name },
  };

  const t = await getTranslations('localPage');
  const tn = await getTranslations('nav');
  const others = Object.entries(cities as Record<string, any>).filter(([slug]) => slug !== city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('eyebrow')}
          title={content.title}
          lead={content.description}
          image={{ src: image }}
          breadcrumb={[
            { label: tn('home'), href: '/' },
            { label: tn('local'), href: '/territorio' },
            { label: content.name },
          ]}
        >
          <ButtonLink href="/contatti" size="lg">
            {tn('cta')}
          </ButtonLink>
        </PageHero>

        <Section tone="surface">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <SectionIntro className="lg:col-span-5" eyebrow={t('context_eyebrow')} title={t('context_title')} />
            <p className="type-lead border-l-2 border-cta pl-6 text-ink lg:col-span-7 lg:mt-12">{content.ordinances}</p>
          </div>
        </Section>

        <Section tone="alt">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionIntro eyebrow={t('features_eyebrow')} title={t('features_title')} />
                <figure className="rounded-media relative mt-10 hidden aspect-4/5 bg-surface lg:block">
                  <Image src={image} alt="" fill sizes="(min-width: 64rem) 40vw, 1px" className="object-cover" />
                </figure>
              </div>
            </div>
            <ol className="border-t border-line lg:col-span-7">
              {(content.features as string[]).map((feature, i) => (
                <li key={feature} className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-line py-6 lg:py-8">
                  <span aria-hidden className="type-eyebrow pt-1.5 text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="type-lead text-ink">{feature}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section tone="surface">
          <h2 className="type-h2 text-ink">{t('other_title')}</h2>
          <ul className="mt-10 border-t border-line">
            {others.map(([slug, data]) => {
              const c = data[locale] || data.it;
              return (
                <li key={slug} className="border-b border-line">
                  <Link
                    href={{ pathname: '/territorio/[city]', params: { city: slug } }}
                    className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-5 py-5 sm:grid-cols-[9rem_1fr_auto] lg:grid-cols-[12rem_1fr_1.2fr_auto] lg:gap-10 lg:py-7"
                  >
                    <span className="rounded-media relative block aspect-4/3 bg-surface-alt">
                      <Image src={data.image} alt="" fill sizes="(min-width: 64rem) 12rem, 9rem" className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105" />
                    </span>
                    <span className="type-h3 text-ink transition-colors group-hover:text-brand">{c.name}</span>
                    <span className="type-body hidden text-ink-muted lg:block">{c.description}</span>
                    <ArrowUpRight aria-hidden className="size-6 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}
