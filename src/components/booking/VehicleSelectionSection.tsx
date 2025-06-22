
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";
import { FormData } from "@/hooks/useBookingForm";

interface VehicleSelectionSectionProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean) => void;
  isOTPSent: boolean;
}

const VehicleSelectionSection = ({ formData, onInputChange, isOTPSent }: VehicleSelectionSectionProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
      <div className="space-y-1 sm:space-y-2">
        <Label htmlFor="passengers" className="text-sm sm:text-base lg:text-lg font-medium flex items-center">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-yellow-400" />
          Passengers *
        </Label>
        <Select 
          value={formData.passengers} 
          onValueChange={(value) => onInputChange('passengers', value)}
          disabled={isOTPSent}
        >
          <SelectTrigger className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg">
            <SelectValue placeholder="Select passengers" />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5,6,7,8,9,10,11].map(num => (
              <SelectItem key={num} value={num.toString()}>
                {num} {num === 1 ? 'Passenger' : 'Passengers'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 sm:space-y-2">
        <Label htmlFor="vehicle" className="text-sm sm:text-base lg:text-lg font-medium">Vehicle Type *</Label>
        <Select 
          value={formData.vehicleType} 
          onValueChange={(value) => onInputChange('vehicleType', value)}
          disabled={isOTPSent}
        >
          <SelectTrigger className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base lg:text-lg">
            <SelectValue placeholder="Select vehicle type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedan">Sedan (1-4 passengers)</SelectItem>
            <SelectItem value="suv">SUV (1-6 passengers)</SelectItem>
            <SelectItem value="maxi-taxi">Maxi Taxi (1-11 passengers)</SelectItem>
            <SelectItem value="wagon">Wagon (1-4 passengers)</SelectItem>
            <SelectItem value="accessible-taxi">Accessible Taxi (2 Wheelchairs + Passengers)</SelectItem>
            <SelectItem value="parcel-delivery">Parcel Delivery (Goods)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VehicleSelectionSection;
