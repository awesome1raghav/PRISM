
'use client';
import MetricDetailPage from '@/components/citizen/MetricDetailPage';
import { Droplets } from 'lucide-react';

const healthEffects = [
    { level: 'Good (80-100)', effect: 'Water quality is considered excellent and safe for all uses, including drinking.' },
    { level: 'Safe (60-79)', effect: 'Water is generally safe for consumption and recreation, but may have minor taste or odor issues.' },
    { level: 'Warning (40-59)', effect: 'Water may not be safe for drinking without treatment (e.g., boiling). Recreational contact should be limited.' },
    { level: 'Poor (0-39)', effect: 'Water is polluted and not safe for drinking or recreation. Avoid contact.' },
];

const calculationInfo = "The Water Quality Index (WQI) is a composite score derived from several key parameters including pH, turbidity (clarity), dissolved oxygen (DO), temperature, and the presence of coliform bacteria. A higher score indicates better water quality.";


export default function WaterQualityPage() {
  return (
    <MetricDetailPage
      metric="Water"
      title="Water Quality Index"
      unit="WQI"
      icon={<Droplets className="h-8 w-8 text-blue-400" />}
      healthEffects={healthEffects}
      calculationInfo={calculationInfo}
    />
  );
}
