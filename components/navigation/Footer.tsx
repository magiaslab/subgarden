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
            <div className="relative w-64 h-20 mb-6">
              <Image
                src="/SUBGARDEN - LOGO BINCO PAYOOFF.png"
                alt="SUBGarden Logo"
                fill
                className="object-contain object-left"
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
                  href="/chi-siamo"
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
                  href="/blog"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('links.blog')}
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
              {/* Portfolio nascosto in attesa contenuti
              <li>
                <Link href="/portfolio" ...>{t('links.portfolio')}</Link>
              </li>
              */}
              <li>
                <Link
                  href="/territorio"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('links.local')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-copper scale-0 group-hover:scale-100 transition-transform" />
                  {t('links.faq')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
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

        {/* Dati aziendali e crediti */}
        <div className="mt-16 pt-8 border-t border-white/10 space-y-6">
          <div className="text-sm text-white/50 text-center max-w-2xl mx-auto space-y-1">
            <p className="font-medium text-white/70">{t('company.brand_of')}</p>
            <p>{t('company.address')}</p>
            <p>{t('company.rea')} · {t('company.vat')}</p>
          </div>
          <p className="text-xs text-white/40 text-center">
            {t('company.credits')}{' '}
            <a
              href="https://www.magiaslab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/90 hover:text-copper underline underline-offset-2 transition-colors"
            >
              Magiaslab
            </a>
          </p>
          <p className="text-sm text-white/40 text-center">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
