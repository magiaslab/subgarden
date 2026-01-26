import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/stunning-spring-collage.jpg"
            alt="Termini di Servizio"
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
                Termini di Servizio
              </h1>
            </MotionDiv>
          </div>
        </section>

        <div className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">1. Accettazione dei Termini</h2>
                <p>
                  L&apos;accesso e l&apos;utilizzo del sito SUBGarden sono soggetti ai seguenti termini e condizioni. 
                  Utilizzando il sito, l&apos;utente accetta integralmente tali termini.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">2. Propriet&agrave; Intellettuale</h2>
                <p>
                  Tutti i contenuti presenti sul sito (testi, immagini, loghi, video) sono di propriet&agrave; esclusiva di SUBGarden 
                  o dei suoi licenziatari e sono protetti dalle leggi sul diritto d&apos;autore. 
                  &Egrave; vietata la riproduzione senza autorizzazione scritta.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">3. Limitazione di Responsabilit&agrave;</h2>
                <p>
                  SUBGarden si impegna a fornire informazioni accurate e aggiornate, tuttavia non garantisce l&apos;assenza di errori 
                  o omissioni. SUBGarden non sar&agrave; responsabile per eventuali danni derivanti dall&apos;uso o dall&apos;impossibilit&agrave; di usare il sito.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">4. Servizi e Preventivi</h2>
                <p>
                  Le informazioni presenti sul sito hanno scopo puramente informativo. I preventivi forniti tramite sopralluogo 
                  sono soggetti a termini contrattuali specifici che verranno definiti in fase di formalizzazione del progetto.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">5. Legge Applicabile</h2>
                <p>
                  Questi termini sono regolati dalla legge italiana. Per qualsiasi controversia sar&agrave; competente il Foro di Livorno.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
