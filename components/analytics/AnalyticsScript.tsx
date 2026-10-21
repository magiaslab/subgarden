'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { track, updateConsent } from '@/lib/analytics';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-90W053H7SQ';
// Solo se impostato: se non c’è GTM, viene caricato il tag GA diretto (così Google lo rileva).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Tag gtag (GA4) sempre caricato se c'è GA_ID, così Google lo rileva. Se usi GTM, non aggiungere GA4 nel container per evitare doppio invio.
const useGADirect = !!GA_ID;

// Dove sta il link cliccato, per distinguere header, footer, pagina contatti e widget.
function locationOf(el: Element): string {
  const zone = el.closest('[data-track-location], header, footer, main');
  if (!zone) return 'page';
  return zone.getAttribute('data-track-location') || zone.tagName.toLowerCase();
}

// Il tag è sempre presente in pagina (così Google lo rileva), ma con Consent Mode v2
// i dati non vengono inviati finché l'utente non accetta i cookie.
export function AnalyticsScript() {
  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      updateConsent(true);
    }
    const onConsentUpdate = (e: Event) => {
      updateConsent((e as CustomEvent).detail === 'accepted');
    };
    window.addEventListener('cookie-consent-update', onConsentUpdate);

    // Un solo ascoltatore per tutti i link di contatto del sito: telefono, WhatsApp, email.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const location = locationOf(link);
      if (href.startsWith('tel:')) track({ name: 'click_phone', params: { location } });
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) track({ name: 'click_whatsapp', params: { location } });
      else if (href.startsWith('mailto:')) track({ name: 'click_email', params: { location } });
    };
    document.addEventListener('click', onClick, { capture: true });

    return () => {
      window.removeEventListener('cookie-consent-update', onConsentUpdate);
      document.removeEventListener('click', onClick, { capture: true });
    };
  }, []);

  return (
    <>
      {useGADirect && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}
    </>
  );
}
