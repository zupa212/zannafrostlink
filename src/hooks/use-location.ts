"use client";

import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  city?: string;
  country?: string;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // IP-based location fetching so it won't prompt for permission
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Fallback for standard structure if ipapi limits are hit
        const city = data.city || "Athens";
        const country = data.country_name || "Greece";

        setLocation({
          latitude: data.latitude || 37.9838,
          longitude: data.longitude || 23.7275,
          city,
          country,
          error: null,
          loading: false,
        });
      } catch (err) {
        setLocation({
          latitude: null,
          longitude: null,
          error: "Failed to fetch address",
          loading: false,
        });
      }
    };

    fetchLocation();
  }, []);

  return location;
};
