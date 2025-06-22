
import { useState } from 'react';
import { sendOTPEmail, generateOTP } from "@/utils/emailService";
import { useToast } from "@/hooks/use-toast";

export const useOTPVerification = () => {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [otpExpiry, setOtpExpiry] = useState<Date | null>(null);
  const { toast } = useToast();

  const isOTPExpired = () => {
    if (!otpExpiry) return false;
    return new Date() > otpExpiry;
  };

  const sendOTP = async (email: string, name: string) => {
    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 10);
      setOtpExpiry(expiryTime);
      
      console.log('Attempting to send OTP via SMTP2GO...');
      await sendOTPEmail(email, otp, name, false);
      
      setIsOTPSent(true);
      return { success: true };
    } catch (error) {
      console.error('Error sending OTP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const resendOTP = async (email: string, name: string) => {
    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 10);
      setOtpExpiry(expiryTime);
      
      await sendOTPEmail(email, otp, name, false);
      
      setEnteredOTP('');
      return { success: true };
    } catch (error) {
      console.error('Error resending OTP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend OTP. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const verifyOTP = () => {
    if (!enteredOTP.trim()) {
      return { success: false, error: 'Please enter the OTP sent to your email.' };
    }

    if (isOTPExpired()) {
      resetOTP();
      return { success: false, error: 'OTP has expired. Please request a new one.' };
    }

    if (enteredOTP.trim() !== generatedOTP) {
      return { success: false, error: 'Invalid OTP. Please check and try again.' };
    }

    return { success: true };
  };

  const resetOTP = () => {
    setIsOTPSent(false);
    setEnteredOTP('');
    setGeneratedOTP('');
    setOtpExpiry(null);
  };

  return {
    isOTPSent,
    enteredOTP,
    setEnteredOTP,
    otpExpiry,
    sendOTP,
    resendOTP,
    verifyOTP,
    resetOTP,
    isOTPExpired
  };
};
