"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useTransition } from "react";
import JourneySummaryHeader from "@/components/itinerary/JourneySummaryHeader";
import StatusMessage from "@/components/ui/StatusMessage";
import JourneyList from "@/components/itinerary/JourneyList";
import { useFetchItineraries } from "@/hooks/useFetchItineraries";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const departureCoords = searchParams.get("from") || "";
  const arrivalCoords = searchParams.get("to") || "";
  const departureLabel = searchParams.get("fromLabel") || departureCoords;
  const arrivalLabel = searchParams.get("toLabel") || arrivalCoords;

  const isWheelchair = searchParams.get("wheelchair") === "true";

  const { itineraries, loading, error } = useFetchItineraries(departureCoords, arrivalCoords, isWheelchair);
  const isUpdating = loading || isPending;

  const handleWheelchairToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set("wheelchair", "true");
    } else {
      params.delete("wheelchair");
    }
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="min-h-screen bg-page flex flex-col font-poppins pb-24 md:pb-0">
      
      <div className="w-full md:grid md:grid-cols-12 md:items-start">
        <div className="md:col-span-4 md:bg-surface-dark md:rounded-none md:p-6 md:shadow-md md:sticky md:top-0 md:min-h-screen flex flex-col">
          <JourneySummaryHeader 
            departureLabel={departureLabel} 
            arrivalLabel={arrivalLabel} 
          />

          <div className="px-4 md:px-0 -mt-6 md:mt-6 relative z-20 flex flex-col gap-4">
            <div className="bg-white border-2 border-border-surface rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-action-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                    accessible
                  </span>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="pmr-toggle" className="font-lato font-bold text-text-primary text-sm cursor-pointer select-none">
                    Trajet accessible PMR
                  </label>
                  <span className="text-xs text-text-tertiary font-poppins select-none">
                    Adapté aux fauteuils roulants
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isUpdating && (
                  <span className="w-4 h-4 rounded-full border-2 border-action-primary border-t-transparent animate-spin" aria-hidden="true" />
                )}
                <input
                  id="pmr-toggle"
                  type="checkbox"
                  checked={isWheelchair}
                  onChange={(e) => handleWheelchairToggle(e.target.checked)}
                  disabled={isUpdating}
                  className="w-5 h-5 accent-action-primary rounded cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 disabled:cursor-wait"
                  aria-label="Filtrer les itinéraires accessibles en fauteuil roulant"
                />
              </div>
            </div>
          </div>
        </div>

        <main className="md:col-span-8 flex-1 flex flex-col w-full">
          <div className="px-4 md:px-8 mt-6 md:mt-0 relative z-20 w-full">
            <div className="max-w-md md:max-w-none mx-auto w-full flex flex-col gap-4">
              {!departureCoords || !arrivalCoords ? (
                <StatusMessage message="Veuillez renseigner un point de départ et d'arrivée pour chercher un trajet." />
              ) : error ? (
                <StatusMessage message={error} />
              ) : itineraries.length === 0 && isUpdating ? (
                <div className="flex flex-col gap-4 animate-pulse">
                  <div className="flex items-center justify-center gap-2 py-3 px-4 bg-primary-100/80 border border-primary-200 text-action-primary rounded-xl text-xs font-poppins font-medium">
                    <span className="w-4 h-4 rounded-full border-2 border-action-primary border-t-transparent animate-spin" />
                    <span>Recherche des itinéraires adaptés...</span>
                  </div>
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white border-2 border-border-surface rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <div className="h-6 w-28 bg-quinary-200 rounded-lg" />
                        <div className="h-6 w-16 bg-quinary-200 rounded-lg" />
                      </div>
                      <div className="h-10 w-full bg-quinary-200/60 rounded-xl" />
                      <div className="flex justify-between items-center pt-2 border-t border-quinary-200">
                        <div className="h-4 w-32 bg-quinary-200 rounded" />
                        <div className="h-4 w-20 bg-quinary-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : itineraries.length === 0 ? (
                <StatusMessage message="Aucun itinéraire trouvé pour ces critères." />
              ) : (
                <div className="relative flex flex-col gap-3">
                  {isUpdating && (
                    <div className="flex items-center justify-center gap-2 py-2 px-4 bg-primary-100/90 border border-primary-200 text-action-primary rounded-xl text-xs font-poppins font-medium shadow-sm animate-fadeIn">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-action-primary border-t-transparent animate-spin" />
                      <span>Recherche des itinéraires adaptés en cours...</span>
                    </div>
                  )}
                  <div className={`transition-all duration-200 ${isUpdating ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
                    <JourneyList itineraries={itineraries} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

      </div>
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