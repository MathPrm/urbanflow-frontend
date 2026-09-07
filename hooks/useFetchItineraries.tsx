import { useState, useEffect } from "react";
import { Journey } from "../components/itinerary/JourneyCard";

export function useFetchItineraries(departureCoords: string, arrivalCoords: string, wheelchair: boolean = false) {
  const [itineraries, setItineraries] = useState<Journey[]>([]);
  const [loading, setLoading] = useState<boolean>(!!(departureCoords && arrivalCoords));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchItineraries = async () => {
      if (!departureCoords || !arrivalCoords) {
        setLoading(false);
        setItineraries([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const wheelchairParam = wheelchair ? "&wheelchair=true" : "";

        const response = await fetch(
          `${baseUrl}/api/itineraires/search?from=${encodeURIComponent(departureCoords)}&to=${encodeURIComponent(arrivalCoords)}${wheelchairParam}`,
          { signal: abortController.signal } 
        );

        if (!response.ok) {
          throw new Error("Erreur réseau lors de la récupération des données");
        }

        const data = (await response.json()) as {
          statut?: string;
          data?: { journeys?: Journey[] };
        };

        if (data.statut === "succès") {
          setItineraries(data.data?.journeys ?? []);
        } else {
          setItineraries([]);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        
        setError("Impossible de récupérer les itinéraires. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();

    return () => {
      abortController.abort();
    };
  }, [departureCoords, arrivalCoords, wheelchair]);

  return { itineraries, loading, error };
}