
'use client';

import { useState, useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { collection, onSnapshot, query, DocumentData } from 'firebase/firestore';
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

// This component is responsible for programmatically updating the map view
// when the cityId prop changes.
const MapUpdater = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};


// This component contains the dynamic data fetching and marker rendering.
// It is a child of MapContainer, so its re-renders won't re-initialize the map.
const MapMarkers = ({ cityId }: { cityId: string }) => {
  const firestore = useFirestore();
  const [wards, setWards] = useState<WardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!firestore || !cityId) return;

    setIsLoading(true);
    setError(null);
    
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


// This is the main component. It renders the MapContainer ONCE.
const CitizenHeatmap = ({ cityId = 'bengaluru' }: { cityId: string }) => {
  const mapCenter: LatLngExpression = cityId === 'new-york' ? [40.7128, -74.0060] : [12.9716, 77.5946];

  return (
    <MapContainer
      center={mapCenter}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      className="bg-muted"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={mapCenter} zoom={11} />
      <MapMarkers cityId={cityId} />
    </MapContainer>
  );
};

export default CitizenHeatmap;
