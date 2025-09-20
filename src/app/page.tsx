import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecycleIcon } from '@/components/icons';
import { ArrowRight, Leaf, Truck, Users } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background px-10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <RecycleIcon className="h-6 w-6 text-primary" />
            <span className="text-lg">EcoSwap</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Turn Your Waste into Value
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
              EcoSwap is the leading marketplace for businesses to connect, trade, and transform waste materials into valuable resources.
            </p>
            <Button size="lg" asChild>
              <Link href="/login">
                Explore Listings <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why Choose EcoSwap?</h2>
              <p className="text-muted-foreground">Unlock economic and environmental benefits.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Reduce Landfill</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Divert waste from landfills by finding new life for your materials. Contribute to a circular economy and enhance your sustainability profile.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Discover Resources</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Source raw materials affordably by connecting with businesses that produce the 'waste' you need. Lower costs and create innovative products.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                   <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Build Connections</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Join a growing network of eco-conscious companies. Forge partnerships, share insights, and collaborate on sustainable initiatives.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full py-24">
            <div className="container grid md:grid-cols-2 gap-12 items-center px-4 md:px-6">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Simple, Efficient, and Impactful</h2>
                    <ol className="space-y-6">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">1</div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">List Your Materials</h3>
                                <p className="text-muted-foreground">Easily create a listing for waste you produce or materials you need. Our AI helps you categorize it instantly.</p>
                            </div>
                        </li>
                         <li className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">2</div>
                             <div className="flex-1">
                                <h3 className="font-semibold text-lg">Find a Match</h3>
                                <p className="text-muted-foreground">Our platform intelligently matches your listings with potential partners, making connections seamless.</p>
                            </div>
                        </li>
                         <li className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">3</div>
                             <div className="flex-1">
                                <h3 className="font-semibold text-lg">Transact Securely</h3>
                                <p className="text-muted-foreground">Communicate and finalize the exchange directly through our secure messaging system.</p>
                            </div>
                        </li>
                    </ol>
                </div>
                <div className="relative aspect-square">
                    <Image src="https://picsum.photos/seed/factory/800/800" alt="Industrial recycling process" fill className="object-cover rounded-lg shadow-lg" data-ai-hint="industrial factory" />
                </div>
            </div>
        </section>
      </main>
      <footer className="bg-muted/40 border-t">
        <div className="container py-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; 2024 EcoSwap. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">Privacy Policy</Link>
            <Link href="#" className="text-sm hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
