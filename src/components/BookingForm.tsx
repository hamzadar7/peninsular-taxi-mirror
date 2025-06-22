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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [otpExpiry, setOtpExpiry] = useState<Date | null>(null);

  const { toast } = useToast();
  const pickupRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  // Google Maps Autocomplete Setup
  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        console.log('Initializing Google Maps autocomplete...');
        const loader = new Loader({
          apiKey: "AIzaSyCHK0sH0JnLcDtzNCZEekkUHJlPHwAKIH4",
          version: "weekly",
          libraries: ["places"]
        });

        const google = await loader.load();
        console.log('Google Maps loaded successfully');
        
        if (pickupRef.current) {
          const pickupAutocomplete = new google.maps.places.Autocomplete(pickupRef.current, {
            componentRestrictions: { country: "AU" },
            fields: ["address_components", "geometry", "formatted_address"]
          });
          
          pickupAutocomplete.addListener("place_changed", () => {
            const place = pickupAutocomplete.getPlace();
            console.log('Pickup place selected:', place);
            if (place.formatted_address) {
              setFormData(prev => ({
                ...prev,
                pickupAddress: place.formatted_address
              }));
            }
          });
          console.log('Pickup autocomplete initialized');
        }

        if (destinationRef.current) {
          const destinationAutocomplete = new google.maps.places.Autocomplete(destinationRef.current, {
            componentRestrictions: { country: "AU" },
            fields: ["address_components", "geometry", "formatted_address"]
          });
          
          destinationAutocomplete.addListener("place_changed", () => {
            const place = destinationAutocomplete.getPlace();
            console.log('Destination place selected:', place);
            if (place.formatted_address) {
              setFormData(prev => ({
                ...prev,
                destination: place.formatted_address
              }));
            }
          });
          console.log('Destination autocomplete initialized');
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        toast({
          title: "Maps Loading Error",
          description: "Google Maps autocomplete failed to load. You can still enter addresses manually.",
          variant: "destructive"
        });
      }
    };

    initAutocomplete();
  }, [toast]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    console.log('Validating form data:', formData);
    
    if (!formData.fullName.trim()) return 'Full name is required.';
    if (!formData.phone.trim()) return 'Phone number is required.';
    if (!formData.email.trim()) return 'Email address is required.';
    if (!formData.pickupAddress.trim()) return 'Pickup address is required.';
    if (!formData.destination.trim()) return 'Destination is required.';
    if (!formData.date) return 'Pickup date is required.';
    if (!formData.time) return 'Pickup time is required.';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address.';
    
    // Phone validation (basic)
    if (formData.phone.length < 10) return 'Please enter a valid phone number.';
    
    if (formData.returnJourney) {
      if (!formData.returnDate) return 'Return date is required for return journey.';
      if (!formData.returnTime) return 'Return time is required for return journey.';
    }
    
    return null;
  };

  const isOTPExpired = () => {
    if (!otpExpiry) return false;
    return new Date() > otpExpiry;
  };

  const saveBookingToSupabase = async (bookingData: any) => {
    try {
      console.log('Saving booking to Supabase:', bookingData);
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          contact_name: bookingData.contactName,
          contact_phone: bookingData.contactPhone,
          contact_email: bookingData.contactEmail,
          pickup_location: bookingData.pickupLocation,
          destination: bookingData.destination,
          date: bookingData.date,
          time: bookingData.time,
          passengers: bookingData.passengers,
          vehicle_type: bookingData.vehicleType,
          special_requests: bookingData.specialRequests || '',
          device_info: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop',
          status: 'pending'
        }])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('Booking saved successfully to Supabase:', data);
      return data;
    } catch (error) {
      console.error('Error saving booking to Supabase:', error);
      throw new Error('Failed to save booking to database');
    }
  };

  const handleVerifyAndBook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setMessage('');
    
    if (!isOTPSent) {
      console.log('Step 1: Validating form and sending OTP');
      
      const validationError = validateForm();
      if (validationError) {
        setMessage(validationError);
        toast({
          title: "Validation Error",
          description: validationError,
          variant: "destructive"
        });
        return;
      }

      setIsSubmitting(true);
      try {
        const otp = generateOTP();
        setGeneratedOTP(otp);
        
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 10);
        setOtpExpiry(expiryTime);
        
        console.log('Attempting to send OTP via SMTP2GO...');
        await sendOTPEmail(formData.email, otp, formData.fullName);
        
        setIsOTPSent(true);
        setMessage('✅ OTP sent successfully! Please check your email for the verification code.');
        toast({
          title: "OTP Sent Successfully",
          description: "Please check your email for the 6-digit verification code.",
        });
        
      } catch (error) {
        console.error('Error sending OTP:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
        setMessage(`❌ ${errorMessage}`);
        toast({
          title: "Email Error",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Step 2: Verifying OTP and completing booking');
      
      if (!enteredOTP.trim()) {
        const errorMsg = 'Please enter the OTP sent to your email.';
        setMessage(errorMsg);
        toast({
          title: "OTP Required",
          description: errorMsg,
          variant: "destructive"
        });
        return;
      }

      if (isOTPExpired()) {
        const errorMsg = 'OTP has expired. Please request a new one.';
        setMessage(errorMsg);
        setIsOTPSent(false);
        setEnteredOTP('');
        setGeneratedOTP('');
        setOtpExpiry(null);
        toast({
          title: "OTP Expired",
          description: errorMsg,
          variant: "destructive"
        });
        return;
      }

      if (enteredOTP.trim() !== generatedOTP) {
        const errorMsg = 'Invalid OTP. Please check and try again.';
        setMessage(errorMsg);
        toast({
          title: "Invalid OTP",
          description: errorMsg,
          variant: "destructive"
        });
        return;
      }

      setIsSubmitting(true);
      try {
        const bookingData = {
          contactName: formData.fullName,
          contactPhone: formData.phone,
          contactEmail: formData.email,
          pickupLocation: formData.pickupAddress,
          destination: formData.destination,
          date: formData.date,
          time: formData.time,
          passengers: formData.passengers,
          vehicleType: formData.vehicleType,
          specialRequests: formData.specialRequests
        };
        
        console.log('Saving booking to Supabase...');
        await saveBookingToSupabase(bookingData);
        
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
        setEnteredOTP('');
        setGeneratedOTP('');
        setOtpExpiry(null);
        
        const successMsg = '✅ Booking confirmed successfully! We will contact you shortly with further details.';
        setMessage(successMsg);
        toast({
          title: "Booking Confirmed",
          description: "Your taxi booking has been confirmed and saved to our system!",
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
      } catch (error) {
        console.error('Error confirming booking:', error);
        const errorMsg = 'Error confirming booking. Please try again or contact us directly.';
        setMessage(`❌ ${errorMsg}`);
        toast({
          title: "Booking Error",
          description: errorMsg,
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleResendOTP = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 10);
      setOtpExpiry(expiryTime);
      
      await sendOTPEmail(formData.email, otp, formData.fullName);
      
      setMessage('✅ New OTP sent to your email.');
      setEnteredOTP('');
      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });
      
    } catch (error) {
      console.error('Error resending OTP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend OTP. Please try again.';
      setMessage(`❌ ${errorMessage}`);
      toast({
        title: "Resend Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 lg:py-12">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">Book Your Taxi</h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-2">
              Fill out the form below and we'll confirm your booking shortly
            </p>
          </div>

          <Card id="booking-form" className="shadow-xl">
            <CardHeader className="bg-yellow-400 text-black py-3 sm:py-4 lg:py-6">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-center">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-8">
              <form onSubmit={handleVerifyAndBook} className="space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Personal Information */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="fullName" className="text-sm sm:text-base lg:text-lg font-medium">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                      placeholder="Enter your full name"
                      disabled={isOTPSent}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base lg:text-lg font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                      placeholder="Enter your phone number"
                      disabled={isOTPSent}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base lg:text-lg font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                    placeholder="Enter your email address"
                    disabled={isOTPSent}
                  />
                </div>

                {/* Trip Details with Google Maps Autocomplete */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="pickup" className="text-sm sm:text-base lg:text-lg font-medium flex items-center">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-yellow-400" />
                      Pickup Address *
                    </Label>
                    <Input
                      id="pickup"
                      ref={pickupRef}
                      type="text"
                      value={formData.pickupAddress}
                      onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                      required
                      className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                      placeholder="Start typing your pickup address..."
                      disabled={isOTPSent}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="destination" className="text-sm sm:text-base lg:text-lg font-medium flex items-center">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-yellow-400" />
                      Destination *
                    </Label>
                    <Input
                      id="destination"
                      ref={destinationRef}
                      type="text"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      required
                      className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                      placeholder="Start typing your destination..."
                      disabled={isOTPSent}
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="date" className="text-sm sm:text-base lg:text-lg font-medium flex items-center">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-yellow-400" />
                      Pickup Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                      className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                      min={minDate}
                      disabled={isOTPSent}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="time" className="text-sm sm:text-base lg:text-lg font-medium flex items-center">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-yellow-400" />
                      Pickup Time *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      required
                      className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                      disabled={isOTPSent}
                    />
                  </div>
                </div>

                {/* Passengers and Vehicle */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="passengers" className="text-sm sm:text-base lg:text-lg font-medium flex items-center">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-yellow-400" />
                      Passengers *
                    </Label>
                    <Select 
                      value={formData.passengers} 
                      onValueChange={(value) => handleInputChange('passengers', value)}
                      disabled={isOTPSent}
                    >
                      <SelectTrigger className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg">
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
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="vehicle" className="text-sm sm:text-base lg:text-lg font-medium">Vehicle Type *</Label>
                    <Select 
                      value={formData.vehicleType} 
                      onValueChange={(value) => handleInputChange('vehicleType', value)}
                      disabled={isOTPSent}
                    >
                      <SelectTrigger className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan (1-4 passengers)</SelectItem>
                        <SelectItem value="suv">SUV (1-6 passengers)</SelectItem>
                        <SelectItem value="maxi-taxi">Maxi Taxi (1-11 passengers)</SelectItem>
                        <SelectItem value="wagon">Wagon (1-4 passengers)</SelectItem>
                        <SelectItem value="accessible-taxi">Accessible Taxi (2 Wheelchairs + Passengers)</SelectItem>
                        <SelectItem value="parcel-delivery">Parcel Delivery (Goods)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Return Journey */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="returnJourney"
                      checked={formData.returnJourney}
                      onChange={(e) => handleInputChange('returnJourney', e.target.checked)}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400"
                      disabled={isOTPSent}
                    />
                    <Label htmlFor="returnJourney" className="text-sm sm:text-base lg:text-lg font-medium">
                      Return Journey Required
                    </Label>
                  </div>

                  {formData.returnJourney && (
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="returnDate" className="text-sm sm:text-base lg:text-lg font-medium">Return Date *</Label>
                        <Input
                          id="returnDate"
                          type="date"
                          value={formData.returnDate}
                          onChange={(e) => handleInputChange('returnDate', e.target.value)}
                          required={formData.returnJourney}
                          className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                          min={formData.date || minDate}
                          disabled={isOTPSent}
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="returnTime" className="text-sm sm:text-base lg:text-lg font-medium">Return Time *</Label>
                        <Input
                          id="returnTime"
                          type="time"
                          value={formData.returnTime}
                          onChange={(e) => handleInputChange('returnTime', e.target.value)}
                          required={formData.returnJourney}
                          className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                          disabled={isOTPSent}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Requests */}
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="specialRequests" className="text-sm sm:text-base lg:text-lg font-medium">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Any special requirements or notes..."
                    className="min-h-[80px] sm:min-h-[90px] lg:min-h-[100px] text-sm sm:text-base lg:text-lg"
                    disabled={isOTPSent}
                  />
                </div>

                {/* OTP Entry */}
                {isOTPSent && (
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="otp" className="text-sm sm:text-base lg:text-lg font-medium">Enter OTP *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="otp"
                        type="text"
                        value={enteredOTP}
                        onChange={(e) => setEnteredOTP(e.target.value.replace(/\D/g, '').substring(0, 6))}
                        className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleResendOTP}
                        disabled={isSubmitting}
                        className="whitespace-nowrap"
                      >
                        Resend OTP
                      </Button>
                    </div>
                    {otpExpiry && (
                      <p className="text-xs text-gray-500">
                        OTP expires at: {otpExpiry.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                )}

                {/* Message Display */}
                {message && (
                  <div className="p-3 sm:p-4 rounded-lg bg-gray-50 border">
                    <p className={`text-xs sm:text-sm ${
                      message.includes('✅') || message.includes('sent') || message.includes('confirmed')
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
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base sm:text-lg lg:text-xl py-4 sm:py-5 lg:py-6 h-12 sm:h-14 lg:h-16"
                >
                  {isSubmitting ? 'Processing...' : 
                   isOTPSent ? 'Confirm Booking' : 'Send Verification Code'}
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
