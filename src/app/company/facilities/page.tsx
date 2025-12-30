'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Gauge, Droplets, AlertTriangle, CheckCircle, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const facilities = [
  {
    name: 'Whitefield Manufacturing Unit',
    location: 'Bengaluru, KA',
    airQuality: { value: 45, status: 'Good', icon: <CheckCircle className="text-green-500 h-4 w-4" /> },
    waterQuality: { value: 82, status: 'Good', icon: <CheckCircle className="text-green-500 h-4 w-4" /> },
    alerts: 0,
  },
  {
    name: 'Peenya Industrial Plant',
    location: 'Bengaluru, KA',
    airQuality: { value: 88, status: 'Moderate', icon: <AlertTriangle className="text-yellow-500 h-4 w-4" /> },
    waterQuality: { value: 75, status: 'Warning', icon: <AlertTriangle className="text-yellow-500 h-4 w-4" /> },
    alerts: 2,
  },
  {
    name: 'Hosur Assembly Line',
    location: 'Hosur, TN',
    airQuality: { value: 115, status: 'Poor', icon: <AlertTriangle className="text-red-500 h-4 w-4" /> },
    waterQuality: { value: 91, status: 'Good', icon: <CheckCircle className="text-green-500 h-4 w-4" /> },
    alerts: 1,
  },
];

export default function FacilitiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
                My Facilities
            </h1>
            <Button>
                <Building className="mr-2 h-4 w-4" /> Add New Facility
            </Button>
        </div>

        <Card className="bg-card/40 border-border/30">
            <CardHeader>
                <CardTitle>Live Facility Status</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Facility Name</TableHead>
                            <TableHead>Air Quality (AQI)</TableHead>
                            <TableHead>Water Quality</TableHead>
                            <TableHead>Active Alerts</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {facilities.map(facility => (
                            <TableRow key={facility.name}>
                                <TableCell>
                                    <div className="font-medium">{facility.name}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {facility.location}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {facility.airQuality.icon}
                                        <span>{facility.airQuality.value} ({facility.airQuality.status})</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                     <div className="flex items-center gap-2">
                                        {facility.waterQuality.icon}
                                        <span>{facility.waterQuality.value} ({facility.waterQuality.status})</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className={`font-semibold ${facility.alerts > 0 ? 'text-red-500' : ''}`}>
                                        {facility.alerts}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
