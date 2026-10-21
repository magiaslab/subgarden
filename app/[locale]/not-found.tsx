import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ButtonLink } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';

/*
 * 404 nelle lingue: stessa cornice del sito (header e footer), il numero grande in
 * type-data, una frase, il ritorno alla home e tre pagine da cui ripartire.
 */
export default async function NotFound() {
  const t = await getTranslations('errorPage');
  const tn = await getTranslations('nav');
  const more = [
    { href: '/soluzioni', label: tn('solutions') },
    { href: '/tecnologia', label: tn('technology') },
    { href: '/faq', label: tn('faq') },
  ] as const;
  return (
    <>
      <Navbar />
      <main id="contenuto" data-no-motion className="bg-surface-alt">
        <div className="container-site flex min-h-[80svh] flex-col justify-center pb-20 pt-36">
          <p aria-hidden className="type-data text-brand">404</p>
          <h1 className="type-h1 mt-6 max-w-[16ch] text-ink">{t('nf_title')}</h1>
          <p className="type-lead mt-6 max-w-2xl text-ink-muted">{t('nf_body')}</p>
          <ButtonLink href="/" variant="secondary" size="lg" className="mt-10 self-start">
            {t('nf_home')}
          </ButtonLink>
          <nav aria-label={t('nf_more')} className="mt-14 border-t border-line pt-6">
            <p className="type-eyebrow text-ink-muted">{t('nf_more')}</p>
            <ul className="type-body mt-3 flex flex-wrap gap-x-8">
              {more.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-brand underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
