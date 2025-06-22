
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
        
        // Clean, professional email template
        $emailData = [
            'api_key' => SMTP2GO_API_KEY,
            'to' => [$email],
            'sender' => 'Capelsound Taxi <contact@capelsoundtaxi.com.au>',
            'reply_to' => 'contact@capelsoundtaxi.com.au',
            'subject' => ($testMode ? '[TEST] ' : '') . 'Taxi Booking - Verification Code',
            'html_body' => "
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>Verification Code</title>
</head>
<body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">
    
    <div style=\"text-align: center; margin-bottom: 30px;\">
        <h1 style=\"color: #333; font-size: 24px; margin: 0;\">Capelsound Taxi</h1>
        <p style=\"color: #666; margin: 5px 0 0 0;\">Booking Verification</p>
    </div>
    
    <div style=\"background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;\">
        <p style=\"margin: 0 0 15px 0;\">Hello " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ",</p>
        <p style=\"margin: 0 0 15px 0;\">Your verification code for taxi booking:</p>
        
        <div style=\"text-align: center; margin: 20px 0;\">
            <div style=\"background: white; border: 2px solid #ddd; display: inline-block; padding: 15px 25px; border-radius: 5px;\">
                <span style=\"font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #333;\">" . htmlspecialchars($otp, ENT_QUOTES, 'UTF-8') . "</span>
            </div>
        </div>
        
        <p style=\"margin: 15px 0 0 0; font-size: 14px; color: #666;\">
            This code expires in 10 minutes. Enter it on our booking page to confirm your reservation.
        </p>
    </div>
    
    <div style=\"border-top: 1px solid #eee; padding-top: 20px; font-size: 14px; color: #666;\">
        <p style=\"margin: 0 0 10px 0;\"><strong>Need help?</strong></p>
        <p style=\"margin: 0;\">Phone: +61 408 202 034</p>
        <p style=\"margin: 0;\">Email: contact@capelsoundtaxi.com.au</p>
    </div>
    
    <div style=\"text-align: center; margin-top: 30px; font-size: 12px; color: #999;\">
        <p style=\"margin: 0;\">&copy; " . date('Y') . " Capelsound Taxi</p>
    </div>
    
</body>
</html>",
            'text_body' => "CAPELSOUND TAXI - BOOKING VERIFICATION

Hello " . $name . ",

Your verification code for taxi booking: " . $otp . "

This code expires in 10 minutes.
Enter it on our booking page to confirm your reservation.

Need help?
Phone: +61 408 202 034
Email: contact@capelsoundtaxi.com.au

© " . date('Y') . " Capelsound Taxi",
            'custom_headers' => [
                [
                    'header' => 'Message-ID',
                    'value' => '<' . uniqid() . '@capelsoundtaxi.com.au>'
                ],
                [
                    'header' => 'X-Mailer',
                    'value' => 'Capelsound Taxi v1.0'
                ],
                [
                    'header' => 'X-Priority',
                    'value' => '3'
                ],
                [
                    'header' => 'X-Auto-Response-Suppress',
                    'value' => 'OOF'
                ],
                [
                    'header' => 'Precedence',
                    'value' => 'list'
                ],
                [
                    'header' => 'X-Entity-ID',
                    'value' => 'taxi-booking-verification'
                ],
                [
                    'header' => 'Content-Type',
                    'value' => 'text/html; charset=UTF-8'
                ]
            ]
        ];
        
        // Log the email data being sent
        error_log("Email payload prepared for: " . $email);
        error_log("Subject: " . $emailData['subject']);
        
        // Send email via SMTP2GO
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, SMTP2GO_API_URL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'X-Smtp2go-Api-Key: ' . SMTP2GO_API_KEY,
            'User-Agent: CapelsoundTaxi/1.0',
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        
        // Execute the request
        error_log("Sending request to SMTP2GO...");
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        // Enhanced error logging
        error_log("=== SMTP2GO RESPONSE ===");
        error_log("HTTP Code: " . $httpCode);
        error_log("CURL Error: " . ($curlError ?: 'None'));
        error_log("Response: " . $response);
        
        if ($curlError) {
            error_log("SMTP2GO CURL Error: " . $curlError);
            sendResponse(['error' => 'Failed to send email: Network error - ' . $curlError], 500);
        }
        
        if ($httpCode !== 200) {
            error_log("SMTP2GO HTTP Error: " . $httpCode . " Response: " . $response);
            
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
        
        // Check response structure
        if (isset($responseData['data'])) {
            $emailResult = $responseData['data'];
        } else {
            $emailResult = $responseData;
        }
        
        // Check if email was successfully queued/sent
        if (isset($emailResult['succeeded']) && $emailResult['succeeded'] > 0) {
            error_log("SMTP2GO Email Success: " . json_encode($emailResult));
            
            sendResponse([
                'success' => true,
                'message' => 'OTP email sent successfully',
                'email_id' => $emailResult['email_id'] ?? null,
                'emails_sent' => $emailResult['succeeded'] ?? 1,
                'test_mode' => $testMode
            ]);
        } elseif (isset($responseData['request_id'])) {
            error_log("SMTP2GO Email Queued: " . json_encode($responseData));
            
            sendResponse([
                'success' => true,
                'message' => 'OTP email sent successfully',
                'request_id' => $responseData['request_id'],
                'emails_sent' => 1,
                'test_mode' => $testMode
            ]);
        } else {
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
