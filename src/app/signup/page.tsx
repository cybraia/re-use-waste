import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RecycleIcon } from '@/components/icons';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="space-y-1 text-center">
           <Link href="/" className="inline-block bg-primary text-primary-foreground rounded-lg p-3 mx-auto">
            <RecycleIcon className="h-8 w-8" />
          </Link>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Join our community to start trading waste materials.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Your Company Inc." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button asChild type="submit" className="w-full">
              <Link href="/dashboard">Create Account</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline" prefetch={false}>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
