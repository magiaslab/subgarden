import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL, absoluteUrl, alternates, pick } from '@/lib/utils/metadata';
import { HeroSection } from '@/components/sections/HeroSection';
import { PainPoints } from '@/components/sections/PainPoints';
import { ComparisonSlider } from '@/components/sections/LazyComparisonSlider';
import { TechSpecs } from '@/components/sections/TechSpecs';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PartnerBanner } from '@/components/sections/PartnerBanner';
import { InfographicSection } from '@/components/sections/InfographicSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { SolutionsPreviewSection } from '@/components/sections/SolutionsPreviewSection';
import { ExplanatoryVideoSection } from '@/components/sections/ExplanatoryVideoSection';
import { OperationalMethodStrip } from '@/components/sections/OperationalMethodStrip';

const TITLE: Record<string, string> = {
  it: 'Subirrigazione per giardini esistenti in Toscana',
  en: 'Subsurface irrigation for existing gardens in Tuscany',
  de: 'Unterflurbewässerung für bestehende Gärten in der Toskana',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const title = pick(TITLE, locale);

  return {
    // Stesso segmento del layout: il template non si applica, il marchio va scritto qui.
    title: { absolute: `${title} | SUBGarden` },
    alternates: alternates('/', locale),
    openGraph: {
      title,
      url: absoluteUrl('/', locale),
      images: [
        {
          url: `${SITE_URL}/og.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PartnerBanner />
        <BenefitsSection />
        <PainPoints />
        <ComparisonSlider />
        <TechSpecs />
        <OperationalMethodStrip />
        <ExplanatoryVideoSection />
        <InfographicSection />
        <SolutionsPreviewSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
