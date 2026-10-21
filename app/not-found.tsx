import Link from 'next/link';
import './globals.css';

// 404 fuori dalle lingue (indirizzi che il proxy non prefissa): documento completo,
// perché il root layout non ha <html>.
export default function NotFound() {
  return (
    <html lang="it">
      <body>
        <main className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-deep-teal mb-4">404</h1>
            <p className="text-gray-700 mb-8">La pagina che cerchi non esiste o è stata spostata.</p>
            <Link href="/it" className="underline text-deep-teal">
              Vai alla home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
