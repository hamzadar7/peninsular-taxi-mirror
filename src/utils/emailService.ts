
// Email service for OTP and notifications
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string, name: string): Promise<void> => {
  try {
    console.log('Sending OTP email via Supabase Edge Function...');
    console.log('Request details:', { email, name, otp: otp ? 'generated' : 'missing' });
    
    // Use the full Supabase project URL for the edge function
    const functionUrl = 'https://nlpgylbwbizcbkirawie.supabase.co/functions/v1/send-otp';
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scGd5bGJ3Yml6Y2JraXJhd2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTgyOTYsImV4cCI6MjA2NjEzNDI5Nn0.ruadfjd_b1lx0t3M-di77ISqxggYv5Eq_sG7H7rSoKI'}`,
      },
      body: JSON.stringify({
        email,
        otp,
        name
      }),
    });

    console.log('Edge function response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Edge function error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to send OTP email`);
    }

    const result = await response.json();
    console.log('OTP email sent successfully:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to send OTP email');
    }
    
  } catch (error) {
    console.error('Error sending OTP email:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to send verification email: ${error.message}`);
    } else {
      throw new Error('Failed to send verification email. Please try again.');
    }
  }
};
