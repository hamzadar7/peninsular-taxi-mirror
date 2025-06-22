
export interface BookingData {
  id: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  vehicleType: string;
  specialRequests: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
  adminRemarks?: string;
}

export const saveBooking = (bookingData: Omit<BookingData, 'id' | 'createdAt' | 'status'>): BookingData => {
  const booking: BookingData = {
    ...bookingData,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const existingBookings = getBookings();
  existingBookings.push(booking);
  localStorage.setItem('taxi_bookings', JSON.stringify(existingBookings));
  
  console.log('Booking saved successfully:', booking);
  console.log('All bookings in storage:', existingBookings);
  
  return booking;
};

export const getBookings = (): BookingData[] => {
  try {
    const bookings = localStorage.getItem('taxi_bookings');
    const parsedBookings = bookings ? JSON.parse(bookings) : [];
    console.log('Retrieved bookings from storage:', parsedBookings);
    return parsedBookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
};

export const updateBookingStatus = (id: string, status: BookingData['status'], adminRemarks?: string): void => {
  try {
    const bookings = getBookings();
    const bookingIndex = bookings.findIndex(b => b.id === id);
    
    if (bookingIndex !== -1) {
      bookings[bookingIndex].status = status;
      if (adminRemarks !== undefined) {
        bookings[bookingIndex].adminRemarks = adminRemarks;
      }
      localStorage.setItem('taxi_bookings', JSON.stringify(bookings));
      console.log('Booking status updated:', id, status);
    } else {
      console.error('Booking not found:', id);
    }
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw new Error('Failed to update booking status');
  }
};
