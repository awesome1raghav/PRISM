
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wind, Droplets, Waves } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const pollutionLayers = [
  { id: 'aqi', name: 'AQI (Air)', value: '78', status: 'Moderate', icon: <Wind className="h-5 w-5" /> },
  { id: 'wqi', name: 'WQI (Water)', value: '92', status: 'Good', icon: <Droplets className="h-5 w-5" /> },
  { id: 'nqi', name: 'NQI (Noise)', value: '68 dB', status: 'Moderate', icon: <Waves className="h-5 w-5" /> },
];

export default function HeatmapPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="relative flex-grow">
          {/* Placeholder for Google Maps */}
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <p className="text-muted-foreground text-2xl font-bold">
              Google Maps Heatmap Placeholder
            </p>
          </div>
          
          <div className="relative p-4 md:p-8">
            <Card className="max-w-sm bg-card/80 backdrop-blur-md border-border/30">
              <CardHeader>
                <CardTitle>Pollution Layers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pollutionLayers.map(layer => (
                  <div key={layer.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                        {layer.icon}
                        <span className="font-medium">{layer.name}</span>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">{layer.value}</p>
                        <Badge variant={layer.status === 'Good' ? 'default' : layer.status === 'Moderate' ? 'secondary' : 'destructive'}
                         className={
                            layer.status === 'Good' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            layer.status === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-red-500/20 text-red-400 border-red-500/30'
                         }
                        >
                            {layer.status}
                        </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

    