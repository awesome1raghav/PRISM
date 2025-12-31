
'use client';

import { useContext } from 'react';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertTriangle,
  CheckCircle,
  MapPin,
  Siren,
  TrendingUp,
  User,
  Wind,
  Droplets,
  Waves,
  Info,
  LocateFixed,
} from 'lucide-react';
import Link from 'next/link';
import { LocationContext, LocationDataContext } from '@/context/LocationContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const LocationSelector = () => {
  const { location, setLocation, isLocating, handleLocateMe } = useContext(LocationContext);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('location-input') as HTMLInputElement;
    setLocation(input.value);
  }

  return (
    <Card className="bg-card/40 border-border/30 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="text-primary" />
          <span>Select Your Location</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};


export default function CitizenPage() {
  const { location, locationData } = useContext(LocationContext);
  const data = locationData[location] || locationData['Koramangala, Bengaluru'];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="grid gap-12">
          <LocationSelector />
          
          <section>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Your Local Environment
              </h1>
              <p className="text-muted-foreground">
                Live conditions for: <span className="font-semibold text-foreground">{data.name}</span>
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
              <Card className={cn("bg-card/40 border-border/30 border-l-4", 
                data.air.status === 'Good' && 'border-l-green-500',
                data.air.status === 'Moderate' && 'border-l-yellow-500',
                data.air.status === 'Poor' && 'border-l-red-500'
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2"><Wind className={cn(
                     data.air.status === 'Good' && 'text-green-500',
                     data.air.status === 'Moderate' && 'text-yellow-500',
                     data.air.status === 'Poor' && 'text-red-500'
                  )} />Air Quality</CardTitle>
                  <p className="text-3xl font-bold">{data.air.status}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{data.air.advice}</p>
                </CardContent>
              </Card>
               <Card className={cn("bg-card/40 border-border/30 border-l-4", 
                data.water.status === 'Safe' && 'border-l-green-500',
                data.water.status !== 'Safe' && 'border-l-yellow-500'
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2"><Droplets className={cn(
                    data.water.status === 'Safe' && 'text-green-500',
                    data.water.status !== 'Safe' && 'text-yellow-500'
                  )} />Water Quality</CardTitle>
                   <p className="text-3xl font-bold">{data.water.status}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{data.water.advice}</p>
                </CardContent>
              </Card>
               <Card className={cn("bg-card/40 border-border/30 border-l-4", 
                data.noise.status === 'Low' && 'border-l-green-500',
                data.noise.status === 'Moderate' && 'border-l-yellow-500',
                data.noise.status === 'High' && 'border-l-red-500'
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2"><Waves className={cn(
                    data.noise.status === 'Low' && 'text-green-500',
                    data.noise.status === 'Moderate' && 'text-yellow-500',
                    data.noise.status === 'High' && 'text-red-500'
                  )} />Noise Level</CardTitle>
                   <p className="text-3xl font-bold">{data.noise.status}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{data.noise.advice}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Health Advisory</h2>
             <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
                {data.advisories.map((advisory, index) => (
                    <Card key={index} className="bg-card/40 border-border/30">
                        <CardContent className="p-6 flex items-center gap-4">
                            {advisory.type === 'alert' && <AlertTriangle className="h-8 w-8 text-yellow-500 shrink-0" />}
                            {advisory.type === 'info' && <CheckCircle className="h-8 w-8 text-muted-foreground shrink-0" />}
                            <div>
                                <h3 className="font-semibold">{advisory.title}</h3>
                                <p className="text-sm text-muted-foreground">{advisory.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </section>

          <section className="text-center bg-card/40 py-12 rounded-lg border border-border/30">
             <Siren className="h-10 w-10 text-primary mx-auto mb-4" />
             <h2 className="text-3xl font-bold mb-2">See Something? Say Something.</h2>
             <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Your reports help authorities identify and act on environmental issues faster.
             </p>
             <Button asChild size="lg">
                <Link href="/report">Report an Issue Now</Link>
            </Button>
          </section>
          
          <div className="grid md:grid-cols-2 gap-8">
            <section>
                <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>
                <div className="space-y-4">
                  <Link href="/citizen/reports">
                    <Card className="bg-card/40 hover:bg-card/60 transition-colors cursor-pointer border-border/30">
                        <CardContent className="p-4 flex items-center gap-4">
                            <MapPin className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Track My Reports</h3>
                                <p className="text-sm text-muted-foreground">Check the status of issues you've reported.</p>
                            </div>
                        </CardContent>
                    </Card>
                  </Link>
                     <Card className="bg-card/40 hover:bg-card/60 transition-colors cursor-pointer border-border/30">
                        <CardContent className="p-4 flex items-center gap-4">
                            <TrendingUp className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Your Area's Trends</h3>
                                <p className="text-sm text-muted-foreground">View weekly and monthly pollution data.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
             <section>
                 <h2 className="text-2xl font-bold mb-4">Education & Controls</h2>
                <div className="space-y-4">
                    <Card className="bg-card/40 hover:bg-card/60 transition-colors cursor-pointer border-border/30">
                        <CardContent className="p-4 flex items-center gap-4">
                            <Info className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Learn About Pollution</h3>
                                <p className="text-sm text-muted-foreground">What is PM2.5? How does noise affect health?</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/40 hover:bg-card/60 transition-colors cursor-pointer border-border/30">
                        <CardContent className="p-4 flex items-center gap-4">
                            <User className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Privacy Settings</h3>
                                <p className="text-sm text-muted-foreground">Manage your data and anonymous reporting.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}
