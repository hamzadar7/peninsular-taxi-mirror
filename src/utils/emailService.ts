
export const sendOTPEmail = async (email: string, otp: string, name: string) => {
  try {
    console.log(`Attempting to send OTP ${otp} to ${email} for ${name}`);
    
    const requestBody = {
      api_key: 'api-296966F2D21B48BA820EADA72B607188',
      to: [email],
      sender: 'Capel Sound Taxi <contact@capelsoundtaxi.com.au>',
      subject: 'Verify Your Taxi Booking - Capel Sound Taxi',
      html_body: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background-color: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #fbbf24; padding-bottom: 20px;">
              <h1 style="color: #1f2937; margin-bottom: 8px; font-size: 32px; font-weight: 700;">Capel Sound Taxi</h1>
              <h2 style="color: #4b5563; margin-top: 0; font-size: 20px; font-weight: 500;">Booking Verification Required</h2>
            </div>
            
            <!-- Greeting -->
            <div style="margin-bottom: 30px;">
              <p style="font-size: 18px; color: #374151; margin-bottom: 10px;">Hello ${name},</p>
              <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                Thank you for choosing Capel Sound Taxi for your transportation needs. To complete your booking request, please verify your email address using the code below.
              </p>
            </div>
            
            <!-- OTP Box -->
            <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center; margin: 40px 0; border-radius: 12px; border: 2px solid #d97706; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
              <p style="color: #000; margin-bottom: 10px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Verification Code</p>
              <div style="color: #000; margin: 0; font-size: 42px; letter-spacing: 6px; font-weight: 800; font-family: 'Courier New', monospace; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
                ${otp}
              </div>
              <p style="color: #78350f; margin-top: 10px; font-size: 12px; font-weight: 500;">Valid for 10 minutes</p>
            </div>
            
            <!-- Instructions -->
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="color: #374151; font-size: 16px; margin-bottom: 10px; font-weight: 600;">Next Steps:</h3>
              <ol style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Return to the booking form</li>
                <li>Enter the verification code above</li>
                <li>Click "Confirm Booking" to complete your request</li>
              </ol>
            </div>
            
            <!-- Security Notice -->
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="font-size: 13px; color: #b91c1c; margin: 0; font-weight: 500;">
                <strong>Security Notice:</strong> If you didn't request this booking, please ignore this email or contact us immediately at +61 408 202 034.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="font-size: 16px; color: #374151; margin-bottom: 8px; font-weight: 600;">Best regards,</p>
              <p style="font-size: 16px; color: #374151; margin-bottom: 20px; font-weight: 600;">Capel Sound Taxi Team</p>
              
              <div style="background-color: #1f2937; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; font-size: 14px;">📞 +61 408 202 034 | ✉️ contact@capelsoundtaxi.com.au</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #d1d5db;">Professional • Reliable • Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      `,
      text_body: `Hello ${name},

Thank you for choosing Capel Sound Taxi.

Your booking verification code is: ${otp}

This code will expire in 10 minutes.

Next Steps:
1. Return to the booking form
2. Enter the verification code above  
3. Click "Confirm Booking" to complete your request

If you didn't request this booking, please ignore this email.

Best regards,
Capel Sound Taxi Team
Phone: +61 408 202 034
Email: contact@capelsoundtaxi.com.au
Available 24/7`
    };

    console.log('Sending request to SMTP2GO API');
    
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
