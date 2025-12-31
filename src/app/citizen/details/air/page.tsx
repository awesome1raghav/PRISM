
'use client';
import MetricDetailPage from '@/components/citizen/MetricDetailPage';
import { Wind } from 'lucide-react';

const healthEffects = [
    { level: 'Good (0-50)', effect: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' },
    { level: 'Moderate (51-100)', effect: 'Some pollutants may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.' },
    { level: 'Poor (101-150)', effect: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' },
    { level: 'Unhealthy (151+)', effect: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
];

const calculationInfo = "The Air Quality Index (AQI) is calculated based on real-time measurements of several key pollutants including Particulate Matter (PM2.5 and PM10), Ozone (O₃), Nitrogen Dioxide (NO₂), and Sulfur Dioxide (SO₂). Each pollutant is measured and scaled to create a single, easy-to-understand number.";


export default function AirQualityPage() {
  return (
    <MetricDetailPage
      metric="air"
      title="Air Quality Index"
      unit="AQI"
      icon={<Wind className="h-8 w-8 text-sky-400" />}
      healthEffects={healthEffects}
      calculationInfo={calculationInfo}
    />
  );
}
