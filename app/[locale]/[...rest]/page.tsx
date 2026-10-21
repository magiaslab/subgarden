import { notFound } from 'next/navigation';

// Ogni indirizzo che non corrisponde a una pagina passa dal not-found della lingua.
export default function CatchAll() {
  notFound();
}
