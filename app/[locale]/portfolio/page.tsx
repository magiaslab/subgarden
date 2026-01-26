import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { PortfolioGallery } from '@/components/sections/PortfolioGallery';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  const titles: Record<string, string> = {
    it: 'Portfolio - I Nostri Progetti SUBGarden',
    en: 'Portfolio - Our SUBGarden Projects',
    de: 'Portfolio - Unsere SUBGarden Projekte',
  };

  const descriptions: Record<string, string> = {
    it: 'Esplora i lavori d\'eccellenza realizzati da SUBGarden: dalla subirrigazione per ville storiche a parchi pubblici e giardini residenziali di lusso.',
    en: 'Explore the works of excellence carried out by SUBGarden: from sub-irrigation for historical villas to public parks and luxury residential gardens.',
    de: 'Entdecken Sie die exzellenten Arbeiten von SUBGarden: von der Unterflurbewässerung für historische Villen bis hin zu öffentlichen Parks und luxuriösen Wohngärten.',
  };

  return {
    title: titles[locale] || titles.it,
    description: descriptions[locale] || descriptions.it,
    alternates: {
      canonical: `${siteUrl}/${locale}/portfolio`,
      languages: {
        it: `${siteUrl}/it/portfolio`,
        en: `${siteUrl}/en/portfolio`,
        de: `${siteUrl}/de/portfolio`,
      },
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await (getTranslations as any)('portfolio');

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/green-park-view.jpg"
            alt="Portfolio SUBGarden"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                {t('title')}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 font-light italic">
                {t('description')}
              </p>
            </MotionDiv>
          </div>
        </section>

        <PortfolioGallery />

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
