import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import Image from 'next/image';

export function Footer() {
  const t = (useTranslations as any)('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-teal text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="relative w-48 h-16 mb-6">
              <Image
                src="/logo-subgarden.png"
                alt="SUBGarden Logo"
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              {t('description')}
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">Official Partner</span>
              <div className="relative w-40 h-12">
                <Image
                  src="/RainBirdLogo_330x100.png"
                  alt="Rain Bird Partner"
                  fill
                  className="object-contain object-left brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <LanguageSwitcher isTransparent={true} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-xl font-bold text-copper mb-6 uppercase tracking-wider">Link</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={"/#about" as any}
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/tecnologia"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('links.technology')}
                </Link>
              </li>
              <li>
                <Link
                  href="/soluzioni"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('links.solutions')}
                </Link>
              </li>
              <li>
                <Link
                  href={"/#contact" as any}
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-xl font-bold text-copper mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('legal.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-white/40 text-center">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
