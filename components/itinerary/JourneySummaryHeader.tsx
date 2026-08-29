"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AddressAutocomplete from "./AddressAutocomplete";

interface JourneySummaryHeaderProps {
  departureLabel: string;
  arrivalLabel: string;
}

export default function JourneySummaryHeader({ departureLabel, arrivalLabel }: JourneySummaryHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateRoute = (newFromCoords: string, newFromLabel: string, newToCoords: string, newToLabel: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set("from", newFromCoords);
    params.set("fromLabel", newFromLabel);
    params.set("to", newToCoords);
    params.set("toLabel", newToLabel);

    router.push(`/itinary/results?${params.toString()}`);
  };

  const handleSelectDeparture = (coordinates: string, label: string) => {
    const currentToCoords = searchParams.get("to") || "";
    const currentToLabel = searchParams.get("toLabel") || arrivalLabel;
    
    updateRoute(coordinates, label, currentToCoords, currentToLabel);
  };

  const handleSelectArrival = (coordinates: string, label: string) => {
    const currentFromCoords = searchParams.get("from") || "";
    const currentFromLabel = searchParams.get("fromLabel") || departureLabel;
    
    updateRoute(currentFromCoords, currentFromLabel, coordinates, label);
  };

  const handleSwap = () => {
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const fromLabel = searchParams.get("fromLabel") || departureLabel;
    const toLabel = searchParams.get("toLabel") || arrivalLabel;

    updateRoute(to, toLabel, from, fromLabel);
  };

  return (
    <header className="bg-surface-dark text-text-secondary px-4 pt-6 pb-12 rounded-b-4xl shadow-lg relative z-10">
      <div className="max-w-md mx-auto w-full">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-text-secondary hover:text-quinary-200 transition-colors flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="font-lato font-bold text-xl flex-1 text-center pr-6">Votre itinéraire :</h1>
        </div>

        <div className="bg-page rounded-2xl p-4 flex items-center gap-3 shadow-md">

          <div className="flex flex-col gap-3 flex-1">
            <AddressAutocomplete 
              key={`departure-${departureLabel}`}
              placeholder="Départ"
              initialValue={departureLabel}
              onSelect={handleSelectDeparture}
            />
            <AddressAutocomplete 
              key={`arrival-${arrivalLabel}`}
              placeholder="Arrivée"
              initialValue={arrivalLabel}
              onSelect={handleSelectArrival}
            />
          </div>

          <button 
            onClick={handleSwap}
            className="p-2 text-secondary-500 hover:text-secondary-600 transition-colors shrink-0"
            aria-label="Inverser le départ et l'arrivée"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10v12"/>
              <path d="M11 18l-4 4-4-4"/>
              <path d="M17 14V2"/>
              <path d="M13 6l4-4 4 4"/>
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
}