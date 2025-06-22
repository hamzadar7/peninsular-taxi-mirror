
<?php
require_once 'config.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            sendResponse(['error' => 'Invalid JSON data'], 400);
        }
        
        $action = $input['action'] ?? '';
        
        if ($action === 'login') {
            // Admin login
            $username = $input['username'] ?? '';
            $password = $input['password'] ?? '';
            
            if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_username'] = $username;
                $_SESSION['login_time'] = time();
                
                // Store session in database for multi-device support
                $sessionId = session_id();
                $expiresAt = date('Y-m-d H:i:s', time() + (24 * 60 * 60)); // 24 hours
                
                $sql = "INSERT INTO admin_sessions (session_id, username, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE expires_at = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$sessionId, $username, $expiresAt, $expiresAt]);
                
                sendResponse([
                    'success' => true,
                    'message' => 'Login successful',
                    'session_id' => $sessionId
                ]);
            } else {
                sendResponse(['error' => 'Invalid credentials'], 401);
            }
            
        } elseif ($action === 'logout') {
            // Admin logout
            $sessionId = session_id();
            
            // Remove from database
            $sql = "DELETE FROM admin_sessions WHERE session_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$sessionId]);
            
            // Destroy session
            session_destroy();
            
            sendResponse(['success' => true, 'message' => 'Logout successful']);
            
        } elseif ($action === 'check') {
            // Check authentication status
            $isAuthenticated = false;
            
            if (isset($_SESSION['admin_logged_in'])) {
                // Verify session in database
                $sessionId = session_id();
                $sql = "SELECT * FROM admin_sessions WHERE session_id = ? AND expires_at > NOW()";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$sessionId]);
                
                if ($stmt->fetch()) {
                    $isAuthenticated = true;
                } else {
                    // Session expired, clean up
                    unset($_SESSION['admin_logged_in']);
                    unset($_SESSION['admin_username']);
                }
            }
            
            sendResponse([
                'authenticated' => $isAuthenticated,
                'username' => $_SESSION['admin_username'] ?? null
            ]);
            
        } else {
            sendResponse(['error' => 'Invalid action'], 400);
        }
        
    } else {
        sendResponse(['error' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    error_log("Admin auth API error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
