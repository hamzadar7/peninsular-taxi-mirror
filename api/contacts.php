
<?php
require_once 'config.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'POST') {
        // Create new contact
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            sendResponse(['error' => 'Invalid JSON data'], 400);
        }
        
        // Validate required fields
        $required = ['name', 'email', 'message'];
        $error = validateRequired($input, $required);
        if ($error) {
            sendResponse(['error' => $error], 400);
        }
        
        // Insert contact into database
        $sql = "INSERT INTO contacts (name, email, phone, message, device_info) VALUES (?, ?, ?, ?, ?)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['name'],
            $input['email'],
            $input['phone'] ?? '',
            $input['message'],
            $input['device_info'] ?? ''
        ]);
        
        $contactId = $pdo->lastInsertId();
        
        sendResponse([
            'success' => true,
            'id' => $contactId,
            'message' => 'Contact message sent successfully'
        ]);
        
    } elseif ($method === 'GET') {
        // Get all contacts (admin only)
        if (!isset($_SESSION['admin_logged_in'])) {
            sendResponse(['error' => 'Unauthorized'], 401);
        }
        
        $sql = "SELECT * FROM contacts ORDER BY timestamp DESC";
        $stmt = $pdo->query($sql);
        $contacts = $stmt->fetchAll();
        
        sendResponse(['contacts' => $contacts]);
        
    } elseif ($method === 'PUT') {
        // Update contact status (admin only)
        if (!isset($_SESSION['admin_logged_in'])) {
            sendResponse(['error' => 'Unauthorized'], 401);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id']) || !isset($input['status'])) {
            sendResponse(['error' => 'Contact ID and status are required'], 400);
        }
        
        $sql = "UPDATE contacts SET status = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$input['status'], $input['id']]);
        
        sendResponse(['success' => true, 'message' => 'Contact status updated successfully']);
        
    } else {
        sendResponse(['error' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    error_log("Contacts API error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
