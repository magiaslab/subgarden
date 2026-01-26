import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MotionDiv } from '@/components/ui/Motion';
import { ContactCTA } from '@/components/sections/ContactCTA';
import Image from 'next/image';

// Dati statici per le soluzioni (in futuro verranno dal CMS)
const solutions = {
  'giardini-residenziali': {
    it: {
      title: 'Giardini Residenziali',
      description:
        'Sistema di subirrigazione di lusso perfetto per giardini privati e residenziali. Trasforma il tuo spazio verde in un\'oasi rigogliosa con il minimo sforzo e massima efficienza.',
      features: [
        'Installazione discreta e non invasiva che preserva l\'estetica del giardino',
        'Risparmio idrico fino al 70% rispetto all\'irrigazione tradizionale',
        'Manutenzione minima: sistema automatizzato con allarmi preventivi',
        'Controllo completo tramite app mobile iOS e Android',
        'Adattabile a qualsiasi tipo di terreno e vegetazione',
        'Garanzia estesa e supporto tecnico dedicato',
      ],
      image: '/rustic-patio-with-deck-furniture-vegetation.jpg',
    },
    en: {
      title: 'Residential Gardens',
      description:
        'Perfect sub-irrigation system for private and residential gardens. Transform your green space into a lush oasis with minimal effort and maximum efficiency.',
      features: [
        'Discrete and non-invasive installation preserving garden aesthetics',
        'Water savings up to 70% compared to traditional irrigation',
        'Minimal maintenance: automated system with preventive alerts',
        'Complete control via iOS and Android mobile app',
        'Adaptable to any type of soil and vegetation',
        'Extended warranty and dedicated technical support',
      ],
      image: '/rustic-patio-with-deck-furniture-vegetation.jpg',
    },
    de: {
      title: 'Wohngebiete',
      description:
        'Perfektes Unterflurbewässerungssystem für private Gärten und Wohngebiete. Verwandeln Sie Ihre Grünfläche in eine üppige Oase mit minimalem Aufwand und maximaler Effizienz.',
      features: [
        'Diskrete und nicht-invasive Installation, die die Ästhetik des Gartens bewahrt',
        'Wassereinsparung bis zu 70% gegenüber herkömmlicher Bewässerung',
        'Minimaler Wartungsaufwand: automatisiertes System mit präventiven Warnungen',
        'Vollständige Steuerung über mobile App (iOS und Android)',
        'Anpassbar an jede Art von Boden und Vegetation',
        'Erweiterte Garantie und dedizierter technischer Support',
      ],
      image: '/rustic-patio-with-deck-furniture-vegetation.jpg',
    },
  },
  'parchi-pubblici': {
    it: {
      title: 'Parchi Pubblici e Spazi Verdi',
      description: 'Soluzione professionale e scalabile per spazi verdi pubblici, parchi urbani e aree ricreative. Massima efficienza per grandi superfici con controllo centralizzato.',
      features: [
        'Scalabilità per grandi aree: da 500mq a 50+ ettari',
        'Monitoraggio centralizzato con dashboard dedicata',
        'Riduzione costi operativi del 40-50% annui',
        'Sostenibilità ambientale certificata e conformità normativa',
        'Resistenza al calpestio e alle condizioni atmosferiche estreme',
        'Integrazione con sistemi di gestione comunali esistenti',
      ],
      image: '/green-park-view.jpg',
    },
    en: {
      title: 'Public Parks and Green Spaces',
      description: 'Professional and scalable solution for public green spaces, urban parks, and recreational areas. Maximum efficiency for large surfaces with centralized control.',
      features: [
        'Scalability for large areas: from 500sqm to 50+ hectares',
        'Centralized monitoring with a dedicated dashboard',
        'Operational cost reduction of 40-50% annually',
        'Certified environmental sustainability and regulatory compliance',
        'Resistance to foot traffic and extreme weather conditions',
        'Integration with existing municipal management systems',
      ],
      image: '/green-park-view.jpg',
    },
    de: {
      title: 'Öffentliche Parks und Grünflächen',
      description: 'Professionelle und skalierbare Lösung für öffentliche Grünflächen, Stadtparks und Erholungsgebiete. Maximale Effizienz für große Flächen mit zentraler Steuerung.',
      features: [
        'Skalierbarkeit für große Flächen: von 500 qm bis 50+ Hektar',
        'Zentrale Überwachung mit dediziertem Dashboard',
        'Senkung der Betriebskosten um 40-50% pro Jahr',
        'Zertifizierte Umweltnachhaltigkeit und Einhaltung gesetzlicher Vorschriften',
        'Widerstandsfähigkeit gegen Trittbelastung und extreme Wetterbedingungen',
        'Integration in bestehende kommunale Managementsysteme',
      ],
      image: '/green-park-view.jpg',
    },
  },
  'campi-sportivi': {
    it: {
      title: 'Campi Sportivi e Strutture Ricreative',
      description:
        'Sistema ottimizzato per campi da calcio, golf, tennis e altre strutture sportive. Garantisce un manto erboso perfetto e uniforme tutto l\'anno.',
      features: [
        'Irrigazione uniforme su grandi superfici senza zone secche o allagate',
        'Resistenza al calpestio intensivo e alle sollecitazioni meccaniche',
        'Controllo preciso delle zone con programmazione differenziata',
        'Riduzione tempi di manutenzione del 70% rispetto ai sistemi tradizionali',
        'Compatibilità con sistemi di drenaggio e aerazione esistenti',
        'Certificazioni per impianti sportivi professionistici',
      ],
      image: '/grassland-landscape-greening-environment-park-background.jpg',
    },
    en: {
      title: 'Sports Fields and Recreational Facilities',
      description: 'Optimized system for football fields, golf courses, tennis courts, and other sports facilities. Guarantees a perfect and uniform turf year-round.',
      features: [
        'Uniform irrigation over large surfaces without dry or flooded areas',
        'Resistance to intensive traffic and mechanical stress',
        'Precise zone control with differentiated programming',
        'Maintenance time reduction of 70% compared to traditional systems',
        'Compatibility with existing drainage and aeration systems',
        'Certifications for professional sports facilities',
      ],
      image: '/grassland-landscape-greening-environment-park-background.jpg',
    },
    de: {
      title: 'Sportplätze und Freizeiteinrichtungen',
      description: 'Optimiertes System für Fußballplätze, Golfplätze, Tennisplätze und andere Sportanlagen. Garantiert ganzjährig einen perfekten und gleichmäßigen Rasen.',
      features: [
        'Gleichmäßige Bewässerung auf großen Flächen ohne trockene oder überflutete Bereiche',
        'Widerstandsfähigkeit gegen intensive Trittbelastung und mechanische Beanspruchung',
        'Präzise Zonensteuerung mit differenzierter Programmierung',
        'Wartungszeitreduzierung um 70% im Vergleich zu herkömmlichen Systemen',
        'Kompatibilität mit bestehenden Entwässerungs- und Belüftungssystemen',
        'Zertifizierungen für professionelle Sportanlagen',
      ],
      image: '/grassland-landscape-greening-environment-park-background.jpg',
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = (solutions as any)[slug];

  if (!solution) {
    return {};
  }

  const content = solution[locale] || solution.it;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  return {
    title: `${content.title} - SUBGarden`,
    description: content.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/soluzioni/${slug}`,
      languages: {
        it: `${siteUrl}/it/soluzioni/${slug}`,
        en: `${siteUrl}/en/solutions/${slug}`,
        de: `${siteUrl}/de/loesungen/${slug}`,
      },
    },
  };
}

export default async function SoluzionePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const solution = (solutions as any)[slug];

  if (!solution) {
    notFound();
  }

  const content = solution[locale] || solution.it;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    description: content.description,
    provider: {
      '@type': 'Organization',
      name: 'SUBGarden',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'State',
      name: 'Toscana',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-deep-teal to-stone-grey text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="outline" className="mb-4 bg-white/10 border-white/30 text-white">
              Soluzione
            </Badge>
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
                  alt={content.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </MotionDiv>
            )}
            <h2 className="text-3xl font-serif font-bold text-deep-teal mb-8">
              Caratteristiche Principali
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
                      <p className="text-gray-700 leading-relaxed">{feature}</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
