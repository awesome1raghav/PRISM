
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Droplets, Waves } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type PollutionLayerId = 'aqi' | 'wqi' | 'nqi';

const pollutionLayers = [
  { id: 'aqi' as PollutionLayerId, name: 'AQI (Air)', value: '78', status: 'Moderate', icon: <Wind className="h-5 w-5" />, mapId: 'heatmap-air' },
  { id: 'wqi' as PollutionLayerId, name: 'WQI (Water)', value: '92', status: 'Good', icon: <Droplets className="h-5 w-5" />, mapId: 'heatmap-water' },
  { id: 'nqi' as PollutionLayerId, name: 'NQI (Noise)', value: '68 dB', status: 'Moderate', icon: <Waves className="h-5 w-5" />, mapId: 'heatmap-noise' },
];

export default function HeatmapPage() {
  const [activeLayer, setActiveLayer] = useState<PollutionLayerId>('aqi');
  
  const activeMapId = pollutionLayers.find(p => p.id === activeLayer)?.mapId || 'heatmap-air';
  const activeMapImage = PlaceHolderImages.find(img => img.id === activeMapId);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row">
        <div className="lg:w-96 p-4 md:p-6 flex-shrink-0">
            <Card className="bg-card/80 backdrop-blur-md border-border/30">
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
        <div className="relative flex-grow">
          <div className="absolute inset-0 bg-muted">
            {activeMapImage && (
              <Image
                src={activeMapImage.imageUrl}
                alt={`${activeLayer} Heatmap`}
                fill
                style={{objectFit: "cover"}}
                className="opacity-60"
                data-ai-hint={activeMapImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/10 to-transparent" />
          </div>
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-white p-4 bg-black/50 rounded-lg">
                <h2 className="text-2xl font-bold">Interactive Map Placeholder</h2>
                <p>A fully interactive Google Map would be rendered here.</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
