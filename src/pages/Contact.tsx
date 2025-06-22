
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { contactAPI } from "@/utils/apiService";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.email.trim()) return 'Email is required.';
    if (!formData.message.trim()) return 'Message is required.';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address.';
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact form:', formData);
      
      const response = await contactAPI.create({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || '',
        message: formData.message.trim()
      });

      console.log('Contact form submitted successfully:', response);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      toast({
        title: "Message Sent",
        description: "Thank you for your message! We'll get back to you soon.",
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Submission Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-yellow-400">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 px-4">
              Contact us for any inquiries, bookings, or assistance. We're here to help 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            
            {/* Contact Details */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Reach out to us through any of these channels. We're available 24/7 to serve you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                    <a href="tel:+61408202034" className="text-yellow-600 hover:text-yellow-700 text-xl font-bold">
                      +61 408 202 034
                    </a>
                    <p className="text-gray-600 text-sm">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                    <a href="mailto:contact@capelsoundtaxi.com.au" className="text-yellow-600 hover:text-yellow-700">
                      contact@capelsoundtaxi.com.au
                    </a>
                    <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Service Area</h3>
                    <p className="text-gray-700">Capel Sound & Surrounding Areas</p>
                    <p className="text-gray-600 text-sm">Mornington Peninsula, Victoria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Operating Hours</h3>
                    <p className="text-gray-700 font-semibold">24/7 Service</p>
                    <p className="text-gray-600 text-sm">Every day of the year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader className="bg-yellow-400 text-black">
                  <CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
                    <Send className="h-6 w-6 mr-2" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number (optional)"
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Enter your message or inquiry..."
                        required
                        disabled={isSubmitting}
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-12"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-lg mb-6">Call us now for immediate taxi service or emergency assistance</p>
          <a 
            href="tel:+61408202034"
            className="inline-flex items-center justify-center bg-black text-yellow-400 hover:bg-gray-800 px-8 py-4 text-xl font-bold rounded-lg transition-colors"
          >
            <Phone className="h-6 w-6 mr-2" />
            +61 408 202 034
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
