
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Shield, Heart, Clock, Award } from "lucide-react";

const Fleet = () => {
  const vehicles = [
    {
      type: "SEDAN",
      capacity: "1-4 passengers",
      image: "/lovable-uploads/ada7f635-6c64-4449-a05e-5e9e4c9a9ef4.png",
      features: ["Air conditioning", "GPS navigation", "Clean & comfortable", "Luggage space"],
      description: "Comfortable sedan with modern amenities designed with new regular movement."
    },
    {
      type: "SUV", 
      capacity: "1-6 passengers",
      image: "/lovable-uploads/25d6e567-58a2-4884-94e4-e967d0d3d02a.png",
      features: ["Premium comfort", "Professional service", "Business amenities", "Group seating"],
      description: "Luxurious SUV designed with new regular movement."
    },
    {
      type: "MAXI TAXI",
      capacity: "1-8 passengers",
      image: "/lovable-uploads/db90f5df-7275-40c4-83b4-5ba0247c56ec.png",
      features: ["Group seating", "Extra luggage space", "Event transportation", "Competitive group rates"],
      description: "Large capacity vehicle when you need with space."
    },
    {
      type: "WAGON",
      capacity: "1-8 passengers",
      image: "/lovable-uploads/706aa5eb-a40b-4504-9c4c-ed55d1012046.png",
      features: ["Spacious interior", "Family friendly", "Luggage capacity", "Comfortable seating"],
      description: "Ideal choice for long drives, reliable luggage capacity for medium size groups."
    },
    {
      type: "ACCESSIBLE TAXI",
      capacity: "1-4 passengers + wheelchair",
      image: "/lovable-uploads/9dba1764-3239-4966-a231-e277fe144a76.png",
      features: ["Wheelchair access", "Medical equipment space", "Trained drivers", "Insurance billing"],
      description: "Wheelchair accessible comfortable transportation for all adventures."
    },
    {
      type: "PARCEL DELIVERY",
      capacity: "Goods transport",
      image: "/lovable-uploads/706aa5eb-a40b-4504-9c4c-ed55d1012046.png",
      features: ["Secure transport", "Fast delivery", "Parcel tracking", "Professional handling"],
      description: "Exclusive fast & full professional delivery but for goods world wide."
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
              <Card key={index} className="hover:shadow-lg transition-shadow bg-gray-50">
                <CardHeader className="text-center pb-4">
                  <div className="mb-4">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.type}
                      className="w-full h-48 object-contain mx-auto"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold">{vehicle.type}</CardTitle>
                  <CardDescription className="text-base font-semibold text-gray-700">
                    {vehicle.capacity}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{vehicle.description}</p>
                  
                  {/* Passengers and Luggage Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-sm">Passengers</div>
                      <Users className="h-5 w-5 mx-auto mt-1 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">Luggage</div>
                      <Car className="h-5 w-5 mx-auto mt-1 text-blue-600" />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-800">Features:</h4>
                    <div className="space-y-1">
                      {vehicle.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <span className="text-blue-600 text-xs">•</span>
                          <span className="text-xs text-gray-600">{feature}</span>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Booking Policies</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Important information about our booking and cancellation policies
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Pre-Booking Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Pre-Booking Information</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">Pre-Book Rate: $2.70</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">No flag advance booking recommended</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">Subject pickup within waiting time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">Using booking cheaper lift out select</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">Waybill subject availability</span>
                </li>
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Cancellation Policy</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">Important Notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">Cancellations should 3 hours before departure time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">Free cancellation up to 2 hours before pickup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">24hrs+ 2 hours full cancellation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">No-show booking and no cancellation full charged</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-sm">Charges subject to availability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Standards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Standards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">Regular safety inspections and maintenance ensure every vehicle meets the highest safety standards.</p>
            </div>
            <div className="text-center">
              <Car className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Well-Maintained</h3>
              <p className="text-gray-600">Our vehicles are regularly serviced and kept in pristine condition for your comfort.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Drivers</h3>
              <p className="text-gray-600">Experienced, licensed drivers who know the peninsula and prioritize your safety.</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Care</h3>
              <p className="text-gray-600">Every ride is an opportunity to provide exceptional service and exceed expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Service?</h2>
          <p className="text-xl mb-8 text-blue-100">
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
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white hover:bg-white hover:text-blue-900 font-semibold rounded-md transition-colors"
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
