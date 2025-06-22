import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { LogOut, CheckCircle, Clock, Calendar, MessageSquare, Eye, RefreshCw } from "lucide-react";

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
  const [dateFilter, setDateFilter] = useState('');
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now());
  const { logout, isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/admin';
    }
  }, [isAuthenticated, authLoading]);

  // Enhanced data loading function using Supabase
  const loadAllData = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    
    try {
      // Load bookings from Supabase
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Error loading bookings:', bookingsError);
        throw bookingsError;
      }

      setBookings(bookingsData || []);
      
      // Load contacts from Supabase
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .order('timestamp', { ascending: false });

      if (contactsError) {
        console.error('Error loading contacts:', contactsError);
        throw contactsError;
      }

      setContacts(contactsData || []);
      
      // Set up remarks state
      const remarksState: { [key: string]: string } = {};
      (bookingsData || []).forEach(booking => {
        remarksState[booking.id] = booking.admin_remarks || '';
      });
      setRemarks(remarksState);
      
      setLastRefresh(Date.now());
      
    } catch (error) {
      console.error('Error loading data from Supabase:', error);
      toast({
        title: "Data Loading Error",
        description: "Failed to load data from database. Please try refreshing.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, isAuthenticated]);

  // Real-time subscription for bookings and contacts
  useEffect(() => {
    if (!isAuthenticated) return;

    // Subscribe to bookings changes
    const bookingsSubscription = supabase
      .channel('bookings-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('Bookings real-time update:', payload);
          loadAllData();
        }
      )
      .subscribe();

    // Subscribe to contacts changes
    const contactsSubscription = supabase
      .channel('contacts-channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'contacts' },
        (payload) => {
          console.log('Contacts real-time update:', payload);
          loadAllData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsSubscription);
      supabase.removeChannel(contactsSubscription);
    };
  }, [loadAllData, isAuthenticated]);

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
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'confirmed',
          admin_remarks: remarks[bookingId] || ''
        })
        .eq('id', bookingId);

      if (error) {
        console.error('Error confirming booking:', error);
        throw error;
      }

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
      const { error } = await supabase
        .from('bookings')
        .update({ admin_remarks: remarks[bookingId] || '' })
        .eq('id', bookingId);

      if (error) {
        console.error('Error saving remarks:', error);
        throw error;
      }

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
      const { error } = await supabase
        .from('contacts')
        .update({ status: 'read' })
        .eq('id', contactId);

      if (error) {
        console.error('Error marking contact as read:', error);
        throw error;
      }

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

  const filteredBookings = bookings.filter(booking => {
    const statusMatch = filter === 'all' || booking.status === filter;
    const dateMatch = !dateFilter || booking.date === dateFilter;
    return statusMatch && dateMatch;
  });

  const pendingBookings = filteredBookings.filter(b => b.status === 'pending');
  const confirmedBookings = filteredBookings.filter(b => b.status === 'confirmed');
  const newContacts = contacts.filter(c => c.status === 'new');

  return (
    <div className="admin-dashboard-container min-h-screen w-full bg-gray-50">
      {/* Header */}
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
                <Button 
                  onClick={handleRefresh} 
                  disabled={isLoading}
                  className="bg-white text-black hover:bg-gray-100 font-semibold flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
                <Button 
                  onClick={handleLogout} 
                  className="bg-white text-black hover:bg-gray-100 font-semibold flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-gray-300 space-y-1">
              <div>
                {isLoading ? 'Loading...' : `Last updated: ${new Date(lastRefresh).toLocaleTimeString()}`}
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 text-xs">
                <span>📋 {bookings.length} bookings</span>
                <span>📧 {contacts.length} messages</span>
                <span className="hidden sm:inline">🔄 Real-time updates enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content max-w-7xl mx-auto p-2 sm:p-3 md:p-6 w-full">
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
                <span>Bookings ({bookings.length})</span>
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

        {/* ... keep existing code (bookings and contacts sections remain the same) */}
        
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
          <div className="space-y-3 md:space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button 
                      variant={filter === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilter('all')}
                      className="w-full text-xs sm:text-sm"
                    >
                      All
                    </Button>
                    <Button 
                      variant={filter === 'pending' ? 'default' : 'outline'}
                      onClick={() => setFilter('pending')}
                      className="w-full text-xs sm:text-sm"
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={filter === 'confirmed' ? 'default' : 'outline'}
                      onClick={() => setFilter('confirmed')}
                      className="w-full text-xs sm:text-sm"
                    >
                      Confirmed
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input 
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="flex-1 text-xs sm:text-sm"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setDateFilter('')}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Bookings */}
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
                    <Card key={booking.id} className="border-l-4 border-orange-500">
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
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Admin remarks..."
                              value={remarks[booking.id] || ''}
                              onChange={(e) => setRemarks(prev => ({ ...prev, [booking.id]: e.target.value }))}
                              className="min-h-[60px] text-xs"
                            />
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                              <Button 
                                onClick={() => handleSaveRemarks(booking.id)}
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-auto text-xs"
                              >
                                Save Remarks
                              </Button>
                              <Button 
                                onClick={() => handleConfirmBooking(booking.id)}
                                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-xs"
                                size="sm"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {pendingBookings.length === 0 && (
                    <p className="text-gray-500 text-center py-8 text-sm">No pending bookings</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Confirmed Bookings */}
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
                    <Card key={booking.id} className="border-l-4 border-green-500">
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
                            </div>
                          </div>
                          {booking.admin_remarks && (
                            <div className="bg-gray-50 p-2 rounded">
                              <p className="text-xs"><strong>Remarks:</strong> {booking.admin_remarks}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {confirmedBookings.length === 0 && (
                    <p className="text-gray-500 text-center py-8 text-sm">No confirmed bookings</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-3 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                  New Messages ({newContacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {newContacts.map(contact => (
                    <Card key={contact.id} className="border-l-4 border-blue-500">
                      <CardContent className="p-3">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{contact.name}</h4>
                              <p className="text-xs text-gray-600 break-all">{contact.email}</p>
                              {contact.phone && <p className="text-xs text-gray-600">{contact.phone}</p>}
                            </div>
                            <Button
                              onClick={() => handleMarkContactAsRead(contact.id)}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Read
                            </Button>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs break-words">{contact.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {newContacts.length === 0 && (
                    <p className="text-gray-500 text-center py-8 text-sm">No new messages</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx>{`
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
