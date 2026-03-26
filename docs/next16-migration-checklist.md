# Next 16 Migration Checklist

## Obiettivo
Migrare in sicurezza da Next 15 a Next 16 riducendo regressioni SEO e routing i18n.

## Step 1 - Preparazione
- Verificare branch dedicata: `chore/next16-migration-seo-fixes`
- Eseguire backup lockfile
- Confermare ambiente con `NEXT_PUBLIC_SITE_URL` coerente (host canonico)

## Step 2 - Aggiornamento dipendenze
- Aggiornare `next`, `react`, `react-dom` alla versione target
- Allineare `eslint-config-next` alla stessa major di `next`
- Aggiornare tipi React/Node se necessario

## Step 3 - Codemod ufficiali
- Eseguire `npx @next/codemod@latest next-async-request-api .`
- Verificare eventuali fix su `params`, `searchParams`, `cookies`, `headers`

## Step 4 - Middleware / Proxy
- Validare comportamento i18n su route tradotte
- Confermare redirect canonical host e correzione URL doppio-locale

## Step 5 - SEO tecnico
- Verificare canonical e hreflang per tutte le pagine localizzate
- Controllare `sitemap.xml` e `robots.txt`
- Eseguire test su URL in Search Console (live test)

## Step 6 - QA e rilascio
- `npm run lint`
- `npm run build`
- Smoke test manuale su it/en/de:
  - home
  - tecnologia/technology/technologie
  - soluzioni/solutions/loesungen
  - privacy/datenschutz
  - contatti/contact/kontakt
