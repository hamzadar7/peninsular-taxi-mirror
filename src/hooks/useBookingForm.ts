
import { useState } from 'react';

export interface FormData {
  fullName: string;
  phone: string;
  email: string;
  pickupAddress: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  vehicleType: string;
  specialRequests: string;
  returnJourney: boolean;
  returnDate: string;
  returnTime: string;
}

export const useBookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    pickupAddress: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    vehicleType: 'sedan',
    specialRequests: '',
    returnJourney: false,
    returnDate: '',
    returnTime: ''
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      pickupAddress: '',
      destination: '',
      date: '',
      time: '',
      passengers: '1',
      vehicleType: 'sedan',
      specialRequests: '',
      returnJourney: false,
      returnDate: '',
      returnTime: ''
    });
  };

  const validateForm = () => {
    console.log('Validating form data:', formData);
    
    if (!formData.fullName.trim()) return 'Full name is required.';
    if (!formData.phone.trim()) return 'Phone number is required.';
    if (!formData.email.trim()) return 'Email address is required.';
    if (!formData.pickupAddress.trim()) return 'Pickup address is required.';
    if (!formData.destination.trim()) return 'Destination is required.';
    if (!formData.date) return 'Pickup date is required.';
    if (!formData.time) return 'Pickup time is required.';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address.';
    
    // Phone validation (basic)
    if (formData.phone.length < 10) return 'Please enter a valid phone number.';
    
    if (formData.returnJourney) {
      if (!formData.returnDate) return 'Return date is required for return journey.';
      if (!formData.returnTime) return 'Return time is required for return journey.';
    }
    
    return null;
  };

  return {
    formData,
    handleInputChange,
    resetForm,
    validateForm
  };
};
