
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
  
  return booking;
};

export const getBookings = (): BookingData[] => {
  const bookings = localStorage.getItem('taxi_bookings');
  return bookings ? JSON.parse(bookings) : [];
};

export const updateBookingStatus = (id: string, status: BookingData['status'], adminRemarks?: string): void => {
  const bookings = getBookings();
  const bookingIndex = bookings.findIndex(b => b.id === id);
  
  if (bookingIndex !== -1) {
    bookings[bookingIndex].status = status;
    if (adminRemarks !== undefined) {
      bookings[bookingIndex].adminRemarks = adminRemarks;
    }
    localStorage.setItem('taxi_bookings', JSON.stringify(bookings));
  }
};
