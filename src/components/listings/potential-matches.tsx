import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { listings } from "@/lib/data";
import type { MaterialListing } from "@/lib/definitions";
import ListingCard from "./listing-card";

export default function PotentialMatches({ currentListing }: { currentListing: MaterialListing }) {
    
    // Simple matching logic: find listings of the opposite type with at least one shared category
    const matches = listings.filter(l => {
        if (l.id === currentListing.id) return false;
        if (l.type === currentListing.type) return false;
        
        const hasCommonCategory = l.material.categories.some(cat => currentListing.material.categories.includes(cat));
        return hasCommonCategory;
    }).slice(0, 3); // Show top 3 matches

    if (matches.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Potential Matches</CardTitle>
                <CardDescription>
                    Here are some listings that might be a good match for yours.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {matches.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
