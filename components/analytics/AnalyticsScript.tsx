'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-90W053H7SQ';
// Solo se impostato: se non c’è GTM, viene caricato il tag GA diretto (così Google lo rileva).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Con GTM impostato usi GA dentro GTM; altrimenti carichiamo gtag.js con GA_ID.
const useGADirect = !!GA_ID && !GTM_ID;

// Il tag è sempre presente in pagina (così Google lo rileva), ma con Consent Mode
// i dati non vengono inviati finché l'utente non accetta i cookie.
export function AnalyticsScript() {
  useEffect(() => {
    const grantConsent = () => {
      const payload = { analytics_storage: 'granted', ad_storage: 'granted' };
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('consent', 'update', payload);
      } else {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(['consent', 'update', payload]);
      }
    };
    const onConsentUpdate = (e: Event) => {
      if ((e as CustomEvent).detail === 'accepted') grantConsent();
    };
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      grantConsent();
    }
    window.addEventListener('cookie-consent-update', onConsentUpdate);
    return () => window.removeEventListener('cookie-consent-update', onConsentUpdate);
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
              gtag('js', new Date());
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                wait_for_update: 500
              });
              gtag('config', '${GA_ID}', { anonymize_ip: true });
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
