import { getLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/Button';
import { pick } from '@/lib/utils/metadata';

const TEXT: Record<string, { title: string; body: string; cta: string }> = {
  it: { title: 'Pagina non trovata', body: 'La pagina che cerchi non esiste o è stata spostata.', cta: 'Torna alla home' },
  en: { title: 'Page not found', body: 'The page you are looking for does not exist or has been moved.', cta: 'Back to home' },
  de: { title: 'Seite nicht gefunden', body: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', cta: 'Zur Startseite' },
};

export default async function NotFound() {
  const t = pick(TEXT, await getLocale());
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl md:text-8xl font-serif font-bold text-deep-teal mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">{t.title}</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">{t.body}</p>
        <Link href="/">
          <Button size="lg" variant="primary">
            {t.cta}
          </Button>
        </Link>
      </div>
    </main>
  );
}
