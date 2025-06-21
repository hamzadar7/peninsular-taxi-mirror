
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Shield, Car, Phone, Star, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <head>
        <title>Capel Sound Taxi - Reliable Taxi Service on Mornington Peninsula | 24/7 Available</title>
        <meta name="description" content="Professional taxi service on Mornington Peninsula. Airport transfers, corporate travel, hotel transfers. Available 24/7. Call +61 408 202 034 or book online." />
        <meta name="keywords" content="taxi Mornington Peninsula, Capel Sound taxi, airport transfers, corporate travel, hotel transfers, taxi service Victoria, 24/7 taxi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Capel Sound Taxi - Reliable Taxi Service on Mornington Peninsula" />
        <meta property="og:description" content="Professional, punctual, and affordable taxi service available 24/7 on the Mornington Peninsula." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://capelsoundtaxi.com" />
      </head>

      {/* Hero Section with City Traffic Background */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/lovable-uploads/c8034d15-0c26-4bcb-ae33-b4612255300f.png')`
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our <span className="text-yellow-400">Services</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive taxi services for all your transportation needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Airport Transfers */}
            <Card className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/846b74e9-ba7a-444b-84eb-c1e6dc7bbadb.png" 
                  alt="Airport transfer service"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  Airport Transfers
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Reliable and comfortable transfers to and from Melbourne airports. Our professional drivers ensure you arrive on time for your flights.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Flight monitoring
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Meet & greet service
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Luggage assistance
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Fixed pricing
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Corporate Travel */}
            <Card className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/9325ff52-d502-4894-811a-7b1eca0eb72f.png" 
                  alt="Corporate travel service"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <Users className="h-5 w-5 text-yellow-400 mr-2" />
                  Corporate Travel
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Professional transportation solutions for business clients, with executive accounts available with monthly billing options.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Executive accounts
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Monthly billing
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Business with style
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Priority booking
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Hotel Transfers */}
            <Card className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/5c434fcc-5b4a-4dfd-99eb-be1072d4c71e.png" 
                  alt="Hotel transfer service"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  Hotel Transfers
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Seamless transfers between hotels, airports, and other destinations. Let your accommodation change plans flow smoothly.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Door to door service
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Luggage handling
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Hotel coordination
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Local bookings
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Payment Methods</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We accept multiple payment methods for your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img 
                    src="/lovable-uploads/e53452ae-5660-4c00-aa4a-ef8355711874.png" 
                    alt="Cab Charge"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">Cab Charge</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  Professional taxi voucher system
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img 
                    src="/lovable-uploads/ff41b36f-b25f-4bbc-ba58-002437e858dd.png" 
                    alt="EFTPOS"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">EFTPOS</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  Electronic payment terminal available in all vehicles
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img 
                    src="/lovable-uploads/b2d348c8-6274-4e50-b17b-d6b33e1d7265.png" 
                    alt="Visa Mastercard"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">Credit & Debit</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  All major credit and debit cards accepted
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <CardHeader className="pb-4">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img 
                    src="/lovable-uploads/44b8aba6-5bbb-44c3-8404-5a0aced4318d.png" 
                    alt="Motor Pass"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">Motor Pass</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  Convenient payment solution
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Trusted Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with leading organizations to serve you better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <div className="h-24 flex items-center justify-center mb-6">
                  <img 
                    src="/lovable-uploads/35917797-eeda-4d67-909b-d62d517ea074.png" 
                    alt="TAC Partner"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-4">TAC Partner</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Authorized partner with Transport Accident Commission for medical transport services
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <div className="h-24 flex items-center justify-center mb-6">
                  <img 
                    src="/lovable-uploads/6986d0af-dc1d-437a-a921-78b8beaa0c5a.png" 
                    alt="WorkSafe Provider"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-4">WorkSafe Provider</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Approved provider for WorkSafe Victoria transportation services
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <div className="h-24 flex items-center justify-center mb-6">
                  <img 
                    src="/lovable-uploads/64dbbb09-9d78-4b7b-9f01-f3b93e6c420a.png" 
                    alt="Safe Transport Victoria"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-4">Safe Transport Victoria</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Committed to safe and reliable transport services across Victoria
                </p>
              </CardContent>
            </Card>
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
