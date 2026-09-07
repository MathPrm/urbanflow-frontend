"use client";

import React, { useSyncExternalStore, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImpactIndicator from "./HeroImpactIndicator";
import TripHistoryList from "./TripHistoryList";
import DemoFinishTripButton from "./DemoFinishTripButton";
import { useCO2Data, TimePeriod } from "@/hooks/useCO2Data";
import { User } from "@/services/auth";

function subscribeAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getAuthSnapshot(): string | null {
  return localStorage.getItem("user");
}

function getAuthServerSnapshot(): string | null {
  return null;
}

export default function CO2Dashboard() {
  const userJson = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthServerSnapshot);
  const user: User | null = useMemo(() => {
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  }, [userJson]);

  const { data, period, setPeriod, loading } = useCO2Data("month", Boolean(user));

  const periodLabels: Record<TimePeriod, string> = {
    week: "Cette semaine",
    month: "Ce mois-ci",
    year: "Cette année",
  };

  const isEmpty = !data || data.totalCO2SavedKg === 0 || data.recentTrips.length === 0;

  return (
    <main className="min-h-screen bg-page text-text-primary pb-24 flex flex-col animate-fadeIn">
      <header className="bg-surface-dark w-full pt-6 pb-8 px-4 shadow-md flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="max-w-lg md:max-w-5xl mx-auto w-full flex flex-col gap-2">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Image
              src="/icons/icon-plante-ecologie.svg"
              alt=""
              width={28}
              height={28}
              className="w-7 h-auto brightness-0 invert"
            />
            <h1 className="font-lato text-2xl sm:text-3xl font-black text-text-secondary">
              Dashboard Impact CO₂
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-quinary-200 font-poppins">
            Mesurez l&apos;empreinte carbone évitée grâce à vos choix de mobilité durable.
          </p>
        </div>
      </header>

      <div className="max-w-lg md:max-w-5xl mx-auto w-full px-4 flex flex-col gap-6 mt-6">
        {!user ? (
          <div className="bg-white border-2 border-border-surface rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center gap-6 animate-fadeIn md:max-w-xl md:mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-surface-dark flex items-center justify-center text-quinary-100 shadow-sm">
              <span className="material-symbols-outlined text-[36px]" aria-hidden="true">
                lock
              </span>
            </div>

            <div className="flex flex-col gap-2 max-w-sm">
              <h2 className="font-lato text-xl sm:text-2xl font-bold text-text-primary">
                Espace réservé aux voyageurs connectés
              </h2>
              <p className="font-poppins text-xs sm:text-sm text-text-tertiary leading-relaxed">
                Connectez-vous ou créez un compte pour suivre en temps réel vos économies de CO₂,
                visualiser l&apos;impact de vos trajets écologiques et retrouver l&apos;historique complet de vos déplacements.
              </p>
            </div>

            <div className="w-full bg-quinary-100/70 border border-quinary-200 rounded-xl p-4 flex flex-col gap-3 text-left">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary-500 text-[20px] mt-0.5 shrink-0" aria-hidden="true">
                  eco
                </span>
                <p className="font-poppins text-xs text-text-primary">
                  <strong className="font-semibold">Calcul en temps réel :</strong> découvrez les émissions de CO₂ évitées par rapport à la voiture individuelle.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary-500 text-[20px] mt-0.5 shrink-0" aria-hidden="true">
                  history
                </span>
                <p className="font-poppins text-xs text-text-primary">
                  <strong className="font-semibold">Historique personnalisé :</strong> conservez la trace de tous vos déplacements éco-responsables.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <Link
                href="/profile"
                className="flex-1 bg-action-primary hover:bg-action-primary-hover active:scale-[0.98] text-white font-poppins font-medium text-sm py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Se connecter</span>
              </Link>

              <Link
                href="/profile?register=true"
                className="flex-1 bg-white hover:bg-quinary-100 active:scale-[0.98] text-text-primary border-2 border-border-surface font-poppins font-medium text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Créer un compte</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <nav aria-label="Période temporelle" className="w-full md:max-w-xs">
              <div
                role="tablist"
                aria-label="Sélectionner la période des données"
                className="grid grid-cols-3 bg-quinary-200/50 p-1 rounded-2xl border border-quinary-200"
              >
                {(["week", "month", "year"] as TimePeriod[]).map((p) => {
                  const isSelected = period === p;
                  const labels: Record<TimePeriod, string> = {
                    week: "Semaine",
                    month: "Mois",
                    year: "Année",
                  };

                  return (
                    <button
                      key={p}
                      role="tab"
                      id={`tab-${p}`}
                      aria-selected={isSelected}
                      aria-controls="dashboard-content"
                      onClick={() => setPeriod(p)}
                      className={`py-2 px-3 text-xs font-bold font-poppins rounded-xl transition-all ${
                        isSelected
                          ? "bg-white text-secondary-700 shadow-md scale-[1.02]"
                          : "text-text-tertiary hover:text-text-primary"
                      }`}
                    >
                      {labels[p]}
                    </button>
                  );
                })}
              </div>
            </nav>

            <div id="dashboard-content" className="flex flex-col md:grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6 md:col-span-2">
                {data && (
                  <HeroImpactIndicator
                    data={data}
                    periodLabel={periodLabels[period]}
                    loading={loading}
                  />
                )}
              </div>

              {isEmpty ? (
                <section
                  aria-label="Aucun trajet enregistré"
                  className="bg-white border-2 border-border-surface rounded-2xl p-8 shadow-sm flex flex-col items-center text-center gap-4 animate-fadeIn md:col-span-2"
                >
                  <div className="flex items-center justify-center shrink-0">
                    <Image
                      src="/icons/icon-plante-ecologie.svg"
                      alt=""
                      width={48}
                      height={48}
                      className="w-12 h-auto"
                      style={{ filter: "brightness(0.3) saturate(100%) invert(20%) sepia(80%) saturate(500%) hue-rotate(90deg)" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 max-w-sm">
                    <h2 className="font-lato text-xl font-bold text-text-primary">
                      Votre impact commence ici !
                    </h2>
                    <p className="text-xs sm:text-sm text-text-tertiary font-poppins leading-relaxed">
                      Enregistrez votre premier trajet écologique pour découvrir vos statistiques carbone et mesurer vos économies de CO₂.
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-action-primary text-white font-poppins font-bold text-sm rounded-xl shadow-md hover:bg-action-primary/90 active:scale-[0.98] transition-all"
                  >
                    <span aria-hidden="true">🔍</span>
                    <span>Rechercher un itinéraire</span>
                  </Link>
                </section>
              ) : (
                <>
                  {data && (
                    <section
                      aria-labelledby="transport-breakdown-heading"
                      className="bg-white border-2 border-border-surface rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4 h-full"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h2
                            id="transport-breakdown-heading"
                            className="font-lato text-lg font-bold text-text-primary flex items-center gap-2"
                          >
                            <Image
                              src="/icons/icon-plante-ecologie.svg"
                              alt=""
                              width={20}
                              height={20}
                              className="w-5 h-auto"
                            />
                            <span>Répartition par transport</span>
                          </h2>
                          <span className="text-xs font-semibold text-text-tertiary font-poppins">
                            {periodLabels[period]}
                          </span>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs font-poppins font-medium">
                              <span className="flex items-center gap-2 text-text-primary">
                                <span className="w-6 h-6 rounded-lg bg-quinary-200/50 flex items-center justify-center shrink-0">
                                  <Image
                                    src="/icons/icon-trajet-transports.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                    className="w-4 h-auto"
                                  />
                                </span>
                                Métro / RER
                              </span>
                              <span className="font-bold text-text-primary">
                                {data.categoryBreakdown.metro}%
                              </span>
                            </div>
                            <div className="w-full bg-quinary-200 h-2.5 rounded-full overflow-hidden">
                              <div
                                className="bg-secondary-600 h-full rounded-full"
                                style={{ width: `${data.categoryBreakdown.metro}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs font-poppins font-medium">
                              <span className="flex items-center gap-2 text-text-primary">
                                <span className="w-6 h-6 rounded-lg bg-quinary-200/50 flex items-center justify-center shrink-0">
                                  <Image
                                    src="/icons/icon-trajet-pieton.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                    className="w-4 h-auto"
                                  />
                                </span>
                                Marche à pied
                              </span>
                              <span className="font-bold text-text-primary">
                                {data.categoryBreakdown.walking}%
                              </span>
                            </div>
                            <div className="w-full bg-quinary-200 h-2.5 rounded-full overflow-hidden">
                              <div
                                className="bg-secondary-300 h-full rounded-full"
                                style={{ width: `${data.categoryBreakdown.walking}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs font-poppins font-medium">
                              <span className="flex items-center gap-2 text-text-primary">
                                <span className="w-6 h-6 rounded-lg bg-quinary-200/50 flex items-center justify-center shrink-0">
                                  <Image
                                    src="/icons/icon-trajet-transports.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                    className="w-4 h-auto"
                                  />
                                </span>
                                Bus
                              </span>
                              <span className="font-bold text-text-primary">
                                {data.categoryBreakdown.bus}%
                              </span>
                            </div>
                            <div className="w-full bg-quinary-200 h-2.5 rounded-full overflow-hidden">
                              <div
                                className="bg-tertiary-300 h-full rounded-full"
                                style={{ width: `${data.categoryBreakdown.bus}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {data && <TripHistoryList trips={data.recentTrips} />}

                  {data && data.weeklyHistory.length > 0 && (
                    <section
                      aria-labelledby="history-heading"
                      className="bg-white border-2 border-border-surface rounded-2xl p-5 shadow-sm flex flex-col gap-4"
                    >
                      <h2
                        id="history-heading"
                        className="font-lato text-lg font-bold text-text-primary flex items-center gap-2"
                      >
                        <span aria-hidden="true">📊</span> Évolution de l&apos;Impact
                      </h2>

                      <div
                        aria-hidden="true"
                        className="flex items-end justify-between gap-2 h-36 pt-6 px-2 border-b border-quinary-200"
                      >
                        {data.weeklyHistory.map((item, idx) => {
                          const maxKg =
                            Math.max(...data.weeklyHistory.map((h) => h.co2SavedKg)) || 1;
                          const heightPercent = Math.round(
                            (item.co2SavedKg / maxKg) * 100
                          );

                          return (
                            <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                              <span className="text-[10px] font-bold text-secondary-600">
                                {item.co2SavedKg}kg
                              </span>
                              <div
                                className="w-full bg-secondary-200 hover:bg-secondary-300 transition-colors rounded-t-lg"
                                style={{ height: `${heightPercent}%` }}
                              />
                              <span className="text-[11px] font-semibold text-text-tertiary mt-1">
                                {item.day}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <table className="sr-only">
                        <caption>Historique du CO2 économisé par période</caption>
                        <thead>
                          <tr>
                            <th scope="col">Période</th>
                            <th scope="col">CO2 économisé (kg)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.weeklyHistory.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.day}</td>
                              <td>{item.co2SavedKg} kg</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>
                  )}

                  <section
                    aria-label="Simulateur de fin de trajet"
                    className="bg-secondary-700 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between gap-3 text-center sm:text-left border border-secondary-600 md:col-span-2"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-wider text-secondary-200 font-bold font-poppins">
                        Démo Interactive
                      </span>
                      <h3 className="font-lato font-bold text-base text-white">
                        Simuler un nouveau trajet éco-responsable
                      </h3>
                      <p className="text-xs text-quinary-200 font-poppins">
                        Cliquez pour simuler l&apos;arrivée d&apos;un trajet à pied (Hôtel de Ville → Louvre, 1.2 km - 0.25 kg CO₂ économisés) et voir votre impact s&apos;actualiser instantanément.
                      </p>
                    </div>
                    <div className="pt-1 flex justify-center sm:justify-start">
                      <DemoFinishTripButton className="w-full sm:w-auto bg-secondary-300 hover:bg-secondary-400 text-secondary-700" />
                    </div>
                  </section>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}