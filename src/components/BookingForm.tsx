
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { sendOTPEmail, generateOTP } from "@/utils/emailService";
import { saveBooking } from "@/utils/bookingStorage";

declare global {
  interface Window {
    google: any;
  }
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  pickupAddress: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  vehicleType: string;
  specialRequests: string;
  returnJourney: boolean;
  returnDate: string;
  returnTime: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    pickupAddress: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    vehicleType: 'sedan',
    specialRequests: '',
    returnJourney: false,
    returnDate: '',
    returnTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const pickupRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  // Google Maps Autocomplete Setup
  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
          version: "weekly",
          libraries: ["places"]
        });

        const google = await loader.load();
        
        if (pickupRef.current) {
          const pickupAutocomplete = new google.maps.places.Autocomplete(pickupRef.current, {
            componentRestrictions: { country: "AU" },
            fields: ["address_components", "geometry", "formatted_address"]
          });
          
          pickupAutocomplete.addListener("place_changed", () => {
            const place = pickupAutocomplete.getPlace();
            if (place.formatted_address) {
              setFormData(prev => ({
                ...prev,
                pickupAddress: place.formatted_address
              }));
            }
          });
        }

        if (destinationRef.current) {
          const destinationAutocomplete = new google.maps.places.Autocomplete(destinationRef.current, {
            componentRestrictions: { country: "AU" },
            fields: ["address_components", "geometry", "formatted_address"]
          });
          
          destinationAutocomplete.addListener("place_changed", () => {
            const place = destinationAutocomplete.getPlace();
            if (place.formatted_address) {
              setFormData(prev => ({
                ...prev,
                destination: place.formatted_address
              }));
            }
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    if (import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
      initAutocomplete();
    }
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      setMessage('Please enter your email address first.');
      return;
    }

    setIsSubmitting(true);
    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      
      const emailSent = await sendOTPEmail(formData.email, otp);
      
      if (emailSent) {
        setIsOTPSent(true);
        setMessage('✅ OTP sent to your email. Please check and enter it below.');
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Error sending OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = () => {
    if (enteredOTP === generatedOTP) {
      setIsOTPVerified(true);
      setMessage('✅ Email verified successfully!');
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone || !formData.email || 
        !formData.pickupAddress || !formData.destination || 
        !formData.date || !formData.time) {
      return 'Please fill in all required fields.';
    }
    
    if (!isOTPVerified) {
      return 'Please verify your email address first.';
    }
    
    if (formData.returnJourney && (!formData.returnDate || !formData.returnTime)) {
      return 'Please fill in return journey details.';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save booking to local storage
      const bookingId = Date.now().toString();
      const bookingData = {
        id: bookingId,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      saveBooking(bookingData);
      
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        pickupAddress: '',
        destination: '',
        date: '',
        time: '',
        passengers: '1',
        vehicleType: 'sedan',
        specialRequests: '',
        returnJourney: false,
        returnDate: '',
        returnTime: ''
      });
      
      setIsOTPSent(false);
      setIsOTPVerified(false);
      setEnteredOTP('');
      setGeneratedOTP('');
      
      setMessage('✅ Booking submitted successfully! We will contact you shortly to confirm your reservation.');
    } catch (error) {
      console.error('Error submitting booking:', error);
      setMessage('Error submitting booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Taxi</h1>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll confirm your booking shortly
            </p>
          </div>

          <Card id="booking-form" className="shadow-xl">
            <CardHeader className="bg-yellow-400 text-black">
              <CardTitle className="text-2xl font-bold text-center">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-lg font-medium">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="h-12 text-lg"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="h-12 text-lg"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Email and OTP Verification */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-medium">Email Address *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-12 text-lg"
                        placeholder="Enter your email address"
                        disabled={isOTPVerified}
                      />
                      {!isOTPSent && !isOTPVerified && (
                        <Button 
                          type="button"
                          onClick={handleSendOTP}
                          disabled={isSubmitting || !formData.email}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold h-12 px-6"
                        >
                          Send OTP
                        </Button>
                      )}
                    </div>
                  </div>

                  {isOTPSent && !isOTPVerified && (
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-lg font-medium">Enter OTP *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="otp"
                          type="text"
                          value={enteredOTP}
                          onChange={(e) => setEnteredOTP(e.target.value)}
                          className="h-12 text-lg"
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                        />
                        <Button 
                          type="button"
                          onClick={handleVerifyOTP}
                          disabled={!enteredOTP || enteredOTP.length !== 6}
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold h-12 px-6"
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Trip Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickup" className="text-lg font-medium flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
                      Pickup Address *
                    </Label>
                    <Input
                      id="pickup"
                      ref={pickupRef}
                      type="text"
                      value={formData.pickupAddress}
                      onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                      required
                      className="h-12 text-lg"
                      placeholder="Enter pickup address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-lg font-medium flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
                      Destination *
                    </Label>
                    <Input
                      id="destination"
                      ref={destinationRef}
                      type="text"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      required
                      className="h-12 text-lg"
                      placeholder="Enter destination address"
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-lg font-medium flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-yellow-400" />
                      Pickup Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                      className="h-12 text-lg"
                      min={minDate}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-lg font-medium flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                      Pickup Time *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      required
                      className="h-12 text-lg"
                    />
                  </div>
                </div>

                {/* Passengers and Vehicle */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passengers" className="text-lg font-medium flex items-center">
                      <Users className="h-5 w-5 mr-2 text-yellow-400" />
                      Number of Passengers *
                    </Label>
                    <Select 
                      value={formData.passengers} 
                      onValueChange={(value) => handleInputChange('passengers', value)}
                    >
                      <SelectTrigger className="h-12 text-lg">
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10,11].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle" className="text-lg font-medium">Vehicle Type *</Label>
                    <Select 
                      value={formData.vehicleType} 
                      onValueChange={(value) => handleInputChange('vehicleType', value)}
                    >
                      <SelectTrigger className="h-12 text-lg">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan (1-4 passengers)</SelectItem>
                        <SelectItem value="suv">SUV (1-4 passengers)</SelectItem>
                        <SelectItem value="maxi">Maxi Taxi (1-11 passengers)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Return Journey */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="returnJourney"
                      checked={formData.returnJourney}
                      onChange={(e) => handleInputChange('returnJourney', e.target.checked)}
                      className="h-5 w-5 text-yellow-400"
                    />
                    <Label htmlFor="returnJourney" className="text-lg font-medium">
                      Return Journey Required
                    </Label>
                  </div>

                  {formData.returnJourney && (
                    <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="returnDate" className="text-lg font-medium">Return Date *</Label>
                        <Input
                          id="returnDate"
                          type="date"
                          value={formData.returnDate}
                          onChange={(e) => handleInputChange('returnDate', e.target.value)}
                          required={formData.returnJourney}
                          className="h-12 text-lg"
                          min={formData.date || minDate}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="returnTime" className="text-lg font-medium">Return Time *</Label>
                        <Input
                          id="returnTime"
                          type="time"
                          value={formData.returnTime}
                          onChange={(e) => handleInputChange('returnTime', e.target.value)}
                          required={formData.returnJourney}
                          className="h-12 text-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequests" className="text-lg font-medium">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Any special requirements or notes..."
                    className="min-h-[100px] text-lg"
                  />
                </div>

                {/* Message Display */}
                {message && (
                  <div className="p-4 rounded-lg bg-gray-50 border">
                    <p className={`text-sm ${
                      message.includes('sent') || message.includes('confirmed') || message.includes('✅')
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {message}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !isOTPVerified}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl py-6 h-16"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Now'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
