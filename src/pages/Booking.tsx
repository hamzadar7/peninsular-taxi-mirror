
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MapPin } from "lucide-react";
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
              <h3 className="text-xl font-bold mb-2">Call to Book</h3>
              <p className="text-gray-600 mb-4">Speak directly with our operators for immediate booking and assistance</p>
              <div className="text-2xl font-bold text-yellow-400 mb-4">+61 408 202 034</div>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </Card>

            <Card className="text-center p-8 bg-white shadow-lg border-2 border-yellow-400">
              <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Online Booking</h3>
              <p className="text-gray-600 mb-4">Fill out the form below for advance bookings with confirmation within 15 minutes</p>
              <div className="text-lg font-semibold text-yellow-400">Quick & Easy</div>
              <p className="text-sm text-gray-500">From exactly when you finish</p>
            </Card>

            <Card className="text-center p-8 bg-white shadow-lg border-2 border-yellow-400">
              <MapPin className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp Location Shared</h3>
              <p className="text-gray-600 mb-4">Real time tracking for your peace of mind</p>
              <div className="text-lg font-semibold text-yellow-400">Live Updates</div>
              <p className="text-sm text-gray-500">Know exactly when we'll arrive</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Policies */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Booking Policies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Cancellation Policy</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Free cancellation up to 2 hours before pickup</li>
                  <li>• 50% charge for cancellations within 2 hours</li>
                  <li>• Full charge for no-shows</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Booking Terms</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Advance booking recommended</li>
                  <li>• 15-minute grace period for pickups</li>
                  <li>• Payment accepted: Cash, Card, Bank Transfer</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Special Requirements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Child seats available upon request</li>
                  <li>• Wheelchair accessible vehicles</li>
                  <li>• Pet-friendly options available</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Contact Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Phone: +61 408 202 034</li>
                  <li>• Available 24/7</li>
                  <li>• WhatsApp location sharing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
