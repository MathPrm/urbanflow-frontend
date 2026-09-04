"use client";

import { useState, useMemo, useRef } from "react";
import { 
  MdOutlineWarningAmber, 
  MdCheckCircleOutline, 
  MdDirectionsTransit, 
  MdPlace 
} from "react-icons/md";
import { Journey, Section } from "../itinerary/JourneyCard";

interface LiveNavigationBottomSheetProps {
  journey: Journey;
  onExit: () => void;
}

export default function LiveNavigationBottomSheet({ journey, onExit }: LiveNavigationBottomSheetProps) {
  // 🛑 Retour au mock statique (0 = Fluide, 1 = Alerte)
  const [trafficStatus] = useState<0 | 1>(1); 
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // 🖱️ Références pour détecter le mouvement de glissement (Drag / Swipe)
  const dragStartY = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartY.current === null) return;
    
    const deltaY = e.clientY - dragStartY.current;
    const threshold = 30; // Seuil de glissement en pixels

    if (deltaY < -threshold) {
      // Glissement vers le haut -> Ouvrir
      setIsExpanded(true);
    } else if (deltaY > threshold) {
      // Glissement vers le bas -> Réduire
      setIsExpanded(false);
    } else {
      // Simple clic sans mouvement significatif -> Basculer l'état
      setIsExpanded((prev) => !prev);
    }

    dragStartY.current = null;
  };

  const durationInMinutes = Math.round((journey.duration || 0) / 60);

  const eta = useMemo(() => {
    const arrivalTime = new Date();
    arrivalTime.setMinutes(arrivalTime.getMinutes() + durationInMinutes);
    
    return arrivalTime.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [durationInMinutes]);

  const activeSteps = useMemo(() => {
    if (!journey || !journey.sections) return [];

    const steps = journey.sections.filter(
      (s: Section) => s.type === "public_transport" || (s.type === "street_network" && s.duration > 0)
    ).map((section, index) => {
      if (section.type === "public_transport" && section.display_informations) {
        const { code, color } = section.display_informations;
        const transportMinutes = Math.round(section.duration / 60);
        
        return {
          id: `transport-${index}`,
          type: "transport",
          icon: <MdDirectionsTransit className="w-5 h-5" aria-hidden="true" />,
          title: `Ligne ${code}`,
          subtitle: `${transportMinutes > 0 ? transportMinutes : '< 1'} min`,
          customColor: `#${color}`,
          bg: "",
          text: ""
        };
      } else {
        const walkMinutes = Math.round(section.duration / 60);
        return {
          id: `walk-${index}`,
          type: "walk",
          icon: (
            <div 
              className="w-6 h-6 bg-current" 
              style={{
                WebkitMask: "url('/icons/icon-trajet-pieton.svg') no-repeat center / contain",
                mask: "url('/icons/icon-trajet-pieton.svg') no-repeat center / contain"
              }}
              aria-hidden="true"
            />
          ),
          title: "Marche",
          subtitle: `${walkMinutes > 0 ? walkMinutes : '< 1'} min`,
          bg: "bg-emerald-50",
          text: "text-emerald-600",
          customColor: ""
        };
      }
    });

    return steps.length > 0 ? steps : [{
      id: "default-step",
      type: "en-route",
      icon: <MdPlace className="w-5 h-5" aria-hidden="true" />,
      title: "En route",
      subtitle: "Suivez le tracé",
      bg: "bg-blue-50",
      text: "text-action-primary",
      customColor: ""
    }];
  }, [journey]);

  const currentStep = activeSteps[0];
  const futureSteps = activeSteps.slice(1);

  return (
    <div 
      className="absolute bottom-0 left-0 w-full z-20"
      role="region" 
      aria-label="Informations de navigation en temps réel"
    >
      <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-6 pt-1 pb-6 transform transition-transform duration-300 max-h-[85dvh] overflow-y-auto custom-scrollbar">
        
        {/* 👆 ZONE DE LA POIGNÉE */}
        <div 
          className="w-full py-4 cursor-grab active:cursor-grabbing group flex flex-col items-center select-none touch-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Glisser vers le bas pour réduire le panneau" : "Glisser vers le haut pour ouvrir le panneau"}
        >
          <div className="w-12 h-1.5 bg-gray-300 group-hover:bg-gray-400 transition-colors rounded-full pointer-events-none" aria-hidden="true"></div>
        </div>

        {/* ⏱️ BLOC PRINCIPAL */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium font-poppins text-sm mb-1" aria-hidden="true">
              Arrivée prévue à {eta}
            </span>
            <div className="flex items-baseline gap-2">
              <h1 className="text-4xl font-bold text-secondary-600 font-poppins">
                {durationInMinutes}
              </h1>
              <span className="text-xl font-medium text-secondary-600 font-lato">min</span>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExit();
            }}
            className="bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm flex items-center gap-2 mt-2"
            aria-label="Quitter la navigation"
          >
            <span aria-hidden="true">✖</span> Quitter
          </button>
        </div>

        {/* 📦 CONTENU DÉPLIABLE */}
        {isExpanded && (
          <div className="mt-4 flex flex-col gap-5 animate-fadeIn">
            
            {/* 🚦 Statut du Trafic (Mock statique restauré) */}
            <div>
              {trafficStatus === 0 && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-xl" role="status">
                  <MdCheckCircleOutline className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span className="font-medium text-sm font-poppins">Trafic fluide sur votre trajet</span>
                </div>
              )}
              {trafficStatus === 1 && (
                <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 text-orange-800 p-3 rounded-xl shadow-sm" role="alert">
                  <MdOutlineWarningAmber className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span className="font-medium text-sm font-poppins">
                    Perturbation signalée sur votre itinéraire
                  </span>
                </div>
              )}
            </div>

            {/* 📍 ÉTAPE ACTUELLE */}
            <div className="bg-page border-2 border-secondary-500 p-4 rounded-xl shadow-sm flex flex-col">
              <h3 className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-3">
                Prochaine étape
              </h3>
              <div className="flex items-center gap-4">
                <div 
                  className={`p-3 rounded-lg shrink-0 flex items-center justify-center ${currentStep.bg || ''} ${currentStep.text || ''}`}
                  style={currentStep.customColor ? { backgroundColor: currentStep.customColor, color: '#ffffff' } : {}}
                >
                   {currentStep.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-text-primary font-poppins text-sm">{currentStep.title}</span>
                  <span className="text-text-tertiary text-xs mt-0.5">
                    {currentStep.type === 'walk' ? `Pendant environ ${currentStep.subtitle}` : currentStep.subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* 🛤️ ÉTAPES FUTURES */}
            {futureSteps.length > 0 && (
              <div className="px-2 pb-2">
                <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-3">
                  Ensuite
                </h4>
                <ol className="flex flex-col gap-4" aria-label="Étapes suivantes du trajet">
                  {futureSteps.map((step, index) => (
                    <li key={step.id} className="relative flex items-center gap-3 group">
                      
                      {index !== futureSteps.length - 1 && (
                        <div 
                          className="absolute left-[11px] top-6 -bottom-4 w-[2px] bg-gray-200 group-hover:bg-gray-300 transition-colors z-0" 
                          aria-hidden="true"
                        ></div>
                      )}

                      <div 
                        className={`relative z-10 w-6 h-6 rounded-md flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity ${step.bg || 'bg-gray-100'} ${step.text || 'text-gray-500'}`}
                        style={step.customColor ? { backgroundColor: step.customColor, color: '#ffffff' } : {}}
                      >
                        {step.icon}
                      </div>
                      
                      <div className="flex items-baseline gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <span className="font-semibold text-gray-600 text-xs">{step.title}</span>
                        <span className="text-gray-400 text-[10px]">{step.subtitle}</span>
                      </div>

                    </li>
                  ))}
                </ol>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}