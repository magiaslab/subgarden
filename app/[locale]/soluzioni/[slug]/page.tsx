import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MotionDiv } from '@/components/ui/Motion';
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
        'Risparmio idrico fino al 60% rispetto all\'irrigazione tradizionale',
        'Manutenzione minima: sistema automatizzato con allarmi preventivi',
        'Controllo completo tramite app mobile iOS e Android',
        'Adattabile a qualsiasi tipo di terreno e vegetazione',
        'Garanzia estesa e supporto tecnico dedicato',
      ],
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
    },
    en: {
      title: 'Residential Gardens',
      description:
        'Perfect sub-irrigation system for private and residential gardens',
      features: [
        'Discrete and non-invasive installation',
        'Water savings up to 60%',
        'Minimal maintenance',
        'Control via mobile app',
      ],
    },
    de: {
      title: 'Wohngebiete',
      description:
        'Perfektes Unterflurbewässerungssystem für private und Wohngebiete',
      features: [
        'Diskrete und nicht-invasive Installation',
        'Wassereinsparung bis zu 60%',
        'Minimaler Wartungsaufwand',
        'Steuerung über mobile App',
      ],
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
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    },
    en: {
      title: 'Public Parks',
      description: 'Professional solution for public green spaces and parks',
      features: [
        'Scalability for large areas',
        'Centralized monitoring',
        'Reduced operating costs',
        'Environmental sustainability',
      ],
    },
    de: {
      title: 'Öffentliche Parks',
      description:
        'Professionelle Lösung für öffentliche Grünflächen und Parks',
      features: [
        'Skalierbarkeit für große Flächen',
        'Zentralisierte Überwachung',
        'Reduzierte Betriebskosten',
        'Umweltnachhaltigkeit',
      ],
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
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    },
    en: {
      title: 'Sports Fields',
      description:
        'Optimized system for football fields, golf courses and other sports facilities',
      features: [
        'Uniform irrigation over large surfaces',
        'Resistance to trampling',
        'Precise zone control',
        'Reduced maintenance time',
      ],
    },
    de: {
      title: 'Sportplätze',
      description:
        'Optimiertes System für Fußballplätze, Golfplätze und andere Sportanlagen',
      features: [
        'Gleichmäßige Bewässerung auf großen Flächen',
        'Trittfestigkeit',
        'Präzise Zonensteuerung',
        'Reduzierte Wartungszeit',
      ],
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
  const solution = solutions[slug as keyof typeof solutions];

  if (!solution) {
    return {};
  }

  const content = solution[locale as keyof typeof solution] || solution.it;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  return {
    title: `${content.title} - SUBGarden`,
    description: content.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/soluzioni/${slug}`,
      languages: {
        it: `${siteUrl}/it/soluzioni/${slug}`,
        en: `${siteUrl}/en/soluzioni/${slug}`,
        de: `${siteUrl}/de/soluzioni/${slug}`,
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
  const solution = solutions[slug as keyof typeof solutions];

  if (!solution) {
    notFound();
  }

  const content = solution[locale as keyof typeof solution] || solution.it;
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
              {content.features.map((feature, index) => (
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
      </main>
      <Footer />
    </>
  );
}
