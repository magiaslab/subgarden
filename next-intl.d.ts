import { routing } from './lib/i18n/routing';

type Locale = (typeof routing.locales)[number];

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages {}
}

export {};
