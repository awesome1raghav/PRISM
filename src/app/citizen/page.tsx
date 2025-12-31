
'use client';

import { useContext } from 'react';
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
  HeartPulse,
} from 'lucide-react';
import Link from 'next/link';
import { LocationContext, LocationDataContext } from '@/context/LocationContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const LocationSelector = () => {
  const { location, setLocation, isLocating, handleLocateMe } = useContext(LocationContext);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('location-input') as HTMLInputElement;
    setLocation(input.value);
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
                <Button variant="outline" type="button" onClick={handleLocateMe} disabled={isLocating}>
                <LocateFixed className={cn('h-4 w-4', isLocating && 'animate-spin')} />
                <span className="ml-2 hidden sm:inline">Use My Location</span>
                </Button>
            </div>
        </form>
    </div>
  );
};

const MetricCard = ({ icon, title, value, status, statusColor, href }: { icon: JSX.Element, title: string, value: string, status: string, statusColor: string, href: string }) => (
    <Link href={href}>
        <Card className="bg-card/40 border-border/30 hover:bg-card/60 hover:border-primary/40 transition-all group">
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
    </Link>
)

export default function CitizenPage() {
  const { location, locationData } = useContext(LocationContext);
  const data = locationData[location] || locationData['Koramangala, Bengaluru'];
  const activeMapImage = PlaceHolderImages.find(img => img.id === 'heatmap-air');

  const statusColors = {
      Good: 'bg-green-500/20 text-green-400 border-green-500/30',
      Moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Poor: 'bg-red-500/20 text-red-400 border-red-500/30',
      Safe: 'bg-green-500/20 text-green-400 border-green-500/30',
      Warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Low: 'bg-green-500/20 text-green-400 border-green-500/30',
      High: 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-8">
        <div className="space-y-8">
          <LocationSelector />
          
           <section>
            <h2 className="text-2xl font-bold mb-4 text-left">Health Advisory</h2>
             <div className="grid gap-4 md:grid-cols-2">
                {data.advisories.map((advisory, index) => (
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
             <h2 className="text-2xl font-bold mb-4 text-left">Live Environmental Overview: <span className="text-primary">{data.name}</span></h2>
             <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="bg-card/40 border-border/30 h-full">
                        <CardHeader>
                            <CardTitle>Pollution Heatmap</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-[16/10] bg-muted rounded-md relative overflow-hidden">
                                {activeMapImage && (
                                    <Image
                                        src={activeMapImage.imageUrl}
                                        alt="Pollution Heatmap"
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="opacity-70"
                                        data-ai-hint={activeMapImage.imageHint}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                            </div>
                            <Button asChild className="mt-4 w-full">
                                <Link href="/citizen/heatmap">Expand Heatmap</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-4">
                    <MetricCard 
                        icon={<Wind className="h-6 w-6 text-sky-400"/>} 
                        title="Air Quality" 
                        value={`${data.air.value} AQI`} 
                        status={data.air.status}
                        statusColor={statusColors[data.air.status as keyof typeof statusColors]}
                        href="/citizen/details/air"
                    />
                     <MetricCard 
                        icon={<Droplets className="h-6 w-6 text-blue-400"/>} 
                        title="Water Quality" 
                        value={`${data.water.value} WQI`}
                        status={data.water.status}
                        statusColor={statusColors[data.water.status as keyof typeof statusColors]}
                        href="/citizen/details/water"
                    />
                     <MetricCard 
                        icon={<Waves className="h-6 w-6 text-orange-400"/>} 
                        title="Noise Levels" 
                        value={`${data.noise.value} dB`}
                        status={data.noise.status}
                        statusColor={statusColors[data.noise.status as keyof typeof statusColors]}
                        href="/citizen/details/noise"
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
        </div>
      </main>
    </div>
  );
}
