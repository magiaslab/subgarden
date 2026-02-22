# Blog – come aggiungere un articolo

Ogni articolo è un file **Markdown (`.md`)** in questa cartella.

## Frontmatter (obbligatorio)

All’inizio del file, tra due righe `---`, inserisci:

```yaml
---
title: "Titolo dell'articolo"
description: "Breve descrizione per l'anteprima e per la ricerca (SEO)."
date: "2025-02-22"
slug: "url-dell-articolo"
image: "/nome-file-copertina.jpg"
---
```

- **image:** (opzionale) percorso dell’immagine di copertina nella lista blog (es. `/stunning-spring-collage.jpg`). Se manca, viene usata un’immagine predefinita.

- **slug:** usato nell’URL (`/blog/slug`). Solo lettere minuscole, numeri e trattini. Deve essere uguale al nome del file senza `.md` (es. file `risparmio-idrico.md` → slug `risparmio-idrico`).

## Corpo

Sotto il frontmatter scrivi il testo in **Markdown**:

- **Grassetto** con `**testo**`
- *Corsivo* con `*testo*`
- Titoli con `## Titolo` e `### Sottotitolo`
- Elenchi con `-` o `1.`
- Link: `[testo del link](/contatti)` per pagine del sito, `[testo](https://...)` per link esterni

I link interni (es. `/contatti`) vengono gestiti correttamente con la lingua attiva.

## Esempio

Vedi il file `subirrigazione-cose-e-come-funziona.md` in questa cartella.
