"use client";

import type { TabType } from "@/hooks/useJourneyFilterSort";

interface TransportTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TransportTabs({ activeTab, onTabChange }: TransportTabsProps) {
  return (
    <div 
      role="tablist"
      aria-label="Filtrer par type de transport"
      className="grid grid-cols-3 bg-quinary-200/50 p-1.5 rounded-2xl border border-quinary-200 shadow-sm items-center w-full"
    >
      <button
        role="tab"
        aria-selected={activeTab === "all"}
        onClick={() => onTabChange("all")}
        aria-label="Tous les trajets"
        className={`py-3 px-3 flex justify-center items-center font-poppins text-xs font-bold rounded-xl transition-all ${
          activeTab === "all"
            ? "bg-white text-secondary-700 shadow-md scale-[1.02]"
            : "text-text-tertiary hover:text-text-primary"
        }`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      </button>

      <button
        role="tab"
        aria-selected={activeTab === "transit"}
        onClick={() => onTabChange("transit")}
        aria-label="Transports en commun"
        className={`py-3 px-3 flex justify-center items-center font-poppins text-xs font-bold rounded-xl transition-all ${
          activeTab === "transit"
            ? "bg-white text-secondary-700 shadow-md scale-[1.02]"
            : "text-text-tertiary hover:text-text-primary"
        }`}
      >
        <div
          className="w-[22px] h-[22px] bg-current"
          style={{
            WebkitMask: "url('/icons/icon-trajet-transports.svg') no-repeat center / contain",
            mask: "url('/icons/icon-trajet-transports.svg') no-repeat center / contain",
          }}
          aria-hidden="true"
        />
      </button>

      <button
        role="tab"
        aria-selected={activeTab === "walking"}
        onClick={() => onTabChange("walking")}
        aria-label="Marche à pied"
        className={`py-3 px-3 flex justify-center items-center font-poppins text-xs font-bold rounded-xl transition-all ${
          activeTab === "walking"
            ? "bg-white text-secondary-700 shadow-md scale-[1.02]"
            : "text-text-tertiary hover:text-text-primary"
        }`}
      >
        <div
          className="w-[22px] h-[22px] bg-current"
          style={{
            WebkitMask: "url('/icons/icon-trajet-pieton.svg') no-repeat center / contain",
            mask: "url('/icons/icon-trajet-pieton.svg') no-repeat center / contain",
          }}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}