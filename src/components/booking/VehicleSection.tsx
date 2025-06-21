
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "lucide-react";

interface VehicleSectionProps {
  vehicleType: string;
  passengers: string;
  specialRequests: string;
  onInputChange: (field: string, value: string) => void;
}

const VehicleSection = ({ vehicleType, passengers, specialRequests, onInputChange }: VehicleSectionProps) => {
  return (
    <>
      {/* Vehicle Type and Number of Passengers */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="vehicle-type" className="text-base font-semibold">Vehicle Type</Label>
          <Select value={vehicleType} onValueChange={(value) => onInputChange('vehicleType', value)}>
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
            <Select value={passengers} onValueChange={(value) => onInputChange('passengers', value)}>
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
          value={specialRequests}
          onChange={(e) => onInputChange('specialRequests', e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </>
  );
};

export default VehicleSection;
