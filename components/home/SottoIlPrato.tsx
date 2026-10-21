'use client';

import { useEffect, useRef, useState } from 'react';
import { dopoPrimoGesto, risparmioDati, webglDisponibile } from '@/lib/three/webgl';
import { cn } from '@/lib/utils/cn';

export type Passo = { label: string; text: string };
type Api = { progresso: (p: number) => void; ridimensiona: () => void; distruggi: () => void };

/*
 * Il «come funziona» in 3D (three.js, stesso impianto della demo Laviosa): una zolla di
 * terreno che diventa trasparente e mostra ali gocciolanti, acqua e radici, guidata dallo
 * scroll. La sezione si blocca per quattro passi e il testo cambia con la scena.
 *
 * Senza JavaScript, senza WebGL, con «riduci movimento» o in risparmio dati resta il
 * contenuto di `children` (lo spaccato SVG con la legenda): stesse informazioni.
 * three.js si scarica solo quando la sezione è vicina e dopo il primo gesto della persona.
 */
export function SottoIlPrato({
  passi,
  etichetta,
  children,
}: {
  passi: Passo[];
  /** Descrizione della scena per chi non la vede (aria-label della sezione). */
  etichetta: string;
  children: React.ReactNode;
}) {
  const storia = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLDivElement>(null);
  const [viva, setViva] = useState(false);
  const [attivo, setAttivo] = useState(0);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches || !webglDisponibile() || risparmioDati()) return;
    let api: Api | null = null;
    let trigger: { kill: () => void; progress: number } | null = null;
    let annullato = false;
    const stretto = window.matchMedia('(max-width: 64rem)').matches;
    const n = passi.length;

    const avvia = async () => {
      setViva(true);
      const [{ gsap }, { ScrollTrigger }, { creaPrato }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('@/lib/three/scena-prato'),
      ]);
      if (annullato) return;
      gsap.registerPlugin(ScrollTrigger);
      // si aspetta che React monti la tela con le sue misure vere: creata a misura zero
      // la scena resterebbe 300×150 px stirata
      for (let i = 0; i < 60 && !tela.current?.clientWidth; i++) await new Promise((r) => requestAnimationFrame(() => r(null)));
      const el = tela.current;
      if (annullato || !el) return;
      api = creaPrato(el, stretto);
      if (!api) {
        setViva(false);
        return;
      }
      api.ridimensiona();
      misura.observe(el);
      const segui = (p: number) => {
        setAttivo(Math.min(n - 1, Math.floor(p * n)));
        api?.progresso(p);
      };
      const st = ScrollTrigger.create({
        trigger: storia.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => segui(self.progress),
      });
      trigger = st;
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 });
      ScrollTrigger.refresh();
      // si arriva già dentro la sezione: la scena parte dal punto giusto
      requestAnimationFrame(() => {
        if (annullato) return;
        ScrollTrigger.update();
        segui(st.progress);
      });
    };

    const misura = new ResizeObserver(() => api?.ridimensiona());
    let stacca = () => {};
    const vicino = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        vicino.disconnect();
        stacca = dopoPrimoGesto(() => void avvia());
      },
      { rootMargin: '150% 0px' },
    );
    if (storia.current) vicino.observe(storia.current);
    return () => {
      annullato = true;
      vicino.disconnect();
      stacca();
      misura.disconnect();
      trigger?.kill();
      api?.distruggi();
    };
  }, [passi.length]);

  return (
    <div ref={storia} className={cn('relative', viva && 'mt-10')} style={viva ? { height: `${passi.length * 100 + 40}svh` } : undefined}>
      {!viva && children}
      {viva && (
        // Una colonna: in alto il passo, sotto la scena a tutta larghezza. La fascia resta
        // sotto l'header fisso (h-18 / lg:h-20), non dietro.
        <div data-no-motion className="sticky top-18 flex h-[calc(100svh-4.5rem)] flex-col lg:top-20 lg:h-[calc(100svh-5rem)]">
          <div className="relative shrink-0 pt-5 lg:pt-8">
            <ol className="grid">
              {passi.map((p, i) => (
                <li
                  key={p.label}
                  aria-current={i === attivo ? 'step' : undefined}
                  className={cn(
                    '[grid-area:1/1] grid gap-x-10 gap-y-2 transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] lg:grid-cols-[minmax(0,20rem)_minmax(0,36rem)] lg:items-end',
                    i === attivo ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
                  )}
                >
                  <div>
                    <p className="type-eyebrow flex items-center gap-3 text-brand">
                      <span aria-hidden className="inline-block h-px w-8 bg-cta" />
                      {String(i + 1).padStart(2, '0')} / {String(passi.length).padStart(2, '0')}
                    </p>
                    <p className="type-h3 mt-3 text-ink">{p.label}</p>
                  </div>
                  <p className="type-body text-ink-muted">{p.text}</p>
                </li>
              ))}
            </ol>
            <div aria-hidden className="mt-5 flex gap-2 lg:mt-6">
              {passi.map((p, i) => (
                <span key={p.label} className={cn('h-1 flex-1 rounded-full transition-colors duration-500', i <= attivo ? 'bg-water' : 'bg-line/50')} />
              ))}
            </div>
          </div>
          <div
            ref={tela}
            role="img"
            aria-label={etichetta}
            className="relative min-h-0 flex-1 [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:size-full"
          />
        </div>
      )}
    </div>
  );
}
