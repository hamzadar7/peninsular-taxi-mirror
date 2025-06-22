
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle } from "lucide-react";
import { BookingCard } from "./BookingCard";

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

interface BookingsListProps {
  filteredBookings: BookingData[];
  filter: 'all' | 'pending' | 'confirmed';
  setFilter: (filter: 'all' | 'pending' | 'confirmed') => void;
  remarks: { [key: string]: string };
  onRemarksChange: (bookingId: string, value: string) => void;
  onSaveRemarks: (bookingId: string) => void;
  onConfirmBooking: (bookingId: string) => void;
}

export const BookingsList = ({
  filteredBookings,
  filter,
  setFilter,
  remarks,
  onRemarksChange,
  onSaveRemarks,
  onConfirmBooking
}: BookingsListProps) => {
  const pendingBookings = filteredBookings.filter(b => b.status === 'pending');
  const confirmedBookings = filteredBookings.filter(b => b.status === 'confirmed');

  return (
    <div className="space-y-3 md:space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-base sm:text-lg">Status Filters</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="w-full text-xs sm:text-sm"
            >
              All ({filteredBookings.length})
            </Button>
            <Button 
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
              className="w-full text-xs sm:text-sm"
            >
              Pending ({pendingBookings.length})
            </Button>
            <Button 
              variant={filter === 'confirmed' ? 'default' : 'outline'}
              onClick={() => setFilter('confirmed')}
              className="w-full text-xs sm:text-sm"
            >
              Confirmed ({confirmedBookings.length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Bookings */}
      {(filter === 'all' || filter === 'pending') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <Clock className="h-4 w-4 mr-2 text-orange-500" />
              Pending ({pendingBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  remarks={remarks[booking.id] || ''}
                  onRemarksChange={(value) => onRemarksChange(booking.id, value)}
                  onSaveRemarks={() => onSaveRemarks(booking.id)}
                  onConfirmBooking={() => onConfirmBooking(booking.id)}
                  showConfirmButton={true}
                />
              ))}
              {pendingBookings.length === 0 && (
                <p className="text-gray-500 text-center py-8 text-sm">No pending bookings for selected date</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmed Bookings */}
      {(filter === 'all' || filter === 'confirmed') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Confirmed ({confirmedBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {confirmedBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  remarks={remarks[booking.id] || ''}
                  onRemarksChange={(value) => onRemarksChange(booking.id, value)}
                  onSaveRemarks={() => onSaveRemarks(booking.id)}
                  onConfirmBooking={() => onConfirmBooking(booking.id)}
                  showConfirmButton={false}
                />
              ))}
              {confirmedBookings.length === 0 && (
                <p className="text-gray-500 text-center py-8 text-sm">No confirmed bookings for selected date</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
