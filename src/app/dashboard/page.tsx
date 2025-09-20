import AppLayout from '@/components/app-layout';
import ImpactMetrics from '@/components/dashboard/impact-metrics';
import { ListingsOverview } from '@/components/dashboard/listings-overview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/listings/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Listing
              </Link>
            </Button>
          </div>
        </div>
        
        <ImpactMetrics />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Listings</CardTitle>
              <CardDescription>
                An overview of the latest materials offered and requested.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ListingsOverview />
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
             <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
               <CardDescription>
                Get started with common tasks.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
               <Button variant="outline" asChild>
                <Link href="/profile">Update Your Profile</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/listings">Browse All Listings</Link>
              </Button>
               <Button variant="outline" asChild>
                <Link href="/messages">Check Your Messages</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
