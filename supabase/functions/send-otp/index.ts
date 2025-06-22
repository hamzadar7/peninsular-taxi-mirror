
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

    // Use your verified domain with contact@ email
    const senderEmail = "contact@capelsoundtaxi.com.au";
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
      text_body: `Hello ${name},\n\n${testMode ? 'This is a TEST email.\n\n' : ''}Your verification code for taxi booking is: ${otp}\n\nThis code will expire in 10 minutes.\n\nPlease enter this code to confirm your booking.\n\nBest regards,\nCapel Sound Taxi Team\n\nPhone: (03) 5983 1800\nEmail: contact@capelsoundtaxi.com.au\nWebsite: www.capelsoundtaxi.com.au`,
      html_body: `
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ffc107; margin: 0; font-size: 28px; font-weight: bold;">Capel Sound Taxi</h1>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Professional Taxi Service</p>
                ${testMode ? '<p style="color: #e74c3c; font-weight: bold; background: #fff3cd; padding: 10px; border-radius: 5px;">⚠️ THIS IS A TEST EMAIL ⚠️</p>' : ''}
              </div>
              
              <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0; font-size: 24px;">Hello ${name},</h2>
                
                <p style="color: #666; font-size: 16px; line-height: 1.5;">
                  ${testMode ? 'This is a test email to verify our email delivery system. ' : ''}Thank you for choosing Capel Sound Taxi! Your verification code for booking confirmation is:
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <div style="display: inline-block; background-color: #ffc107; padding: 20px 30px; border-radius: 8px; border: 2px solid #ffb300;">
                    <span style="font-size: 36px; font-weight: bold; color: #333; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
                  </div>
                </div>
                
                <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
                  <p style="color: #856404; margin: 0; font-size: 14px;">
                    ⏰ <strong>Important:</strong> This verification code will expire in 10 minutes for security reasons.
                  </p>
                </div>
                
                <p style="color: #666; font-size: 14px; line-height: 1.5;">
                  ${testMode ? 'If you received this test email, our email system is working correctly!' : 'Please enter this code on the booking form to confirm your taxi reservation. If you didn\'t request this code, please ignore this email.'}
                </p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <div style="text-align: center;">
                  <h3 style="color: #ffc107; margin-bottom: 15px;">Contact Information</h3>
                  <p style="color: #666; margin: 5px 0; font-size: 14px;">📞 Phone: (03) 5983 1800</p>
                  <p style="color: #666; margin: 5px 0; font-size: 14px;">✉️ Email: contact@capelsoundtaxi.com.au</p>
                  <p style="color: #666; margin: 5px 0; font-size: 14px;">🌐 Website: www.capelsoundtaxi.com.au</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    Thank you for choosing Capel Sound Taxi - Your reliable transport partner
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
