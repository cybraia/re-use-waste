'use client';

import { useActionState, useState, useEffect, useRef, useTransition } from 'react';
import { getCategoriesForDescription, createListing } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Loader2, X } from 'lucide-react';
import type { WasteCategory } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type ErrorState = {
  description?: string[];
};

const initialGetCategoriesState: {
  message: string;
  categories: WasteCategory[];
  errors: ErrorState;
} = {
  message: '',
  categories: [],
  errors: { description: [] },
};


export function ListingForm() {
  const [getCategoriesState, getCategoriesAction] = useActionState(getCategoriesForDescription, initialGetCategoriesState);
  const [selectedCategories, setSelectedCategories] = useState<WasteCategory[]>([]);
  const [isSuggesting, startSuggestingTransition] = useTransition();
  const [isCreating, startCreatingTransition] = useTransition();

  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const descriptionError = getCategoriesState.errors?.description?.[0];


  useEffect(() => {
    if (getCategoriesState.message === 'Success' && getCategoriesState.categories.length > 0) {
      const newCategories = getCategoriesState.categories.filter(cat => !selectedCategories.includes(cat));
      setSelectedCategories(prev => [...prev, ...newCategories]);
    }
  }, [getCategoriesState, selectedCategories]);
  
  const handleRemoveCategory = (categoryToRemove: WasteCategory) => {
    setSelectedCategories(selectedCategories.filter(category => category !== categoryToRemove));
  };

  const handleSuggestClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      startSuggestingTransition(() => {
        getCategoriesAction(formData);
      });
    }
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    selectedCategories.forEach(cat => formData.append('categories[]', cat));

    startCreatingTransition(async () => {
      const result = await createListing(formData);
      if (result.message === 'Listing created successfully!') {
        toast({
          title: "Listing Created!",
          description: "Your new material listing has been successfully created.",
        });
        router.push('/listings/my-listings');
      } else {
        // Handle errors, e.g., show a toast
        console.error("Failed to create listing:", result.errors);
         toast({
          title: "Error",
          description: "Could not create the listing. Please check the form.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label>Listing Type</Label>
        <RadioGroup defaultValue="offer" name="type" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="offer" id="offer" />
            <Label htmlFor="offer">I&apos;m offering materials</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="request" id="request" />
            <Label htmlFor="request">I&apos;m requesting materials</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Material Name</Label>
        <Input id="name" name="name" placeholder="e.g., Scrap Copper Wire, Oak Pallets" required/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input id="quantity" name="quantity" type="number" placeholder="e.g., 100" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select name="unit" defaultValue="kg" required>
            <SelectTrigger id="unit">
              <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilograms (kg)</SelectItem>
              <SelectItem value="ton">Tons</SelectItem>
              <SelectItem value="items">Items</SelectItem>
              <SelectItem value="m³">Cubic Meters (m³)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" placeholder="e.g., City, State, Country" required />
      </div>

      <div className="space-y-4 border-t pt-8">
        <div className="space-y-2">
          <Label htmlFor="description">Description for AI Categorization</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the material, its condition, and any other relevant details. Our AI will suggest categories based on this."
            className="min-h-[120px]"
          />
        {descriptionError && (
            <p className="text-sm text-destructive">
              {descriptionError}
            </p>
          )}
        </div>

        <div className="flex items-start justify-between flex-wrap gap-4">
            {selectedCategories.length > 0 && (
            <div className="space-y-2 flex-grow min-w-[200px]">
                <Label>Suggested Categories</Label>
                <Alert>
                    <AlertDescription className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-sm">
                            {category}
                            <button type="button" onClick={() => handleRemoveCategory(category)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                    </AlertDescription>
                </Alert>
            </div>
            )}
           <div className="flex items-center justify-end flex-grow">
               <Button type="button" variant="outline" disabled={isSuggesting} onClick={handleSuggestClick}>
                {isSuggesting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Suggest Categories
              </Button>
           </div>
        </div>
      </div>
      
      <div className="border-t pt-8">
        <Button type="submit" className="w-full" disabled={isCreating}>
           {isCreating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : "Create Listing"
           }
        </Button>
      </div>
    </form>
  );
}
