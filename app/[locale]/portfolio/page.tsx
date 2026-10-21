import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { PortfolioGallery } from '@/components/sections/PortfolioGallery';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';
import { alternates, pick, NOINDEX } from '@/lib/utils/metadata';

const TITLE: Record<string, string> = {
  it: 'I nostri lavori',
  en: 'Our projects',
  de: 'Unsere Projekte',
};

// Portfolio nascosto in attesa dei contenuti: fuori dalla sitemap e non indicizzato.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return {
    title: pick(TITLE, locale),
    alternates: alternates('/portfolio', locale),
    robots: NOINDEX,
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
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
