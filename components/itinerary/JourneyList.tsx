"use client";

import { useState } from "react";
import JourneyCard, { Journey } from "./JourneyCard";
import { useJourneyFilterSort } from "../../hooks/useJourneyFilterSort";
import TransportTabs from "./TransportTabs";
import SortDropdown from "./SortDropdown";
import ItineraryPreview from "@/components/itinerary/ItineraryPreview";

interface JourneyListProps {
  itineraries: Journey[];
}

export default function JourneyList({ itineraries }: JourneyListProps) {
  const { activeTab, setActiveTab, sortBy, setSortBy, finalJourneys } = useJourneyFilterSort(itineraries);
  
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  return (
    <div className="flex flex-col gap-4 relative z-10 mt-2">
      <TransportTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {finalJourneys.length > 0 && (
        <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
      )}

      {finalJourneys.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow-md text-center text-text-tertiary border border-quinary-200 mt-2">
          <p className="font-lato text-sm">Aucun trajet disponible pour ce mode de transport.</p>
        </div>
      ) : (
        finalJourneys.map((journey, index) => (
          <div 
            key={`${activeTab}-${sortBy}-${index}`}
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelectedJourney(journey);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedJourney(journey);
              }
            }}
            className="w-full text-left cursor-pointer transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded-2xl"
            aria-label="Voir les détails de l'itinéraire"
          >
            <JourneyCard 
              journey={journey} 
              isEcoRecommended={index === 0} 
            />
          </div>
        ))
      )}

      <ItineraryPreview 
        isOpen={!!selectedJourney} 
        onClose={() => setSelectedJourney(null)} 
        journey={selectedJourney} 
      />
    </div>
  );
}