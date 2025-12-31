
'use client';

import { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { collection, query } from 'firebase/firestore';
import { useCollection, useFirestore } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface WardData {
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

const CitizenHeatmap = () => {
  const firestore = useFirestore();

  const wardsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'locations/bengaluru/wards'));
  }, [firestore]);

  const { data: wards, isLoading, error } = useCollection<WardData>(wardsQuery);

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error || !wards || wards.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">
          {error ? `Error: ${error.message}` : 'No pollution data available.'}
        </p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {wards.map(ward => (
        <CircleMarker
          key={ward.id}
          center={[ward.lat, ward.lng]}
          pathOptions={{
            color: getAqiColor(ward.aqi),
            fillColor: getAqiColor(ward.aqi),
            fillOpacity: 0.6,
          }}
          radius={5 + (ward.aqi / 20)} // Dynamic radius based on AQI
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
    </MapContainer>
  );
};

export default CitizenHeatmap;
