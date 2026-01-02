
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

const Legend = ({ map, metric }: { map: L.Map | null, metric: MetricType }) => {
    const legendRef = useRef<L.Control>();

    useEffect(() => {
        if (!map) return;

        if (legendRef.current) {
            legendRef.current.remove();
        }

        const legend = new L.Control({ position: 'bottomright' });

        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend bg-background/80 p-4 rounded-lg shadow-lg border border-border/30 w-48');
            const grades: {value: number, label: string}[] = [
                { value: 0, label: 'Good' },
                { value: 51, label: 'Moderate' },
                { value: 101, label: 'Poor' },
                { value: 201, label: 'Severe' },
            ];
             if (metric === 'wqi') {
                grades.splice(0, grades.length, { value: 80, label: 'Good'}, {value: 60, label: 'Moderate'}, {value: 40, label: 'Poor'}, {value: 0, label: 'Severe'});
            } else if (metric === 'noise') {
                grades.splice(0, grades.length, { value: 0, label: 'Good'}, {value: 61, label: 'Moderate'}, {value: 81, label: 'Poor'}, {value: 101, label: 'Severe'});
            }
            
            div.innerHTML += `<h4 class="font-bold text-sm mb-2">${getMetricUnit(metric)} Levels</h4>`;

            for (let i = 0; i < grades.length; i++) {
                const color = getMetricColor(metric, grades[i].value);
                div.innerHTML +=
                    `<i class="inline-block w-4 h-4 mr-2" style="background:${color}; border-radius: 50%;"></i> ` +
                    `<span class="text-xs text-muted-foreground">${grades[i].label}</span><br>`;
            }

            return div;
        };
        legend.addTo(map);
        legendRef.current = legend;

    }, [map, metric]);

    return null;
}


const DashboardMap = ({ center, zoom, wards, activeMetric }: DashboardMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup());

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

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);

      markersRef.current.addTo(mapRef.current);

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

  useEffect(() => {
    if (markersRef.current) {
      markersRef.current.clearLayers();
      wards.forEach((ward) => {
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
  }, [wards, activeMetric]);

  return (
    <div className="relative h-[420px] w-full rounded-xl overflow-hidden">
        <div ref={mapContainerRef} className="h-full w-full leaflet-container-z-index" />
        <Legend map={mapRef.current} metric={activeMetric} />
    </div>
    );
};

export default DashboardMap;
