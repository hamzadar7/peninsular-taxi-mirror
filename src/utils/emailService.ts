
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
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scGd5bGJ3Yml6Y2JraXJhd2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTgyOTYsImV4cCI6MjA2NjEzNDI5Nn0.ruadfjd_b1lx0t3M-di77ISqxggYv5Eq_sG7H7rSoKI`,
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
    console.log('OTP email response:', result);
    
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
    
    console.log(`OTP email sent successfully. Email ID: ${result.email_id}, Emails sent: ${result.emails_sent}`);
    
  } catch (error) {
    console.error('Error sending OTP email:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to send verification email: ${error.message}`);
    } else {
      throw new Error('Failed to send verification email. Please try again.');
    }
  }
};
