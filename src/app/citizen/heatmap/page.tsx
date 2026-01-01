
'use client';

import { useState, useContext, useMemo, Suspense, useEffect } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Droplets, Waves } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LocationContext } from '@/context/LocationContext';
import HeatmapGrid from '@/components/citizen/HeatmapGrid';
import { type MetricType, type Ward, type PollutionData } from '@/context/LocationContext';
import { useSearchParams } from 'next/navigation';
import MapMetricOverlay from '@/components/citizen/MapMetricOverlay';

const getMetricSummary = (wards: Ward[], metric: MetricType) => {
    if (!wards || wards.length === 0) return { value: 'N/A', status: 'Unknown', numericValue: 0 };
    
    const totalValue = wards.reduce((sum, ward) => sum + ward.live_data[metric], 0);
    const avgValue = totalValue / wards.length;

    let status: PollutionData['riskLevel'] = 'good';
     if (metric === 'aqi') {
        if (avgValue > 200) status = 'severe';
        else if (avgValue > 100) status = 'poor';
        else if (avgValue > 50) status = 'moderate';
    } else if (metric === 'wqi') {
        if (avgValue < 40) status = 'severe';
        else if (avgValue < 60) status = 'poor';
        else if (avgValue < 80) status = 'moderate';
        else status = 'good';
    } else { // noise
        if (avgValue > 100) status = 'severe';
        else if (avgValue > 80) status = 'poor';
        else if (avgValue > 60) status = 'moderate';
        else status = 'good';
    }

    const valueString = metric === 'noise' ? `${Math.round(avgValue)} dB` : `${Math.round(avgValue)}`;

    return { value: valueString, status, numericValue: avgValue };
}

function HeatmapContent() {
  const [activeLayer, setActiveLayer] = useState<MetricType>('aqi');
  const { locationData, setLocation } = useContext(LocationContext);
  const searchParams = useSearchParams();
  const locationParam = searchParams.get('location') || 'Bengaluru';
  
  useEffect(() => {
    setLocation(locationParam, null);
  }, [locationParam, setLocation]);

  const location = locationParam;
  
  const cityData = locationData[location];

  const aqiSummary = useMemo(() => getMetricSummary(cityData?.wards, 'aqi'), [cityData]);
  const wqiSummary = useMemo(() => getMetricSummary(cityData?.wards, 'wqi'), [cityData]);
  const noiseSummary = useMemo(() => getMetricSummary(cityData?.wards, 'noise'), [cityData]);

  const pollutionLayers = [
    { id: 'aqi' as MetricType, name: 'AQI (Air)', value: aqiSummary.value, status: aqiSummary.status, icon: <Wind className="h-5 w-5" /> },
    { id: 'wqi' as MetricType, name: 'WQI (Water)', value: wqiSummary.value, status: wqiSummary.status, icon: <Droplets className="h-5 w-5" /> },
    { id: 'noise' as MetricType, name: 'NQI (Noise)', value: noiseSummary.value, status: noiseSummary.status, icon: <Waves className="h-5 w-5" /> },
  ];

   const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'poor': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'severe': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row">
        <div className="lg:w-96 p-4 md:p-6 flex-shrink-0">
            <Card className="bg-card/80 backdrop-blur-md border-border/30">
              <CardHeader>
                <CardTitle>Pollution Layers: {cityData?.name}</CardTitle>
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
                        <Badge variant="outline" className={cn("border", getStatusColor(layer.status))}>
                            {layer.status}
                        </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
        </div>
        <div className="relative flex-grow p-4 md:p-6">
            <MapMetricOverlay
                summaries={{ aqi: aqiSummary, wqi: wqiSummary, noise: noiseSummary }}
                activeMetric={activeLayer}
                setActiveMetric={setActiveLayer}
            />
            <HeatmapGrid wards={cityData?.wards || []} activeMetric={activeLayer} />
        </div>
      </main>
    </div>
  );
}


export default function HeatmapPage() {
    return (
        <Suspense fallback={<div>Loading heatmap...</div>}>
            <HeatmapContent />
        </Suspense>
    )
}
