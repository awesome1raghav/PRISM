
'use client';

import { useEffect, useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type WardData } from './types';
import { getMetricColor, getMetricStatus, getMetricUnit } from './utils';
import { type MetricType } from '@/context/LocationContext';

interface DashboardMapProps {
  center: LatLngExpression;
  zoom: number;
  wards: WardData[];
  activeMetric: MetricType;
}

const DashboardMap = ({ center, zoom, wards, activeMetric }: DashboardMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup());

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
        // This is a workaround for a known issue with Leaflet in Next.js
        const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
        const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
        const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
  
        const iconDefault = L.icon({
            iconUrl,
            iconRetinaUrl,
            shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        L.Marker.prototype.options.icon = iconDefault;


      mapRef.current = L.map(mapContainerRef.current, {
          scrollWheelZoom: false,
          zoomControl: false,
      }).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      markersRef.current.addTo(mapRef.current);

      // Invalidate size after the container is surely rendered
      setTimeout(() => {
          mapRef.current?.invalidateSize()
      }, 100)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(center, zoom);
    }
  }, [center, zoom]);

  useEffect(() => {
    if (markersRef.current) {
      markersRef.current.clearLayers();
      wards.forEach((ward) => {
        const value = ward[activeMetric];
        if (value === undefined) return;

        const color = getMetricColor(activeMetric, value);
        const status = getMetricStatus(activeMetric, value);
        const unit = getMetricUnit(activeMetric);
        
        const marker = L.circleMarker([ward.lat, ward.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.6,
          radius: 5 + (value / 20),
        }).bindPopup(`
          <div class="font-sans">
            <h3 class="font-bold text-base mb-1">${ward.name}</h3>
            <p><strong>${activeMetric.toUpperCase()}:</strong> ${value} ${unit}</p>
            <p><strong>Status:</strong> ${status}</p>
          </div>
        `);
        markersRef.current.addLayer(marker);
      });
    }
  }, [wards, activeMetric]);

  return <div ref={mapContainerRef} className="h-[420px] w-full rounded-xl leaflet-container-z-index" />;
};

export default DashboardMap;
