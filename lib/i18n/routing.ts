import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['it', 'en', 'de'],
  defaultLocale: 'it',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/tecnologia': {
      it: '/tecnologia',
      en: '/technology',
      de: '/technologie',
    },
    '/soluzioni': {
      it: '/soluzioni',
      en: '/solutions',
      de: '/loesungen',
    },
    '/soluzioni/[slug]': {
      it: '/soluzioni/[slug]',
      en: '/solutions/[slug]',
      de: '/loesungen/[slug]',
    },
    '/local': {
      it: '/local',
      en: '/local',
      de: '/lokal',
    },
    '/local/[city]': {
      it: '/local/[city]',
      en: '/local/[city]',
      de: '/lokal/[city]',
    },
    '/privacy': {
      it: '/privacy',
      en: '/privacy',
      de: '/datenschutz',
    },
    '/terms': {
      it: '/terms',
      en: '/terms',
      de: '/nutzungsbedingungen',
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
