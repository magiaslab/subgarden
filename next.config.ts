import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Niente ottimizzazione di Vercel (si paga a trasformazione): le varianti WebP sono
    // preparate una volta da scripts/prepara-immagini.mjs e scelte da questo loader.
    loader: 'custom',
    loaderFile: './lib/images/loader.ts',
    // Stesse larghezze delle varianti (lib/images/variant.ts → WIDTHS).
    deviceSizes: [480, 960, 1440, 1920],
    imageSizes: [240, 320],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
