import type { Metadata } from 'next';

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://subgarden.it';
}

export function generateCanonicalUrl(path: string, locale: string): string {
  return `${getSiteUrl()}/${locale}${path}`;
}

export function generateAlternateLanguages(
  path: string,
  locales: string[] = ['it', 'en', 'de']
): Metadata['alternates'] {
  const siteUrl = getSiteUrl();
  return {
    canonical: `${siteUrl}/it${path}`,
    languages: {
      it: `${siteUrl}/it${path}`,
      en: `${siteUrl}/en${path}`,
      de: `${siteUrl}/de${path}`,
    },
  };
}
