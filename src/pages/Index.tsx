
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Clock, Shield, Star, Phone, MapPin, Users, Briefcase, Building2, Plane } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Capel Sound Taxi Service
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Professional, reliable taxi and transport services across the Mornington Peninsula
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                <Link to="/booking">Book Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                <a href="tel:0411000000">Call 0411 000 000</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="bg-yellow-500 text-black py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">24/7 Service: 0411 000 000</span>
            </div>
            <div className="hidden md:block">|</div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Serving Mornington Peninsula</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Car className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Local Taxi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Door-to-door service across the Peninsula with GPS tracking</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Plane className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Airport Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Reliable transfers to Melbourne airports with flight monitoring</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Briefcase className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Corporate Travel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Professional business transportation with account billing</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Group Transport</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Multi-passenger vehicles for events and group outings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Special Offers</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-yellow-500">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-600">New Customer Discount</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">Get 10% off your first ride when you book online</p>
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Link to="/booking">Claim Your Discount</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Capel Sound Taxi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">Available around the clock for all your transportation needs</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">Fully licensed drivers and comprehensive insurance coverage</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Drivers</h3>
              <p className="text-gray-600">Experienced drivers with local knowledge and excellent service</p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Knowledge</h3>
              <p className="text-gray-600">Expert knowledge of Mornington Peninsula roads and destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Service Areas</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg text-gray-600 mb-8">
              We proudly serve the entire Mornington Peninsula, including:
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">Capel Sound</div>
              <div className="p-3 bg-blue-50 rounded-lg">Rosebud</div>
              <div className="p-3 bg-blue-50 rounded-lg">Rye</div>
              <div className="p-3 bg-blue-50 rounded-lg">Sorrento</div>
              <div className="p-3 bg-blue-50 rounded-lg">Portsea</div>
              <div className="p-3 bg-blue-50 rounded-lg">Dromana</div>
              <div className="p-3 bg-blue-50 rounded-lg">Safety Beach</div>
              <div className="p-3 bg-blue-50 rounded-lg">McCrae</div>
              <div className="p-3 bg-blue-50 rounded-lg">Mount Martha</div>
              <div className="p-3 bg-blue-50 rounded-lg">Mornington</div>
              <div className="p-3 bg-blue-50 rounded-lg">Mount Eliza</div>
              <div className="p-3 bg-blue-50 rounded-lg">Frankston</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Book Your Ride?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Call us now or book online for fast, reliable service
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-2 text-lg">
                <Phone className="h-6 w-6" />
                <span className="font-semibold">0411 000 000</span>
              </div>
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link to="/booking">Book Online</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
