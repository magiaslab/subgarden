'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/lib/i18n/routing';
import { ButtonLink } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils/cn';

const LOGO_COLOR = '/SUBGARDEN - LOGO COLORI.png';
const LOGO_WHITE = '/SUBGARDEN - LOGO BIANCO.png';

/*
 * Header fisso. Trasparente con il logo bianco solo sopra l'hero video della home;
 * appena si scorre (o su ogni altra pagina) diventa carta con il logo a colori.
 * Il menu mobile è un pannello a tutto schermo: blocca la pagina (data-scroll-locked,
 * che ferma anche Lenis), si chiude con Esc e riporta il focus sul pulsante.
 */
export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: '/tecnologia', label: t('technology') },
    { href: '/soluzioni', label: t('solutions') },
    { href: '/territorio', label: t('local') },
    { href: '/chi-siamo', label: t('about') },
  ] as const;
  const mobileExtra = [
    { href: '/faq', label: t('faq') },
    { href: '/blog', label: t('blog') },
    { href: '/contatti', label: t('contact') },
  ] as const;

  const isHome = pathname === '/';
  const solid = scrolled || open || !isHome;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.setAttribute('data-scroll-locked', '');
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      // Il focus resta nel pannello
      if (e.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll<HTMLElement>('a, button')];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.removeAttribute('data-scroll-locked');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <header
      data-site-header
      data-no-motion
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300',
        solid ? 'bg-surface/95 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-transparent text-ink-inverse',
      )}
    >
      <a
        href="#contenuto"
        className="type-ui sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-surface focus:px-4 focus:py-3 focus:text-brand"
      >
        {t('skip')}
      </a>
      <div className="container-site flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="relative block h-9 w-[136px] shrink-0 lg:h-10 lg:w-[151px]" aria-label="SUBGarden, home">
          <Image src={solid ? LOGO_COLOR : LOGO_WHITE} alt="" fill sizes="160px" priority className="object-contain object-left" />
        </Link>

        <nav aria-label={t('menu')} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={cn(
                    'type-ui relative inline-flex min-h-11 items-center transition-colors',
                    'after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
                    'aria-[current=page]:after:scale-x-100',
                    solid ? 'text-ink hover:text-brand aria-[current=page]:text-brand' : 'text-ink-inverse/90 hover:text-ink-inverse',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher inverse={!solid} />
          <ButtonLink href="/contatti" size="sm">
            {t('cta')}
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? t('close') : t('menu')}
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
          className="fixed inset-x-0 bottom-0 top-18 overflow-y-auto bg-surface text-ink lg:hidden"
          data-lenis-prevent
        >
          <nav aria-label={t('menu')} className="container-site flex min-h-full flex-col py-8">
            <ul className="divide-y divide-line/50 border-y border-line/50">
              {[...links, ...mobileExtra].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className="type-h3 flex min-h-14 items-center py-3 aria-[current=page]:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-6 pt-10">
              <ButtonLink href="/contatti" size="lg" className="w-full" onClick={() => setOpen(false)}>
                {t('cta')}
              </ButtonLink>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
