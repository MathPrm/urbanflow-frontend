'use client';

import { useEffect, useState } from 'react';

interface ApiData {
  source: string;
  status: 'loading' | 'success' | 'error';
  data?: unknown;
  error?: string;
}

export default function ApiTestPage() {
  const [apiResults, setApiResults] = useState<ApiData[]>([]);

  useEffect(() => {
    const testApis = async () => {
      const results: ApiData[] = [];

      results.push({
        source: 'Backend UrbanFlow',
        status: 'loading',
      });
      setApiResults([...results]);

      try {
        const backendRes = await fetch(
          'http://localhost:8000/api/health',
          { method: 'GET' }
        );
        const backendData = await backendRes.json();
        results[0] = {
          source: 'Backend UrbanFlow',
          status: 'success',
          data: backendData,
        };
      } catch (err) {
        results[0] = {
          source: 'Backend UrbanFlow',
          status: 'error',
          error: err instanceof Error ? err.message : 'Erreur inconnue',
        };
      }

      setApiResults([...results]);
    };

    testApis();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Test des APIs
        </h1>
        <p className="text-gray-600 mb-8">
          Vérification de la connexion aux services backend
        </p>

        <div className="space-y-6">
          {apiResults.length === 0 ? (
            <p className="text-gray-500">Chargement des tests...</p>
          ) : (
            apiResults.map((result, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg border-2 ${
                  result.status === 'success'
                    ? 'border-green-500 bg-green-50'
                    : result.status === 'error'
                      ? 'border-red-500 bg-red-50'
                      : 'border-yellow-500 bg-yellow-50'
                }`}
              >
                <h2 className="text-xl font-bold mb-2">{result.source}</h2>
                <p
                  className={`text-sm mb-4 font-semibold ${
                    result.status === 'success'
                      ? 'text-green-700'
                      : result.status === 'error'
                        ? 'text-red-700'
                        : 'text-yellow-700'
                  }`}
                >
                  {result.status === 'loading' && '⏳ Chargement...'}
                  {result.status === 'success' && '✅ Succès'}
                  {result.status === 'error' && '❌ Erreur'}
                </p>

                {result.data && (
                  <pre className="bg-white p-4 rounded border border-gray-300 overflow-auto text-sm">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}

                {result.error && (
                  <p className="text-red-700 font-mono text-sm">{result.error}</p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </main>
  );
}