
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
  deviceInfo?: string;
}

const STORAGE_KEY = 'taxi_bookings';
const BACKUP_KEY = 'taxi_bookings_backup';

// Enhanced localStorage operations with error handling and backup
const safeGetItem = (key: string): string | null => {
  try {
    const item = localStorage.getItem(key);
    console.log(`Retrieved from ${key}:`, item ? JSON.parse(item) : null);
    return item;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
};

const safeSetItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    console.log(`Saved to ${key}:`, JSON.parse(value));
    return true;
  } catch (error) {
    console.error(`Error saving to ${key}:`, error);
    return false;
  }
};

export const saveBooking = (bookingData: Omit<BookingData, 'id' | 'createdAt' | 'status'>): BookingData => {
  const booking: BookingData = {
    ...bookingData,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    deviceInfo: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
  };

  try {
    const existingBookings = getBookings();
    const updatedBookings = [...existingBookings, booking];
    
    // Save to primary storage
    const primarySaved = safeSetItem(STORAGE_KEY, JSON.stringify(updatedBookings));
    
    // Save backup
    safeSetItem(BACKUP_KEY, JSON.stringify(updatedBookings));
    
    if (!primarySaved) {
      throw new Error('Failed to save booking to primary storage');
    }
    
    console.log('Booking saved successfully:', booking);
    console.log('Total bookings in storage:', updatedBookings.length);
    
    // Trigger storage event for cross-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(updatedBookings),
      storageArea: localStorage
    }));
    
    return booking;
  } catch (error) {
    console.error('Error saving booking:', error);
    throw new Error('Failed to save booking');
  }
};

export const getBookings = (): BookingData[] => {
  try {
    // Try primary storage first
    let bookingsData = safeGetItem(STORAGE_KEY);
    
    // If primary fails, try backup
    if (!bookingsData) {
      console.warn('Primary storage failed, trying backup...');
      bookingsData = safeGetItem(BACKUP_KEY);
    }
    
    if (!bookingsData) {
      console.log('No bookings found in storage');
      return [];
    }
    
    const parsed = JSON.parse(bookingsData);
    const bookings = Array.isArray(parsed) ? parsed : [];
    
    console.log('Retrieved bookings from storage:', bookings);
    console.log('Total bookings found:', bookings.length);
    
    // Validate booking structure
    const validBookings = bookings.filter(booking => 
      booking && 
      typeof booking === 'object' && 
      booking.id && 
      booking.contactName
    );
    
    if (validBookings.length !== bookings.length) {
      console.warn(`Filtered out ${bookings.length - validBookings.length} invalid bookings`);
    }
    
    return validBookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
};

export const updateBookingStatus = (id: string, status: BookingData['status'], adminRemarks?: string): void => {
  try {
    const bookings = getBookings();
    const bookingIndex = bookings.findIndex(b => b.id === id);
    
    if (bookingIndex === -1) {
      throw new Error(`Booking with id ${id} not found`);
    }
    
    bookings[bookingIndex].status = status;
    if (adminRemarks !== undefined) {
      bookings[bookingIndex].adminRemarks = adminRemarks;
    }
    
    // Save to both primary and backup
    const primarySaved = safeSetItem(STORAGE_KEY, JSON.stringify(bookings));
    safeSetItem(BACKUP_KEY, JSON.stringify(bookings));
    
    if (!primarySaved) {
      throw new Error('Failed to update booking in primary storage');
    }
    
    console.log('Booking status updated:', id, status);
    
    // Trigger storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(bookings),
      storageArea: localStorage
    }));
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw new Error('Failed to update booking status');
  }
};

// Function to clear all data (for debugging)
export const clearAllBookings = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BACKUP_KEY);
    console.log('All bookings cleared');
  } catch (error) {
    console.error('Error clearing bookings:', error);
  }
};

// Function to get storage info for debugging
export const getStorageInfo = () => {
  return {
    primary: safeGetItem(STORAGE_KEY),
    backup: safeGetItem(BACKUP_KEY),
    userAgent: navigator.userAgent,
    isMobile: navigator.userAgent.includes('Mobile'),
    storageAvailable: typeof(Storage) !== "undefined"
  };
};
