
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock, Award, Phone, Mail, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-yellow-400">Capel Sound Taxi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Your trusted transportation partner on the Mornington Peninsula since 2003 – 
              dedicated to providing quality services for professional, safe, 
              comfortable and professional service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Our Story</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-6 text-lg leading-relaxed">
                    Capel Sound Taxi has been serving the local community with dedication since 2003. 
                    We have grown to become one of the peninsula's most trusted transport providers, 
                    known for reliability, professionalism and customer service.
                  </p>
                  <p className="mb-6 text-lg leading-relaxed">
                    Our commitment to excellence has made us the preferred choice for local residents 
                    and tourists alike. We provide a comprehensive range of transport solutions for 
                    every need - from quick local trips to airport transfers and special events.
                  </p>
                  <p className="text-lg leading-relaxed">
                    With over two decades of experience serving this community, we understand the unique 
                    transport needs of peninsula residents and visitors, ensuring every journey is 
                    comfortable, safe and reliable.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-yellow-50 rounded-xl">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">20+</div>
                  <div className="text-gray-700 font-medium">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-700 font-medium">Service Available</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                  <div className="text-gray-700 font-medium">Happy Customers</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-4xl font-bold text-purple-600 mb-2">5★</div>
                  <div className="text-gray-700 font-medium">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Mission</h2>
            <div className="text-center mb-12">
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To deliver exceptional, professional transportation services while 
                maintaining the highest standards of safety, reliability and customer satisfaction. 
                We are committed to serving our community with integrity and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Vision</h2>
            <div className="text-center mb-12">
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To be the peninsula's leading transport service, setting the benchmark 
                for professional service excellence and community engagement across the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Capel Sound Taxi */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose Capel Sound Taxi?</h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            We are committed to providing the best transportation experience in the Peninsula.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Clock className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">24/7 Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Available around the clock, every day of the year. Reliable service you can count on.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Star className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Professional drivers with comprehensive background checks and ongoing training.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <MapPin className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Local Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Expert knowledge of peninsula roads and the best routes to all destinations.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Award className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Professional Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Committed to excellence with professional, courteous and reliable service standards.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Service Areas</h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            We proudly serve the entire Mornington Peninsula and surrounding areas
          </p>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                "Capel Sound", "Rosebud", "Rye", "Sorrento",
                "Portsea", "Blairgowrie", "Dromana", "Safety Beach", 
                "McCrae", "Mount Martha", "Mornington", "Mount Eliza",
                "Frankston", "Seaford", "Cranbourne", "Hastings"
              ].map((area) => (
                <div key={area} className="p-4 bg-blue-50 rounded-lg text-center font-medium text-gray-700 hover:shadow-md transition-shadow">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Experience Our Service */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Our Service?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Book your ride today or call us for immediate service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8">
              <Link to="/booking">Book Online</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-8">
              <a href="tel:+61408202034">Call +61 408 202 034</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
