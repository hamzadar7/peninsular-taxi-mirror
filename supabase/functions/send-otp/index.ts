
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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('OTP request received:', req.method);
    
    const { email, otp, name }: OTPEmailRequest = await req.json();
    console.log('Request data:', { email, otp: otp ? 'present' : 'missing', name });
    
    const SMTP2GO_API_KEY = Deno.env.get("SMTP2GO_API_KEY");
    
    if (!SMTP2GO_API_KEY) {
      console.error("SMTP2GO_API_KEY not found in environment");
      throw new Error("SMTP2GO_API_KEY not configured");
    }

    console.log('SMTP2GO_API_KEY found, preparing email...');

    const emailData = {
      api_key: SMTP2GO_API_KEY,
      to: [email],
      sender: "contact@capelsoundtaxi.com.au",
      subject: "Your Booking Verification Code - Capel Sound Taxi",
      text_body: `Hello ${name},\n\nYour verification code for taxi booking is: ${otp}\n\nThis code will expire in 10 minutes.\n\nPlease enter this code to confirm your booking.\n\nBest regards,\nCapel Sound Taxi Team\n\nPhone: (03) 5983 1800\nEmail: contact@capelsoundtaxi.com.au\nWebsite: www.capelsoundtaxi.com.au`,
      html_body: `
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ffc107; margin: 0; font-size: 28px; font-weight: bold;">Capel Sound Taxi</h1>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Professional Taxi Service</p>
              </div>
              
              <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0; font-size: 24px;">Hello ${name},</h2>
                
                <p style="color: #666; font-size: 16px; line-height: 1.5;">
                  Thank you for choosing Capel Sound Taxi! Your verification code for booking confirmation is:
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
                  Please enter this code on the booking form to confirm your taxi reservation. If you didn't request this code, please ignore this email.
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

    console.log('Sending email via SMTP2GO API...');
    console.log('Email data prepared for:', email);

    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    console.log('SMTP2GO response status:', response.status);
    const result = await response.json();
    console.log('SMTP2GO response:', result);
    
    if (!response.ok) {
      console.error('SMTP2GO API error:', result);
      throw new Error(`SMTP2GO API error: ${JSON.stringify(result)}`);
    }

    // Check if SMTP2GO reported any failures
    if (result.data && result.data.failed > 0) {
      console.error('SMTP2GO reported failures:', result.data.failures);
      throw new Error(`Email failed to send: ${JSON.stringify(result.data.failures)}`);
    }

    console.log("Email sent successfully via SMTP2GO:", result);

    return new Response(JSON.stringify({ 
      success: true, 
      result,
      message: 'OTP email sent successfully',
      email_id: result.data?.email_id
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
        details: 'Failed to send OTP email'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
