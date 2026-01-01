
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

interface WardData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
}

const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 200) return 'orange';
  return 'red';
};

const getAqiStatus = (aqi: number) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 200) return 'Poor';
  return 'Severe';
};

const cityCenters: { [key: string]: L.LatLngExpression } = {
  'bengaluru': [12.9716, 77.5946],
  'new-york': [40.7128, -74.0060],
};
const defaultCenter = cityCenters['bengaluru'];

const CitizenHeatmap = ({ cityId = 'bengaluru' }: { cityId: string }) => {
  const mapRef = useRef<L.Map | null>(null);
  const firestore = useFirestore();
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup());

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current) {
      // Set default icon paths
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

      mapRef.current = L.map('map').setView(defaultCenter, 11);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
      
      markersRef.current.addTo(mapRef.current);
    }

    // Cleanup function to remove map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Effect to update map center when cityId changes
  useEffect(() => {
    if (mapRef.current) {
      const newCenter = cityCenters[cityId] || defaultCenter;
      mapRef.current.flyTo(newCenter, 11);
    }
  }, [cityId]);

  // Effect to subscribe to Firestore data
  useEffect(() => {
    if (!firestore || !cityId) return;

    const wardsCollectionPath = `locations/${cityId}/wards`;
    const q = query(collection(firestore, wardsCollectionPath));

    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        markersRef.current.clearLayers();
        querySnapshot.forEach((doc) => {
          const ward = { id: doc.id, ...doc.data() } as WardData;
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
      },
      (err) => {
        console.error("Firestore snapshot error:", err);
      }
    );

    return () => unsubscribe();
  }, [firestore, cityId]);


  return <div id="map" style={{ height: "420px" }} className="w-full rounded-xl" />;
};

export default CitizenHeatmap;
