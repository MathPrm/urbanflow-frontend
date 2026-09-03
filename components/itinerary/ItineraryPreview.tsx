"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
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
  const router = useRouter(); // On ajoute le router pour la navigation
  
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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

  // Nouvelle fonction pour gérer le démarrage de l'itinéraire
  const handleStartNavigation = () => {
    if (journey) {
      sessionStorage.setItem("activeJourney", JSON.stringify(journey));
      onClose();
      router.push("/itinary/live");
    }
  };

  if (!mounted || !isOpen || !journey) return null;

  const durationInMinutes = Math.round((journey?.duration || 0) / 60);
  
  const timelineSections = (journey?.sections || []).filter(
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
          <div className="w-12 h-1.5 bg-quinary-200 rounded-full"></div>
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
              className="p-2 bg-page hover:bg-quinary-200 rounded-full transition-colors text-text-primary"
              aria-label="Fermer la prévisualisation"
            >
              ✕
            </button>
          </div>

          <div className="relative border-l-2 border-dashed border-quinary-200 ml-3 pl-6 space-y-6 mb-8">
            {timelineSections.map((section, index) => {
              const sec = section as NavitiaSection; 
              
              const startTime = formatTime(sec.departure_date_time) || "---";
              const fromName = sec.from?.name || "Point de départ";
              const toName = sec.to?.name || "Destination";
              const stepDuration = Math.round(sec.duration / 60);

              if (sec.type === "public_transport" && sec.display_informations) {
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
                    <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white border-4 border-secondary-500 rounded-full"></div>
                    <p className="text-sm font-semibold text-text-primary">
                      {startTime} - {fromName}
                    </p>
                    <div className="text-xs text-text-tertiary mt-1 flex items-center gap-1.5">
                      <div 
                        className="w-3.5 h-3.5 bg-current" 
                        style={{
                          WebkitMask: "url('/icons/icon-trajet-pieton.svg') no-repeat center / contain",
                          mask: "url('/icons/icon-trajet-pieton.svg') no-repeat center / contain"
                        }}
                        aria-hidden="true"
                      />
                      <span>Marche ({stepDuration} min)</span>
                    </div>
                    {index === timelineSections.length - 1 && (
                      <div className="mt-6 relative">
                        <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white border-4 border-quinary-200 rounded-full"></div>
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
            {/* Le nouveau bouton de démarrage épuré */}
            <button 
              onClick={handleStartNavigation}
              className="w-full font-semibold py-3.5 px-4 rounded-xl transition-transform hover:scale-[1.02] shadow-md flex justify-center items-center gap-2 bg-secondary-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
              aria-label="Démarrer le guidage en direct"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
              <span>{"Démarrer l'itinéraire"}</span>
            </button>

            <button 
              onClick={onClose}
              className="w-full bg-page hover:bg-quinary-200 text-text-primary font-medium py-3 px-4 rounded-xl transition-colors border border-border-default md:hidden"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}