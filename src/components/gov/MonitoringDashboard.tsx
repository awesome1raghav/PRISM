
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gauge, Droplets, Waves, Map, Building, Home, AlertTriangle, Wind } from 'lucide-react';
import { type MetricType } from '@/context/LocationContext';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { type WardData } from '../maps/types';


const CitizenHeatmap = dynamic(() => import('../maps/CitizenHeatmap'), {
  ssr: false,
  loading: () => <Skeleton className="h-[420px] w-full rounded-xl" />,
});


const data = {
  city: {
    air: { value: 78, status: 'Moderate' },
    water: { value: 92, status: 'Good' },
    noise: { value: 68, status: 'Moderate' },
  },
  district: {
    air: { value: 65, status: 'Moderate' },
    water: { value: 88, status: 'Good' },
    noise: { value: 62, 'status': 'Low' },
  },
  ward: {
    air: { value: 45, status: 'Good' },
    water: { value: 95, status: 'Good' },
    noise: { value: 55, 'status': 'Low' },
  }
}

const generateWardData = (id: string, name: string, aqi: number, wqi: number, noise: number, lat: number, lng: number): WardData => ({
  id,
  name,
  lat,
  lng,
  aqi,
  wqi,
  noise,
});

const wards = [
    generateWardData('koramangala', 'Koramangala', 55, 80, 65, 12.9352, 77.6245),
    generateWardData('jayanagar', 'Jayanagar', 75, 75, 70, 12.9308, 77.5838),
    generateWardData('indiranagar', 'Indiranagar', 85, 70, 80, 12.9784, 77.6408),
    generateWardData('whitefield', 'Whitefield', 120, 60, 75, 12.9698, 77.7499),
    generateWardData('hebbal', 'Hebbal', 90, 70, 68, 13.0357, 77.5972),
    generateWardData('marathahalli', 'Marathahalli', 150, 55, 85, 12.9569, 77.7011),
];

const activeAlerts = [
    { type: 'Air', title: 'AQI Spike', location: 'Ward 18, Whitefield', time: '15m ago', value: '158 AQI', severity: 'High' },
    { type: 'Noise', title: 'Noise Limit Exceeded', location: 'MG Road', time: '45m ago', value: '92 dB', severity: 'Medium' },
    { type: 'Water', title: 'High Turbidity', location: 'Bellandur Lake', time: '2h ago', value: '12 NTU', severity: 'High' },
];

const alertConfig = {
    Air: { icon: Wind, color: 'sky' },
    Water: { icon: Droplets, color: 'blue' },
    Noise: { icon: Waves, color: 'orange' },
};

const severityStyles = {
    High: 'border-l-red-500/80 bg-red-500/10 text-red-400 shadow-red-500/10',
    Medium: 'border-l-yellow-500/80 bg-yellow-500/10 text-yellow-400 shadow-yellow-500/10',
}

const trendData = [
  { day: 'Mon', aqi: 75, wqi: 90, noise: 65 },
  { day: 'Tue', aqi: 80, wqi: 88, noise: 68 },
  { day: 'Wed', aqi: 110, wqi: 85, noise: 70 },
  { day: 'Thu', aqi: 95, wqi: 82, noise: 72 },
  { day: 'Fri', aqi: 125, wqi: 78, noise: 75 },
  { day: 'Sat', aqi: 140, wqi: 75, noise: 80 },
  { day: 'Sun', aqi: 130, wqi: 76, noise: 78 },
];

const chartConfig = {
  aqi: { label: 'AQI', color: 'hsl(var(--chart-1))' },
  wqi: { label: 'WQI', color: 'hsl(var(--chart-2))' },
  noise: { label: 'Noise (dB)', color: 'hsl(var(--chart-3))' },
};


const StatusCard = ({ icon, title, value, status }: { icon: React.ReactNode, title: string, value: string | number, status: string }) => {
  const statusColor = status === 'Good' || status === 'Low' ? 'text-green-400' : status === 'Moderate' ? 'text-yellow-400' : 'text-red-500';
  return (
    <Card className="bg-card/80 border-border/30">
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

const View = ({ viewData, metric }: { viewData: typeof data.city, metric: MetricType }) => {
    const metricMap = {
        aqi: { icon: <Gauge className="h-4 w-4"/>, title: "Air Quality Index", data: viewData.air },
        wqi: { icon: <Droplets className="h-4 w-4"/>, title: "Water Quality Score", data: viewData.water },
        noise: { icon: <Waves className="h-4 w-4"/>, title: "Avg. Noise Level (dB)", data: viewData.noise },
    }
    const currentMetric = metricMap[metric];

  return (
    <StatusCard 
        icon={currentMetric.icon} 
        title={currentMetric.title}
        value={currentMetric.data.value}
        status={currentMetric.data.status} 
    />
  );
};

const EnvironmentalTrendChart = ({ data, metric }: { data: any[], metric: MetricType }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip 
            cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
            content={<ChartTooltipContent />} 
          />
          <Line 
            dataKey={metric} 
            type="monotone"
            stroke={`hsl(var(--chart-${metric === 'aqi' ? '1' : metric === 'wqi' ? '2' : '3'}))`}
            strokeWidth={2}
            dot={{ r: 4, fill: `hsl(var(--chart-${metric === 'aqi' ? '1' : metric === 'wqi' ? '2' : '3'}))` }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default function MonitoringDashboard() {
  const [activeMetric, setActiveMetric] = useState<MetricType>('aqi');
  
  const wardDataForMap: WardData[] = wards.map(ward => ({
    id: ward.id,
    name: ward.name,
    lat: ward.lat,
    lng: ward.lng,
    aqi: ward.aqi,
    wqi: ward.wqi,
    noise: ward.noise,
  }));

  return (
    <div className="grid gap-8">
       <Card className="bg-card/40 border-border/30">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
                <AlertTriangle />
                Active Alerts
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {activeAlerts.map((alert, index) => {
                const config = alertConfig[alert.type as keyof typeof alertConfig];
                const Icon = config.icon;
                const severityStyle = severityStyles[alert.severity as keyof typeof severityStyles];

                return (
                    <div key={index} className={cn("relative flex items-center gap-4 rounded-lg border-l-4 p-4 shadow-md transition-all hover:shadow-lg", severityStyle)}>
                        <div className={`p-2 bg-${config.color}-500/10 rounded-full`}><Icon className={`h-6 w-6 text-${config.color}-400`} /></div>
                        <div className="flex-grow">
                             <div className="flex items-center gap-2">
                                {alert.severity === 'High' && (
                                     <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                )}
                                <p className="font-bold text-foreground">{alert.title}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.location}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-foreground">{alert.value}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                    </div>
                )
            })}
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/30">
        <CardHeader>
            <CardTitle>Live Regional Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="city">
                <TabsList className="grid w-full grid-cols-3 max-w-lg">
                    <TabsTrigger value="city"><Map className="mr-2 h-4 w-4"/>City View</TabsTrigger>
                    <TabsTrigger value="district"><Building className="mr-2 h-4 w-4"/>District View</TabsTrigger>
                    <TabsTrigger value="ward"><Home className="mr-2 h-4 w-4"/>Ward View</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                    <Tabs defaultValue={activeMetric} onValueChange={(value) => setActiveMetric(value as MetricType)} className="mb-4">
                        <TabsList>
                            <TabsTrigger value="aqi">Air</TabsTrigger>
                            <TabsTrigger value="wqi">Water</TabsTrigger>
                            <TabsTrigger value="noise">Noise</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <TabsContent value="city"><View viewData={data.city} metric={activeMetric} /></TabsContent>
                    <TabsContent value="district"><View viewData={data.district} metric={activeMetric} /></TabsContent>
                    <TabsContent value="ward"><View viewData={data.ward} metric={activeMetric} /></TabsContent>
                </div>
            </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/30">
        <CardHeader>
          <CardTitle>Pollution Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
            <CitizenHeatmap cityId="bengaluru" wardsData={wardDataForMap} isLoading={false} activeMetric={activeMetric} />
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/30">
        <CardHeader>
          <CardTitle>7-Day Environmental Trends</CardTitle>
        </CardHeader>
        <CardContent>
            <EnvironmentalTrendChart data={trendData} metric={activeMetric} />
        </CardContent>
      </Card>
    </div>
  );
}
