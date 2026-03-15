import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'SUBGarden - Subirrigazione per Giardini | Risparmio Idrico, Installazione Non Invasiva',
  description:
    'Irrigazione sotterranea per giardini esistenti: risparmio idrico fino al 70%, installazione non invasiva che non danneggia il manto erboso. Toscana e Italia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height={0}
              width={0}
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
