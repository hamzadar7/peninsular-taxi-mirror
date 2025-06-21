
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Shield, Car, CheckCircle, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Premium Transport Services</h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Professional transportation solutions for every need across the Mornington Peninsula
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Hotel Transfers */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/5c434fcc-5b4a-4dfd-99eb-be1072d4c71e.png" 
                  alt="Professional hotel transfer service with executive vehicle"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Hotel Transfers</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Luxury hotel pickup and drop-off services with professional chauffeurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Premium hotel partnerships</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Luggage assistance included</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Professional chauffeur service</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Executive vehicle fleet</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Local tourism advice</li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Hotel Transfer</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Corporate Travel */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/9325ff52-d502-4894-811a-7b1eca0eb72f.png" 
                  alt="Corporate executive transportation service"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Corporate Travel</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Professional business transportation and executive services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Executive vehicle fleet</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Professional, uniformed drivers</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Account billing available</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Meeting transportation</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Corporate rates & contracts</li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Corporate Service</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Medical Transfers */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/fa0f2f05-0125-433c-8c8a-8c8fa138b421.png" 
                  alt="Wheelchair accessible medical transport service"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Medical Appointments</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Safe and comfortable medical transportation with wheelchair accessibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Wheelchair accessible vehicles</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Medical appointment transfers</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Hospital discharge assistance</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Trained, caring drivers</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Insurance billing support</li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Medical Transfer</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Special Events & Winery Tours */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/2af54b00-8ec9-4d76-9e2c-13f943f72fe2.png" 
                  alt="Luxury transportation for winery tours and special events"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Winery Tours & Events</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Premium transportation for winery tours and special occasions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Peninsula winery tours</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Special event transportation</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Group booking discounts</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Local wine tour expertise</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Flexible scheduling</li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Tour Service</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Wedding Transportation */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/466e3b7c-0b27-4a8c-b97a-d29ec08f3b47.png" 
                  alt="Elegant wedding transportation service"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Wedding Transportation</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Elegant and reliable transportation for your special day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Luxury wedding vehicles</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Bridal party transportation</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Guest shuttle services</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Professional wedding coordination</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Special wedding packages</li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Wedding Service</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Airport Transfers */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/846b74e9-ba7a-444b-84eb-c1e6dc7bbadb.png" 
                  alt="Professional airport transfer service"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Airport Transfers</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Reliable transport to Melbourne airports and beyond
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Melbourne Airport (Tullamarine)</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Avalon Airport transfers</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Flight monitoring service</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Meet and greet service</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Fixed rate pricing</li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Airport Transfer</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">Why Choose Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Clock className="h-16 w-16 mx-auto text-yellow-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">24/7 Availability</h3>
              <p className="text-gray-600">Round-the-clock service for all your transportation needs, day or night.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Shield className="h-16 w-16 mx-auto text-yellow-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Licensed & Insured</h3>
              <p className="text-gray-600">Fully licensed drivers and comprehensive insurance for your peace of mind.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Car className="h-16 w-16 mx-auto text-yellow-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Modern Fleet</h3>
              <p className="text-gray-600">Well-maintained, clean vehicles equipped with modern safety features.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Star className="h-16 w-16 mx-auto text-yellow-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">5-Star Service</h3>
              <p className="text-gray-600">Professional drivers committed to exceptional customer service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Book?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Choose the service that fits your needs and book your ride today. Professional, reliable, and affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4">
              <Link to="/booking">Book Your Service Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4">
              <a href="tel:+61408202034">Call +61 408 202 034</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
