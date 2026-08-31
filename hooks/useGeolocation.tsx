import { useState } from "react";

interface Coordinates {
  lat: number;
  lon: number;
}

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: false,
  });

  const requestLocation = () => {
    setState((prev: GeolocationState) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        error: "La géolocalisation n'est pas supportée par votre navigateur.",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage = "Impossible de récupérer votre position.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Vous avez refusé l'accès à la géolocalisation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Les informations de localisation sont indisponibles.";
            break;
          case error.TIMEOUT:
            errorMessage = "La demande de localisation a expiré.";
            break;
        }
        setState({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },

      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return { ...state, requestLocation };
};