import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card } from '@/components/ui/Card';
import { Link } from '@/lib/i18n/routing';
import { MotionDiv } from '@/components/ui/Motion';
import { ContactCTA } from '@/components/sections/ContactCTA';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';

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

export const metadata: Metadata = {
  title: 'SUBGarden in Toscana | Territorio',
  description: 'Scopri dove operiamo in Toscana: Isola d\'Elba, Maremma, Livorno e altre località.',
};

export default async function TerritorioIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-gradient-to-br from-deep-teal to-stone-grey text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              SUBGarden in Toscana
            </h1>
            <p className="text-xl md:text-2xl opacity-90 font-light italic">
              Eccellenza nell&apos;irrigazione per il territorio toscano
            </p>
          </div>
        </section>

        <section className="py-24 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {cities.map((city, index) => (
                <MotionDiv
                  key={city.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={{ pathname: '/territorio/[city]', params: { city: city.slug } }}>
                    <Card className="h-[500px] overflow-hidden cursor-pointer group p-0 relative border-none shadow-2xl">
                      {/* Full Background Image */}
                      <Image
                        src={city.image}
                        alt={city.name[locale as keyof typeof city.name] || city.name.it}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-copper/80 transition-colors duration-500" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                        <div className="flex items-center gap-2 mb-2 text-copper opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-widest">Toscana</span>
                        </div>
                        
                        <h3 className="text-3xl font-serif font-bold mb-3">
                          {city.name[locale as keyof typeof city.name] || city.name.it}
                        </h3>
                        
                        <p className="text-white/80 text-lg leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          {city.description[locale as keyof typeof city.description] || city.description.it}
                        </p>

                        <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm border-b border-white/30 w-fit pb-1 group-hover:border-white transition-colors">
                          Esplora
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
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
