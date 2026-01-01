
'use client';

import { useState, useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { collection, onSnapshot, query } from 'firebase/firestore';
import type { LatLngExpression } from 'leaflet';

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

const cityCenters: { [key: string]: LatLngExpression } = {
  'bengaluru': [12.9716, 77.5946],
  'new-york': [40.7128, -74.0060],
};
const defaultCenter = cityCenters['bengaluru'];

function MapMarkers({ cityId }: { cityId: string }) {
  const map = useMap();
  const firestore = useFirestore();
  const [wards, setWards] = useState<WardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newCenter = cityCenters[cityId] || defaultCenter;
    map.flyTo(newCenter, 11);
  }, [cityId, map]);

  useEffect(() => {
    if (!firestore || !cityId) return;

    setIsLoading(true);
    setError(null);
    setWards([]);
    
    const wardsCollectionPath = `locations/${cityId}/wards`;
    const q = query(collection(firestore, wardsCollectionPath));

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const wardsData: WardData[] = [];
        querySnapshot.forEach((doc) => {
          wardsData.push({ id: doc.id, ...doc.data() } as WardData);
        });
        setWards(wardsData);
        setIsLoading(false);
      }, 
      (err) => {
        console.error("Firestore snapshot error:", err);
        setError("Data unavailable. Could not fetch pollution data.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, cityId]);

  return (
    <>
      {wards.map(ward => (
        <CircleMarker
          key={ward.id}
          center={[ward.lat, ward.lng]}
          pathOptions={{
            color: getAqiColor(ward.aqi),
            fillColor: getAqiColor(ward.aqi),
            fillOpacity: 0.6,
          }}
          radius={5 + (ward.aqi / 20)}
        >
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-base mb-1">{ward.name}</h3>
              <p>
                <strong>AQI:</strong> {ward.aqi}
              </p>
              <p>
                <strong>Status:</strong> {getAqiStatus(ward.aqi)}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
      
      {(isLoading || error || wards.length === 0) && (
         <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-[1000] pointer-events-none rounded-md">
            <div className="text-center p-4 bg-background/80 rounded-lg">
                {isLoading && <p className="font-semibold text-foreground animate-pulse">Waiting for pollution data...</p>}
                {error && <p className="font-semibold text-destructive">{error}</p>}
                {!isLoading && !error && wards.length === 0 && <p className="font-semibold text-muted-foreground">No sensor data found for this location.</p>}
            </div>
        </div>
      )}
    </>
  );
};

const CitizenHeatmap = ({ cityId = 'bengaluru' }: { cityId: string }) => {
  const mapCenter = cityCenters[cityId] || defaultCenter;
  const zoom = 11;

  return (
    <div className="h-[420px] w-full rounded-xl bg-muted">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarkers cityId={cityId} />
      </MapContainer>
    </div>
  );
};

export default CitizenHeatmap;

    