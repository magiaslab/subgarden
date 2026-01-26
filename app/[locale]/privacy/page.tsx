import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MotionDiv } from '@/components/ui/Motion';
import Image from 'next/image';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/stunning-spring-collage.jpg"
            alt="Privacy Policy"
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
                Privacy Policy
              </h1>
            </MotionDiv>
          </div>
        </section>

        <div className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">1. Titolare del Trattamento</h2>
                <p>
                  SUBGarden di Fausto Favilli, con sede legale in Corso Italia, 45 - 57027 San Vincenzo (LI), 
                  &egrave; il titolare del trattamento dei dati personali raccolti attraverso questo sito web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">2. Tipologia di Dati Raccolti</h2>
                <p>Raccogliamo i seguenti tipi di dati:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Dati forniti volontariamente: nome, email e numero di telefono tramite il modulo di contatto.</li>
                  <li>Dati di navigazione: indirizzo IP, tipo di browser, pagine visitate (tramite cookie tecnici).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">3. Finalit&agrave; del Trattamento</h2>
                <p>I dati vengono utilizzati esclusivamente per:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Rispondere alle richieste di informazioni e preventivi.</li>
                  <li>Migliorare l&apos;esperienza di navigazione sul sito.</li>
                  <li>Adempiere ad obblighi di legge.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">4. Base Giuridica</h2>
                <p>
                  Il trattamento dei dati personali si fonda sul consenso dell&apos;interessato (per il modulo di contatto) 
                  e sul legittimo interesse del titolare (per i dati tecnici di navigazione).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">5. Diritti dell&apos;Interessato</h2>
                <p>
                  Ai sensi del GDPR (Regolamento UE 2016/672), hai il diritto di accedere ai tuoi dati, chiederne la rettifica, 
                  la cancellazione o la limitazione del trattamento. Puoi esercitare questi diritti scrivendo a info@subgarden.it.
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
