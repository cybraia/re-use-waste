import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MaterialListing } from '@/lib/definitions';
import { businesses } from '@/lib/data';
import { MapPin } from 'lucide-react';

export default function ListingCard({ listing }: { listing: MaterialListing }) {
  const business = businesses.find(b => b.id === listing.companyId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/listings/${listing.id}`} className="block">
          <div className="relative aspect-video w-full">
            <Image
              src={listing.material.image}
              alt={listing.material.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint="waste material"
            />
             <Badge variant={listing.type === 'offer' ? 'default' : 'secondary'} className="capitalize absolute top-2 right-2">
                {listing.type}
              </Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
            {listing.material.categories.slice(0, 2).map(cat => (
                <Badge key={cat} variant="outline" className="text-xs">{cat}</Badge>
            ))}
        </div>
        <Link href={`/listings/${listing.id}`} className="block">
            <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors truncate">
              {listing.material.name}
            </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {listing.material.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <p className="font-semibold truncate">{business?.name || 'Unknown'}</p>
            <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3"/>
                <span className="truncate">{listing.location}</span>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
