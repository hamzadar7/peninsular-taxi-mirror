
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw } from "lucide-react";
import { BuzzerControl } from "./BuzzerControl";

interface AdminHeaderProps {
  isLoading: boolean;
  lastRefresh: number;
  buzzerEnabled: boolean;
  setBuzzerEnabled: (enabled: boolean) => void;
  onRefresh: () => void;
  onLogout: () => void;
}

export const AdminHeader = ({
  isLoading,
  lastRefresh,
  buzzerEnabled,
  setBuzzerEnabled,
  onRefresh,
  onLogout
}: AdminHeaderProps) => {
  return (
    <div className="admin-header bg-black text-white p-2 sm:p-3 md:p-4 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
              <img 
                src="/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png" 
                alt="Capelsound Taxi" 
                className="h-6 sm:h-8 md:h-12 w-auto flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg md:text-2xl font-bold truncate">Capelsound Taxi - Admin</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <BuzzerControl 
                buzzerEnabled={buzzerEnabled}
                setBuzzerEnabled={setBuzzerEnabled}
              />
              <Button 
                onClick={onRefresh} 
                disabled={isLoading}
                className="bg-white text-black hover:bg-gray-100 font-semibold flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button 
                onClick={onLogout} 
                className="bg-white text-black hover:bg-gray-100 font-semibold flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-gray-300">
            <div>
              {isLoading ? 'Loading...' : `Last updated: ${new Date(lastRefresh).toLocaleTimeString()}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
