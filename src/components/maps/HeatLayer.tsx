
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
      const baseRadius = 2500; // in meters - Increased for more overlap
      let intensity;

      if (activeMetric === 'aqi') {
          intensity = Math.min(value / 150, 1); // Normalize against a high AQI value
      } else if (activeMetric === 'wqi') {
          intensity = Math.min((100 - value) / 60, 1); // Normalize against a poor WQI value
      } else { // noise
          intensity = Math.min(value / 90, 1); // Normalize against a high noise value
      }
      
      const radius = baseRadius + (baseRadius * intensity); // Simplified radius logic for more impact
      const opacity = 0.2 + (intensity * 0.5); // Increased opacity

      const heatCircle = L.circle([ward.lat, ward.lng], {
        // Custom renderer to support gradients
        renderer: L.svg({ padding: 0.5 }),
        radius: radius,
        color: 'transparent',
        fillColor: color, // Fallback color
        fillOpacity: opacity,
      }).bindPopup(`
          <div class="font-sans p-1">
            <h3 class="font-bold text-base mb-2 border-b border-border pb-1">${ward.name}</h3>
            <p class="text-sm"><strong>${activeMetric.toUpperCase()}:</strong> ${value} ${unit}</p>
            <p class="text-sm"><strong>Status:</strong> ${status}</p>
          </div>
        `);
      
      // Apply radial gradient after adding to map
      heatCircle.on('add', function() {
        const circleElement = this.getElement();
        if (circleElement) {
            const svgNS = "http://www.w3.org/2000/svg";
            const defs = document.createElementNS(svgNS, 'defs');
            const gradient = document.createElementNS(svgNS, 'radialGradient');
            gradient.setAttribute('id', `gradient-${ward.id}-${activeMetric}`);
            
            const stop1 = document.createElementNS(svgNS, 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', color);
            stop1.setAttribute('stop-opacity', '0.7');

            const stop2 = document.createElementNS(svgNS, 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', color);
            stop2.setAttribute('stop-opacity', '0');

            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            
            circleElement.parentNode?.insertBefore(defs, circleElement);
            circleElement.setAttribute('fill', `url(#gradient-${ward.id}-${activeMetric})`);
        }
      });

      layer.addLayer(heatCircle);
    });
  }, [wards, activeMetric, map]);

  return null; // This component does not render any direct DOM elements
};

export default HeatLayer;
