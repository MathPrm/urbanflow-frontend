"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap, Polyline, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Journey, Section } from "../itinerary/JourneyCard";

interface MapSection extends Omit<Section, 'display_informations'> {
  geojson?: {
    coordinates: [number, number][];
  };
  display_informations?: {
    color: string;
  };
  to?: {
    coord?: { lat: string; lon: string };
    stop_point?: { coord?: { lat: string; lon: string } };
    place?: { coord?: { lat: string; lon: string } };
  };
}

const destinationPinIcon = L.divIcon({
  className: "custom-pin-marker",
  html: `
    <div style="position: relative; width: 32px; height: 32px; transform: translate(-16px, -32px); pointer-events: none;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 3px 5px rgba(0,0,0,0.3)); display: block;">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
        <circle cx="12" cy="9" r="2.5" fill="#ffffff" stroke="none"></circle>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// 📐 Composant pour ajuster la vue UNE SEULE FOIS au chargement initial
const FitBoundsOnce = ({ positions, userLat, userLon }: { positions: [number, number][], userLat: number, userLon: number }) => {
  const map = useMap();
  const hasCentered = useRef(false);
  
  useEffect(() => {
    if (map && positions.length > 0 && !hasCentered.current) {
      const allPoints: [number, number][] = [...positions, [userLat, userLon]];
      const bounds = L.latLngBounds(allPoints);
      
      map.fitBounds(bounds, { 
        paddingTopLeft: [50, 50],
        paddingBottomRight: [50, 150],
        maxZoom: 16 
      });
      
      hasCentered.current = true;
    }
  }, [map, positions, userLat, userLon]);

  return null;
};

interface LiveMapProps {
  lat: number;
  lon: number;
  journey?: Journey | null;
}

export default function LiveMap({ lat, lon, journey }: LiveMapProps) {
  
  const extractPathsAndData = () => {
    if (!journey || !journey.sections || journey.sections.length === 0) {
      return { paths: [], allCoords: [], destination: null };
    }
    
    const paths: { positions: [number, number][], color: string, weight: number, dashArray?: string }[] = [];
    const allCoords: [number, number][] = [];
    
    journey.sections.forEach((baseSection) => {
      const section = baseSection as MapSection;
      
      if (section.geojson && section.geojson.coordinates) {
        const positions = section.geojson.coordinates.map((coord) => {
          const pt: [number, number] = [coord[1], coord[0]];
          allCoords.push(pt);
          return pt;
        });
        
        let color = "#3b82f6";
        let weight = 6;
        let dashArray = undefined;

        if (section.type === "public_transport" && section.display_informations?.color) {
          color = `#${section.display_informations.color}`;
        } else if (section.type === "street_network" || section.type === "transfer") {
          color = "#94a3b8";
          dashArray = "6, 8";
          weight = 5;
        }

        paths.push({ positions, color, weight, dashArray });
      }
    });

    // 🎯 Extraction ultra-précise de la destination finale
    let destination: [number, number] | null = null;

    // 1. Essayer de récupérer les coordonnées officielles de fin de voyage Navitia (`journey.to` ou dernière section `to`)
    const journeyTo = (journey as unknown as { to?: MapSection['to'] })?.to;
    if (journeyTo?.coord?.lat && journeyTo?.coord?.lon) {
      destination = [parseFloat(journeyTo.coord.lat), parseFloat(journeyTo.coord.lon)];
    } else if (journeyTo?.stop_point?.coord?.lat && journeyTo?.stop_point?.coord?.lon) {
      destination = [parseFloat(journeyTo.stop_point.coord.lat), parseFloat(journeyTo.stop_point.coord.lon)];
    } else if (journeyTo?.place?.coord?.lat && journeyTo?.place?.coord?.lon) {
      destination = [parseFloat(journeyTo.place.coord.lat), parseFloat(journeyTo.place.coord.lon)];
    }

    // 2. Sinon, regarder dans le point d'arrivée (`to`) de la toute dernière section du trajet
    if (!destination && journey.sections.length > 0) {
      const lastSec = journey.sections[journey.sections.length - 1] as MapSection;
      const lastSecTo = lastSec?.to;
      if (lastSecTo?.coord?.lat && lastSecTo?.coord?.lon) {
        destination = [parseFloat(lastSecTo.coord.lat), parseFloat(lastSecTo.coord.lon)];
      } else if (lastSecTo?.stop_point?.coord?.lat && lastSecTo?.stop_point?.coord?.lon) {
        destination = [parseFloat(lastSecTo.stop_point.coord.lat), parseFloat(lastSecTo.stop_point.coord.lon)];
      } else if (lastSecTo?.place?.coord?.lat && lastSecTo?.place?.coord?.lon) {
        destination = [parseFloat(lastSecTo.place.coord.lat), parseFloat(lastSecTo.place.coord.lon)];
      }
    }

    // 3. Fallback de secours sur le dernier point tracé ou global
    if (!destination && paths.length > 0) {
      const lastPath = paths[paths.length - 1];
      if (lastPath.positions && lastPath.positions.length > 0) {
        destination = lastPath.positions[lastPath.positions.length - 1];
      }
    }

    if (!destination && allCoords.length > 0) {
      destination = allCoords[allCoords.length - 1];
    }
    
    return { paths, allCoords, destination };
  };

  const { paths: routePaths, allCoords, destination } = extractPathsAndData();

  if (!lat || !lon) return null;

  return (
    <MapContainer 
      center={[lat, lon]} 
      zoom={14} 
      className="w-full h-full z-0 bg-[#f8f9fa]"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${process.env.NEXT_PUBLIC_CARTO_API_KEY}`}
      />
      
      {/* 1. Tracés du trajet */}
      {routePaths.map((path, index) => (
        <Polyline 
          key={`path-${index}`} 
          positions={path.positions} 
          pathOptions={{ 
            color: path.color, 
            weight: path.weight, 
            dashArray: path.dashArray,
            opacity: 0.9,
            lineJoin: "round",
            lineCap: "round"
          }} 
        />
      ))}
      
      {/* 2. Marqueur d'arrivée positionné précisément sur la destination officielle Navitia */}
      {destination && (
        <Marker position={destination} icon={destinationPinIcon} />
      )}

      {/* 3. Halo de départ utilisateur */}
      <CircleMarker 
        center={[lat, lon]} 
        radius={14} 
        pathOptions={{ color: 'transparent', fillColor: '#3b82f6', fillOpacity: 0.3, weight: 0 }} 
      />

      {/* 4. Point bleu principal de l'utilisateur */}
      <CircleMarker 
        center={[lat, lon]} 
        radius={8} 
        pathOptions={{ color: 'white', fillColor: '#3b82f6', fillOpacity: 1, weight: 3 }} 
      />
      
      {/* 5. Cadrage initial unique */}
      <FitBoundsOnce positions={allCoords} userLat={lat} userLon={lon} />
    </MapContainer>
  );
}