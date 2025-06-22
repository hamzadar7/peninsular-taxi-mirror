import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (isLoggedIn !== 'true') {
      navigate('/admin');
      return;
    }
  }, [navigate]);

  // Enhanced data loading function using Supabase
  const loadAllData = useCallback(async () => {
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
  }, [toast]);

  // Real-time subscription for bookings and contacts
  useEffect(() => {
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
  }, [loadAllData]);

  // Initial data load and periodic refresh
  useEffect(() => {
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
  }, [loadAllData]);

  const handleRefresh = () => {
    loadAllData();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin');
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

  const filteredBookings = bookings.filter(booking => {
    const statusMatch = filter === 'all' || booking.status === filter;
    const dateMatch = !dateFilter || booking.date === dateFilter;
    return statusMatch && dateMatch;
  });

  const pendingBookings = filteredBookings.filter(b => b.status === 'pending');
  const confirmedBookings = filteredBookings.filter(b => b.status === 'confirmed');
  const newContacts = contacts.filter(c => c.status === 'new');

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-2 sm:p-3 md:p-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
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
              <div className="flex items-center space-x-4">
                <span>📋 {bookings.length} bookings</span>
                <span>📧 {contacts.length} messages</span>
                <span>🔄 Real-time updates enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-2 sm:p-3 md:p-6 w-full">
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

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <>
            {/* Booking Filters */}
            <Card className="mb-3 md:mb-6">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg md:text-xl">Filters</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button 
                      variant={filter === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilter('all')}
                      className="w-full text-xs sm:text-sm bg-white text-black border-black hover:bg-gray-100"
                    >
                      All
                    </Button>
                    <Button 
                      variant={filter === 'pending' ? 'default' : 'outline'}
                      onClick={() => setFilter('pending')}
                      className="w-full text-xs sm:text-sm bg-white text-black border-black hover:bg-gray-100"
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={filter === 'confirmed' ? 'default' : 'outline'}
                      onClick={() => setFilter('confirmed')}
                      className="w-full text-xs sm:text-sm bg-white text-black border-black hover:bg-gray-100"
                    >
                      Confirmed
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <Input 
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="flex-1 sm:w-auto text-xs sm:text-sm"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setDateFilter('')}
                      className="w-full sm:w-auto text-xs sm:text-sm bg-white text-black border-black hover:bg-gray-100"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading indicator */}
            {isLoading && (
              <Card className="mb-3 md:mb-6">
                <CardContent className="text-center py-4 sm:py-8">
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <p className="text-gray-500 text-xs sm:text-sm">Loading bookings...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pending Bookings */}
            <Card className="mb-3 md:mb-6">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="flex items-center text-base sm:text-lg md:text-xl">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-orange-500" />
                  Pending Bookings ({pendingBookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {pendingBookings.map(booking => (
                    <Card key={booking.id} className="border-l-4 border-orange-500">
                      <CardContent className="p-2 sm:p-3 md:p-4">
                        
                        <div className="space-y-3 sm:space-y-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-sm sm:text-base">{booking.contact_name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{booking.contact_phone}</p>
                              <p className="text-xs sm:text-sm text-gray-600 break-all">{booking.contact_email}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs sm:text-sm"><strong>From:</strong> {booking.pickup_location}</p>
                              <p className="text-xs sm:text-sm"><strong>To:</strong> {booking.destination}</p>
                              <p className="text-xs sm:text-sm"><strong>Date:</strong> {booking.date} at {booking.time}</p>
                              <p className="text-xs sm:text-sm"><strong>Passengers:</strong> {booking.passengers}</p>
                              <p className="text-xs sm:text-sm"><strong>Vehicle:</strong> {booking.vehicle_type}</p>
                            </div>
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            <Textarea
                              placeholder="Admin remarks..."
                              value={remarks[booking.id] || ''}
                              onChange={(e) => setRemarks(prev => ({ ...prev, [booking.id]: e.target.value }))}
                              className="min-h-[50px] sm:min-h-[60px] md:min-h-[80px] text-xs sm:text-sm"
                            />
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                              <Button 
                                onClick={() => handleSaveRemarks(booking.id)}
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-auto text-xs bg-white text-black border-black hover:bg-gray-100"
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
                          {booking.special_requests && (
                            <div className="pt-2 sm:pt-3 border-t">
                              <p className="text-xs sm:text-sm"><strong>Special Requests:</strong> {booking.special_requests}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {pendingBookings.length === 0 && !isLoading && (
                    <p className="text-gray-500 text-center py-4 sm:py-8 text-xs sm:text-sm">No pending bookings</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Confirmed Bookings */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="flex items-center text-base sm:text-lg md:text-xl">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500" />
                  Confirmed Bookings ({confirmedBookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {confirmedBookings.map(booking => (
                    <Card key={booking.id} className="border-l-4 border-green-500">
                      <CardContent className="p-2 sm:p-3 md:p-4">
                        
                        <div className="space-y-3 sm:space-y-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-sm sm:text-base">{booking.contact_name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{booking.contact_phone}</p>
                              <p className="text-xs sm:text-sm text-gray-600 break-all">{booking.contact_email}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs sm:text-sm"><strong>From:</strong> {booking.pickup_location}</p>
                              <p className="text-xs sm:text-sm"><strong>To:</strong> {booking.destination}</p>
                              <p className="text-xs sm:text-sm"><strong>Date:</strong> {booking.date} at {booking.time}</p>
                              <p className="text-xs sm:text-sm"><strong>Passengers:</strong> {booking.passengers}</p>
                              <p className="text-xs sm:text-sm"><strong>Vehicle:</strong> {booking.vehicle_type}</p>
                            </div>
                          </div>
                          {booking.admin_remarks && (
                            <div className="bg-gray-50 p-2 sm:p-3 rounded">
                              <p className="text-xs sm:text-sm"><strong>Remarks:</strong></p>
                              <p className="text-xs sm:text-sm">{booking.admin_remarks}</p>
                            </div>
                          )}
                          {booking.special_requests && (
                            <div className="pt-2 sm:pt-3 border-t">
                              <p className="text-xs sm:text-sm"><strong>Special Requests:</strong> {booking.special_requests}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {confirmedBookings.length === 0 && !isLoading && (
                    <p className="text-gray-500 text-center py-4 sm:py-8 text-xs sm:text-sm">No confirmed bookings</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <>
            {/* Loading indicator */}
            {isLoading && (
              <Card className="mb-3 md:mb-6">
                <CardContent className="text-center py-4 sm:py-8">
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <p className="text-gray-500 text-xs sm:text-sm">Loading contacts...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Unread Contact Messages */}
            <Card className="mb-3 md:mb-6">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="flex items-center text-base sm:text-lg md:text-xl">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
                  Unread Messages ({newContacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {newContacts.map(contact => (
                    <Card key={contact.id} className="border-l-4 border-blue-500">
                      <CardContent className="p-2 sm:p-3 md:p-4">
                        
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex flex-col gap-3 sm:gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm sm:text-base md:text-lg">{contact.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 break-all">{contact.email}</p>
                              {contact.phone && <p className="text-xs sm:text-sm text-gray-600">{contact.phone}</p>}
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(contact.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                New
                              </span>
                              <Button
                                onClick={() => handleMarkContactAsRead(contact.id)}
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-auto text-xs bg-white text-black border-black hover:bg-gray-100"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Mark as Read
                              </Button>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-2 sm:p-3 rounded">
                            <p className="text-xs sm:text-sm"><strong>Message:</strong></p>
                            <p className="text-xs sm:text-sm mt-1 break-words">{contact.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {newContacts.length === 0 && !isLoading && (
                    <p className="text-gray-500 text-center py-4 sm:py-8 text-xs sm:text-sm">No unread messages</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Read Contact Messages */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="flex items-center text-base sm:text-lg md:text-xl">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-500" />
                  Read Messages ({contacts.filter(c => c.status === 'read').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {contacts.filter(c => c.status === 'read').map(contact => (
                    <Card key={contact.id} className="border-l-4 border-gray-300">
                      <CardContent className="p-2 sm:p-3 md:p-4">
                        
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex flex-col gap-3 sm:gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm sm:text-base md:text-lg">{contact.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 break-all">{contact.email}</p>
                              {contact.phone && <p className="text-xs sm:text-sm text-gray-600">{contact.phone}</p>}
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(contact.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded self-start">
                              Read
                            </span>
                          </div>
                          <div className="bg-gray-50 p-2 sm:p-3 rounded">
                            <p className="text-xs sm:text-sm"><strong>Message:</strong></p>
                            <p className="text-xs sm:text-sm mt-1 break-words">{contact.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {contacts.filter(c => c.status === 'read').length === 0 && !isLoading && (
                    <p className="text-gray-500 text-center py-4 sm:py-8 text-xs sm:text-sm">No read messages</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
