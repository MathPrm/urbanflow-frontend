"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGeolocation } from "@/hooks/useGeolocation";
import LiveMapWrapper from "@/components/map/LiveMapWrapper";
import { Journey } from "@/components/itinerary/JourneyCard";

export default function LiveNavigationPage() {
  const router = useRouter();
  const { coordinates, error, isLoading, requestLocation } = useGeolocation();
  const [journey, setJourney] = useState<Journey | null>(null);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      const storedJourney = sessionStorage.getItem("activeJourney");
      
      if (!storedJourney) {
        router.replace("/itinary/results");
        return;
      }
      
      setJourney(JSON.parse(storedJourney));
      requestLocation();
    }, 0);

    return () => clearTimeout(initTimer);
  }, [router, requestLocation]);

  if (!journey) return null; 

  const handleExitNavigation = () => {
    if (window.confirm("Voulez-vous vraiment quitter la navigation en cours ?")) {
      sessionStorage.removeItem("activeJourney");
      router.back();
    }
  };

  const durationInMinutes = Math.round((journey.duration || 0) / 60);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-page flex flex-col font-lato">
      
      <button 
        onClick={handleExitNavigation}
        className="absolute top-6 left-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-text-primary hover:bg-quinary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-500"
        aria-label="Quitter la navigation"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <div className="absolute inset-0 z-0 bg-quinary-100 flex items-center justify-center">
        {isLoading && !coordinates ? (
          <div className="flex flex-col items-center gap-4 text-secondary-600 bg-white/80 p-6 rounded-2xl backdrop-blur-sm shadow-sm">
            <span className="w-10 h-10 rounded-full border-4 border-secondary-200 border-t-secondary-500 animate-spin"></span>
            <p className="font-semibold animate-pulse">Acquisition du signal GPS...</p>
          </div>
        ) : coordinates ? (
          <LiveMapWrapper lat={coordinates.lat} lon={coordinates.lon} journey={journey} />
        ) : (
          <div className="bg-white/80 p-6 rounded-2xl backdrop-blur-sm text-center shadow-sm">
            <p className="text-red-500 text-sm font-medium">{error || "Impossible de charger la géolocalisation."}</p>
            <button 
              onClick={requestLocation}
              className="mt-4 px-4 py-2 bg-secondary-500 text-white rounded-lg text-sm font-semibold"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-6 pb-8 transform transition-transform duration-300">
          
          <div className="w-12 h-1.5 bg-quinary-200 rounded-full mx-auto mb-5"></div>

          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-4xl font-bold text-secondary-600 font-poppins">
                {durationInMinutes} <span className="text-xl text-text-tertiary">min</span>
              </h1>
              <p className="text-secondary-600 text-sm font-bold mt-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                Suivi en temps réel actif
              </p>
            </div>
            
            <button 
              onClick={handleExitNavigation}
              className="bg-[#FFE5E5] text-[#D92D20] hover:bg-[#FFD1D1] px-5 py-3 rounded-2xl font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
            >
              Quitter
            </button>
          </div>

          <div className="bg-page rounded-xl p-4 border border-quinary-200">
            <p className="text-sm text-text-primary font-bold">Prochaine étape :</p>
            <p className="text-sm text-text-tertiary mt-1">
              Suivez le tracé sur la carte pour rejoindre votre destination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}