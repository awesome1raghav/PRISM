'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, MapPin, AlertTriangle, Wind, Droplets, Trash2, Waves, Upload, LocateFixed, ShieldCheck, HeartPulse, Siren } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InteractiveBackground from '@/components/landing/interactive-background';

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState('');

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Signal Received!",
      description: "Your report has been successfully submitted.",
      variant: 'default',
    });
  };
  
  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
          setIsLocating(false);
          toast({
            title: "Location Found",
            description: "Your current location has been filled in.",
          });
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
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <InteractiveBackground />
      <Header />
      <main className="flex-grow container py-12 flex flex-col items-center justify-center z-10">
        <div className="text-center mb-12 max-w-3xl">
           <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Be a Hero for Your Environment.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Your report helps create a cleaner, safer community. It’s fast, easy, and makes a real difference.
          </p>
        </div>

        {submitted ? (
          <Card className="w-full max-w-2xl text-center glassmorphism-card p-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Signal Received!</h2>
            <p className="text-muted-foreground mb-2">
              Thank you! Your report ID is <span className="font-semibold text-foreground">PR-183491</span>.
            </p>
             <p className="text-muted-foreground">You can track its status on your citizen dashboard.</p>
            <Button 
              onClick={() => setSubmitted(false)} 
              className="mt-6"
            >
              Submit Another Report
            </Button>
          </Card>
        ) : (
          <>
            <Card className="w-full max-w-2xl glassmorphism-card relative overflow-hidden group">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  Report an Environmental Issue
                </CardTitle>
                <CardDescription>
                  Fill in the details below. Your contribution is valuable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-semibold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Location</Label>
                    <div className="flex gap-2">
                       <Input
                        id="location"
                        placeholder="e.g., Near City Park, Main Riverfront"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                      <Button variant="outline" type="button" onClick={handleLocateMe} disabled={isLocating}>
                        <LocateFixed className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
                        <span className="ml-2 hidden sm:inline">Locate Me</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pollution-type" className="font-semibold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" /> Pollution Type</Label>
                    <Select required>
                      <SelectTrigger id="pollution-type">
                        <SelectValue placeholder="Select a type of issue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="air">
                          <div className="flex items-center gap-2"><Wind className="h-4 w-4" /> Air (smoke, dust, smell)</div>
                        </SelectItem>
                        <SelectItem value="water">
                          <div className="flex items-center gap-2"><Droplets className="h-4 w-4" /> Water (discoloration, chemical)</div>
                        </SelectItem>
                        <SelectItem value="waste">
                          <div className="flex items-center gap-2"><Trash2 className="h-4 w-4" /> Waste (illegal dumping)</div>
                        </SelectItem>
                         <SelectItem value="noise">
                          <div className="flex items-center gap-2"><Waves className="h-4 w-4" /> Noise (construction, loudspeakers)</div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="media" className="font-semibold flex items-center gap-2"><Upload className="h-5 w-5 text-primary" /> Upload Photo/Video (Required)</Label>
                    <Input
                      id="media"
                      type="file"
                      accept="image/*,video/*"
                      className="file:text-primary file:font-semibold cursor-pointer"
                      required
                    />
                     <p className="text-xs text-muted-foreground">A photo or short video helps us verify the report faster.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-semibold">Details (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you see, smell, or hear. The more details, the better!"
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Send Signal to PRISM
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="w-full max-w-3xl mt-16 text-center">
                <h3 className="text-3xl font-bold mb-6 text-foreground">Your Report Makes a Difference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                        <div className="bg-card/80 p-4 rounded-full shadow-md">
                            <ShieldCheck className="h-8 w-8 text-blue-400"/>
                        </div>
                        <p className="font-semibold text-foreground">Identify Hotspots</p>
                        <p className="text-sm">Help pinpoint areas with recurring environmental issues.</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="bg-card/80 p-4 rounded-full shadow-md">
                            <Siren className="h-8 w-8 text-red-400"/>
                        </div>
                         <p className="font-semibold text-foreground">Trigger Action</p>
                        <p className="text-sm">Alert authorities for faster investigation and response.</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="bg-card/80 p-4 rounded-full shadow-md">
                            <HeartPulse className="h-8 w-8 text-primary"/>
                        </div>
                        <p className="font-semibold text-foreground">Protect Health</p>
                        <p className="text-sm">Contribute to a safer, healthier community environment for everyone.</p>
                    </div>
                </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
