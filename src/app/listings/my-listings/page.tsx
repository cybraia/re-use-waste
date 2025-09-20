import AppLayout from '@/components/app-layout';
import ListingCard from '@/components/listings/listing-card';
import { listings } from '@/lib/data';
import { userProfile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function MyListingsPage() {
  const myListings = listings.filter(listing => listing.companyId === userProfile.id);

  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/listings/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Listing
              </Link>
            </Button>
          </div>
        </div>
        
        {myListings.length > 0 ? (
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-semibold">You haven't created any listings yet.</p>
            <p>Get started by creating a new listing.</p>
             <Button asChild className="mt-4">
              <Link href="/listings/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Listing
              </Link>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
