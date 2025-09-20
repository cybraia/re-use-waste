'use client';

import { useActionState, useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
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
import type { WasteCategory } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const initialState = {
  message: '',
  categories: [],
  errors: {},
};

function AIActions() {
  const { pending } = useFormStatus();
  return (
    <>
      <Button type="submit" variant="outline" disabled={pending} name="intent" value="suggest">
        {pending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Suggest Categories with AI
      </Button>
    </>
  );
}

export function ListingForm() {
  const [state, formAction] = useActionState(getCategoriesForDescription, initialState);
  const [selectedCategories, setSelectedCategories] = useState<WasteCategory[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message === 'Success' && state.categories.length > 0) {
      const newCategories = state.categories.filter(cat => !selectedCategories.includes(cat));
      setSelectedCategories(prev => [...prev, ...newCategories]);
    }
  }, [state]);
  
  const handleRemoveCategory = (categoryToRemove: WasteCategory) => {
    setSelectedCategories(selectedCategories.filter(category => category !== categoryToRemove));
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const intent = (formData.get('intent') as string) || 'create';

    if (intent === 'create') {
        event.preventDefault();
        // Here you would typically gather all form data and send to a final creation endpoint
        toast({
            title: "Listing Created!",
            description: "Your new material listing has been successfully created.",
        });
        router.push('/listings');
    }
    // For 'suggest', the form will submit normally to the server action
  };

  return (
    <form action={formAction} onSubmit={handleFormSubmit} className="space-y-8">
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
        <Input id="name" name="name" placeholder="e.g., Scrap Copper Wire, Oak Pallets" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input id="quantity" name="quantity" type="number" placeholder="e.g., 100" />
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
        <Input id="location" name="location" placeholder="e.g., City, State, Country" />
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
          {state.errors?.description && (
            <p className="text-sm text-destructive">{state.errors.description[0]}</p>
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
               <AIActions />
           </div>
        </div>
      </div>
      
      <div className="border-t pt-8">
        <Button type="submit" className="w-full" name="intent" value="create">
          Create Listing
        </Button>
      </div>
    </form>
  );
}
