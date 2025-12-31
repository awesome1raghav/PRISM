
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
} from 'lucide-react';
import Link from 'next/link';
import { LocationContext } from '@/context/LocationContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import MetricDetailModal from '@/components/citizen/MetricDetailModal';
import { type ReportCategory } from './types';
import HeatmapGrid from '@/components/citizen/HeatmapGrid';
import { useSearchParams, useRouter } from 'next/navigation';


const LocationSelector = () => {
  const { location, setLocation, isLocating, handleLocateMe } = useContext(LocationContext);
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('location-input') as HTMLInputElement;
    setLocation(input.value, router);
  }

  return (
     <div className="bg-card/40 border border-border/30 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input 
                name="location-input"
                placeholder="e.g. Koramangala, Bengaluru"
                defaultValue={location}
                className="flex-grow"
            />
            <div className="flex gap-2">
                <Button type="submit">Set Location</Button>
                <Button variant="outline" type="button" onClick={() => handleLocateMe(router)} disabled={isLocating}>
                <LocateFixed className={cn('h-4 w-4', isLocating && 'animate-spin')} />
                <span className="ml-2 hidden sm:inline">Use My Location</span>
                </Button>
            </div>
        </form>
    </div>
  );
};

const MetricCard = ({ icon, title, value, status, statusColor, onClick }: { icon: JSX.Element, title: string, value: string, status: string, statusColor: string, onClick: () => void }) => (
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
                    <p className="text-2xl font-bold">{value}</p>
                    <Badge variant="outline" className={cn("mt-1 border", statusColor)}>
                        {status}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    </div>
)

function CitizenDashboardContent() {
  const { locationData, setLocation } = useContext(LocationContext);
  const [selectedMetric, setSelectedMetric] = useState<ReportCategory | null>(null);
  const searchParams = useSearchParams();
  const locationParam = searchParams.get('location') || 'Bengaluru';
  
  // Ensure context is updated if URL changes
  useEffect(() => {
    setLocation(locationParam, null);
  }, [locationParam, setLocation]);
  
  const location = locationParam;

  const cityData = locationData[location] || locationData['Bengaluru'];
  
  // Calculate city-wide average for display
  const wards = cityData.wards || [];
  const avgAqi = wards.reduce((s, w) => s + w.live_data.aqi, 0) / (wards.length || 1);
  const avgWqi = wards.reduce((s, w) => s + w.live_data.wqi, 0) / (wards.length || 1);
  const avgNoise = wards.reduce((s, w) => s + w.live_data.noise, 0) / (wards.length || 1);

  const getStatus = (metric: 'aqi' | 'wqi' | 'noise', value: number) => {
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
                    <CardHeader>
                        <CardTitle>Pollution Heatmap</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-[16/10] bg-muted/30 rounded-md relative overflow-hidden p-4">
                            <HeatmapGrid wards={cityData.wards} activeMetric="aqi" isPreview={true} />
                        </div>
                        <Button asChild className="mt-4 w-full">
                            <Link href={`/citizen/heatmap?location=${location}`}>Expand Heatmap</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-4">
                <MetricCard 
                    icon={<Wind className="h-6 w-6 text-sky-400"/>} 
                    title="Air Quality" 
                    value={`${Math.round(avgAqi)} AQI`} 
                    status={aqiStatus.label}
                    statusColor={aqiStatus.color}
                    onClick={() => setSelectedMetric('Air')}
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
    </div>
  )
}

export default function CitizenPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-8">
         <Suspense fallback={<div>Loading location...</div>}>
          <CitizenDashboardContent />
        </Suspense>
      </main>
    </div>
  );
}
