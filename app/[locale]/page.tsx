import type { Locale } from 'next-intl';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL, absoluteUrl, alternates, pick } from '@/lib/utils/metadata';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Hero } from '@/components/home/Hero';
import { Facts } from '@/components/home/Facts';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Install } from '@/components/home/Install';
import { Why } from '@/components/home/Why';
import { BeforeAfter } from '@/components/home/BeforeAfter';
import { CaseStudy } from '@/components/home/CaseStudy';
import { TrainingBanner } from '@/components/home/TrainingBanner';
import { SolutionsList } from '@/components/home/SolutionsList';
import { Synthesis } from '@/components/home/Synthesis';

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
      <main id="contenuto">
        <Hero />
        <Facts />
        <HowItWorks />
        <Install />
        <Why />
        <BeforeAfter />
        <CaseStudy />
        <TrainingBanner />
        <SolutionsList />
        <Synthesis />
      </main>
      <Footer />
    </>
  );
}
