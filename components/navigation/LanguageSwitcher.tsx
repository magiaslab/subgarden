'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations, type Locale } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/lib/i18n/routing';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const locales: { code: Locale; label: string }[] = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

export function LanguageSwitcher({ isTransparent }: { isTransparent?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLocale = locales.find((l) => l.code === locale);

  const handleLocaleChange = (newLocale: Locale) => {
    // Con i params lo slug resta lo stesso e cambia solo il segmento tradotto
    // (/it/soluzioni/x → /en/solutions/x); senza, le pagine con slug si rompono.
    router.replace({ pathname, params } as any, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
          isTransparent && !isOpen ? "hover:bg-white/10" : "hover:bg-gray-100"
        )}
        aria-label="Cambia lingua"
      >
        <Globe className={cn(
          "w-4 h-4 transition-colors",
          isTransparent && !isOpen ? "text-white" : "text-deep-teal"
        )} />
        <span className={cn(
          "text-sm font-medium transition-colors",
          isTransparent && !isOpen ? "text-white" : "text-gray-700"
        )}>
          {currentLocale?.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => handleLocaleChange(loc.code)}
              className={cn(
                'w-full text-left px-4 py-2 text-sm transition-colors',
                locale === loc.code
                  ? 'bg-deep-teal/10 text-deep-teal font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {loc.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
