
import { useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface BuzzerControlProps {
  buzzerEnabled: boolean;
  setBuzzerEnabled: (enabled: boolean) => void;
}

export const BuzzerControl = ({ buzzerEnabled, setBuzzerEnabled }: BuzzerControlProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio for buzzer
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+Dyv2McBjiS1/LMeiwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj';
    
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  // Play buzzer sound
  const playBuzzer = useCallback(() => {
    if (buzzerEnabled && audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } catch (error) {
        console.log('Buzzer error:', error);
      }
    }
  }, [buzzerEnabled]);

  // Expose playBuzzer function to parent
  useEffect(() => {
    (window as any).playAdminBuzzer = playBuzzer;
    return () => {
      delete (window as any).playAdminBuzzer;
    };
  }, [playBuzzer]);

  return (
    <Button 
      onClick={() => setBuzzerEnabled(!buzzerEnabled)}
      className={`${buzzerEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white font-semibold flex-1 sm:flex-none text-xs sm:text-sm`}
    >
      <Bell className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${buzzerEnabled ? '' : 'opacity-50'}`} />
      <span className="hidden sm:inline">{buzzerEnabled ? 'On' : 'Off'}</span>
    </Button>
  );
};
