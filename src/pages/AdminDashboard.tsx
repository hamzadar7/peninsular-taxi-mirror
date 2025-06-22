
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getBookings, updateBookingStatus, BookingData } from "@/utils/bookingStorage";
import { getContacts, updateContactStatus, ContactData } from "@/utils/contactStorage";
import { LogOut, CheckCircle, Clock, Calendar, MessageSquare, Eye, RefreshCw } from "lucide-react";

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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
    
    // Force initial data load
    loadAllData();
    
    // Set up periodic refresh for mobile devices
    const interval = setInterval(() => {
      loadAllData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  const loadAllData = async () => {
    console.log('Loading all data...');
    setIsLoading(true);
    
    try {
      // Add small delay to ensure localStorage is ready on mobile
      await new Promise(resolve => setTimeout(resolve, 100));
      
      loadBookings();
      loadContacts();
      setLastRefresh(Date.now());
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBookings = () => {
    console.log('Loading bookings...');
    try {
      const allBookings = getBookings();
      console.log('Loaded bookings:', allBookings);
      setBookings(allBookings);
      
      const remarksState: { [key: string]: string } = {};
      allBookings.forEach(booking => {
        remarksState[booking.id] = booking.adminRemarks || '';
      });
      setRemarks(remarksState);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    }
  };

  const loadContacts = () => {
    console.log('Loading contacts...');
    try {
      const allContacts = getContacts();
      console.log('Loaded contacts:', allContacts);
      setContacts(allContacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
      setContacts([]);
    }
  };

  const handleRefresh = () => {
    console.log('Manual refresh triggered...');
    loadAllData();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  const handleConfirmBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'confirmed', remarks[bookingId]);
    loadBookings();
  };

  const handleSaveRemarks = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBookingStatus(bookingId, booking.status, remarks[bookingId]);
      loadBookings();
    }
  };

  const handleMarkContactAsRead = (contactId: string) => {
    updateContactStatus(contactId, 'read');
    loadContacts();
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-2 sm:p-3 md:p-4">
        <div className="container mx-auto">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
                <img 
                  src="/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png" 
                  alt="Capelsound Taxi" 
                  className="h-6 sm:h-8 md:h-12 w-auto flex-shrink-0"
                />
                <h1 className="text-sm sm:text-lg md:text-2xl font-bold truncate">Capelsound Taxi - Admin</h1>
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
            
            {/* Status indicator */}
            <div className="text-xs text-gray-300">
              {isLoading ? 'Loading...' : `Last updated: ${new Date(lastRefresh).toLocaleTimeString()}`}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-2 sm:p-3 md:p-6">
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
                <span>Messages ({newContacts.length} new)</span>
              </Button>
            </div>
          </CardContent>
        </Card>

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
                              <h4 className="font-semibold text-sm sm:text-base">{booking.contactName}</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{booking.contactPhone}</p>
                              <p className="text-xs sm:text-sm text-gray-600 break-all">{booking.contactEmail}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs sm:text-sm"><strong>From:</strong> {booking.pickupLocation}</p>
                              <p className="text-xs sm:text-sm"><strong>To:</strong> {booking.destination}</p>
                              <p className="text-xs sm:text-sm"><strong>Date:</strong> {booking.date} at {booking.time}</p>
                              <p className="text-xs sm:text-sm"><strong>Passengers:</strong> {booking.passengers}</p>
                              <p className="text-xs sm:text-sm"><strong>Vehicle:</strong> {booking.vehicleType}</p>
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
                          {booking.specialRequests && (
                            <div className="pt-2 sm:pt-3 border-t">
                              <p className="text-xs sm:text-sm"><strong>Special Requests:</strong> {booking.specialRequests}</p>
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
                              <h4 className="font-semibold text-sm sm:text-base">{booking.contactName}</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{booking.contactPhone}</p>
                              <p className="text-xs sm:text-sm text-gray-600 break-all">{booking.contactEmail}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs sm:text-sm"><strong>From:</strong> {booking.pickupLocation}</p>
                              <p className="text-xs sm:text-sm"><strong>To:</strong> {booking.destination}</p>
                              <p className="text-xs sm:text-sm"><strong>Date:</strong> {booking.date} at {booking.time}</p>
                              <p className="text-xs sm:text-sm"><strong>Passengers:</strong> {booking.passengers}</p>
                              <p className="text-xs sm:text-sm"><strong>Vehicle:</strong> {booking.vehicleType}</p>
                            </div>
                          </div>
                          {booking.adminRemarks && (
                            <div className="bg-gray-50 p-2 sm:p-3 rounded">
                              <p className="text-xs sm:text-sm"><strong>Remarks:</strong></p>
                              <p className="text-xs sm:text-sm">{booking.adminRemarks}</p>
                            </div>
                          )}
                          {booking.specialRequests && (
                            <div className="pt-2 sm:pt-3 border-t">
                              <p className="text-xs sm:text-sm"><strong>Special Requests:</strong> {booking.specialRequests}</p>
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

            {/* Empty state when no contacts at all */}
            {contacts.length === 0 && !isLoading && (
              <Card>
                <CardContent className="text-center py-4 sm:py-8">
                  <p className="text-gray-500 mb-4 text-xs sm:text-sm">No contact messages found</p>
                  <Button 
                    onClick={handleRefresh} 
                    variant="outline" 
                    className="text-xs sm:text-sm bg-white text-black border-black hover:bg-gray-100"
                  >
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Refresh Data
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
