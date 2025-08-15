
import { useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface BuzzerControlProps {
  buzzerEnabled: boolean;
  setBuzzerEnabled: (enabled: boolean) => void;
}

export const BuzzerControl = ({ buzzerEnabled, setBuzzerEnabled }: BuzzerControlProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio for buzzer with enhanced settings
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+Dyv2McBjiS1/LMeiwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj';
    
    // Enable audio to work even when tab is minimized
    audioRef.current.preload = 'auto';
    audioRef.current.volume = 0.8;
    
    // Request permission for notifications (helps with background audio)
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  // Play buzzer sound with enhanced reliability
  const playBuzzer = useCallback(() => {
    if (buzzerEnabled && audioRef.current) {
      try {
        // Reset audio to beginning
        audioRef.current.currentTime = 0;
        
        // Create a promise to handle play with retry logic
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Buzzer played successfully');
            })
            .catch(error => {
              console.log('Audio play failed, retrying...', error);
              // Retry after user interaction
              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current.play().catch(e => console.log('Retry failed:', e));
                }
              }, 100);
            });
        }
        
        // Show browser notification as backup
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('New booking/contact received!', {
            icon: '/favicon.ico',
            tag: 'admin-notification'
          });
        }
        
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
