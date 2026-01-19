'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-serif font-bold text-deep-teal mb-4">
          Qualcosa è andato storto
        </h2>
        <p className="text-gray-600 mb-8">
          Si è verificato un errore. Riprova o contattaci se il problema persiste.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Riprova
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant="outline"
          >
            Torna alla Home
          </Button>
        </div>
      </div>
    </div>
  );
}
