
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Minimize, Loader } from 'lucide-react';
import { type WardData } from './types';
import { type MetricType } from '@/context/LocationContext';
import HeatLayer from './HeatLayer';


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

  return (
    <div className="fixed inset-0 z-[200]">
      <div ref={mapContainerRef} className="h-full w-full leaflet-container-z-index" />
      {mapRef.current && <HeatLayer map={mapRef.current} wards={wardsData} activeMetric={activeMetric} />}
      <Button
        variant="secondary"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-[1001] h-12 w-12 rounded-full shadow-lg"
      >
        <Minimize className="h-6 w-6" />
      </Button>
      {isLoading && (
        <div className="absolute inset-0 z-[1002] bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default FullScreenMap;
