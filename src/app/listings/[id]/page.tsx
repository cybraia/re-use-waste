import AppLayout from "@/components/app-layout";
import { listings, businesses } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Building, MapPin, Scale, Tag } from "lucide-react";
import PotentialMatches from "@/components/listings/potential-matches";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = listings.find(l => l.id === params.id);
  
  if (!listing) {
    notFound();
  }

  const business = businesses.find(b => b.id === listing.companyId);

  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="mb-4">
          <Button variant="outline" asChild>
            <Link href="/listings">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={listing.material.image}
                    alt={listing.material.name}
                    fill
                    className="object-cover"
                    data-ai-hint="waste material"
                  />
                </div>
                <div className="p-6">
                  <Badge variant={listing.type === 'offer' ? 'default' : 'secondary'} className="capitalize mb-2">{listing.type}</Badge>
                  <h1 className="text-3xl font-bold mb-2">{listing.material.name}</h1>
                  <p className="text-muted-foreground">{listing.material.description}</p>
                </div>
              </CardContent>
            </Card>

            <PotentialMatches currentListing={listing} />

          </div>
          <div className="space-y-6">
             <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-muted-foreground" />
                  <span>Quantity: {listing.quantity.value} {listing.quantity.unit}</span>
                </div>
                <div className="flex items-start gap-2">
                   <Tag className="h-4 w-4 text-muted-foreground mt-1" />
                   <div>
                     <span className="font-medium">Categories:</span>
                     <div className="flex flex-wrap gap-2 mt-1">
                       {listing.material.categories.map(cat => (
                         <Badge key={cat} variant="outline">{cat}</Badge>
                       ))}
                     </div>
                   </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>About the Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                 <div className="flex items-center gap-2">
                   <Building className="h-4 w-4 text-muted-foreground" />
                   <span>{business?.name || 'Unknown Company'}</span>
                </div>
                <div className="flex items-center gap-2">
                   <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{listing.location}</span>
                </div>
                 <Button className="w-full" asChild>
                  <Link href={`/messages/c1`}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Message Company
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
