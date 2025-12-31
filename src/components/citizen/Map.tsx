'use client';

import React, { useRef, useEffect } from 'react';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 16.5062, lng: 80.6480 }, // Center on Vijayawada, India
        zoom: 12,
        mapId: 'PRISM_CITIZEN_MAP', // Required for advanced markers and styling
        disableDefaultUI: true,
        zoomControl: true,
      });
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
