
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

    // Use your verified domain email address with proper sender name
    const senderEmail = "contact@capelsoundtaxi.com.au";
    const senderName = "Capel Sound Taxi";
    
    console.log('Using sender email:', senderEmail);
    console.log('Using sender name:', senderName);
    console.log('Sending to:', email);
    console.log('Test mode:', testMode);

    // Create professional, inbox-optimized email content
    const subject = testMode 
      ? "Email Delivery Test - Capel Sound Taxi" 
      : "Your Taxi Booking Verification Code";

    const textBody = `Hello ${name},

${testMode ? 'This is a test message to verify our email delivery system is working correctly.\n\n' : ''}Your verification code for your taxi booking is: ${otp}

This code will expire in 10 minutes for security purposes.

Please enter this code on our website to confirm your booking.

Thank you for choosing Capel Sound Taxi.

Best regards,
Capel Sound Taxi Team

Contact Information:
Phone: (03) 5983 1800
Email: contact@capelsoundtaxi.com.au
Website: www.capelsoundtaxi.com.au

This is an automated message for booking verification. Please do not reply to this email.`;

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code - Capel Sound Taxi</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
    <div style="width: 100%; background-color: #f8f9fa; padding: 20px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background-color: #ffc107; padding: 30px 20px; text-align: center;">
                <h1 style="color: #000000; margin: 0; font-size: 28px; font-weight: bold;">Capel Sound Taxi</h1>
                <p style="color: #333333; margin: 8px 0 0 0; font-size: 16px;">Professional Taxi Service</p>
                ${testMode ? '<div style="color: #d63384; font-weight: bold; background-color: #fff3cd; padding: 10px; border-radius: 4px; margin-top: 15px; border: 1px solid #ffeaa7;">✅ Email Delivery Test - System Working Properly!</div>' : ''}
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 20px;">
                <h2 style="color: #333333; margin-top: 0; font-size: 22px;">Hello ${name},</h2>
                
                <p style="color: #555555; font-size: 16px; margin-bottom: 25px;">
                    ${testMode ? 'This test message confirms our email delivery system is working correctly and emails should now arrive in your inbox.<br><br>' : ''}Your verification code for your taxi booking confirmation is:
                </p>
                
                <!-- OTP Display -->
                <div style="text-align: center; margin: 30px 0;">
                    <div style="display: inline-block; background-color: #ffc107; padding: 20px 30px; border-radius: 8px; border: 2px solid #ffb300;">
                        <span style="font-size: 36px; font-weight: bold; color: #000000; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
                    </div>
                </div>
                
                <!-- Important Notice -->
                <div style="background-color: #e3f2fd; border-left: 4px solid #2196F3; border-radius: 4px; padding: 15px; margin: 25px 0;">
                    <p style="color: #1565C0; margin: 0; font-size: 14px; font-weight: 500;">
                        <strong>Important:</strong> This verification code expires in 10 minutes for security purposes.
                    </p>
                </div>
                
                <p style="color: #555555; font-size: 14px; margin-bottom: 25px;">
                    ${testMode ? 'If you received this email in your main inbox (not spam), our email system is properly configured and working!' : 'Please enter this code on our booking website to confirm your taxi reservation.'}
                </p>
                
                ${testMode ? '' : '<p style="color: #555555; font-size: 14px; margin-bottom: 25px;">Thank you for choosing Capel Sound Taxi for your transportation needs.</p>'}
                
                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
                
                <!-- Contact Information -->
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center;">
                    <h3 style="color: #ffc107; margin-bottom: 15px; font-size: 18px;">Contact Information</h3>
                    <p style="color: #555555; margin: 5px 0; font-size: 14px;"><strong>Phone:</strong> (03) 5983 1800</p>
                    <p style="color: #555555; margin: 5px 0; font-size: 14px;"><strong>Email:</strong> contact@capelsoundtaxi.com.au</p>
                    <p style="color: #555555; margin: 5px 0; font-size: 14px;"><strong>Website:</strong> www.capelsoundtaxi.com.au</p>
                </div>
                
                <!-- Footer -->
                <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                    <p style="color: #888888; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} Capel Sound Taxi - Your reliable transport partner
                    </p>
                    <p style="color: #888888; font-size: 11px; margin: 8px 0 0 0;">
                        This is an automated message for booking verification. Please do not reply to this email.
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

    // Enhanced email data with optimal inbox delivery headers
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
          header: "Return-Path",
          value: "contact@capelsoundtaxi.com.au"
        },
        {
          header: "List-Unsubscribe",
          value: "<mailto:contact@capelsoundtaxi.com.au?subject=unsubscribe>"
        },
        {
          header: "X-Mailer",
          value: "Capel Sound Taxi Booking System"
        },
        {
          header: "Message-ID",
          value: `<${Date.now()}.${Math.random().toString(36).substr(2, 9)}@capelsoundtaxi.com.au>`
        },
        {
          header: "MIME-Version",
          value: "1.0"
        },
        {
          header: "Content-Type",
          value: "multipart/alternative"
        },
        {
          header: "X-Priority",
          value: "3"
        },
        {
          header: "X-MSMail-Priority",
          value: "Normal"
        },
        {
          header: "Importance",
          value: "Normal"
        },
        {
          header: "X-Auto-Response-Suppress",
          value: "OOF, DR, RN, NRN, AutoReply"
        },
        {
          header: "Precedence",
          value: "bulk"
        },
        {
          header: "X-Spam-Status",
          value: "No"
        }
      ],
      // Disable all tracking for better deliverability
      track_opens: false,
      track_clicks: false,
      track_links: false
    };

    console.log('=== SENDING EMAIL VIA SMTP2GO ===');
    console.log('Email payload (without API key):', {
      to: emailData.to,
      sender: emailData.sender,
      sender_name: emailData.sender_name,
      subject: emailData.subject,
      custom_headers_count: emailData.custom_headers.length,
      tracking_disabled: 'ALL_TRACKING_OFF',
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
      message: testMode ? 'Test email sent successfully - Check your inbox!' : 'Verification email sent successfully',
      email_id: result.data?.email_id,
      emails_sent: result.data?.succeeded || 0,
      emails_failed: result.data?.failed || 0,
      sender_email: `${senderName} <${senderEmail}>`,
      recipient_email: email,
      test_mode: testMode,
      inbox_optimization: 'ENHANCED',
      tracking_disabled: true,
      authentication_required: 'SPF_DKIM_DMARC_NEEDED'
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
