'use client';

import { useEffect, useState } from 'react';

export default function ApiTestPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError('NEXT_PUBLIC_API_URL non configurée');
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/api/health`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <h1 className="mb-6 text-4xl font-bold text-blue-900">
        Test de l'API UrbanFlow
      </h1>

      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        {loading && (
          <p className="text-center text-blue-500">Chargement…</p>
        )}
        {error && (
          <p className="text-center text-red-600">
            Erreur : {error}
          </p>
        )}
        {data && (
          <pre className="overflow-auto rounded bg-blue-50 p-4 text-sm text-blue-900">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>

      <a
        href="/"
        className="mt-6 text-blue-600 underline hover:text-blue-800"
      >
        ← Retour à l'accueil
      </a>
    </main>
  );
}