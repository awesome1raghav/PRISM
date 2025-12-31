
'use client';

import { useToast } from '@/hooks/use-toast';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

export type MetricType = 'aqi' | 'wqi' | 'noise';
export type RiskLevel = "good" | "moderate" | "poor" | "severe";
type AdvisoryType = 'alert' | 'info';

export interface PollutionData {
  aqi: number;
  wqi: number;
  noise: number; // dB
  updatedAt: string; // Using string for mock data simplicity
  riskLevel: RiskLevel;
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

const generateWardData = (id: string, name: string, aqiRange: [number, number], wqiRange: [number, number], noiseRange: [number, number]): Ward => {
    const aqi = Math.floor(Math.random() * (aqiRange[1] - aqiRange[0]) + aqiRange[0]);
    const wqi = Math.floor(Math.random() * (wqiRange[1] - wqiRange[0]) + wqiRange[0]);
    const noise = Math.floor(Math.random() * (noiseRange[1] - noiseRange[0]) + noiseRange[0]);
    
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
            updatedAt: `${Math.floor(Math.random() * 10) + 1} min ago`,
            riskLevel,
        }
    };
};

const initialLocationData: LocationDataContext = {
    'Bengaluru': {
        id: 'bengaluru',
        name: 'Bengaluru',
        wards: [],
        advisories: [
            { type: 'alert', title: 'High Pollution Alert in Bellandur', description: 'AQI has reached severe levels. Residents are advised to stay indoors.' },
            { type: 'info', title: 'No Critical Alerts City-Wide', description: 'Overall city conditions are moderate. Monitor your specific ward for details.' }
        ]
    },
    'New York': {
        id: 'new-york',
        name: 'New York',
        wards: [],
        advisories: [
            { type: 'alert', title: 'Air Quality Alert', description: 'High levels of ozone detected in The Bronx. Stay indoors if you have respiratory issues.' },
        ]
    }
};


interface LocationContextType {
  location: string;
  setLocation: (location: string) => void;
  locationData: LocationDataContext;
  isLocating: boolean;
  handleLocateMe: () => void;
}

export const LocationContext = createContext<LocationContextType>({
  location: 'Bengaluru',
  setLocation: () => {},
  locationData: initialLocationData,
  isLocating: false,
  handleLocateMe: () => {},
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState('Bengaluru');
  const [locationData, setLocationData] = useState<LocationDataContext>(initialLocationData);
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Generate data on the client side to prevent hydration mismatch
    const bengaluruWards = [
      generateWardData('koramangala', 'Koramangala', [30, 60], [75, 95], [55, 70]),
      generateWardData('jayanagar', 'Jayanagar', [45, 80], [70, 90], [60, 75]),
      generateWardData('indiranagar', 'Indiranagar', [55, 90], [65, 85], [65, 85]),
      generateWardData('whitefield', 'Whitefield', [80, 150], [50, 75], [70, 90]),
      generateWardData('hebbal', 'Hebbal', [60, 110], [60, 80], [65, 78]),
      generateWardData('marathahalli', 'Marathahalli', [90, 180], [45, 70], [75, 95]),
      generateWardData('electronic-city', 'Electronic City', [70, 130], [55, 78], [70, 88]),
      generateWardData('bellandur', 'Bellandur', [150, 250], [20, 45], [70, 85]),
      generateWardData('varthur', 'Varthur', [120, 220], [30, 55], [68, 82]),
    ];
    const newYorkWards = [
      generateWardData('manhattan', 'Manhattan', [70, 120], [80, 95], [70, 90]),
      generateWardData('brooklyn', 'Brooklyn', [60, 100], [75, 90], [65, 85]),
      generateWardData('queens', 'Queens', [50, 90], [85, 98], [60, 80]),
      generateWardData('bronx', 'The Bronx', [80, 140], [70, 85], [68, 88]),
      generateWardData('staten-island', 'Staten Island', [30, 60], [90, 99], [50, 65]),
    ];
    
    setLocationData(prevData => ({
        ...prevData,
        'Bengaluru': { ...prevData['Bengaluru'], wards: bengaluruWards },
        'New York': { ...prevData['New York'], wards: newYorkWards },
    }));
  }, []);

  const setLocation = (newLocation: string) => {
    // Check if the input is one of the keys or one of the names
    const foundKey = Object.keys(locationData).find(key => 
        key.toLowerCase() === newLocation.toLowerCase() || 
        locationData[key].name.toLowerCase() === newLocation.toLowerCase()
    );

    if (foundKey) {
        setLocationState(foundKey);
         toast({
            title: "Location Updated",
            description: `Showing data for ${locationData[foundKey].name}.`,
          });
    } else {
         toast({
            variant: "destructive",
            title: "Location Not Found",
            description: "We don't have data for this location yet. Showing default.",
          });
          setLocationState('Bengaluru');
    }
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // For this prototype, we'll just cycle through available locations
          const locations = Object.keys(locationData);
          const currentIndex = locations.indexOf(location);
          const nextIndex = (currentIndex + 1) % locations.length;
          const newLocation = locations[nextIndex];
          setLocation(newLocation);
          setIsLocating(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLocating(false);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not get your location. Please enter it manually.",
          });
        }
      );
    } else {
      setIsLocating(false);
       toast({
        variant: "destructive",
        title: "Unsupported",
        description: "Geolocation is not supported by your browser.",
      });
    }
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, locationData, isLocating, handleLocateMe }}>
      {children}
    </LocationContext.Provider>
  );
};
