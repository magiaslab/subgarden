import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Link } from '@/lib/i18n/routing';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';

const solutions = [
  {
    slug: 'giardini-residenziali',
    title: {
      it: 'Giardini Residenziali',
      en: 'Residential Gardens',
      de: 'Wohngebiete',
    },
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  },
  {
    slug: 'parchi-pubblici',
    title: {
      it: 'Parchi Pubblici',
      en: 'Public Parks',
      de: 'Öffentliche Parks',
    },
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
  {
    slug: 'campi-sportivi',
    title: {
      it: 'Campi Sportivi',
      en: 'Sports Fields',
      de: 'Sportplätze',
    },
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
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
        <section className="py-20 bg-gradient-to-br from-deep-teal to-stone-grey text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Le Nostre Soluzioni
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Sistemi di subirrigazione progettati per ogni esigenza
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <MotionDiv
                  key={solution.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={{ pathname: '/soluzioni/[slug]', params: { slug: solution.slug } }}>
                    <Card className="h-full overflow-hidden cursor-pointer group p-0">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={solution.image}
                          alt={solution.title[locale as keyof typeof solution.title] || solution.title.it}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl text-deep-teal group-hover:text-copper transition-colors">
                          {solution.title[locale as keyof typeof solution.title] || solution.title.it}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
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
