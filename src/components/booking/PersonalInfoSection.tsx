
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/hooks/useBookingForm";

interface PersonalInfoSectionProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean) => void;
  isOTPSent: boolean;
}

const PersonalInfoSection = ({ formData, onInputChange, isOTPSent }: PersonalInfoSectionProps) => {
  return (
    <>
      {/* Personal Information */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="fullName" className="text-sm sm:text-base lg:text-lg font-medium">Full Name *</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => onInputChange('fullName', e.target.value)}
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
            onChange={(e) => onInputChange('phone', e.target.value)}
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
          onChange={(e) => onInputChange('email', e.target.value)}
          required
          className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
          placeholder="Enter your email address"
          disabled={isOTPSent}
        />
      </div>
    </>
  );
};

export default PersonalInfoSection;
