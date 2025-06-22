
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otp, name }: OTPEmailRequest = await req.json();
    
    const SMTP2GO_API_KEY = Deno.env.get("SMTP2GO_API_KEY");
    
    if (!SMTP2GO_API_KEY) {
      throw new Error("SMTP2GO_API_KEY not configured");
    }

    const emailData = {
      api_key: SMTP2GO_API_KEY,
      to: [email],
      sender: "noreply@capelsoundtaxi.com.au",
      subject: "Your Booking Verification Code",
      text_body: `Hello ${name},\n\nYour verification code for taxi booking is: ${otp}\n\nThis code will expire in 10 minutes.\n\nBest regards,\nCapel Sound Taxi`,
      html_body: `
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
              <h2 style="color: #333; text-align: center;">Capel Sound Taxi</h2>
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333;">Hello ${name},</h3>
                <p>Your verification code for taxi booking is:</p>
                <div style="text-align: center; margin: 20px 0;">
                  <span style="font-size: 32px; font-weight: bold; background-color: #ffc107; padding: 10px 20px; border-radius: 8px; letter-spacing: 3px;">${otp}</span>
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
                <p>Best regards,<br>Capel Sound Taxi</p>
              </div>
            </div>
          </body>
        </html>
      `
    };

    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`SMTP2GO API error: ${JSON.stringify(result)}`);
    }

    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
