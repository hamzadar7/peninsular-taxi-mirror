
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useRef } from "react";

interface LocationSectionProps {
  pickupLocation: string;
  destination: string;
  onInputChange: (field: string, value: string) => void;
  onRefsReady: (pickupRef: React.RefObject<HTMLInputElement>, destinationRef: React.RefObject<HTMLInputElement>) => void;
}

const LocationSection = ({ pickupLocation, destination, onInputChange, onRefsReady }: LocationSectionProps) => {
  const pickupRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  // Pass refs to parent component for Google Places initialization
  React.useEffect(() => {
    onRefsReady(pickupRef, destinationRef);
  }, [onRefsReady]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="pickup" className="text-base font-semibold">Pickup Location *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
          <Input 
            ref={pickupRef}
            id="pickup"
            placeholder="Enter pickup address"
            className="pl-10 h-12"
            value={pickupLocation}
            onChange={(e) => onInputChange('pickupLocation', e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="destination" className="text-base font-semibold">Drop-off Location *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
          <Input 
            ref={destinationRef}
            id="destination"
            placeholder="Enter destination address"
            className="pl-10 h-12"
            value={destination}
            onChange={(e) => onInputChange('destination', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
