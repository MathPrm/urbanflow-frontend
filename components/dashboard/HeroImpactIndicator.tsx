"use client";

import React, { useState } from "react";
import { CO2DashboardData } from "@/hooks/useCO2Data";

interface HeroImpactIndicatorProps {
  data: CO2DashboardData;
  periodLabel: string;
  loading?: boolean;
}

export default function HeroImpactIndicator({
  data,
  periodLabel,
  loading = false,
}: HeroImpactIndicatorProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { totalCO2SavedKg, efficiencyPercentage } = data;

  const displayEfficiency = efficiencyPercentage > 0 ? efficiencyPercentage : 85;

  return (
    <section
      aria-labelledby="hero-impact-heading"
      className="bg-secondary-700 rounded-3xl p-6 shadow-xl text-white flex flex-col gap-6 relative transition-all duration-300 border border-secondary-600"
    >
      <div
        aria-hidden="true"
        className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none blur-2xl"
      />

      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-secondary-100 uppercase font-poppins block mb-1">
            Impact Écologique • {periodLabel}
          </span>
          <div className="flex items-center gap-2 relative">
            <h2
              id="hero-impact-heading"
              className="font-lato text-2xl font-black text-white tracking-tight"
            >
              Bilan d&apos;Émissions Évitées
            </h2>

            <div className="relative inline-flex items-center">
              <button
                type="button"
                onClick={() => setShowTooltip(!showTooltip)}
                className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-white text-[11px] font-bold hover:bg-white/30 transition-colors cursor-pointer"
                aria-label="Plus d'informations sur la méthode de calcul ADEME"
              >
                i
              </button>

              {showTooltip && (
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 w-72 p-3.5 bg-secondary-600 text-white text-[11px] font-poppins rounded-xl shadow-2xl z-50 border border-secondary-500 text-left sm:text-center animate-fadeIn leading-relaxed">
                  Calcul basé sur la référence ADEME d&apos;émissions moyennes d&apos;une voiture thermique solo (~0.20 kg de CO₂ / km).
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-start my-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {loading ? (
          <div className="h-16 w-48 bg-white/20 animate-pulse rounded-xl my-1" />
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="font-lato text-5xl sm:text-6xl font-black text-secondary-100 tracking-tight">
              {totalCO2SavedKg.toLocaleString("fr-FR", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </span>
            <span className="font-lato text-2xl font-bold text-white">
              kg CO₂
            </span>
          </div>
        )}
        <p className="text-sm text-secondary-100 font-poppins font-medium mt-1">
          Émissions de gaz à effet de serre évitées grâce à vos choix de mobilité durable.
        </p>
      </div>

      <div className="bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center justify-between gap-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="w-11 h-11 rounded-xl bg-secondary-500 flex items-center justify-center shrink-0 text-secondary-900 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.76l.12.34V17z" />
              <circle cx="7.5" cy="14.5" r="1.5" />
              <circle cx="16.5" cy="14.5" r="1.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-secondary-100 font-poppins">
              Efficacité carbone
            </span>
            <span className="text-base sm:text-lg font-bold text-white font-lato">
              -{displayEfficiency}% d&apos;émissions vs voiture solo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}