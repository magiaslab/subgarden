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
    '/chi-siamo': {
      it: '/chi-siamo',
      en: '/about-us',
      de: '/ueber-uns',
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
    '/territorio': {
      it: '/territorio',
      en: '/territory',
      de: '/gebiet',
    },
    '/territorio/[city]': {
      it: '/territorio/[city]',
      en: '/territory/[city]',
      de: '/gebiet/[city]',
    },
    '/contatti': {
      it: '/contatti',
      en: '/contact',
      de: '/kontakt',
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
