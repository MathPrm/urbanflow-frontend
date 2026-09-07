"use client";

import React, { useState } from "react";

export interface DemoTripPreset {
  from_label: string;
  to_label: string;
  distance_km: number;
  transport_mode: "walking" | "bus" | "metro";
  co2_saved_kg: number;
}

const DEMO_TRIPS: DemoTripPreset[] = [
  {
    from_label: "Panthéon",
    to_label: "Jardin du Luxembourg",
    distance_km: 1.0,
    transport_mode: "walking",
    co2_saved_kg: 0.2,
  },
  {
    from_label: "Mairie de Montrouge",
    to_label: "Place d'Alésia",
    distance_km: 2.2,
    transport_mode: "bus",
    co2_saved_kg: 0.4,
  },
  {
    from_label: "Châtillon-Montrouge",
    to_label: "Invalides",
    distance_km: 5.1,
    transport_mode: "metro",
    co2_saved_kg: 0.95,
  },
  {
    from_label: "Châtillon-Montrouge",
    to_label: "8 bis rue de la Fontaine au Roi, Paris 11e",
    distance_km: 7.8,
    transport_mode: "metro",
    co2_saved_kg: 1.55,
  },
];

interface DemoFinishTripButtonProps {
  className?: string;
  buttonText?: string;
}

export default function DemoFinishTripButton({
  className = "",
  buttonText = "Terminer le trajet & Sauvegarder l'impact",
}: DemoFinishTripButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDemoTrip = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const randomTrip =
        DEMO_TRIPS[Math.floor(Math.random() * DEMO_TRIPS.length)];

      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const targetUrl = `${API_URL}/api/trips`;

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(randomTrip),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDemoTrip}
      disabled={loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary-300 hover:bg-secondary-400 text-secondary-700 font-poppins font-bold text-sm rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-secondary-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Enregistrement du trajet...</span>
        </>
      ) : (
        <span>{buttonText}</span>
      )}
    </button>
  );
}