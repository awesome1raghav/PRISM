'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GovernmentLoginPage() {
  const [departmentId, setDepartmentId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate against a government directory
    console.log('Authenticating Dept ID:', departmentId);
    // On success, redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container py-12 flex items-center justify-center">
        <Card className="w-full max-w-md bg-card/40 border-border/30">
          <CardHeader className="text-center">
             <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Government Official Login</CardTitle>
            <CardDescription>
              Authoritative access for registered departments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="department-id">Government / Department ID</Label>
                <Input
                  id="department-id"
                  type="text"
                  placeholder="Enter your official ID"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Secure Login
              </Button>
            </form>
             <p className="mt-6 text-xs text-center text-muted-foreground">
                This is a restricted-access portal. All activities are monitored.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
