
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { bookingAPI, contactAPI } from "@/utils/apiService";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Calendar, MessageSquare, RefreshCw } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DateFilter } from "@/components/admin/DateFilter";
import { BookingsList } from "@/components/admin/BookingsList";
import { ContactsList } from "@/components/admin/ContactsList";

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

interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  device_info: string | null;
  timestamp: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts'>('bookings');
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now());
  const [previousBookingsCount, setPreviousBookingsCount] = useState(0);
  const [previousContactsCount, setPreviousContactsCount] = useState(0);
  const [buzzerEnabled, setBuzzerEnabled] = useState(true);
  const { logout, isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const { toast } = useToast();

  // Play buzzer sound using the global function
  const playBuzzer = useCallback(() => {
    if (buzzerEnabled && (window as any).playAdminBuzzer) {
      (window as any).playAdminBuzzer();
    }
  }, [buzzerEnabled]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/admin';
    }
  }, [isAuthenticated, authLoading]);

  // Enhanced data loading function using MySQL API
  const loadAllData = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    
    try {
      // Load bookings from MySQL
      const bookingsResponse = await bookingAPI.getAll();
      const bookingsData = bookingsResponse.bookings || [];
      
      // Load contacts from MySQL
      const contactsResponse = await contactAPI.getAll();
      const contactsData = contactsResponse.contacts || [];
      
      // Check for new bookings and contacts for buzzer
      const newBookingsCount = bookingsData.length;
      const newContactsCount = contactsData.filter((c: ContactData) => c.status === 'new').length;
      
      if (previousBookingsCount > 0 && newBookingsCount > previousBookingsCount) {
        playBuzzer();
        toast({
          title: "New Booking Received",
          description: "A new booking has been submitted.",
        });
      }
      
      if (previousContactsCount > 0 && newContactsCount > previousContactsCount) {
        playBuzzer();
        toast({
          title: "New Contact Message",
          description: "A new contact message has been received.",
        });
      }
      
      setPreviousBookingsCount(newBookingsCount);
      setPreviousContactsCount(newContactsCount);
      
      setBookings(bookingsData);
      setContacts(contactsData);
      
      // Set up remarks state
      const remarksState: { [key: string]: string } = {};
      bookingsData.forEach((booking: BookingData) => {
        remarksState[booking.id] = booking.admin_remarks || '';
      });
      setRemarks(remarksState);
      
      setLastRefresh(Date.now());
      
    } catch (error) {
      console.error('Error loading data from MySQL:', error);
      toast({
        title: "Data Loading Error",
        description: "Failed to load data from database. Please try refreshing.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, isAuthenticated, previousBookingsCount, previousContactsCount, playBuzzer]);

  // Initial data load and periodic refresh
  useEffect(() => {
    if (!isAuthenticated) return;

    loadAllData();
    
    const interval = setInterval(loadAllData, 30000); // 30 seconds
    
    const handleFocus = () => {
      loadAllData();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadAllData, isAuthenticated]);

  const handleRefresh = () => {
    loadAllData();
  };

  const handleLogout = () => {
    logout();
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      await bookingAPI.updateStatus(bookingId, 'confirmed', remarks[bookingId] || '');

      toast({
        title: "Booking Confirmed",
        description: "Booking has been confirmed successfully.",
      });

      loadAllData();
    } catch (error) {
      console.error('Error confirming booking:', error);
      toast({
        title: "Error",
        description: "Failed to confirm booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSaveRemarks = async (bookingId: string) => {
    try {
      await bookingAPI.saveRemarks(bookingId, remarks[bookingId] || '');

      toast({
        title: "Remarks Saved",
        description: "Admin remarks have been saved successfully.",
      });

      loadAllData();
    } catch (error) {
      console.error('Error saving remarks:', error);
      toast({
        title: "Error",
        description: "Failed to save remarks. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleMarkContactAsRead = async (contactId: string) => {
    try {
      await contactAPI.markAsRead(contactId);

      toast({
        title: "Message Marked as Read",
        description: "Contact message has been marked as read.",
      });

      loadAllData();
    } catch (error) {
      console.error('Error marking contact as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark message as read. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRemarksChange = (bookingId: string, value: string) => {
    setRemarks(prev => ({ ...prev, [bookingId]: value }));
  };

  // Show loading if auth is still loading
  if (authLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Filter data based on date and other filters
  const today = new Date().toISOString().split('T')[0];
  const filterDate = dateFilter || today;

  const filteredBookings = bookings.filter(booking => {
    const statusMatch = filter === 'all' || booking.status === filter;
    const dateMatch = booking.date === filterDate;
    return statusMatch && dateMatch;
  });

  const filteredContacts = contacts.filter(contact => {
    const contactDate = new Date(contact.timestamp).toISOString().split('T')[0];
    return contactDate === filterDate;
  });

  const newContacts = filteredContacts.filter(c => c.status === 'new');

  return (
    <div className="admin-dashboard-container min-h-screen w-full bg-gray-50">
      <AdminHeader
        isLoading={isLoading}
        lastRefresh={lastRefresh}
        buzzerEnabled={buzzerEnabled}
        setBuzzerEnabled={setBuzzerEnabled}
        onRefresh={handleRefresh}
        onLogout={handleLogout}
      />

      <div className="admin-content max-w-7xl mx-auto p-2 sm:p-3 md:p-6 w-full">
        <DateFilter 
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        {/* Tabs */}
        <Card className="mb-3 md:mb-6">
          <CardContent className="p-2 sm:p-3 md:p-4">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:space-x-4">
              <Button 
                variant={activeTab === 'bookings' ? 'default' : 'outline'}
                onClick={() => setActiveTab('bookings')}
                className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm bg-white text-black border-black hover:bg-gray-100"
              >
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Bookings ({filteredBookings.length})</span>
              </Button>
              <Button 
                variant={activeTab === 'contacts' ? 'default' : 'outline'}
                onClick={() => setActiveTab('contacts')}
                className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm bg-white text-black border-black hover:bg-gray-100"
              >
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Messages ({newContacts.length})</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Loading indicator */}
        {isLoading && (
          <Card className="mb-3 md:mb-6">
            <CardContent className="text-center py-4 sm:py-8">
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <p className="text-gray-500 text-xs sm:text-sm">Loading data...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content sections based on active tab */}
        {activeTab === 'bookings' && (
          <BookingsList
            filteredBookings={filteredBookings}
            filter={filter}
            setFilter={setFilter}
            remarks={remarks}
            onRemarksChange={handleRemarksChange}
            onSaveRemarks={handleSaveRemarks}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <ContactsList
            filteredContacts={filteredContacts}
            onMarkContactAsRead={handleMarkContactAsRead}
          />
        )}
      </div>

      <style>{`
        .admin-dashboard-container {
          isolation: isolate;
          touch-action: manipulation;
          -webkit-text-size-adjust: 100%;
        }

        .admin-header {
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .admin-content {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        @media (max-width: 640px) {
          .admin-dashboard-container {
            font-size: 14px;
          }
          
          .admin-content {
            padding-left: 8px;
            padding-right: 8px;
          }
        }

        /* Prevent zoom on input focus for iOS */
        @media screen and (max-width: 767px) {
          input, textarea, select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
