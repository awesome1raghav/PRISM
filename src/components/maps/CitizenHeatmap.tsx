
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import DashboardMap from './DashboardMap';
import { type WardData } from './types';
import { type MetricType } from '@/context/LocationContext';

const cityCenters: { [key: string]: L.LatLngExpression } = {
  'bengaluru': [12.9716, 77.5946],
  'new-york': [40.7128, -74.0060],
};

const CitizenHeatmap = ({ cityId = 'bengaluru', wardsData, isLoading, activeMetric = 'aqi' }: { cityId: string; wardsData: WardData[]; isLoading: boolean, activeMetric: MetricType }) => {
  if (isLoading) {
    return <Skeleton className="h-[420px] w-full rounded-xl" />;
  }

  const mapCenter = cityCenters[cityId] || cityCenters['bengaluru'];

  return (
    <DashboardMap
      center={mapCenter}
      zoom={11}
      wards={wardsData}
      activeMetric={activeMetric}
    />
  );
};

export default CitizenHeatmap;
