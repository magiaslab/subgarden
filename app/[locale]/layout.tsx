import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import type { Metadata } from 'next';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { AnalyticsScript } from '@/components/analytics/AnalyticsScript';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'SUBGarden - Subirrigazione per Giardini | Risparmio Idrico, Installazione Non Invasiva',
      template: '%s | SUBGarden',
    },
    description:
      'Sistema di irrigazione sotterranea per giardini esistenti: risparmio idrico fino al 70%, manutenzione minima. Installazione non invasiva che non danneggia il manto erboso. Toscana e Italia.',
    keywords: [
      'subirrigazione',
      'irrigazione sotterranea giardino',
      'irrigazione giardino esistente',
      'risparmio idrico giardino',
      'installazione irrigazione non invasiva',
      'irrigazione senza scavare',
      'manto erboso intatto',
      'subirrigazione Toscana',
      'irrigazione giardino Toscana',
      'sistema irrigazione sostenibile',
    ],
    authors: [{ name: 'SUBGarden' }],
    creator: 'SUBGarden',
    publisher: 'SUBGarden',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        it: `${siteUrl}/it`,
        en: `${siteUrl}/en`,
        de: `${siteUrl}/de`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${siteUrl}/${locale}`,
      siteName: 'SUBGarden',
      title: 'SUBGarden - Subirrigazione per Giardini | Risparmio Idrico, Installazione Non Invasiva',
      description:
        'Irrigazione sotterranea per giardini esistenti: risparmio idrico fino al 70%, installazione che non danneggia il prato. Toscana e Italia.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SUBGarden - Subirrigazione per Giardini | Risparmio Idrico, Installazione Non Invasiva',
      description:
        'Irrigazione sotterranea per giardini esistenti: risparmio idrico fino al 70%, installazione che non danneggia il prato. Toscana e Italia.',
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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <WhatsAppWidget />
      <CookieBanner />
      <AnalyticsScript />
    </NextIntlClientProvider>
  );
}
