
'use client';

import { useToast } from '@/hooks/use-toast';
import React, { createContext, useState, ReactNode } from 'react';

type LocationStatus = 'Good' | 'Moderate' | 'Poor' | 'Safe' | 'Warning' | 'Low' | 'High';
type AdvisoryType = 'alert' | 'info';

interface LocationData {
    name: string;
    air: {
        status: LocationStatus;
        advice: string;
    },
    water: {
        status: LocationStatus;
        advice: string;
    },
    noise: {
        status: LocationStatus;
        advice: string;
    },
    advisories: {
        type: AdvisoryType;
        title: string;
        description: string;
    }[];
}

export interface LocationDataContext {
  [key: string]: LocationData;
}

const locationData: LocationDataContext = {
    'Koramangala, Bengaluru': {
        name: 'Koramangala, Bengaluru',
        air: { status: 'Good', advice: 'Great for outdoor activities!' },
        water: { status: 'Safe', advice: 'Tap water is safe for consumption.' },
        noise: { status: 'Moderate', advice: 'Minor traffic noise expected.' },
        advisories: [
            { type: 'info', title: 'No Critical Alerts', description: 'No immediate severe risks detected in your area.' }
        ]
    },
    'Jayanagar, Bengaluru': {
        name: 'Jayanagar, Bengaluru',
        air: { status: 'Moderate', advice: 'Sensitive groups should reduce outdoor time.' },
        water: { status: 'Warning', advice: 'Boil tap water before consumption.' },
        noise: { status: 'High', advice: 'High traffic and commercial noise.' },
        advisories: [
            { type: 'alert', title: 'High Tree Pollen', description: 'Pollen counts are high, may affect allergy sufferers.' },
            { type: 'alert', title: 'Road Closure', description: 'Main road closed for metro construction.' }
        ]
    },
    'New York, NY': {
        name: 'New York, NY',
        air: { status: 'Poor', advice: 'Avoid outdoor activities if possible.' },
        water: { status: 'Safe', advice: 'Tap water is safe for consumption.' },
        noise: { status: 'High', advice: 'Constant city noise.' },
        advisories: [
            { type: 'alert', title: 'Air Quality Alert', description: 'High levels of ozone detected. Stay indoors if you have respiratory issues.' },
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
  location: 'Koramangala, Bengaluru',
  setLocation: () => {},
  locationData,
  isLocating: false,
  handleLocateMe: () => {},
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState('Koramangala, Bengaluru');
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();

  const setLocation = (newLocation: string) => {
    if (locationData[newLocation]) {
        setLocationState(newLocation);
         toast({
            title: "Location Updated",
            description: `Showing data for ${newLocation}.`,
          });
    } else {
         toast({
            variant: "destructive",
            title: "Location Not Found",
            description: "We don't have data for this location yet. Showing default.",
          });
          setLocationState('Koramangala, Bengaluru');
    }
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For this prototype, we'll just cycle through available locations
          // as we don't have a real reverse geocoding service.
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

    