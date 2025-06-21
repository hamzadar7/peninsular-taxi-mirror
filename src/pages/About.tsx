
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Capelsound Taxi</h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Your trusted local transportation partner on the Mornington Peninsula
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Our Story</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-6 text-lg leading-relaxed">
                    Capelsound Taxi has been proudly serving the Mornington Peninsula community for over a decade. 
                    What started as a small local taxi service has grown to become one of the region's most trusted 
                    transportation providers, known for our reliability, professionalism, and commitment to customer service.
                  </p>
                  <p className="mb-6 text-lg leading-relaxed">
                    We understand the unique transportation needs of peninsula residents and visitors alike. Whether 
                    you need a quick trip to the shops, a reliable airport transfer, or transportation for a special 
                    event, our experienced team is here to help 24 hours a day, 7 days a week.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our mission is simple: to provide safe, reliable, and affordable transportation services while 
                    maintaining the highest standards of customer care and community engagement.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-yellow-50 rounded-xl">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">10+</div>
                  <div className="text-gray-700 font-medium">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-700 font-medium">Service Available</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
                  <div className="text-gray-700 font-medium">Happy Customers</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-4xl font-bold text-purple-600 mb-2">5★</div>
                  <div className="text-gray-700 font-medium">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Clock className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">On-time service you can count on, every time. We understand your time is valuable.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Users className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Proud to serve and support our local Mornington Peninsula community.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <Award className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Committed to providing the highest quality service with professional drivers.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <MapPin className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl font-bold">Local Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Expert knowledge of peninsula roads, shortcuts, and destinations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Service Areas</h2>
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xl text-gray-600 mb-12">
              We proudly serve the entire Mornington Peninsula and surrounding areas, including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Capel Sound", "Rosebud", "Rye", "Sorrento",
                "Portsea", "Blairgowrie", "Dromana", "Safety Beach",
                "Martha Cove", "McCrae", "Mount Martha", "Mornington",
                "Mount Eliza", "Frankston", "Seaford", "Cranbourne"
              ].map((area) => (
                <div key={area} className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-center font-medium text-gray-700 hover:shadow-md transition-shadow">
                  {area}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Don't see your area listed? <strong>Contact us</strong> - we may still be able to help!
              </p>
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">Our Professional Team</h2>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xl text-gray-600 mb-8">
                Our team consists of experienced, professional drivers who know the Mornington Peninsula like the back of their hand. 
                All our drivers are fully licensed, background checked, and committed to providing excellent service.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Driver Qualifications</h3>
                <ul className="space-y-4">
                  {[
                    "Fully licensed and accredited",
                    "Comprehensive background checks",
                    "Local road knowledge and expertise",
                    "Customer service focused",
                    "Defensive driving certified"
                  ].map((item) => (
                    <li key={item} className="flex items-center text-lg text-gray-600">
                      <Shield className="h-6 w-6 text-green-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Service Excellence</h3>
                <ul className="space-y-4">
                  {[
                    "Tourism and local attraction knowledge",
                    "Professional and courteous service",
                    "Available 24/7 for your convenience",
                    "Multi-lingual capabilities",
                    "Emergency response trained"
                  ].map((item) => (
                    <li key={item} className="flex items-center text-lg text-gray-600">
                      <Star className="h-6 w-6 text-yellow-400 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Get in Touch</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl mb-12 text-gray-300">
              Ready to experience reliable, professional taxi service? Contact us today to book your ride 
              or learn more about our services.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-center justify-center gap-4 text-xl p-6 bg-white/10 rounded-xl">
                <Phone className="h-8 w-8 text-yellow-400" />
                <div className="text-left">
                  <div className="font-semibold">Phone</div>
                  <div className="text-gray-300">+61 408 202 034</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 text-xl p-6 bg-white/10 rounded-xl">
                <Mail className="h-8 w-8 text-yellow-400" />
                <div className="text-left">
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-300">info@capelsoundtaxi.com.au</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-300 mb-8">
                Capel Sound VIC 3940<br />
                Serving the Mornington Peninsula 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8">
                  <Link to="/booking">Book Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-8">
                  <a href="tel:+61408202034">Call Now</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
