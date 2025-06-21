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

  const pickupRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

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
          new window.google.maps.places.Autocomplete(pickupRef.current, {
            componentRestrictions: { country: "au" },
            fields: ["place_id", "geometry", "name", "formatted_address"]
          });

          new window.google.maps.places.Autocomplete(destinationRef.current, {
            componentRestrictions: { country: "au" },
            fields: ["place_id", "geometry", "name", "formatted_address"]
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
      // Generate and send OTP
      const generatedOTP = generateOTP();
      setSentOTP(generatedOTP);
      
      await sendOTPEmail(formData.contactEmail, generatedOTP, formData.contactName);
      setShowOTP(true);
      setMessage("Verification code sent to your email!");
    } catch (error) {
      setMessage("Failed to send verification email. Please try again.");
      console.error("OTP sending failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp === sentOTP) {
      // Save booking
      const booking = saveBooking(formData);
      setMessage("Booking confirmed! We'll contact you shortly.");
      
      // Reset form
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
    } else {
      setMessage("Invalid verification code. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showOTP) {
    return (
      <Card className="bg-white shadow-xl max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>Enter the 6-digit code sent to {formData.contactEmail}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOTPVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input 
                id="otp"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="text-center text-2xl tracking-widest"
              />
            </div>
            {message && (
              <p className={`text-sm ${message.includes('confirmed') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
              Verify & Complete Booking
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => setShowOTP(false)}
            >
              Back to Form
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold text-gray-800">Book Your Taxi</CardTitle>
        <CardDescription className="text-lg text-gray-600">Fill in your details to reserve your ride</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name and Phone Number */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">Full Name *</Label>
              <Input 
                id="name"
                placeholder="Your full name"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold">Phone Number *</Label>
              <Input 
                id="phone"
                type="tel"
                placeholder="+61 XXX XXX XXX"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                required
                className="h-12"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
            <Input 
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              required
              className="h-12"
            />
          </div>

          {/* Pickup and Drop-off Locations */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-base font-semibold">Pickup Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input 
                  ref={pickupRef}
                  id="pickup"
                  placeholder="Enter pickup address"
                  className="pl-10 h-12"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-base font-semibold">Drop-off Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input 
                  ref={destinationRef}
                  id="destination"
                  placeholder="Enter destination address"
                  className="pl-10 h-12"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Pickup Date and Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-base font-semibold">Pickup Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input 
                  id="date"
                  type="date"
                  className="pl-10 h-12"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-base font-semibold">Pickup Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input 
                  id="time"
                  type="time"
                  className="pl-10 h-12"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Type and Number of Passengers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vehicle-type" className="text-base font-semibold">Vehicle Type</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                <SelectTrigger className="h-12">
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
              <Label htmlFor="passengers" className="text-base font-semibold">Number of Passengers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
                  <SelectTrigger className="pl-10 h-12">
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

          {/* Additional Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requests" className="text-base font-semibold">Additional Requirements (Optional)</Label>
            <Textarea 
              id="requests"
              placeholder="Any special requirements, wheelchair access, child seats, etc."
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-lg py-6 font-bold"
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
