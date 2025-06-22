
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
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));
    
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

    // Use proper sender name with the verified domain email
    const senderEmail = "Capel Sound Taxi <contact@capelsoundtaxi.com.au>";
    console.log('Using sender email:', senderEmail);
    console.log('Sending to:', email);
    console.log('Test mode:', testMode);

    const emailData = {
      api_key: SMTP2GO_API_KEY,
      to: [email],
      sender: senderEmail,
      subject: testMode 
        ? "TEST - Your Booking Verification Code - Capel Sound Taxi" 
        : "Your Booking Verification Code - Capel Sound Taxi",
      // Add custom headers to improve deliverability
      custom_headers: [
        {
          header: "Reply-To",
          value: "contact@capelsoundtaxi.com.au"
        },
        {
          header: "X-Priority",
          value: "1"
        },
        {
          header: "X-Mailer",
          value: "Capel Sound Taxi Booking System"
        },
        {
          header: "List-Unsubscribe",
          value: "<mailto:contact@capelsoundtaxi.com.au?subject=Unsubscribe>"
        }
      ],
      text_body: `Hello ${name},\n\n${testMode ? 'This is a TEST email to verify our email delivery system.\n\n' : ''}Your verification code for taxi booking is: ${otp}\n\nThis code will expire in 10 minutes.\n\nPlease enter this code to confirm your booking.\n\nBest regards,\nCapel Sound Taxi Team\n\nPhone: (03) 5983 1800\nEmail: contact@capelsoundtaxi.com.au\nWebsite: www.capelsoundtaxi.com.au`,
      html_body: `
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verification Code - Capel Sound Taxi</title>
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #ffc107; padding-bottom: 20px;">
                <h1 style="color: #ffc107; margin: 0; font-size: 32px; font-weight: bold;">🚕 Capel Sound Taxi</h1>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 16px;">Professional Taxi Service</p>
                ${testMode ? '<div style="color: #e74c3c; font-weight: bold; background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 15px; border: 2px solid #ffeaa7;">⚠️ THIS IS A TEST EMAIL - Email System Working! ⚠️</div>' : ''}
              </div>
              
              <div style="padding: 20px 0;">
                <h2 style="color: #333; margin-top: 0; font-size: 24px;">Hello ${name},</h2>
                
                <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                  ${testMode ? '🎉 <strong>Great news!</strong> This test email confirms our email delivery system is working correctly.<br><br>' : ''}Thank you for choosing Capel Sound Taxi! Your verification code for booking confirmation is:
                </p>
                
                <div style="text-align: center; margin: 35px 0;">
                  <div style="display: inline-block; background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%); padding: 25px 35px; border-radius: 12px; border: 3px solid #ffb300; box-shadow: 0 4px 8px rgba(255,193,7,0.3);">
                    <span style="font-size: 42px; font-weight: bold; color: #333; letter-spacing: 8px; font-family: 'Courier New', monospace; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">${otp}</span>
                  </div>
                </div>
                
                <div style="background-color: #e8f4fd; border-left: 4px solid #2196F3; border-radius: 6px; padding: 20px; margin: 25px 0;">
                  <p style="color: #1976D2; margin: 0; font-size: 14px; font-weight: 500;">
                    ⏰ <strong>Important:</strong> This verification code will expire in 10 minutes for security reasons.
                  </p>
                </div>
                
                <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
                  ${testMode ? 'If you received this test email in your inbox (not spam), our email system is properly configured!' : 'Please enter this code on the booking form to confirm your taxi reservation. If you didn\'t request this code, please ignore this email.'}
                </p>
                
                <hr style="border: none; border-top: 2px solid #f0f0f0; margin: 30px 0;">
                
                <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; text-align: center;">
                  <h3 style="color: #ffc107; margin-bottom: 15px; font-size: 20px;">📞 Contact Information</h3>
                  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
                    <p style="color: #555; margin: 5px 0; font-size: 14px; font-weight: 500;">📞 Phone: (03) 5983 1800</p>
                    <p style="color: #555; margin: 5px 0; font-size: 14px; font-weight: 500;">✉️ Email: contact@capelsoundtaxi.com.au</p>
                    <p style="color: #555; margin: 5px 0; font-size: 14px; font-weight: 500;">🌐 Website: www.capelsoundtaxi.com.au</p>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #999; font-size: 12px; margin: 0; font-style: italic;">
                    Thank you for choosing Capel Sound Taxi - Your reliable transport partner on the Mornington Peninsula
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    };

    console.log('=== SENDING EMAIL VIA SMTP2GO ===');
    console.log('Email payload (without API key):', {
      to: emailData.to,
      sender: emailData.sender,
      subject: emailData.subject,
      custom_headers: emailData.custom_headers,
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
      message: testMode ? 'Test OTP email sent successfully' : 'OTP email sent successfully',
      email_id: result.data?.email_id,
      emails_sent: result.data?.succeeded || 0,
      emails_failed: result.data?.failed || 0,
      sender_email: senderEmail,
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
      details: 'Failed to send OTP email',
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
