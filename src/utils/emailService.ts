
import { otpAPI } from '@/utils/apiService';

// Email service using MySQL backend
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string, name: string, testMode: boolean = false): Promise<void> => {
  try {
    console.log('=== EMAIL SERVICE: Starting OTP send ===');
    console.log('Email details:', { 
      email, 
      name, 
      otp: otp ? 'generated' : 'missing',
      testMode 
    });
    
    const response = await otpAPI.send(email, otp, name, testMode);
    
    if (!response.success) {
      console.error('Email service reported failure:', response);
      throw new Error(response.error || 'Failed to send OTP email');
    }
    
    console.log(`=== EMAIL SERVICE: SUCCESS ===`);
    console.log(`Email ID: ${response.email_id}`);
    console.log(`Emails sent: ${response.emails_sent}`);
    console.log(`Test mode: ${response.test_mode}`);
    
  } catch (error) {
    console.error('=== EMAIL SERVICE: ERROR ===');
    console.error('Error sending OTP email:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to send verification email: ${error.message}`);
    } else {
      throw new Error('Failed to send verification email. Please try again.');
    }
  }
};

// Test function to send a test OTP
export const sendTestOTP = async (email: string, name: string): Promise<void> => {
  const testOTP = '123456'; // Fixed test OTP
  console.log('Sending test OTP to:', email);
  return sendOTPEmail(email, testOTP, name, true);
};
