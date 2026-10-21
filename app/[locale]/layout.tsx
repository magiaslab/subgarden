import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Montserrat } from 'next/font/google';
import { routing } from '@/lib/i18n/routing';
import type { Metadata } from 'next';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { AnalyticsScript } from '@/components/analytics/AnalyticsScript';
import { SITE_URL, alternates, pick } from '@/lib/utils/metadata';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const DESCRIPTION: Record<string, string> = {
  it: 'Subirrigazione per giardini già fatti: l’acqua arriva alle radici con le ali gocciolanti Rain Bird, fino al 70% di acqua in meno e nessuno scavo che rovina il prato. In Toscana.',
  en: 'Subsurface irrigation for existing gardens: water goes straight to the roots through Rain Bird driplines, up to 70% less water and no digging that ruins the lawn. In Tuscany.',
  de: 'Unterflurbewässerung für bestehende Gärten: Das Wasser kommt über Rain-Bird-Tropfleitungen direkt an die Wurzeln, bis zu 70 % weniger Wasser und keine Grabungen, die den Rasen zerstören. In der Toskana.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const description = pick(DESCRIPTION, locale);

  return {
    metadataBase: new URL(SITE_URL),
    ...(googleVerification && { verification: { google: googleVerification } }),
    title: {
      default: 'SUBGarden',
      template: '%s | SUBGarden',
    },
    description,
    authors: [{ name: 'SUBGarden' }],
    creator: 'SUBGarden',
    publisher: 'CLOROPHYLLA SRL',
    alternates: alternates('/', locale),
    openGraph: {
      type: 'website',
      locale,
      siteName: 'SUBGarden',
      description,
    },
    twitter: {
      card: 'summary_large_image',
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  // Un solo grafo per tutto il sito: l'impresa (con i dati veri del footer e dei contatti)
  // e il sito. Le pagine aggiungono i loro nodi (FAQPage, Service, Article).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'HomeAndConstructionBusiness'],
        '@id': `${SITE_URL}/#organization`,
        name: 'SUBGarden',
        legalName: 'CLOROPHYLLA SRL',
        taxID: '02088950494',
        url: SITE_URL,
        logo: `${SITE_URL}/SUBGARDEN%20-%20LOGO%20COLORI.png`,
        description: pick(DESCRIPTION, locale),
        email: 'info@subgarden.it',
        telephone: '+39 347 6299935',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Pitagora 3',
          postalCode: '57027',
          addressLocality: 'San Vincenzo',
          addressRegion: 'LI',
          addressCountry: 'IT',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Toscana' },
          { '@type': 'Place', name: 'Isola d’Elba' },
          { '@type': 'Place', name: 'Maremma' },
          { '@type': 'City', name: 'Livorno' },
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        knowsAbout: ['subirrigazione', 'irrigazione a goccia interrata', 'Rain Bird XFS', 'risparmio idrico'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'SUBGarden',
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['it', 'en', 'de'],
      },
    ],
  };

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height={0}
              width={0}
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <WhatsAppWidget />
          <CookieBanner />
          <AnalyticsScript />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
