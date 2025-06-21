
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Shield, Heart, Clock, Award, User, Luggage, Check } from "lucide-react";

const Fleet = () => {
  const vehicles = [
    {
      type: "SEDAN",
      capacity: "1-4",
      image: "/lovable-uploads/ada7f635-6c64-4449-a05e-5e9e4c9a9ef4.png",
      features: ["Air conditioning", "GPS tracking", "EFTPOS available", "Professional driver"],
      description: "Comfortable and economical choice for up to 4 passengers with standard luggage.",
      luggage: "Standard"
    },
    {
      type: "SUV", 
      capacity: "1-6",
      image: "/lovable-uploads/25d6e567-58a2-4884-94e4-e967d0d3d02a.png",
      features: ["Premium comfort", "Professional service", "Business amenities", "Group seating"],
      description: "Luxurious SUV designed with premium comfort for business and leisure travel.",
      luggage: "Large"
    },
    {
      type: "MAXI TAXI",
      capacity: "1-8",
      image: "/lovable-uploads/db90f5df-7275-40c4-83b4-5ba0247c56ec.png",
      features: ["Group seating", "Extra luggage space", "Event transportation", "Competitive group rates"],
      description: "Large capacity vehicle when you need space for groups and events.",
      luggage: "Extra Large"
    },
    {
      type: "WAGON",
      capacity: "1-8",
      image: "/lovable-uploads/706aa5eb-a40b-4504-9c4c-ed55d1012046.png",
      features: ["Spacious interior", "Family friendly", "Luggage capacity", "Comfortable seating"],
      description: "Ideal choice for long drives with reliable luggage capacity for medium size groups.",
      luggage: "Large"
    },
    {
      type: "ACCESSIBLE TAXI",
      capacity: "1-4",
      image: "/lovable-uploads/9dba1764-3239-4966-a231-e277fe144a76.png",
      features: ["Wheelchair access", "Medical equipment space", "Trained drivers", "Insurance billing"],
      description: "Wheelchair accessible comfortable transportation for all adventures.",
      luggage: "Standard"
    },
    {
      type: "PARCEL DELIVERY",
      capacity: "Goods",
      image: "/lovable-uploads/706aa5eb-a40b-4504-9c4c-ed55d1012046.png",
      features: ["Secure transport", "Fast delivery", "Parcel tracking", "Professional handling"],
      description: "Exclusive fast & professional delivery for goods worldwide.",
      luggage: "Cargo"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
            <p className="text-xl text-gray-300">
              Modern, well-maintained vehicles to suit every transportation need. All our vehicles are regularly serviced and equipped with the latest safety features.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-white border border-gray-200">
                <CardHeader className="text-center pb-4">
                  <div className="mb-4">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.type}
                      className="w-full h-48 object-contain mx-auto"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">{vehicle.type}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {vehicle.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Passengers and Luggage Info with icons */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <User className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <div className="font-semibold text-sm text-gray-800">Passengers</div>
                      <div className="text-sm text-gray-600">{vehicle.capacity}</div>
                    </div>
                    <div className="text-center">
                      <Luggage className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <div className="font-semibold text-sm text-gray-800">Luggage</div>
                      <div className="text-sm text-gray-600">{vehicle.luggage}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-800 mb-3">Features:</h4>
                    <div className="space-y-2">
                      {vehicle.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Policies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Booking Policies</h2>
          <p className="text-center text-gray-600 mb-12">
            Important information about our booking and cancellation policies
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Pre-Booking Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Pre-Booking Information</h3>
              
              {/* Highlighted Pre-Book Fee */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="font-semibold text-gray-800 mb-1">Pre-Book Fee: $2.70</div>
                <div className="text-sm text-gray-600">Applied to all advance bookings</div>
              </div>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">24-hour advance booking recommended</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Airport pickups include waiting time</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Group bookings require 48-hour notice</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Confirmation within 30 minutes</span>
                </li>
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Cancellation Policy</h3>
              
              {/* Important Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="font-semibold text-red-800 mb-1">Important Notice</div>
                <div className="text-sm text-red-700">No cancellation allowed 2 hours before departure time</div>
              </div>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Free cancellation up to 2 hours before pickup</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">After 2 hours: full charge applies</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">No-show bookings will be charged in full</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Changes subject to availability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Standards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Our Fleet Standards</h2>
          <p className="text-center text-gray-600 mb-12">
            Every vehicle in our fleet meets the highest standards of safety, comfort, and reliability.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Regular Maintenance</h3>
              <p className="text-gray-600 text-sm">All vehicles undergo regular safety inspections and maintenance.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Clean & Comfortable</h3>
              <p className="text-gray-600 text-sm">Interior and exterior cleaned before every trip.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">GPS Equipped</h3>
              <p className="text-gray-600 text-sm">Real-time tracking and optimal route planning.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Licensed Drivers</h3>
              <p className="text-gray-600 text-sm">Professional, licensed, and experienced drivers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Experience Our Service?</h2>
          <p className="text-xl mb-8 text-gray-600">
            Book your ride today and experience the comfort and reliability of our professional fleet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/booking" 
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition-colors"
            >
              Book Your Ride
            </a>
            <a 
              href="tel:+61408202034" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold rounded-md transition-colors"
            >
              Call +61 408 202 034
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
