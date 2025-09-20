import AppLayout from "@/components/app-layout";
import ProfileForm from "@/components/profile/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userProfile } from "@/lib/data";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Manage your business details, contact information, and material preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm profile={userProfile} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
