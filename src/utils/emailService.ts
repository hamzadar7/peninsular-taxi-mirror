
export const sendOTPEmail = async (email: string, otp: string, name: string) => {
  try {
    console.log(`Sending OTP ${otp} to ${email} for ${name}`);
    
    const requestBody = {
      api_key: 'api-296966F2D21B48BA820EADA72B607188',
      to: [email],
      sender: 'contact@capelsoundtaxi.com.au',
      subject: 'Your Booking Verification Code',
      html_body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin-bottom: 10px;">Capel Sound Taxi</h1>
            <h2 style="color: #1f2937; margin-top: 0;">Verify Your Taxi Booking</h2>
          </div>
          <p style="font-size: 16px; line-height: 1.5;">Dear ${name},</p>
          <p style="font-size: 16px; line-height: 1.5;">Thank you for choosing Capel Sound Taxi. To complete your booking, please use the verification code below:</p>
          <div style="background-color: #fbbf24; padding: 25px; text-align: center; margin: 30px 0; border-radius: 10px; border: 2px solid #f59e0b;">
            <h1 style="color: #000; margin: 0; font-size: 36px; letter-spacing: 6px; font-weight: bold;">${otp}</h1>
          </div>
          <p style="font-size: 16px; line-height: 1.5;">This code will expire in 10 minutes.</p>
          <p style="font-size: 16px; line-height: 1.5;">If you didn't request this booking, please ignore this email.</p>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 5px;"><strong>Best regards,</strong></p>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;"><strong>Capel Sound Taxi Team</strong></p>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Contact: +61 408 202 034 | Available 24/7</p>
          </div>
        </div>
      `,
      text_body: `Dear ${name},

Thank you for choosing Capel Sound Taxi. Your verification code is: ${otp}

This code will expire in 10 minutes.

If you didn't request this booking, please ignore this email.

Best regards,
Capel Sound Taxi Team
Contact: +61 408 202 034`
    };

    console.log('Sending request to SMTP2GO API...');
    
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Smtp2go-Api-Key': 'api-296966F2D21B48BA820EADA72B607188'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      throw new Error(`Invalid response format: ${responseText}`);
    }

    console.log('Parsed response:', result);

    if (!response.ok) {
      console.error('HTTP Error:', response.status, result);
      throw new Error(`HTTP ${response.status}: ${result.data?.error || result.error || responseText}`);
    }

    if (result.data && result.data.error) {
      console.error('API Error:', result.data.error);
      throw new Error(`API Error: ${result.data.error}`);
    }

    if (result.data && result.data.succeeded === 0) {
      const errorMsg = result.data.failed && result.data.failed.length > 0 
        ? result.data.failed[0].error 
        : 'Unknown email sending error';
      console.error('Email sending failed:', errorMsg);
      throw new Error(`Email sending failed: ${errorMsg}`);
    }
    
    console.log('Email sent successfully:', result);
    return result;
    
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
