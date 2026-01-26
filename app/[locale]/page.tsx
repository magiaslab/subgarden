import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { PainPoints } from '@/components/sections/PainPoints';
import { ComparisonSlider } from '@/components/sections/LazyComparisonSlider';
import { TechSpecs } from '@/components/sections/TechSpecs';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PartnerBanner } from '@/components/sections/PartnerBanner';
import { InfographicSection } from '@/components/sections/InfographicSection';

import { AboutUs } from '@/components/sections/AboutUs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await (getTranslations as any)('hero');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        it: `${siteUrl}/it`,
        en: `${siteUrl}/en`,
        de: `${siteUrl}/de`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      url: `${siteUrl}/${locale}`,
      siteName: 'SUBGarden',
      images: [
        {
          url: `${siteUrl}/rustic-patio-with-deck-furniture-vegetation.jpg`,
          width: 1200,
          height: 630,
          alt: 'SUBGarden - Sistema di Subirrigazione di Lusso',
        },
      ],
      locale: locale,
      type: 'website',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SUBGarden',
    url: siteUrl,
    logo: `${siteUrl}/SUBGARDEN - LOGO COLORI.png`,
    description:
      'Sistema di subirrigazione professionale per il mercato toscano',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Toscana',
      addressCountry: 'IT',
    },
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <PartnerBanner />
        <AboutUs />
        <PainPoints />
        <ComparisonSlider />
        <TechSpecs />
        <InfographicSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
