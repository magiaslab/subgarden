import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';
import { Link } from '@/lib/i18n/routing';
import { getPosts } from '@/lib/blog';
import { alternates, pick } from '@/lib/utils/metadata';
import { Calendar } from 'lucide-react';

const TEXT: Record<string, { title: string; description: string; lead: string; empty: string }> = {
  it: {
    title: 'Blog: subirrigazione, acqua e giardini',
    description: 'Come funziona la subirrigazione, quanta acqua si risparmia e come si cura un prato in Toscana: articoli di SUBGarden.',
    lead: 'Subirrigazione, risparmio idrico e cura del giardino',
    empty: 'Nessun articolo al momento.',
  },
  en: {
    title: 'Blog: subsurface irrigation, water and gardens',
    description: 'How subsurface irrigation works, how much water it saves and how to care for a lawn in Tuscany: articles by SUBGarden (in Italian).',
    lead: 'Subsurface irrigation, water saving and garden care. Articles are in Italian.',
    empty: 'No articles yet.',
  },
  de: {
    title: 'Blog: Unterflurbewässerung, Wasser und Gärten',
    description: 'Wie Unterflurbewässerung funktioniert, wie viel Wasser sie spart und wie man in der Toskana einen Rasen pflegt: Artikel von SUBGarden (auf Italienisch).',
    lead: 'Unterflurbewässerung, Wassersparen und Gartenpflege. Die Artikel sind auf Italienisch.',
    empty: 'Noch keine Artikel.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = pick(TEXT, locale);
  return {
    title: t.title,
    description: t.description,
    alternates: alternates('/blog', locale),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const posts = getPosts(locale);
  const t = pick(TEXT, locale);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/stunning-spring-collage.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                Blog
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light italic max-w-2xl mx-auto">
                {t.lead}
              </p>
            </MotionDiv>
          </div>
        </section>

        <div className="py-16 md:py-24 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <p className="text-center text-gray-600">{t.empty}</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <MotionDiv
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    <li className="h-full" lang={post.lang}>
                      <Link
                        href={`/blog/${post.slug}` as any}
                        className="block h-full rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-xl hover:border-copper/20 transition-all duration-300 overflow-hidden text-left group"
                      >
                        <div className="relative w-full aspect-16/10 bg-gray-100 overflow-hidden">
                          <Image
                            src={post.image || '/stunning-spring-collage.jpg'}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-6 md:p-8">
                          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                            <Calendar className="w-4 h-4 text-copper shrink-0" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString(post.lang, {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </time>
                          </div>
                          <h2 className="text-xl md:text-2xl font-serif font-bold text-deep-teal mb-2 group-hover:text-copper transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {post.description}
                          </p>
                          <span className="inline-block mt-4 text-copper font-medium text-sm group-hover:underline">
                            Leggi l&apos;articolo →
                          </span>
                        </div>
                      </Link>
                    </li>
                  </MotionDiv>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
