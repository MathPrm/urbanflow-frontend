import { useState, useMemo } from "react";
import { Journey } from "../components/itinerary/JourneyCard";

export type TabType = "all" | "transit" | "walking";
export type SortType = "co2" | "time" | "price";

export function useJourneyFilterSort(itineraries: Journey[]) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [sortBy, setSortBy] = useState<SortType>("co2");

  const finalJourneys = useMemo(() => {
    const hasPublicTransport = (journey: Journey) =>
      journey.sections.some((section) => section.type === "public_transport");

    const filtered = itineraries.filter((journey) => {
      if (activeTab === "all") return true;
      if (activeTab === "transit") return hasPublicTransport(journey);
      if (activeTab === "walking") return !hasPublicTransport(journey);
      return true;
    });

    if (filtered.length === 0) return [];

    const sortedByEco = [...filtered].sort((a, b) => 
      (a.co2_emission?.value || 0) - (b.co2_emission?.value || 0)
    );

    const bestEcoJourney = sortedByEco[0];
    const remainingJourneys = sortedByEco.slice(1);

    remainingJourneys.sort((a, b) => {
      if (sortBy === "time") return a.duration - b.duration;
      if (sortBy === "price") {
        const priceA = a.fare?.found && a.fare.total?.value ? parseFloat(a.fare.total.value) : Infinity;
        const priceB = b.fare?.found && b.fare.total?.value ? parseFloat(b.fare.total.value) : Infinity;
        return priceA - priceB;
      }
      return (a.co2_emission?.value || 0) - (b.co2_emission?.value || 0);
    });

    return [bestEcoJourney, ...remainingJourneys];
  }, [itineraries, activeTab, sortBy]);

  return { activeTab, setActiveTab, sortBy, setSortBy, finalJourneys };
}