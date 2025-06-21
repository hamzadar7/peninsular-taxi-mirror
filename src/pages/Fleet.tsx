
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Shield, Heart, Clock, Award } from "lucide-react";

const Fleet = () => {
  const vehicles = [
    {
      type: "Standard Sedan",
      capacity: "1-4 passengers",
      image: "🚗",
      features: ["Air conditioning", "GPS navigation", "Clean & comfortable", "Luggage space"],
      description: "Perfect for everyday transportation and short trips around the peninsula."
    },
    {
      type: "Executive Sedan",
      capacity: "1-4 passengers", 
      image: "🚙",
      features: ["Premium comfort", "Professional service", "Business amenities", "Corporate billing"],
      description: "Ideal for business travel, airport transfers, and executive transportation."
    },
    {
      type: "Multi-Passenger Vehicle",
      capacity: "5-8 passengers",
      image: "🚐",
      features: ["Group seating", "Extra luggage space", "Event transportation", "Competitive group rates"],
      description: "Great for families, groups, and special events requiring larger capacity."
    },
    {
      type: "Wheelchair Accessible",
      capacity: "1-4 passengers + wheelchair",
      image: "♿",
      features: ["Wheelchair access", "Medical equipment space", "Trained drivers", "Insurance billing"],
      description: "Specially equipped vehicles for medical appointments and accessibility needs."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Vehicle Fleet</h1>
            <p className="text-xl text-blue-100">
              Modern, comfortable, and well-maintained vehicles for every journey
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Vehicle Types</h2>
            <p className="text-lg text-gray-600">
              Our diverse fleet ensures we have the right vehicle for your specific needs, 
              whether it's a quick local trip or a special occasion requiring extra comfort.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{vehicle.type}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {vehicle.capacity}
                      </CardDescription>
                    </div>
                    <div className="text-4xl">{vehicle.image}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{vehicle.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-800">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Standards */}
      <section className="py-16 bg-gray-50">
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

      {/* Vehicle Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Standard Features</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Comfort & Convenience</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Climate-controlled air conditioning and heating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Comfortable seating with adequate legroom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Clean, smoke-free environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Adequate luggage and storage space</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Safety & Technology</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>GPS navigation systems for optimal routes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Modern safety features and airbags</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Regular maintenance and safety inspections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>EFTPOS facilities for convenient payment</span>
                  </li>
                </ul>
              </div>
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
              href="tel:0411000000" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white hover:bg-white hover:text-blue-900 font-semibold rounded-md transition-colors"
            >
              Call 0411 000 000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
