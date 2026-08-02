"use client";

import { useState } from "react";

export default function SearchCard() {

  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);

    try {

      const response = await fetch(`http://localhost:8000/api/itineraires/search?from=${depart}&to=${arrivee}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      console.log("Résultat de l'API reçu par le Front :", data);
      alert("Recherche réussie ! Ouvre la console F12 pour voir les données.");

    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      alert("Une erreur est survenue lors de la recherche.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-page border-2 border-border-surface rounded-2xl p-5 shadow-xl flex flex-col gap-4 w-full">
      <h2 className="font-lato text-[20px] font-bold text-text-primary">
        Rechercher un itinéraire
      </h2>

      <form className="flex flex-col gap-3" onSubmit={handleSearch}>
        
        <input
          type="text"
          value={depart}
          onChange={(e) => setDepart(e.target.value)}
          placeholder="Départ | ex: 2.3386,48.8576 (Louvre)"
          className="w-full border-2 border-border-default rounded-lg px-4 py-3 font-poppins text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-hover transition-colors"
        />

        <input
          type="text"
          value={arrivee}
          onChange={(e) => setArrivee(e.target.value)}
          placeholder="Arrivée | ex: 2.3522,48.8566 (Châtelet)"
          className="w-full border-2 border-border-default rounded-lg px-4 py-3 font-poppins text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-hover transition-colors"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-action-primary hover:bg-action-primary-hover text-text-secondary font-poppins font-medium rounded-lg px-4 py-3 mt-1 transition-colors disabled:opacity-50"
        >

          {loading ? "Recherche en cours..." : "Rechercher"}
        </button>
        
      </form>
    </div>
  );
}