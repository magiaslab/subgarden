import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PageHero } from '@/components/site/PageHero';
import { Section } from '@/components/site/Section';
import { PortfolioGallery } from '@/components/sections/PortfolioGallery';
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
  const t = await getTranslations('portfolio');

  return (
    <>
      <Navbar />
      <main id="contenuto">
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          lead={t('description')}
          image={{ src: '/green-park-view.jpg' }}
        />
        <Section tone="surface">
          <PortfolioGallery />
        </Section>
      </main>
      <Footer />
    </>
  );
}
