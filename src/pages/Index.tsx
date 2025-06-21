
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Taxi Service on the{" "}
              <span className="text-yellow-400">Mornington Peninsula</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Reliable, safe, and comfortable transportation available 24/7. 
              Book your ride today and experience premium service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 text-lg">
                <Link to="/booking">Book Your Ride Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                <a href="tel:+61408202034">
                  <Phone className="h-5 w-5 mr-2" />
                  +61 408 202 034
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-lg">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">5★</div>
                <div className="text-lg">Rated Service</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">100+</div>
                <div className="text-lg">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Why Choose Capelsound Taxi?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional transportation services with a commitment to safety, reliability, and customer satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">24/7 Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Round-the-clock availability for all your transportation needs, any time of day or night.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Licensed & Insured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fully licensed drivers and comprehensive insurance coverage for your complete peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Modern Fleet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Clean, comfortable, and well-maintained vehicles equipped with modern safety features.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">5-Star Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Professional drivers committed to providing exceptional customer service on every trip.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional transportation solutions for every need across the Mornington Peninsula
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                <Car className="h-16 w-16 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Local Taxi Service</CardTitle>
                <CardDescription>Point-to-point transportation across the peninsula</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Door-to-door service</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />GPS tracking</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Professional drivers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <div className="h-48 bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center">
                <Users className="h-16 w-16 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Airport Transfers</CardTitle>
                <CardDescription>Reliable transport to Melbourne airports</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Flight monitoring</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Meet & greet service</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Fixed rate pricing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
              <div className="h-48 bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center">
                <Shield className="h-16 w-16 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Corporate Travel</CardTitle>
                <CardDescription>Professional business transportation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Executive vehicles</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Account billing</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Corporate rates</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
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
