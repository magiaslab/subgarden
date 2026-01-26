import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MotionDiv } from '@/components/ui/Motion';
import { ContactCTA } from '@/components/sections/ContactCTA';
import Image from 'next/image';
import { 
  Sun, 
  Droplet, 
  Waves, 
  Palmtree, 
  Wind, 
  Users,
  ThermometerSun,
  Mountain,
  Grape,
  Combine,
  Shovel,
  History,
  Building2,
  EyeOff,
  Wrench,
  Lightbulb,
  FileCheck,
  Headphones,
  CheckCircle2
} from 'lucide-react';

// Dati statici per le città (in futuro verranno dal CMS)
const cities = {
  elba: {
    image: '/stunning-spring-collage.jpg',
    icons: [Sun, Droplet, Waves, Palmtree, Wind, Users],
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
        'Reduzierung del Wasserverbrauchs um bis zu 65 % im Vergleich alla Sprühbewässerung',
        'Spezialisierte Installation auf inseltypischen Sandböden',
        'Unterstützung für lokale mediterrane Vegetation und einheimische Arten',
        'Beständigkeit gegen Salzsprühnebel und Küstenbedingungen',
        'Spezialisiertes lokales Team mit Ortskenntnissen',
      ],
    },
  },
  maremma: {
    image: '/grassland-landscape-greening-environment-park-background.jpg',
    icons: [ThermometerSun, Mountain, Grape, Combine, Shovel, History],
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
    icons: [Building2, EyeOff, Wrench, Lightbulb, FileCheck, Headphones],
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
  const { locale, city } = await params;
  const cityData = (cities as any)[city];

  if (!cityData) {
    return {};
  }

  const content = cityData[locale] || cityData.it;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  return {
    title: `${content.title} - SUBGarden`,
    description: content.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/territorio/${city}`,
      languages: {
        it: `${siteUrl}/it/territorio/${city}`,
        en: `${siteUrl}/en/territory/${city}`,
        de: `${siteUrl}/de/gebiet/${city}`,
      },
    },
  };
}

export default async function TerritorioPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city } = await params;
  const cityData = (cities as any)[city];

  if (!cityData) {
    notFound();
  }

  const content = cityData[locale] || cityData.it;
  const image = cityData.image;
  const icons = cityData.icons;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `SUBGarden - ${content.name}`,
    description: content.description,
    url: `${siteUrl}/${locale}/territorio/${city}`,
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

        <section className="py-20 bg-[#F2F4F7]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {image && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 rounded-xl overflow-hidden shadow-2xl relative h-[400px] w-full"
              >
                <Image
                  src={image}
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
              <Card className="mb-16 bg-white/50 backdrop-blur-sm border-white">
                <CardHeader>
                  <CardTitle className="text-3xl font-serif font-bold text-deep-teal">
                    Contesto Locale e Normative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-copper pl-6 py-2">
                    {content.ordinances}
                  </p>
                </CardContent>
              </Card>
            </MotionDiv>

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-teal mb-4">
                Vantaggi per {content.name}
              </h2>
              <div className="w-24 h-1.5 bg-copper mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.features.map((feature: string, index: number) => {
                const Icon = icons[index] || CheckCircle2;
                return (
                  <MotionDiv
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group hover:border-copper/50 transition-all duration-300 shadow-xl hover:shadow-2xl h-full border-white/50 bg-white">
                      <CardContent className="pt-8 p-6 flex flex-col items-center md:items-start text-center md:text-left h-full">
                        <div className="mb-6 p-4 rounded-2xl bg-[#F2F4F7] group-hover:bg-copper group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-inner">
                          <Icon className="w-8 h-8 text-deep-teal group-hover:text-white" />
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed font-medium">
                          {feature}
                        </p>
                      </CardContent>
                    </Card>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
