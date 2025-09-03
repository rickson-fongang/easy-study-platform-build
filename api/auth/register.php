<?php
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../classes/User.php';

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->first_name) && !empty($data->last_name) && 
    !empty($data->email) && !empty($data->password) && !empty($data->phone)) {
    
    // Initialize database and user object
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    // Set user properties
    $user->first_name = $data->first_name;
    $user->last_name = $data->last_name;
    $user->email = $data->email;
    $user->phone = $data->phone;
    $user->password = $data->password;
    $user->user_type = isset($data->user_type) ? $data->user_type : 'student';

    // Check if email already exists
    if ($user->emailExists()) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Email already exists.'
        ]);
    } else {
        // Create user
        if ($user->create()) {
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'User registered successfully.',
                'user_id' => $user->id
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Unable to register user.'
            ]);
        }
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required.'
    ]);
}
?>
