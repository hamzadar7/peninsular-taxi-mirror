
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, CreditCard, Shield, Phone, MapPin, Users, Car } from "lucide-react";
import { useState } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    serviceType: "",
    specialRequests: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Book Your Taxi</h1>
            <p className="text-xl text-blue-100">
              Quick and easy online booking for all your transportation needs
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Booking Details</CardTitle>
                <CardDescription>Fill in your trip information and we'll get you moving</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Trip Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="pickup"
                          placeholder="Enter pickup address"
                          className="pl-10"
                          value={formData.pickupLocation}
                          onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="destination"
                          placeholder="Where are you going?"
                          className="pl-10"
                          value={formData.destination}
                          onChange={(e) => handleInputChange('destination', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="date"
                          type="date"
                          className="pl-10"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="time"
                          type="time"
                          className="pl-10"
                          value={formData.time}
                          onChange={(e) => handleInputChange('time', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service-type">Service Type</Label>
                      <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Taxi</SelectItem>
                          <SelectItem value="airport">Airport Transfer</SelectItem>
                          <SelectItem value="corporate">Corporate Travel</SelectItem>
                          <SelectItem value="group">Group Transportation</SelectItem>
                          <SelectItem value="hotel">Hotel Transfer</SelectItem>
                          <SelectItem value="medical">Medical Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Number of Passengers</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select passengers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Passenger</SelectItem>
                            <SelectItem value="2">2 Passengers</SelectItem>
                            <SelectItem value="3">3 Passengers</SelectItem>
                            <SelectItem value="4">4 Passengers</SelectItem>
                            <SelectItem value="5+">5+ Passengers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          placeholder="Your full name"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange('contactName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="phone"
                            type="tel"
                            placeholder="Your phone number"
                            className="pl-10"
                            value={formData.contactPhone}
                            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <Textarea 
                      id="requests"
                      placeholder="Any special requirements, wheelchair access, child seats, etc."
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    <Car className="mr-2 h-5 w-5" />
                    Submit Booking Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg">Need Immediate Service?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="mb-4 text-gray-600">Call us now for instant booking</p>
                  <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                    <a href="tel:0411000000">
                      <Phone className="mr-2 h-4 w-4" />
                      Call 0411 000 000
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <CardTitle>Payment Methods</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cash payments accepted</li>
                  <li>• Credit and debit cards</li>
                  <li>• EFTPOS available in vehicles</li>
                  <li>• Corporate account billing</li>
                  <li>• Insurance billing support</li>
                </ul>
              </CardContent>
            </Card>

            {/* Booking Policies */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <CardTitle>Booking Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 24/7 customer support available</li>
                  <li>• All vehicles are licensed and insured</li>
                  <li>• Professional, uniformed drivers</li>
                  <li>• GPS tracking for efficient routes</li>
                  <li>• Clean, comfortable vehicles</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
