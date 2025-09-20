'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getCategoriesForDescription } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Loader2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { WasteCategory } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const initialState = {
  message: '',
  categories: [],
  errors: {},
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}

export function ListingForm() {
  const [state, formAction] = useFormState(getCategoriesForDescription, initialState);
  const [selectedCategories, setSelectedCategories] = useState<WasteCategory[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message === 'Success' && state.categories.length > 0) {
      const newCategories = state.categories.filter(cat => !selectedCategories.includes(cat));
      setSelectedCategories(prev => [...prev, ...newCategories]);
    }
  }, [state.categories, state.message]);
  
  const handleRemoveCategory = (categoryToRemove: WasteCategory) => {
    setSelectedCategories(selectedCategories.filter(category => category !== categoryToRemove));
  };
  
  const handleFinalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically gather all form data and send to a final creation endpoint
    toast({
        title: "Listing Created!",
        description: "Your new material listing has been successfully created.",
    });
    router.push('/listings');
  };

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label>Listing Type</Label>
        <RadioGroup defaultValue="offer" className="flex gap-4">
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
        <Input id="name" placeholder="e.g., Scrap Copper Wire, Oak Pallets" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the material, its condition, and any other relevant details. Our AI will suggest categories based on this."
          className="min-h-[120px]"
        />
        {state.errors?.description && (
          <p className="text-sm text-destructive">{state.errors.description[0]}</p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <Button type="button" variant="outline" formAction={formAction}>
            <Sparkles className="mr-2 h-4 w-4" />
            Suggest Categories with AI
        </Button>
      </div>

      {selectedCategories.length > 0 && (
        <div className="space-y-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input id="quantity" type="number" placeholder="e.g., 100" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select name="unit">
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
        <Input id="location" placeholder="e.g., City, State, Country" />
      </div>

      <Button type="submit" className="w-full">
        Create Listing
      </Button>
    </form>
  );
}
