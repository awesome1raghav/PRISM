
'use client';
import MetricDetailPage from '@/components/citizen/MetricDetailPage';
import { Waves } from 'lucide-react';

const healthEffects = [
    { level: 'Low (< 60 dB)', effect: 'Normal background noise levels. No significant health impact.' },
    { level: 'Moderate (60-80 dB)', effect: 'Can be annoying and may interfere with conversation. Long-term exposure can lead to stress.' },
    { level: 'High (81-100 dB)', effect: 'Prolonged exposure can cause hearing damage. May increase risk of cardiovascular issues.' },
    { level: 'Very High (101+ dB)', effect: 'Serious risk of permanent hearing loss. Immediate precautions are necessary.' },
];

const calculationInfo = "Noise pollution is measured in decibels (dB). Our system records the average noise level over time from various sound sensors placed in your area. The reported value is an equivalent continuous sound level (Leq) that represents the total sound energy.";


export default function NoiseQualityPage() {
  return (
    <MetricDetailPage
      metric="Noise"
      title="Noise Pollution Levels"
      unit="dB"
      icon={<Waves className="h-8 w-8 text-orange-400" />}
      healthEffects={healthEffects}
      calculationInfo={calculationInfo}
    />
  );
}
