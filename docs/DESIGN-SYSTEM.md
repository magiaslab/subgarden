# Design system

Fonte di verità per tutto ciò che è visivo. I token qui sotto sono gli unici valori ammessi nel codice: un colore o un font che non compare in questo file non si usa. Se serve un valore nuovo, si aggiunge prima qui.

> **Stato: v1 approvata da Alessandro (2026-10-21)**, scritta in modalità Design del Magias UI Protocol v0.2. È una specifica, non un'implementazione verificata: i contrasti sono calcolati con la formula WCAG (valori sotto); resa, movimento, tastiera e reflow si provano sul Mac mini quando le pagine sono rifatte. Le decisioni aperte sono in fondo.

## 1. Brand

### Identità

- **Chi è, in una frase:** un installatore toscano di subirrigazione con tecnologia Rain Bird, che porta l'acqua sotto il prato di giardini già fatti senza rovinarli.
- **Tono visivo (3 aggettivi):** concreto, pulito, tecnico. Un'impresa che lavora in cantiere e sa spiegare il perché, non un marchio di lusso.
- **Cosa deve passare in 3 secondi:** l'impianto non si vede, il prato resta intatto, l'acqua va alle radici. Poi: chiedi un sopralluogo.
- **Cosa evitare:**
  - la home da template: titoli centrati in grigio-verde, coppie di card con icona in un quadratino colorato, «Perché sceglierci»;
  - il lusso finto: la parola «lusso» nei testi alternativi, oro, serif sottili;
  - verde ovunque: il giardino è nelle foto, l'interfaccia resta neutra.

### Da dove viene la direzione

**L'idea: la linea sotto il prato.** Il prodotto è invisibile: ali gocciolanti Rain Bird XFS posate a qualche centimetro di profondità, parallele, a passo regolare (33 cm nella scheda del materiale). Quelle linee parallele, che a lavoro finito nessuno vede, diventano il segno grafico del sito:

- un **filetto tratteggiato** (la linea gocciolante, con i punti come gocciolatori) apre i blocchi di fatti e si disegna allo scroll (`data-line`);
- la **sezione del terreno** (prato in alto, linee sotto, radici) è il diagramma che spiega il sistema: si disegna per strati (`data-draw`) invece delle infografiche in PNG;
- la **griglia di posa** vista dall'alto, come nelle foto da drone di Villa Mussio (`DJI_0444.JPG`), torna come trama leggerissima solo dietro i blocchi «come funziona».

**Il secondo segno è il rame.** Rain Bird chiama la protezione dei gocciolatori XFS «Copper Shield»: il rame che il sito già usa (`#b87333`) diventa il colore dell'invito (pulsante «Richiedi un sopralluogo», numeri, marcatori). Due ruoli fissi: **il verde orienta** (link, navigazione, focus), **il rame invita**.

**Le foto vere sono il cantiere di Villa Mussio** (18 foto in `public/villa-mussio`, il nome si può citare): terra lavorata, ulivi, drone durante la posa, e poi il prato finito con staccionata e cipressi. È la prova del lavoro e ha un posto suo (caso studio con la striscia del cantiere). Le illustrazioni generate (`Gemini_Generated_*`, prima/dopo, infografiche) **restano**: sono state create apposta per SUBGarden e raccontano il sistema; non si presentano come foto di cantiere.

### Colori del sito attuale: cosa si tiene e perché

| Colore attuale | Decisione | Motivo |
|---|---|---|
| Verde petrolio `#2f5848` | **Si tiene** come colore di marca (`prato-700`): titoli, link, fondo delle fasce scure | 7,26:1 sulla carta, 8,04:1 sotto testo bianco: regge tutto |
| Rame `#b87333` | **Si tiene** per pulsanti e marcatori, **mai come testo piccolo** (3,42:1 sulla carta); sul pulsante il testo è inchiostro (4,19:1, solo grassetto ≥ 18,66 px) o si usa il rame scuro `#8a5220` con testo bianco (6,35:1) | È il Copper Shield, l'unico colore con una storia vera |
| Blu del logo `#2090b0` | **Solo nel logo e nell'acqua dei diagrammi**; per testo la versione `#176f8a` (5,15:1) | Insufficiente come testo (3,34:1); l'acqua nei diagrammi è blu, il resto no |
| Verde del logo `#587828` | **Solo nel logo e nell'erba dei diagrammi** | Due verdi in interfaccia si confondono |
| Grigio pietra `#a39384` | **Si toglie dal testo** (2,68:1); resta per filetti e bordi | Il grigio chiaro sui testi di oggi è illeggibile |
| Grigio-verde chiaro dei titoli | **Si toglie** | I titoli tornano a pieno contrasto |

## 2. Token

Due livelli: i **primitivi** (`prato-700`, `rame-500`) non si usano nei componenti; i **semantici** (`surface`, `ink`, `brand`, `cta`) sono gli unici ammessi nel codice.

### Primitivi

| Token | Hex | Uso |
|---|---|---|
| `carta-50` | `#f6f3ec` | fondo pagina (terra chiara, non bianco ottico) |
| `carta-100` | `#ece6da` | fondo delle sezioni alternate |
| `bianco` | `#ffffff` | superfici sopra la carta (form, schede) |
| `inchiostro-900` | `#1c2420` | testo principale (14,33:1 sulla carta) |
| `inchiostro-600` | `#4a534e` | testo secondario |
| `pietra-400` | `#a39384` | filetti, bordi, mai testo |
| `prato-700` | `#2f5848` | marca |
| `prato-900` | `#1f3d32` | fondo scuro, hover del verde |
| `rame-500` | `#c47a36` | pulsante principale, marcatori (il `#b87333` di prima, appena schiarito: con il testo inchiostro passa da 4,19:1 a 4,68:1, verificato con axe il 2026-10-21) |
| `rame-700` | `#8a5220` | testo in rame, hover del pulsante |
| `acqua-500` | `#2090b0` | solo diagrammi e logo |
| `acqua-700` | `#176f8a` | stato informativo |
| `erba-500` | `#587828` | solo diagrammi e logo |

### Semantici

| Token | Valore | Note |
|---|---|---|
| `surface` | `carta-50` | |
| `surface-alt` | `carta-100` | |
| `surface-raised` | `bianco` | |
| `surface-inverse` | `prato-900` | fasce scure, footer |
| `ink` | `inchiostro-900` | |
| `ink-muted` | `inchiostro-600` | 7,4:1 circa sulla carta |
| `ink-inverse` | `carta-50` | |
| `brand` | `prato-700` | link, navigazione, titoli in evidenza |
| `cta` | `rame-500` | fondo del pulsante principale, testo `ink` |
| `cta-hover` | `rame-700` | con testo `ink-inverse` |
| `line` | `pietra-400` | filetti decorativi e bordi non informativi |
| `line-strong` | `inchiostro-600` | bordi dei campi (≥ 3:1) |
| `focus` | `acqua-700` | anello di focus, 2 px con offset 2 px |
| `danger` | `#a3261b` | errori dei form |

### Tipografia

- **Titoli: Archivo**, variabile con asse di larghezza; titoli grandi in **semi-condensato (wdth 87) e peso 700**. Il logo è un bastone condensato in grassetto: Archivo stretto gli fa eco senza imitarlo, e regge sia l'italiano sia i composti tedeschi lunghi (`Unterflurbewässerung`) senza spezzare le righe.
- **Testo: Inter** (già in uso), 17 px da `md`, interlinea 1,6, misura massima 68 caratteri.
- **Numeri e dati tecnici** (1,6 l/h, 33 cm, 70%): Archivo con cifre tabulari.
- Si toglie Montserrat.

Ruoli (classi `type-*`, scala fluida con `clamp`): `type-display` (hero), `type-h1`, `type-h2`, `type-h3`, `type-lead`, `type-body`, `type-small`, `type-ui` (pulsanti e menu), `type-eyebrow` (maiuscoletto spaziato, mai più di 3 parole), `type-data` (numeri).

### Spazi, raggi, ombre

- Scala a 4 px; sezioni `py-24` da `lg`, `py-16` sotto.
- Raggi: `2px` sui controlli, `6px` su immagini e schede. Niente card da 24 px arrotondate.
- Ombre: nessuna sulle schede (si separa con il fondo e i filetti); solo i popover hanno un'ombra.

## 3. Componenti

- **Pulsanti:** principale in rame (un solo principale per vista: «Richiedi un sopralluogo»), secondario con bordo verde, link con sottolineatura. Altezza minima 44 px.
- **Header:** logo a colori su carta; sull'hero video il logo bianco. Menu mobile a pannello (Radix Dialog), lingue in un menu shadcn.
- **Hero:** video esistente con velatura verde scuro a gradiente; H1 con la promessa («Subirrigazione per giardini già fatti»), «SUBGarden» resta nel logo.
- **Fatti in fila** al posto delle coppie di card: tre o quattro dati sulla linea tratteggiata (70% di acqua in meno, prato intatto, 1,6 l/h, Rain Bird XFS).
- **Sezione del terreno:** SVG inline in sostituzione delle infografiche PNG (testo nell'HTML, quindi leggibile anche da Google e dagli assistenti AI).
- **Prima e dopo:** il confronto esistente con le illustrazioni create per SUBGarden, con cursore accessibile da tastiera.
- **Caso Villa Mussio:** striscia orizzontale con le foto vere del cantiere e del drone, dal terreno lavorato al prato finito.
- **Form contatti:** campi con shadcn adattati ai token (Input, Textarea, Select, Checkbox), **nessun controllo di sistema** (regola ESLint `no-restricted-syntax` come Tenuta Merlò).
- **FAQ:** `details` stilizzati, con schema FAQPage.
- **WhatsApp:** resta, più piccolo, sopra il bordo in basso a destra, e sparisce mentre si scrive nel form.

## 4. Movimento

Stesso impianto di Villa Tramonto e Tenuta Merlò: **GSAP + ScrollTrigger + SplitText**, montati una volta nel layout (`ScrollMotion`) e **Lenis** agganciato al ticker di GSAP (`SmoothScroll`). Le sezioni restano componenti server e chiedono gli effetti con attributi `data-*`.

Vocabolario:

- automatico: blocchi che entrano quando il loro bordo alto arriva all'88% dello schermo; titoli h2 riga per riga con maschera; immagini che si aprono come un sipario;
- `data-line`: la linea gocciolante che si disegna da sinistra, con i gocciolatori che compaiono uno dopo l'altro;
- `data-draw`: la sezione del terreno che si disegna per strati (terra, linee, acqua che sale alle radici, prato);
- `data-count`: i numeri che contano fino al valore (il valore vero è nell'HTML fin dall'inizio);
- `data-parallax`, `data-zoom`: per le foto grandi;
- `data-horizontal` + `data-track`: la striscia del cantiere che scorre di lato da `lg`;
- `data-no-motion`: esclude l'hero (è l'LCP) e i dialog.

Regole: ciò che è visibile al caricamento non si anima; lo stato iniziale lo imposta GSAP, mai il CSS, quindi senza JavaScript tutto è visibile; con «riduci movimento» GSAP e Lenis non vengono scaricati; Lenis solo con puntatore fine (il tocco resta nativo), si ferma quando un dialog blocca la pagina. Lerp 0,11 come Villa Tramonto.

Si toglie `framer-motion`: tutte le animazioni passano da GSAP.

## 5. Immagini

- Gli originali in `public/` arrivano a 38 MB e 8000 px. Si preparano **una volta** varianti WebP/AVIF alle misure usate (`scripts/prepara-immagini.mjs`, sharp già nel progetto), salvate in `public/img/` e servite senza l'ottimizzazione a pagamento di Vercel; gli originali escono da `public/` (restano in `doc/materiali`).
- Foto vere del cantiere dove si parla di lavori fatti; illustrazioni create per SUBGarden dove si spiega il sistema; stock solo di contorno.
- Testi alternativi descrittivi e veri («Prato finito a Villa Mussio, con staccionata in legno e cipressi»), mai «lusso».

## 6. Prove previste sull'implementazione

Contrasti ricalcolati sui token finali; axe-core e tastiera su home, soluzione, contatti; reflow a 320 px; `prefers-reduced-motion`; pagina senza JavaScript; Lighthouse mobile (LCP dell'hero); build sul Mac mini.

## 7. Decisioni (2026-10-21)

1. Archivo al posto di Montserrat: **sì**.
2. Immagini generate con l'AI: **restano**, sono state create apposta e sono in contesto.
3. Villa Mussio: **si può nominare**.
