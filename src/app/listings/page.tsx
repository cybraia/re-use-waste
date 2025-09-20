import AppLayout from '@/components/app-layout';
import ListingCard from '@/components/listings/listing-card';
import { listings } from '@/lib/data';
import ListingFilters from '@/components/listings/listing-filters';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function ListingsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
  };
}) {
  const query = searchParams?.query || '';
  const category = searchParams?.category || 'All';

  const filteredListings = listings.filter(listing => {
    const matchesCategory = category === 'All' || listing.material.categories.includes(category as any);
    const matchesQuery = listing.material.name.toLowerCase().includes(query.toLowerCase()) || listing.material.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Material Listings</h1>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/listings/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Listing
              </Link>
            </Button>
          </div>
        </div>
        <ListingFilters />
        
        {filteredListings.length > 0 ? (
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-semibold">No listings found.</p>
            <p>Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
