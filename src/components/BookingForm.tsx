import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    vehicleType: "",
    specialRequests: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [sentOTP, setSentOTP] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const pickupRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const pickupAutocomplete = useRef<any>(null);
  const destinationAutocomplete = useRef<any>(null);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const initializeGooglePlaces = async () => {
      try {
        const loader = new Loader({
          apiKey: "AIzaSyCHK0sH0JnLcDtzNCZEekkUHJlPHwAKIH4",
          version: "weekly",
          libraries: ["places"]
        });

        await loader.load();

        if (pickupRef.current && destinationRef.current && window.google) {
          // Initialize pickup autocomplete
          pickupAutocomplete.current = new window.google.maps.places.Autocomplete(pickupRef.current, {
            componentRestrictions: { country: "au" },
            fields: ["place_id", "geometry", "name", "formatted_address"]
          });

          // Initialize destination autocomplete
          destinationAutocomplete.current = new window.google.maps.places.Autocomplete(destinationRef.current, {
            componentRestrictions: { country: "au" },
            fields: ["place_id", "geometry", "name", "formatted_address"]
          });

          // Add listeners to handle place selection
          pickupAutocomplete.current.addListener('place_changed', () => {
            const place = pickupAutocomplete.current.getPlace();
            if (place && place.formatted_address) {
              setFormData(prev => ({ ...prev, pickupLocation: place.formatted_address }));
            }
          });

          destinationAutocomplete.current.addListener('place_changed', () => {
            const place = destinationAutocomplete.current.getPlace();
            if (place && place.formatted_address) {
              setFormData(prev => ({ ...prev, destination: place.formatted_address }));
            }
          });
        }
      } catch (error) {
        console.error("Google Places API loading failed:", error);
      }
    };

    initializeGooglePlaces();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      console.log("Starting OTP send process...");
      console.log("Form data:", {
        name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone
      });

      // Validate email format before sending
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactEmail)) {
        throw new Error("Please enter a valid email address.");
      }

      // Generate and send OTP
      const generatedOTP = generateOTP();
      setSentOTP(generatedOTP);
      
      console.log("Attempting to send OTP to:", formData.contactEmail);
      
      const result = await sendOTPEmail(formData.contactEmail, generatedOTP, formData.contactName);
      
      console.log("Email send result:", result);
      
      if (result && result.success) {
        setMessage("✅ Verification code sent successfully! Please check your email inbox and spam folder.");
        setShowOTP(true);
        setRetryCount(0);
      } else {
        throw new Error("Failed to send verification email. Please try again.");
      }
      
    } catch (error) {
      console.error("Email sending error:", error);
      setRetryCount(prev => prev + 1);
      
      let errorMessage = error.message || "Failed to send verification email.";
      
      if (retryCount < 2) {
        setMessage(`❌ ${errorMessage} Retrying... (Attempt ${retryCount + 1}/3)`);
        // Auto-retry after 3 seconds
        setTimeout(() => {
          handleSubmit(e);
        }, 3000);
      } else {
        setMessage(`❌ ${errorMessage} Please check your email address or call us directly at +61 408 202 034.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Verifying OTP:", { entered: otp, expected: sentOTP });
    
    if (otp === sentOTP) {
      // Save booking
      const booking = saveBooking(formData);
      console.log("Booking saved:", booking);
      
      setMessage("🎉 Booking confirmed! We'll contact you shortly to confirm details and pickup time.");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          pickupLocation: "",
          destination: "",
          date: "",
          time: "",
          passengers: "",
          vehicleType: "",
          specialRequests: "",
          contactName: "",
          contactPhone: "",
          contactEmail: ""
        });
        setShowOTP(false);
        setOtp("");
        setSentOTP("");
        setRetryCount(0);
        setMessage("");
      }, 3000);
    } else {
      setMessage("❌ Invalid verification code. Please check your email and try again.");
    }
  };

  const handleResendOTP = async () => {
    setIsSubmitting(true);
    setMessage("Sending new verification code...");
    
    try {
      const generatedOTP = generateOTP();
      setSentOTP(generatedOTP);
      
      const result = await sendOTPEmail(formData.contactEmail, generatedOTP, formData.contactName);
      
      if (result && result.success) {
        setMessage("✅ New verification code sent to your email!");
      } else {
        throw new Error("Failed to send verification code.");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setMessage("❌ Failed to resend verification code. Please try again or call +61 408 202 034.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showOTP) {
    return (
      <Card className="bg-white shadow-xl max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">Verify Your Email</CardTitle>
          <CardDescription className="text-sm sm:text-base">Enter the 6-digit code sent to {formData.contactEmail}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleOTPVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-base font-semibold">Verification Code</Label>
              <Input 
                id="otp"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="text-center text-xl sm:text-2xl tracking-widest h-12"
              />
            </div>
            {message && (
              <p className={`text-sm ${message.includes('confirmed') || message.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-12">
              Verify & Complete Booking
            </Button>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 h-10"
                onClick={() => setShowOTP(false)}
              >
                Back to Form
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 h-10"
                onClick={handleResendOTP}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Resend Code"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader className="text-center pb-6 sm:pb-8">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Book Your Taxi</CardTitle>
        <CardDescription className="text-base sm:text-lg text-gray-600">Fill in your details to reserve your ride</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Contact Information */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm sm:text-base font-semibold">Full Name *</Label>
              <Input 
                id="name"
                placeholder="Your full name"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                required
                className="h-10 sm:h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base font-semibold">Phone Number *</Label>
              <Input 
                id="phone"
                type="tel"
                placeholder="+61 XXX XXX XXX"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                required
                className="h-10 sm:h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base font-semibold">Email Address *</Label>
            <Input 
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              required
              className="h-10 sm:h-12"
            />
          </div>

          {/* Location Information */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-sm sm:text-base font-semibold">Pickup Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 sm:top-4 h-4 w-4 text-gray-400" />
                <Input 
                  ref={pickupRef}
                  id="pickup"
                  placeholder="Enter pickup address"
                  className="pl-10 h-10 sm:h-12"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm sm:text-base font-semibold">Drop-off Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 sm:top-4 h-4 w-4 text-gray-400" />
                <Input 
                  ref={destinationRef}
                  id="destination"
                  placeholder="Enter destination address"
                  className="pl-10 h-10 sm:h-12"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm sm:text-base font-semibold">Pickup Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 sm:top-4 h-4 w-4 text-gray-400" />
                <Input 
                  id="date"
                  type="date"
                  className="pl-10 h-10 sm:h-12"
                  value={formData.date}
                  min={today}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm sm:text-base font-semibold">Pickup Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 sm:top-4 h-4 w-4 text-gray-400" />
                <Input 
                  id="time"
                  type="time"
                  className="pl-10 h-10 sm:h-12"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle and Passengers */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="vehicle-type" className="text-sm sm:text-base font-semibold">Vehicle Type</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                <SelectTrigger className="h-10 sm:h-12">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="maxi">Maxi Taxi</SelectItem>
                  <SelectItem value="wagon">Wagon</SelectItem>
                  <SelectItem value="accessible">Accessible Taxi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers" className="text-sm sm:text-base font-semibold">Number of Passengers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 sm:top-4 h-4 w-4 text-gray-400" />
                <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
                  <SelectTrigger className="pl-10 h-10 sm:h-12">
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

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="requests" className="text-sm sm:text-base font-semibold">Additional Requirements (Optional)</Label>
            <Textarea 
              id="requests"
              placeholder="Any special requirements, wheelchair access, child seats, etc."
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              className="min-h-[80px] sm:min-h-[100px]"
            />
          </div>

          {message && (
            <p className={`text-sm ${
              message.includes('sent') || message.includes('confirmed') 
                ? 'text-green-600' 
                : message.includes('Retrying') 
                  ? 'text-yellow-600' 
                  : 'text-red-600'
            }`}>
              {message}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-base sm:text-lg py-4 sm:py-6 font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Proceed to Verification"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
