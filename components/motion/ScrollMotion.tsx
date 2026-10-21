// Client: coreografia di scroll con GSAP su tutte le pagine, caricata dopo l'idratazione.
// Stesso impianto di Villa Tramonto e Tenuta Merlò (docs/DESIGN-SYSTEM.md § 4).
"use client";

import { useEffect } from "react";
import { usePathname } from "@/lib/i18n/routing";

/*
 * Montato una volta nel layout. A ogni pagina cerca da solo i blocchi di contenuto in
 * <main> e nel footer e li anima quando entrano nello schermo. Le sezioni restano
 * componenti server: gli effetti si chiedono con attributi data-*.
 *
 * Automatico, senza attributi
 * - blocchi (paragrafi, voci di lista e card, figure, FAQ, form, citazioni, pulsanti):
 *   si anima il più esterno di ogni gruppo, quando il SUO bordo alto arriva all'88%;
 * - titoli h2: riga per riga, con maschera (SplitText);
 * - foto incorniciate (.rounded-media): si aprono dal centro come un sipario;
 * - foto ritagliate da un riquadro: si assestano da uno zoom mentre si scorre.
 *
 * Dichiarato
 * - data-reveal          entra come un blocco;
 * - data-split           titolo riga per riga anche se non è un h2;
 * - data-line            la linea gocciolante: si scopre da sinistra, poi compaiono i
 *                        gocciolatori ([data-drop]) uno dopo l'altro;
 * - data-draw            su un <svg> (lo spaccato del terreno): prima si disegnano i
 *                        tratti [data-stroke], poi compaiono gli strati [data-layer]
 *                        nell'ordine del documento;
 * - data-count="70"      il numero conta fino al valore (che è già nell'HTML: senza
 *                        JavaScript si legge il valore vero); data-prefix/data-suffix;
 * - data-parallax="0.12" l'immagine scorre più lenta del riquadro;
 * - data-zoom="0.16"     zoom che si assesta;
 * - data-velo            il riquadro si scopre dal basso, legato allo scroll;
 * - data-expand          foto che entra con i margini e si allarga ai bordi (da md);
 * - data-horizontal + data-track: da lg la sezione si blocca e la traccia scorre di lato;
 * - data-no-motion       esclude un ramo (l'hero, che è l'LCP, e i dialog).
 *
 * Regole: ciò che è già visibile al caricamento non si anima (niente lampi, niente LCP
 * ritardato); lo stato iniziale lo imposta GSAP, mai il CSS, quindi senza JavaScript
 * tutto è visibile; con «riduci movimento» GSAP non viene nemmeno scaricato.
 */

const BLOCKS = [
  "p",
  "li",
  "figure",
  "details",
  "blockquote",
  "dl",
  "form",
  "table",
  "h3",
  "[data-reveal]",
  // Pulsanti e link-pulsante del sito (components/button.tsx).
  ":is(a, button).inline-flex.type-ui",
].join(",");

const START = "top 88%";

export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      // SplitText misura le righe con il carattere definitivo.
      await document.fonts.ready;
      if (cancelled) return;

      // <main> della pagina e il footer del sito (non i <footer> interni alle pagine).
      const scopes = [...document.querySelectorAll<HTMLElement>("main, footer")].filter((el) => !el.parentElement?.closest("main"));
      const excluded = (el: Element) => Boolean(el.closest("[data-no-motion], [data-radix-popper-content-wrapper], [role=dialog]"));
      const stickyHeader = () => {
        const header = document.querySelector<HTMLElement>("[data-site-header]");
        const position = header ? getComputedStyle(header).position : "";
        return header && (position === "sticky" || position === "fixed") ? header.offsetHeight : 0;
      };
      // Stessa altezza che usa ScrollTrigger (sui telefoni diversa da innerHeight).
      const viewportHeight = () => document.documentElement.clientHeight;
      const inViewAtLoad = (el: Element) => el.getBoundingClientRect().top < viewportHeight() * 0.88;
      const inScopes = (selector: string) => {
        const found = new Set<HTMLElement>();
        for (const scope of scopes) scope.querySelectorAll<HTMLElement>(selector).forEach((el) => !excluded(el) && found.add(el));
        return [...found];
      };

      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 64rem)" }, (context) => {
        const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        // --- Striscia orizzontale bloccata (solo da lg) -----------------------------
        // Per prima: il pin aggiunge spazio di scorrimento, e i trigger creati dopo
        // devono calcolare la loro posizione tenendone conto. Sotto lg il gesto
        // orizzontale è già nativo: rubare lo scroll verticale renderebbe la pagina
        // inusabile su un telefono.
        if (desktop) {
          inScopes("[data-horizontal]").forEach((section) => {
            const track = section.querySelector<HTMLElement>("[data-track]");
            if (!track) return;
            const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
            if (distance() === 0) return;
            gsap.set(track, { overflowX: "visible" });
            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                // Sotto l'header fisso, non dietro.
                start: () => `top ${stickyHeader()}px`,
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
          });
        }

        // Posizioni aggiornate con lo spazio del pin prima di calcolare gli altri trigger.
        ScrollTrigger.refresh();

        // --- Titoli riga per riga -------------------------------------------------
        const splitTargets = new Set(inScopes("h2, [data-split]").filter((el) => !inViewAtLoad(el)));
        splitTargets.forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => {
              // La maschera è alta quanto l'interlinea, stretta nei titoli: le discendenti
              // (g, p) restavano tagliate anche ad animazione finita (Casa di Terra,
              // 2026-10-10). Si allarga la maschera e si compensa col margine negativo:
              // la riga non si sposta di un pixel.
              gsap.set(self.masks, { paddingTop: "0.12em", paddingBottom: "0.3em", marginTop: "-0.12em", marginBottom: "-0.3em" });
              return gsap.from(self.lines, {
                // Più di 110: la maschera ora scende di 0,3em sotto la riga.
                yPercent: 140,
                duration: 1.1,
                ease: "power4.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: START, once: true },
              });
            },
          });
        });

        // --- Blocchi: solo il più esterno di ogni gruppo -----------------------------
        const candidates = inScopes(BLOCKS).filter((el) => !splitTargets.has(el) && !el.closest("[data-split]"));
        const set = new Set(candidates);
        const outermost = candidates.filter((el) => {
          for (let p = el.parentElement; p && !scopes.includes(p); p = p.parentElement) {
            if (set.has(p)) return false;
          }
          return !inViewAtLoad(el);
        });
        gsap.set(outermost, { autoAlpha: 0, y: 48 });
        const shown = new Set<Element>();
        const show = (batch: Element[]) => {
          const fresh = batch.filter((el) => !shown.has(el));
          fresh.forEach((el) => shown.add(el));
          // Cascata breve anche quando entrano molti blocchi insieme (le colonne del footer):
          // al massimo mezzo secondo fra il primo e l'ultimo.
          if (fresh.length) {
            gsap.to(fresh, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: { amount: Math.min(0.5, (fresh.length - 1) * 0.08) },
              overwrite: true,
            });
          }
        };
        // Nell'ultima schermata della pagina il bordo alto di un blocco non arriva mai
        // all'88%: quei blocchi (le ultime righe, il footer) partono appena entrano.
        const maxScroll = ScrollTrigger.maxScroll(window);
        const reachable = (el: Element) => el.getBoundingClientRect().top + window.scrollY - viewportHeight() * 0.88 <= maxScroll;
        ScrollTrigger.batch(outermost.filter(reachable), { start: START, once: true, onEnter: show });
        ScrollTrigger.batch(outermost.filter((el) => !reachable(el)), { start: "top 98%", once: true, onEnter: show });
        // Rete di sicurezza: arrivati in fondo, compare tutto ciò che fosse rimasto.
        // Con lo scroll nativo: sui telefoni la barra del browser rende diverse l'altezza
        // della finestra e quella che usa ScrollTrigger.
        const atBottom = () => {
          if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
            show(outermost);
            window.removeEventListener("scroll", atBottom);
          }
        };
        window.addEventListener("scroll", atBottom, { passive: true });

        // --- Velo: il riquadro si scopre dal basso, legato allo scroll ---------------
        const veils = inScopes("[data-velo]").filter((el) => !inViewAtLoad(el));
        veils.forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(20% 0% 0% 0%)", opacity: 0.5 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              ease: "power1.out",
              // A fine entrata il ritaglio si toglie: taglierebbe le ombre del riquadro.
              clearProps: "clipPath",
              scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: 0.6 },
            },
          );
        });

        // --- Foto che si allarga ai bordi ---------------------------------------------
        // Da md: sul telefono la foto è già a tutto schermo e non c'è margine da chiudere.
        if (window.matchMedia("(min-width: 48rem)").matches) {
          inScopes("[data-expand]").forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: "inset(0% 7% 0% 7% round 10px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                ease: "none",
                scrollTrigger: { trigger: el, start: "top 90%", end: "top 25%", scrub: 0.6 },
              },
            );
          });
        }

        // --- Sipario delle foto incorniciate -------------------------------------------
        // Le foto in un riquadro col raggio (non quelle a tutta larghezza, non quelle col
        // velo) si aprono dal centro; lo zoom lento continua dentro.
        inScopes(".rounded-media")
          .filter((frame) => !frame.hasAttribute("data-velo") && frame.querySelector("img") && frame.getBoundingClientRect().height >= 120 && !inViewAtLoad(frame))
          .forEach((frame) => {
            const radius = getComputedStyle(frame).borderRadius || "0px";
            gsap.fromTo(
              frame,
              { clipPath: `inset(12% 10% 12% 10% round ${radius})`, autoAlpha: 0.2 },
              {
                clipPath: `inset(0% 0% 0% 0% round ${radius})`,
                autoAlpha: 1,
                duration: 1.3,
                ease: "power3.out",
                // A fine entrata il clip-path si toglie: taglierebbe l'ombra delle cornici.
                clearProps: "clipPath,opacity,visibility",
                scrollTrigger: { trigger: frame, start: START, once: true },
              },
            );
          });

        // --- Linea gocciolante ------------------------------------------------------
        // Si scopre da sinistra con un ritaglio (non con scaleX, che schiaccerebbe i
        // gocciolatori); poi i gocciolatori compaiono in fila, come l'acqua che esce.
        inScopes("[data-line]").forEach((el) => {
          const drops = [...el.querySelectorAll<SVGElement>("[data-drop]")];
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: START, once: true } });
          if (drops.length) gsap.set(drops, { scale: 0, transformOrigin: "50% 50%" });
          tl.fromTo(
            el,
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power2.inOut", clearProps: "clipPath" },
          );
          if (drops.length) tl.to(drops, { scale: 1, duration: 0.5, ease: "back.out(3)", stagger: 0.05, clearProps: "transform" }, "-=0.9");
        });

        // --- Numeri che contano ----------------------------------------------------
        inScopes("[data-count]")
          .filter((el) => !inViewAtLoad(el))
          .forEach((el) => {
            const target = Number(el.dataset.count);
            if (!Number.isFinite(target)) return;
            const final = el.textContent ?? "";
            const prefix = el.dataset.prefix ?? "";
            const suffix = el.dataset.suffix ?? "";
            const decimals = (el.dataset.count!.split(".")[1] ?? "").length;
            const lang = el.closest("[lang]")?.getAttribute("lang") ?? "it";
            const format = new Intl.NumberFormat(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
            const state = { v: 0 };
            el.textContent = prefix + format.format(0) + suffix;
            gsap.to(state, {
              v: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = prefix + format.format(state.v) + suffix;
              },
              // A fine corsa torna il testo originale, identico a quello del server.
              onComplete: () => {
                el.textContent = final;
              },
              scrollTrigger: { trigger: el, start: START, once: true },
            });
          });

        // --- Spaccato del terreno che si disegna -----------------------------------
        inScopes("svg[data-draw]")
          .filter((svg) => !inViewAtLoad(svg))
          .forEach((svg) => {
            const strokes = [...svg.querySelectorAll<SVGGeometryElement>("[data-stroke]")];
            const layers = [...svg.querySelectorAll<SVGElement>("[data-layer]")];
            const length = (el: SVGGeometryElement) => el.getTotalLength() + 4;
            strokes.forEach((el) => gsap.set(el, { strokeDasharray: length(el), strokeDashoffset: length(el) }));
            gsap.set(layers, { autoAlpha: 0, y: 8 });
            gsap
              .timeline({ scrollTrigger: { trigger: svg, start: START, once: true } })
              .to(strokes, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.08 })
              .to(layers, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.18 }, "-=0.6")
              .set(strokes, { clearProps: "strokeDasharray,strokeDashoffset" });
          });

        // --- Parallasse -------------------------------------------------------------
        inScopes("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 0.12;
          // L'ingrandimento compensa lo spostamento (in entrambe le direzioni, quindi il
          // doppio): senza, si scopre il fondo del riquadro.
          gsap.fromTo(
            el,
            { yPercent: -amount * 100, scale: 1 + amount * 2 },
            {
              yPercent: amount * 100,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        // --- Zoom che si assesta ------------------------------------------------------
        // Dichiarato (data-zoom) o automatico sulle foto ritagliate da un riquadro.
        const zoomed = new Set<HTMLElement>(inScopes("[data-zoom]"));
        inScopes("img").forEach((img) => {
          if (img.hasAttribute("data-parallax")) return;
          // Il riquadro che ritaglia è il genitore o il nonno (quando c'è lo strato dell'hover).
          const frame = [img.parentElement, img.parentElement?.parentElement].find((el) => el && getComputedStyle(el).overflow === "hidden");
          if (frame && frame.getBoundingClientRect().height > 120) zoomed.add(img);
        });
        zoomed.forEach((el) => {
          const amount = Number(el.dataset.zoom) || 0.16;
          gsap.fromTo(
            el,
            { scale: 1 + amount },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el.closest("li, figure, div") ?? el, start: "top bottom", end: "center 55%", scrub: true },
            },
          );
        });

        return () => window.removeEventListener("scroll", atBottom);
      });

      // Font, immagini lazy e righe dei titoli cambiano l'altezza della pagina: quando
      // cambia davvero si ricalcolano i punti di partenza (una volta per frame). Senza il
      // confronto il refresh, che ricrea gli spazi del pin, si rincorrerebbe da solo.
      let frame = 0;
      let lastHeight = document.body.scrollHeight;
      const refresh = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const height = document.body.scrollHeight;
          if (Math.abs(height - lastHeight) < 2) return;
          lastHeight = height;
          ScrollTrigger.refresh();
        });
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(document.body);
      revert = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        mm.revert();
      };
    };

    // Dopo il primo disegno, quando il browser è libero: GSAP non compete con
    // l'idratazione né con l'LCP (come Casa di Terra).
    const idle = typeof window.requestIdleCallback === "function";
    const handle = idle ? window.requestIdleCallback(() => void start()) : window.setTimeout(() => void start(), 200);

    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      revert?.();
    };
  }, [pathname]);

  return null;
}
