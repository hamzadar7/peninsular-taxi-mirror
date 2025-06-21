
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface OTPVerificationFormProps {
  email: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  message: string;
}

const OTPVerificationForm = ({ email, onVerify, onBack, message }: OTPVerificationFormProps) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <Card className="bg-white shadow-xl max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>Enter the 6-digit code sent to {email}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            onClick={onBack}
          >
            Back to Form
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OTPVerificationForm;
