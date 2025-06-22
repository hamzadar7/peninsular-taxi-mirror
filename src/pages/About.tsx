
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock, Award, Phone, Mail, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <head>
        <title>About Capel Sound Taxi - Professional Taxi Service Since 2003 | Mornington Peninsula</title>
        <meta name="description" content="Learn about Capel Sound Taxi, serving the Mornington Peninsula since 2003. Professional, reliable transportation with 20+ years experience." />
        <meta name="keywords" content="about Capel Sound taxi, Mornington Peninsula taxi history, professional taxi service, reliable transport" />
      </head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-yellow-400">Capel Sound Taxi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Your trusted transportation partner on the Mornington Peninsula since our establishment. 
              We pride ourselves on providing safe, reliable, and professional taxi services.
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
                    Capel Sound Taxi has been serving the Mornington Peninsula community with dedication and professionalism. 
                    We understand the unique transportation needs of our local area and are committed to providing safe, 
                    reliable, and comfortable journeys for all our passengers.
                  </p>
                  <p className="mb-6 text-lg leading-relaxed">
                    Our fleet of modern vehicles and team of experienced drivers ensure that whether you're heading to the airport, 
                    a medical appointment, or exploring the beautiful Peninsula, you'll arrive safely and on time.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We're more than just a taxi service – we're part of the community, supporting local events and providing 
                    essential transportation services 24 hours a day, 7 days a week.
                  </p>
                </div>
              </div>
              
              {/* Mission and Vision Cards */}
              <div className="space-y-6">
                <Card className="p-6 bg-blue-50 border-blue-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      To provide safe, reliable, and professional transportation services while maintaining 
                      exceptional customer service, contributing positively to our local community on the Mornington Peninsula.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="p-6 bg-green-50 border-green-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      To be the most trusted and preferred taxi service on the Mornington Peninsula, 
                      known for our exceptional customer service and community commitment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Capel Sound Taxi */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose Capel Sound Taxi?</h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            We're committed to providing the best transportation experience in the Peninsula.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Clock className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">24/7 Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Available around the clock, every day of the year. Reliable service you can count on most.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Licensed drivers, regularly maintained vehicles, and comprehensive insurance coverage.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <MapPin className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Local Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our drivers know the Peninsula like the back of their hand, ensuring efficient routes.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Award className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Professional Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Courteous, professional drivers committed to making your journey comfortable.</p>
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
                "Frankston", "Seaford", "Cranbourne", "Hastings",
                "Tootgarook", "Merricks", "HMAS Cerberus", "Stony Point",
                "Fingal", "Cape Schanck", "Main Ridge", "Red Hill South", "Merricks North"
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
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold px-8">
              <a href="tel:+61408202034" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>Call +61 408 202 034</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
