
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Shield, Car, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Yellow Bar */}
      <div className="bg-yellow-400 text-black py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="font-medium">+61 408 202 034</span>
          </div>
          <Button asChild size="sm" className="bg-black text-yellow-400 hover:bg-gray-800">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/lovable-uploads/c8034d15-0c26-4bcb-ae33-b4612255300f.png')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Reliable Taxi Service on the{" "}
            <span className="text-yellow-400">Mornington Peninsula</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Professional, punctual, and affordable taxi service available 24/7. Book your ride today 
            and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8">
              <Link to="/booking">Book Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8">
              <a href="tel:+61408202034">
                <Phone className="h-5 w-5 mr-2" />
                +61 408 202 034
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Capelsound Taxi Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Capelsound Taxi?</h2>
            <p className="text-lg text-gray-600">We provide exceptional service with these key benefits</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">24/7 Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Available round the clock, every day of the year. No matter when you need us, we're here.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">Licensed & Insured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All our drivers are fully licensed and our vehicles are comprehensively insured for your safety.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">Modern Fleet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Clean, comfortable, and well-maintained vehicles to ensure a pleasant journey every time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Fleet Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Fleet</h2>
            <p className="text-lg text-blue-600">Modern vehicles to suit every transportation need</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <img 
                  src="/lovable-uploads/2f3bb04b-fcf9-4d3e-9c30-5281b1c93698.png" 
                  alt="Sedan" 
                  className="w-full h-32 object-contain mb-4"
                />
                <CardTitle className="text-xl font-bold">SEDAN</CardTitle>
                <CardDescription className="text-blue-600">1-4 Passengers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Comfortable and economical choice for standard trips</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Book Now</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <img 
                  src="/lovable-uploads/2f3bb04b-fcf9-4d3e-9c30-5281b1c93698.png" 
                  alt="SUV" 
                  className="w-full h-32 object-contain mb-4"
                />
                <CardTitle className="text-xl font-bold">SUV</CardTitle>
                <CardDescription className="text-blue-600">1-4 Passengers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Spacious and comfortable for families with extra luggage</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Book Now</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <img 
                  src="/lovable-uploads/2f3bb04b-fcf9-4d3e-9c30-5281b1c93698.png" 
                  alt="Maxi-Taxi" 
                  className="w-full h-32 object-contain mb-4"
                />
                <CardTitle className="text-xl font-bold">MAXI-TAXI</CardTitle>
                <CardDescription className="text-blue-600">1-11 Passengers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Perfect for larger groups and airport transfers</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Book Now</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <img 
                  src="/lovable-uploads/2f3bb04b-fcf9-4d3e-9c30-5281b1c93698.png" 
                  alt="Wagon" 
                  className="w-full h-32 object-contain mb-4"
                />
                <CardTitle className="text-xl font-bold">WAGON</CardTitle>
                <CardDescription className="text-blue-600">1-4 Passengers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Ideal balance of passenger comfort and luggage capacity</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Book Now</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <img 
                  src="/lovable-uploads/2f3bb04b-fcf9-4d3e-9c30-5281b1c93698.png" 
                  alt="Accessible Taxi" 
                  className="w-full h-32 object-contain mb-4"
                />
                <CardTitle className="text-xl font-bold">ACCESSIBLE TAXI</CardTitle>
                <CardDescription className="text-blue-600">Wheelchair Accessible</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Specially designed for passengers with mobility needs</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Book Now</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <img 
                  src="/lovable-uploads/2f3bb04b-fcf9-4d3e-9c30-5281b1c93698.png" 
                  alt="Parcel Delivery" 
                  className="w-full h-32 object-contain mb-4"
                />
                <CardTitle className="text-xl font-bold">PARCEL DELIVERY</CardTitle>
                <CardDescription className="text-blue-600">Portable Items</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Items that are portable and fit in car</p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Book Now</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8">
              <Link to="/fleet">View Full Fleet Details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ready to Book Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book Your Ride?</h2>
          <p className="text-lg mb-8">Call us now or book online for a quick and reliable taxi service.</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8">
              <Link to="/booking">Book Online</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8">
              <a href="tel:+61408202034">
                <Phone className="h-5 w-5 mr-2" />
                +61 408 202 034
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
