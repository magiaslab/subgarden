import Link from 'next/link';
import './globals.css';

// 404 fuori dalle lingue (indirizzi che il proxy non prefissa): documento completo,
// perché il root layout non ha <html>. I font del sito si caricano nel layout delle
// lingue: qui il carattere di sistema.
export default function NotFound() {
  return (
    <html lang="it">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <main className="flex min-h-screen items-center bg-surface-alt text-ink">
          <div className="container-site">
            <p aria-hidden className="text-7xl font-bold tracking-tight text-brand">404</p>
            <h1 className="mt-6 text-3xl font-bold tracking-tight">Pagina non trovata</h1>
            <p className="type-lead mt-4 max-w-xl text-ink-muted">La pagina che cerchi non esiste o è stata spostata.</p>
            <p className="mt-8 flex flex-wrap gap-x-8">
              <Link href="/it" lang="it" className="type-ui inline-flex min-h-11 items-center text-brand underline underline-offset-4">
                Vai alla home
              </Link>
              <Link href="/en" lang="en" className="type-ui inline-flex min-h-11 items-center text-brand underline underline-offset-4">
                Go to the home page
              </Link>
              <Link href="/de" lang="de" className="type-ui inline-flex min-h-11 items-center text-brand underline underline-offset-4">
                Zur Startseite
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
