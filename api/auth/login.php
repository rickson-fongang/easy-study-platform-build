<?php
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../classes/User.php';
require_once '../classes/Auth.php';

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password) && !empty($data->user_type)) {
    
    // Initialize database and user object
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    // Set user properties
    $user->email = $data->email;

    // Check if email exists
    if ($user->emailExists()) {
        
        // Verify password and user type
        if (password_verify($data->password, $user->password) && $user->user_type === $data->user_type) {
            
            // Check if user is active
            if ($user->is_active) {
                
                // Generate JWT token
                $user_data = [
                    'id' => $user->id,
                    'email' => $user->email,
                    'user_type' => $user->user_type
                ];
                
                $token = Auth::generateToken($user_data);

                // Set response code and return user data
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'token' => $token,
                    'user' => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'user_type' => $user->user_type
                    ]
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Account is deactivated. Please contact administrator.'
                ]);
            }
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid credentials or user type.'
            ]);
        }
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'User not found.'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Email, password, and user type are required.'
    ]);
}
?>
