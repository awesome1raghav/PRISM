'use client';

import Header from '@/components/layout/header';
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
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-grow container py-12">
        <div className="grid gap-12">
          
          <section>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2 text-slate-900">
                Your Local Environment
              </h1>
              <p className="text-slate-600">
                Live conditions for: <span className="font-semibold text-slate-800">Koramangala, Bengaluru</span>
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
              <Card className="bg-white border-slate-200/60 shadow-sm border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-slate-700"><Wind className="text-green-500" />Air Quality</CardTitle>
                  <p className="text-3xl font-bold text-slate-900">Good</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">Great for outdoor activities!</p>
                </CardContent>
              </Card>
               <Card className="bg-white border-slate-200/60 shadow-sm border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-slate-700"><Droplets className="text-green-500" />Water Quality</CardTitle>
                   <p className="text-3xl font-bold text-slate-900">Safe</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">Tap water is safe for consumption.</p>
                </CardContent>
              </Card>
               <Card className="bg-white border-slate-200/60 shadow-sm border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-slate-700"><Waves className="text-yellow-500" />Noise Level</CardTitle>
                   <p className="text-3xl font-bold text-slate-900">Moderate</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">Minor traffic noise expected.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Health Advisory</h2>
             <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
                <Card className="bg-white border-slate-200/60 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <AlertTriangle className="h-8 w-8 text-yellow-500 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-slate-800">Moderate PM2.5 Levels</h3>
                            <p className="text-sm text-slate-600">Sensitive groups (children, elderly) should limit prolonged outdoor exertion.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-white border-slate-200/60 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <CheckCircle className="h-8 w-8 text-slate-400 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-slate-800">No Critical Alerts</h3>
                            <p className="text-sm text-slate-600">No immediate severe risks detected in your area.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </section>

          <section className="text-center bg-white py-12 rounded-lg border border-slate-200/60 shadow-sm">
             <Siren className="h-10 w-10 text-blue-600 mx-auto mb-4" />
             <h2 className="text-3xl font-bold mb-2 text-slate-900">See Something? Say Something.</h2>
             <p className="text-slate-600 mb-6 max-w-xl mx-auto">Your reports help authorities identify and act on environmental issues faster.
             </p>
             <Button asChild size="lg">
                <Link href="/report">Report an Issue Now</Link>
            </Button>
          </section>
          
          <div className="grid md:grid-cols-2 gap-8">
            <section>
                <h2 className="text-2xl font-bold mb-4 text-slate-900">My Dashboard</h2>
                <div className="space-y-4">
                    <Card className="bg-white hover:bg-slate-100/80 transition-colors cursor-pointer border-slate-200/60 shadow-sm">
                        <CardContent className="p-4 flex items-center gap-4">
                            <Map className="h-6 w-6 text-blue-600" />
                            <div>
                                <h3 className="font-semibold text-slate-800">Track My Reports</h3>
                                <p className="text-sm text-slate-600">Check the status of issues you've reported.</p>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="bg-white hover:bg-slate-100/80 transition-colors cursor-pointer border-slate-200/60 shadow-sm">
                        <CardContent className="p-4 flex items-center gap-4">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                            <div>
                                <h3 className="font-semibold text-slate-800">Your Area's Trends</h3>
                                <p className="text-sm text-slate-600">View weekly and monthly pollution data.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
             <section>
                 <h2 className="text-2xl font-bold mb-4 text-slate-900">Education & Controls</h2>
                <div className="space-y-4">
                    <Card className="bg-white hover:bg-slate-100/80 transition-colors cursor-pointer border-slate-200/60 shadow-sm">
                        <CardContent className="p-4 flex items-center gap-4">
                            <Info className="h-6 w-6 text-blue-600" />
                            <div>
                                <h3 className="font-semibold text-slate-800">Learn About Pollution</h3>
                                <p className="text-sm text-slate-600">What is PM2.5? How does noise affect health?</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white hover:bg-slate-100/80 transition-colors cursor-pointer border-slate-200/60 shadow-sm">
                        <CardContent className="p-4 flex items-center gap-4">
                            <User className="h-6 w-6 text-blue-600" />
                            <div>
                                <h3 className="font-semibold text-slate-800">Privacy Settings</h3>
                                <p className="text-sm text-slate-600">Manage your data and anonymous reporting.</p>
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
