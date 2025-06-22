
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Clock } from "lucide-react";
import { FormData } from "@/hooks/useBookingForm";
import { RefObject } from "react";

interface TripDetailsSectionProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean) => void;
  isOTPSent: boolean;
  pickupRef: RefObject<HTMLInputElement>;
  destinationRef: RefObject<HTMLInputElement>;
  minDate: string;
}

const TripDetailsSection = ({ 
  formData, 
  onInputChange, 
  isOTPSent, 
  pickupRef, 
  destinationRef, 
  minDate 
}: TripDetailsSectionProps) => {
  return (
    <>
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
            onChange={(e) => onInputChange('pickupAddress', e.target.value)}
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
            onChange={(e) => onInputChange('destination', e.target.value)}
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
            onChange={(e) => onInputChange('date', e.target.value)}
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
            onChange={(e) => onInputChange('time', e.target.value)}
            required
            className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg"
            disabled={isOTPSent}
          />
        </div>
      </div>
    </>
  );
};

export default TripDetailsSection;
