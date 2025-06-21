import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-yellow-400">Services</span></h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Professional taxi services across the Mornington Peninsula. Whatever your transportation needs, we're here to help.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
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
                <h3 className="text-xl font-bold text-gray-800 mb-3">Airport Transfers</h3>
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
                <h3 className="text-xl font-bold text-gray-800 mb-3">Corporate Travel</h3>
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
                <h3 className="text-xl font-bold text-gray-800 mb-3">Hotel Transfers</h3>
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

            {/* Weddings */}
            <Card className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/466e3b7c-0b27-4a8c-b97a-d29ec08f3b47.png" 
                  alt="Wedding transportation service"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Weddings</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Make your special day perfect with our elegant and reliable transportation service. Elegant vehicles and professional service for your wedding day.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Wedding packages
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Decorated vehicles
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Bridal party transport
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Event coordination
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Wine Tours */}
            <Card className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/2af54b00-8ec9-4d76-9e2c-13f943f72fe2.png" 
                  alt="Wine tour service"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Wine Tours</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore the beautiful Mornington Peninsula wineries safely and comfortably. Let us be your designated driver for the perfect wine tasting experience.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Winery visits
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Half day trips
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Local knowledge
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Group packages
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Medical Appointments */}
            <Card className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/fa0f2f05-0125-433c-8c8a-8c8fa138b421.png" 
                  alt="Medical appointment transport"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Medical Appointments</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Safe and comfortable transport to medical appointments and hospitals. We prioritize the comfort of people for healthcare visits.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Wheelchair accessible
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Gentle driving
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Appointment scheduling
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />
                    Insurance coordination
                  </li>
                </ul>
                <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ready to Book Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Book Your Ride?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today or book online for fast, reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4">
              <Link to="/booking">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4">
              <a href="tel:+61408202034">Call +61 408 202 034</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
