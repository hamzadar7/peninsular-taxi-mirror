
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MessageSquare } from "lucide-react";
import BookingForm from "@/components/BookingForm";

const Booking = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Book Your <span className="text-yellow-400">Taxi</span></h1>
            <p className="text-xl text-gray-100">
              Easy online booking or call us directly. We're here 24/7 to serve you.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Options */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="text-center p-8 bg-white shadow-lg border-2 border-yellow-400">
              <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Call to Book</h3>
              <p className="text-gray-600 mb-4">Speak directly with our operators for immediate booking</p>
              <div className="text-2xl font-bold text-yellow-400 mb-4">+61 408 202 034</div>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </Card>

            <Card className="text-center p-8 bg-white shadow-lg border-2 border-gray-200">
              <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Online Booking</h3>
              <p className="text-gray-600 mb-4">Fill out the form below for advance bookings</p>
              <div className="text-lg font-semibold text-yellow-400 mb-2">Quick & Easy</div>
              <p className="text-sm text-gray-500">Confirmation within 30 minutes</p>
            </Card>

            <Card className="text-center p-8 bg-white shadow-lg border-2 border-gray-200">
              <MessageSquare className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">WhatsApp Location Shared</h3>
              <p className="text-gray-600 mb-4">Real-time tracking for your peace of mind</p>
              <div className="text-lg font-semibold text-yellow-400 mb-2">Live Updates</div>
              <p className="text-sm text-gray-500">Know exactly when we'll arrive</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Booking Policies */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Booking <span className="text-yellow-400">Policies</span></h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 shadow-lg border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-800">Cancellation Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free cancellation up to 30 minutes before pickup</li>
                    <li>• Cancellations within 30 minutes may incur charges</li>
                    <li>• No-show bookings will be charged full fare</li>
                    <li>• Weather-related cancellations are free of charge</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-800">Booking Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Advance bookings recommended for airport transfers</li>
                    <li>• Driver will wait up to 10 minutes at pickup location</li>
                    <li>• Additional waiting time charged at $0.80 per minute</li>
                    <li>• All bookings subject to driver and vehicle availability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-800">Payment Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Payment accepted via cash, card, or EFTPOS</li>
                    <li>• Cab Charge and Motor Pass vouchers accepted</li>
                    <li>• Corporate accounts available with monthly billing</li>
                    <li>• All fares include GST</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-800">Service Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Professional, licensed, and insured drivers</li>
                    <li>• Clean and well-maintained vehicles</li>
                    <li>• Punctual and reliable service</li>
                    <li>• 24/7 customer support available</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
