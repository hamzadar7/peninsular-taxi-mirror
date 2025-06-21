
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { sendOTPEmail, generateOTP } from "@/utils/emailService";
import { saveBooking } from "@/utils/bookingStorage";
import OTPVerificationForm from "./booking/OTPVerificationForm";
import ContactInfoSection from "./booking/ContactInfoSection";
import LocationSection from "./booking/LocationSection";
import DateTimeSection from "./booking/DateTimeSection";
import VehicleSection from "./booking/VehicleSection";

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
  const [sentOTP, setSentOTP] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const initializeGooglePlaces = useCallback(async (pickupRef: React.RefObject<HTMLInputElement>, destinationRef: React.RefObject<HTMLInputElement>) => {
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
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

  const handleOTPVerification = (otp: string) => {
    if (otp === sentOTP) {
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
      <OTPVerificationForm
        email={formData.contactEmail}
        onVerify={handleOTPVerification}
        onBack={() => setShowOTP(false)}
        message={message}
      />
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
          <ContactInfoSection
            contactName={formData.contactName}
            contactPhone={formData.contactPhone}
            contactEmail={formData.contactEmail}
            onInputChange={handleInputChange}
          />

          <LocationSection
            pickupLocation={formData.pickupLocation}
            destination={formData.destination}
            onInputChange={handleInputChange}
            onRefsReady={initializeGooglePlaces}
          />

          <DateTimeSection
            date={formData.date}
            time={formData.time}
            onInputChange={handleInputChange}
          />

          <VehicleSection
            vehicleType={formData.vehicleType}
            passengers={formData.passengers}
            specialRequests={formData.specialRequests}
            onInputChange={handleInputChange}
          />

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
