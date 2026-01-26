import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { PortfolioGallery } from '@/components/sections/PortfolioGallery';

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
        <section className="py-24 bg-gradient-to-br from-deep-teal to-stone-grey text-white overflow-hidden relative">
          {/* Background decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-copper/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 font-light leading-relaxed">
              {t('description')}
            </p>
          </div>
        </section>

        <PortfolioGallery />

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
