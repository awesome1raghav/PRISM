
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { type WardData } from './types';
import { getMetricColor, getMetricStatus, getMetricUnit } from './utils';
import { type MetricType } from '@/context/LocationContext';

interface HeatLayerProps {
  map: L.Map;
  wards: WardData[];
  activeMetric: MetricType;
}

const HeatLayer = ({ map, wards, activeMetric }: HeatLayerProps) => {
  const layerRef = useRef<L.LayerGroup>(new L.LayerGroup());

  useEffect(() => {
    const layer = layerRef.current;
    layer.addTo(map);
    return () => {
      layer.remove();
    };
  }, [map]);

  useEffect(() => {
    const layer = layerRef.current;
    layer.clearLayers();

    wards.forEach((ward) => {
      const value = ward[activeMetric];
      if (value === undefined) return;

      const color = getMetricColor(activeMetric, value);
      
      const baseRadius = 2500; 
      let intensity;

      if (activeMetric === 'aqi') {
          intensity = Math.min(value / 150, 1);
      } else if (activeMetric === 'wqi') {
          intensity = Math.min((100 - value) / 60, 1);
      } else { // noise
          intensity = Math.min(value / 90, 1);
      }
      
      const radius = baseRadius * (1 + intensity * 0.5); // Increase radius based on intensity
      const opacity = 0.3 + (intensity * 0.4); // More aggressive opacity

      const heatCircle = L.circle([ward.lat, ward.lng], {
        radius: radius,
        color: color, // Use color for the border
        weight: 0, // No border weight
        fillColor: color,
        fillOpacity: opacity,
      });

      layer.addLayer(heatCircle);
    });
  }, [wards, activeMetric, map]);

  return null; // This component does not render any direct DOM elements
};

export default HeatLayer;
