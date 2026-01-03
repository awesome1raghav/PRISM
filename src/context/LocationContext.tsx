
'use client';

import React, { createContext, useState, ReactNode, useCallback } from 'react';
import initialLocationData from '@/lib/mock-data.json';


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
