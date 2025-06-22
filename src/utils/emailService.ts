
// Email service for OTP and notifications
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string, name: string): Promise<void> => {
  try {
    console.log('Sending OTP email via Supabase Edge Function...');
    
    const response = await fetch('/functions/v1/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
        name
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send OTP email');
    }

    const result = await response.json();
    console.log('OTP email sent successfully:', result);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send verification email. Please try again.');
  }
};
