export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-deep-teal border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Caricamento...</p>
      </div>
    </div>
  );
}
