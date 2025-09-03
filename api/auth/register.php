<?php
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../classes/User.php';

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->first_name) && !empty($data->last_name) && 
    !empty($data->email) && !empty($data->password) && !empty($data->phone)) {
    
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    $user->first_name = $data->first_name;
    $user->last_name  = $data->last_name;
    $user->email      = $data->email;
    $user->phone      = $data->phone;
    $user->password   = $data->password;
    $user->user_type  = isset($data->user_type) ? $data->user_type : 'student';

    // New students are inactive until approved
    $user->is_active = ($user->user_type === 'student') ? 0 : 1;

    // Generate admin code for students only
    $user->admin_code = ($user->user_type === 'student') ? 'STUDY' . rand(1000,9999) : null;

    if ($user->emailExists()) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Email already exists.'
        ]);
    } else {
        if ($user->create()) {
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => $user->user_type === 'student' 
                    ? 'User registered successfully. Awaiting approval.' 
                    : 'Tutor registered successfully. You can now log in.',
                'user_id' => $user->id,
                'admin_code' => $user->admin_code
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
