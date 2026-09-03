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
    <div style="width: 32px; height: 32px;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 3px 5px rgba(0,0,0,0.3)); display: block;">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
        <circle cx="12" cy="9" r="2.5" fill="#ffffff" stroke="none"></circle>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 30],
});

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

    let destination: [number, number] | null = null;

    // 🎯 1. Priorité absolue : s'accrocher au tout dernier point du tracé visuel pour garantir le contact avec la ligne
    if (allCoords.length > 0) {
      destination = allCoords[allCoords.length - 1];
    }

    // 2. Fallback de sécurité : Utiliser les métadonnées de Navitia si aucun tracé GeoJSON n'a été fourni
    if (!destination) {
      const journeyTo = (journey as unknown as { to?: MapSection['to'] })?.to;
      if (journeyTo?.coord?.lat && journeyTo?.coord?.lon) {
        destination = [parseFloat(journeyTo.coord.lat), parseFloat(journeyTo.coord.lon)];
      } else if (journeyTo?.stop_point?.coord?.lat && journeyTo?.stop_point?.coord?.lon) {
        destination = [parseFloat(journeyTo.stop_point.coord.lat), parseFloat(journeyTo.stop_point.coord.lon)];
      } else if (journeyTo?.place?.coord?.lat && journeyTo?.place?.coord?.lon) {
        destination = [parseFloat(journeyTo.place.coord.lat), parseFloat(journeyTo.place.coord.lon)];
      }
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

      minZoom={9}
      maxBounds={[
        [47.8, 1.2],
        [49.5, 3.8]
      ]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${process.env.NEXT_PUBLIC_CARTO_API_KEY}`}
      />

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
      

      {destination && (
        <Marker position={destination} icon={destinationPinIcon} />
      )}

      <CircleMarker 
        center={[lat, lon]} 
        radius={14} 
        pathOptions={{ color: 'transparent', fillColor: '#3b82f6', fillOpacity: 0.3, weight: 0 }} 
      />

      <CircleMarker 
        center={[lat, lon]} 
        radius={8} 
        pathOptions={{ color: 'white', fillColor: '#3b82f6', fillOpacity: 1, weight: 3 }} 
      />

      <FitBoundsOnce positions={allCoords} userLat={lat} userLon={lon} />
    </MapContainer>
  );
}