'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';
import { Progress } from '@/components/ui/progress';

const chartData = [
  { month: 'Jan', co2: 400, sox: 240 },
  { month: 'Feb', co2: 300, sox: 139 },
  { month: 'Mar', co2: 200, sox: 380 },
  { month: 'Apr', co2: 278, sox: 190 },
  { month: 'May', co2: 189, sox: 280 },
  { month: 'Jun', co2: 239, sox: 180 },
];

const chartConfig = {
  co2: { label: 'CO₂ Emissions (tons)', color: 'hsl(var(--chart-1))' },
  sox: { label: 'SOx Emissions (kg)', color: 'hsl(var(--chart-2))' },
};

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-8">
          Emissions Analytics
        </h1>

        <div className="grid gap-8">
            <Card className="bg-card/40 border-border/30">
                <CardHeader>
                    <CardTitle>Quarterly Goal Progress</CardTitle>
                    <CardDescription>Progress towards Q3 goal of 20% emissions reduction.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-muted-foreground">CO₂ Reduction</span>
                            <span className="text-sm font-semibold">82% to Goal</span>
                        </div>
                        <Progress value={82} />
                    </div>
                     <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-muted-foreground">Water Usage Reduction</span>
                            <span className="text-sm font-semibold">65% to Goal</span>
                        </div>
                        <Progress value={65} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                 <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                    <CardTitle>CO₂ Emissions Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <defs>
                                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="co2" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#colorCo2)" />
                        </AreaChart>
                    </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                    <CardTitle>SOx Emissions Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="sox" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
