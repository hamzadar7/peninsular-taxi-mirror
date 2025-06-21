
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingForm from "@/components/BookingForm";

const Booking = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    // If already on booking page, scroll to form
    const bookingForm = document.querySelector('#booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Otherwise navigate to booking page
      navigate('/booking');
      setTimeout(() => {
        const form = document.querySelector('#booking-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-gray-900 to-blue-800 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Smart Taxi Booking
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 px-4 font-light">
              Experience seamless transportation with our advanced booking platform
            </p>
          </div>
        </div>
      </section>

      {/* Booking Options */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="text-center p-8 bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Instant Call Booking</h3>
              <p className="text-gray-600 mb-6 text-sm">Connect with our AI-powered dispatch system for immediate booking assistance</p>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">+61 408 202 034</div>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">24/7 Available</span>
            </Card>

            <Card className="text-center p-8 bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Online Booking</h3>
              <p className="text-gray-600 mb-6 text-sm">Advanced scheduling system with automated confirmation and real-time updates</p>
              <div className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">AI-Powered</div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">15min Confirmation</span>
            </Card>

            <Card className="text-center p-8 bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Live GPS Tracking</h3>
              <p className="text-gray-600 mb-6 text-sm">Real-time location sharing via WhatsApp with ETA predictions</p>
              <div className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Live Updates</div>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">Real-time</span>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Booking Policies */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">Service Policies</h2>
              <p className="text-xl text-gray-600">Transparent pricing and flexible booking terms</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pre-Booking Information */}
              <div className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Pre-Booking Information</h3>
                  
                  {/* Pre-Book Fee */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-6">
                    <div className="text-lg font-bold text-gray-900">Pre-Book Fee: $2.70</div>
                    <div className="text-gray-600">Applied to all advance bookings</div>
                  </div>
                  
                  {/* Information List */}
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">24-hour advance booking recommended</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Airport pickups include waiting time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Group bookings require 48-hour notice</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Confirmation within 30 minutes</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Cancellation Policy</h3>
                  
                  {/* Important Notice */}
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 mb-6">
                    <div className="text-lg font-bold text-red-800">Important Notice</div>
                    <div className="text-red-700">No cancellation allowed 2 hours before departure time</div>
                  </div>
                  
                  {/* Policy List */}
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">After 2 hours: full charge applies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">No-show bookings will be charged in full</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Changes subject to availability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 grid sm:grid-cols-2 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-0">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-lg font-bold">🎯</span>
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">Special Requirements</h4>
                <p className="text-gray-600">Child seats, wheelchair access, and pet-friendly options available upon request</p>
              </div>
              <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-0">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-lg font-bold">💳</span>
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Payment Methods</h4>
                <p className="text-gray-600">Cash, Credit Card, EFTPOS, Cabcharge, and MPTP accepted for all bookings</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
