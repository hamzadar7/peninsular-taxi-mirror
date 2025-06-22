
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useGoogleMapsAutocomplete } from "@/hooks/useGoogleMapsAutocomplete";
import { useOTPVerification } from "@/hooks/useOTPVerification";
import PersonalInfoSection from "./booking/PersonalInfoSection";
import TripDetailsSection from "./booking/TripDetailsSection";
import VehicleSelectionSection from "./booking/VehicleSelectionSection";
import AdditionalOptionsSection from "./booking/AdditionalOptionsSection";
import OTPVerificationSection from "./booking/OTPVerificationSection";

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const { formData, handleInputChange, resetForm, validateForm } = useBookingForm();
  const { 
    isOTPSent, 
    enteredOTP, 
    setEnteredOTP, 
    otpExpiry, 
    sendOTP, 
    resendOTP, 
    verifyOTP, 
    resetOTP 
  } = useOTPVerification();

  const { pickupRef, destinationRef } = useGoogleMapsAutocomplete(
    (address) => handleInputChange('pickupAddress', address),
    (address) => handleInputChange('destination', address)
  );

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
        const result = await sendOTP(formData.email, formData.fullName);
        
        if (result.success) {
          setMessage('✅ OTP sent successfully! Please check your email for the verification code.');
          toast({
            title: "OTP Sent Successfully",
            description: "Please check your email for the 6-digit verification code.",
          });
        } else {
          setMessage(`❌ ${result.error}`);
          toast({
            title: "Email Error",
            description: result.error,
            variant: "destructive"
          });
        }
        
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
      
      const verificationResult = verifyOTP();
      if (!verificationResult.success) {
        setMessage(verificationResult.error);
        toast({
          title: verificationResult.error.includes('expired') ? "OTP Expired" : "Invalid OTP",
          description: verificationResult.error,
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
        resetForm();
        resetOTP();
        
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
      const result = await resendOTP(formData.email, formData.fullName);
      
      if (result.success) {
        setMessage('✅ New OTP sent to your email.');
        toast({
          title: "OTP Resent",
          description: "A new verification code has been sent to your email.",
        });
      } else {
        setMessage(`❌ ${result.error}`);
        toast({
          title: "Resend Error",
          description: result.error,
          variant: "destructive"
        });
      }
      
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
                <PersonalInfoSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                  isOTPSent={isOTPSent}
                />

                <TripDetailsSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                  isOTPSent={isOTPSent}
                  pickupRef={pickupRef}
                  destinationRef={destinationRef}
                  minDate={minDate}
                />

                <VehicleSelectionSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                  isOTPSent={isOTPSent}
                />

                <AdditionalOptionsSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                  isOTPSent={isOTPSent}
                  minDate={minDate}
                />

                <OTPVerificationSection 
                  isOTPSent={isOTPSent}
                  enteredOTP={enteredOTP}
                  setEnteredOTP={setEnteredOTP}
                  onResendOTP={handleResendOTP}
                  isSubmitting={isSubmitting}
                  otpExpiry={otpExpiry}
                />

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
