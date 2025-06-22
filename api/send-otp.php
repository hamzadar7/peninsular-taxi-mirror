
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
        
        // Prepare email data for SMTP2GO with improved deliverability
        $emailData = [
            'api_key' => SMTP2GO_API_KEY,
            'to' => [$email],
            'sender' => 'Capelsound Taxi <contact@capelsoundtaxi.com.au>',
            'reply_to' => 'contact@capelsoundtaxi.com.au',
            'subject' => ($testMode ? '[TEST] ' : '') . 'Booking Verification Code - Capelsound Taxi',
            'html_body' => "
<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\">
<head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Booking Verification - Capelsound Taxi</title>
    <!--[if mso]>
    <style type=\"text/css\">
    table {border-collapse: collapse; border-spacing: 0; margin: 0;}
    div, td {padding: 0;}
    div {margin: 0 !important;}
    </style>
    <![endif]-->
</head>
<body style=\"margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; line-height: 1.6;\">
    <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" style=\"background-color: #f8f9fa;\">
        <tr>
            <td align=\"center\" style=\"padding: 20px 0;\">
                <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"600\" style=\"max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);\">
                    <!-- Header -->
                    <tr>
                        <td style=\"background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;\">
                            <h1 style=\"color: #000000; margin: 0; font-size: 28px; font-weight: bold; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\">Capelsound Taxi</h1>
                            <p style=\"color: #1f2937; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;\">Professional Transport Service</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style=\"padding: 40px 30px; background: #ffffff;\">
                            <h2 style=\"color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;\">Hello " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ",</h2>
                            
                            <p style=\"color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;\">
                                Thank you for booking with Capelsound Taxi. Please use the verification code below to confirm your booking:
                            </p>
                            
                            <!-- OTP Code -->
                            <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" style=\"margin: 30px 0;\">
                                <tr>
                                    <td align=\"center\" style=\"background: #f3f4f6; border: 2px solid #fbbf24; border-radius: 8px; padding: 25px;\">
                                        <p style=\"color: #1f2937; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;\">Your Verification Code:</p>
                                        <div style=\"background: #ffffff; border: 1px solid #d1d5db; border-radius: 6px; padding: 15px 25px; display: inline-block;\">
                                            <span style=\"color: #f59e0b; font-size: 32px; font-weight: bold; letter-spacing: 6px; font-family: 'Courier New', monospace;\">" . htmlspecialchars($otp, ENT_QUOTES, 'UTF-8') . "</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Important Information -->
                            <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" style=\"margin: 25px 0;\">
                                <tr>
                                    <td style=\"background: #fef3c7; border-left: 4px solid #fbbf24; padding: 20px;\">
                                        <h3 style=\"color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;\">Important Information:</h3>
                                        <ul style=\"color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;\">
                                            <li style=\"margin-bottom: 8px;\">This verification code expires in <strong>10 minutes</strong></li>
                                            <li style=\"margin-bottom: 8px;\">Enter this code on our booking page to confirm your reservation</li>
                                            <li style=\"margin-bottom: 8px;\">Keep this code private and do not share it with anyone</li>
                                            <li>If you did not request this booking, please ignore this email</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Contact Information -->
                            <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\" style=\"border-top: 1px solid #e5e7eb; padding-top: 25px; margin-top: 30px;\">
                                <tr>
                                    <td>
                                        <h3 style=\"color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;\">Need Assistance?</h3>
                                        <p style=\"color: #4b5563; font-size: 14px; margin: 0; line-height: 1.8;\">
                                            <strong>Phone:</strong> <a href=\"tel:+61408202034\" style=\"color: #f59e0b; text-decoration: none;\">+61 408 202 034</a><br>
                                            <strong>Email:</strong> <a href=\"mailto:contact@capelsoundtaxi.com.au\" style=\"color: #f59e0b; text-decoration: none;\">contact@capelsoundtaxi.com.au</a><br>
                                            <strong>Website:</strong> <a href=\"https://www.capelsoundtaxi.com.au\" style=\"color: #f59e0b; text-decoration: none;\">www.capelsoundtaxi.com.au</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style=\"background: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;\">
                            <p style=\"color: #6b7280; font-size: 12px; margin: 0 0 5px 0;\">
                                &copy; " . date('Y') . " Capelsound Taxi. All rights reserved.
                            </p>
                            <p style=\"color: #9ca3af; font-size: 11px; margin: 0;\">
                                This is an automated message for your taxi booking verification.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>",
            'text_body' => "CAPELSOUND TAXI - BOOKING VERIFICATION

Hello " . $name . ",

Thank you for booking with Capelsound Taxi.

Your verification code is: " . $otp . "

IMPORTANT INFORMATION:
• This code expires in 10 minutes
• Enter this code on our booking page to confirm your reservation
• Keep this code private and do not share it with anyone
• If you did not request this booking, please ignore this email

NEED ASSISTANCE?
Phone: +61 408 202 034
Email: contact@capelsoundtaxi.com.au
Website: www.capelsoundtaxi.com.au

© " . date('Y') . " Capelsound Taxi. All rights reserved.
This is an automated message for your taxi booking verification.",
            'custom_headers' => [
                [
                    'header' => 'Message-ID',
                    'value' => '<' . uniqid() . '@capelsoundtaxi.com.au>'
                ],
                [
                    'header' => 'List-Unsubscribe',
                    'value' => '<mailto:contact@capelsoundtaxi.com.au?subject=Unsubscribe>'
                ],
                [
                    'header' => 'X-Mailer',
                    'value' => 'Capelsound Taxi Booking System v1.0'
                ],
                [
                    'header' => 'X-Priority',
                    'value' => '3'
                ],
                [
                    'header' => 'X-Auto-Response-Suppress',
                    'value' => 'OOF, DR, RN, NRN'
                ],
                [
                    'header' => 'Precedence',
                    'value' => 'bulk'
                ],
                [
                    'header' => 'X-Entity-ID',
                    'value' => 'capelsound-taxi-otp'
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
