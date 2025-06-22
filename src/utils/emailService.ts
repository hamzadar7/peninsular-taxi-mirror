
// Email service for OTP and notifications
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
    
    // Use the full Supabase project URL for the edge function
    const functionUrl = 'https://nlpgylbwbizcbkirawie.supabase.co/functions/v1/send-otp';
    console.log('Using function URL:', functionUrl);
    
    const requestPayload = {
      email,
      otp,
      name,
      testMode
    };
    
    console.log('Request payload:', JSON.stringify(requestPayload, null, 2));
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scGd5bGJ3Yml6Y2JraXJhd2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTgyOTYsImV4cCI6MjA2NjEzNDI5Nn0.ruadfjd_b1lx0t3M-di77ISqxggYv5Eq_sG7H7rSoKI`,
      },
      body: JSON.stringify(requestPayload),
    });

    console.log('=== EMAIL SERVICE: Edge function response ===');
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
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
    console.log('=== EMAIL SERVICE: Success response ===');
    console.log('OTP email response:', JSON.stringify(result, null, 2));
    
    if (!result.success) {
      console.error('Email service reported failure:', result);
      throw new Error(result.error || 'Failed to send OTP email');
    }

    // Check if any emails failed to send
    if (result.emails_failed && result.emails_failed > 0) {
      console.error('Some emails failed to send:', result);
      throw new Error('Email delivery failed - please check your email address and try again');
    }

    // Check if no emails were sent successfully
    if (!result.emails_sent || result.emails_sent === 0) {
      console.error('No emails were sent successfully:', result);
      throw new Error('Email sending failed - no emails were delivered');
    }
    
    console.log(`=== EMAIL SERVICE: SUCCESS ===`);
    console.log(`Email ID: ${result.email_id}`);
    console.log(`Emails sent: ${result.emails_sent}`);
    console.log(`Sender: ${result.sender_email}`);
    console.log(`Recipient: ${result.recipient_email}`);
    console.log(`Test mode: ${result.test_mode}`);
    
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
