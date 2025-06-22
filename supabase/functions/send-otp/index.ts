
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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== OTP EMAIL REQUEST STARTED ===');
    console.log('Request method:', req.method);
    console.log('Request URL:', req.url);
    
    const requestBody = await req.json();
    console.log('Raw request body:', JSON.stringify(requestBody, null, 2));
    
    const { email, otp, name, testMode = false }: OTPEmailRequest = requestBody;
    console.log('Parsed request data:', { 
      email: email || 'MISSING', 
      otp: otp ? 'present' : 'MISSING', 
      name: name || 'MISSING',
      testMode 
    });
    
    // Validate required fields
    if (!email || !otp || !name) {
      console.error('Missing required fields:', { email: !!email, otp: !!otp, name: !!name });
      throw new Error('Missing required fields: email, otp, and name are all required');
    }
    
    const SMTP2GO_API_KEY = Deno.env.get("SMTP2GO_API_KEY");
    console.log('SMTP2GO_API_KEY check:', SMTP2GO_API_KEY ? 'FOUND' : 'NOT FOUND');
    
    if (!SMTP2GO_API_KEY) {
      console.error("SMTP2GO_API_KEY not found in environment variables");
      throw new Error("SMTP2GO_API_KEY not configured in environment");
    }

    console.log('=== PREPARING EMAIL DATA ===');

    // Use your verified domain email address
    const senderEmail = "contact@capelsoundtaxi.com.au";
    const senderName = "Capel Sound Taxi";
    
    console.log('Using sender email:', senderEmail);
    console.log('Using sender name:', senderName);
    console.log('Sending to:', email);
    console.log('Test mode:', testMode);

    // Create professional, non-spammy email content
    const subject = testMode 
      ? "Email System Test - Capel Sound Taxi" 
      : "Your Booking Verification Code";

    const textBody = `Hello ${name},

${testMode ? 'This is a test email to verify our email delivery system.\n\n' : ''}Your verification code for taxi booking is: ${otp}

This code will expire in 10 minutes.

Please enter this code to confirm your booking.

Best regards,
Capel Sound Taxi Team

Phone: (03) 5983 1800
Email: contact@capelsoundtaxi.com.au
Website: www.capelsoundtaxi.com.au

This is an automated message for your booking verification.`;

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code - Capel Sound Taxi</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
    <table style="width: 100%; border-collapse: collapse; margin: 0; padding: 0; background-color: #f8f9fa;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="background: #ffc107; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #000; margin: 0; font-size: 28px; font-weight: bold;">Capel Sound Taxi</h1>
                            <p style="color: #333; margin: 8px 0 0 0; font-size: 16px;">Professional Taxi Service</p>
                            ${testMode ? '<div style="color: #d63384; font-weight: bold; background: #fff3cd; padding: 10px; border-radius: 4px; margin-top: 10px; border: 1px solid #ffeaa7;">Test Email - System Working!</div>' : ''}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: #333; margin-top: 0; font-size: 20px;">Hello ${name},</h2>
                            <p style="color: #555; font-size: 16px; margin-bottom: 20px;">
                                ${testMode ? 'This test email confirms our email delivery system is working properly.<br><br>' : ''}Your verification code for booking confirmation is:
                            </p>
                            <div style="text-align: center; margin: 25px 0;">
                                <div style="display: inline-block; background: #ffc107; padding: 20px 30px; border-radius: 8px; border: 2px solid #ffb300;">
                                    <span style="font-size: 32px; font-weight: bold; color: #000; letter-spacing: 6px; font-family: monospace;">${otp}</span>
                                </div>
                            </div>
                            <div style="background: #e3f2fd; border-left: 4px solid #2196F3; border-radius: 4px; padding: 15px; margin: 20px 0;">
                                <p style="color: #1565C0; margin: 0; font-size: 14px;">
                                    <strong>Important:</strong> This code expires in 10 minutes for security.
                                </p>
                            </div>
                            <p style="color: #555; font-size: 14px; margin-bottom: 25px;">
                                ${testMode ? 'If you received this email in your inbox, our system is properly configured!' : 'Please enter this code on the booking form to confirm your taxi reservation.'}
                            </p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center;">
                                <h3 style="color: #ffc107; margin-bottom: 10px; font-size: 18px;">Contact Information</h3>
                                <p style="color: #555; margin: 5px 0; font-size: 14px;">Phone: (03) 5983 1800</p>
                                <p style="color: #555; margin: 5px 0; font-size: 14px;">Email: contact@capelsoundtaxi.com.au</p>
                                <p style="color: #555; margin: 5px 0; font-size: 14px;">Website: www.capelsoundtaxi.com.au</p>
                            </div>
                            <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
                                <p style="color: #6c757d; font-size: 12px; margin: 0;">
                                    Capel Sound Taxi - Your reliable transport partner
                                </p>
                                <p style="color: #6c757d; font-size: 10px; margin: 5px 0 0 0;">
                                    This is an automated message for booking verification.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

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
          header: "List-Unsubscribe",
          value: "<mailto:contact@capelsoundtaxi.com.au?subject=unsubscribe>"
        },
        {
          header: "X-Entity-ID", 
          value: "capelsoundtaxi"
        },
        {
          header: "X-Entity-Ref-ID",
          value: `booking-${Date.now()}`
        },
        {
          header: "X-Mailer",
          value: "Capel Sound Taxi Booking System"
        },
        {
          header: "Reply-To",
          value: "contact@capelsoundtaxi.com.au"
        }
      ],
      track_opens: false,
      track_clicks: false
    };

    console.log('=== SENDING EMAIL VIA SMTP2GO ===');
    console.log('Email payload (without API key):', {
      to: emailData.to,
      sender: emailData.sender,
      sender_name: emailData.sender_name,
      subject: emailData.subject,
      api_key: 'HIDDEN'
    });

    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    console.log('=== SMTP2GO RESPONSE ===');
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const result = await response.json();
    console.log('Full SMTP2GO response:', JSON.stringify(result, null, 2));
    
    if (!response.ok) {
      console.error('SMTP2GO API error. Status:', response.status);
      console.error('SMTP2GO API error details:', result);
      throw new Error(`SMTP2GO API error (${response.status}): ${JSON.stringify(result)}`);
    }

    // Check for failures in the response
    if (result.data && result.data.failed > 0) {
      console.error('SMTP2GO reported email failures:', result.data.failures);
      throw new Error(`Email failed to send. Failures: ${JSON.stringify(result.data.failures)}`);
    }

    // Check if email was sent successfully
    if (!result.data || result.data.succeeded === 0) {
      console.error('SMTP2GO did not send any emails successfully:', result);
      throw new Error('Email sending failed - no emails were sent successfully');
    }

    console.log("=== EMAIL SENT SUCCESSFULLY ===");
    console.log("Email ID:", result.data?.email_id);
    console.log("Emails succeeded:", result.data?.succeeded);
    console.log("Emails failed:", result.data?.failed);

    const successResponse = {
      success: true,
      result,
      message: testMode ? 'Test email sent successfully' : 'Verification email sent successfully',
      email_id: result.data?.email_id,
      emails_sent: result.data?.succeeded || 0,
      emails_failed: result.data?.failed || 0,
      sender_email: `${senderName} <${senderEmail}>`,
      recipient_email: email,
      test_mode: testMode
    };

    console.log('=== SENDING SUCCESS RESPONSE ===');
    console.log('Success response:', JSON.stringify(successResponse, null, 2));

    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("=== ERROR IN SEND-OTP FUNCTION ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error details:", error);
    
    const errorResponse = {
      error: error.message,
      details: 'Failed to send email',
      timestamp: new Date().toISOString(),
      debug_info: {
        error_type: error.constructor.name,
        error_stack: error.stack
      }
    };

    console.log('=== SENDING ERROR RESPONSE ===');
    console.log('Error response:', JSON.stringify(errorResponse, null, 2));

    return new Response(
      JSON.stringify(errorResponse),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
