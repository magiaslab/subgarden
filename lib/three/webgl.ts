// Controlli comuni alle scene three.js (stesso impianto della demo Laviosa).

export function webglDisponibile() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Rete lenta o «risparmio dati»: niente 3D. */
export function risparmioDati() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)2g$/.test(c.effectiveType ?? ''));
}

/** Gira il ciclo di disegno solo quando la tela è a schermo e la scheda è visibile. */
export function cicloVisibile(el: Element, disegna: (t: number) => void) {
  let visibile = false;
  let raf = 0;
  const t0 = performance.now();
  const giro = () => {
    raf = 0;
    if (!visibile || document.hidden) return;
    disegna((performance.now() - t0) / 1000);
    raf = requestAnimationFrame(giro);
  };
  const avvia = () => {
    if (!raf && visibile && !document.hidden) raf = requestAnimationFrame(giro);
  };
  const io = new IntersectionObserver(
    ([e]) => {
      visibile = e.isIntersecting;
      avvia();
    },
    { rootMargin: '120px' },
  );
  io.observe(el);
  document.addEventListener('visibilitychange', avvia);
  return {
    /** un disegno singolo, per quando lo scroll cambia la scena ma il ciclo è fermo */
    una: () => disegna((performance.now() - t0) / 1000),
    ferma: () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', avvia);
      if (raf) cancelAnimationFrame(raf);
    },
  };
}

let gestoFatto = false;
/**
 * Esegue fn al primo gesto della persona (mouse, tocco, tastiera, rotella, scroll), oppure
 * subito se c'è già stato: chi guarda il sito vede la scena appena si muove, mentre il
 * caricamento della pagina resta leggero (e i test automatici misurano la pagina vera).
 */
export function dopoPrimoGesto(fn: () => void) {
  if (gestoFatto) {
    fn();
    return () => {};
  }
  const eventi = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;
  const via = () => eventi.forEach((e) => window.removeEventListener(e, parti));
  const parti = () => {
    gestoFatto = true;
    via();
    fn();
  };
  eventi.forEach((e) => window.addEventListener(e, parti, { passive: true, once: true }));
  return via;
}
