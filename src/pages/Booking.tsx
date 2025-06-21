
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

            <Card className="text-center p-8 bg-white shadow-lg">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Online Booking</h3>
              <p className="text-gray-600 mb-4">Fill out the form below for advance bookings with confirmation within 15 minutes</p>
              <div className="text-lg font-semibold text-blue-600">Quick & Easy</div>
              <p className="text-sm text-gray-500">From exactly when you finish</p>
            </Card>

            <Card className="text-center p-8 bg-white shadow-lg">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp Location Shared</h3>
              <p className="text-gray-600 mb-4">Real time tracking for your peace of mind</p>
              <div className="text-lg font-semibold text-green-600">Live Updates</div>
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
    </div>
  );
};

export default Booking;
