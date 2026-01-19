import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Link } from '@/lib/i18n/routing';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';

const cities = [
  {
    slug: 'elba',
    name: {
      it: 'Isola d\'Elba',
      en: 'Elba Island',
      de: 'Elba-Insel',
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
  {
    slug: 'maremma',
    name: {
      it: 'Maremma',
      en: 'Maremma',
      de: 'Maremma',
    },
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    slug: 'livorno',
    name: {
      it: 'Livorno',
      en: 'Livorno',
      de: 'Livorno',
    },
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
];

export const metadata: Metadata = {
  title: 'SUBGarden in Toscana | Presenza Locale',
  description: 'Scopri dove operiamo in Toscana: Isola d\'Elba, Maremma, Livorno e altre località.',
};

export default async function LocalIndexPage({
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
              SUBGarden in Toscana
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Eccellenza nell&apos;irrigazione per il territorio toscano
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cities.map((city, index) => (
                <MotionDiv
                  key={city.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={{ pathname: '/local/[city]', params: { city: city.slug } }}>
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={city.image}
                          alt={city.name[locale as keyof typeof city.name] || city.name.it}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl text-deep-teal group-hover:text-copper transition-colors">
                          {city.name[locale as keyof typeof city.name] || city.name.it}
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
