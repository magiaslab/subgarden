import { Metadata } from 'next';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';
import { Link } from '@/lib/i18n/routing';
import { getPosts } from '@/lib/blog';
import { Calendar } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.subgarden.it';

  return {
    title: 'Blog | SUBGarden',
    description: 'Articoli su subirrigazione, risparmio idrico e giardini. Guide e consigli per un giardino perfetto.',
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        it: `${siteUrl}/it/blog`,
        en: `${siteUrl}/en/blog`,
        de: `${siteUrl}/de/blog`,
      },
    },
  };
}

export default async function BlogPage() {
  const posts = getPosts();

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
                Subirrigazione, risparmio idrico e cura del giardino
              </p>
            </MotionDiv>
          </div>
        </section>

        <div className="py-16 md:py-24 bg-[#F2F4F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <p className="text-center text-gray-600">Nessun articolo al momento.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <MotionDiv
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    <li className="h-full">
                      <Link
                        href={`/blog/${post.slug}` as any}
                        className="block h-full rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-copper/20 transition-all duration-300 overflow-hidden text-left group"
                      >
                        <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
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
                            <Calendar className="w-4 h-4 text-copper flex-shrink-0" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('it-IT', {
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
