import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card } from '@/components/ui/Card';
import { Link } from '@/lib/i18n/routing';
import { MotionDiv } from '@/components/ui/Motion';
import { ContactCTA } from '@/components/sections/ContactCTA';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    slug: 'giardini-residenziali',
    title: {
      it: 'Giardini Residenziali',
      en: 'Residential Gardens',
      de: 'Wohngebiete',
    },
    description: {
      it: 'Soluzioni di subirrigazione di lusso per ville e residenze private.',
      en: 'Luxury sub-irrigation solutions for villas and private residences.',
      de: 'Luxus-Unterflurbewässerungslösungen für Villen und Privatresidenzen.',
    },
    image: '/rustic-patio-with-deck-furniture-vegetation.jpg',
  },
  {
    slug: 'parchi-pubblici',
    title: {
      it: 'Parchi Pubblici',
      en: 'Public Parks',
      de: 'Öffentliche Parks',
    },
    description: {
      it: 'Sistemi efficienti per la gestione di grandi aree verdi urbane.',
      en: 'Efficient systems for managing large urban green areas.',
      de: 'Effiziente Systeme für die Verwaltung großer städtischer Grünflächen.',
    },
    image: '/green-park-view.jpg',
  },
  {
    slug: 'campi-sportivi',
    title: {
      it: 'Campi Sportivi',
      en: 'Sports Fields',
      de: 'Sportplätze',
    },
    description: {
      it: 'Manti erbosi perfetti e performanti per ogni disciplina sportiva.',
      en: 'Perfect and high-performance turf for every sporting discipline.',
      de: 'Perfekter und leistungsstarker Rasen für jede Sportdisziplin.',
    },
    image: '/grassland-landscape-greening-environment-park-background.jpg',
  },
];

export const metadata: Metadata = {
  title: 'Soluzioni di Subirrigazione | SUBGarden',
  description: 'Scopri tutte le soluzioni SUBGarden per l\'irrigazione di giardini residenziali, parchi e campi sportivi.',
};

export default async function SoluzioniIndexPage({
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
              Le Nostre Soluzioni
            </h1>
            <p className="text-xl md:text-2xl opacity-90 font-light italic">
              Sistemi di subirrigazione progettati per ogni esigenza
            </p>
          </div>
        </section>

        <section className="py-24 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {solutions.map((solution, index) => (
                <MotionDiv
                  key={solution.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={{ pathname: '/soluzioni/[slug]', params: { slug: solution.slug } }}>
                    <Card className="h-[500px] overflow-hidden cursor-pointer group p-0 relative border-none shadow-2xl">
                      {/* Full Background Image */}
                      <Image
                        src={solution.image}
                        alt={solution.title[locale as keyof typeof solution.title] || solution.title.it}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-deep-teal/90 transition-colors duration-500" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                        <h3 className="text-3xl font-serif font-bold mb-3 group-hover:text-copper transition-colors duration-300">
                          {solution.title[locale as keyof typeof solution.title] || solution.title.it}
                        </h3>
                        
                        <p className="text-white/80 text-lg leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          {solution.description[locale as keyof typeof solution.description] || solution.description.it}
                        </p>

                        <div className="flex items-center gap-2 text-copper font-bold uppercase tracking-widest text-sm">
                          Scopri di più
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
