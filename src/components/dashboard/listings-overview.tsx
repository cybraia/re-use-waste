import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { listings, businesses } from "@/lib/data";

export function ListingsOverview() {
  const recentListings = listings.slice(0, 5);

  const getBusiness = (companyId: string) => {
    return businesses.find(b => b.id === companyId);
  }

  return (
    <div className="space-y-8">
      {recentListings.map((listing) => {
        const business = getBusiness(listing.companyId);
        return (
          <div key={listing.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={business?.avatar} alt="Avatar" />
              <AvatarFallback>{business?.name.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{listing.material.name}</p>
              <p className="text-sm text-muted-foreground">{business?.name || 'Unknown Company'}</p>
            </div>
            <div className="ml-auto font-medium">
              <Badge variant={listing.type === 'offer' ? 'default' : 'secondary'} className="capitalize">
                {listing.type}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
