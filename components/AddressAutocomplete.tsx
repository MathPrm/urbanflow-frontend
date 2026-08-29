"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

interface Coordinate {
  lon: number;
  lat: number;
}

interface PlaceSuggestion {
  name: string;
  embedded_type?: string;
  stop_area?: { coord?: Coordinate };
  stop_point?: { coord?: Coordinate };
  address?: { coord?: Coordinate };
  poi?: { coord?: Coordinate };
}

interface AddressAutocompleteProps {
  placeholder: string;
  initialValue?: string;
  onSelect: (coordinates: string, label: string) => void;
}

export default function AddressAutocomplete({ placeholder, initialValue = "", onSelect }: AddressAutocompleteProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});
  
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const updateDropdownPosition = () => {
    if (inputContainerRef.current) {
      const rect = inputContainerRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        zIndex: 99999,
      });
    }
  };

  useEffect(() => {
    if (showDropdown) {
      requestAnimationFrame(updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
      window.addEventListener('scroll', updateDropdownPosition, true);
    }
    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition, true);
    };
  }, [showDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputContainerRef.current && !inputContainerRef.current.contains(event.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Le useEffect gérant la recherche avec AbortController
  useEffect(() => {
    // Plus besoin de setSuggestions([]) ici, le onChange s'en charge !
    if (query.length < 3) {
      return;
    }

    const abortController = new AbortController();

    const fetchPlaces = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(
          `${baseUrl}/api/places/search?q=${encodeURIComponent(query)}`,
          { signal: abortController.signal }
        );
        
        if (!res.ok) throw new Error("Erreur réseau");

        const data = (await res.json()) as {
          statut?: string;
          data?: { places?: PlaceSuggestion[] };
        };

        if (data.statut === "succès" && data.data?.places) {
          setSuggestions(data.data.places);
        } else {
          setSuggestions([]);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Erreur lors de la recherche de lieux", error);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchPlaces();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [query]);

  const getCoordinates = (place: PlaceSuggestion): Coordinate | null => {
    const candidates = [place.stop_area, place.stop_point, place.address, place.poi];
    const coord = candidates.find((item) => item?.coord)?.coord;
    return coord ?? null;
  };

  const handleSelect = (place: PlaceSuggestion) => {
    const label = place.name;
    const coordsObj = getCoordinates(place);

    if (!coordsObj) {
      alert("Impossible de trouver les coordonnées exactes pour ce lieu.");
      return;
    }

    const coords = `${coordsObj.lon},${coordsObj.lat}`;

    setQuery(label);
    setShowDropdown(false);
    onSelect(coords, label);
  };

  return (
    <div className="relative w-full" ref={inputContainerRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const nextValue = e.target.value;
          setQuery(nextValue);
          setShowDropdown(true);

          // C'est ici que le nettoyage est fait proprement au moment de la frappe
          if (nextValue.length < 3) {
            setSuggestions([]);
          }
        }}
        placeholder={placeholder}
        className="w-full border-2 border-border-default rounded-lg px-4 py-3 font-poppins text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-secondary-500 transition-colors"
      />

      {mounted && showDropdown && suggestions.length > 0 && createPortal(
        <ul 
          ref={dropdownRef}
          style={dropdownStyles}
          className="mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
        >
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelect(place)}
              className="px-4 py-3 hover:bg-page cursor-pointer text-sm text-gray-800 border-b border-gray-100 last:border-none font-poppins flex flex-col gap-1"
            >
              <span className="font-semibold text-text-primary">{place.name}</span>
              <span className="text-[11px] text-text-tertiary uppercase tracking-wider font-medium">
                {place.embedded_type === 'stop_area' ? '🚏 Station / Arrêt' : '📍 Adresse / Lieu'}
              </span>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
}