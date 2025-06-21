
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Book Your <span className="text-yellow-400">Taxi</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 px-4">
              Easy online booking or call us directly. We're here 24/7 to serve you.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Options */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-8 lg:mb-12">
            <Card className="text-center p-6 lg:p-8 bg-white shadow-lg border-2 border-yellow-400 hover:shadow-xl transition-shadow">
              <Phone className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Call to Book</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Speak directly with our operators for immediate booking and assistance</p>
              <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4">+61 408 202 034</div>
              <p className="text-xs sm:text-sm text-gray-500">Available 24/7</p>
            </Card>

            <Card className="text-center p-6 lg:p-8 bg-white shadow-lg border-2 border-yellow-400 hover:shadow-xl transition-shadow">
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Online Booking</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Fill out the form below for advance bookings with confirmation within 15 minutes</p>
              <div className="text-lg font-semibold text-yellow-400">Quick & Easy</div>
              <p className="text-xs sm:text-sm text-gray-500">From exactly when you finish</p>
            </Card>

            <Card className="text-center p-6 lg:p-8 bg-white shadow-lg border-2 border-yellow-400 hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">WhatsApp Location Shared</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Real time tracking for your peace of mind</p>
              <div className="text-lg font-semibold text-yellow-400">Live Updates</div>
              <p className="text-xs sm:text-sm text-gray-500">Know exactly when we'll arrive</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Booking Policies - Updated to match reference image */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Booking Policies</h2>
              <p className="text-lg sm:text-xl text-gray-600">Important information about our booking and cancellation policies</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Pre-Booking Information */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Pre-Booking Information</h3>
                  
                  {/* Pre-Book Fee */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="text-lg font-bold text-gray-900">Pre-Book Fee: $2.70</div>
                    <div className="text-gray-600">Applied to all advance bookings</div>
                  </div>
                  
                  {/* Information List */}
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">24-hour advance booking recommended</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Airport pickups include waiting time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Group bookings require 48-hour notice</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Confirmation within 30 minutes</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Cancellation Policy</h3>
                  
                  {/* Important Notice */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="text-lg font-bold text-red-800">Important Notice</div>
                    <div className="text-red-700">No cancellation allowed 2 hours before departure time</div>
                  </div>
                  
                  {/* Policy List */}
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">After 2 hours: full charge applies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">No-show bookings will be charged in full</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Changes subject to availability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 lg:mt-12 grid sm:grid-cols-2 gap-6 lg:gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Special Requirements</h4>
                <p className="text-gray-600">Child seats, wheelchair access, and pet-friendly options available upon request</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Payment Methods</h4>
                <p className="text-gray-600">Cash, Credit Card, and Bank Transfer accepted for all bookings</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
