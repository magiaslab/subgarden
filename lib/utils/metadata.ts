import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getPathname, routing } from '@/lib/i18n/routing';

// Dominio dei canonical: fisso, non dalle variabili d'ambiente. Così anche le anteprime
// Vercel indicano la produzione e un NEXT_PUBLIC_SITE_URL senza www non sporca i segnali.
export const SITE_URL = 'https://www.subgarden.it';

type Href = Parameters<typeof getPathname>[0]['href'];

/** URL assoluto di una pagina nella lingua data, con lo slug tradotto dal routing. */
export function absoluteUrl(href: Href, locale: Locale): string {
  return `${SITE_URL}${getPathname({ href, locale })}`;
}

/**
 * Canonical e hreflang di una pagina. `locales` limita le lingue in cui la pagina esiste
 * davvero (es. un articolo scritto solo in italiano).
 */
export function alternates(
  href: Href,
  locale: Locale,
  locales: readonly Locale[] = routing.locales
): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(href, l);
  languages['x-default'] = absoluteUrl(href, locales.includes(routing.defaultLocale) ? routing.defaultLocale : locales[0]);
  return { canonical: absoluteUrl(href, locale), languages };
}

/** Testo per lingua, con l'italiano come riserva. */
export function pick<T>(byLocale: Record<string, T>, locale: string): T {
  return byLocale[locale] ?? byLocale[routing.defaultLocale];
}

export const NOINDEX: Metadata['robots'] = { index: false, follow: true };
