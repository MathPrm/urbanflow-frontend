"use client";

import Co2Badge from "./Co2Badge";

// 1. Les interfaces TypeScript
export interface Section {
  type: string; 
  mode?: string;
  duration: number;
  display_informations?: {
    code: string; 
    color: string; 
    text_color: string; 
    network: string; 
  };
}

export interface Journey {
  duration: number;
  nb_transfers: number;
  departure_date_time: string;
  arrival_date_time: string;
  co2_emission?: {
    value: number;
  };
  fare?: {
    found: boolean;
    total?: {
      value: string;
      currency: string;
    };
  };
  sections: Section[];
}

interface JourneyCardProps {
  journey: Journey;
  isEcoRecommended?: boolean;
}

// 2. Fonction utilitaire pour formater l'heure de Navitia (ex: YYYYMMDDTHHMMSS -> HH:mm)
const formatTime = (navitiaDate: string) => {
  if (!navitiaDate) return "";
  const match = navitiaDate.match(/T(\d{2})(\d{2})/);
  if (match) {
    return `${match[1]}:${match[2]}`;
  }
  return navitiaDate;
};

export default function JourneyCard({ journey, isEcoRecommended = false }: JourneyCardProps) {
  // Calculs préalables
  const durationInMinutes = Math.round(journey.duration / 60);
  const co2Value = journey.co2_emission ? Math.round(journey.co2_emission.value) : 0;
  
  // Formatage du prix
  let formattedFare = null;
  if (journey.fare?.found && journey.fare.total?.value) {
    const priceValue = parseFloat(journey.fare.total.value) / 100;
    formattedFare = `${priceValue.toFixed(2).replace('.', ',')} €`;
  }
  
  // Formatage des heures de départ et d'arrivée
  const departureTime = formatTime(journey.departure_date_time);
  const arrivalTime = formatTime(journey.arrival_date_time);

  // Filtre des sections
  const timelineSections = journey.sections?.filter(
    (section) => section.type === "public_transport" || (section.type === "street_network" && section.duration > 60)
  ) || [];

  // Logique UI
  const cardBorderClass = isEcoRecommended 
    ? "border-secondary-400 shadow-lg" 
    : "border-transparent hover:border-secondary-500 shadow-md"; 

  // Utilisation de <article> : C'est une carte de contenu indépendante
  return (
    <article 
      className={`bg-page border-2 rounded-2xl p-4 flex flex-col gap-3 transition-all cursor-pointer relative ${cardBorderClass}`}
      aria-label={`Trajet de ${durationInMinutes} minutes, départ à ${departureTime}`}
    >
      
      {isEcoRecommended && (
        <div className="absolute -top-3 left-4 bg-secondary-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm font-poppins flex items-center gap-1.5">
          <div 
            className="w-3.5 h-3.5 bg-current" 
            style={{
              WebkitMask: "url('/icons/icon-plante-ecologie.svg') no-repeat center / contain",
              mask: "url('/icons/icon-plante-ecologie.svg') no-repeat center / contain"
            }}
            aria-hidden="true"
          />
          <span>Choix Écologique</span>
        </div>
      )}

      {/* Utilisation de <header> : En-tête de la carte */}
      <header className={`flex justify-between items-center ${isEcoRecommended ? 'mt-2' : ''}`}>
        <div className="text-xl font-bold text-text-primary font-lato">
          {/* Utilisation de <time> pour le SEO */}
          <time dateTime={journey.departure_date_time}>{departureTime}</time>
          {/* aria-hidden cache la flèche aux lecteurs d'écran */}
          <span className="text-text-tertiary font-medium mx-1 text-base" aria-hidden="true">➔</span> 
          <time dateTime={journey.arrival_date_time}>{arrivalTime}</time>
        </div>
        <div className="text-lg font-bold text-secondary-500 font-lato" aria-label={`Durée totale : ${durationInMinutes} minutes`}>
          {durationInMinutes} min
        </div>
      </header>

      {/* Utilisation de <ol> : Une suite de transports est une liste ordonnée */}
      <ol className="flex flex-wrap items-center gap-2 mt-1" aria-label="Étapes du trajet">
        {timelineSections.map((section, index) => {
          const isLast = index === timelineSections.length - 1;
          
          if (section.type === "public_transport" && section.display_informations) {
            const { code, color, text_color, network } = section.display_informations;
            return (
              <li key={index} className="flex items-center gap-2">
                <span 
                  className="px-2 py-1 text-sm font-bold rounded-sm shadow-sm"
                  style={{ backgroundColor: `#${color}`, color: `#${text_color}` }}
                  title={`Prendre la ligne ${code} du réseau ${network || 'de transport'}`}
                >
                  {code}
                </span>
                {!isLast && <span className="text-text-tertiary text-xs" aria-hidden="true">➔</span>}
              </li>
            );
          } 
          
          if (section.type === "street_network") {
            return (
              <li key={index} className="flex items-center gap-2" title="Marche à pied">
                <div 
                  className="w-5 h-5 bg-secondary-600" 
                  style={{
                    WebkitMask: "url('/icons/icon-trajet-pieton.svg') no-repeat center / contain",
                    mask: "url('/icons/icon-trajet-pieton.svg') no-repeat center / contain"
                  }}
                  aria-hidden="true"
                />
                {!isLast && <span className="text-text-tertiary text-xs" aria-hidden="true">➔</span>}
              </li>
            );
          }
          return null;
        })}
      </ol>

      {/* Utilisation de <footer> : Pied de la carte */}
      <footer className="flex justify-between items-center mt-2 pt-3 border-t border-quinary-200">
        <div className="text-sm font-bold text-text-primary">
          {formattedFare ? (
            <span aria-label={`Prix : ${formattedFare}`}>{formattedFare}</span>
          ) : (
            <span className="text-text-tertiary font-normal text-xs italic">Prix non calculé</span>
          )}
        </div>
        <Co2Badge amount={co2Value} />
      </footer>
    </article>
  );
}