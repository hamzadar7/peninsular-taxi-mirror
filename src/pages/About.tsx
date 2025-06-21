
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Clock, Award, Phone, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About Capel Sound Taxi</h1>
            <p className="text-xl text-blue-100">
              Your trusted local transportation partner on the Mornington Peninsula
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6 text-lg leading-relaxed">
                Capel Sound Taxi has been proudly serving the Mornington Peninsula community for over a decade. 
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
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">On-time service you can count on, every time. We understand your time is valuable.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Proud to serve and support our local Mornington Peninsula community.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Committed to providing the highest quality service with professional drivers.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Local Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Expert knowledge of peninsula roads, shortcuts, and destinations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Service Areas</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg text-gray-600 mb-8">
              We proudly serve the entire Mornington Peninsula and surrounding areas, including:
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">Capel Sound</div>
              <div className="p-4 bg-blue-50 rounded-lg">Rosebud</div>
              <div className="p-4 bg-blue-50 rounded-lg">Rye</div>
              <div className="p-4 bg-blue-50 rounded-lg">Sorrento</div>
              <div className="p-4 bg-blue-50 rounded-lg">Portsea</div>
              <div className="p-4 bg-blue-50 rounded-lg">Blairgowrie</div>
              <div className="p-4 bg-blue-50 rounded-lg">Dromana</div>
              <div className="p-4 bg-blue-50 rounded-lg">Safety Beach</div>
              <div className="p-4 bg-blue-50 rounded-lg">Martha Cove</div>
              <div className="p-4 bg-blue-50 rounded-lg">McCrae</div>
              <div className="p-4 bg-blue-50 rounded-lg">Mount Martha</div>
              <div className="p-4 bg-blue-50 rounded-lg">Mornington</div>
              <div className="p-4 bg-blue-50 rounded-lg">Mount Eliza</div>
              <div className="p-4 bg-blue-50 rounded-lg">Frankston</div>
              <div className="p-4 bg-blue-50 rounded-lg">Seaford</div>
              <div className="p-4 bg-blue-50 rounded-lg">Cranbourne</div>
            </div>
            <p className="text-center text-gray-600 mt-8">
              Don't see your area listed? <strong>Contact us</strong> - we may still be able to help!
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Professional Team</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              Our team consists of experienced, professional drivers who know the Mornington Peninsula like the back of their hand. 
              All our drivers are fully licensed, background checked, and committed to providing excellent service.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <ul className="space-y-3 text-gray-600">
                  <li>• Fully licensed and accredited</li>
                  <li>• Comprehensive background checks</li>
                  <li>• Local road knowledge and expertise</li>
                  <li>• Customer service focused</li>
                </ul>
              </div>
              <div className="text-left">
                <ul className="space-y-3 text-gray-600">
                  <li>• Defensive driving certified</li>
                  <li>• Tourism and local attraction knowledge</li>
                  <li>• Professional and courteous</li>
                  <li>• Available 24/7 for your convenience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-8 text-blue-100">
              Ready to experience reliable, professional taxi service? Contact us today to book your ride 
              or learn more about our services.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center gap-2 text-lg">
                <Phone className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div>0411 000 000</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg">
                <Mail className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div>info@capelsoundtaxi.com.au</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-blue-100">
                Capel Sound VIC 3940<br />
                Serving the Mornington Peninsula 24/7
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
