"use client";

import { useState, useEffect } from "react";

export type TimePeriod = "week" | "month" | "year";

export interface WeeklyDataPoint {
  day: string;
  co2SavedKg: number;
}

export interface CategoryBreakdown {
  metro: number;
  bike: number;
  walking: number;
  bus: number;
}

export interface TripHistoryItem {
  id: string;
  mode: "bike" | "metro" | "tram" | "walking" | "bus";
  modeLabel: string;
  date: string;
  fromLabel: string;
  toLabel: string;
  distanceKm: number;
  co2SavedKg: number;
}

export interface CO2DashboardData {
  totalCO2SavedKg: number;
  efficiencyPercentage: number;
  treesEquivalent?: number;
  kmAvoidedByCar: number;
  monthlyGoalKg: number;
  monthlyGoalProgress: number;
  trendPercentage: number;
  weeklyHistory: WeeklyDataPoint[];
  categoryBreakdown: CategoryBreakdown;
  recentTrips: TripHistoryItem[];
}

export interface BackendTripItem {
  id: string;
  user_id: string;
  transport_mode: string;
  distance_km: number;
  co2_saved_kg: number;
  from_label: string;
  to_label: string;
  created_at: string;
}

export interface BackendCO2Data {
  totalCO2: number;
  efficiencyPercentage?: number;
  history: BackendTripItem[];
  transportDistribution: Record<string, number>;
}

export interface BackendCO2Response {
  statut: string;
  data: BackendCO2Data;
}

export const emptyCO2Data: CO2DashboardData = {
  totalCO2SavedKg: 0,
  efficiencyPercentage: 0,
  kmAvoidedByCar: 0,
  monthlyGoalKg: 60,
  monthlyGoalProgress: 0,
  trendPercentage: 0,
  weeklyHistory: [],
  categoryBreakdown: { metro: 0, bike: 0, walking: 0, bus: 0 },
  recentTrips: [],
};

function formatModeLabel(mode: string): string {
  switch (mode.toLowerCase()) {
    case "bike":
      return "Vélo";
    case "metro":
      return "Métro";
    case "tram":
      return "Tramway";
    case "walking":
      return "Marche à pied";
    case "bus":
      return "Bus";
    default:
      return mode;
  }
}

function formatDateLabel(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "Récemment";
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Récemment";
  }
}

function mapBackendToDashboardData(backendData: BackendCO2Data): CO2DashboardData {
  const totalCO2SavedKg = Number(backendData.totalCO2) || 0;
  const history = backendData.history || [];

  if (history.length === 0 && totalCO2SavedKg === 0) {
    return emptyCO2Data;
  }

  const efficiencyPercentage =
    typeof backendData.efficiencyPercentage === "number"
      ? backendData.efficiencyPercentage
      : totalCO2SavedKg > 0
      ? 85
      : 0;

  const kmAvoidedByCar = Math.round(totalCO2SavedKg * 5.0);

  const mappedTrips: TripHistoryItem[] = history.map((t) => ({
    id: t.id,
    mode: (t.transport_mode as TripHistoryItem["mode"]) || "walking",
    modeLabel: formatModeLabel(t.transport_mode),
    date: formatDateLabel(t.created_at),
    fromLabel: t.from_label || "Départ",
    toLabel: t.to_label || "Arrivée",
    distanceKm:
      typeof t.distance_km === "number"
        ? t.distance_km
        : parseFloat(t.distance_km as unknown as string) || 0,
    co2SavedKg:
      typeof t.co2_saved_kg === "number"
        ? t.co2_saved_kg
        : parseFloat(t.co2_saved_kg as unknown as string) || 0,
  }));

  const dist = backendData.transportDistribution || {};
  const categoryBreakdown: CategoryBreakdown = {
    metro: dist.metro || dist.tram || 0,
    bike: dist.bike || 0,
    walking: dist.walking || 0,
    bus: dist.bus || 0,
  };

  return {
    totalCO2SavedKg,
    efficiencyPercentage,
    kmAvoidedByCar,
    monthlyGoalKg: 60,
    monthlyGoalProgress: Math.min(
      100,
      Math.round((totalCO2SavedKg / 60) * 100)
    ),
    trendPercentage: 0,
    weeklyHistory: [],
    categoryBreakdown,
    recentTrips: mappedTrips,
  };
}

export function useCO2Data(initialPeriod: TimePeriod = "month", enabled: boolean = true) {
  const [period, setPeriodState] = useState<TimePeriod>(initialPeriod);
  const [data, setData] = useState<CO2DashboardData>(emptyCO2Data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setPeriod = (newPeriod: TimePeriod) => {
    if (newPeriod === period) return;
    setIsLoading(true);
    setPeriodState(newPeriod);
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchCO2Data() {
      setIsLoading(true);
      setError(null);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const targetUrl = `${API_URL}/api/co2-impact`;
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      try {
        const response = await fetch(targetUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          if (isMounted) {
            setData(emptyCO2Data);
            setError(`HTTP ${response.status}`);
          }
          return;
        }

        const json: BackendCO2Response = await response.json();

        if (json && json.data && isMounted) {
          const formattedData = mapBackendToDashboardData(json.data);
          setData(formattedData);
        } else if (isMounted) {
          setData(emptyCO2Data);
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;

        if (isMounted) {
          setData(emptyCO2Data);
          setError(err instanceof Error ? err.message : "Erreur réseau");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCO2Data();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [period, enabled]);

  return {
    data,
    period,
    setPeriod,
    loading: enabled ? isLoading : false,
    isLoading: enabled ? isLoading : false,
    error,
  };
}
