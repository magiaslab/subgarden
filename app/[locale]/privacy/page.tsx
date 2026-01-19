import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-deep-teal mb-8">Privacy Policy</h1>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">Questa è la privacy policy di SUBGarden. In questa pagina spieghiamo come gestiamo i tuoi dati personali.</p>
            {/* Add more content as needed */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
