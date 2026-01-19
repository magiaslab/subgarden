import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';

// Dati statici per le città (in futuro verranno dal CMS)
const cities = {
  elba: {
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
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    },
    en: {
      name: 'Elba Island',
      title: 'SUBGarden Sub-Irrigation on Elba Island',
      description:
        'Professional sub-irrigation solutions for gardens and green spaces on Elba Island',
      ordinances: 'Local ordinances for water saving make sub-irrigation particularly advantageous.',
      features: [
        'Adaptation to Mediterranean climate',
        'Reduced water consumption',
        'Installation on sandy soils',
        'Support for local vegetation',
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    },
    de: {
      name: 'Elba-Insel',
      title: 'SUBGarden Unterflurbewässerung auf der Elba-Insel',
      description:
        'Professionelle Unterflurbewässerungslösungen für Gärten und Grünflächen auf der Elba-Insel',
      ordinances:
        'Lokale Verordnungen zum Wassersparen machen die Unterflurbewässerung besonders vorteilhaft.',
      features: [
        'Anpassung an mediterranes Klima',
        'Reduzierter Wasserverbrauch',
        'Installation auf sandigen Böden',
        'Unterstützung für lokale Vegetation',
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    },
  },
  maremma: {
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
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    },
    en: {
      name: 'Maremma',
      title: 'SUBGarden Sub-Irrigation in Maremma',
      description:
        'Sub-irrigation systems for the Tuscan Maremma, between nature and tradition',
      ordinances: 'The Maremma requires efficient irrigation systems for the hot and dry climate.',
      features: [
        'Resistance to high temperatures',
        'Efficiency in clay soils',
        'Support for olive groves and vineyards',
        'Integration with existing systems',
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
        'Beständigkeit gegen hohe Temperaturen',
        'Effizienz in Lehmböden',
        'Unterstützung für Olivenhaine und Weinberge',
        'Integration mit bestehenden Systemen',
      ],
    },
  },
  livorno: {
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
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    },
    en: {
      name: 'Livorno',
      title: 'SUBGarden Sub-Irrigation in Livorno',
      description:
        'Sub-irrigation solutions for gardens and urban parks in Livorno',
      ordinances: 'Urban sustainability policies favor efficient irrigation systems.',
      features: [
        'Adaptation to urban spaces',
        'Reduced visual impact',
        'Simplified maintenance',
        'Smart city integration',
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
        'Anpassung an städtische Räume',
        'Reduzierte visuelle Auswirkungen',
        'Vereinfachte Wartung',
        'Smart-City-Integration',
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
  const { locale, city } = await params;
  const cityData = cities[city as keyof typeof cities];

  if (!cityData) {
    return {};
  }

  const content = (cityData as any)[locale] || cityData.it;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  return {
    title: `${content.title} - SUBGarden`,
    description: content.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/local/${city}`,
      languages: {
        it: `${siteUrl}/it/local/${city}`,
        en: `${siteUrl}/en/local/${city}`,
        de: `${siteUrl}/de/local/${city}`,
      },
    },
  };
}

export default async function LocalPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city } = await params;
  const cityData = cities[city as keyof typeof cities];

  if (!cityData) {
    notFound();
  }

  const content = (cityData as any)[locale] || cityData.it;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `SUBGarden - ${content.name}`,
    description: content.description,
    url: `${siteUrl}/${locale}/local/${city}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: content.name,
      addressRegion: 'Toscana',
      addressCountry: 'IT',
    },
    areaServed: {
      '@type': 'City',
      name: content.name,
    },
    serviceType: 'Sub-irrigation System Installation',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-deep-teal to-stone-grey text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {content.description}
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {content.image && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 rounded-xl overflow-hidden shadow-2xl relative h-[400px] w-full"
              >
                <Image
                  src={content.image}
                  alt={content.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </MotionDiv>
            )}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-deep-teal">
                    Contesto Locale e Normative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{content.ordinances}</p>
                </CardContent>
              </Card>
            </MotionDiv>

            <h2 className="text-3xl font-serif font-bold text-deep-teal mb-8">
              Vantaggi per {content.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.features.map((feature: string, index: number) => (
                <MotionDiv
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-gray-700">{feature}</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
