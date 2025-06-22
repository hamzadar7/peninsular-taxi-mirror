
<?php
require_once 'config.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            sendResponse(['error' => 'Invalid JSON data'], 400);
        }
        
        // Validate required fields
        $required = ['email', 'otp', 'name'];
        $error = validateRequired($input, $required);
        if ($error) {
            sendResponse(['error' => $error], 400);
        }
        
        $email = $input['email'];
        $otp = $input['otp'];
        $name = $input['name'];
        $testMode = $input['testMode'] ?? false;
        
        // Log the attempt
        error_log("=== OTP EMAIL ATTEMPT ===");
        error_log("To: " . $email);
        error_log("Name: " . $name);
        error_log("Test Mode: " . ($testMode ? 'true' : 'false'));
        error_log("API Key: " . substr(SMTP2GO_API_KEY, 0, 10) . "...");
        
        // Prepare email data for SMTP2GO with verified sender
        $emailData = [
            'api_key' => SMTP2GO_API_KEY,
            'to' => [$email],
            'sender' => 'Capelsound Taxi <contact@capelsoundtaxi.com.au>',
            'reply_to' => 'contact@capelsoundtaxi.com.au',
            'subject' => 'Your Booking Verification Code - Capelsound Taxi',
            'html_body' => "
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='utf-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <title>Booking Verification - Capelsound Taxi</title>
                </head>
                <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>
                    <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff;'>
                        <!-- Header -->
                        <div style='background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;'>
                            <h1 style='color: #000000; margin: 0; font-size: 28px; font-weight: bold;'>Capelsound Taxi</h1>
                            <p style='color: #000000; margin: 10px 0 0 0; font-size: 16px;'>Your Trusted Transport Service</p>
                        </div>
                        
                        <!-- Main Content -->
                        <div style='padding: 40px 30px; background: #ffffff;'>
                            <h2 style='color: #333333; margin-bottom: 20px; font-size: 24px;'>Hello {$name},</h2>
                            
                            <p style='color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;'>
                                Thank you for choosing Capelsound Taxi! To complete your booking, please use the verification code below:
                            </p>
                            
                            <!-- OTP Box -->
                            <div style='background: #f8f9fa; border: 2px solid #fbbf24; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0;'>
                                <p style='color: #333333; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;'>Your Verification Code:</p>
                                <div style='background: #ffffff; border: 1px solid #e0e0e0; border-radius: 6px; padding: 15px; display: inline-block;'>
                                    <span style='color: #f59e0b; font-size: 32px; font-weight: bold; letter-spacing: 4px; font-family: monospace;'>{$otp}</span>
                                </div>
                            </div>
                            
                            <!-- Instructions -->
                            <div style='background: #fff8e1; border-left: 4px solid #fbbf24; padding: 20px; margin: 30px 0;'>
                                <h3 style='color: #333333; margin: 0 0 15px 0; font-size: 18px;'>Important Instructions:</h3>
                                <ul style='color: #666666; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;'>
                                    <li>This code will expire in <strong>10 minutes</strong></li>
                                    <li>Please enter this code on the booking page to confirm your reservation</li>
                                    <li>Do not share this code with anyone</li>
                                    <li>If you didn't request this verification, please ignore this email</li>
                                </ul>
                            </div>
                            
                            <!-- Contact Information -->
                            <div style='border-top: 1px solid #e0e0e0; padding-top: 25px; margin-top: 30px;'>
                                <h3 style='color: #333333; margin: 0 0 15px 0; font-size: 18px;'>Need Help?</h3>
                                <p style='color: #666666; font-size: 14px; margin: 0; line-height: 1.6;'>
                                    📞 Call us: <strong style='color: #f59e0b;'>+61 408 202 034</strong><br>
                                    ✉️ Email us: <strong style='color: #f59e0b;'>contact@capelsoundtaxi.com.au</strong><br>
                                    🌐 Visit: <strong style='color: #f59e0b;'>www.capelsoundtaxi.com.au</strong>
                                </p>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style='background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e0e0e0;'>
                            <p style='color: #999999; font-size: 12px; margin: 0 0 10px 0;'>
                                © " . date('Y') . " Capelsound Taxi. All rights reserved.
                            </p>
                            <p style='color: #999999; font-size: 12px; margin: 0;'>
                                Serving Capel Sound & Mornington Peninsula with reliable taxi services.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            ",
            'text_body' => "
CAPELSOUND TAXI - BOOKING VERIFICATION

Hello {$name},

Thank you for choosing Capelsound Taxi!

Your verification code is: {$otp}

IMPORTANT INSTRUCTIONS:
• This code will expire in 10 minutes
• Please enter this code on the booking page to confirm your reservation
• Do not share this code with anyone
• If you didn't request this verification, please ignore this email

NEED HELP?
Phone: +61 408 202 034
Email: contact@capelsoundtaxi.com.au
Website: www.capelsoundtaxi.com.au

© " . date('Y') . " Capelsound Taxi. All rights reserved.
Serving Capel Sound & Mornington Peninsula with reliable taxi services.
            ",
            'custom_headers' => [
                [
                    'header' => 'List-Unsubscribe',
                    'value' => '<mailto:contact@capelsoundtaxi.com.au?subject=Unsubscribe>'
                ],
                [
                    'header' => 'X-Priority',
                    'value' => '1'
                ],
                [
                    'header' => 'X-MSMail-Priority',
                    'value' => 'High'
                ],
                [
                    'header' => 'Return-Path',
                    'value' => 'contact@capelsoundtaxi.com.au'
                ]
            ]
        ];
        
        // Add test mode prefix if needed
        if ($testMode) {
            $emailData['subject'] = '[TEST] ' . $emailData['subject'];
        }
        
        // Log the email data being sent (without sensitive info)
        error_log("Email payload prepared for: " . $email);
        error_log("Subject: " . $emailData['subject']);
        error_log("Sender: " . $emailData['sender']);
        
        // Send email via SMTP2GO
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, SMTP2GO_API_URL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'X-Smtp2go-Api-Key: ' . SMTP2GO_API_KEY,
            'User-Agent: CapelsoundTaxi/1.0'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        
        // Execute the request
        error_log("Sending request to SMTP2GO...");
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        $curlInfo = curl_getinfo($ch);
        curl_close($ch);
        
        // Enhanced error logging
        error_log("=== SMTP2GO RESPONSE ===");
        error_log("HTTP Code: " . $httpCode);
        error_log("CURL Error: " . ($curlError ?: 'None'));
        error_log("Response: " . $response);
        error_log("CURL Info: " . json_encode($curlInfo));
        
        if ($curlError) {
            error_log("SMTP2GO CURL Error: " . $curlError);
            sendResponse(['error' => 'Failed to send email: Network error - ' . $curlError], 500);
        }
        
        if ($httpCode !== 200) {
            error_log("SMTP2GO HTTP Error: " . $httpCode . " Response: " . $response);
            
            // Parse response for more details
            $errorDetails = 'HTTP ' . $httpCode;
            if ($response) {
                $responseData = json_decode($response, true);
                if (isset($responseData['error'])) {
                    $errorDetails = $responseData['error'];
                } elseif (isset($responseData['errors'])) {
                    $errorDetails = json_encode($responseData['errors']);
                }
            }
            
            sendResponse(['error' => 'Failed to send email: ' . $errorDetails], 500);
        }
        
        $responseData = json_decode($response, true);
        
        if (!$responseData) {
            error_log("SMTP2GO Invalid Response: " . $response);
            sendResponse(['error' => 'Invalid response from email service'], 500);
        }
        
        // Log full response for debugging
        error_log("SMTP2GO Full Response: " . json_encode($responseData));
        
        // Check response structure - SMTP2GO may return different formats
        if (isset($responseData['data'])) {
            $emailResult = $responseData['data'];
        } else {
            $emailResult = $responseData;
        }
        
        // Check if email was successfully queued/sent
        if (isset($emailResult['succeeded']) && $emailResult['succeeded'] > 0) {
            // Success case
            error_log("SMTP2GO Email Success: " . json_encode($emailResult));
            
            sendResponse([
                'success' => true,
                'message' => 'OTP email sent successfully',
                'email_id' => $emailResult['email_id'] ?? null,
                'emails_sent' => $emailResult['succeeded'] ?? 1,
                'test_mode' => $testMode
            ]);
        } elseif (isset($responseData['request_id'])) {
            // Alternative success format
            error_log("SMTP2GO Email Queued: " . json_encode($responseData));
            
            sendResponse([
                'success' => true,
                'message' => 'OTP email sent successfully',
                'request_id' => $responseData['request_id'],
                'emails_sent' => 1,
                'test_mode' => $testMode
            ]);
        } else {
            // Failure case
            error_log("SMTP2GO Email Failed: " . json_encode($responseData));
            
            $errorMsg = 'Email delivery failed';
            if (isset($emailResult['failed']) && count($emailResult['failed']) > 0) {
                $errorMsg = 'Email delivery failed: ' . json_encode($emailResult['failed'][0]);
            } elseif (isset($responseData['error'])) {
                $errorMsg = 'Email delivery failed: ' . $responseData['error'];
            } elseif (isset($responseData['errors'])) {
                $errorMsg = 'Email delivery failed: ' . json_encode($responseData['errors']);
            }
            
            sendResponse(['error' => $errorMsg], 500);
        }
        
    } else {
        sendResponse(['error' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    error_log("OTP API error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    sendResponse(['error' => 'Internal server error: ' . $e->getMessage()], 500);
}
?>
