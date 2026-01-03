
'use client';

import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';

export type MetricType = 'aqi' | 'wqi' | 'noise';
export type RiskLevel = "good" | "moderate" | "poor" | "severe";
type AdvisoryType = 'alert' | 'info';

export interface PollutionData {
  aqi: number;
  wqi: number;
  noise: number; // dB
  updatedAt: string; // Using string for mock data simplicity
  riskLevel: RiskLevel;
  lat: number;
  lng: number;
}

export interface Ward {
  id: string;
  name: string;
  live_data: PollutionData;
}

export interface CityData {
    id: string;
    name: string;
    wards: Ward[];
    advisories: {
        type: AdvisoryType;
        title: string;
        description: string;
    }[];
}

export interface LocationDataContext {
  [key: string]: CityData;
}

// --- Mock Data ---
const pseudoRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
};

const generateWardData = (id: string, name: string, lat: number, lng: number, aqiRange: [number, number], wqiRange: [number, number], noiseRange: [number, number]): Ward => {
    const seed = id + name;
    const rand1 = pseudoRandom(seed + 'a');
    const rand2 = pseudoRandom(seed + 'b');
    const rand3 = pseudoRandom(seed + 'c');

    const aqi = Math.floor(rand1 * (aqiRange[1] - aqiRange[0]) + aqiRange[0]);
    const wqi = Math.floor(rand2 * (wqiRange[1] - wqiRange[0]) + wqiRange[0]);
    const noise = Math.floor(rand3 * (noiseRange[1] - noiseRange[0]) + noiseRange[0]);
    
    let riskLevel: RiskLevel = 'good';
    if (aqi > 200 || wqi < 40 || noise > 100) riskLevel = 'severe';
    else if (aqi > 100 || wqi < 60 || noise > 80) riskLevel = 'poor';
    else if (aqi > 50 || wqi < 80 || noise > 60) riskLevel = 'moderate';

    return {
        id,
        name,
        live_data: {
            aqi,
            wqi,
            noise,
            lat,
            lng,
            updatedAt: `${Math.floor(rand1 * 10) + 1} min ago`,
            riskLevel,
        }
    };
};

const initialLocationData: LocationDataContext = {
    'Bengaluru': {
        id: 'bengaluru',
        name: 'Bengaluru',
        wards: [
            generateWardData('koramangala', 'Koramangala', 12.9352, 77.6245, [30, 60], [75, 95], [55, 70]),
            generateWardData('jayanagar', 'Jayanagar', 12.9308, 77.5838, [45, 80], [70, 90], [60, 75]),
            generateWardData('indiranagar', 'Indiranagar', 12.9784, 77.6408, [55, 90], [65, 85], [65, 85]),
            generateWardData('whitefield', 'Whitefield', 12.9698, 77.7499, [80, 150], [50, 75], [70, 90]),
            generateWardData('hebbal', 'Hebbal', 13.0357, 77.5972, [60, 110], [60, 80], [65, 78]),
            generateWardData('marathahalli', 'Marathahalli', 12.9569, 77.7011, [90, 180], [45, 70], [75, 95]),
            generateWardData('electronic-city', 'Electronic City', 12.8452, 77.6602, [70, 130], [55, 78], [70, 88]),
            generateWardData('bellandur', 'Bellandur', 12.9304, 77.6784, [150, 250], [20, 45], [70, 85]),
            generateWardData('varthur', 'Varthur', 12.9436, 77.7494, [120, 220], [30, 55], [68, 82]),
            generateWardData('yelahanka', 'Yelahanka', 13.1007, 77.5963, [50, 90], [70, 85], [60, 75]),
            generateWardData('rajajinagar', 'Rajajinagar', 12.9904, 77.5513, [70, 120], [65, 80], [68, 82]),
            generateWardData('malleshwaram', 'Malleshwaram', 13.0039, 77.5704, [65, 100], [70, 88], [62, 77]),
            generateWardData('shivajinagar', 'Shivajinagar', 12.9859, 77.6057, [80, 140], [60, 75], [72, 88]),
            generateWardData('basavanagudi', 'Basavanagudi', 12.9421, 77.5714, [40, 75], [75, 92], [58, 72]),
            generateWardData('hsr-layout', 'HSR Layout', 12.9121, 77.6446, [60, 100], [68, 85], [65, 80]),
        ],
        advisories: [
            { type: 'alert', title: 'High Pollution Alert in Bellandur', description: 'AQI has reached severe levels. Residents are advised to stay indoors.' },
            { type: 'info', title: 'No Critical Alerts City-Wide', description: 'Overall city conditions are moderate. Monitor your specific ward for details.' }
        ]
    },
    'New York': {
        id: 'new-york',
        name: 'New York',
        wards: [
            generateWardData('manhattan', 'Manhattan', 40.7831, -73.9712, [70, 120], [80, 95], [70, 90]),
            generateWardData('brooklyn', 'Brooklyn', 40.6782, -73.9442, [60, 100], [75, 90], [65, 85]),
            generateWardData('queens', 'Queens', 40.7282, -73.7949, [50, 90], [85, 98], [60, 80]),
            generateWardData('bronx', 'The Bronx', 40.8448, -73.8648, [80, 140], [70, 85], [68, 88]),
            generateWardData('staten-island', 'Staten Island', 40.5795, -74.1502, [30, 60], [90, 99], [50, 65]),
        ],
        advisories: [
            { type: 'alert', title: 'Air Quality Alert', description: 'High levels of ozone detected in The Bronx. Stay indoors if you have respiratory issues.' },
        ]
    }
};

interface LocationContextType {
  location: string;
  setLocation: (location: string, redirect?: boolean) => void;
  locationData: LocationDataContext;
}

export const LocationContext = createContext<LocationContextType>({
  location: 'Bengaluru',
  setLocation: () => {},
  locationData: initialLocationData,
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState('Bengaluru');
  const [locationData] = useState<LocationDataContext>(initialLocationData);

  const setLocation = useCallback((newLocation: string) => {
    setLocationState(newLocation);
  }, []);

  const value = { location, setLocation, locationData };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
