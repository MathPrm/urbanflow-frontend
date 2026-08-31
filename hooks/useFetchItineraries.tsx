import { useState, useEffect } from "react";
import { Journey } from "../components/itinerary/JourneyCard";

export function useFetchItineraries(departureCoords: string, arrivalCoords: string) {
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
        
        const response = await fetch(
          `${baseUrl}/api/itineraires/search?from=${encodeURIComponent(departureCoords)}&to=${encodeURIComponent(arrivalCoords)}`,
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
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            return;
          }
        }
        
        console.error("Error fetching itineraries:", err);
        setError("Impossible de récupérer les itinéraires. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();

    return () => {
      abortController.abort();
    };
  }, [departureCoords, arrivalCoords]);

  return { itineraries, loading, error };
}