"use client";

import JourneyCard, { Journey } from "./JourneyCard";
import { useJourneyFilterSort } from "./useJourneyFilterSort";
import TransportTabs from "./TransportTabs";
import SortDropdown from "./SortDropdown";

interface JourneyListProps {
  itineraries: Journey[];
}

export default function JourneyList({ itineraries }: JourneyListProps) {

  const { activeTab, setActiveTab, sortBy, setSortBy, finalJourneys } = useJourneyFilterSort(itineraries);

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
          <JourneyCard 
            key={`${activeTab}-${sortBy}-${index}`}
            journey={journey} 
            isEcoRecommended={index === 0} 
          />
        ))
      )}
      
    </div>
  );
}