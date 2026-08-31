"use client";

import type { TabType } from "@/hooks/useJourneyFilterSort";

interface TransportTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TransportTabs({ activeTab, onTabChange }: TransportTabsProps) {
  return (
    <div className="flex bg-surface-light px-1 pt-1 rounded-xl shadow-inner mb-0 items-end h-12">

      <button
        onClick={() => onTabChange("all")}
        aria-label="Tous les trajets"
        className={`flex-1 flex justify-center items-center h-full transition-all rounded-t-lg rounded-b-none ${
          activeTab === "all"
            ? "bg-white text-secondary-600 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]"
            : "text-text-tertiary hover:text-text-primary hover:bg-white/40"
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

      {/* Onglet : Transports */}
      <button
        onClick={() => onTabChange("transit")}
        aria-label="Transports en commun"
        className={`flex-1 flex justify-center items-center h-full transition-all rounded-t-lg rounded-b-none ${
          activeTab === "transit"
            ? "bg-white text-secondary-600 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]"
            : "text-text-tertiary hover:text-text-primary hover:bg-white/40"
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
        onClick={() => onTabChange("walking")}
        aria-label="Marche à pied"
        className={`flex-1 flex justify-center items-center h-full transition-all rounded-t-lg rounded-b-none ${
          activeTab === "walking"
            ? "bg-white text-secondary-600 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]"
            : "text-text-tertiary hover:text-text-primary hover:bg-white/40"
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