
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Clock, Shield, Star, Phone, MapPin, Calendar, Users, Briefcase, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
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
                <p className="text-gray-600">Quick and reliable local transportation across the Peninsula</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Briefcase className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Corporate Travel</CardTitle>
              </CardHeader>  
              <CardContent>
                <p className="text-gray-600">Professional business transportation and airport transfers</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Hotel Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Comfortable transfers to and from hotels and accommodations</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/47ad9818-0488-410e-b56e-32b8a14b9062.png" 
                    alt="Hospital Transfer" 
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <CardTitle>Hospital Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Safe and comfortable medical transportation with wheelchair access</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Capel Sound Taxi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">Available around the clock for all your transportation needs</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">Fully licensed drivers and comprehensive insurance coverage</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Experienced Drivers</h3>
              <p className="text-gray-600">Professional drivers with local knowledge and excellent service</p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Knowledge</h3>
              <p className="text-gray-600">Expert knowledge of Mornington Peninsula roads and destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Ready to Book Your Ride?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Call us now or book online for fast, reliable service
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-2 text-lg">
                <Phone className="h-6 w-6 text-blue-600" />
                <span className="font-semibold">0411 000 000</span>
              </div>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
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
