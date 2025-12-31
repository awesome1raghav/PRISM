'use client';

import React, { useState, useEffect } from 'react';

type Status = "loading" | "success" | "error";

const GoogleMapsLoader = ({ children }: { children: (status: Status) => React.ReactNode }) => {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        console.error("Google Maps API key is missing or is a placeholder.");
        setStatus("error");
        return;
    }

    if (window.google && window.google.maps) {
      setStatus("success");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setStatus("success");
      // @ts-ignore
      window.googleMapsLoaded = true;
    };
    
    script.onerror = () => {
      setStatus("error");
    };

    document.head.appendChild(script);
    
    return () => {
      // Clean up the script tag if the component unmounts
      // Although for a root-level loader, this might not be necessary.
      const scripts = document.head.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.startsWith('https://maps.googleapis.com')) {
          document.head.removeChild(scripts[i]);
        }
      }
    };
  }, []);

  return <>{children(status)}</>;
};

export default GoogleMapsLoader;
