
import { type MetricType } from "@/context/LocationContext";

export const getMetricColor = (metric: MetricType, value: number): string => {
  if (metric === 'aqi') {
    if (value <= 50) return 'green';
    if (value <= 100) return 'yellow';
    if (value <= 200) return 'orange';
    return 'red';
  }
  if (metric === 'wqi') {
    if (value >= 80) return 'green';
    if (value >= 60) return 'yellow';
    if (value >= 40) return 'orange';
    return 'red';
  }
  // noise
  if (value <= 60) return 'green';
  if (value <= 80) return 'yellow';
  if (value <= 100) return 'orange';
  return 'red';
};

export const getMetricStatus = (metric: MetricType, value: number): string => {
  if (metric === 'aqi') {
    if (value <= 50) return 'Good';
    if (value <= 100) return 'Moderate';
    if (value <= 200) return 'Poor';
    return 'Severe';
  }
  if (metric === 'wqi') {
    if (value >= 80) return 'Good';
    if (value >= 60) return 'Moderate';
    if (value >= 40) return 'Poor';
    return 'Severe';
  }
  // noise
  if (value <= 60) return 'Good';
  if (value <= 80) return 'Moderate';
  if (value <= 100) return 'Poor';
  return 'Severe';
};

export const getMetricUnit = (metric: MetricType): string => {
    switch (metric) {
        case 'aqi': return 'AQI';
        case 'wqi': return 'WQI';
        case 'noise': return 'dB';
        default: return '';
    }
};
