
import { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    google: any;
  }
}

export const useGoogleMapsAutocomplete = (
  onPickupChange: (address: string) => void,
  onDestinationChange: (address: string) => void
) => {
  const { toast } = useToast();
  const pickupRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        console.log('Initializing Google Maps autocomplete...');
        const loader = new Loader({
          apiKey: "AIzaSyCHK0sH0JnLcDtzNCZEekkUHJlPHwAKIH4",
          version: "weekly",
          libraries: ["places"]
        });

        const google = await loader.load();
        console.log('Google Maps loaded successfully');
        
        if (pickupRef.current) {
          const pickupAutocomplete = new google.maps.places.Autocomplete(pickupRef.current, {
            componentRestrictions: { country: "AU" },
            fields: ["address_components", "geometry", "formatted_address"]
          });
          
          pickupAutocomplete.addListener("place_changed", () => {
            const place = pickupAutocomplete.getPlace();
            console.log('Pickup place selected:', place);
            if (place.formatted_address) {
              onPickupChange(place.formatted_address);
            }
          });
          console.log('Pickup autocomplete initialized');
        }

        if (destinationRef.current) {
          const destinationAutocomplete = new google.maps.places.Autocomplete(destinationRef.current, {
            componentRestrictions: { country: "AU" },
            fields: ["address_components", "geometry", "formatted_address"]
          });
          
          destinationAutocomplete.addListener("place_changed", () => {
            const place = destinationAutocomplete.getPlace();
            console.log('Destination place selected:', place);
            if (place.formatted_address) {
              onDestinationChange(place.formatted_address);
            }
          });
          console.log('Destination autocomplete initialized');
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        toast({
          title: "Maps Loading Error",
          description: "Google Maps autocomplete failed to load. You can still enter addresses manually.",
          variant: "destructive"
        });
      }
    };

    initAutocomplete();
  }, [toast, onPickupChange, onDestinationChange]);

  return { pickupRef, destinationRef };
};
