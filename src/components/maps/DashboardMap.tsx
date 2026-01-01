
'use client';

import { useEffect, useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type WardData } from './types';
import { getAqiColor, getAqiStatus } from './utils';

interface DashboardMapProps {
  center: LatLngExpression;
  zoom: number;
  wards: WardData[];
}

const DashboardMap = ({ center, zoom, wards }: DashboardMapProps) => {
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
        const marker = L.circleMarker([ward.lat, ward.lng], {
          color: getAqiColor(ward.aqi),
          fillColor: getAqiColor(ward.aqi),
          fillOpacity: 0.6,
          radius: 5 + (ward.aqi / 20),
        }).bindPopup(`
          <div class="font-sans">
            <h3 class="font-bold text-base mb-1">${ward.name}</h3>
            <p><strong>AQI:</strong> ${ward.aqi}</p>
            <p><strong>Status:</strong> ${getAqiStatus(ward.aqi)}</p>
          </div>
        `);
        markersRef.current.addLayer(marker);
      });
    }
  }, [wards]);

  return <div ref={mapContainerRef} className="h-[420px] w-full rounded-xl" />;
};

export default DashboardMap;
