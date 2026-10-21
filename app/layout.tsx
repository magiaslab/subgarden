// Il documento (<html lang>, font, analytics) sta in app/[locale]/layout.tsx, così ogni
// pagina dichiara la sua lingua. Qui passa solo il contenuto (schema di next-intl).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
