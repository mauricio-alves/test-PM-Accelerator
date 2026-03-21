import { useState } from "react";

export function useGeolocation() {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getLocation = (onSuccess: (city: string) => void) => {
    if (!navigator.geolocation) {
      setLocationError("location.not_supported");
      return;
    }

    setLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village;

          if (city) {
            onSuccess(city);
          } else {
            setLocationError("location.city_not_found");
          }
        } catch (err) {
          console.error("Erro ao obter cidade por geolocalização", err);
          setLocationError("location.error");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        setLocationError("location.denied");
        setLoadingLocation(false);
      },
    );
  };

  return { getLocation, loadingLocation, locationError };
}
