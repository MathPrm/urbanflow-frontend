"use client";

import JourneyCard, { Journey } from "./JourneyCard";
import { useJourneyFilterSort } from "./useJourneyFilterSort";
import TransportTabs from "./TransportTabs";
import SortDropdown from "./SortDropdown";

interface JourneyListProps {
  itineraries: Journey[];
}

export default function JourneyList({ itineraries }: JourneyListProps) {
  // 1. Notre Custom Hook s'occupe de toute la logique de calcul, de filtrage et d'état !
  const { activeTab, setActiveTab, sortBy, setSortBy, finalJourneys } = useJourneyFilterSort(itineraries);

  return (
    <div className="flex flex-col gap-4 relative z-10 mt-2">
      
      {/* 2. Le composant gérant les onglets de transport */}
      <TransportTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. Le composant gérant le menu de tri (affiché uniquement s'il y a des résultats) */}
      {finalJourneys.length > 0 && (
        <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
      )}

      {/* 4. L'affichage conditionnel de la liste ou du message vide */}
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