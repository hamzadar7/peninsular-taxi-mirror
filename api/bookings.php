
<?php
require_once 'config.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'POST') {
        // Create new booking
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            sendResponse(['error' => 'Invalid JSON data'], 400);
        }
        
        // Validate required fields
        $required = ['contact_name', 'contact_phone', 'contact_email', 'pickup_location', 'destination', 'date', 'time', 'passengers', 'vehicle_type'];
        $error = validateRequired($input, $required);
        if ($error) {
            sendResponse(['error' => $error], 400);
        }
        
        // Insert booking into database
        $sql = "INSERT INTO bookings (contact_name, contact_phone, contact_email, pickup_location, destination, date, time, passengers, vehicle_type, special_requests, device_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['contact_name'],
            $input['contact_phone'],
            $input['contact_email'],
            $input['pickup_location'],
            $input['destination'],
            $input['date'],
            $input['time'],
            $input['passengers'],
            $input['vehicle_type'],
            $input['special_requests'] ?? '',
            $input['device_info'] ?? ''
        ]);
        
        $bookingId = $pdo->lastInsertId();
        
        sendResponse([
            'success' => true,
            'id' => $bookingId,
            'message' => 'Booking created successfully'
        ]);
        
    } elseif ($method === 'GET') {
        // Get all bookings (admin only)
        if (!isset($_SESSION['admin_logged_in'])) {
            sendResponse(['error' => 'Unauthorized'], 401);
        }
        
        $sql = "SELECT * FROM bookings ORDER BY created_at DESC";
        $stmt = $pdo->query($sql);
        $bookings = $stmt->fetchAll();
        
        sendResponse(['bookings' => $bookings]);
        
    } elseif ($method === 'PUT') {
        // Update booking status/remarks (admin only)
        if (!isset($_SESSION['admin_logged_in'])) {
            sendResponse(['error' => 'Unauthorized'], 401);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['id'])) {
            sendResponse(['error' => 'Booking ID is required'], 400);
        }
        
        $updates = [];
        $params = [];
        
        if (isset($input['status'])) {
            $updates[] = "status = ?";
            $params[] = $input['status'];
        }
        
        if (isset($input['admin_remarks'])) {
            $updates[] = "admin_remarks = ?";
            $params[] = $input['admin_remarks'];
        }
        
        if (empty($updates)) {
            sendResponse(['error' => 'No fields to update'], 400);
        }
        
        $params[] = $input['id'];
        $sql = "UPDATE bookings SET " . implode(', ', $updates) . " WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        sendResponse(['success' => true, 'message' => 'Booking updated successfully']);
        
    } else {
        sendResponse(['error' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    error_log("Bookings API error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
