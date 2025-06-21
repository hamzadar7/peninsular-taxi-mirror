
export const sendOTPEmail = async (email: string, otp: string, name: string) => {
  try {
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Smtp2go-Api-Key': 'api-296966F2D21B48BA820EADA72B607188'
      },
      body: JSON.stringify({
        api_key: 'api-296966F2D21B48BA820EADA72B607188',
        to: [email],
        sender: 'contact@capelsoundtaxi.com.au',
        from: 'Cape Sound Taxi <contact@capelsoundtaxi.com.au>',
        subject: 'Your Booking Verification Code',
        html_body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">Verify Your Taxi Booking</h2>
            <p>Dear ${name},</p>
            <p>Thank you for choosing Cape Sound Taxi. To complete your booking, please use the verification code below:</p>
            <div style="background-color: #fbbf24; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              <h1 style="color: #000; margin: 0; font-size: 32px; letter-spacing: 4px;">${otp}</h1>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this booking, please ignore this email.</p>
            <p>Best regards,<br>Cape Sound Taxi Team</p>
            <p style="color: #6b7280; font-size: 14px;">Contact: +61 408 202 034</p>
          </div>
        `,
        text_body: `Your Cape Sound Taxi verification code is: ${otp}. This code will expire in 10 minutes.`
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
