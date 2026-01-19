import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-deep-teal mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Pagina non trovata
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link href="/it">
          <Button size="lg" variant="primary">
            Torna alla Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
