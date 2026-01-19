import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const t = (useTranslations as any)('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-deep-teal mb-4">
              SUBGarden
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              {t('description')}
            </p>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-deep-teal mb-4">Link</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={"/#about" as any}
                  className="text-gray-600 hover:text-deep-teal transition-colors"
                >
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/tecnologia"
                  className="text-gray-600 hover:text-deep-teal transition-colors"
                >
                  {t('links.technology')}
                </Link>
              </li>
              <li>
                <Link
                  href="/soluzioni"
                  className="text-gray-600 hover:text-deep-teal transition-colors"
                >
                  {t('links.solutions')}
                </Link>
              </li>
              <li>
                <Link
                  href={"/#contact" as any}
                  className="text-gray-600 hover:text-deep-teal transition-colors"
                >
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-deep-teal mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-deep-teal transition-colors"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-deep-teal transition-colors"
                >
                  {t('legal.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
