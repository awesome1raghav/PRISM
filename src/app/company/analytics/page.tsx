
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, ChevronDown, Wind, Droplets, Waves, Trash2, Filter, AlertTriangle, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const initialChartData = [
  { time: "12:00", PM25: 45, PM10: 60, NO2: 25, SO2: 12 },
  { time: "14:00", PM25: 55, PM10: 75, NO2: 30, SO2: 15 },
  { time: "16:00", PM25: 70, PM10: 90, NO2: 38, SO2: 18 },
  { time: "18:00", PM25: 88, PM10: 110, NO2: 42, SO2: 18 },
  { time: "20:00", PM25: 80, PM10: 105, NO2: 40, SO2: 16 },
  { time: "22:00", PM25: 65, PM10: 85, NO2: 35, SO2: 14 },
];

const initialPollutantData = [
    { name: 'PM2.5', value: 88, unit: 'μg/m³', limit: 60, status: 'High' },
    { name: 'PM10', value: 110, unit: 'μg/m³', limit: 100, status: 'High' },
    { name: 'NO₂', value: 42, unit: 'μg/m³', limit: 80, status: 'Normal' },
    { name: 'SO₂', value: 18, unit: 'μg/m³', limit: 80, status: 'Normal' },
];

const initialAnalysis = {
    highEmissionWindows: ['6:00 PM – 8:00 PM', '10:30 AM – 11:15 AM'],
    possibleContributors: ['Production Line 2 – High load', 'Filter efficiency drop', 'Wind direction change']
}

const chartConfig = {
  PM25: { label: 'PM2.5', color: 'hsl(var(--chart-1))' },
  PM10: { label: 'PM10', color: 'hsl(var(--chart-2))' },
  NO2: { label: 'NO₂', color: 'hsl(var(--chart-3))' },
  SO2: { label: 'SO₂', color: 'hsl(var(--chart-4))' },
};


// Function to generate new mock data based on filters
const generateMockData = (facility: string, timeRange: string, pollutant: string) => {
    const randomFactor = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return (Math.sin(hash) + 1) / 2; // Return value between 0 and 1
    };
    
    const factor = randomFactor(facility + timeRange + pollutant);

    const newChartData = initialChartData.map(item => ({
        ...item,
        PM25: Math.round(item.PM25 * (0.8 + factor * 0.4)),
        PM10: Math.round(item.PM10 * (0.8 + factor * 0.4)),
    }));
    
    const newPollutantData = initialPollutantData.map(item => ({
        ...item,
        value: Math.round(item.value * (0.8 + factor * 0.4)),
    }));

     const newAnalysis = {
        highEmissionWindows: initialAnalysis.highEmissionWindows.map(w => w.replace(/\d/g, (d) => String((parseInt(d) + Math.floor(factor * 5)) % 10))),
        possibleContributors: facility.includes('Whitefield') ? initialAnalysis.possibleContributors : ['Boiler startup sequence', 'Shift change', 'Abnormal process venting']
    };

    return { chartData: newChartData, pollutantData: newPollutantData, analysis: newAnalysis };
};


export default function AnalyticsPage() {
    const [facility, setFacility] = useState('whitefield');
    const [timeRange, setTimeRange] = useState('24h');
    const [pollutant, setPollutant] = useState('all');

    const { chartData, pollutantData, analysis } = generateMockData(facility, timeRange, pollutant);

    const facilityNames: { [key: string]: string } = {
        whitefield: 'Whitefield Manufacturing Unit',
        peenya: 'Peenya Industrial Plant'
    };

    const timeRangeNames: { [key: string]: string } = {
        '24h': 'Last 24 Hours',
        '7d': 'Last 7 Days',
        '30d': 'Last 30 Days'
    };

    const pollutantNames: { [key: string]: string } = {
        'all': 'All',
        'pm25': 'PM2.5',
        'pm10': 'PM10',
        'no2': 'NO₂',
        'so2': 'SO₂'
    };
    

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
                Emissions Analytics
            </h1>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                        Facility: <span className="font-semibold ml-1">{facilityNames[facility]}</span> <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={facility} onValueChange={setFacility}>
                        <DropdownMenuRadioItem value="whitefield">Whitefield Manufacturing Unit</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="peenya">Peenya Industrial Plant</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                       Time Range: <span className="font-semibold ml-1">{timeRangeNames[timeRange]}</span> <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                 <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={timeRange} onValueChange={setTimeRange}>
                        <DropdownMenuRadioItem value="24h">Last 24 Hours</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="7d">Last 7 Days</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="30d">Last 30 Days</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                        Pollutant: <span className="font-semibold ml-1">{pollutantNames[pollutant]}</span> <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                 <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={pollutant} onValueChange={setPollutant}>
                        <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="pm25">PM2.5</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="pm10">PM10</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="no2">NO₂</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="so2">SO₂</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>


        <Card className="bg-card/40 border-border/30">
            <CardHeader>
                <CardTitle>Emissions Overview</CardTitle>
                <CardDescription>Live data from {facilityNames[facility]}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="trends">Trends</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold mb-2">Live Sensor Readings</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {pollutantData.map(p => (
                                        <Card key={p.name} className="bg-muted/30">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium">{p.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <span className="text-2xl font-bold">{p.value}</span>
                                                <span className="text-xs text-muted-foreground"> {p.unit}</span>
                                                <p className={`text-xs font-semibold ${p.value > p.limit ? 'text-red-500' : 'text-green-500'}`}>
                                                    (Limit: {p.limit}) {p.value > p.limit ? <AlertTriangle className="inline h-3 w-3" /> : ''}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            <div>
                                 <h3 className="font-semibold mb-2">Analysis</h3>
                                 <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Pollutant</TableHead>
                                            <TableHead>Avg</TableHead>
                                            <TableHead>Peak</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pollutantData.map(p => (
                                            <TableRow key={p.name}>
                                                <TableCell>{p.name}</TableCell>
                                                <TableCell>{p.value}</TableCell>
                                                <TableCell>{Math.round(p.value * (1 + randomFactor(p.name) * 0.3))}</TableCell>
                                                <TableCell>
                                                    <Badge variant={p.value > p.limit ? 'destructive' : 'default'}>
                                                        {p.value > p.limit ? <AlertTriangle className="h-3 w-3 mr-1"/> : <CheckCircle className="h-3 w-3 mr-1"/>}
                                                        {p.value > p.limit ? 'High' : 'Normal'}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                 </Table>
                            </div>
                             <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                                <Card className="bg-muted/30">
                                    <CardHeader><CardTitle className="text-base">High Emission Windows</CardTitle></CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside space-y-1">
                                            {analysis.highEmissionWindows.map(w => <li key={w}>{w}</li>)}
                                        </ul>
                                    </CardContent>
                                </Card>
                                 <Card className="bg-muted/30">
                                    <CardHeader><CardTitle className="text-base">Possible Contributors</CardTitle></CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside space-y-1">
                                            {analysis.possibleContributors.map(c => <li key={c}>{c}</li>)}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                     <TabsContent value="trends">
                         <ChartContainer config={chartConfig} className="w-full h-[400px]">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPM25" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-PM25)" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="var(--color-PM25)" stopOpacity={0.1}/>
                                    </linearGradient>
                                     <linearGradient id="colorPM10" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-PM10)" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="var(--color-PM10)" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                <Tooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Area dataKey="PM25" type="natural" fill="url(#colorPM25)" stroke="var(--color-PM25)" stackId="a" />
                                <Area dataKey="PM10" type="natural" fill="url(#colorPM10)" stroke="var(--color-PM10)" stackId="a" />
                            </AreaChart>
                        </ChartContainer>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}

    