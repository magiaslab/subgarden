# SEO, analytics e messa online – SUBGarden

## Key e variabili d’ambiente necessarie


| Variabile                       | Uso                                                               | Obbligatoria                   |
| ------------------------------- | ----------------------------------------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_SITE_URL`          | URL canonico (es. `https://subgarden.it`)                         | Sì                             |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (es. `G-XXXXXXXXXX`)                           | No (consigliata)               |
| `NEXT_PUBLIC_GTM_ID`            | Google Tag Manager (es. `GTM-XXXXXXX`) – alternativo a GA diretto | No                             |
| `RESEND_API_KEY`                | Invio email dal form contatti (Resend)                            | No (form attualmente simulato) |
| `SUB_READ_WRITE_TOKEN`          | Upload Vercel Blob (opzionale)                                    | No                             |
| `NEXT_PUBLIC_HOME_VIDEO_URL`    | Video in home (opzionale)                                         | No                             |
| `NEXT_PUBLIC_EXPLANATORY_VIDEO_URL` | Video “Scopri SUBGarden” (home e pagina Tecnologia se non impostato il dedicato) | No |
| `NEXT_PUBLIC_TECHNOLOGY_VIDEO_URL` | Video solo in pagina Tecnologia (opzionale; se vuoto si usa EXPLANATORY) | No |

**Video da Vercel Blob:** dopo aver caricato il file nello storage, copia l’**URL pubblico** (es. `https://xxx.public.blob.vercel-storage.com/nome.mp4`) nel valore della variabile. Le variabili `NEXT_PUBLIC_*` vengono incluse nel build: **dopo averle aggiunte o modificate in Vercel → Settings → Environment Variables è necessario un nuovo Deploy** perché il video compaia.

**Nota:** Search Console non richiede una key nel codice: si usa solo la verifica del sito (meta tag o DNS).

**Canonical e hreflang (avviso Lighthouse):** Il tag `rel=canonical` e i link `hreflang` sono generati a partire da `NEXT_PUBLIC_SITE_URL`. Per evitare l’avviso “Il documento non ha un valore rel=canonical valido”:

- Imposta `NEXT_PUBLIC_SITE_URL` **esattamente** come gli utenti vedono il sito: se il sito è raggiungibile con **www** (es. `https://www.subgarden.it`), usa `https://www.subgarden.it`; se è senza www (`https://subgarden.it`), usa quello.
- In questo modo il canonical e gli hreflang coincidono con l’URL della pagina e Lighthouse non segnala conflitti. Dopo aver cambiato la variabile, esegui un nuovo deploy.

---

## Piattaforme da attivare (consigliate)

1. **Google Search Console**
  - A cosa serve: indicizzazione, query di ricerca, errori, sitemap.  
  - Cosa fare: aggiungi la proprietà per `https://subgarden.it`, verifica con meta tag HTML (o DNS). Invia la sitemap: `https://subgarden.it/sitemap.xml`.  
  - Nessuna variabile in `.env`.
2. **Google Analytics 4 (GA4)**
  - A cosa serve: visite, pagine, eventi, conversioni (es. invio form).  
  - Cosa fare: crea una proprietà GA4, copia il Measurement ID (G-…) e impostalo in `NEXT_PUBLIC_GA_MEASUREMENT_ID`.  
  - Lo script viene caricato solo dopo accettazione cookie (banner allineato).
3. **Google Tag Manager (GTM)** – opzionale
  - A cosa serve: gestire GA4, conversioni, tag di terze parti da un unico container.  
  - Cosa fare: crea un container, prendi l’ID (GTM-…) e impostalo in `NEXT_PUBLIC_GTM_ID`. Se usi GTM, in genere non serve anche `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA si configura dentro GTM).  
  - Lo script viene caricato solo dopo accettazione cookie.
4. **PageSpeed Insights / Core Web Vitals**
  - Non è una “piattaforma da attivare”: è uno strumento di misura.  
  - Search Console già mostra Core Web Vitals (dati da Chrome UX Report).  
  - Opzionale: Vercel Analytics (se hosti su Vercel) per Web Vitals in dashboard.
5. **Vercel Analytics** (se il sito è su Vercel)
  - Web Vitals e analisi base. Si attiva dal progetto Vercel; nessuna key in `.env` per la versione base.

---

## Banner cookie e servizi

Il banner è allineato a:

- **Accetta tutto:** caricamento di Google Analytics (e/o GTM se configurato). Cookie tecnici sempre attivi (necessari al sito).
- **Solo necessari:** nessuno script Analytics/GTM; nessun cookie di statistica o marketing.

Testi del banner (in `messages/*.json` sotto `cookie`) descrivono l’uso di cookie tecnici e statistiche (Analytics). Se in futuro aggiungi altri servizi (es. Facebook Pixel), va aggiornata la descrizione e la logica di caricamento degli script.

---

## Form contatti – opzioni

1. **Resend** (già previsto in `.env.example`)
  - Pro: API moderna, facile con Next.js, email affidabili, piano gratuito generoso.  
  - Cosa fare: crea account su resend.com, ottieni API Key, imposta `RESEND_API_KEY`. L’action `app/actions/contact.ts` può inviare l’email a te (o a un indirizzo configurato).
2. **Formspree**
  - Pro: nessun backend; invii il form a un endpoint Formspree che ti manda le email.  
  - Contro: il form deve fare POST a Formspree (puoi usare action che inoltra a Formspree o sostituire con un form che invia direttamente lì).
3. **Web3Forms / Getform**
  - Simili a Formspree: endpoint esterno che riceve il submit e ti notifica.

**Consiglio:** usare **Resend** con `RESEND_API_KEY` e completare l’integrazione in `app/actions/contact.ts` (invio a un indirizzo email da te scelto, magari da variabile d’ambiente).

---

## Checklist pre-lancio

- Impostare `NEXT_PUBLIC_SITE_URL` in produzione (es. `https://subgarden.it`).
- Verificare il sito in Google Search Console e inviare `sitemap.xml`.
- (Opzionale) Impostare `NEXT_PUBLIC_GA_MEASUREMENT_ID` e verificare che le visite compaiano in GA4 dopo aver accettato i cookie.
- (Opzionale) Configurare Resend e `RESEND_API_KEY` e testare l’invio dal form contatti.
- Controllare che tutte le pagine importanti siano in sitemap e che i meta title/description siano coerenti.
- Testare il banner cookie: “Solo necessari” = nessun script Analytics; “Accetta tutto” = script caricato e cookie impostati.

