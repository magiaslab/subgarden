import { routing } from './lib/i18n/routing';

// next-intl 4: i tipi si estendono con AppConfig (sostituisce il vecchio IntlMessages globale)
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
  }
}
