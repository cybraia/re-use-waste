import AppLayout from '@/components/app-layout';
import { ListingForm } from '@/components/listings/listing-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewListingPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Create a New Listing</CardTitle>
            <CardDescription>
              Fill out the details below to offer your waste materials or request materials you need.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ListingForm />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
