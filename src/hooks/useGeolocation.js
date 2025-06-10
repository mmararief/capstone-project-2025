// src/hooks/useGeolocation.js
import { useState, useEffect, useCallback } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser Anda.");
      setLoading(false);
      return;
    }

    const handleSuccess = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      setLoading(false);
    };

    const handleError = (err) => {
      setError(`Gagal mendapatkan lokasi: ${err.message}`);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Ekspos fungsi 'getLocation' sebagai 'refetch'
  return { location, error, loading, refetch: getLocation };
}
