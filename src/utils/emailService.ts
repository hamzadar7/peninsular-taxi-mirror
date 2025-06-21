
export const sendOTPEmail = async (email: string, otp: string, name: string) => {
  try {
    console.log(`Attempting to send OTP ${otp} to ${email} for ${name}`);
    
    const requestBody = {
      api_key: 'api-296966F2D21B48BA820EADA72B607188',
      to: [email],
      sender: 'contact@capelsoundtaxi.com.au',
      subject: 'Your Booking Verification Code - Capel Sound Taxi',
      html_body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1f2937; margin-bottom: 10px; font-size: 28px;">Capel Sound Taxi</h1>
              <h2 style="color: #374151; margin-top: 0; font-size: 20px;">Verify Your Booking</h2>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">Dear ${name},</p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Thank you for choosing Capel Sound Taxi. To complete your booking, please use the verification code below:
            </p>
            
            <div style="background-color: #fbbf24; padding: 25px; text-align: center; margin: 30px 0; border-radius: 10px; border: 3px solid #f59e0b;">
              <div style="color: #000; margin: 0; font-size: 36px; letter-spacing: 8px; font-weight: bold; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              <strong>This code will expire in 10 minutes.</strong>
            </p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #6b7280;">
              If you didn't request this booking, please ignore this email or contact us at +61 408 202 034.
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="font-size: 16px; color: #374151; margin-bottom: 5px;"><strong>Best regards,</strong></p>
              <p style="font-size: 16px; color: #374151; margin-bottom: 15px;"><strong>Capel Sound Taxi Team</strong></p>
              <p style="color: #6b7280; font-size: 14px; margin: 0;">📞 +61 408 202 034 | Available 24/7</p>
            </div>
          </div>
        </div>
      `,
      text_body: `Dear ${name},

Thank you for choosing Capel Sound Taxi.

Your verification code is: ${otp}

This code will expire in 10 minutes.

If you didn't request this booking, please ignore this email.

Best regards,
Capel Sound Taxi Team
Phone: +61 408 202 034
Available 24/7`
    };

    console.log('Sending request to SMTP2GO API');
    console.log('Request payload:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('SMTP2GO Response Status:', response.status);

    const responseText = await response.text();
    console.log('SMTP2GO Raw Response:', responseText);

    if (!response.ok) {
      console.error('SMTP2GO API Error:', response.status, responseText);
      throw new Error(`SMTP2GO API failed with status ${response.status}: ${responseText}`);
    }

    let result;
    try {
      result = JSON.parse(responseText);
      console.log('Parsed SMTP2GO Response:', result);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    // Check if email was sent successfully
    if (result.data && result.data.succeeded && result.data.succeeded > 0) {
      console.log('✅ Email sent successfully!');
      return { success: true, data: result.data };
    } else if (result.data && result.data.failed && result.data.failed.length > 0) {
      const errorMsg = result.data.failed[0].error || result.data.failed[0].error_code || 'Unknown error';
      console.error('❌ Email delivery failed:', errorMsg);
      throw new Error(`Email delivery failed: ${errorMsg}`);
    } else {
      console.error('❌ Unexpected response structure:', result);
      throw new Error('Unexpected response from email service');
    }
    
  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    // Provide user-friendly error messages
    if (error.message.includes('fetch') || error.message.includes('network')) {
      throw new Error('Network error - please check your internet connection and try again.');
    } else if (error.message.includes('401') || error.message.includes('403')) {
      throw new Error('Email service authentication failed - please contact support.');
    } else if (error.message.includes('422') || error.message.includes('400')) {
      throw new Error('Invalid email request - please check your email address.');
    } else {
      throw error;
    }
  }
};

export const generateOTP = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('Generated OTP:', otp);
  return otp;
};

// Test function to send OTP to hamzadar7@icloud.com
export const sendTestOTP = async () => {
  try {
    console.log('🧪 Sending test OTP email...');
    const testOTP = generateOTP();
    const result = await sendOTPEmail('hamzadar7@icloud.com', testOTP, 'Test User');
    console.log('✅ Test email sent successfully!', result);
    return result;
  } catch (error) {
    console.error('❌ Test email failed:', error);
    throw error;
  }
};
