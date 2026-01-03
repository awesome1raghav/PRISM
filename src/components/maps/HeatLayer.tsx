
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import { type WardData } from './types';
import { type MetricType } from '@/context/LocationContext';

interface HeatLayerProps {
  map: L.Map;
  wards: WardData[];
  activeMetric: MetricType;
}

// Normalize value to a 0-1 scale for intensity
const normalizeValue = (metric: MetricType, value: number): number => {
    if (metric === 'aqi') {
        // Higher AQI is worse, scale up to 250
        return Math.min(value / 250, 1.0);
    }
    if (metric === 'wqi') {
        // Lower WQI is worse
        return Math.min((100 - value) / 100, 1.0);
    }
    // noise
    // Higher noise is worse, scale up to 120 dB
    return Math.min(value / 120, 1.0);
}

const HeatLayer = ({ map, wards, activeMetric }: HeatLayerProps) => {
  const layerRef = useRef<L.HeatLayer | null>(null);

  useEffect(() => {
    if (!layerRef.current) {
      layerRef.current = L.heatLayer([], {
          radius: 35,
          blur: 25,
          maxZoom: 12,
          minOpacity: 0.3,
          gradient: {
            0.1: "blue",
            0.3: "lime",
            0.5: "yellow",
            0.7: "orange",
            0.9: "red",
            1.0: "purple"
          }
      }).addTo(map);
    }

    const points = wards
      .map((ward) => {
        const value = ward[activeMetric];
        if (value === undefined || !ward.lat || !ward.lng) return null;
        const intensity = normalizeValue(activeMetric, value);
        return [ward.lat, ward.lng, intensity] as L.HeatLatLngTuple;
      })
      .filter((p): p is L.HeatLatLngTuple => p !== null);

    layerRef.current.setLatLngs(points);

  }, [wards, activeMetric, map]);

  return null;
};

export default HeatLayer;
