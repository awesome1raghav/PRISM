
'use client';

import { useContext, useState, Suspense, useEffect, useMemo } from 'react';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MapPin,
  Siren,
  Wind,
  Droplets,
  Waves,
  LocateFixed,
  ArrowRight,
  ShieldCheck,
  Expand,
} from 'lucide-react';
import Link from 'next/link';
import { LocationContext, type MetricType } from '@/context/LocationContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import MetricDetailModal from '@/components/citizen/MetricDetailModal';
import { type ReportCategory } from './types';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import type { WardData } from '@/components/maps/types';

const CitizenHeatmap = dynamic(
  () => import('@/components/maps/CitizenHeatmap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] w-full rounded-2xl bg-muted/40 flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    ),
  }
);

const FullScreenMap = dynamic(
  () => import('@/components/maps/FullScreenMap'),
  {
    ssr: false,
    loading: () => (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <p>Loading Full Screen Map...</p>
        </div>
    )
  }
);


const LocationSelector = () => {
  const { location, setLocation, locationData } = useContext(LocationContext);
  const router = useRouter();
  const [inputValue, setInputValue] = useState(location);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundKey = Object.keys(locationData).find(key => 
        key.toLowerCase() === inputValue.toLowerCase() || 
        locationData[key].id.toLowerCase() === inputValue.toLowerCase()
    );

    const targetLocation = foundKey || 'Bengaluru';
    
    if (targetLocation !== location) {
        setLocation(targetLocation);
        router.push(`/citizen?location=${targetLocation}`, { scroll: false });
        toast({
            title: "Location Updated",
            description: `Showing data for ${locationData[targetLocation].name}.`,
        });
    }
  }

  const handleLocateMe = () => {
    const locations = Object.keys(locationData);
    const currentIndex = locations.findIndex(l => l.toLowerCase() === location.toLowerCase());
    const nextIndex = (currentIndex + 1) % locations.length;
    const newLocationKey = locations[nextIndex];
    
    if (newLocationKey !== location) {
        setLocation(newLocationKey);
        router.push(`/citizen?location=${newLocationKey}`, { scroll: false });
        toast({
            title: "Location Updated",
            description: `Showing data for ${locationData[newLocationKey].name}.`,
        });
    }
  };
  
  useEffect(() => {
    setInputValue(location);
  }, [location]);

  return (
     <Card className="p-4">
        <CardContent className="p-2">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <Input 
                    name="location-input"
                    placeholder="e.g. Koramangala, Bengaluru"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow bg-background/50"
                />
                <div className="flex gap-2">
                    <Button type="submit">Set Location</Button>
                    <Button variant="outline" type="button" onClick={handleLocateMe}>
                    <LocateFixed className={cn('h-4 w-4')} />
                    <span className="ml-2 hidden sm:inline">Use My Location</span>
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
  );
};

const MetricCard = ({ icon, title, value, status, statusColor, onClick, isLoading }: { icon: JSX.Element, title: string, value: string | null, status: string, statusColor: string, onClick: () => void, isLoading?: boolean }) => (
    <Card onClick={onClick} className="hover:border-primary/60 transition-all group cursor-pointer h-full flex flex-col">
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {icon}
                    <h3 className="font-semibold">{title}</h3>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
        </CardHeader>
        <CardContent className="flex-grow flex items-end">
              {isLoading ? (
                  <div className="w-full">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-6 w-20 mt-2" />
                  </div>
              ) : (
                <div>
                  <p className="text-4xl font-bold">{value}</p>
                  <Badge variant="outline" className={cn("mt-1", statusColor)}>
                      {status}
                  </Badge>
                </div>
              )}
        </CardContent>
    </Card>
)

function CitizenDashboardContent() {
  const { location, setLocation, locationData } = useContext(LocationContext);
  const [selectedMetric, setSelectedMetric] = useState<ReportCategory | null>(null);
  const [activeMapMetric, setActiveMapMetric] = useState<MetricType>('aqi');
  const searchParams = useSearchParams();
  const [isMapFullScreen, setMapFullScreen] = useState(false);
  
  useEffect(() => {
    const locationParam = searchParams.get('location');
    const initialLocation = locationParam || 'Bengaluru';
    const foundKey = Object.keys(locationData).find(key => 
        key.toLowerCase() === initialLocation.toLowerCase() || 
        (locationData[key] && locationData[key].id.toLowerCase() === initialLocation.toLowerCase())
    ) || 'Bengaluru';
    
    if (location !== foundKey) {
        setLocation(foundKey);
    }
  }, [searchParams, location, setLocation, locationData]); 

  const cityData = locationData[location] || locationData['Bengaluru'];

  const { avgAqi, avgWqi, avgNoise, isLoadingWards } = useMemo(() => {
      if (!cityData || !cityData.wards || cityData.wards.length === 0) {
          return { avgAqi: null, avgWqi: null, avgNoise: null, isLoadingWards: true };
      }

      const totalAqi = cityData.wards.reduce((sum, ward) => sum + ward.live_data.aqi, 0);
      const totalWqi = cityData.wards.reduce((sum, ward) => sum + ward.live_data.wqi, 0);
      const totalNoise = cityData.wards.reduce((sum, ward) => sum + ward.live_data.noise, 0);
      const wardCount = cityData.wards.length;

      return {
          avgAqi: totalAqi / wardCount,
          avgWqi: totalWqi / wardCount,
          avgNoise: totalNoise / wardCount,
          isLoadingWards: false,
      };
  }, [cityData]);

  const wardsData: WardData[] = useMemo(() => {
    if (!cityData || !cityData.wards) return [];
    return cityData.wards.map(ward => ({
        id: ward.id,
        name: ward.name,
        lat: ward.live_data.lat,
        lng: ward.live_data.lng,
        aqi: ward.live_data.aqi,
        wqi: ward.live_data.wqi,
        noise: ward.live_data.noise,
    }));
  }, [cityData]);

  const getStatus = (metric: 'aqi' | 'wqi' | 'noise', value: number | null) => {
    if (value === null) return { label: 'Updating...', color: 'bg-muted/50 text-muted-foreground border-muted/60'};
    if (metric === 'aqi') {
      if (value <= 50) return { label: 'Good', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      if (value <= 100) return { label: 'Moderate', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
      if (value <= 200) return { label: 'Poor', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' };
      return { label: 'Severe', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    }
    if (metric === 'wqi') {
       if (value >= 80) return { label: 'Good', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
       if (value >= 60) return { label: 'Moderate', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
       if (value >= 40) return { label: 'Poor', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' };
       return { label: 'Severe', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    }
    // noise
    if (value <= 60) return { label: 'Good', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    if (value <= 80) return { label: 'Moderate', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    if (value <= 100) return { label: 'Poor', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' };
    return { label: 'Severe', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  }

  const aqiStatus = getStatus('aqi', avgAqi);
  const wqiStatus = getStatus('wqi', avgWqi);
  const noiseStatus = getStatus('noise', avgNoise);
  
  const advisories = cityData.advisories;
  
  const handleMetricCardClick = (metric: ReportCategory, mapMetric: MetricType) => {
      setSelectedMetric(metric);
      setActiveMapMetric(mapMetric);
  }
  
  if (isMapFullScreen) {
    return (
      <FullScreenMap
        cityId={cityData.id}
        wardsData={wardsData}
        isLoading={isLoadingWards}
        onClose={() => setMapFullScreen(false)}
        activeMetric={activeMapMetric}
      />
    );
  }

  return (
     <div className="space-y-8">
      <LocationSelector />
      
       <section>
        <h2 className="text-2xl font-bold mb-4 text-left">Health Advisory</h2>
         <div className="grid gap-4 md:grid-cols-2">
            {advisories.map((advisory, index) => (
                <Card key={index} className={cn("border-l-4",
                    advisory.type === 'alert' ? 'border-l-yellow-500' : 'border-l-blue-500'
                )}>
                    <CardContent className="p-6 flex items-start gap-4">
                        {advisory.type === 'alert' && <Siren className="h-8 w-8 text-yellow-500 shrink-0" />}
                        {advisory.type === 'info' && <ShieldCheck className="h-8 w-8 text-blue-400 shrink-0" />}
                        <div>
                            <h3 className="font-semibold">{advisory.title}</h3>
                            <p className="text-sm text-muted-foreground">{advisory.description}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section className="space-y-8">
         <h2 className="text-2xl font-bold text-left">Live Environmental Overview: <span className="text-primary">{cityData.name}</span></h2>
         
         <div className="grid lg:grid-cols-3 gap-6">
            <MetricCard 
                icon={<Wind className="h-6 w-6 text-sky-400"/>} 
                title="Air Quality" 
                value={avgAqi !== null ? `${Math.round(avgAqi)} AQI` : null} 
                status={aqiStatus.label}
                statusColor={aqiStatus.color}
                onClick={() => handleMetricCardClick('Air', 'aqi')}
                isLoading={isLoadingWards}
            />
              <MetricCard 
                icon={<Droplets className="h-6 w-6 text-blue-400"/>} 
                title="Water Quality" 
                value={avgWqi !== null ? `${Math.round(avgWqi)} WQI` : null}
                status={wqiStatus.label}
                statusColor={wqiStatus.color}
                onClick={() => handleMetricCardClick('Water', 'wqi')}
                isLoading={isLoadingWards}
            />
              <MetricCard 
                icon={<Waves className="h-6 w-6 text-orange-400"/>} 
                title="Noise Levels" 
                value={avgNoise !== null ? `${Math.round(avgNoise)} dB` : null}
                status={noiseStatus.label}
                statusColor={noiseStatus.color}
                onClick={() => handleMetricCardClick('Noise', 'noise')}
                isLoading={isLoadingWards}
            />
         </div>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pollution Heatmap</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setMapFullScreen(true)}>
                    <Expand className="h-5 w-5" />
                    <span className="sr-only">Enter full screen</span>
                </Button>
            </CardHeader>
            <CardContent>
                <CitizenHeatmap cityId={cityData.id} wardsData={wardsData} isLoading={isLoadingWards} activeMetric={activeMapMetric} />
            </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
          <Card className="hover:border-primary/60 transition-colors group">
            <CardContent className="p-6 flex flex-col items-center text-center">
                <Siren className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">See Something? Report It.</h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                    Your reports help authorities identify and act on environmental issues faster.
                </p>
                <Button asChild size="lg" className="w-full">
                    <Link href="/report">Report a New Issue</Link>
                </Button>
            </CardContent>
          </Card>

           <Card className="hover:border-primary/60 transition-colors group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                    <MapPin className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-2">My Reports</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">Check the status of issues you've reported and see their resolution.</p>
                    <Button asChild size="lg" className="w-full" variant="outline">
                        <Link href="/citizen/reports">Track My Reports</Link>
                    </Button>
                </CardContent>
            </Card>
      </section>
       <MetricDetailModal 
        metric={selectedMetric}
        onClose={() => setSelectedMetric(null)}
      />
    </div>
  )
}

export default function CitizenPage() {
  const firestore = useFirestore();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-8">
         <Suspense fallback={<div className="text-center p-8">Loading Dashboard...</div>}>
          {<CitizenDashboardContent />}
        </Suspense>
      </main>
    </div>
  );
}
