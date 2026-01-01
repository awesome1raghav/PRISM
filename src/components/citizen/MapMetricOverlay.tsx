
'use client';

import { type MetricType, type RiskLevel } from '@/context/LocationContext';
import { cn } from '@/lib/utils';
import { Wind, Droplets, Waves } from 'lucide-react';

interface MetricSummary {
  value: string;
  status: RiskLevel | 'Unknown';
  numericValue: number;
}

interface MapMetricOverlayProps {
  summaries: {
    aqi: MetricSummary;
    wqi: MetricSummary;
    noise: MetricSummary;
  };
  activeMetric: MetricType;
  setActiveMetric: (metric: MetricType) => void;
}

const getStatusStyles = (status: RiskLevel | 'Unknown') => {
    switch (status) {
      case 'good': return 'border-status-green/50 text-status-green';
      case 'moderate': return 'border-status-yellow/50 text-status-yellow';
      case 'poor': return 'border-orange-500/50 text-orange-400';
      case 'severe': return 'border-status-red/50 text-status-red';
      default: return 'border-muted/50 text-muted-foreground';
    }
};

const MetricIndicator = ({
    metric,
    title,
    icon,
    summary,
    isActive,
    onClick,
}: {
    metric: MetricType;
    title: string;
    icon: React.ReactNode;
    summary: MetricSummary;
    isActive: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'glassmorphism-card flex items-center justify-between gap-3 p-2 px-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl',
                isActive ? 'border-primary/80 shadow-primary/20' : 'border-border/30',
                getStatusStyles(summary.status)
            )}
        >
            <div className="flex items-center gap-2">
                <div className={cn(isActive ? 'text-primary' : 'text-current')}>{icon}</div>
                <div>
                    <p className="text-xs font-medium text-foreground/80">{title}</p>
                    <p className="text-lg font-bold text-foreground">{summary.value}</p>
                </div>
            </div>
             <div className={cn('text-xs font-semibold uppercase tracking-wider transition-opacity', isActive ? 'opacity-100' : 'opacity-70')}>
                {summary.status}
            </div>
        </div>
    );
};


const MapMetricOverlay = ({ summaries, activeMetric, setActiveMetric }: MapMetricOverlayProps) => {
  return (
    <div className="absolute top-8 right-8 z-[1000] flex flex-col gap-3">
        <MetricIndicator
            metric="aqi"
            title="Air Quality"
            icon={<Wind className="h-5 w-5" />}
            summary={summaries.aqi}
            isActive={activeMetric === 'aqi'}
            onClick={() => setActiveMetric('aqi')}
        />
        <MetricIndicator
            metric="wqi"
            title="Water Quality"
            icon={<Droplets className="h-5 w-5" />}
            summary={summaries.wqi}
            isActive={activeMetric === 'wqi'}
            onClick={() => setActiveMetric('wqi')}
        />
        <MetricIndicator
            metric="noise"
            title="Noise Level"
            icon={<Waves className="h-5 w-5" />}
            summary={summaries.noise}
            isActive={activeMetric === 'noise'}
            onClick={() => setActiveMetric('noise')}
        />
    </div>
  );
};

export default MapMetricOverlay;
