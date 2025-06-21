
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Users, Briefcase, Plane, Clock, Shield, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-blue-100">
              Professional transportation solutions for every need
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Local Taxi Service */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
                <Car className="h-16 w-16 text-blue-600" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Local Taxi Service</CardTitle>
                <CardDescription className="text-lg">
                  Point-to-point transportation across the Mornington Peninsula
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Door-to-door service</li>
                  <li>• Local area coverage</li>
                  <li>• Competitive rates</li>
                  <li>• Clean, comfortable vehicles</li>
                  <li>• GPS tracking for efficient routes</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/booking">Book Local Taxi</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Corporate Travel */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/192c9948-4e3a-4ee6-b4ac-809254656fef.png" 
                  alt="Corporate Travel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Corporate Travel</CardTitle>
                <CardDescription className="text-lg">
                  Professional business transportation and executive services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Executive vehicle fleet</li>
                  <li>• Airport transfers</li>
                  <li>• Meeting transportation</li>
                  <li>• Account billing available</li>
                  <li>• Professional, uniformed drivers</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/booking">Book Corporate Service</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Group Transportation */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center">
                <Users className="h-16 w-16 text-green-600" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Group Transportation</CardTitle>
                <CardDescription className="text-lg">
                  Comfortable transport for larger groups and special events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Multi-passenger vehicles</li>
                  <li>• Event transportation</li>
                  <li>• School and group outings</li>
                  <li>• Flexible scheduling</li>
                  <li>• Competitive group rates</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/booking">Book Group Transport</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Hotel Transfers */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/9579ded4-2a5c-4c10-8544-9b5c24639ace.png" 
                  alt="Hotel Transfers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Hotel Transfers</CardTitle>
                <CardDescription className="text-lg">
                  Reliable transfers to and from hotels and accommodations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Hotel pickup and drop-off</li>
                  <li>• Luggage assistance</li>
                  <li>• Tourist destination transfers</li>
                  <li>• Pre-arranged schedules</li>
                  <li>• Local tourism advice</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/booking">Book Hotel Transfer</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Hospital Transfers */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/47ad9818-0488-410e-b56e-32b8a14b9062.png" 
                  alt="Hospital Transfer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Hospital Transfers</CardTitle>
                <CardDescription className="text-lg">
                  Safe and comfortable medical transportation services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Wheelchair accessible vehicles</li>
                  <li>• Medical appointment transfers</li>
                  <li>• Hospital discharge assistance</li>
                  <li>• Trained, caring drivers</li>
                  <li>• Insurance billing support</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/booking">Book Medical Transfer</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Airport Transfers */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-purple-100 to-purple-50 flex items-center justify-center">
                <Plane className="h-16 w-16 text-purple-600" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Airport Transfers</CardTitle>
                <CardDescription className="text-lg">
                  Reliable transport to Melbourne airports and beyond
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Melbourne Airport (Tullamarine)</li>
                  <li>• Avalon Airport transfers</li>
                  <li>• Flight monitoring service</li>
                  <li>• Meet and greet service</li>
                  <li>• Fixed rate pricing</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/booking">Book Airport Transfer</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Round-the-clock service for all your transportation needs, day or night.</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">Fully licensed drivers and comprehensive insurance for your peace of mind.</p>
            </div>
            <div className="text-center">
              <Car className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Modern Fleet</h3>
              <p className="text-gray-600">Well-maintained, clean vehicles equipped with modern safety features.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Book?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the service that fits your needs and book your ride today
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link to="/booking">Book Your Service Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
