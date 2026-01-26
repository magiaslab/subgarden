import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import type { Metadata } from 'next';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';
import { CookieBanner } from '@/components/ui/CookieBanner';

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
      default: 'SUBGarden - Sistema di Subirrigazione di Lusso',
      template: '%s | SUBGarden',
    },
    description:
      'Sistema innovativo di subirrigazione per giardini toscani. Efficienza, sostenibilità e lusso per il tuo spazio verde.',
    keywords: [
      'subirrigazione',
      'irrigazione giardini',
      'sistema irrigazione toscana',
      'irrigazione sostenibile',
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
      title: 'SUBGarden - Sistema di Subirrigazione di Lusso',
      description:
        'Sistema innovativo di subirrigazione per giardini toscani. Efficienza, sostenibilità e lusso per il tuo spazio verde.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SUBGarden - Sistema di Subirrigazione di Lusso',
      description:
        'Sistema innovativo di subirrigazione per giardini toscani. Efficienza, sostenibilità e lusso per il tuo spazio verde.',
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
    </NextIntlClientProvider>
  );
}
