
'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type Ward, type MetricType, type RiskLevel } from '@/context/LocationContext';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface HeatmapGridProps {
  wards: Ward[];
  activeMetric: MetricType;
  isPreview?: boolean;
}

const getTileStyle = (value: number, metric: MetricType) => {
    let risk: RiskLevel = 'good';
    let opacity = 0.2;

    if (metric === 'aqi') {
        if (value > 200) { risk = 'severe'; opacity = 0.8; }
        else if (value > 100) { risk = 'poor'; opacity = 0.6; }
        else if (value > 50) { risk = 'moderate'; opacity = 0.4; }
        else { risk = 'good'; opacity = 0.2; }
    } else if (metric === 'wqi') {
        if (value < 40) { risk = 'severe'; opacity = 0.8; }
        else if (value < 60) { risk = 'poor'; opacity = 0.6; }
        else if (value < 80) { risk = 'moderate'; opacity = 0.4; }
        else { risk = 'good'; opacity = 0.2; }
    } else { // noise
        if (value > 100) { risk = 'severe'; opacity = 0.8; }
        else if (value > 80) { risk = 'poor'; opacity = 0.6; }
        else if (value > 60) { risk = 'moderate'; opacity = 0.4; }
        else { risk = 'good'; opacity = 0.2; }
    }

    const colorStops: Record<RiskLevel, string> = {
        good: 'rgba(0, 255, 0, OPACITY)',      // Green
        moderate: 'rgba(255, 255, 0, OPACITY)', // Yellow
        poor: 'rgba(255, 165, 0, OPACITY)',   // Orange
        severe: 'rgba(255, 0, 0, OPACITY)',      // Red
    };

    const color = colorStops[risk].replace(/OPACITY/g, String(opacity));

    return {
        background: `radial-gradient(circle, ${color} 10%, transparent 70%)`,
        '--risk-color-raw': `var(--status-${risk === 'severe' || risk === 'poor' ? 'red' : 'yellow'})`,
    };
};


const HeatmapGrid = ({ wards, activeMetric, isPreview = false }: HeatmapGridProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const location = searchParams.get('location') || 'Bengaluru';

    if (!wards || wards.length === 0) {
        return <div className="flex items-center justify-center h-full text-muted-foreground">No sensor data available for this area.</div>;
    }

    const handleTileClick = (metric: MetricType) => {
        if (isPreview) return; // Don't navigate from the dashboard preview
        
        let path = `/citizen/details/air?location=${location}`;
        if (metric === 'wqi') path = `/citizen/details/water?location=${location}`;
        if (metric === 'noise') path = `/citizen/details/noise?location=${location}`;
        router.push(path);
    };

  return (
    <TooltipProvider delayDuration={150}>
      <div className={cn(
          "grid h-full w-full gap-1 transition-all duration-300",
          isPreview 
            ? "grid-cols-3 grid-rows-3"
            : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        )}>
        {wards.map((ward) => {
          const value = ward.live_data[activeMetric];
          const unit = activeMetric === 'noise' ? 'dB' : activeMetric.toUpperCase();
          const tileStyle = getTileStyle(value, activeMetric);

          return (
            <Tooltip key={ward.id}>
              <TooltipTrigger asChild>
                <div
                  onClick={() => handleTileClick(activeMetric)}
                  className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border/20 bg-muted/20 p-2 text-center text-xs font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-muted/50"
                >
                    <div className="absolute inset-0 transition-all duration-500" style={tileStyle}></div>
                    <span className="relative z-10 truncate">{ward.name}</span>
                </div>
              </TooltipTrigger>
               <TooltipContent className="bg-card/80 backdrop-blur-sm border-border/40">
                    <p className="font-bold">{ward.name}</p>
                    <p className="text-muted-foreground">
                        {activeMetric.toUpperCase()}: <span className="font-semibold text-foreground">{value} {unit}</span>
                    </p>
                    <p className="text-muted-foreground text-xs">Updated: {ward.live_data.updatedAt}</p>
                </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default HeatmapGrid;
