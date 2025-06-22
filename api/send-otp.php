
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
        
        // Prepare email data for SMTP2GO
        $emailData = [
            'api_key' => SMTP2GO_API_KEY,
            'to' => [$email],
            'sender' => 'Capelsound Taxi <bookings@capelsoundtaxi.com.au>',
            'subject' => 'Your Booking Verification Code',
            'html_body' => "
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                    <div style='background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;'>
                        <h1 style='color: black; margin: 0; font-size: 28px;'>Capelsound Taxi</h1>
                        <p style='color: black; margin: 10px 0 0 0; font-size: 16px;'>Booking Verification</p>
                    </div>
                    
                    <div style='padding: 40px 30px; background: white;'>
                        <h2 style='color: #333; margin-bottom: 20px;'>Hello {$name},</h2>
                        
                        <p style='color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;'>
                            Thank you for choosing Capelsound Taxi! To complete your booking, please use the verification code below:
                        </p>
                        
                        <div style='background: #f8f9fa; border: 2px dashed #fbbf24; padding: 20px; text-align: center; margin: 30px 0;'>
                            <p style='color: #333; margin: 0 0 10px 0; font-size: 14px;'>Your Verification Code:</p>
                            <h1 style='color: #f59e0b; margin: 0; font-size: 36px; letter-spacing: 8px; font-family: monospace;'>{$otp}</h1>
                        </div>
                        
                        <p style='color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;'>
                            • This code will expire in 10 minutes<br>
                            • Please do not share this code with anyone<br>
                            • If you didn't request this verification, please ignore this email
                        </p>
                        
                        <div style='border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;'>
                            <p style='color: #999; font-size: 12px; margin: 0;'>
                                Need help? Call us at <strong>+61 408 202 034</strong> or email <strong>contact@capelsoundtaxi.com.au</strong>
                            </p>
                        </div>
                    </div>
                    
                    <div style='background: #f8f9fa; padding: 20px; text-align: center;'>
                        <p style='color: #999; font-size: 12px; margin: 0;'>
                            © " . date('Y') . " Capelsound Taxi. All rights reserved.<br>
                            Serving Capel Sound & Mornington Peninsula with reliable taxi services.
                        </p>
                    </div>
                </div>
            ",
            'text_body' => "
Hello {$name},

Thank you for choosing Capelsound Taxi! 

Your verification code is: {$otp}

This code will expire in 10 minutes. Please do not share this code with anyone.

If you didn't request this verification, please ignore this email.

Need help? Call us at +61 408 202 034 or email contact@capelsoundtaxi.com.au

© " . date('Y') . " Capelsound Taxi. All rights reserved.
            "
        ];
        
        if ($testMode) {
            $emailData['subject'] = '[TEST] ' . $emailData['subject'];
        }
        
        // Send email via SMTP2GO
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, SMTP2GO_API_URL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'X-Smtp2go-Api-Key: ' . SMTP2GO_API_KEY
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        if ($curlError) {
            error_log("SMTP2GO CURL Error: " . $curlError);
            sendResponse(['error' => 'Failed to send email: ' . $curlError], 500);
        }
        
        if ($httpCode !== 200) {
            error_log("SMTP2GO HTTP Error: " . $httpCode . " Response: " . $response);
            sendResponse(['error' => 'Failed to send email. HTTP Code: ' . $httpCode], 500);
        }
        
        $responseData = json_decode($response, true);
        
        if (!$responseData || !isset($responseData['data'])) {
            error_log("SMTP2GO Invalid Response: " . $response);
            sendResponse(['error' => 'Invalid response from email service'], 500);
        }
        
        $emailResult = $responseData['data'];
        
        if (!isset($emailResult['succeeded']) || $emailResult['succeeded'] !== 1) {
            error_log("SMTP2GO Email Failed: " . json_encode($emailResult));
            sendResponse(['error' => 'Email delivery failed'], 500);
        }
        
        sendResponse([
            'success' => true,
            'message' => 'OTP email sent successfully',
            'email_id' => $emailResult['email_id'] ?? null,
            'emails_sent' => $emailResult['succeeded'] ?? 0,
            'test_mode' => $testMode
        ]);
        
    } else {
        sendResponse(['error' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    error_log("OTP API error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
