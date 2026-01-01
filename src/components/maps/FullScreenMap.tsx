
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Minimize, Loader } from 'lucide-react';
import { type WardData } from './types';
import { getAqiColor, getAqiStatus } from './utils';

interface FullScreenMapProps {
  cityId: string;
  wardsData: WardData[];
  isLoading: boolean;
  onClose: () => void;
}

const cityCenters: { [key: string]: L.LatLngExpression } = {
  'bengaluru': [12.9716, 77.5946],
  'new-york': [40.7128, -74.0060],
};

const FullScreenMap = ({ cityId, wardsData, isLoading, onClose }: FullScreenMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup());

  const mapCenter = cityCenters[cityId] || cityCenters['bengaluru'];

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
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

      mapRef.current = L.map(mapContainerRef.current).setView(mapCenter, 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      markersRef.current.addTo(mapRef.current);

      mapRef.current.invalidateSize();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Run only once

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(mapCenter, 12);
    }
  }, [cityId, mapCenter]);

  useEffect(() => {
    if (markersRef.current) {
      markersRef.current.clearLayers();
      wardsData.forEach((ward) => {
        const marker = L.circleMarker([ward.lat, ward.lng], {
          color: getAqiColor(ward.aqi),
          fillColor: getAqiColor(ward.aqi),
          fillOpacity: 0.6,
          radius: 8 + (ward.aqi / 20),
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
  }, [wardsData]);

  return (
    <div className="fixed inset-0 z-[200] bg-background">
      <div ref={mapContainerRef} className="h-full w-full" />
      <Button
        variant="secondary"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-[401] h-12 w-12 rounded-full shadow-lg"
      >
        <Minimize className="h-6 w-6" />
      </Button>
      {isLoading && (
        <div className="absolute inset-0 z-[402] bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default FullScreenMap;
