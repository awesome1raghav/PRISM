
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gauge, Droplets, Waves, Trash2, Map, Building, Home } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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

const chartData = [
  { date: 'Mon', aqi: 85, water: 90, noise: 65 },
  { date: 'Tue', aqi: 72, water: 91, noise: 68 },
  { date: 'Wed', aqi: 68, water: 94, noise: 66 },
  { date: 'Thu', aqi: 78, water: 92, noise: 70 },
  { date: 'Fri', aqi: 90, water: 88, noise: 72 },
  { date: 'Sat', aqi: 95, water: 85, noise: 75 },
  { date: 'Sun', aqi: 88, water: 87, noise: 71 },
];

const chartConfig = {
  aqi: { label: 'AQI', color: 'hsl(var(--chart-2))' },
  water: { label: 'Water Quality', color: 'hsl(var(--chart-1))' },
  noise: { label: 'Noise (dB)', color: 'hsl(var(--chart-3))' },
};


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
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <Area type="monotone" dataKey="aqi" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#colorAqi)" />
              <Area type="monotone" dataKey="water" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#colorWater)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
