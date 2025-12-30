'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertTriangle,
  Baby,
  Building,
  CheckCircle,
  HelpCircle,
  Map,
  ShieldCheck,
  Siren,
  TrendingUp,
  User,
  Wind,
} from 'lucide-react';
import Link from 'next/link';

export default function CitizenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container py-12">
        <div className="grid gap-12">
          {/* Section 1: Simple Pollution View */}
          <section>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Your Local Environment
              </h1>
              <p className="text-muted-foreground">
                Live conditions for: <span className="font-semibold text-primary">Koramangala, Bengaluru</span>
              </p>
            </div>
            <Card className="w-full max-w-3xl mx-auto bg-green-500/10 border-green-500/30">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-300">
                  Good
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-green-200">
                  Air quality is good. It's a great day for outdoor activities!
                </p>
                <div className="mt-6 flex justify-center gap-4 text-sm text-green-300/80">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4" />
                    <span>Air: Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Water: Safe</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Siren className="h-4 w-4" />
                    <span>Noise: Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Health Risk Alerts */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-center">Health Alerts</h2>
             <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
                <Card className="bg-yellow-500/10 border-yellow-500/30">
                    <CardContent className="p-4 flex items-center gap-4">
                        <AlertTriangle className="h-8 w-8 text-yellow-400" />
                        <div>
                            <h3 className="font-semibold text-yellow-300">Moderate PM2.5 Levels</h3>
                            <p className="text-sm text-yellow-400/80">Sensitive groups should limit outdoor exertion.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-secondary">
                    <CardContent className="p-4 flex items-center gap-4">
                        <CheckCircle className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <h3 className="font-semibold">No Critical Alerts</h3>
                            <p className="text-sm text-muted-foreground">No immediate severe risks detected in your area.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </section>

          {/* Section 3: Citizen Reporting */}
          <section className="text-center bg-card/50 py-12 rounded-lg">
             <h2 className="text-2xl font-bold mb-2">See something? Say something.</h2>
             <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Your reports help us identify and act on environmental issues faster.
             </p>
             <Button asChild size="lg">
                <Link href="/report">Report an Issue Now</Link>
            </Button>
          </section>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Section 4: Community & Education */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Community & Education</h2>
                <div className="space-y-4">
                    <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors">
                        <CardContent className="p-4 flex items-center gap-4">
                            <TrendingUp className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Your Area's Trends</h3>
                                <p className="text-sm text-muted-foreground">View weekly and monthly pollution data.</p>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors">
                        <CardContent className="p-4 flex items-center gap-4">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Learn About Pollution</h3>
                                <p className="text-sm text-muted-foreground">What is PM2.5? How does noise affect health?</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
             {/* Section 5: Tracking & Privacy */}
             <section>
                 <h2 className="text-2xl font-bold mb-4">Your Reports & Privacy</h2>
                <div className="space-y-4">
                    <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors">
                        <CardContent className="p-4 flex items-center gap-4">
                            <Map className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Track My Reports</h3>
                                <p className="text-sm text-muted-foreground">Check the status of issues you've reported.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50 hover:bg-secondary/80 transition-colors">
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
