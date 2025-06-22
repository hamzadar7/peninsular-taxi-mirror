
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/hooks/useBookingForm";

interface AdditionalOptionsSectionProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean) => void;
  isOTPSent: boolean;
  minDate: string;
}

const AdditionalOptionsSection = ({ formData, onInputChange, isOTPSent, minDate }: AdditionalOptionsSectionProps) => {
  return (
    <>
      {/* Return Journey */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="returnJourney"
            checked={formData.returnJourney}
            onChange={(e) => onInputChange('returnJourney', e.target.checked)}
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
                onChange={(e) => onInputChange('returnDate', e.target.value)}
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
                onChange={(e) => onInputChange('returnTime', e.target.value)}
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
          onChange={(e) => onInputChange('specialRequests', e.target.value)}
          placeholder="Any special requirements or notes..."
          className="min-h-[80px] sm:min-h-[90px] lg:min-h-[100px] text-sm sm:text-base lg:text-lg"
          disabled={isOTPSent}
        />
      </div>
    </>
  );
};

export default AdditionalOptionsSection;
