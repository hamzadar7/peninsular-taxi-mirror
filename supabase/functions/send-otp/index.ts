
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OTPEmailRequest {
  email: string;
  otp: string;
  name: string;
  testMode?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== OTP EMAIL REQUEST STARTED ===');
    
    const { email, otp, name, testMode = false }: OTPEmailRequest = await req.json();
    console.log('Request data:', { email, name, testMode, otpProvided: !!otp });
    
    if (!email || !otp || !name) {
      throw new Error('Missing required fields: email, otp, and name are all required');
    }
    
    const SMTP2GO_API_KEY = Deno.env.get("SMTP2GO_API_KEY");
    if (!SMTP2GO_API_KEY) {
      throw new Error("SMTP2GO_API_KEY not configured");
    }

    // Use a more inbox-friendly sender configuration
    const senderEmail = "contact@capelsoundtaxi.com.au";
    const senderName = "Capel Sound Taxi";
    
    // Create simple, business-focused email content
    const subject = testMode 
      ? "Email System Test - Capel Sound Taxi" 
      : "Taxi Booking Confirmation Code";

    const textBody = `Hello ${name},

${testMode ? 'This is a test to verify our email system is working properly.\n\n' : ''}Thank you for booking with Capel Sound Taxi.

Your booking confirmation code is: ${otp}

Please enter this code on our website to complete your booking.

This code expires in 10 minutes.

Best regards,
Capel Sound Taxi Team

Phone: (03) 5983 1800
Email: contact@capelsoundtaxi.com.au

This is an automated message. Please do not reply.`;

    const htmlBody = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - Capel Sound Taxi</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333333; margin: 0;">Capel Sound Taxi</h1>
            <p style="color: #666666; margin: 5px 0;">Professional Taxi Service</p>
            ${testMode ? '<p style="background-color: #fff3cd; padding: 10px; border-radius: 4px; color: #856404; margin: 15px 0;"><strong>✓ Email System Test</strong></p>' : ''}
        </div>
        
        <h2 style="color: #333333;">Hello ${name},</h2>
        
        <p style="color: #333333; line-height: 1.6;">
            ${testMode ? 'This is a test email to verify our system is working correctly.<br><br>' : 'Thank you for booking with Capel Sound Taxi.<br><br>'}
            Your booking confirmation code is:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; border: 2px solid #dee2e6;">
                <span style="font-size: 32px; font-weight: bold; color: #333333; letter-spacing: 5px; font-family: monospace;">${otp}</span>
            </div>
        </div>
        
        <p style="color: #333333; line-height: 1.6;">
            ${testMode ? 'If this email arrived in your inbox, our system is working correctly!' : 'Please enter this code on our website to complete your booking.'}
        </p>
        
        <p style="color: #666666; font-size: 14px;">
            This code expires in 10 minutes for security purposes.
        </p>
        
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
        
        <div style="text-align: center; color: #666666; font-size: 14px;">
            <p><strong>Capel Sound Taxi</strong></p>
            <p>Phone: (03) 5983 1800<br>
            Email: contact@capelsoundtaxi.com.au</p>
            <p style="font-size: 12px; margin-top: 20px;">
                This is an automated message. Please do not reply.
            </p>
        </div>
    </div>
</body>
</html>`;

    // Minimal, clean email configuration for better deliverability
    const emailData = {
      api_key: SMTP2GO_API_KEY,
      to: [email],
      sender: senderEmail,
      sender_name: senderName,
      subject: subject,
      text_body: textBody,
      html_body: htmlBody,
      custom_headers: [
        {
          header: "Reply-To",
          value: "contact@capelsoundtaxi.com.au"
        },
        {
          header: "X-Mailer",
          value: "Capel Sound Taxi Booking System"
        }
      ],
      // Disable all tracking for better inbox delivery
      track_opens: false,
      track_clicks: false,
      track_links: false
    };

    console.log('Sending email via SMTP2GO...');
    
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    console.log('SMTP2GO response:', result);
    
    if (!response.ok || (result.data && result.data.failed > 0)) {
      console.error('Email sending failed:', result);
      throw new Error(`Failed to send email: ${JSON.stringify(result)}`);
    }

    console.log("Email sent successfully");

    return new Response(JSON.stringify({
      success: true,
      message: testMode ? 'Test email sent successfully!' : 'Verification email sent successfully',
      email_id: result.data?.email_id,
      emails_sent: result.data?.succeeded || 0
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-otp function:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Failed to send email'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
