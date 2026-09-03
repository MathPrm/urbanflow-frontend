"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddressAutocomplete from "./AddressAutocomplete";

export default function SearchCard() {
  const router = useRouter();

  const [departureCoords, setDepartureCoords] = useState("");
  const [arrivalCoords, setArrivalCoords] = useState("");

  const [departureLabel, setDepartureLabel] = useState("");
  const [arrivalLabel, setArrivalLabel] = useState("");
  
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!departureCoords || !arrivalCoords) {
      alert("Veuillez sélectionner un départ et une arrivée depuis les suggestions.");
      return;
    }

    setLoading(true);

    router.push(
      `/itinary/results?from=${encodeURIComponent(departureCoords)}&to=${encodeURIComponent(arrivalCoords)}&fromLabel=${encodeURIComponent(departureLabel)}&toLabel=${encodeURIComponent(arrivalLabel)}`
    );
  };

  return (
    <div className="bg-page border-2 border-border-surface rounded-2xl p-5 shadow-xl flex flex-col gap-4 w-full">
      <h2 className="font-lato text-[20px] font-bold text-text-primary">
        Rechercher un itinéraire
      </h2>

      <form className="flex flex-col gap-3" onSubmit={handleSearch}>
        
        {/* Champ de départ avec l'option GPS activée dans le menu déroulant */}
        <AddressAutocomplete
          placeholder="Départ | ex: Châtelet"
          enableCurrentLocation={true}
          onSelect={(coords, label) => {
            setDepartureCoords(coords);
            setDepartureLabel(label);
          }}
        />

        {/* Champ d'arrivée classique */}
        <AddressAutocomplete
          placeholder="Arrivée | ex: Gare de Lyon"
          onSelect={(coords, label) => {
            setArrivalCoords(coords);
            setArrivalLabel(label);
          }}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-action-primary hover:bg-action-primary-hover text-text-secondary font-poppins font-medium rounded-lg px-4 py-3 mt-1 transition-colors disabled:opacity-50"
        >
          {loading ? "Chargement..." : "Rechercher"}
        </button>
        
      </form>
    </div>
  );
}