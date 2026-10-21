// Eventi GA4 e Consent Mode v2. gtag lo definisce AnalyticsScript; finché non c'è
// (script bloccato, prima dell'idratazione) le chiamate finiscono nella dataLayer e
// partono quando gtag si carica.

type Gtag = (...args: unknown[]) => void;

function gtag(..._args: unknown[]) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  if (typeof w.gtag === 'function') {
    w.gtag(..._args);
    return;
  }
  // gtag legge l'oggetto arguments, non un array: stessa forma dello snippet di Google
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(arguments);
}

/** Tutti e quattro i segnali di Consent Mode v2, concessi o negati insieme. */
export function updateConsent(granted: boolean) {
  const value = granted ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

/**
 * Eventi del sito. In GA4 vanno segnati come eventi chiave `generate_lead`,
 * `click_phone` e `click_whatsapp`.
 */
export type SiteEvent =
  | { name: 'generate_lead'; params: { form: string; interest?: string } }
  | { name: 'click_phone'; params: { location: string } }
  | { name: 'click_whatsapp'; params: { location: string } }
  | { name: 'click_email'; params: { location: string } };

export function track({ name, params }: SiteEvent) {
  gtag('event', name, params);
}
