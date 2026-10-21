import { SITE_URL } from '@/lib/utils/metadata';

// Riassunto del sito per gli assistenti AI (https://llmstxt.org): fatti verificabili
// presi dalle pagine, con i link alle pagine che li spiegano. Generato al build.
export const dynamic = 'force-static';

const body = `# SUBGarden

> SUBGarden installa impianti di subirrigazione per giardini già esistenti in Toscana: ali gocciolanti Rain Bird XFS posate sotto il prato, che portano l'acqua direttamente alle radici. Marchio di CLOROPHYLLA SRL, San Vincenzo (LI).

- Cos'è: irrigazione a goccia interrata. L'acqua esce sotto la superficie e sale alle radici per capillarità, senza evaporazione e senza ruscellamento.
- Risparmio d'acqua dichiarato: fino al 70% rispetto all'irrigazione a pioggia.
- Posa: metodo brevettato per giardini già fatti, senza scavi che distruggono il manto erboso.
- Materiale: ala gocciolante Rain Bird XFS con Copper Shield, gocciolatori autocompensanti da 1,6 l/h, posata a griglia 300 × 330 mm.
- Il prato resta asciutto in superficie: niente arredi da spostare, meno zanzare, giardino usabile subito dopo l'irrigazione.
- Per: giardini privati, parchi pubblici, campi sportivi, hotel e strutture turistiche.
- Zona: Toscana, in particolare costa livornese, Isola d'Elba, Maremma e Livorno.
- Contatti: info@subgarden.it, +39 347 6299935, Via Pitagora 3, 57027 San Vincenzo (LI). Sopralluogo gratuito su richiesta.

## Pagine principali

- [Home](${SITE_URL}/it): cos'è la subirrigazione SUBGarden e perché conviene
- [Tecnologia](${SITE_URL}/it/tecnologia): ala gocciolante Rain Bird XFS, schema di posa, funzionamento
- [Soluzioni](${SITE_URL}/it/soluzioni): giardini residenziali, parchi pubblici, campi sportivi, strutture turistiche
- [Territorio](${SITE_URL}/it/territorio): Isola d'Elba, Maremma, Livorno
- [Domande frequenti](${SITE_URL}/it/faq): costi, posa, manutenzione, risparmio
- [Chi siamo](${SITE_URL}/it/chi-siamo): la storia di SUBGarden, dal 1990 tra piante e giardini
- [Contatti](${SITE_URL}/it/contatti): richiesta di sopralluogo

## Approfondimenti

- [Subirrigazione: cos'è e come funziona](${SITE_URL}/it/blog/subirrigazione-cose-e-come-funziona)
- [Risparmio idrico in giardino](${SITE_URL}/it/blog/risparmio-idrico-giardino)

## Altre lingue

- [English](${SITE_URL}/en)
- [Deutsch](${SITE_URL}/de)
`;

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
