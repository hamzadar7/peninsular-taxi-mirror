
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
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
    
    loadBookings();
    loadContacts();
  }, [navigate]);

  const loadBookings = () => {
    console.log('Loading bookings...');
    const allBookings = getBookings();
    console.log('Loaded bookings:', allBookings);
    setBookings(allBookings);
    
    const remarksState: { [key: string]: string } = {};
    allBookings.forEach(booking => {
      remarksState[booking.id] = booking.adminRemarks || '';
    });
    setRemarks(remarksState);
  };

  const loadContacts = () => {
    console.log('Loading contacts...');
    const allContacts = getContacts();
    console.log('Loaded contacts:', allContacts);
    setContacts(allContacts);
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
    loadBookings();
    loadContacts();
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
      <div className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/21e2b738-2d9a-4a6f-a974-5cab6cc47635.png" 
              alt="Capelsound Taxi" 
              className="h-12 w-auto"
            />
            <h1 className="text-2xl font-bold">Capelsound Taxi - Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleRefresh} className="bg-white text-black hover:bg-gray-100 font-semibold">
              <RefreshCw className="h-4 w-4 mr-2" />
              <span>Refresh</span>
            </Button>
            <Button onClick={handleLogout} className="bg-white text-black hover:bg-gray-100 font-semibold">
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Tabs */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <Button 
                variant={activeTab === 'bookings' ? 'default' : 'outline'}
                onClick={() => setActiveTab('bookings')}
                className="flex items-center space-x-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Bookings ({bookings.length})</span>
              </Button>
              <Button 
                variant={activeTab === 'contacts' ? 'default' : 'outline'}
                onClick={() => setActiveTab('contacts')}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Contact Messages ({newContacts.length} new)</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {activeTab === 'bookings' && (
          <>
            {/* Booking Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="space-x-2">
                    <Button 
                      variant={filter === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilter('all')}
                    >
                      All Bookings
                    </Button>
                    <Button 
                      variant={filter === 'pending' ? 'default' : 'outline'}
                      onClick={() => setFilter('pending')}
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={filter === 'confirmed' ? 'default' : 'outline'}
                      onClick={() => setFilter('confirmed')}
                    >
                      Confirmed
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <Input 
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-auto"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setDateFilter('')}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Bookings */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-500" />
                  Pending Bookings ({pendingBookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingBookings.map(booking => (
                    <Card key={booking.id} className="border-l-4 border-orange-500">
                      <CardContent className="p-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold">{booking.contactName}</h4>
                            <p className="text-sm text-gray-600">{booking.contactPhone}</p>
                            <p className="text-sm text-gray-600">{booking.contactEmail}</p>
                          </div>
                          <div>
                            <p><strong>From:</strong> {booking.pickupLocation}</p>
                            <p><strong>To:</strong> {booking.destination}</p>
                            <p><strong>Date:</strong> {booking.date} at {booking.time}</p>
                            <p><strong>Passengers:</strong> {booking.passengers}</p>
                            <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
                          </div>
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Admin remarks..."
                              value={remarks[booking.id] || ''}
                              onChange={(e) => setRemarks(prev => ({ ...prev, [booking.id]: e.target.value }))}
                              className="min-h-[80px]"
                            />
                            <div className="space-x-2">
                              <Button 
                                onClick={() => handleSaveRemarks(booking.id)}
                                variant="outline"
                                size="sm"
                              >
                                Save Remarks
                              </Button>
                              <Button 
                                onClick={() => handleConfirmBooking(booking.id)}
                                className="bg-green-600 hover:bg-green-700"
                                size="sm"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </div>
                        {booking.specialRequests && (
                          <div className="mt-3 pt-3 border-t">
                            <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {pendingBookings.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No pending bookings</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Confirmed Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Confirmed Bookings ({confirmedBookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {confirmedBookings.map(booking => (
                    <Card key={booking.id} className="border-l-4 border-green-500">
                      <CardContent className="p-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold">{booking.contactName}</h4>
                            <p className="text-sm text-gray-600">{booking.contactPhone}</p>
                            <p className="text-sm text-gray-600">{booking.contactEmail}</p>
                          </div>
                          <div>
                            <p><strong>From:</strong> {booking.pickupLocation}</p>
                            <p><strong>To:</strong> {booking.destination}</p>
                            <p><strong>Date:</strong> {booking.date} at {booking.time}</p>
                            <p><strong>Passengers:</strong> {booking.passengers}</p>
                            <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
                          </div>
                          <div>
                            {booking.adminRemarks && (
                              <div className="bg-gray-50 p-3 rounded">
                                <p className="text-sm"><strong>Remarks:</strong></p>
                                <p className="text-sm">{booking.adminRemarks}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        {booking.specialRequests && (
                          <div className="mt-3 pt-3 border-t">
                            <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {confirmedBookings.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No confirmed bookings</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'contacts' && (
          <>
            {/* Unread Contact Messages */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Unread Messages ({newContacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newContacts.map(contact => (
                    <Card key={contact.id} className="border-l-4 border-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{contact.name}</h4>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                            {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(contact.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              New
                            </span>
                            <Button
                              onClick={() => handleMarkContactAsRead(contact.id)}
                              variant="outline"
                              size="sm"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Mark as Read
                            </Button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm"><strong>Message:</strong></p>
                          <p className="text-sm mt-1">{contact.message}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {newContacts.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No unread messages</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Read Contact Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-gray-500" />
                  Read Messages ({contacts.filter(c => c.status === 'read').length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.filter(c => c.status === 'read').map(contact => (
                    <Card key={contact.id} className="border-l-4 border-gray-300">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{contact.name}</h4>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                            {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(contact.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded">
                            Read
                          </span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm"><strong>Message:</strong></p>
                          <p className="text-sm mt-1">{contact.message}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {contacts.filter(c => c.status === 'read').length === 0 && (
                    <p className="text-gray-500 text-center py-8">No read messages</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Empty state when no contacts at all */}
            {contacts.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 mb-4">No contact messages found</p>
                  <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
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
