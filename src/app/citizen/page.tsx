
'use client';

import { useContext, useState, Suspense, useEffect } from 'react';
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
import { LocationContext } from '@/context/LocationContext';
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
import { collection, onSnapshot, query, Query } from 'firebase/firestore';
import type { WardData } from '@/components/maps/types';

const CitizenHeatmap = dynamic(
  () => import('@/components/maps/CitizenHeatmap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] w-full rounded-xl bg-muted flex items-center justify-center">
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
     <div className="bg-card/40 border border-border/30 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input 
                name="location-input"
                placeholder="e.g. Koramangala, Bengaluru"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
            />
            <div className="flex gap-2">
                <Button type="submit">Set Location</Button>
                <Button variant="outline" type="button" onClick={handleLocateMe}>
                <LocateFixed className={cn('h-4 w-4')} />
                <span className="ml-2 hidden sm:inline">Use My Location</span>
                </Button>
            </div>
        </form>
    </div>
  );
};

const MetricCard = ({ icon, title, value, status, statusColor, onClick, isLoading }: { icon: JSX.Element, title: string, value: string | null, status: string, statusColor: string, onClick: () => void, isLoading?: boolean }) => (
    <div onClick={onClick} className="group cursor-pointer">
        <Card className="bg-card/40 border-border/30 hover:bg-card/60 hover:border-primary/40 transition-all h-full">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {icon}
                        <h3 className="font-semibold">{title}</h3>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-right mt-2">
                  {isLoading ? (
                      <>
                        <Skeleton className="h-8 w-24 ml-auto" />
                        <Skeleton className="h-5 w-16 ml-auto mt-2" />
                      </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold">{value}</p>
                      <Badge variant="outline" className={cn("mt-1 border", statusColor)}>
                          {status}
                      </Badge>
                    </>
                  )}
                </div>
            </CardContent>
        </Card>
    </div>
)

function CitizenDashboardContent() {
  const { location, setLocation, locationData } = useContext(LocationContext);
  const [selectedMetric, setSelectedMetric] = useState<ReportCategory | null>(null);
  const searchParams = useSearchParams();
  const [isMapFullScreen, setMapFullScreen] = useState(false);
  const [wardsData, setWardsData] = useState<WardData[]>([]);
  const [isLoadingWards, setIsLoadingWards] = useState(true);
  const [avgAqi, setAvgAqi] = useState<number | null>(null);
  const firestore = useFirestore();
  
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
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const cityData = locationData[location] || locationData['Bengaluru'];

  useEffect(() => {
    if (!firestore || !cityData.id) return;
    setIsLoadingWards(true);
    const wardsCollectionPath = `locations/${cityData.id}/wards`;
    const q = query(collection(firestore, wardsCollectionPath));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const wards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WardData));
      setWardsData(wards);
      if (wards.length > 0) {
        const totalAqi = wards.reduce((s, w) => s + w.aqi, 0);
        setAvgAqi(totalAqi / wards.length);
      } else {
        setAvgAqi(null);
      }
      setIsLoadingWards(false);
    }, (err) => {
      console.error("Firestore snapshot error:", err);
      setAvgAqi(null);
      setIsLoadingWards(false);
    });

    return () => unsubscribe();
  }, [firestore, cityData.id]);
  
  const avgWqi = 85; // Mock
  const avgNoise = 68; // Mock

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

  return (
     <div className="space-y-8">
      <LocationSelector />
      
       <section>
        <h2 className="text-2xl font-bold mb-4 text-left">Health Advisory</h2>
         <div className="grid gap-4 md:grid-cols-2">
            {advisories.map((advisory, index) => (
                <Card key={index} className={cn("bg-card/40 border-l-4",
                    advisory.type === 'alert' ? 'border-l-yellow-500' : 'border-l-blue-500'
                )}>
                    <CardContent className="p-6 flex items-center gap-4">
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

      <section>
         <h2 className="text-2xl font-bold mb-4 text-left">Live Environmental Overview: <span className="text-primary">{cityData.name}</span></h2>
         <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="bg-card/40 border-border/30 h-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Pollution Heatmap</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setMapFullScreen(true)}>
                            <Expand className="h-5 w-5" />
                            <span className="sr-only">Enter full screen</span>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <CitizenHeatmap cityId={cityData.id} wardsData={wardsData} isLoading={isLoadingWards} />
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-4">
                <MetricCard 
                    icon={<Wind className="h-6 w-6 text-sky-400"/>} 
                    title="Air Quality" 
                    value={avgAqi !== null ? `${Math.round(avgAqi)} AQI` : null} 
                    status={aqiStatus.label}
                    statusColor={aqiStatus.color}
                    onClick={() => setSelectedMetric('Air')}
                    isLoading={isLoadingWards}
                />
                 <MetricCard 
                    icon={<Droplets className="h-6 w-6 text-blue-400"/>} 
                    title="Water Quality" 
                    value={`${Math.round(avgWqi)} WQI`}
                    status={wqiStatus.label}
                    statusColor={wqiStatus.color}
                    onClick={() => setSelectedMetric('Water')}
                />
                 <MetricCard 
                    icon={<Waves className="h-6 w-6 text-orange-400"/>} 
                    title="Noise Levels" 
                    value={`${Math.round(avgNoise)} dB`}
                    status={noiseStatus.label}
                    statusColor={noiseStatus.color}
                    onClick={() => setSelectedMetric('Noise')}
                />
            </div>
         </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card/40 border-border/30 hover:bg-card/60 transition-colors group">
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

           <Card className="bg-card/40 border-border/30 hover:bg-card/60 transition-colors group">
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
       {isMapFullScreen && (
        <FullScreenMap
          cityId={cityData.id}
          wardsData={wardsData}
          isLoading={isLoadingWards}
          onClose={() => setMapFullScreen(false)}
        />
      )}
    </div>
  )
}

export default function CitizenPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-8">
         <Suspense fallback={<div className="text-center p-8">Loading Dashboard...</div>}>
          <CitizenDashboardContent />
        </Suspense>
      </main>
    </div>
  );
}
