// Client: scroll fluido con Lenis, agganciato al ticker di GSAP (stesso impianto di Villa Tramonto e Tenuta Merlò).
"use client";

import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { usePathname } from "@/lib/i18n/routing";

/*
 * Montato una volta nel layout, accanto a ScrollMotion. Lenis interpola la rotella:
 * lo scroll smette di andare a scatti e perni, parallasse e scrub di ScrollMotion
 * leggono la stessa posizione di ciò che si vede (lenis.on("scroll", ScrollTrigger.update)).
 *
 * - Con «riduci movimento» non parte: resta lo scroll del sistema.
 * - Sul tocco resta lo scroll nativo del telefono (default di Lenis): si ammorbidisce
 *   solo la rotella e il trackpad.
 * - Quando Radix blocca la pagina (menu mobile, lightbox, select: attributo
 *   data-scroll-locked sul body) Lenis si ferma; dentro dialog e popover la rotella
 *   muove il pannello, non la pagina.
 * - Le àncore si fermano sotto l'header: Lenis legge scroll-padding-top e
 *   scroll-margin-top già definiti in globals.css e nelle sezioni.
 * - Caricato dopo l'idratazione (import dinamico): non pesa sul primo caricamento.
 */
type LenisInstance = import("lenis").default;
let instance: LenisInstance | null = null;

/** L'istanza attiva, per chi deve spostare la pagina (null con «riduci movimento»). */
export const getLenis = () => instance;

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        // Valore di HDD: sopra si perde il contatto con la rotella, sotto non si sente.
        lerp: 0.11,
        wheelMultiplier: 1,
        anchors: true,
        prevent: (node) => node.closest?.('[data-lenis-prevent], [role="dialog"], [data-radix-popper-content-wrapper]') != null,
      });
      instance = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      // Senza, tornando su una scheda rimasta in secondo piano lo scroll fa un salto.
      gsap.ticker.lagSmoothing(0);

      const syncLock = () => {
        if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
        else lenis.start();
      };
      const observer = new MutationObserver(syncLock);
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked", "style"] });

      cleanup = () => {
        observer.disconnect();
        gsap.ticker.remove(tick);
        lenis.destroy();
        instance = null;
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // Nuova pagina: si riparte dall'alto, subito (con un'àncora ci pensa il browser).
  useEffect(() => {
    if (!window.location.hash) instance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
