"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Journey, Section } from "./JourneyCard";

interface NavitiaSection extends Omit<Section, 'display_informations'> {
  departure_date_time?: string;
  arrival_date_time?: string;
  from?: { name: string };
  to?: { name: string };
  display_informations?: {
    code: string;
    color: string;
    text_color: string;
    network: string;
    direction?: string;
  };
}

interface ItineraryPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  journey: Journey | null;
}

const formatTime = (navitiaDate?: string) => {
  if (!navitiaDate) return "";
  const match = navitiaDate.match(/T(\d{2})(\d{2})/);
  if (match) return `${match[1]}:${match[2]}`;
  return navitiaDate;
};

export default function ItineraryPreview({ isOpen, onClose, journey }: ItineraryPreviewProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { coordinates, error, isLoading, requestLocation } = useGeolocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !journey) return null;

  const durationInMinutes = Math.round(journey.duration / 60);
  
  const timelineSections = journey.sections.filter(
    (section) => section.type === "public_transport" || (section.type === "street_network" && section.duration > 60)
  );

  const content = (
    <div 
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        className="w-full md:max-w-md bg-white rounded-t-3xl md:rounded-2xl shadow-2xl transform transition-transform duration-300 flex flex-col max-h-[90vh]"
      >
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 id="preview-title" className="text-xl font-bold text-text-primary font-poppins">
                Aperçu du trajet
              </h2>
              <p className="text-sm text-text-tertiary mt-1">
                {timelineSections[0]?.display_informations?.code 
                  ? `Via Ligne ${timelineSections[0].display_informations.code}` 
                  : "Trajet"} • {durationInMinutes} min
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-text-primary"
              aria-label="Fermer la prévisualisation"
            >
              ✕
            </button>
          </div>

          <div className="relative border-l-2 border-dashed border-gray-200 ml-3 pl-6 space-y-6 mb-8">
            {timelineSections.map((section, index) => {
              // 2. 👈 On utilise notre nouvelle interface ici au lieu de "any"
              const sec = section as NavitiaSection; 
              
              const startTime = formatTime(sec.departure_date_time) || "---";
              const fromName = sec.from?.name || "Point de départ";
              const toName = sec.to?.name || "Destination";
              const stepDuration = Math.round(sec.duration / 60);

              if (sec.type === "public_transport" && sec.display_informations) {
                // 3. 👈 TypeScript sait maintenant que "direction" existe potentiellement
                const { color, text_color, code, network, direction } = sec.display_informations;
                return (
                  <div key={index} className="relative">
                    <div 
                      className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: `#${color}` }}
                    ></div>
                    <p className="text-sm font-semibold text-text-primary">
                      {startTime} - {fromName}
                    </p>
                    <div className="mt-1 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-0.5 text-xs font-bold rounded-sm"
                          style={{ backgroundColor: `#${color}`, color: `#${text_color}` }}
                        >
                          {code}
                        </span>
                        <span className="text-xs text-text-tertiary font-medium">
                          {network}
                        </span>
                      </div>
                      {direction && (
                        <p className="text-xs text-text-tertiary">Direction {direction}</p>
                      )}
                    </div>
                  </div>
                );
              }

              if (sec.type === "street_network") {
                return (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white border-4 border-green-600 rounded-full"></div>
                    <p className="text-sm font-semibold text-text-primary">
                      {startTime} - {fromName}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1 flex items-center gap-1">
                      🚶‍♂️ Marche ({stepDuration} min)
                    </p>
                    {index === timelineSections.length - 1 && (
                      <div className="mt-6 relative">
                        <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white border-4 border-gray-400 rounded-full"></div>
                        <p className="text-sm font-semibold text-text-primary">
                          {formatTime(sec.arrival_date_time)} - {toName}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-border-default flex flex-col gap-3">
            <button 
              onClick={requestLocation}
              disabled={isLoading}
              className={`w-full font-semibold py-3.5 px-4 rounded-xl transition-colors shadow-md flex justify-center items-center gap-2 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-secondary-500 hover:bg-secondary-600 text-white'
              }`}
            >
              {isLoading ? (
                <span>⏳ Localisation en cours...</span>
              ) : (
                <span>{"Démarrer l'itinéraire"}</span>
              )}
            </button>
            
            {error && (
              <p className="text-red-500 text-xs text-center font-medium">
                {error}
              </p>
            )}

            {coordinates && (
              <p className="text-green-600 text-sm text-center font-medium bg-green-50 py-2 rounded-lg border border-green-200">
                ✅ Position trouvée : {coordinates.lat.toFixed(4)}, {coordinates.lon.toFixed(4)}
              </p>
            )}

            <button 
              onClick={onClose}
              className="w-full bg-page hover:bg-gray-100 text-text-primary font-medium py-3 px-4 rounded-xl transition-colors border border-border-default md:hidden"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(content, document.body) : null;
}