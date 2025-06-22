
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

interface BookingData {
  id: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  pickup_location: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  vehicle_type: string;
  special_requests: string | null;
  status: string;
  admin_remarks: string | null;
  device_info: string | null;
  created_at: string;
}

interface BookingCardProps {
  booking: BookingData;
  remarks: string;
  onRemarksChange: (value: string) => void;
  onSaveRemarks: () => void;
  onConfirmBooking: () => void;
  showConfirmButton?: boolean;
}

export const BookingCard = ({ 
  booking, 
  remarks, 
  onRemarksChange, 
  onSaveRemarks, 
  onConfirmBooking,
  showConfirmButton = false 
}: BookingCardProps) => {
  const borderColor = booking.status === 'pending' ? 'border-orange-500' : 'border-green-500';

  return (
    <Card className={`border-l-4 ${borderColor}`}>
      <CardContent className="p-3">
        <div className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
              <h4 className="font-semibold text-sm">{booking.contact_name}</h4>
              <p className="text-xs text-gray-600">{booking.contact_phone}</p>
              <p className="text-xs text-gray-600 break-all">{booking.contact_email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs"><strong>From:</strong> {booking.pickup_location}</p>
              <p className="text-xs"><strong>To:</strong> {booking.destination}</p>
              <p className="text-xs"><strong>Date:</strong> {booking.date} at {booking.time}</p>
              <p className="text-xs"><strong>Passengers:</strong> {booking.passengers}</p>
              <p className="text-xs"><strong>Vehicle:</strong> {booking.vehicle_type}</p>
            </div>
          </div>
          {booking.special_requests && (
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-xs"><strong>Special Requests:</strong> {booking.special_requests}</p>
            </div>
          )}
          {booking.admin_remarks && booking.status === 'confirmed' && (
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-xs"><strong>Admin Remarks:</strong> {booking.admin_remarks}</p>
            </div>
          )}
          {showConfirmButton && (
            <div className="space-y-2">
              <Textarea
                placeholder="Admin remarks..."
                value={remarks}
                onChange={(e) => onRemarksChange(e.target.value)}
                className="min-h-[60px] text-xs"
              />
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button 
                  onClick={onSaveRemarks}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto text-xs"
                >
                  Save Remarks
                </Button>
                <Button 
                  onClick={onConfirmBooking}
                  className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-xs"
                  size="sm"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
