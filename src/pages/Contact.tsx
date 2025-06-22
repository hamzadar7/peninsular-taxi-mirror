
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { saveContact } from "@/utils/contactStorage";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting contact form with data:', formData);
    
    try {
      saveContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });
      
      console.log('Contact form submitted successfully');
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      
      setSubmitMessage("✅ Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitMessage("❌ Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitMessage) setSubmitMessage("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact <span className="text-yellow-400">Us</span></h1>
            <p className="text-xl text-gray-100">
              Get in touch with us for bookings, inquiries, or any questions about our taxi services.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-gray-600">Call us for immediate booking and assistance</p>
                    <a href="tel:+61408202034" className="text-yellow-400 hover:text-yellow-500 text-lg font-semibold">
                      +61 408 202 034
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">Send us a message and we'll respond promptly</p>
                    <a href="mailto:contact@capelsoundtaxi.com.au" className="text-yellow-400 hover:text-yellow-500">
                      contact@capelsoundtaxi.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-gray-600">Our location</p>
                    <p className="text-gray-800">Capel Sound VIC 3940</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Operating Hours</h3>
                    <p className="text-gray-600">We're available</p>
                    <p className="text-gray-800 font-semibold">24/7 - Every day of the year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+61 XXX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    className="min-h-[120px]"
                    disabled={isSubmitting}
                  />
                </div>

                {submitMessage && (
                  <div className="p-3 rounded-lg bg-gray-50 border">
                    <p className={`text-sm ${
                      submitMessage.includes('✅') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {submitMessage}
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Need a Ride Now Section */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
            <CardContent className="p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Need a Ride Now?</h2>
                <p className="text-xl mb-8 text-gray-300">
                  Choose your preferred way to book with us.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Call Now</h3>
                    <p className="text-gray-300 mb-4">Speak directly with our operators for immediate booking and assistance</p>
                    <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                      <a href="tel:+61408202034">+61 408 202 034</a>
                    </Button>
                  </div>

                  <div className="text-center">
                    <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Book Online</h3>
                    <p className="text-gray-300 mb-4">Use our booking form for advance reservations with special requirements</p>
                    <Button asChild className="bg-white text-black hover:bg-gray-100 font-semibold">
                      <a href="/booking">Book Online</a>
                    </Button>
                  </div>

                  <div className="text-center">
                    <Mail className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <p className="text-gray-300 mb-4">Send us your inquiry or special requests via email for detailed assistance</p>
                    <Button asChild className="bg-white text-black hover:bg-gray-100 font-semibold">
                      <a href="mailto:contact@capelsoundtaxi.com.au">Send Email</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;
