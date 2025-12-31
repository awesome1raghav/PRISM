
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Droplets, Waves } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type PollutionLayerId = 'aqi' | 'wqi' | 'nqi';

const pollutionLayers = [
  { id: 'aqi' as PollutionLayerId, name: 'AQI (Air)', value: '78', status: 'Moderate', icon: <Wind className="h-5 w-5" />, mapUrl: 'https://picsum.photos/seed/heatmap-air/1200/800' },
  { id: 'wqi' as PollutionLayerId, name: 'WQI (Water)', value: '92', status: 'Good', icon: <Droplets className="h-5 w-5" />, mapUrl: 'https://picsum.photos/seed/heatmap-water/1200/800' },
  { id: 'nqi' as PollutionLayerId, name: 'NQI (Noise)', value: '68 dB', status: 'Moderate', icon: <Waves className="h-5 w-5" />, mapUrl: 'https://picsum.photos/seed/heatmap-noise/1200/800' },
];

export default function HeatmapPage() {
  const [activeLayer, setActiveLayer] = useState<PollutionLayerId>('aqi');
  const activeMapUrl = pollutionLayers.find(p => p.id === activeLayer)?.mapUrl || '';

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="relative flex-grow">
          <div className="absolute inset-0 bg-muted">
            {activeMapUrl && (
              <Image
                src={activeMapUrl}
                alt={`${activeLayer} Heatmap`}
                layout="fill"
                objectFit="cover"
                className="opacity-60"
                data-ai-hint="map data"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          
          <div className="relative p-4 md:p-8 flex flex-col h-full justify-end">
            <Card className="max-w-sm bg-card/80 backdrop-blur-md border-border/30">
              <CardHeader>
                <CardTitle>Pollution Layers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pollutionLayers.map(layer => (
                  <div 
                    key={layer.id} 
                    onClick={() => setActiveLayer(layer.id)}
                    className={cn(
                        "flex items-center justify-between p-3 rounded-lg bg-background/50 cursor-pointer transition-all border",
                        activeLayer === layer.id ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-background/80'
                    )}
                  >
                    <div className="flex items-center gap-3">
                        {layer.icon}
                        <span className="font-medium">{layer.name}</span>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">{layer.value}</p>
                        <Badge variant={layer.status === 'Good' ? 'default' : layer.status === 'Moderate' ? 'secondary' : 'destructive'}
                         className={cn(
                            "border",
                            layer.status === 'Good' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            layer.status === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-red-500/20 text-red-400 border-red-500/30'
                         )}
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
