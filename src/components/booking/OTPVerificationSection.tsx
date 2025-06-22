
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OTPVerificationSectionProps {
  isOTPSent: boolean;
  enteredOTP: string;
  setEnteredOTP: (otp: string) => void;
  onResendOTP: () => void;
  isSubmitting: boolean;
  otpExpiry: Date | null;
}

const OTPVerificationSection = ({ 
  isOTPSent, 
  enteredOTP, 
  setEnteredOTP, 
  onResendOTP, 
  isSubmitting, 
  otpExpiry 
}: OTPVerificationSectionProps) => {
  if (!isOTPSent) return null;

  return (
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
          onClick={onResendOTP}
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
  );
};

export default OTPVerificationSection;
