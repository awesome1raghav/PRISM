'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  AlertTriangle,
  CheckCircle,
  Map,
  Siren,
  TrendingUp,
  User,
  Wind,
  Droplets,
  Waves,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function CitizenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container py-12">
        <div className="grid gap-12">
          
          <section>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Your Local Environment
              </h1>
              <p className="text-muted-foreground">
                Live conditions for: <span className="font-semibold text-primary">Koramangala, Bengaluru</span>
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
              <Card className="bg-green-500/10 border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-green-300"><Wind />Air Quality</CardTitle>
                  <p className="text-3xl font-bold text-green-200">Good</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-400/80">Great for outdoor activities!</p>
                </CardContent>
              </Card>
               <Card className="bg-green-500/10 border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-green-300"><Droplets />Water Quality</CardTitle>
                   <p className="text-3xl font-bold text-green-200">Safe</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-400/80">Tap water is safe for consumption.</p>
                </CardContent>
              </Card>
               <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-yellow-300"><Waves />Noise Level</CardTitle>
                   <p className="text-3xl font-bold text-yellow-200">Moderate</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-400/80">Minor traffic noise expected.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Health Advisory</h2>
             <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
                <Card className="bg-yellow-500/10 border-yellow-500/30">
                    <CardContent className="p-6 flex items-center gap-4">
                        <AlertTriangle className="h-8 w-8 text-yellow-400 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-yellow-300">Moderate PM2.5 Levels</h3>
                            <p className="text-sm text-yellow-400/80">Sensitive groups (children, elderly) should limit prolonged outdoor exertion.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-secondary/40">
                    <CardContent className="p-6 flex items-center gap-4">
                        <CheckCircle className="h-8 w-8 text-muted-foreground shrink-0" />
                        <div>
                            <h3 className="font-semibold">No Critical Alerts</h3>
                            <p className="text-sm text-muted-foreground">No immediate severe risks detected in your area.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </section>

          <section className="text-center bg-card/50 py-12 rounded-lg border border-border/30">
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
                    <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                            <Map className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Track My Reports</h3>
                                <p className="text-sm text-muted-foreground">Check the status of issues you've reported.</p>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer">
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
                    <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                            <Info className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Learn About Pollution</h3>
                                <p className="text-sm text-muted-foreground">What is PM2.5? How does noise affect health?</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer">
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
      <Footer />
    </div>
  );
}
