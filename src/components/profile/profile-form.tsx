'use client';
import type { BusinessProfile } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function ProfileForm({ profile }: { profile: BusinessProfile }) {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your company information has been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" type="button">Change Photo</Button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" defaultValue={profile.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" defaultValue={profile.industry} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" defaultValue={profile.location} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input id="email" type="email" defaultValue={profile.contact.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Contact Phone</Label>
          <Input id="phone" type="tel" defaultValue={profile.contact.phone} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="wasteProduced">Waste Materials Produced</Label>
        <Textarea id="wasteProduced" placeholder="e.g., Plastic, Wood, Scrap Metal" defaultValue={profile.wasteProduced.join(', ')} />
        <p className="text-sm text-muted-foreground">Separate materials with a comma.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="materialsNeeded">Materials Needed</Label>
        <Textarea id="materialsNeeded" placeholder="e.g., Cardboard, Glass Jars" defaultValue={profile.materialsNeeded.join(', ')} />
         <p className="text-sm text-muted-foreground">Separate materials with a comma.</p>
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}
