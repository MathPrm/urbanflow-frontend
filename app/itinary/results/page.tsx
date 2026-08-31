"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import JourneySummaryHeader from "@/components/itinerary/JourneySummaryHeader";
import StatusMessage from "@/components/ui/StatusMessage";
import JourneyList from "@/components/itinerary/JourneyList";
import { useFetchItineraries } from "@/hooks/useFetchItineraries";

function ResultsContent() {
  const searchParams = useSearchParams();

  const departureCoords = searchParams.get("from") || "";
  const arrivalCoords = searchParams.get("to") || "";
  const departureLabel = searchParams.get("fromLabel") || departureCoords;
  const arrivalLabel = searchParams.get("toLabel") || arrivalCoords;

  const { itineraries, loading, error } = useFetchItineraries(departureCoords, arrivalCoords);

  return (
    <div className="min-h-screen bg-page flex flex-col font-poppins">
      
      <JourneySummaryHeader 
        departureLabel={departureLabel} 
        arrivalLabel={arrivalLabel} 
      />

      <main className="flex-1 px-4 -mt-6 relative z-20 pb-20">
        <div className="max-w-md mx-auto w-full flex flex-col gap-4">

          {loading ? (
            <StatusMessage message="Recherche des meilleurs itinéraires..." />
          ) : error ? (
            <StatusMessage message={error} />
          ) : itineraries.length === 0 ? (
            <StatusMessage message="Aucun itinéraire trouvé pour ces critères." />
          ) : (
            <JourneyList itineraries={itineraries} />
          )}
          
        </div>
      </main>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-page flex items-center justify-center font-poppins text-quinary-500">Chargement...</div>}>
      <ResultsContent />
    </Suspense>
  );
}