'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, MapPin, AlertTriangle, Wind, Droplets, Leaf, ShieldCheck, Siren, HeartPulse } from 'lucide-react';

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-12 max-w-3xl">
           <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Be the Signal for a Cleaner Environment.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Your report becomes part of PRISM’s real-time intelligence system, helping detect and prevent environmental harm.
          </p>
        </div>

        {submitted ? (
          <Card className="w-full max-w-2xl text-center bg-card/40 border border-border/30 backdrop-blur-sm p-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Signal Received</h2>
            <p className="text-muted-foreground">
              Thank you. You’re helping make environmental data clearer for everyone.
            </p>
            <Button onClick={() => setSubmitted(false)} className="mt-6">
              Submit Another Report
            </Button>
          </Card>
        ) : (
          <>
            <Card className="w-full max-w-2xl bg-card/40 border border-border/30 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Report an Environmental Issue
                </CardTitle>
                <CardDescription>
                  Your report helps us track and verify environmental data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="location" className="text-lg font-semibold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., City Park, Riverfront"
                      className="focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="pollution-type" className="text-lg font-semibold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" /> Pollution Type</Label>
                    <Select>
                      <SelectTrigger id="pollution-type" className="focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="air">
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4" /> Air
                          </div>
                        </SelectItem>
                        <SelectItem value="water">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-4 w-4" /> Water
                          </div>
                        </SelectItem>
                        <SelectItem value="land">
                          <div className="flex items-center gap-2">
                            <Leaf className="h-4 w-4" /> Land
                          </div>
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="description" className="text-lg font-semibold">Details</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail..."
                      rows={4}
                      className="focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                    Send Signal to PRISM
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="w-full max-w-2xl mt-16 text-center">
                <h3 className="text-2xl font-bold mb-6">Why Your Report Matters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-secondary p-4 rounded-full">
                            <ShieldCheck className="h-8 w-8 text-primary"/>
                        </div>
                        <p className="font-semibold text-foreground">Identify Hotspots</p>
                        <p className="text-sm">Helps pinpoint areas with recurring environmental issues.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-secondary p-4 rounded-full">
                            <Siren className="h-8 w-8 text-primary"/>
                        </div>
                         <p className="font-semibold text-foreground">Trigger Response</p>
                        <p className="text-sm">Alerts authorities for faster investigation and action.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-secondary p-4 rounded-full">
                            <HeartPulse className="h-8 w-8 text-primary"/>
                        </div>
                        <p className="font-semibold text-foreground">Protect Health</p>
                        <p className="text-sm">Contributes to a safer, healthier community environment.</p>
                    </div>
                </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
