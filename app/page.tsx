export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          UrbanFlow Mobility
        </h1>
        <p className="text-xl text-blue-700 mb-8">
          Plateforme de mobilité urbaine écologique
        </p>
        <nav className="space-x-4">
          <a
            href="/api-test"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Test API
          </a>
        </nav>
      </div>
    </main>
  );
}