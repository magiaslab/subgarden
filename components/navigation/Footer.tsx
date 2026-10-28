import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/lib/i18n/routing';
import { ButtonLink } from '@/components/ui/Button';
import { DripLine } from '@/components/site/DripLine';
import { LanguageSwitcher } from './LanguageSwitcher';

/*
 * Footer: fascia verde scura. In alto la chiamata al sopralluogo, poi recapiti veri
 * (telefono, email, sede), le pagine e i dati societari. La linea gocciolante chiude
 * il sito come apre le sezioni.
 */
export function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('contact');
  const tn = useTranslations('nav');
  const tcta = useTranslations('cta');
  const year = new Date().getFullYear();
  const phone = tc('phone_value');

  const pages = [
    { href: '/tecnologia', label: t('links.technology') },
    { href: '/soluzioni', label: t('links.solutions') },
    { href: '/territorio', label: t('links.local') },
    { href: '/chi-siamo', label: t('links.about') },
    { href: '/formazione', label: t('links.training') },
    { href: '/faq', label: t('links.faq') },
    { href: '/blog', label: t('links.blog') },
    { href: '/contatti', label: t('links.contact') },
  ] as const;

  return (
    <footer className="bg-surface-inverse text-ink-inverse">
      <div className="container-site pt-16 pb-10 lg:pt-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="type-h2 max-w-2xl text-ink-inverse">{tcta('title')}</p>
          <ButtonLink href="/contatti" size="lg">
            {tn('cta')}
          </ButtonLink>
        </div>

        <DripLine inverse drops={16} className="my-12 lg:my-16" />

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="relative h-14 w-[211px]">
              <Image src="/SUBGARDEN - LOGO BINCO PAYOOFF.png" alt="SUBGarden" fill sizes="240px" className="object-contain object-left" />
            </div>
            <p className="type-body mt-6 max-w-sm text-ink-inverse/80">{t('description')}</p>
            <div className="mt-8 flex items-center gap-4">
              <span className="type-eyebrow text-ink-inverse/70">Rain Bird®</span>
              <div className="relative h-8 w-[106px]">
                {/* Il logo Rain Bird esiste solo a colori: sul verde scuro lo si rende bianco col filtro */}
                <Image src="/RainBirdLogo_330x100.png" alt="Rain Bird" fill sizes="120px" className="object-contain object-left brightness-0 invert" />
              </div>
            </div>
          </div>

          <div>
            <p className="type-eyebrow text-ink-inverse/70">{t('contacts')}</p>
            <ul className="type-body mt-5 space-y-3">
              <li>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:underline underline-offset-4">
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${tc('email_value')}`} className="hover:underline underline-offset-4">
                  {tc('email_value')}
                </a>
              </li>
              <li className="text-ink-inverse/80">{tc('address_value')}</li>
              <li className="text-ink-inverse/80">{tc('hours_value')}</li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="type-eyebrow text-ink-inverse/70">SUBGarden</p>
            <ul className="type-body mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:underline underline-offset-4">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="type-small mt-16 flex flex-col gap-6 border-t border-ink-inverse/20 pt-8 text-ink-inverse/75 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <p>{t('copyright', { year })}</p>
            <p>
              {t('company.brand_of')} · {t('company.address')} · {t('company.rea')} · {t('company.vat')}
            </p>
            <p className="flex flex-wrap gap-x-4">
              <Link href="/privacy" className="hover:underline underline-offset-4">
                {t('legal.privacy')}
              </Link>
              <Link href="/terms" className="hover:underline underline-offset-4">
                {t('legal.terms')}
              </Link>
              <span>
                {t('company.credits')}{' '}
                <a href="https://www.magiaslab.com" className="hover:underline underline-offset-4">
                  Magias Lab
                </a>
              </span>
            </p>
          </div>
          <LanguageSwitcher inverse />
        </div>
      </div>
    </footer>
  );
}
