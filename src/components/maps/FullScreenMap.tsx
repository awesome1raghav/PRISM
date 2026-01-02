
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Minimize, Loader } from 'lucide-react';
import { type WardData } from './types';
import { getMetricColor, getMetricStatus, getMetricUnit } from './utils';
import { type MetricType } from '@/context/LocationContext';

interface FullScreenMapProps {
  cityId: string;
  wardsData: WardData[];
  isLoading: boolean;
  onClose: () => void;
  activeMetric: MetricType;
}

const cityCenters: { [key: string]: L.LatLngExpression } = {
  'bengaluru': [12.9716, 77.5946],
  'new-york': [40.7128, -74.0060],
};

const FullScreenMap = ({ cityId, wardsData, isLoading, onClose, activeMetric }: FullScreenMapProps) => {
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

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(mapCenter, 12);
    }
  }, [cityId, mapCenter]);

  useEffect(() => {
    if (markersRef.current) {
      markersRef.current.clearLayers();
      wardsData.forEach((ward) => {
        const value = ward[activeMetric];
        if (value === undefined) return;

        const color = getMetricColor(activeMetric, value);
        const status = getMetricStatus(activeMetric, value);
        const unit = getMetricUnit(activeMetric);
        const radius = 10 + (value / 10);

        const marker = L.circleMarker([ward.lat, ward.lng], {
          renderer: L.svg(),
          radius: radius,
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.3
        }).bindPopup(`
           <div class="font-sans p-1">
            <h3 class="font-bold text-base mb-2 border-b border-border pb-1">${ward.name}</h3>
            <p class="text-sm"><strong>${activeMetric.toUpperCase()}:</strong> ${value} ${unit}</p>
            <p class="text-sm"><strong>Status:</strong> ${status}</p>
          </div>
        `);
        markersRef.current.addLayer(marker);
      });
    }
  }, [wardsData, activeMetric]);

  return (
    <div className="fixed inset-0 z-[200]">
      <div ref={mapContainerRef} className="h-full w-full leaflet-container-z-index" />
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
