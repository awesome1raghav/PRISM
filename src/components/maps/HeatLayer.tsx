
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
      const status = getMetricStatus(activeMetric, value);
      const unit = getMetricUnit(activeMetric);

      // Base radius and opacity, adjust as needed for visual effect
      const baseRadius = 800; // in meters
      let intensity;

      if (activeMetric === 'aqi') {
          intensity = Math.min(value / 150, 1); // Normalize against a high AQI value
      } else if (activeMetric === 'wqi') {
          intensity = Math.min((100 - value) / 60, 1); // Normalize against a poor WQI value
      } else { // noise
          intensity = Math.min(value / 90, 1); // Normalize against a high noise value
      }
      
      const radius = baseRadius + (baseRadius * intensity * 2);
      const opacity = 0.1 + (intensity * 0.4);

      const heatCircle = L.circle([ward.lat, ward.lng], {
        renderer: L.svg(),
        radius: radius,
        color: 'transparent',
        fillColor: color,
        fillOpacity: opacity,
      }).bindPopup(`
          <div class="font-sans p-1">
            <h3 class="font-bold text-base mb-2 border-b border-border pb-1">${ward.name}</h3>
            <p class="text-sm"><strong>${activeMetric.toUpperCase()}:</strong> ${value} ${unit}</p>
            <p class="text-sm"><strong>Status:</strong> ${status}</p>
          </div>
        `);
      
      layer.addLayer(heatCircle);
    });
  }, [wards, activeMetric, map]);

  return null; // This component does not render any direct DOM elements
};

export default HeatLayer;
