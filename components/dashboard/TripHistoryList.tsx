"use client";

import React from "react";
import Image from "next/image";
import { TripHistoryItem } from "@/hooks/useCO2Data";

interface TripHistoryListProps {
  trips: TripHistoryItem[];
}

export default function TripHistoryList({ trips }: TripHistoryListProps) {
  // Configuration des icônes locales par mode de transport
  const modeConfig: Record<
    TripHistoryItem["mode"],
    { iconSrc: string; ariaMode: string }
  > = {
    bike: {
      iconSrc: "/icons/icon-trajet-transports.svg", // Conservé pour TypeScript au cas où l'API renverrait "bike"
      ariaMode: "Mode Vélo",
    },
    tram: {
      iconSrc: "/icons/icon-trajet-transports.svg",
      ariaMode: "Mode Tramway",
    },
    metro: {
      iconSrc: "/icons/icon-trajet-transports.svg",
      ariaMode: "Mode Métro",
    },
    walking: {
      iconSrc: "/icons/icon-trajet-pieton.svg",
      ariaMode: "Mode Marche à pied",
    },
    bus: {
      iconSrc: "/icons/icon-trajet-transports.svg",
      ariaMode: "Mode Bus",
    },
  };

  return (
    <section
      aria-labelledby="recent-trips-heading"
      className="bg-white border-2 border-border-surface rounded-2xl p-5 shadow-sm flex flex-col gap-4"
    >
      <div className="flex justify-between items-center mb-1">
        {/* Titre avec l'icône timer alignée sur le même style que la feuille */}
        <h2
          id="recent-trips-heading"
          className="font-lato text-lg font-bold text-text-primary flex items-center gap-2"
        >
          <Image
            src="/icons/icon-timer.svg"
            alt=""
            width={20}
            height={20}
            className="w-5 h-auto"
          />
          <span>Derniers Trajets</span>
        </h2>
        <span className="text-xs font-semibold text-text-tertiary font-poppins">
          {trips.length} derniers trajets 
        </span>
      </div>

      {/* Liste sémantique d'éléments (WCAG) */}
      <ul role="list" className="flex flex-col gap-3">
        {trips.map((trip) => {
          // Utilisation de "metro" en fallback plutôt que "bike" pour éviter toute incohérence
          const config = modeConfig[trip.mode] || modeConfig.metro;

          return (
            <li
              key={trip.id}
              className="bg-page border border-quinary-200 rounded-xl p-3.5 flex justify-between items-center gap-3 hover:border-border-default transition-all shadow-xs"
            >
              {/* Informations du trajet */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Icône de transport avec fond unifié */}
                <div
                  className="w-10 h-10 rounded-xl bg-quinary-200/50 flex items-center justify-center shrink-0"
                  aria-label={config.ariaMode}
                >
                  <Image
                    src={config.iconSrc}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-auto"
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-lato text-sm font-bold text-text-primary truncate">
                      {trip.fromLabel} ➔ {trip.toLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-tertiary font-poppins mt-0.5">
                    <span>{trip.date}</span>
                    <span aria-hidden="true">•</span>
                    <span>{trip.distanceKm} km</span>
                  </div>
                </div>
              </div>

              {/* CO2 Économisé */}
              <div className="flex flex-col items-end shrink-0">
                <span className="font-lato text-sm font-black text-secondary-600">
                  -{trip.co2SavedKg} kg
                </span>
                <span className="text-[10px] font-medium text-text-tertiary font-poppins">
                  CO₂ évitations
                </span>
                <span className="sr-only">
                  Trajet de {trip.fromLabel} à {trip.toLabel}. Économie de {trip.co2SavedKg} kg de CO2 par rapport à la voiture.
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}