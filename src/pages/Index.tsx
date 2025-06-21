
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Shield, Car, Phone, Star, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with City Traffic Background */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/lovable-uploads/d293782e-907f-46c2-896b-0ef786a12d85.png')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Reliable Taxi Service on the{" "}
              <span className="text-yellow-400">Mornington Peninsula</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Professional, punctual, and affordable taxi service available 24/7. Book your ride today 
              and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 text-lg rounded-lg">
                <Link to="/booking">Book Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-lg">
                <a href="tel:+61408202034">
                  <Phone className="h-5 w-5 mr-2" />
                  +61 408 202 034
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Capelsound Taxi Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Why Choose Capelsound Taxi?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional service with these key benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-4">24/7 Service</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Available round the clock, every day of the year. No matter when you need us, we're here.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-4">Licensed & Insured</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-lg leading-relaxed">
                  All our drivers are fully licensed and our vehicles are comprehensively insured for your safety.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="h-10 w-10 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-4">Modern Fleet</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Clean, comfortable, and well-maintained vehicles to ensure a pleasant journey every time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Fleet Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-yellow-400">Fleet</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern vehicles to suit every transportation need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src="/lovable-uploads/ada7f635-6c64-4449-a05e-5e9e4c9a9ef4.png" 
                  alt="Sedan"
                  className="h-full w-full object-contain"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">SEDAN</CardTitle>
                <CardDescription className="text-gray-600">1-4 Passengers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Comfortable and economical choice for standard trips</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src="/lovable-uploads/25d6e567-58a2-4884-94e4-e967d0d3d02a.png" 
                  alt="SUV"
                  className="h-full w-full object-contain"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">SUV</CardTitle>
                <CardDescription className="text-gray-600">1-4 Passengers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Spacious and comfortable for families with extra luggage</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src="/lovable-uploads/db90f5df-7275-40c4-83b4-5ba0247c56ec.png" 
                  alt="Maxi Taxi"
                  className="h-full w-full object-contain"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">MAXI-TAXI</CardTitle>
                <CardDescription className="text-gray-600">1-11 Passengers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Perfect for larger groups and airport transfers</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4">
              <Link to="/fleet">View Full Fleet Details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive taxi services for all your transportation needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center p-4">
                <img 
                  src="/lovable-uploads/25d6e567-58a2-4884-94e4-e967d0d3d02a.png" 
                  alt="Airport Transfers"
                  className="h-32 w-auto object-contain opacity-80"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  Airport Transfers
                </CardTitle>
                <CardDescription>Reliable transport to and from Melbourne Airport, Avalon Airport, and other regional airports.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <div className="h-48 bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center p-4">
                <img 
                  src="/lovable-uploads/ada7f635-6c64-4449-a05e-5e9e4c9a9ef4.png" 
                  alt="Corporate Travel"
                  className="h-32 w-auto object-contain opacity-80"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Users className="h-5 w-5 text-yellow-400 mr-2" />
                  Corporate Travel
                </CardTitle>
                <CardDescription>Professional transportation for business meetings, conferences, and corporate events.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <div className="h-48 bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center p-4">
                <img 
                  src="/lovable-uploads/5172dff6-8013-4dc3-ab7c-f2dc11dec705.png" 
                  alt="Hotel Transfers"
                  className="h-32 w-auto object-contain opacity-80"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  Hotel Transfers
                </CardTitle>
                <CardDescription>Seamless transfers between hotels, airports, and other destinations.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Book Your Ride?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Call us now or book online for quick, reliable, and professional taxi service across the Mornington Peninsula.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 text-lg">
              <Link to="/booking">Book Online Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              <a href="tel:+61408202034">
                <Phone className="h-5 w-5 mr-2" />
                Call +61 408 202 034
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
