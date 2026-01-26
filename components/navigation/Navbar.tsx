'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function Navbar() {
  const t = (useTranslations as any)('nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/chi-siamo', label: t('about') },
    { href: '/tecnologia', label: t('technology') },
    { href: '/soluzioni', label: t('solutions') },
    { href: '/territorio', label: t('local') },
    { href: '/#contact' as any, label: t('contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (typeof href === 'string' && href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  // Determina se la pagina corrente richiede una navbar inizialmente trasparente (solo la Home)
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // La navbar è opaca se: abbiamo scrollato, il menu mobile è aperto, o NON siamo in home page
  const shouldBeOpaque = isScrolled || isMobileMenuOpen || !isHomePage;

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: shouldBeOpaque ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: shouldBeOpaque ? 'blur(10px)' : 'none',
      }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        shouldBeOpaque && 'shadow-md'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-40 h-12">
              <Image
                src={shouldBeOpaque ? "/SUBGARDEN - LOGO COLORI.png" : "/SUBGARDEN - LOGO BIANCO.png"}
                alt="SUBGarden Logo"
                fill
                className="object-contain transition-all duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative transition-colors duration-300 font-medium py-2 group",
                    shouldBeOpaque
                      ? active ? "text-deep-teal" : "text-gray-700 hover:text-deep-teal"
                      : active ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 origin-left",
                    shouldBeOpaque ? "bg-deep-teal" : "bg-white",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              );
            })}
            <div className="flex items-center pl-4 border-l border-gray-200 ml-4 h-8">
              <LanguageSwitcher isTransparent={!shouldBeOpaque} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              shouldBeOpaque ? "hover:bg-gray-100" : "hover:bg-white/10"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-deep-teal" />
            ) : (
              <Menu className={cn(
                "w-6 h-6 transition-colors",
                shouldBeOpaque ? "text-deep-teal" : "text-white"
              )} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block transition-colors font-medium py-3 px-4 rounded-lg",
                      active 
                        ? "bg-deep-teal/10 text-deep-teal" 
                        : "text-gray-700 hover:bg-gray-50 hover:text-deep-teal"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100 px-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

