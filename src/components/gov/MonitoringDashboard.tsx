'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gauge, Droplets, Waves, Trash2, Map, Building, Home } from 'lucide-react';
import HeatmapGrid from '@/components/citizen/HeatmapGrid';
import { type MetricType, type Ward, type PollutionData } from '@/context/LocationContext';

const data = {
  city: {
    air: { value: 78, status: 'Moderate' },
    water: { value: 92, status: 'Good' },
    noise: { value: 68, status: 'Moderate' },
    waste: { value: '82%', status: 'High' },
  },
  district: {
    air: { value: 65, status: 'Moderate' },
    water: { value: 88, status: 'Good' },
    noise: { value: 62, status: 'Low' },
    waste: { value: '75%', status: 'Moderate' },
  },
  ward: {
    air: { value: 45, status: 'Good' },
    water: { value: 95, status: 'Good' },
    noise: { value: 55, status: 'Low' },
    waste: { value: '60%', status: 'Low' },
  }
}

const generateWardData = (id: string, name: string, aqi: number, wqi: number, noise: number): Ward => ({
  id,
  name,
  live_data: {
    aqi,
    wqi,
    noise,
    updatedAt: '2 min ago',
    riskLevel: 'moderate',
  },
});

const wards: Ward[] = [
    generateWardData('koramangala', 'Koramangala', 55, 80, 65),
    generateWardData('jayanagar', 'Jayanagar', 75, 75, 70),
    generateWardData('indiranagar', 'Indiranagar', 85, 70, 80),
    generateWardData('whitefield', 'Whitefield', 120, 60, 75),
    generateWardData('hebbal', 'Hebbal', 90, 70, 68),
    generateWardData('marathahalli', 'Marathahalli', 150, 55, 85),
];


const StatusCard = ({ icon, title, value, status }: { icon: React.ReactNode, title: string, value: string | number, status: string }) => {
  const statusColor = status === 'Good' ? 'text-green-400' : status === 'Moderate' ? 'text-yellow-400' : 'text-red-500';
  return (
    <Card className="bg-card/40 border-border/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs font-semibold ${statusColor}`}>{status}</p>
      </CardContent>
    </Card>
  );
};

const View = ({ viewData }: { viewData: typeof data.city }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <StatusCard icon={<Gauge className="h-4 w-4"/>} title="Air Quality Index" value={viewData.air.value} status={viewData.air.status} />
    <StatusCard icon={<Droplets className="h-4 w-4"/>} title="Water Quality Score" value={viewData.water.value} status={viewData.water.status} />
    <StatusCard icon={<Waves className="h-4 w-4"/>} title="Avg. Noise Level (dB)" value={viewData.noise.value} status={viewData.noise.status} />
    <StatusCard icon={<Trash2 className="h-4 w-4"/>} title="Waste Mgt. Efficiency" value={viewData.waste.value} status={viewData.waste.status} />
  </div>
);

export default function MonitoringDashboard() {
  const [activeMetric, setActiveMetric] = useState<MetricType>('aqi');
  return (
    <div className="grid gap-8">
      <Card className="bg-card/40 border-border/30">
        <CardHeader>
            <CardTitle>Live Regional Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="city">
                <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
                    <TabsTrigger value="city"><Map className="mr-2 h-4 w-4"/>City View</TabsTrigger>
                    <TabsTrigger value="district"><Building className="mr-2 h-4 w-4"/>District View</TabsTrigger>
                    <TabsTrigger value="ward"><Home className="mr-2 h-4 w-4"/>Ward View</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                    <TabsContent value="city"><View viewData={data.city} /></TabsContent>
                    <TabsContent value="district"><View viewData={data.district} /></TabsContent>
                    <TabsContent value="ward"><View viewData={data.ward} /></TabsContent>
                </div>
            </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/30">
        <CardHeader>
          <CardTitle>7-Day Environmental Trends</CardTitle>
           <Tabs value={activeMetric} onValueChange={(value) => setActiveMetric(value as MetricType)}>
              <TabsList>
                <TabsTrigger value="aqi">Air</TabsTrigger>
                <TabsTrigger value="wqi">Water</TabsTrigger>
                <TabsTrigger value="noise">Noise</TabsTrigger>
              </TabsList>
            </Tabs>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
            <HeatmapGrid wards={wards} activeMetric={activeMetric} isPreview />
        </CardContent>
      </Card>
    </div>
  );
}
