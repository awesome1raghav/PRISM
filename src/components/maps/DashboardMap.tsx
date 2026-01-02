
'use client';

import { useEffect, useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type WardData } from './types';
import { type MetricType } from '@/context/LocationContext';
import HeatLayer from './HeatLayer';

interface DashboardMapProps {
  center: LatLngExpression;
  zoom: number;
  wards: WardData[];
  activeMetric: MetricType;
}

const DashboardMap = ({ center, zoom, wards, activeMetric }: DashboardMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
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

      mapRef.current = L.map(mapContainerRef.current, {
          scrollWheelZoom: false,
          zoomControl: false,
      }).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div className="relative h-[420px] w-full rounded-xl overflow-hidden">
        <div ref={mapContainerRef} className="h-full w-full leaflet-container-z-index" />
        {mapRef.current && <HeatLayer map={mapRef.current} wards={wards} activeMetric={activeMetric} />}
    </div>
    );
};

export default DashboardMap;
