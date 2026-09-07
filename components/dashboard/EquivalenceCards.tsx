"use client";

import React from "react";

interface EquivalenceCardsProps {
  co2SavedKg: number;
}

export default function EquivalenceCards({ co2SavedKg }: EquivalenceCardsProps) {
  // Calculs dynamiques des équivalences concrètes d'impact (Baseline ADEME / Enerdata)
  const carKmCount = Math.round(co2SavedKg * 5.0);
  const phoneRechargesCount = Math.round(co2SavedKg * 125);
  const ledHoursCount = Math.round(co2SavedKg * 42);

  const equivalences = [
    {
      id: "car",
      icon: "🚗",
      value: `${carKmCount.toLocaleString("fr-FR")} km`,
      label: "Trajet en voiture",
      sublabel: "émissions évitées",
      badgeBg: "bg-secondary-100",
      badgeText: "text-secondary-600",
    },
    {
      id: "phone",
      icon: "📱",
      value: `${phoneRechargesCount.toLocaleString("fr-FR")}`,
      label: "Recharges de smartphone",
      sublabel: "énergie économisée",
      badgeBg: "bg-tertiary-100",
      badgeText: "text-tertiary-500",
    },
    {
      id: "led",
      icon: "💡",
      value: `${ledHoursCount.toLocaleString("fr-FR")} h`,
      label: "Éclairage ampoule LED",
      sublabel: "heures d'utilisation",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-800",
    },
  ];

  return (
    <section
      aria-labelledby="equivalences-heading"
      className="bg-white border-2 border-border-surface rounded-2xl p-5 shadow-sm flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <h2
          id="equivalences-heading"
          className="font-lato text-lg font-bold text-text-primary flex items-center gap-2"
        >
          <span aria-hidden="true">💡</span> Concrètement, qu&apos;est-ce que ça représente ?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {equivalences.map((item) => (
          <div
            key={item.id}
            className="bg-page border border-quinary-200 rounded-xl p-3.5 flex flex-col justify-between gap-2 shadow-xs hover:border-border-default transition-all"
          >
            <div className="flex items-center justify-between">
              <div
                aria-hidden="true"
                className={`w-9 h-9 rounded-lg ${item.badgeBg} flex items-center justify-center text-lg select-none`}
              >
                {item.icon}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-lato text-xl sm:text-2xl font-black text-text-primary tracking-tight">
                {item.value}
              </span>
              <span className="text-xs font-bold text-text-primary font-poppins mt-0.5">
                {item.label}
              </span>
              <span className="text-[11px] text-text-tertiary font-poppins">
                {item.sublabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
